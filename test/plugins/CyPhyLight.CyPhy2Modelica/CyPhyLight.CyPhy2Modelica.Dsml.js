// to run this test: node_modules/.bin/mocha -u tdd test/plugins/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica.Dsml.js

'use strict';
var requirejs = require("requirejs");
requirejs.config({
    baseUrl: '.',
    nodeRequire: require
});

//suite('CyPhyLightCyPhy2Modelica', function() {
//    var plugin;
//
//    setup(function (done) {
//        // This saves the module foo for use in tests. You have to use
//        // the done callback because this is asynchronous.
//        requirejs(['src/plugins/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica.Dsml'],
//            function(mod) {
//                console.log("fired!");
//                plugin = mod;
//                done();
//            });
//    });
//
//    suite('configurations', function() {
//        test('doGUIConfig null config', function() {
//            var plugin = new plugin();
//            plugin.doGUIConfig(null, null);
//        });
//
//        test('doGUIConfig callback second arg undefined', function() {
//            var plugin = new plugin();
//            plugin.doGUIConfig(null, function(configuration, secondArg) {
//                if (configuration === undefined) {
//                    throw new Error("configuration cannot be undefined");
//                }
//
//                if (secondArg !== undefined) {
//                    throw new Error("only one return argument is expected");
//                }
//            });
//        });
//    });
//});