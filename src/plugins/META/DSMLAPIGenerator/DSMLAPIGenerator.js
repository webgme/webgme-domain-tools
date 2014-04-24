/**
 * Created by pmeijer on 3/24/14.
 *
 * Regenerate Templates.js
 * node src\tools\combine_templates.js -t src\plugins\META\DSMLAPIGenerator\Templates
 *
 */

define(['plugin/PluginConfig', 'plugin/PluginBase', 'plugin/DSMLAPIGenerator/DSMLAPIGenerator/Templates/Templates', 'ejs'],
    function (PluginConfig, PluginBase, TEMPLATES, ejs) {
        "use strict";

        var DsmlApiGeneratorMultiFile = function () {
            PluginBase.call(this);
        };

        DsmlApiGeneratorMultiFile.prototype = Object.create(PluginBase.prototype);

        DsmlApiGeneratorMultiFile.prototype.getName = function () {
            return 'DSML API Generator Multiple files';
        };

        DsmlApiGeneratorMultiFile.getDefaultConfig = function () {
            return new PluginConfig();
        };

        // FIXME: this method was copied from webgme meta.js
        DsmlApiGeneratorMultiFile.prototype.getMeta = function (_core, nodeObj){
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

        DsmlApiGeneratorMultiFile.Utils = function () {

        };

        DsmlApiGeneratorMultiFile.Utils.isValidJavascriptIdentifier = function (identifier) {
            // note: we do not allow unicode characters.
            var pattern = /^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[a-zA-Z_$][0-9a-zA-Z_$]*/g;
            return pattern.test(identifier);
        };

        DsmlApiGeneratorMultiFile.prototype.getIDMap = function (domain) {
            var idMap = {};
            for (var metaTypeIndex = 0; metaTypeIndex < domain.metaTypes.length; metaTypeIndex += 1) {
                idMap[domain.metaTypes[metaTypeIndex].ID] = domain.metaTypes[metaTypeIndex];
            }

            return idMap;
        };

        DsmlApiGeneratorMultiFile.prototype.generateFiles = function (domain) {
            var projectName = domain.projectName;
            var DOMAIN_TEMPLATE = TEMPLATES['mainDOMAIN.js.ejs'];
            var TYPE_TEMPLATE = TEMPLATES['typeDOMAIN.js.ejs'];
            var CONSTRUCTOR_TEMPLATE = TEMPLATES['constructorsDomain.js.ejs'];
            var DEF_TEMPLATE = TEMPLATES['defDomain.js.ejs'];
            var ret = ejs.render(DOMAIN_TEMPLATE, domain);
            var idMap = this.getIDMap(domain);
            var outputDirZip = projectName + '/DSML/';
            var metaTypeFileName;

            // Generate the main DSML file.
            this.fs.addFile(outputDirZip + projectName + '.Dsml.js', ret);
            this.fs.addFile(outputDirZip + projectName + '.Dsml.json', JSON.stringify(domain, null, 4));
            //this.logger.info(outputfileName + ' was generated.');

            // Generate the constructors file.
            ret = ejs.render(CONSTRUCTOR_TEMPLATE, domain);
            this.fs.addFile(outputDirZip + projectName + '.constructors.js', ret);
            //this.logger.info(outputfileName + ' was generated.');

            // Generate the definition file.
            ret = ejs.render(DEF_TEMPLATE, domain);
            this.fs.addFile(outputDirZip + projectName + '.def.js', ret);
            //this.logger.info(outputfileName + ' was generated.');

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

                this.fs.addFile(outputDirZip + metaTypeFileName, ret);

                //this.logger.info(outputfileName + ' was generated.');
            }

            this.fs.saveArtifact();
        };

        DsmlApiGeneratorMultiFile.prototype.main = function (callback) {
            var core = this.core,
                projectName = this.projectName,
                META = this.META;

            this.logger.info('Generating domain specific JavaScript API for ' + projectName);

            var metaTypes = [];
            var metaTypesByID = {};
            var metaTypesByPath = {};


            for (var name in META) {
                if (META.hasOwnProperty(name)) {
                    metaTypesByPath[core.getPath(META[name])] = META[name];
                }
            }

            for (var name in META) {
                if (META.hasOwnProperty(name)) {
                    var metaType = {};
                    metaType.name = core.getAttribute(META[name], 'name');
                    metaType.ID = core.getPath(META[name]);
                    metaType.GUID = core.getGuid(META[name]);
                    metaType.Hash = core.getHash(META[name]);

                    metaType.isAbstract = core.getRegistry(META[name], 'isAbstract');

                    var baseNode = core.getBase(META[name]);
                    if (baseNode) {
                        metaType.base = core.getAttribute(core.getBase(META[name]), 'name');
                    }

                    metaType.attributeNames = core.getAttributeNames(META[name]);
                    metaType.attributeNames.sort();
                    metaType.registryNames = core.getRegistryNames(META[name]);
                    metaType.registryNames.sort();

                    // TODO: pointers ...
                    // TODO: set members ...



                    var meta = this.getMeta(core, META[name]);

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

            metaTypes.sort(function (a, b) { return a.name.localeCompare(b.name); });

            var domain = {
                projectName: projectName,
                metaTypes: metaTypes
            };

            this.generateFiles(domain);

            this.logger.info('done');
            if (callback) {
                this.result.success = true;
                callback(null, this.result);
            }
        };


        return DsmlApiGeneratorMultiFile;
    });