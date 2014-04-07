/**
 * Created by zsolt on 3/31/14.
 */

'use strict';
if (typeof window === 'undefined') {

    var webgme = require('webgme');

    // server-side setup
    var requirejs = require("requirejs");
    //var testConfig = require("../../test-conf.js").testConfig;
    // TODO: fix this path issue
    requirejs.config({
        paths: {
            "plugin/ChildrenConfig": "../../src/plugins/Examples"
        }
        });

    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;

    var CONFIG = require('../../config.json');
}

//var exec = require('child_process').exec;


describe("Plugin tests", function() {
    it('should run ChildrenConfig on Test', function(done) {
        webgme.runPlugin.main(CONFIG, {
            projectName: 'Test',
            pluginName: 'ChildrenConfig'
        }, function (err) {
            expect(err).to.equal(null);
            done();
        });
    });


// TODO: remove this block
// run tests in a separate process
//    it('should run ChildrenConfig on Test', function(done) {
//        var child = exec('node node_modules/webgme/bin/run_plugin.js -c config.json -p Test -n ChildrenConfig',
//            function (error, stdout, stderr) {
//                console.log('stdout: ' + stdout);
//                console.log('stderr: ' + stderr);
//                if (error !== null) {
//                    console.log('exec error: ' + error);
//                }
//                expect(error).to.be.null;
//                done();
//            });
//    });

});