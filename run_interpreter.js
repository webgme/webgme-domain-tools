/*
 config object structure
 {
 "host": <string> shows the location of the webGME server //not really used by internally run interpreters = NUII,
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
        //interpreters: 'interpreters'
    }
});

// TODO: get this from command line argument
program.option('-i, --interpreterPath <name>', 'Path to given interpreter.', './src/interpreters/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica');
program.option('-s, --selectedObjID <webGMEID>', 'ID to selected component.', '/-1/-1/-3/-16');
program.parse(process.argv);
var interpreterName = program.interpreterPath;
//var interpreterName = './interpreters/DsmlApiGenerator/DsmlApiGenerator';
var selectedID = program.selectedObjID;
console.log('Given interpreter : %j', interpreterName);


// FIXME: dependency does matter!
requirejs([interpreterName, 'webgme'],
    function(Interpreter, WebGME){
        console.log(Interpreter);
        var Core = WebGME.core,
            Storage = WebGME.serverUserStorage;

        //somehow you should build up a config object for the interpreter
        //and get the name of the interpreter
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
                                context.core = new Core(context.project,{corerel:2});
                                context.commitHash = config.commit;
                                context.selected = config.selected;
                                context.project.loadObject(context.commitHash, function(err, commitObj) {
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
                "commit": "#668b3babcdf2ddcd7ba38b51acb62d63da859d90"
                //"root": ""
                //"branch": "master"
            };

        // callback for getContext
        function invokeInterpreterHandler(err, context){
            if (err) {
                console.log(err);
            } else {
                console.log(Interpreter);
                var interpreter = new Interpreter();
                var dataConfig = null;
                interpreter.doGUIConfig(null, function (interpreterConfig) {
                    if (interpreterConfig.dataSourcePath) {
                        dataConfig = require(interpreterConfig.dataSourcePath);
                    }
                });

                context.dataConfig = dataConfig;
                interpreter.run(context, function(result) {
                    console.log(result);
                });
            }
        }

        getContext(config, invokeInterpreterHandler);
    }
);