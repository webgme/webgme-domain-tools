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

describe('ModelicaImporter.Dsml.Generated Helper Methods', function () {
    var plugin = requirejs('src/plugins/CyPhyLight/ModelicaImporter/ModelicaImporter.Dsml');

    describe('getComponentContent', function() {
        var componentConfig,
            flatData = {parameters: {}, connectors: {}};

        componentConfig = SPRING_COMPONENT_CONFIG;

        plugin.getComponentContent(flatData, componentConfig, componentConfig.exportedComponentClass);

        it ('should be two parameters', function() {

            expect(Object.keys(flatData.parameters).length).to.equal(2);
        });

        it ('should be two connectors', function() {
            expect(Object.keys(flatData.connectors).length).to.equal(2);
        });

        it ('names of parameters correct', function() {
            expect("c" in flatData.parameters).to.equal(true);
            expect("s_rel0" in flatData.parameters).to.equal(true);
        });

        it ('names of connectors correct', function() {
            expect("flange_a" in flatData.connectors).to.equal(true);
            expect("flange_b" in flatData.connectors).to.equal(true);
        });
    });

    describe('PopulateComponent', function() {
        var CoreMock = requirejs('src/mocks/CoreMock'),
            CyPhyLight = requirejs('src/plugins/CyPhyLight/DSML/CyPhyLight.Dsml'),
            core = new CoreMock(),
            meta = CyPhyLight.createMETATypesTests(core),
            component,
            modelicaModel,
            i,
            key,
            cnt,
            node,
            baseNode,
            newProperties = {},
            newConnectors = {};

        CyPhyLight.initialize(core, null, meta);
        component = new CyPhyLight.Component(core.createNode({base: meta.Component}));
        modelicaModel = component.createModelicaModel();

        it ('should populate properties', function() {
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

        it ('should populate connectors', function() {
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