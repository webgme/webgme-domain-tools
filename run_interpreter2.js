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

var main = function() {
    // main code
    var requirejs = require("requirejs");
    var program = require('commander');
    var CONFIG = require('./config.json');

    requirejs.config({
        nodeRequire: require,
        baseUrl: __dirname
    });


    program.option('-p, --project <name>', 'Name of the project.', 'CyPhyLight');
    program.option('-b, --branch <name>', 'Name of the branch.', 'master');
    program.option('-i, --pluginPath <name>', 'Path to given plugin.', './src/plugins/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica');
    program.option('-s, --selectedObjID <webGMEID>', 'ID to selected component.', '/-1/-1/-3/-16');
    program.parse(process.argv);
    var pluginName = program.pluginPath;
//var pluginName = './plugins/DsmlApiGenerator/DsmlApiGenerator';
    var selectedID = program.selectedObjID;
    console.log('Given plugin : %j', pluginName);


// TODO: read from file or command line arguments
    var config = {
        "host": CONFIG.mongoip,
        "port": CONFIG.mongoport,
        "database": "multi",
        "project": program.project,
        "token": "",
        "selected": selectedID,
        "commit": null, //"#668b3babcdf2ddcd7ba38b51acb62d63da859d90",
        //"root": ""
        "branchName": program.branch
    };

    var PluginManager = requirejs('src/PluginManager/PluginManagerBase');
    // TODO: move the downloader to PluginManager
    var Plugin = requirejs(pluginName);

    // FIXME: dependency does matter!
    var WebGME = requirejs('webgme');

    var Core = WebGME.core,
        Storage = WebGME.serverUserStorage;
    var storage = new Storage({'host':config.host, 'port':config.port, 'database':config.database});

    var plugins = {};
    plugins[pluginName] = Plugin;

    var pluginManager = new PluginManager(storage, Core, plugins);

    pluginManager.executePlugin(pluginName, config, function (err, result) {
        console.log(result);
    });
};

if (require.main === module) {
    main();
}