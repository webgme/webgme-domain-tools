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

describe("Test PluginResult/Message", function() {

    var PluginResult,
        PluginMessage;

    before(function(done){
        requirejs(['plugin/PluginResult',
                   'plugin/PluginMessage'],
                function(PluginResult_, PluginMessage_){
            PluginResult = PluginResult_;
            PluginMessage = PluginMessage_;
            done();
        });
    });

    afterEach(function() {

    });

    it ('getSuccess after initialize', function() {
        var result = new PluginResult();
        expect(result.getSuccess()).to.equal(false);
    });

    it ('serialize/deserialize after initialize', function() {
        var result = new PluginResult(),
            serialized,
            serializedPostDeserialized;
        serialized = result.serialize();
        serializedPostDeserialized = new PluginResult(serialized);

        expect(serialized.success === serializedPostDeserialized.success).to.equal(true);
        expect(serialized.pluginName === serializedPostDeserialized.pluginName).to.equal(true);
        expect(serialized.finishTime === serializedPostDeserialized.finishTime).to.equal(true);
        expect(serialized.messages.length === serializedPostDeserialized.messages.length).to.equal(true);
    });

    it ('serialize/deserialize with messages', function() {
        var result = new PluginResult(),
            serialized,
            serializedPostDeserialized,
            i,
            msg1,
            msg2;

        result.addMessage(new PluginMessage({
            "commitHash": "#bffc5c877a2c7689c46e6519dc567a215b2ebcf3",
            "activeNode": {
                "name": "ROOT",
                "id": ""
            },
            "activeSelection": [
                {
                    "name": "FCO",
                    "id": "/1"
                }
            ],
            "message": "Message text 0 element"
        }));

        result.addMessage(new PluginMessage({
            "commitHash": "#bffc5c877a2c7689c46e6519dc567a215b2ebcf3",
            "activeNode": {
                "name": "ROOT",
                "id": ""
            },
            "activeSelection": [
                {
                    "name": "Run it here Copy",
                    "id": "/243941094"
                }
            ],
            "message": "Message text 4 element"
        }));

        serialized = result.serialize();
        serializedPostDeserialized = (new PluginResult(serialized)).serialize();
        expect(serialized.success === serializedPostDeserialized.success).to.equal(true);
        expect(serialized.pluginName === serializedPostDeserialized.pluginName).to.equal(true);
        expect(serialized.finishTime === serializedPostDeserialized.finishTime).to.equal(true);
        expect(serialized.messages.length === serializedPostDeserialized.messages.length).to.equal(true);

        for (i = 0; i < serialized.messages.length; i += 1){
            msg1 = serialized.messages[i];
            msg2 = serializedPostDeserialized.messages[i];
            expect(msg1.commitHash === msg2.commitHash).to.equal(true);
            expect(msg1.message === msg2.message).to.equal(true);
        }

    });
});
