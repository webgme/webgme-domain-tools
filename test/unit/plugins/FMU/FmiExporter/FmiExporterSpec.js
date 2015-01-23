/**
* Generated by PluginGenerator from webgme on Wed Apr 16 2014 16:05:02 GMT-0500 (Central Daylight Time).
*/

'use strict';
if (typeof window === 'undefined') {
    // server-side setup
    var requirejs = require("../../../../../test-conf.js").requirejs;

    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}

// TODO: Update this with a more to-the-point regular expression
var semanticVersionPattern = /^\d+\.\d+\.\d+$/;

describe('FmiExporter', function () {
    var plugin;

    before(function (done) {
        requirejs(['plugin/FmiExporter/FmiExporter/FmiExporter'], function (FmiExporter) {
            plugin = new FmiExporter();
            // TODO: Add option for generating createMETATypesTests and including core etc.
            //core = new Core();
            //meta = createMETATypesTests(core);
            //rootNode = core.getRootNode();
            //modelsNode = core.createNode({base: meta.ModelElement, parent: rootNode});
            //core.setAttribute(modelsNode, 'name', 'Models');
        done();
        });
    });

    it('getVersion', function () {
        expect(semanticVersionPattern.test(plugin.getVersion())).to.equal(true);
    });

    it('getDescription', function () {
        var description = plugin.getDescription();
        expect(typeof description === 'string' || description instanceof String).to.equal(true);
    });

    it('getName', function () {
        var name = plugin.getName();
        expect(typeof name === 'string' || name instanceof String).to.equal(true);
    });

    it('main should be implemented', function () {
        var proto = Object.getPrototypeOf(plugin);
        expect(proto.hasOwnProperty('main')).to.equal(true);
    });

});