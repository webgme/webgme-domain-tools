/**
 * Created by zsolt on 3/22/14.
 */

'use strict';
var requirejs = require("requirejs"),
    chai = require('chai'),
    should = chai.should(),
    assert = chai.assert,
    expect = chai.expect;

requirejs.config({
    baseUrl: '.',
    paths: {
        'plugin': 'node_modules/webgme/plugin',
        'plugins': './src/plugins'
    },

    nodeRequire: require
});

describe('Dsml Api Generator', function () {
    var plugin = requirejs('src/plugins/META/DSMLAPIGenerator/DsmlApiGenerator');

    describe('Utility functions', function () {
        var utils = plugin.Utils;

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
            expect(utils.isValidJavascriptIdentifier('function')).to.equal(false);
        });
    });

    describe('Templates', function () {
        var PETRI_NET_DOMAIN = require('./PetriNet.Dsml.json');

        it ('should generate JavaScript DSML for PetriNet meta model', function() {
            var generator = new plugin();
            // TODO: if file exists remove
            generator.generateFiles(PETRI_NET_DOMAIN);
            // TODO: expect file exists

        });
    });
});