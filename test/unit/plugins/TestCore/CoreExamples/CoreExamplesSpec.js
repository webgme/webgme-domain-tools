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
        meta,
        mParent;

    before(function (done) {
        requirejs(['plugin/CoreExamples/CoreExamples/CoreExamples', 'mocks/CoreMock'], function (CoreExamples, Core) {
            var rootNode,
                modelsNode,
                parentExample,
                mChild;
            plugin = new CoreExamples();
            core = new Core();
            meta = createMETATypesTests(core);
            rootNode = core.getRootNode();
            modelsNode = core.createNode({base: meta.ModelElement, parent: rootNode});
            core.setAttribute(modelsNode, 'name', 'Models');
            parentExample = core.createNode({base: meta.ModelElement, parent: modelsNode});
            core.setAttribute(parentExample, 'name', 'ParentExample');
            mParent = core.createNode({base: meta.ModelElement, parent: parentExample});
            core.setAttribute(mParent, 'name', 'm_parent');
            mChild = core.createNode({base: meta.ModelElement, parent: mParent});
            core.setAttribute(mChild, 'name', 'm_child');
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

    it('compareParentAndChildsParent', function () {
        var self = {};
        self.core = core;
        self.logger = console;

        plugin.compareParentAndChildsParent(self, mParent, function (err) {
            expect(err).to.equal('');
        });
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