/**
 * Created by zsolt on 3/19/14.
 */

'use strict';
if (typeof window === 'undefined') {

    // server-side setup
    var requirejs = require("requirejs");
    var testConfig = require("../test-conf").testConfig;
    requirejs.config(testConfig.requirejs);

    var chai = require('chai'),
        should = chai.should(),
        assert = chai.assert,
        expect = chai.expect;
}


describe("A test suite", function() {

    var CoreMock;
    before(function(done){
        // TODO: is there a way to load this synchronously on client side and server side as well???
        requirejs(['mocks/CoreMock'], function(_File){
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

describe("A test suite 2", function() {

    var ModelicaImporter;
    before(function(done){
        // TODO: is there a way to load this synchronously on client side and server side as well???
        requirejs(['plugin/ModelicaImporter/ModelicaImporter/ModelicaImporter'], function(_File){
            ModelicaImporter = _File;
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

    it('should instantiate', function() {
        var plugin = new ModelicaImporter();
        expect(plugin).to.not.be.undefined;
    });

    it('should have default config', function() {
        expect(ModelicaImporter.getDefaultConfig()).to.not.be.undefined;
    });

});