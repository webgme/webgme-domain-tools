/**
 * Run Command :
 *  node_modules\.bin\istanbul.cmd --hook-run-in-context cover node_modules\mocha\bin\_mocha -- -R spec test/plugins/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica.js
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

describe('CyPhy2Modelica Helper Methods', function (){
    var plugin = requirejs('src/plugins/CyPhyLight.CyPhy2Modelica/CyPhyLight.CyPhy2Modelica');

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
            CyPhyLight = requirejs('src/plugins/CyPhyLight.CyPhy2Modelica/CyPhyLight.Dsml.js'),
            core = new CoreMock(),
            meta = CyPhyLight.createMETATypesTests(core),
            component = core.createNode({base: meta.Component}),
            modelicaModel = core.createNode({parent: component, base: meta.ModelicaModel}),
            i,
            key,
            cnt,
            node,
            baseNode,
            newProperties = {},
            newConnectors = {};

        it ('should populate properties', function() {
            // FIXME: should we pass only meta and use core internally if needed.
            // This is done for the dsml interpreter. Here the CyPhyLight is not initialized and meta is just a
            // a map from Type names to ids.
            plugin.buildParameters(core, meta, component, modelicaModel, FLAT_SPRING_COMPONENT.parameters);
            cnt = 0;
            for (i = 0; i < component.children.length; i += 1){
                key = component.children[i];
                node = core.loadByPath(null, key);
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
            plugin.buildConnectors(core, meta, component, modelicaModel, FLAT_SPRING_COMPONENT.connectors);
            cnt = 0;
            for (i = 0; i < modelicaModel.children.length; i += 1){
                key = modelicaModel.children[i];
                node = core._nodes[key];
                baseNode = null;
                baseNode = core.getBase(node);
                if (baseNode && core.getPath(baseNode) === core.getPath(meta.ModelicaConnector)) {
                    newConnectors[core.getAttribute(node, 'name')] = {
                        name: core.getAttribute(node, 'name'),
                        Class: core.getAttribute(node, 'Class')
                    };
                    cnt += 1;
                }
            }

            expect(cnt).to.equal(2);
            expect("flange_a" in newConnectors).to.equal(true);
            expect("flange_b" in newConnectors).to.equal(true);
        });


    });
});