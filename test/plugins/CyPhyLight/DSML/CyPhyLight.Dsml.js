/**
 * Created by pmeijer on 3/26/2014.
 */
/**
 * Run Command :
 *  node_modules\.bin\istanbul.cmd --hook-run-in-context cover node_modules\mocha\bin\_mocha -- -R spec test/plugins/CyPhyLight/DSML/CyPhyLight.Dsml.js
 */

'use strict';
var requirejs = require("requirejs"),
    chai = require('chai'),
    should = chai.should(),
    assert = chai.assert,
    expect = chai.expect;

requirejs.config({
    baseUrl: '.',
    paths: {
        'plugin': 'node_modules/webgme/plugin'
    },
    nodeRequire: require
});

describe('CyPhyLight.Dsml', function () {
    var CoreMock = requirejs('src/mocks/CoreMock'),
        CyPhyLight = requirejs('src/plugins/CyPhyLight/DSML/CyPhyLight.Dsml'),
        core = new CoreMock(),
        meta = CyPhyLight.createMETATypesTests(core);

    CyPhyLight.initialize(core, null, meta);

    describe('An instance of CyPhyLight.Component', function() {
        var component = new CyPhyLight.Component(core.createNode({base: meta.Component}));

        it ('should be an instance of CyPhyLight.Component.', function() {
            expect(component instanceof CyPhyLight.Component).to.equal(true);
        });
        it ('should be an instance of CyPhyLight.ComponentType.', function() {
            expect(component instanceof CyPhyLight.ComponentType).to.equal(true);
        });
        it ('should be an instance of CyPhyLight.DesignEntity.', function() {
            expect(component instanceof CyPhyLight.DesignEntity).to.equal(true);
        });
        it ('should be an instance of CyPhyLight.FCO.', function() {
            expect(component instanceof CyPhyLight.FCO).to.equal(true);
        });
        it ('should NOT be an instance of CyPhyLight.ModelicaModel.', function() {
            expect(component instanceof CyPhyLight.ModelicaModel).to.equal(false);
        });
    });

    describe('an instance of CyPhyLight.ModelicaModel', function() {
        var component = new CyPhyLight.Component(core.createNode({base: meta.Component})),
            modelicaModel = component.createModelicaModel();

        it ('should be an instance of CyPhyLight.ModelicaModel.', function() {
            expect(modelicaModel instanceof CyPhyLight.ModelicaModel).to.equal(true);
        });
        it ('should be an instance of CyPhyLight.FCO.', function() {
            expect(modelicaModel instanceof CyPhyLight.FCO).to.equal(true);
        });
        it ('should NOT be an instance of CyPhyLight.Component.', function() {
            expect(modelicaModel instanceof CyPhyLight.Component).to.equal(false);
        });

    });
});