/**
 * Created by pmeijer on 3/24/14.
 */
define(['src/PluginManager/PluginConfig', 'src/PluginManager/PluginBase', 'fs','ejs', 'src/plugins/META/DSMLAPIGenerator/DsmlApiGenerator'],
    function (PluginConfig, PluginBase, fs, ejs, DsmlApiGenerator) {
        "use strict";

        var DsmlApiGeneratorMultiFile = function () {

        };

        DsmlApiGeneratorMultiFile.prototype = Object.create(DsmlApiGenerator.prototype);

        DsmlApiGeneratorMultiFile.getDefaultConfig = function () {
            return DsmlApiGenerator.getDefaultConfig();
        };

        DsmlApiGeneratorMultiFile.Utils = function () {

        };

        DsmlApiGeneratorMultiFile.Utils.isValidJavascriptIdentifier = function (identifier) {
            DsmlApiGenerator.Utils.isValidJavascriptIdentifier(identifier);
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
            var DOMAIN_TEMPLATE = fs.readFileSync('src/plugins/META/DSMLAPIGenerator/mainDOMAIN.js.ejs', 'utf8');
            var TYPE_TEMPLATE = fs.readFileSync('src/plugins/META/DSMLAPIGenerator/typeDOMAIN.js.ejs', 'utf8');
            var CONSTRUCTOR_TEMPLATE = fs.readFileSync('src/plugins/META/DSMLApiGenerator/constructorsDOMAIN.js.ejs', 'utf8');
            var DEF_TEMPLATE = fs.readFileSync('src/plugins/META/DSMLAPIGenerator/defDOMAIN.js.ejs', 'utf8');
            var ret = ejs.render(DOMAIN_TEMPLATE, domain);
            var idMap = this.getIDMap(domain);
            var outputDir = 'src/plugins/' + projectName + '/DSML/';

            if (fs.existsSync(outputDir)) {
                var oldFiles = fs.readdirSync(outputDir);
                for (var i = 0; i < oldFiles.length; i += 1){
                    fs.unlinkSync(outputDir + oldFiles[i]);
                }

                fs.rmdirSync(outputDir);
            }

            fs.mkdirSync(outputDir); // Make sure the folder is not expanded in the WebStorm project tree.

            // Generate the main DSML file.
            var outputfileName = outputDir + projectName + '.Dsml.js';
            fs.writeFileSync(outputfileName, ret, 'utf8');
            fs.writeFileSync(outputDir + projectName + '.Dsml.json', JSON.stringify(domain, null, 4), 'utf8');
            console.info(outputfileName + ' was generated.');

            // Generate the constructors file.
            outputfileName = outputDir + projectName + '.constructors.js';
            ret = ejs.render(CONSTRUCTOR_TEMPLATE, domain);
            fs.writeFileSync(outputfileName, ret, 'utf8');
            console.info(outputfileName + ' was generated.');

            // Generate the defintion file.
            outputfileName = outputDir + projectName + '.def.js';
            ret = ejs.render(DEF_TEMPLATE, domain);
            fs.writeFileSync(outputfileName, ret, 'utf8');
            console.info(outputfileName + ' was generated.');

            // Generate all meta-type files.
            for (var metaTypeIndex = 0; metaTypeIndex < domain.metaTypes.length; metaTypeIndex += 1) {
                outputfileName = outputDir + projectName + '.' +
                                 domain.metaTypes[metaTypeIndex].name + '.Dsml.js';

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
                fs.writeFileSync(outputfileName, ret, 'utf8');

                //fs.writeFileSync('src/plugins/DsmlApiGenerator/' + projectName + '.Dsml.json', JSON.stringify(domain, null, 4), 'utf8');

                console.info(outputfileName + ' was generated.');

            }
        };

        DsmlApiGeneratorMultiFile.prototype.main = function (config, callback) {
            var logger = console;

            logger.info('Run started..');

            var rootNode = config.rootNode,
                selectedNode = config.selectedNode,
                core = config.core,
                project = config.project,
                projectName = config.projectName,
                META = config.META,
                result;

            result = {'commitHash': config.commitHash};

            logger.info('Generating domain specific JavaScript API for ' + projectName);

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
                        console.log('here');
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

            console.log('done');
            callback(null, {success:true});
        };


        return DsmlApiGeneratorMultiFile;
    });