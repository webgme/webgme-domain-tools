/**
 * Created by pmeijer on 3/24/14.
 *
 * Regenerate Templates.js
 * node src\tools\combine_templates.js -t src\plugins\META\DSMLAPIGenerator\Templates
 *
 */

define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'plugin/DsmlApiGenerator/DsmlApiGenerator/Templates/Templates',
        'ejs'], function (PluginConfig, PluginBase, TEMPLATES, ejs) {
    'use strict';

    /**
     * Initializes a new instance of DsmlApiGenerator.
     * @class
     * @augments {PluginBase}
     * @classdesc This class represents the plugin DsmlApiGenerator.
     * @constructor
     */
    var DsmlApiGenerator = function () {
        PluginBase.call(this);
    };

    DsmlApiGenerator.prototype = Object.create(PluginBase.prototype);
    DsmlApiGenerator.prototype.constructor = DsmlApiGenerator;

    /**
     * Gets the name of the DsmlApiGenerator.
     * @returns {string} The name of the plugin.
     * @public
     */
    DsmlApiGenerator.prototype.getName = function () {
        return 'DSML API Generator';
    };


    DsmlApiGenerator.prototype.main = function (callback) {
        var self = this,
            filesToAdd,
            artifact;

        self.logger.info('Generating domain specific JavaScript API for ' + self.projectName);

        var metaTypes = [];
        var metaTypesByID = {};
        var metaTypesByPath = {};

        for (var name in self.META) {
            if (self.META.hasOwnProperty(name)) {
                metaTypesByPath[self.core.getPath(self.META[name])] = self.META[name];
            }
        }

        for (var name in self.META) {
            if (self.META.hasOwnProperty(name)) {
                var metaType = {};
                metaType.name = self.core.getAttribute(self.META[name], 'name');
                metaType.ID = self.core.getPath(self.META[name]);
                metaType.GUID = self.core.getGuid(self.META[name]);
                metaType.Hash = self.core.getHash(self.META[name]);

                metaType.isAbstract = self.core.getRegistry(self.META[name], 'isAbstract');

                var baseNode = self.core.getBase(self.META[name]);
                if (baseNode) {
                    metaType.base = self.core.getAttribute(self.core.getBase(self.META[name]), 'name');
                }

                metaType.attributeNames = self.core.getAttributeNames(self.META[name]);
                metaType.attributeNames.sort();
                metaType.registryNames = self.core.getRegistryNames(self.META[name]);
                metaType.registryNames.sort();

                // TODO: pointers ...
                // TODO: set members ...
//
                var meta = this.getMeta(self.core, self.META[name]);

                metaType.isConnection = meta.pointers.hasOwnProperty('src') && meta.pointers.hasOwnProperty('dst');

                if (metaType.isConnection) {
                    this.logger.info('here');
                }

                metaType.children = [];
                for (var i = 0; i < meta.children.items.length; i += 1) {
                    metaType.children.push(meta.children.items[i]);
                }
                //metaType.children.sort(function (a, b) { return a.name.localeCompare(b.name); });

                metaTypes.push(metaType);
                metaTypesByID[metaType.ID] = metaType;
            }
        }

        metaTypes.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

        var domain = {
            projectName: self.projectName,
            metaTypes: metaTypes
        };

        filesToAdd = self.generateFilesToAdd(domain);
        artifact = self.blobClient.createArtifact('dsmlAPI');
        artifact.addFiles(filesToAdd, function (err, hashes) {
            if (err) {
                return callback(err, self.result);
            }
            artifact.save(function (err, hash) {
                if (err) {
                    return callback(err, self.result);
                }
                self.result.addArtifact(hash);
                self.result.setSuccess(true);
                callback(null, self.result);
            });
        });
    };

    DsmlApiGenerator.prototype.generateFilesToAdd = function (domain) {
        var projectName = domain.projectName;
        var DOMAIN_TEMPLATE = TEMPLATES['mainDOMAIN.js.ejs'];
        var TYPE_TEMPLATE = TEMPLATES['typeDOMAIN.js.ejs'];
        var CONSTRUCTOR_TEMPLATE = TEMPLATES['constructorsDomain.js.ejs'];
        var DEF_TEMPLATE = TEMPLATES['defDomain.js.ejs'];
        var ret = ejs.render(DOMAIN_TEMPLATE, domain);
        var idMap = this.getIDMap(domain);
        var outputDirZip = projectName + '/DSML/';
        var metaTypeFileName;
        var filesToAdd = {};

        // Generate the main DSML file.
        filesToAdd[outputDirZip + projectName + '.Dsml.js'] = ret;
        filesToAdd[outputDirZip + projectName + '.Dsml.json'] = JSON.stringify(domain, null, 4);

        // Generate the constructors file.
        ret = ejs.render(CONSTRUCTOR_TEMPLATE, domain);
        filesToAdd[outputDirZip + projectName + '.constructors.js'] = ret;

        // Generate the definition file.
        ret = ejs.render(DEF_TEMPLATE, domain);
        filesToAdd[outputDirZip + projectName + '.def.js'] = ret;

        // Generate all meta-type files.
        for (var metaTypeIndex = 0; metaTypeIndex < domain.metaTypes.length; metaTypeIndex += 1) {
            metaTypeFileName = projectName + '.' + domain.metaTypes[metaTypeIndex].name + '.Dsml.js';

            var typeData = {
                metaTypeName: domain.metaTypes[metaTypeIndex].name,
                ID: domain.metaTypes[metaTypeIndex].ID,
                GUID: domain.metaTypes[metaTypeIndex].GUID,
                Hash: domain.metaTypes[metaTypeIndex].Hash,
                base: domain.metaTypes[metaTypeIndex].base,
                attributeNames: domain.metaTypes[metaTypeIndex].attributeNames,
                registryNames: domain.metaTypes[metaTypeIndex].registryNames,
                isConnection: domain.metaTypes[metaTypeIndex].isConnection,
                children: domain.metaTypes[metaTypeIndex].children,
                idMap: idMap,
                projectName: domain.projectName
            };
            ret = ejs.render(TYPE_TEMPLATE, typeData);
            filesToAdd[outputDirZip + metaTypeFileName] = ret;
        }

        return filesToAdd;
    };

    DsmlApiGenerator.prototype.isValidJavascriptIdentifier = function (identifier) {
        // note: we do not allow unicode characters.
        var pattern = /^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[a-zA-Z_$][0-9a-zA-Z_$]*/g;
        return pattern.test(identifier);
    };

    DsmlApiGenerator.prototype.getIDMap = function (domain) {
        var idMap = {};
        for (var metaTypeIndex = 0; metaTypeIndex < domain.metaTypes.length; metaTypeIndex += 1) {
            idMap[domain.metaTypes[metaTypeIndex].ID] = domain.metaTypes[metaTypeIndex];
        }

        return idMap;
    };

    DsmlApiGenerator.prototype.getMeta = function (_core, nodeObj){
        var meta = {children:{},attributes:{},pointers:{}};
        var node = nodeObj || null;
        if(node){
            var metaNode = _core.getChild(node,"_meta");
            var childrenNode = _core.getChild(metaNode,"children");
            //children
            meta.children = {};
            meta.children.minItems = [];
            meta.children.maxItems = [];
            meta.children.items = _core.getMemberPaths(childrenNode,"items");
            for(var i=0;i<meta.children.items.length;i++){
                meta.children.minItems.push(_core.getMemberAttribute(childrenNode,"items",meta.children.items[i],"min") || -1);
                meta.children.maxItems.push(_core.getMemberAttribute(childrenNode,"items",meta.children.items[i],"max") || -1);
                //meta.children.items[i] = pathToRefObject(meta.children.items[i]);
            }
            meta.children.min = _core.getAttribute(childrenNode,"min");
            meta.children.max = _core.getAttribute(childrenNode,"max");

            //attributes - they are simple json objects from our point of view
            var atrNames = _core.getAttributeNames(metaNode);
            for(var i=0;i<atrNames.length;i++){
                meta.attributes[atrNames[i]] = JSON.parse(JSON.stringify(_core.getAttribute(metaNode,atrNames[i])));
            }

            //pointers and pointer lists
            var pointerNames = _core.getPointerNames(metaNode) || [];
            for(var i=0;i<pointerNames.length;i++){
                var pointerNode = _core.getChild(metaNode,"_p_"+pointerNames[i]);
                var pointer = {};
                pointer.items = _core.getMemberPaths(pointerNode,"items");
                pointer.min = _core.getAttribute(pointerNode,"min");
                pointer.max = _core.getAttribute(pointerNode,"max");
                pointer.minItems = [];
                pointer.maxItems = [];

                for(var j=0;j<pointer.items.length;j++){
                    pointer.minItems.push(_core.getMemberAttribute(pointerNode,"items",pointer.items[j],"min") || -1);
                    pointer.maxItems.push(_core.getMemberAttribute(pointerNode,"items",pointer.items[j],"max") || -1);
                    //pointer.items[j] = pathToRefObject(pointer.items[j]);

                }

                meta.pointers[pointerNames[i]] = pointer;
            }

            //aspects
            var aspectsNode = _core.getChild(metaNode,"aspects");
            var aspectNames = _core.getPointerNames(aspectsNode);
            if (aspectNames.length > 0){
                meta.aspects = {};
                for(var i=0;i<aspectNames.length;i++){
                    var aspectNode = _core.getChild(aspectsNode,"_a_"+aspectNames[i]);
                    meta.aspects[aspectNames[i]] = {items:[]};
                    var items = _core.getMemberPaths(aspectNode,"items");
                    for(var j=0;j<items.length;j++){
                        meta.aspects[aspectNames[i]].items.push(pathToRefObject(items[j]));
                    }
                }
            }

            return meta;
        } else {
            return null;
        }
    };

    return DsmlApiGenerator;
});