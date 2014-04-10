/**
 * Created by pmeijer on 3/26/2014.
 */
/**
 * Run Command :
 *  node_modules\.bin\istanbul.cmd --hook-run-in-context cover node_modules\mocha\bin\_mocha -- -R spec test/plugins/CyPhyLight/DSML/CyPhyLight.Dsml.js
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

describe('CyPhyLight.Dsml', function () {

    var CoreMock,
        CyPhyLight,
        core,
        meta;

    before(function(done){
        requirejs(['mocks/CoreMock',
                   'plugin/CyPhyLight/DSML/CyPhyLight.Dsml'],
            function(CoreMock_, CyPhyLight_) {
                CoreMock = CoreMock_;
                CyPhyLight = CyPhyLight_;
                core = new CoreMock();
                meta = CyPhyLight.createMETATypesTests(core);
                CyPhyLight.initialize(core, null, meta);
                done();
            });
    });

    // Component
    it ('An instance of Component should be an instance of Component.', function() {
        var component = new CyPhyLight.Component(core.createNode({base: meta.Component}));
        expect(component instanceof CyPhyLight.Component).to.equal(true);
    });
    it ('An instance of Component should be an instance of ComponentType.', function() {
        var component = new CyPhyLight.Component(core.createNode({base: meta.Component}));
        expect(component instanceof CyPhyLight.ComponentType).to.equal(true);
    });
    it ('An instance of Component should be an instance of DesignEntity.', function() {
        var component = new CyPhyLight.Component(core.createNode({base: meta.Component}));
        expect(component instanceof CyPhyLight.DesignEntity).to.equal(true);
    });
    it ('An instance of Component should be an instance of FCO.', function() {
        var component = new CyPhyLight.Component(core.createNode({base: meta.Component}));
        expect(component instanceof CyPhyLight.FCO).to.equal(true);
    });
    it ('An instance of Component should NOT be an instance of ModelicaModel.', function() {
        var component = new CyPhyLight.Component(core.createNode({base: meta.Component}));
        expect(component instanceof CyPhyLight.ModelicaModel).to.equal(false);
    });

    // ModelicaModel
    it ('An instance of ModelicaModel should be an instance of ModelicaModel.', function() {
        var component = new CyPhyLight.Component(core.createNode({base: meta.Component})),
            modelicaModel = component.createModelicaModel();
        expect(modelicaModel instanceof CyPhyLight.ModelicaModel).to.equal(true);
    });
    it ('An instance of ModelicaModel should be an instance of FCO.', function() {
        var component = new CyPhyLight.Component(core.createNode({base: meta.Component})),
            modelicaModel = component.createModelicaModel();
        expect(modelicaModel instanceof CyPhyLight.FCO).to.equal(true);
    });
    it ('An instance of ModelicaModel should NOT be an instance of Component.', function() {
        var component = new CyPhyLight.Component(core.createNode({base: meta.Component})),
            modelicaModel = component.createModelicaModel();
        expect(modelicaModel instanceof CyPhyLight.Component).to.equal(false);
    });
});