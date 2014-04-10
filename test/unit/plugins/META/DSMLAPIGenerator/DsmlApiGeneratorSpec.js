/**
 * Created by zsolt on 3/22/14.
 */

'use strict';
if (typeof window === 'undefined') {

    // server-side setup
    var requirejs = require("requirejs");
    require("../../../../../test-conf.js");


    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}

describe('Dsml Api Generator', function () {
    var plugin;
    var utils;

    before(function(done){
        // TODO: is there a way to load this synchronously on client side and server side as well???
        requirejs(['plugin/DSMLAPIGenerator/DSMLAPIGenerator/DSMLAPIGenerator'], function(_plugin){
            plugin = _plugin;
            utils = plugin.Utils;
            done(); // #1 Other Suite will run after this is called
        });
    });

    describe('Utility functions', function () {

        it ('foo is valid identifier', function() {
            expect(utils.isValidJavascriptIdentifier('foo')).to.equal(true);
        });

        it ('_bar is valid identifier', function() {
            expect(utils.isValidJavascriptIdentifier('_bar')).to.equal(true);
        });

        it ('$div is valid identifier', function() {
            expect(utils.isValidJavascriptIdentifier('$div')).to.equal(true);
        });

        it ('undefined is valid identifier', function() {
            expect(utils.isValidJavascriptIdentifier('undefined')).to.equal(true);
        });

        it ('function is invalid identifier', function() {
            expect(utils.isValidJavascriptIdentifier('function')).to.equal(false);
        });

        it ('Empty string is invalid identifier', function() {
            expect(utils.isValidJavascriptIdentifier('')).to.equal(false);
        });
    });

//    describe.skip('Templates', function () {
//        var PETRI_NET_DOMAIN = require('./PetriNet.Dsml.json');
//
//        it ('should generate JavaScript DSML for PetriNet meta model', function() {
//            var generator = new plugin();
//            // TODO: if file exists remove
//            generator.generateFiles(PETRI_NET_DOMAIN);
//            // TODO: expect file exists
//
//        });
//    });
});