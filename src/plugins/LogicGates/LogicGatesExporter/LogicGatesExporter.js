/**
 * Created by Dana Zhang on 3/31/2014.
 */

'use strict';

define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'plugin/PluginResult',
        'json2xml'], function (PluginConfig, PluginBase, PluginResult, json2xml) {

    var LogicGatesExporterPlugin = function () {
        PluginBase.call(this);
    };

    LogicGatesExporterPlugin.prototype = Object.create(PluginBase.prototype);
    LogicGatesExporterPlugin.prototype.constructor = LogicGatesExporterPlugin;

    LogicGatesExporterPlugin.prototype.getName = function () {
        return 'LogicGatesExporter';
    };

    LogicGatesExporterPlugin.prototype.main = function (callback) {
        var self = this,
            core = self.core,
            selectedNode = self.activeNode;

        var pluginResult = new PluginResult();

        if (!selectedNode) {
            callback('selectedNode is not defined', pluginResult);
        }

        // TODO: this is not the right way to do it..., but a way at least
        this.objectToVisit = 0; // number of objects that have to be visited
        this.visitedObjects = 0; // number of already visited

        this.objectToVisit += 1; // we need to visit the selected node

        this.diagramPath = "";

        this.modelID = 0;

        this.components = {};
        this.circuits = [];
        this.ID_LUT = {};
        this.CHILDREN_LUT = {};

        this.META_TYPES = ["Not", "Buffer", "And", "Or", "Nand", "Nor", "Xor", "Xnor", "NumericInput", "NumericOutput", "UserOutput", "UserInput", "Clock"];
        this.COMPLEX = ["And", "Or", "Nand", "Nor", "Xor", "Xnor"];
        this.CONNECTION_TYPES = ["OutputPort2InputPort", "UserInput2InputPort", "OutputPort2UserOutput", "UserInputBase2UserOutput", "PortBase2UserIOBase", "UserIOBase2PortBase", "UserIOBase2UserIOBase"];

        this.SRC_PORT_LUT = [];
        this.DST_PORT_LUT = [];
        // debugging
        this.gates = [];
        this.wires = [];
        this.wires_to_add = [];

        core.loadChildren(selectedNode, function(err, childNodes) {
            self.visitObject(err, childNodes, core, callback);
        });
    };

    LogicGatesExporterPlugin.prototype.visitObject = function (err, childNodes, core, callback) {
        var self = this;

        this.objectToVisit += childNodes.length; // all child objects have to be visited

        var i;
        for (i = 0; i < childNodes.length; ++i) {

            var child = childNodes[i];

            var parentPath = core.getPath(child.parent);

            var baseClass = core.getBase(child),
                metaType = baseClass ? core.getAttribute(baseClass, 'name') : ""; // get child's base META Type

            var parentClass = core.getBase(child.parent);
            var parentMeta = parentClass ? core.getAttribute(parentClass, 'name') : "";
            var isComplex = this.COMPLEX.indexOf(metaType) > -1;
            var isGate = this.META_TYPES.indexOf(metaType) > -1 && parentMeta === "LogicCircuit";
            var isWire = this.CONNECTION_TYPES.indexOf(metaType) > -1 && parentMeta === "LogicCircuit";

            if (isGate) {

                // if key not exist already, add key; otherwise ignore
                var gmeID = core.getPath(child);

                if (!this.ID_LUT.hasOwnProperty(gmeID)) {

                    this.addGate(child, metaType, isComplex, parentPath);
                }

            } else if (isWire) {
                  this.wires_to_add.push(child);

            } else if (metaType === 'InputPort' || metaType === 'OutputPort') {
                this.CHILDREN_LUT[core.getPath(child)] = parentPath;
            }

            core.loadChildren(childNodes[i], function(err, childNodes) {
                self.visitObject(err, childNodes, core, callback);
            });
        }

        this.visitedObjects += 1; // another object was just visited

        if (this.objectToVisit === this.visitedObjects) {

            // had to do it this way because we need to wait for all the gates to be added before adding the wires to avoid problems async causes
            for (var l = 0; l < this.wires_to_add.length; ++l) {
                this.addWire(this.wires_to_add[l]);
            }
            this.createObjectFromDiagram();

            // all objects have been visited
            var pluginResult = new PluginResult();
            pluginResult.success = true;
            if (callback) {
                callback(null, pluginResult);
            }
        }
    };

    LogicGatesExporterPlugin.prototype.addGate = function(nodeObj, metaType, isComplex, parentPath) {

        var core = this.core,
            self = this,
            gmeID = core.getPath(nodeObj),
            name = core.getAttribute(nodeObj, 'name'),
            numInputs, // number of children
            xPos = parseInt(nodeObj.data.reg.position.x, 10),
            yPos = parseInt(nodeObj.data.reg.position.y, 10),
            angle = 0;

        // TODO: fix this... this doesn't return the right number of children
        core.loadChildren(nodeObj, function(err, childNodes) {
            numInputs = childNodes.length;
        });

        this.ID_LUT[gmeID] = this.modelID;

        // all logic gates component have attrs: Type, Name, ID
        //                                 element: Point (attrs: X, Y, Angle)

        var gate = {
            "@Type": metaType,
            "@Name": name,
            "@ID": self.modelID,
            "Point": {
                "@X": xPos,
                "@Y": yPos,
                "@Angle": angle
            }
        };

        // add domain specific attributes
        if (isComplex) {
            gate["@NumInputs"] = numInputs;

        } else if (metaType === "Clock") {
            gate["@Milliseconds"] = core.getAttribute(nodeObj, 'Milliseconds');

        } else if (metaType === "NumericInput" || metaType === "NumericOutput") {
            var bits = core.getAttribute(nodeObj, 'Bits');
            var selRep = core.getAttribute(nodeObj, 'SelRep');
            var value = core.getAttribute(nodeObj, 'Value');
            gate["@Bits"] = bits;
            gate["@SelRep"] = selRep;
            gate["@Value"] = value;
        }
        if (!this.components.hasOwnProperty(parentPath)) {
            this.components[parentPath] = {
                "Gate": [],
                "Wire": []
            };
        }
        if (parentPath) {

            this.components[parentPath]["Gate"].push(gate);
        }
        ++this.modelID;

        this.gates.push(gate);

    };

    LogicGatesExporterPlugin.prototype.addWire = function(nodeObj) {

        var core = this.core,
            self = this,
            wireID = core.getPath(nodeObj),
            src = core.getPointerPath(nodeObj, "src"),
            dst = core.getPointerPath(nodeObj, "dst"),
            srcNodeObj,
            dstNodeObj;

        var srcMetaType,
            dstMetaType,
            srcPort = 0,
            dstPort = 0;

        core.loadByPath(self.rootNode, src, function (err, node) {

            if (!err) {
                var baseObj = core.getBase(node),
                    metaType = core.getAttribute(baseObj, 'name'),
                    isComplex = self.COMPLEX.indexOf(metaType) > -1,
                    isGate = self.META_TYPES.indexOf(metaType) > -1,
                    isPort = metaType === 'InputPort' || metaType === 'OutputPort',
                    parentPath;

                if (isGate) {
                    parentPath = core.getPath(node.parent);
                    srcMetaType = metaType;
                    srcNodeObj = node;
                } else if (isPort) {
                    var srcObj = core.getParent(node);
                    src = core.getPath(srcObj);
                    srcMetaType = core.getAttribute(srcObj, 'name');
                    srcNodeObj = srcObj;
                    parentPath = core.getPath(srcObj.parent);
                    node = srcObj;
//                    srcPort =
                }

                if ((!self.ID_LUT.hasOwnProperty(src)) && (isPort || isGate)) {
                    self.addGate(node, srcMetaType, isComplex, parentPath);
                }
            }
        });

        core.loadByPath(self.rootNode, dst, function (err, node) {

            if (!err) {
                var metaType = core.getAttribute(core.getBase(node), 'name'),
                    isComplex = self.COMPLEX.indexOf(metaType) > -1,
                    isGate = self.META_TYPES.indexOf(metaType) > -1,
                    isPort = metaType === 'InputPort' || metaType === 'OutputPort',
                    parentPath;

                if (isGate) {
                    parentPath = core.getPath(node.parent);
                    dstMetaType = metaType;
                    dstNodeObj = node;
                } else if (isPort) {
                    var dstObj = core.getParent(node);
                    dst = core.getPath(dstObj);
                    dstMetaType = core.getAttribute(dstObj, 'name');
                    dstNodeObj = dstObj;
                    parentPath = core.getPath(dstObj.parent);
                    node = dstObj;
                }

                if (!self.ID_LUT.hasOwnProperty(dst) && (isPort || isGate)) {
                    self.addGate(node, dstMetaType, isComplex, parentPath);
                }
            }
        });

        // Wire component's elements: From (attrs: ID, Port), To (attrs: ID, Port)

        var parentCircuitPath = core.getPath(nodeObj.parent);
        var srcID = self.ID_LUT[src],
            dstID = self.ID_LUT[dst];
        var wire = {
            "From": {
                "@ID": srcID,
                "@Port": srcPort
            },
            "To": {
                "@ID": dstID,
                "@Port": dstPort
            }
        };

        if (!self.components.hasOwnProperty(parentCircuitPath)) {
            self.components[parentCircuitPath] = {
                "Gate": [],
                "Wire": []
            };
        }

        if (parentCircuitPath) {
            self.components[parentCircuitPath]["Wire"].push(wire);
            self.wires.push(wire);
        }
    };

    LogicGatesExporterPlugin.prototype.createObjectFromDiagram = function () {

        var i = 0;
        for (var parentPath in this.components) {
            if (this.components.hasOwnProperty(parentPath)) {
                var diagram = {"CircuitGroup":
                    {
                        "@Version": 1.2,
                        "Circuit" :
                        {
                            "Gates": {},
                            "Wires": {}
                        }
                    }
                };
                diagram.CircuitGroup.Circuit.Gates["Gate"] = this.components[parentPath]["Gate"];
                diagram.CircuitGroup.Circuit.Wires["Wire"] = this.components[parentPath]["Wire"];
                this.circuits.push(diagram);
                var j2x = new json2xml;
                var output = j2x.convert(diagram);
                this.fs.addFile("output" + i + ".xml", output);
            }
            ++i;
        }
        this.fs.saveArtifact();
    };

    return LogicGatesExporterPlugin;
});