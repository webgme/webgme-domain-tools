/**
 * Created by zsolt on 3/19/14.
 */

'use strict';
if (typeof window === 'undefined') {

    // server-side setup
    var requirejs = require("requirejs");
    requirejs.config({
        baseUrl: '.',

        nodeRequire: require
    });

    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}


describe("A test suite", function() {

    var CoreMock;
    before(function(done){
        // TODO: is there a way to load this synchronously on client side and server side as well???
        requirejs(['src/mocks/CoreMock'], function(_File){
            CoreMock = _File;
            done(); // #1 Other Suite will run after this is called
        });
    });

    afterEach(function() {

    });

    it('should pass', function() {
        expect(true).to.be.true;
    });

    it('should pass too', function() {
        expect(false).to.be.false;
    });

    it ('core Mock test', function() {
        var core = new CoreMock();
        var n = core.createNode({parent: core.getRootNode()});
        core.setAttribute(n, 'name', 'test name');
        expect(n).should.not.equal(null);
        var name = core.getAttribute(n, 'name');
        expect(name).to.equal('test name');

    });


});