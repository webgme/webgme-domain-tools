/**
 * Run Command :
 *  node_modules\.bin\istanbul.cmd --hook-run-in-context cover node_modules\mocha\bin\_mocha -- -R spec test/plugins/CyPhyLight/ModelicaImporter/ModelicaImporter.Dsml.Generated.js
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
        'plugin': 'node_modules/webgme/plugin',
        'plugin/CyPhyLight': './src/plugins/CyPhyLight',
        'plugin/ModelicaImporter.Dsml': './src/plugins/CyPhyLight'
    },

    nodeRequire: require
});

var SPRING_COMPONENT_CONFIG =  {
    "exportedComponentClass": "Modelica.Mechanics.Translational.Components.Spring",
    "components": [
        {
            "parameters": [
                {
                    "name": "c",
                    "value": ""
                },
                {
                    "name": "s_rel0",
                    "value": 0
                }
            ],
            "connectors": [],
            "extends": [
                {
                    "fullName": "Modelica.Mechanics.Translational.Interfaces.PartialCompliant",
                    "parameters": []
                }
            ],
            "fullName": "Modelica.Mechanics.Translational.Components.Spring"
        },
        {
            "parameters": [],
            "connectors": [
                {
                    "fullName": "Modelica.Mechanics.Translational.Interfaces.Flange_a",
                    "name": "flange_a"
                },
                {
                    "fullName": "Modelica.Mechanics.Translational.Interfaces.Flange_b",
                    "name": "flange_b"
                }
            ],
            "extends": [],
            "fullName": "Modelica.Mechanics.Translational.Interfaces.PartialCompliant"
        }
    ]
};

var FLAT_SPRING_COMPONENT = {
    parameters: {
        c: {
            name: "c",
            value: ""
        },
        s_rel0: {
            name: "s_rel0",
            value: 0
        }
    },
    connectors: {
        flange_a: {
            "fullName": "Modelica.Mechanics.Translational.Interfaces.Flange_a",
            "name": "flange_a"
        },
        flange_b: {
            "fullName": "Modelica.Mechanics.Translational.Interfaces.Flange_b",
            "name": "flange_b"
        }
    }
};

describe('ModelicaImporter.Dsml', function () {

    describe('getComponentContent', function() {

        var plugin;

        var componentConfig,
            flatData = {parameters: {}, connectors: {}};

        componentConfig = SPRING_COMPONENT_CONFIG;

        before(function(done){
            // TODO: is there a way to load this synchronously on client side and server side as well???
            requirejs(['plugin/ModelicaImporter.Dsml/ModelicaImporter.Dsml/ModelicaImporter.Dsml'], function(_plugin){
                plugin = _plugin;
                plugin.getComponentContent(flatData, componentConfig, componentConfig.exportedComponentClass);

                done(); // #1 Other Suite will run after this is called
            });
        });

        it ('should extract two parameters.', function() {

            expect(Object.keys(flatData.parameters).length).to.equal(2);
        });

        it ('should extract two connectors.', function() {
            expect(Object.keys(flatData.connectors).length).to.equal(2);
        });

        it ('should extract two parameters with correct names.', function() {
            expect("c" in flatData.parameters).to.equal(true);
            expect("s_rel0" in flatData.parameters).to.equal(true);
        });

        it ('should extract two connectors with correct names.', function() {
            expect("flange_a" in flatData.connectors).to.equal(true);
            expect("flange_b" in flatData.connectors).to.equal(true);
        });
    });

    describe('when populating the component', function() {
        var plugin;
        var CoreMock,
            CyPhyLight,
            core,
            meta,
            component,
            modelicaModel,
            i,
            key,
            cnt,
            node,
            baseNode,
            newProperties = {},
            newConnectors = {};




        before(function(done){
            // TODO: is there a way to load this synchronously on client side and server side as well???
            requirejs(['plugin/ModelicaImporter.Dsml/ModelicaImporter.Dsml/ModelicaImporter.Dsml', 'plugin/CyPhyLight/DSML/CyPhyLight.Dsml', 'src/mocks/CoreMock'], function(_plugin, _CyPhyLight, _CoreMock){
                plugin = _plugin;

                CoreMock = _CoreMock;
                core = new CoreMock();
                CyPhyLight = _CyPhyLight;

                meta = CyPhyLight.createMETATypesTests(core);
                CyPhyLight.initialize(core, null, meta);
                component = new CyPhyLight.Component(core.createNode({base: meta.Component}));
                modelicaModel = component.createModelicaModel();

                done(); // #1 Other Suite will run after this is called
            });
        });

        it ('buildParameters should create two Properties with correct names.', function() {
            plugin.buildParameters(CyPhyLight, component, modelicaModel, FLAT_SPRING_COMPONENT.parameters);
            cnt = 0;
            for (i = 0; i < component.getNodeObj().children.length; i += 1){
                key = component.getNodeObj().children[i];
                node = core._nodes[key];
                baseNode = null;
                baseNode = core.getBase(node);
                if (baseNode && core.getPath(baseNode) === core.getPath(meta.Property)) {
                    newProperties[core.getAttribute(node, 'name')] = {
                        name: core.getAttribute(node, 'name'),
                        Value: core.getAttribute(node, 'Value')
                    };
                    cnt += 1;
                }
            }

            expect(cnt).to.equal(2);
            expect("c" in newProperties).to.equal(true);
            expect("s_rel0" in newProperties).to.equal(true);
        });

        it ('buildConnectors should create two ModelicaConnectors in the ModelicaModel.', function() {
            plugin.buildConnectors(CyPhyLight, component, modelicaModel, FLAT_SPRING_COMPONENT.connectors);
            cnt = 0;
            for (i = 0; i < modelicaModel.getNodeObj().children.length; i += 1){
                key = modelicaModel.getNodeObj().children[i];
                core.loadByPath(null, key, function(err, node) {
                    baseNode = null;
                    baseNode = core.getBase(node);
                    if (baseNode && core.getPath(baseNode) === core.getPath(meta.ModelicaConnector)) {
                        newConnectors[core.getAttribute(node, 'name')] = {
                            name: core.getAttribute(node, 'name'),
                            Class: core.getAttribute(node, 'Class')
                        };
                        cnt += 1;
                    }

                });

            }

            expect(cnt).to.equal(2);
            expect("flange_a" in newConnectors).to.equal(true);
            expect("flange_b" in newConnectors).to.equal(true);
        });


    });
});