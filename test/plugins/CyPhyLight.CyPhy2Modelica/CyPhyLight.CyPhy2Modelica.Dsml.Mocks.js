// to run this test: node_modules/.bin/mocha -u tdd test/plugins/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica.Mocks.js

'use strict';
var requirejs = require("requirejs");
requirejs.config({
    baseUrl: '.',
    nodeRequire: require
});

//suite('CyPhyLightCyPhy2Modelica', function() {
//    var Plugin;
//    var CoreMock;
//    var CyPhyLight;
//
//    setup(function (done) {
//        // This saves the module foo for use in tests. You have to use
//        // the done callback because this is asynchronous.
//        requirejs(['src/plugins/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica.Dsml',
//            'src/mocks/CoreMock',
//            'src/plugins/DSMLAPIGenerator/CyPhyLight.Dsml'],
//            function(mod, coreMock, domain) {
//                //console.log("fired!");
//                Plugin = mod;
//                CoreMock = coreMock;
//                CyPhyLight = domain;
//                done();
//            });
//    });
//
//    suite('configurations', function() {
//        test('check success', function() {
//            // get a new instance of core mock
//            var core = new CoreMock();
//
//            // initialize DSML meta
//            var META = CyPhyLight.createMETATypesTests(core);
//            CyPhyLight.initialize(core, null, META);
//
//            // load test data structure
//            var rootNode = core.getRootNode();
//
//            var nodeCyPhyProject = core.createNode({parent:rootNode, base: CyPhyLight.CyPhyProject.Type});
//            var cyPhyProject = new CyPhyLight.CyPhyProject(nodeCyPhyProject);
//
//            var testing = cyPhyProject.createTesting();
//            testing.attributes.setname('new testing object');
//
//            var tb1 = testing.createTestBenchType();
//            tb1.attributes.setname('name111111111');
//            var tb2 = testing.createTestBenchType();
//            tb2.attributes.setname('name222222222');
//
//            // call functions
//            var plugin = new Plugin();
//
//            if (plugin.check(tb1, tb2)) {
//                throw new Error('names cannot be the same.');
//            }
//
//        });
//
//        test('check fail', function() {
//            // get a new instance of core mock
//            var core = new CoreMock();
//
//            // initialize DSML meta
//            var META = CyPhyLight.createMETATypesTests(core);
//            CyPhyLight.initialize(core, null, META);
//
//            // load test data structure
//            var rootNode = core.getRootNode();
//
//            var nodeCyPhyProject = core.createNode({parent:rootNode, base: CyPhyLight.CyPhyProject.Type});
//            var cyPhyProject = new CyPhyLight.CyPhyProject(nodeCyPhyProject);
//
//            var testing = cyPhyProject.createTesting();
//            testing.attributes.setname('new testing object');
//
//            var tb1 = testing.createTestBenchType();
//            tb1.attributes.setname('name1');
//            var tb2 = testing.createTestBenchType();
//            tb2.attributes.setname('name1');
//
//            // call functions
//            var plugin = new Plugin();
//
//            if (plugin.check(tb1, tb2) === false) {
//                throw new Error('names cannot be the same.');
//            }
//
//        });
//    });
//});