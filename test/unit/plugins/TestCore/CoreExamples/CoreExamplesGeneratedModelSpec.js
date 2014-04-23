/**
 * Created by pmeijer on 4/9/2014.
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

describe('CoreExamplesGen', function () {
    var plugin,
        core,
        meta,
        mParent,
        orgNode,
        refNode,
        port1,
        port2,
        port3,
        conn11,
        conn21,
        conn33,
        parentExample,
        connectionExample,
        referenceExample,
        m1,
        modelsNode,
        Logger;

    before(function (done) { requirejs(
        ['plugin/CoreExamples/CoreExamples/CoreExamples', 'mocks/LoggerMock', 'models/TestCore/modelExample'],
        function (CoreExamples, Logger_, mockModel_) {
            var mockModel = mockModel_;
            Logger = Logger_;
            plugin = new CoreExamples();
            core = mockModel.core;
            meta = mockModel.META;
            // Parent Example
            modelsNode = mockModel.activeNode;
            parentExample = mockModel.parentExample;
            mParent = mockModel.mParent;
            // Reference Example
            referenceExample = mockModel.referenceExample;
            orgNode = mockModel.orgNode;
            refNode = mockModel.refNode;
            // Connection Example
            connectionExample = mockModel.connectionExample;
            m1 = mockModel.m1;
            port1 = mockModel.port1;
            port2 = mockModel.port2;
            port3 = mockModel.port3;
            conn11 = mockModel.conn1;
            conn21 = mockModel.conn2;
            conn33 = mockModel.conn3;
            done();
        });
    });

    it('compareParentAndChildsParent', function (done) {
        plugin.core = core;
        plugin.logger = new Logger();

        plugin.compareParentAndChildsParent(mParent, function (err) {
            expect(err).to.equal('');
            expect(plugin.logger.info_messages[0]).
                to.equal("Parent och its child's parent had the same GUID (as expected).");
            done();
        });
    });

    it('parentExample', function (done) {
        var children = [mParent];
        plugin.core = core;
        plugin.logger = new Logger();
        plugin.META = meta;
        plugin.parentExample(children, function (err) {
            expect(err).to.equal('');
            expect(plugin.logger.info_messages[0]).
                to.equal("Parent och its child's parent had the same GUID (as expected).");
            done();
        });
    });

    it('referenceExample', function (done) {
        var children = [orgNode, refNode];
        plugin.core = core;
        plugin.logger = new Logger();
        plugin.META = meta;
        plugin.referenceExample(children, function (err) {
            expect(err).to.equal('');
            expect(plugin.logger.info_messages[0]).
                to.equal("Reference and original node had the same GUID (as expected).");
            done();
        });
    });

    it('visitPorts1', function (done) {
        plugin.core = core;
        plugin.logger = new Logger();

        plugin.visitPorts(port1, function (err) {
            expect(err).to.equal('');
            expect(plugin.logger.info_messages[0]).
                to.equal('ConnectionElement connects "Port1" and "p1".');
            done();
        });
    });

    it('visitPorts3', function (done) {
        plugin.core = core;
        plugin.logger = new Logger();

        plugin.visitPorts(port3, function (err) {
            expect(err).to.equal('');
            expect(plugin.logger.info_messages[0]).
                to.equal('ConnectionElement connects "Port3" and "Port3".');
            done();
        });
    });

    it('connectionExample', function (done) {
        var children = [port1, port2, port3, conn11, conn21, conn33, m1];
        plugin.core = core;
        plugin.logger = new Logger();
        plugin.META = meta;

        plugin.connectionExample(children, function (err) {
            expect(err).to.equal('');
            expect(plugin.logger.info_messages.length).to.equal(3);
            done();
        });
    });

    it('recursiveChildrenExample1', function (done) {
        var children = [parentExample];
        plugin.core = core;
        plugin.logger = new Logger();
        plugin.META = meta;
        plugin.recursiveChildrenExample(children, function (err) {
            expect(err).to.equal('');
            expect(plugin.logger.info_messages.length).to.equal(3);
            done();
        });
    });

    it('recursiveChildrenExample2', function (done) {
        var children = [connectionExample];
        plugin.core = core;
        plugin.logger = new Logger();
        plugin.META = meta;
        plugin.recursiveChildrenExample(children, function (err) {
            expect(err).to.equal('');
            expect(plugin.logger.info_messages.length).to.equal(9);
            done();
        });
    });

    it('runExamples1', function (done) {
        plugin.core = core;
        plugin.logger = new Logger();
        plugin.META = meta;
        plugin.runExamples(connectionExample, function (err) {
            expect(err).to.equal('');
            expect(plugin.logger.info_messages.length).to.equal(5);
            done();
        });
    });

    it('runExamplesEmpty', function (done) {
        plugin.core = core;
        plugin.logger = new Logger();
        plugin.META = meta;
        plugin.runExamples(modelsNode, function (err) {
            expect(err).to.equal(null);
            expect(plugin.logger.debug_messages[0]).to.equal('Found unexpected child, Models, inside Models.');
            done();
        });
    });
});





