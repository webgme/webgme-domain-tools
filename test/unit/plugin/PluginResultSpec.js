/**
 * Created by pmeijer on 4/3/2014.
 */
'use strict';
if (typeof window === 'undefined') {

    // server-side setup
    var requirejs = require("requirejs");
    requirejs.config({
        baseUrl: '.',
        // TODO: populate plugin list dynamically based on config.json
        paths: {
            "logManager": "common/LogManager",
            'plugin': 'node_modules/webgme/plugin',
            "plugin/Children.Dsml": "./src/plugins/CyPhyLight",
            "plugin/CyPhyLight": "./src/plugins/CyPhyLight",
            "plugin/ModelicaImporter": "./src/plugins/CyPhyLight",
            "plugin/ModelicaImporter.Dsml": "./src/plugins/CyPhyLight",
            "plugin/Children": "./src/plugins/Examples",
            "plugin/ChildrenConfig": "./src/plugins/Examples",
            "plugin/ChildrenSaveArtifacts": "./src/plugins/Examples",
            "plugin/DuplicateActiveNode": "./src/plugins/Examples",
            "plugin/UsingTemplates": "./src/plugins/Examples",
            "plugin/DSMLAPIGenerator": "./src/plugins/META",
            "plugin/GetPrintAllObjects": "./src/plugins/FMU",
            "plugin/ImportFMUs": "./src/plugins/FMU",
            "plugin/PetriNetExporter": "./src/plugins/PetriNet"
        },
        nodeRequire: require
    });

    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}

describe("Test PluginResult", function() {

    var PluginResult;
    before(function(done){
        requirejs(['plugin/PluginResult'], function(PluginResult_){
            PluginResult = PluginResult_;
            done();
        });
    });

    afterEach(function() {

    });

    it ('getSuccess after initialize', function() {
        var result = new PluginResult();

        expect(result.getSuccess()).to.be.false;
    });

    it ('serialize/deserialize after initialize', function() {
        var result = new PluginResult(),
            serialized,
            serializedPostDeserialized;
        serialized = result.serialize();
        serializedPostDeserialized = new PluginResult(serialized);

        expect(serialized.success === serializedPostDeserialized.success).to.be.true;
        expect(serialized.pluginName === serializedPostDeserialized.pluginName).to.be.true;
        expect(serialized.finishTime === serializedPostDeserialized.finishTime).to.be.true;
        expect(serialized.messages.length === serializedPostDeserialized.messages.length).to.be.true;
    });
});
