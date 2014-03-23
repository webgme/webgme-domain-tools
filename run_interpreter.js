/*
 config object structure
 {
 "host": <string> shows the location of the webGME server //not really used by internally run plugins = NUII,
 "project": <string> show the name of the project,
 "token": <string> authentication token for REST API //NUII,
 "selected": <string> gives the URL / path of the selected object , you can convert URL to path,
 "commit": <string> the hash / URL part of the selected commit, you can convert URL part to hash,
 "root": <string> the hash / URL of the root object, you can convert URL to hash,
 "branch": <string> the name of the selected branch
 }
 */
var requirejs = require("requirejs");
var program = require('commander');
var CONFIG = require('./config.json');

requirejs.config({
    nodeRequire: require,
    baseUrl: __dirname,
    paths: {
        //plugins: 'plugins'
    }
});

// TODO: get this from command line argument
program.option('-i, --pluginPath <name>', 'Path to given plugin.', './src/plugins/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica');
program.option('-s, --selectedObjID <webGMEID>', 'ID to selected component.', '/-1/-1/-3/-16');
program.parse(process.argv);
var pluginName = program.pluginPath;
//var pluginName = './plugins/DsmlApiGenerator/DsmlApiGenerator';
var selectedID = program.selectedObjID;
console.log('Given plugin : %j', pluginName);


// FIXME: dependency does matter!
requirejs([pluginName, 'webgme'],
    function(Interpreter, WebGME){
        console.log(Interpreter);
        var Core = WebGME.core,
            Storage = WebGME.serverUserStorage;

        //somehow you should build up a config object for the plugin
        //and get the name of the plugin
        //now we start with a predefined ones

        var loadMetaNodes = function (context, callback) {

             // get meta members
            var metaIDs = context.core.getMemberPaths(context.rootNode, 'MetaAspectSet');

            var len = metaIDs.length;

            var nodeObjs = [];


            var allObjectsLoadedHandler = function () {
                var len2 = nodeObjs.length;

                var nameObjMap = {};

                while (len2--) {
                    var nodeObj = nodeObjs[len2];

                    nameObjMap[context.core.getAttribute(nodeObj, 'name')] = nodeObj;
                }

                context.META = nameObjMap;
                callback(null, context);
            };

            var loadedMetaObjectHandler = function (err, nodeObj) {
                nodeObjs.push(nodeObj);

                if (nodeObjs.length === metaIDs.length) {
                    allObjectsLoadedHandler();
                }
            };

            while (len--) {
                context.core.loadByPath(context.rootNode, metaIDs[len], loadedMetaObjectHandler);
            }
        };

        var getContext = function(config,callback) {
            var context = { storage: new Storage({'host':config.host, 'port':config.port, 'database':config.database})};
            context.storage.openDatabase(function(err){
                console.log('database is open');

                    if (!err) {
                        context.storage.openProject(config.project,function(err,project){
                            if(!err){
                                context.project = project;
                                context.projectName = config.project;
                                context.core = new Core(context.project,{corerel:2});
                                context.commitHash = config.commit;
                                context.selected = config.selected;

                                var loadCommitHashAndRun = function (commitHash) {
                                    context.project.loadObject(commitHash, function(err, commitObj) {
                                        if(!err && commitObj !== null && commitObj !== undefined){
                                            context.core.loadRoot(commitObj.root, function(err, rootNode) {
                                                if(!err){
                                                    context.rootNode = rootNode;
                                                    if(typeof context.selected === 'string'){
                                                        context.core.loadByPath(context.rootNode, context.selected, function (err, selectedNode) {
                                                            if(!err){
                                                                context.selectedNode = selectedNode;
                                                                loadMetaNodes(context, callback);
                                                            } else {
                                                                callback("unable to load selected object",context);
                                                            }
                                                        });
                                                    } else {
                                                        context.selectedNode = null;
                                                        loadMetaNodes(context, callback);
                                                    }
                                                } else {
                                                    callback("unable to load root",context);
                                                }
                                            });
                                        } else {
                                            callback('cannot find commit',context);
                                        }

                                    });
                                };

                                if (config.branchName) {
                                    context.project.getBranchNames(function (err, branchNames) {
                                        console.log(branchNames);
                                        if (branchNames.hasOwnProperty(config.branchName)) {
                                            context.commitHash = branchNames[config.branchName];
                                            console.log(context.commitHash);
                                            loadCommitHashAndRun(context.commitHash);
                                        } else {
                                            callback('cannot find branch',context);
                                        }
                                    });
                                } else {
                                    loadCommitHashAndRun(context.commitHash);
                                }


                            } else {
                                callback("cannot openproject",context);
                            }
                        });
                    } else {
                        callback("cannot open database",context);
                    }
            });
            console.log('is database already open');
        };

        // TODO: read from file or command line arguments
        var config = {
                "host": CONFIG.mongoip,
                "port": CONFIG.mongoport,
                "database": "multi",
                "project": "CyPhyLight",
                "token": "",
                "selected": selectedID,
                "commit": null, //"#668b3babcdf2ddcd7ba38b51acb62d63da859d90",
                //"root": ""
                "branchName": "master"
            };

        // callback for getContext
        function invokeInterpreterHandler(err, context){
            if (err) {
                console.log(err);
            } else {
                console.log(Interpreter);
                var plugin = new Interpreter();
                var dataConfig = null;
                plugin.doGUIConfig(null, function (pluginConfig) {
                    if (pluginConfig.dataSourcePath) {
                        dataConfig = require(pluginConfig.dataSourcePath);
                    }
                });

                context.dataConfig = dataConfig;
                plugin.run(context, function(result) {
                    console.log(result);
                });
            }
        }

        getContext(config, invokeInterpreterHandler);
    }
);