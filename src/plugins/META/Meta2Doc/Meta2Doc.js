/**
* Generated by PluginGenerator from webgme on Fri Sep 05 2014 15:31:19 GMT-0500 (Central Daylight Time).
*/

define(['plugin/PluginConfig',
    'plugin/PluginBase'],
    function (PluginConfig, PluginBase) {
    'use strict';

    /**
    * Initializes a new instance of Meta2Doc.
    * @class
    * @augments {PluginBase}
    * @classdesc This class represents the plugin Meta2Doc.
    * @constructor
    */
    var Meta2Doc = function () {
        // Call base class' constructor.
        PluginBase.call(this);

        this.id2MetaElement = {}; // {"node": the node, "meta": self.getMeta, "eDoc": self.makeNewElementDoc}

        this.LanguageDocumentation = {
            "LanguageElements": {},
            "LanguageElementList": [],
            "LanguageInfo": {
                "Name": null,
                "Version": null,
                "ChangeTime": null,
                "Author": null,
                "Comment": null,
                "Details": {}
            }
        };
    };

    // Prototypal inheritance from PluginBase.
    Meta2Doc.prototype = Object.create(PluginBase.prototype);
    Meta2Doc.prototype.constructor = Meta2Doc;

    /**
    * Gets the name of the Meta2Doc.
    * @returns {string} The name of the plugin.
    * @public
    */
    Meta2Doc.prototype.getName = function () {
        return "Meta2Doc";
    };

    /**
    * Gets the semantic version (semver.org) of the Meta2Doc.
    * @returns {string} The version of the plugin.
    * @public
    */
    Meta2Doc.prototype.getVersion = function () {
        return "0.1.0";
    };

    /**
    * Gets the description of the Meta2Doc.
    * @returns {string} The description of the plugin.
    * @public
    */
    Meta2Doc.prototype.getDescription = function () {
        return "Generate Language Documentation from MetaModel";
    };

    /**
    * Main function for the plugin to execute. This will perform the execution.
    * Notes:
    * - Always log with the provided logger.[error,warning,info,debug].
    * - Do NOT put any user interaction logic UI, etc. inside this method.
    * - callback always has to be called even if error happened.
    *
    * @param {function(string, plugin.PluginResult)} callback - the result callback
    */
    Meta2Doc.prototype.main = function (callback) {
        var self = this;

        self.logger.info("Running Meta2Doc");

        var documentationArtifact = self.blobClient.createArtifact('LanguageDoc');

        self.getMetaRelationships();

        var addFileCallbackFunction = function (err, hash) {

            var artifactSaveCallbackFunction = function (err, artifactHash) {
                if (err) {
                    self.result.setSuccess(false);
                    return callback(err, self.result);
                } else {
                    self.result.setSuccess(true);
                    self.result.addArtifact(artifactHash);
                    self.save('added obj', function (err) {
                        callback(null, self.result);
                    });
                }
            };

            documentationArtifact.save(artifactSaveCallbackFunction);
        };

        documentationArtifact.addFile('LanguageElements.json', JSON.stringify(self.LanguageDocumentation), addFileCallbackFunction);
    };

    Meta2Doc.prototype.getMetaRelationships = function () {
        var self = this,
            metaElementName,
            metaElementNode,
            baseNode,
            baseClassIds,
            id,
            metaElement;

        for (metaElementName in self.META) {
            if (self.META.hasOwnProperty(metaElementName)) {
                metaElementNode = self.META[metaElementName];
                id = self.core.getPath(metaElementNode);

                baseNode = self.core.getBase(metaElementNode);
                baseClassIds = [];

                while (baseNode) {
                    baseClassIds.push(self.core.getPath(baseNode));
                    baseNode = self.core.getBase(baseNode);
                }

                // Sep10Experiment
                self.id2MetaElement[id] = {
                    "name": metaElementName,
                    "node": metaElementNode,
                    "meta": self.getMeta(metaElementNode),
                    "eDoc": self.makeNewElementDoc(metaElementNode, true),
                    "eDocLite": self.makeNewElementDoc(metaElementNode, false),
                    "BaseClassIds": baseClassIds
                };
            }
        }

        for (id in self.id2MetaElement) {
            if (self.id2MetaElement.hasOwnProperty(id)) {
                metaElement = self.id2MetaElement[id];

                self.getRelationships(metaElement);
            }
        }

        for (id in self.id2MetaElement) {
            if (self.id2MetaElement.hasOwnProperty(id)) {
                metaElement = self.id2MetaElement[id];

                self.addInheritedRelationships(metaElement);

                self.LanguageDocumentation.LanguageElements[metaElement.name] = metaElement.eDoc;
                self.LanguageDocumentation.LanguageElementList.push(metaElement.name);
            }
        }

        self.LanguageDocumentation.LanguageElementList.sort();
    };

    Meta2Doc.prototype.getRelationships = function (metaElementObject) {
        var self = this,
            elementDocToFill = metaElementObject.eDoc,
            eDocLiteToReciprocate = metaElementObject.eDocLite,
            metaToExplore = metaElementObject.meta,
            i,
            relatedNodeId,
            relatedNodeElementDoc,
            relatedNodeElementDocLite,
            baseClassIds = metaElementObject.BaseClassIds.slice(0);

        while (metaToExplore !== null) {
            // MetaChildren
            for (i=0;i<metaToExplore.children.length;i++) {
                relatedNodeId = metaToExplore.children[i];
                if (self.id2MetaElement.hasOwnProperty(relatedNodeId)) {
                    relatedNodeElementDocLite = self.id2MetaElement[relatedNodeId].eDocLite;
                    if (elementDocToFill.ChildClasses.indexOf(relatedNodeElementDocLite) === -1) {
                        elementDocToFill.ChildClasses.push(relatedNodeElementDocLite);
                    }

                    // Add 'this' as a Parent of the Child
                    relatedNodeElementDoc = self.id2MetaElement[relatedNodeId].eDoc;
                    if (relatedNodeElementDoc.ParentContainerClasses.indexOf(eDocLiteToReciprocate) === -1) {
                        relatedNodeElementDoc.ParentContainerClasses.push(eDocLiteToReciprocate);
                    }
                }
            }

            // Pointers
            for (var pointerName in metaToExplore.pointers) {
                if (pointerName === 'src' && metaToExplore.pointers.hasOwnProperty(pointerName)) {
                    for (i=0;i<metaToExplore.pointers[pointerName].length;i++) {
                        relatedNodeId = metaToExplore.pointers[pointerName][i];
                        if (self.id2MetaElement.hasOwnProperty(relatedNodeId)) {
                            // Add the Source eDocLite to this
                            relatedNodeElementDocLite = self.id2MetaElement[relatedNodeId].eDocLite;
                            if (elementDocToFill.SourceClasses.indexOf(relatedNodeElementDocLite) === -1) {
                                elementDocToFill.SourceClasses.push(relatedNodeElementDocLite);
                            }

                            // Add 'this' as an OutgoingConn of the Source
                            relatedNodeElementDoc = self.id2MetaElement[relatedNodeId].eDoc;
                            if (relatedNodeElementDoc.OutgoingConnectionClasses.indexOf(eDocLiteToReciprocate) === -1) {
                                relatedNodeElementDoc.OutgoingConnectionClasses.push(eDocLiteToReciprocate);
                            }
                        }
                    }
                } else if (pointerName === 'dst' && metaToExplore.pointers.hasOwnProperty(pointerName)) {
                    for (i=0;i<metaToExplore.pointers[pointerName].length;i++) {
                        relatedNodeId = metaToExplore.pointers[pointerName][i];
                        if (self.id2MetaElement.hasOwnProperty(relatedNodeId)) {
                            // Add the Destination eDocLite to this
                            relatedNodeElementDocLite = self.id2MetaElement[relatedNodeId].eDocLite;
                            if (elementDocToFill.DestinationClasses.indexOf(relatedNodeElementDocLite) === -1) {
                                elementDocToFill.DestinationClasses.push(relatedNodeElementDocLite);
                            }

                            // Add 'this' as an IncomingConn of the Dst
                            relatedNodeElementDoc = self.id2MetaElement[relatedNodeId].eDoc;
                            if (relatedNodeElementDoc.IncomingConnectionClasses.indexOf(eDocLiteToReciprocate) === -1) {
                                relatedNodeElementDoc.IncomingConnectionClasses.push(eDocLiteToReciprocate);
                            }
                        }
                    }
                } else {
                    for (i=0;i<metaToExplore.pointers[pointerName].length;i++) {
                        relatedNodeId = metaToExplore.pointers[pointerName][i];
                        if (self.id2MetaElement.hasOwnProperty(relatedNodeId)) {
                            // Add the Referred type
                            relatedNodeElementDocLite = self.id2MetaElement[relatedNodeId].eDocLite;
                            if (elementDocToFill.ReferredClasses.indexOf(relatedNodeElementDocLite) === -1) {
                                elementDocToFill.ReferredClasses.push(relatedNodeElementDocLite);
                            }


                            // Add 'this' as a 'Referring' of the Referred
                            relatedNodeElementDoc = self.id2MetaElement[relatedNodeId].eDoc;
                            if (relatedNodeElementDoc.ReferringClasses.indexOf(eDocLiteToReciprocate) === -1) {
                                relatedNodeElementDoc.ReferringClasses.push(eDocLiteToReciprocate);
                            }
                        }
                    }
                }
            }

            metaToExplore = null;

            // Base and Derived Types
            relatedNodeId = baseClassIds.pop();
            if (self.id2MetaElement.hasOwnProperty(relatedNodeId)) {
                // Add the BaseClass
                relatedNodeElementDocLite = self.id2MetaElement[relatedNodeId].eDocLite;
                if (elementDocToFill.BaseClasses.indexOf(relatedNodeElementDocLite) === -1) {
                    elementDocToFill.BaseClasses.push(relatedNodeElementDocLite);
                }

                // Add 'this' to the BaseClass as a DerivedClass
                relatedNodeElementDoc = self.id2MetaElement[relatedNodeId].eDoc;
                if (relatedNodeElementDoc.DerivedClasses.indexOf(eDocLiteToReciprocate) === -1) {
                    relatedNodeElementDoc.DerivedClasses.push(eDocLiteToReciprocate);
                }

                // update metaToExplore
                metaToExplore = self.id2MetaElement[relatedNodeId].meta;
            } else {
                metaToExplore = null;
            }
        }
    };

    Meta2Doc.prototype.addInheritedRelationships = function (metaElementObject) {
        var self = this,
            listNames = [
                //"BaseClasses",
                //"DerivedClasses",
                "ParentContainerClasses",
                "ChildClasses",
                "ReferredClasses",
                "ReferringClasses",
                "OutgoingConnectionClasses",
                "IncomingConnectionClasses",
                "SourceClasses",
                "DestinationClasses"
            ],
            baseClassIds = metaElementObject.BaseClassIds,
            baseClassElementDoc,
            thisList,
            listToMerge,
            i,
            j,
            relatedClassId,
            relatedClassDerivedTypes;

        for (var listNameIndex=0;listNameIndex<listNames.length;listNameIndex++) {
            thisList = metaElementObject.eDoc[listNames[listNameIndex]];

            for (var idIndex=0;idIndex<baseClassIds.length;idIndex++) {
                baseClassElementDoc = self.id2MetaElement[baseClassIds[idIndex]].eDoc;
                listToMerge = baseClassElementDoc[listNames[listNameIndex]];

                // Iterate over items in the BaseClass's list
                for (i=0;i<listToMerge.length;i++) {
                    if (thisList.indexOf(listToMerge[i]) === -1) {
                        thisList.push(listToMerge[i]);
                    }
                }
            }

            // Add DerivedClasses of the Related Classes
            for (i=0;i<thisList.length;i++) {
                relatedClassId = thisList[i].ID;
                relatedClassDerivedTypes = self.id2MetaElement[relatedClassId].eDoc.DerivedClasses;

                for (j=0;j<relatedClassDerivedTypes.length;j++) {
                    if (thisList.indexOf(relatedClassDerivedTypes[j]) === -1) {
                        thisList.push(relatedClassDerivedTypes[j]);
                    }
                }
            }
        }
    };

    Meta2Doc.prototype.mergeListsWithoutDuplicates = function (masterList, listToAdd) {
        var self = this,
            secondListIndex,
            listItemToAdd;

        for (secondListIndex=0;secondListIndex<listToAdd.length;secondListIndex++) {
            listItemToAdd = listToAdd[secondListIndex];

            if (masterList.indexOf(listItemToAdd) === -1) {
                masterList.push(listItemToAdd);
            }
        }
    };

    Meta2Doc.prototype.makeNewElementDoc = function (metaNode, withDetails) {
        var self = this,
            baseNode,
            elementDoc = {
                "Name": null,
                "Type": 'FCO',
                "GUID": null,
                "ID": null,
                "Description": null,
                "Namespace": null,
                "IsAbstract": null,
                "IsImmediate": null,
                "Note": null,
                "Attributes": []
                //"Visualization": null
            };

        if (metaNode != null) {
            elementDoc.Name = self.core.getAttribute(metaNode, 'name');
            elementDoc.ID = self.core.getPath(metaNode);
            elementDoc.GUID = self.core.getGuid(metaNode);
            elementDoc.IsAbstract = self.core.getRegistry(metaNode, 'isAbstract');
        }

        if (withDetails) {
            elementDoc["BaseClasses"] = [];
            elementDoc["DerivedClasses"] = [];
            elementDoc["ParentContainerClasses"] = [];
            elementDoc["ChildClasses"] = [];
            elementDoc["ReferredClasses"] = [];
            elementDoc["ReferringClasses"] = [];
            elementDoc["OutgoingConnectionClasses"] = [];
            elementDoc["IncomingConnectionClasses"] = [];
            elementDoc["SourceClasses"] = [];
            elementDoc["DestinationClasses"] = [];
        }

        return elementDoc;
    };

    Meta2Doc.prototype.makeNewAttributeDoc = function (metaNode) {
        var self = this,
            attributeDoc = {
                "Name": null,
                "Type": null,
                "DefaultValue": null,
                "EnumOptions": null,
                "GUID": null,
                "Description": null,
                "Namespace": null,
                "IsImmediate": null,
                "Help": null
            };

        return attributeDoc;
    };

    Meta2Doc.prototype.getMeta = function (nodeObj){
        var self = this,
            meta = {children:{},attributes:{},pointers:{}},
            node = nodeObj || null;

        if(node){
            var metaNode = self.core.getChild(node,"_meta");
            var childrenNode = self.core.getChild(metaNode,"children");

            //children
            meta.children = self.core.getMemberPaths(childrenNode,"items");

            //attributes - they are simple json objects from our point of view
            var atrNames = self.core.getAttributeNames(metaNode);
            for(var i=0;i<atrNames.length;i++){
                meta.attributes[atrNames[i]] = JSON.parse(JSON.stringify(self.core.getAttribute(metaNode,atrNames[i])));
            }

            //pointers and pointer lists
            var pointerNames = self.core.getPointerNames(metaNode) || [];
            for(var i=0;i<pointerNames.length;i++){
                var pointerNode = self.core.getChild(metaNode,"_p_"+pointerNames[i]);
                meta.pointers[pointerNames[i]] = self.core.getMemberPaths(pointerNode,"items");
            }

            return meta;
        } else {
            return null;
        }
    };

    Meta2Doc.prototype.makeGetMetaElement = function (id, name, node) {
        var self = this;

        if (self.id2MetaElement.hasOwnProperty(id)) {
            return self.id2MetaElement[id];
        } else {
            self.id2MetaElement[id] = {
                "name": name,
                "node": node,
                "meta": self.getMeta(node),
                "eDoc": self.makeNewElementDoc(node, true)
            };

            return self.id2MetaElement[id];
        }
    };

    return Meta2Doc;
});