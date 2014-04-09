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
        }, function (err) {
            expect(err).to.equal(null);
            done();
        });
    });
});