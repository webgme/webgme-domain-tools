/**
 * Created by zsolt on 3/31/14.
 */

'use strict';
if (typeof window === 'undefined') {

    // server-side setup
    var webgme = require('webgme');
    var CONFIG = require('../../config.json');
    webGMEGlobal.setConfig(CONFIG);

    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}

describe("Plugin tests", function() {
    it('should run ChildrenConfig on Test', function(done) {
        webgme.runPlugin.main(webGMEGlobal.getConfig(), {
            projectName: 'Test',
            pluginName: 'ChildrenConfig',
            activeNode: ''
        }, function (err, result) {
            expect(err).to.equal(null);
            // TODO: expect result is a PluginResult type
            expect(result.getSuccess()).to.equal(true);
            done();
        });
    });

    it('should ChildrenConfig fail if no active node', function(done) {
        webgme.runPlugin.main(webGMEGlobal.getConfig(), {
            projectName: 'Test',
            pluginName: 'ChildrenConfig'
        }, function (err, result) {
            expect(err).to.not.equal(null);
            done();
        });
    });

});