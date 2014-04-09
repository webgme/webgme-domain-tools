/**
 * Created by pmeijer on 4/9/2014.
 */

'use strict';
if (typeof window === 'undefined') {

    // server-side setup
    var requirejs = require("requirejs");
    var testConfig = require("../../../../../test-conf.js").testConfig;
    requirejs.config(testConfig.requirejs);

    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}

var semanticVersionPattern = /^\d+\.\d+\.\d+$/;

describe('CoreExamples', function () {
    var plugin,
        core,
        meta;

    before(function (done) {
        requirejs(['plugin/CoreExamples/CoreExamples/CoreExamples', 'mocks/CoreMock'], function (CoreExamples, Core) {
            plugin = new CoreExamples();
            core = new Core();
            meta = createMETATypesTests(core);
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


var createMETATypesTests = function (core) {
    var META = {},
        options = {},
        node;

    node = core.createNode(options);
    core.setAttribute(node, 'name', 'ConnectionElement');
    META.ConnectionElement = node;

    node = core.createNode(options);
    core.setAttribute(node, 'name', 'FCO');
    META.FCO = node;

    node = core.createNode(options);
    core.setAttribute(node, 'name', 'Language');
    META.Language = node;

    node = core.createNode(options);
    core.setAttribute(node, 'name', 'ModelElement');
    META.ModelElement = node;

    node = core.createNode(options);
    core.setAttribute(node, 'name', 'ModelRef');
    META.ModelRef = node;

    node = core.createNode(options);
    core.setAttribute(node, 'name', 'PortElement');
    META.PortElement = node;

    return META;
};