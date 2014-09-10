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

        var documentationArtifact = self.blobClient.createArtifact('FMU');

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
            id,
            metaElement;

        for (metaElementName in self.META) {
            if (self.META.hasOwnProperty(metaElementName)) {
                metaElementNode = self.META[metaElementName];
                id = self.core.getPath(metaElementNode);

                // Sep10Experiment
                metaElement = self.makeGetMetaElement(id, metaElementName, metaElementNode);
            }
        }

        for (id in self.id2MetaElement) {
            if (self.id2MetaElement.hasOwnProperty(id)) {
                metaElement = self.id2MetaElement[id];

                self.engorgeExistingElementDoc(metaElement);

                self.LanguageDocumentation.LanguageElements[metaElement.name] = metaElement.eDoc;
            }
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

    Meta2Doc.prototype.engorgeExistingElementDoc = function (metaElementObject) {
        var self = this,
            iterator,
            tempElementDoc,
            simpleMetaElementDoc = self.makeNewElementDoc(metaElementObject.node, false);

        // BaseClasses
        var baseClass = self.core.getBase(metaElementObject.node);
        if (baseClass != null) {
            var baseClassDoc = self.makeNewElementDoc(baseClass, false),
                baseClassId = self.core.getPath(baseClass),
                baseClassMetaElementObject;
            baseClassDoc.IsImmediate = true;
            metaElementObject.eDoc.BaseClasses.push(baseClassDoc);

            // DerivedClasses (of the BaseClass)
            if (self.id2MetaElement.hasOwnProperty(baseClassId)) {
                baseClassMetaElementObject = self.id2MetaElement[baseClassId];
                tempElementDoc = simpleMetaElementDoc;
                tempElementDoc.IsImmediate = true;
                baseClassMetaElementObject.eDoc.DerivedClasses.push(tempElementDoc);
            }

        }

        for (var pointerName in metaElementObject.meta.pointers) {
            // SourceClasses
            if (pointerName === 'src' && metaElementObject.meta.pointers.hasOwnProperty('src')) {
                var srcNodeId,
                    srcMetaElementObject;

                metaElementObject.eDoc.Type = 'Connection';

                for (iterator=0;iterator<metaElementObject.meta.pointers['src'].length;iterator++) {
                    srcNodeId = metaElementObject.meta.pointers['src'][iterator];
                    srcMetaElementObject = self.id2MetaElement[srcNodeId];
                    tempElementDoc = self.makeNewElementDoc(srcMetaElementObject.node, false);
                    tempElementDoc.IsImmediate = true;
                    metaElementObject.eDoc.SourceClasses.push(tempElementDoc);

                    // OutgoingConnectionClasses (of the SourceClass)
                    tempElementDoc = simpleMetaElementDoc;
                    tempElementDoc.IsImmediate = true;
                    srcMetaElementObject.eDoc.OutgoingConnectionClasses.push(tempElementDoc);
                }
            } else if (pointerName === 'dst' && metaElementObject.meta.pointers.hasOwnProperty('dst')) {
                var dstNodeId,
                    dstMetaElementObject;

                for (iterator=0;iterator<metaElementObject.meta.pointers['dst'].length;iterator++) {
                    dstNodeId = metaElementObject.meta.pointers['dst'][iterator];
                    dstMetaElementObject = self.id2MetaElement[dstNodeId];
                    tempElementDoc = self.makeNewElementDoc(dstMetaElementObject.node, false);
                    tempElementDoc.IsImmediate = true;
                    metaElementObject.eDoc.DestinationClasses.push(tempElementDoc);

                    // IncomingConnectionClasses (of the DestinationClass)
                    tempElementDoc = simpleMetaElementDoc;
                    tempElementDoc.IsImmediate = true;
                    dstMetaElementObject.eDoc.IncomingConnectionClasses.push(tempElementDoc);
                }
            } else {
                var referredNodeId,
                    referredMetaElementObject;

                for (iterator=0;iterator<metaElementObject.meta.pointers[pointerName].length;iterator++) {
                    referredNodeId = metaElementObject.meta.pointers[pointerName][iterator];
                    referredMetaElementObject = self.id2MetaElement[referredNodeId];
                    tempElementDoc = self.makeNewElementDoc(referredMetaElementObject.node, false);
                    tempElementDoc.Note = pointerName;
                    metaElementObject.eDoc.ReferredClasses.push(tempElementDoc);

                    // IncomingConnectionClasses (of the DestinationClass)
                    tempElementDoc = simpleMetaElementDoc;
                    tempElementDoc.Note = pointerName;
                    referredMetaElementObject.eDoc.ReferringClasses.push(tempElementDoc);
                }
            }
        }
    };

    Meta2Doc.prototype.makeNewElementDoc = function (metaNode, withDetails) {
        var self = this,
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

    return Meta2Doc;
});