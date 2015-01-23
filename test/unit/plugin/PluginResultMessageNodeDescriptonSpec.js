/**
 * Created by pmeijer on 4/3/2014.
 */

'use strict';
if (typeof window === 'undefined') {

    // server-side setup
    var requirejs = require("../../../test-conf.js").requirejs;

    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}

var msgConfig1 = {
    "commitHash": "#bffc5c877a2c7689c46e6519dc567a215b2ebcf3",
    "activeNode": {
        "name": "ROOT",
        "id": "/1/2/3"
    },
    "activeSelection": [
        {
            "name": "FCO",
            "id": "/1"
        },
        {
            "name": "FCO2",
            "id": "/2"
        }
    ],
    "message": "Message text 0 element"
};
var msgConfig2 = {
    "commitHash": "#bffc5c877a2c7689c46e6519dc567a215b2ebcf3",
    "activeNode": {
        "name": "ROOT",
        "id": "/1/2/3"
    },
    "activeSelection": [
        {
            "name": "Run it here Copy",
            "id": "/243941094"
        }
    ],
    "message": "Message text 4 element"
};

describe("Test PluginResult/Message/NodeDescription", function() {

    var PluginResult,
        PluginMessage,
        PluginNodeDescription;

    before(function(done){
        requirejs(['plugin/PluginResult', 'plugin/PluginMessage', 'plugin/PluginNodeDescription'],
            function(PluginResult_, PluginMessage_, PluginNodeDescription_){
                PluginResult = PluginResult_;
                PluginMessage = PluginMessage_;
                PluginNodeDescription = PluginNodeDescription_;
                done();
        });
    });

    afterEach(function() {

    });

    it ('PluginNodeDescription serialize/deserialize.', function() {
        var node,
            serialized,
            serializedPostDeserialized;

        node = new PluginNodeDescription({name: 'aNode', id: '/1/2/3'});
        serialized = node.serialize();
        serializedPostDeserialized = (new PluginNodeDescription(serialized));

        expect(serialized.name).to.equal(serializedPostDeserialized.name);
        expect(serialized.id).to.equal(serializedPostDeserialized.id);
    });

    it ('PluginNodeDescription empty initialize should work.', function() {
        var node =  new PluginNodeDescription(),
            serialized = node.serialize();

        expect(serialized.name).to.equal('');
        expect(serialized.id).to.equal('');
    });

    it ('PluginMessage serialize/deserialize.', function() {
        var message,
            serialized,
            serializedPostDeserialized;

        message = new PluginMessage(msgConfig1);
        serialized = message.serialize();
        serializedPostDeserialized = (new PluginMessage(serialized));

        expect(serialized.commitHash).to.equal(serializedPostDeserialized.commitHash);
        expect(serialized.message).to.equal(serializedPostDeserialized.message);
        expect(serialized.activeNode.name).to.equal(serializedPostDeserialized.activeNode.name);
        expect(serialized.activeNode.id).to.equal(serializedPostDeserialized.activeNode.id);

    });

    it ('PluginResult getSuccess after initialize.', function() {
        var result = new PluginResult();
        expect(result.getSuccess()).to.equal(false);
    });

    it ('PluginResult get/setSuccess.', function() {
        var result = new PluginResult();
        result.setSuccess(true);
        expect(result.getSuccess()).to.equal(true);
    });

    it ('PluginResult serialize/deserialize after initialize.', function() {
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

    it ('PluginResult serialize/deserialize with messages.', function() {
        var result = new PluginResult(),
            serialized,
            serializedPostDeserialized,
            i,
            msg1,
            msg2;

        result.addMessage(new PluginMessage(msgConfig1));

        result.addMessage(new PluginMessage(msgConfig2));

        serialized = result.serialize();
        serializedPostDeserialized = (new PluginResult(serialized)).serialize();
        expect(serialized.success).to.equal(serializedPostDeserialized.success);
        expect(serialized.pluginName).to.equal(serializedPostDeserialized.pluginName);
        expect(serialized.finishTime).to.equal(serializedPostDeserialized.finishTime);
        expect(serialized.messages.length).to.equal(serializedPostDeserialized.messages.length);

        for (i = 0; i < serialized.messages.length; i += 1){
            msg1 = serialized.messages[i];
            msg2 = serializedPostDeserialized.messages[i];
            expect(msg1.commitHash).to.equal(msg2.commitHash);
            expect(msg1.message).to.equal(msg2.message);
            expect(msg1.activeNode.name).to.equal(msg2.activeNode.name);
            expect(msg1.activeNode.id).to.equal(msg2.activeNode.id);
        }

    });
});
