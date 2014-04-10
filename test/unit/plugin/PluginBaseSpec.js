/**
 * Created by pmeijer on 4/2/2014.
 */

'use strict';
if (typeof window === 'undefined') {

    // server-side setup
    var requirejs = require('requirejs');
    require("../../../test-conf.js");


    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}

// /^v?((\d+)\.(\d+)\.(\d+))(?:-([\dA-Za-z\-]+(?:\.[\dA-Za-z\-]+)*))?(?:\+([\dA-Za-z\-]+(?:\.[\dA-Za-z\-]+)*))?$/
var semanticVersionPattern = /^\d+\.\d+\.\d+$/;

var pluginList = [
    'plugin/Children/Children/Children',
    'plugin/ChildrenConfig/ChildrenConfig/ChildrenConfig'];

describe("PluginBase API", function () {

    var Plugin;
    before(function (done) {

        requirejs(['plugin/PluginBase'], function (Plugin_) {
            Plugin = Plugin_;
            done();
        });
    });

    it('getVersion', function () {
        var plugin = new Plugin();
        expect(semanticVersionPattern.test(plugin.getVersion())).equals(true);
    });

    it('getDescription', function () {
        var plugin = new Plugin(),
            description = plugin.getDescription();
        expect(typeof description === 'string' || description instanceof String).to.equal(true);
    });

    it('getName', function () {
        var plugin = new Plugin();
        (function () {
            plugin.getName();
        }).should.throw(Error);
    });

    it('main', function () {
        var plugin = new Plugin();
        (function () {
            plugin.getName();
        }).should.throw(Error);
    });

    it('getDefaultConfig matches getConfigStructure', function () {
        var plugin = new Plugin(),
            configStructure = plugin.getConfigStructure(),
            defaultConfig = plugin.getDefaultConfig(),
            lenCS = configStructure.length,
            lenDC = Object.keys(defaultConfig).length;
        //console.log('lenCS: %j, lenDC: %j', lenCS, lenDC);
        expect(lenCS).to.equal(lenDC);
    });

    it('getDefaultConfig has valid values', function () {
        var plugin = new Plugin(),
            defaultConfig = plugin.getDefaultConfig(),
            keys = Object.keys(defaultConfig),
            i,
            value;
        //console.log('values ::');
        for (i = 0; i < keys.length; i += 1) {
            value = defaultConfig[keys[i]];
            //console.log(' - %j', value);
            expect(typeof value === 'string' || value instanceof String ||
                typeof value === 'number' || value instanceof Number ||
                typeof value === 'boolean' || value instanceof Boolean).to.equal(true);
        }
    });
});

//TODO: Generate these on the fly based on pluginList.

describe("PluginBase API on instances 0", function () {
    var Plugin;

    before(function (done) {
        requirejs([pluginList[0]], function (Plugin_) {
            Plugin = Plugin_;
            done();
        });
    });

    it('getVersion', function () {
        var plugin = new Plugin();
        expect(semanticVersionPattern.test(plugin.getVersion())).to.equal(true);
    });

    it('getDescription', function () {
        var plugin = new Plugin(),
            description = plugin.getDescription();
        expect(typeof description === 'string' || description instanceof String).to.equal(true);
    });

    it('getName', function () {
        var plugin = new Plugin(),
            name = plugin.getName();
        expect(typeof name === 'string' || name instanceof String).to.equal(true);
    });

    it('getDefaultConfig matches getConfigStructure', function () {
        var plugin = new Plugin(),
            configStructure = plugin.getConfigStructure(),
            defaultConfig = plugin.getDefaultConfig(),
            lenCS = configStructure.length,
            lenDC = Object.keys(defaultConfig).length;
        //console.log('lenCS: %j, lenDC: %j', lenCS, lenDC);
        expect(lenCS).to.equal(lenDC);
    });

    it('getDefaultConfig has valid values', function () {
        var plugin = new Plugin(),
            defaultConfig = plugin.getDefaultConfig(),
            keys = Object.keys(defaultConfig),
            i,
            value;
        //console.log('values ::');
        for (i = 0; i < keys.length; i += 1) {
            value = defaultConfig[keys[i]];
            //console.log(' - %j', value);
            expect(typeof value === 'string' || value instanceof String ||
                typeof value === 'number' || value instanceof Number ||
                typeof value === 'boolean' || value instanceof Boolean).to.equal(true);
        }
    });

    it('main should be implemented', function () {
        var plugin = new Plugin(),
            proto = Object.getPrototypeOf(plugin);
        expect(proto.hasOwnProperty('main')).to.equal(true);
    });
});

describe("PluginBase API on instances 1", function () {
    var Plugin;

    before(function (done) {
        requirejs([pluginList[1]], function (Plugin_) {
            Plugin = Plugin_;
            done();
        });
    });

    it('getVersion', function () {
        var plugin = new Plugin();
        expect(semanticVersionPattern.test(plugin.getVersion())).to.equal(true);
    });

    it('getDescription', function () {
        var plugin = new Plugin(),
            description = plugin.getDescription();
        expect(typeof description === 'string' || description instanceof String).to.equal(true);
    });

    it('getName', function () {
        var plugin = new Plugin(),
            name = plugin.getName();
        expect(typeof name === 'string' || name instanceof String).to.equal(true);
    });

    it('getDefaultConfig matches getConfigStructure', function () {
        var plugin = new Plugin(),
            configStructure = plugin.getConfigStructure(),
            defaultConfig = plugin.getDefaultConfig(),
            lenCS = configStructure.length,
            lenDC = Object.keys(defaultConfig).length;
        //console.log('lenCS: %j, lenDC: %j', lenCS, lenDC);
        expect(lenCS).to.equal(lenDC);
    });

    it('getDefaultConfig has valid values', function () {
        var plugin = new Plugin(),
            defaultConfig = plugin.getDefaultConfig(),
            keys = Object.keys(defaultConfig),
            i,
            value;
        //console.log('values ::');
        for (i = 0; i < keys.length; i += 1) {
            value = defaultConfig[keys[i]];
            //console.log(' - %j', value);
            expect(typeof value === 'string' || value instanceof String ||
                typeof value === 'number' || value instanceof Number ||
                typeof value === 'boolean' || value instanceof Boolean).to.equal(true);
        }
    });

    it('main should be implemented', function () {
        var plugin = new Plugin(),
            proto = Object.getPrototypeOf(plugin);
        expect(proto.hasOwnProperty('main')).to.equal(true);
    });
});