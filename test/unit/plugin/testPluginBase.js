/**
 * Created by pmeijer on 4/2/2014.
 */
'use strict';
if (typeof window === 'undefined') {

    // server-side setup
    var requirejs = require("requirejs");
    requirejs.config({
        baseUrl: '.',
        paths: {
            'plugin': 'node_modules/webgme/plugin'
        },
        nodeRequire: require
    });

    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}

var pluginList = [
    'src/plugins/Examples/Children/Children',
    'src/plugins/Examples/ChildrenConfig/ChildrenConfig'];

describe("Test PluginBase API", function() {

    var PluginBase;
    before(function(done){

        requirejs(['plugin/PluginBase'], function(PluginBase_){
            PluginBase = PluginBase_;
            done();
        });
    });

    afterEach(function() {

    });

    it ('getVersion', function() {
        var pluginBase = new PluginBase(),
            pattern = /^\d+\.\d+\.\d+$/;
        expect(pattern.test(pluginBase.getVersion())).to.be.true;
    });

    it ('getDescription', function() {
        var pluginBase = new PluginBase(),
            description = pluginBase.getDescription();
        expect(typeof description === 'string' || description instanceof String).to.be.true;
    });
});

// TODO: Generate these on the fly based on pluginList.

describe("Test PluginBase API on instances 0", function() {
    var PluginBase;
    before(function(done){
        requirejs([pluginList[0]], function(Plugin){
            PluginBase = Plugin;
            done();
        });
    });

    afterEach(function() {

    });

    it ('getVersion', function() {
        var pluginBase = new PluginBase(),
            pattern = /^\d+\.\d+\.\d+$/;
        expect(pattern.test(pluginBase.getVersion())).to.be.true;
    });

    it ('getDescription', function() {
        var pluginBase = new PluginBase(),
            description = pluginBase.getDescription();
        expect(typeof description === 'string' || description instanceof String).to.be.true;
    });

    it ('getName', function() {
        var pluginBase = new PluginBase(),
            name = pluginBase.getName();
        expect(typeof name === 'string' || name instanceof String).to.be.true;
    });
});

describe("Test PluginBase API on instances 1", function() {
    var PluginBase;
        before(function(done){
            requirejs([pluginList[1]], function(Plugin){
                PluginBase = Plugin;
                done();
            });
        });

    afterEach(function() {

    });

    it ('getVersion', function() {
        var pluginBase = new PluginBase(),
            pattern = /^\d+\.\d+\.\d+$/;
        expect(pattern.test(pluginBase.getVersion())).to.be.true;
    });

    it ('getDescription', function() {
        var pluginBase = new PluginBase(),
            description = pluginBase.getDescription();
        expect(typeof description === 'string' || description instanceof String).to.be.true;
    });

    it ('getName', function() {
        var pluginBase = new PluginBase(),
            name = pluginBase.getName();
        expect(typeof name === 'string' || name instanceof String).to.be.true;
    });
});