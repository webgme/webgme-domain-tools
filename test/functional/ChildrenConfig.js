/**
 * Created by zsolt on 3/31/14.
 */

'use strict';
if (typeof window === 'undefined') {

    // server-side setup
    var requirejs = require("requirejs");
    requirejs.config({
        baseUrl: '.',
        paths: {
            'plugin': 'node_modules/webgme/plugin',
            'plugin/ModelicaImporter': './src/plugins/CyPhyLight'
        },
        nodeRequire: require
    });

    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}

var exec = require('child_process').exec;


describe("Plugin tests", function() {


    it('should run ChildrenConfig on Test', function(done) {
        var child = exec('node node_modules/webgme/bin/run_plugin.js -c config.json -p Test -n ChildrenConfig',
            function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                expect(error).to.be.null;
                done();
            });
    });
});