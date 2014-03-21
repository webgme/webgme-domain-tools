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
    baseUrl: __dirname
});


program.option('-i, --interpreterPath <name>', 'Path to given interpreter.', './src/interpreters/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica');
program.option('-s, --selectedObjID <webGMEID>', 'ID to selected component.', '/-1/-1/-3/-16');
program.parse(process.argv);
var interpreterName = program.interpreterPath;
//var interpreterName = './interpreters/DsmlApiGenerator/DsmlApiGenerator';
var selectedID = program.selectedObjID;
console.log('Given interpreter : %j', interpreterName);

// FIXME: dependency does matter!
requirejs(['src/PluginManager/PluginManagerBase', 'src/interpreters/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica', 'webgme'],
    function(PluginManager, CyPhy2Modelica, WebGME){
        var Core = WebGME.core,
            Storage = WebGME.serverUserStorage;


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


        var storage = new Storage({'host':config.host, 'port':config.port, 'database':config.database});


        var pluginManager = new PluginManager(storage, Core, {
       //     'DsmlApiGenerator': requirejs('src/interpreters/DSMLAPIGenerator/DsmlApiGenerator'),
            'CyPhyLight.CyPhy2Modelica': CyPhy2Modelica
        });

        pluginManager.executePlugin('CyPhyLight.CyPhy2Modelica', config, function (err, result) {
            console.log(result);
        });
    }
);