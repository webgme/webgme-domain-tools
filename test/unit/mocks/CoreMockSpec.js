
'use strict';
if (typeof window === 'undefined') {

    // server-side setup
    var requirejs = require("requirejs");
    var testConfig = require("../../../test-conf.js").testConfig;
    requirejs.config(testConfig.requirejs);

    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}


//exports.testSomething = function(test){
//    var CoreMock = requirejs('../../src/mocks/CoreMock');
//    var core = new CoreMock();
//
//    var n = core.createNode({parent: core.getRootNode()});
//    core.setAttribute(n, 'name', 'test name');
//
//    test.expect(2);
//    test.ok(n !== undefined, "this assertion should pass");
//
//    test.ok(core.getAttribute(n, 'name') === 'test name', "this assertion should pass");
//
//    test.done();
//};

describe('Core Mock attribute getter and setter', function() {
    var CoreMock;
    var core;

    before(function(done){
        requirejs(['mocks/CoreMock'],
            function(CoreMock_) {
                CoreMock = CoreMock_;
                core = new CoreMock();
                done();
            });
    });

    it ('should pass', function() {
        var n = core.createNode({parent: core.getRootNode()});
        core.setAttribute(n, 'name', 'test name');
        expect(n).should.not.equal(null);
        var name = core.getAttribute(n, 'name');
        expect(name).to.equal('test name');

    });
});

