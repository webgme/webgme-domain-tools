// to run this test: node_modules/.bin/mocha -u tdd test/interpreters/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica.Mocks.js

'use strict';
var requirejs = require("requirejs");
requirejs.config({
    baseUrl: '.',
    nodeRequire: require
});

//suite('CyPhyLightCyPhy2Modelica', function() {
//    var Plugin;
//    var CoreMock;
//
//    setup(function (done) {
//        // This saves the module foo for use in tests. You have to use
//        // the done callback because this is asynchronous.
//        requirejs(['src/plugins/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica', 'src/mocks/CoreMock'],
//            function(mod, coreMock) {
//                console.log("fired!");
//                Plugin = mod;
//                CoreMock = coreMock;
//                done();
//            });
//    });
//
//    suite('configurations', function() {
//        test('run2', function() {
//            // get a new instance of core mock
//            var core = new CoreMock();
//
//            // load test data structure
//
//            // create context using the given data structure
//            var rootNode = core.getRootNode();
//            var context = {
//                project: null,
//                projectName: null,
//                core: core,
//                commitHash: null,
//                rootNode: rootNode,
//                selectedNode: rootNode
//            };
//
//            // call functions
//            var plugin = new Plugin();
//            plugin.run2(context, function (result) {
//
//            });
//        });
//
//    });
//});