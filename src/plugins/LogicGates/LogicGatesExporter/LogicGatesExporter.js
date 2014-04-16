/**
 * Created by Dana Zhang on 4/8/2014.
 */

'use strict';

define(['plugin/PluginConfig',
    'plugin/PluginBase',
    'plugin/PluginResult',
    'json2xml'], function (PluginConfig, PluginBase, PluginResult, Json2Xml) {

    var LogicGatesExporterPlugin = function () {
        PluginBase.call(this);

        this.objectToVisit = 1; // number of objects that have to be visited, visiting the selected node makes it start with 1
        this.diagramPath = "";
        this.modelID = 0;
        this.wiresToAdd = [];
        this.circuits = [];
        this.components = {};
        this.id_lut = {};
        this.children_lut = {};

        this.META_TYPES = {"Not": true,
                           "Buffer": true,
                           "And": true,
                           "Or": true,
                           "Nand": true,
                           "Nor": true,
                           "Xor": true,
                           "Xnor": true,
                           "NumericInput": true,
                           "NumericOutput": true,
                           "UserOutput": true,
                           "UserInput": true,
                           "Clock": true};

        this.COMPLEX = {"And": true,
                        "Or": true,
                        "Nand": true,
                        "Nor": true,
                        "Xor": true,
                        "Xnor": true};

        this.CONNECTION_TYPES = {"OutputPort2InputPort": true,
                                 "UserInput2InputPort": true,
                                 "OutputPort2UserOutput": true,
                                 "UserInputBase2UserOutput": true,
                                 "PortBase2UserIOBase": true,
                                 "UserIOBase2PortBase": true,
                                 "UserIOBase2UserIOBase": true};

    };

    LogicGatesExporterPlugin.prototype = Object.create(PluginBase.prototype);
    LogicGatesExporterPlugin.prototype.constructor = LogicGatesExporterPlugin;

    LogicGatesExporterPlugin.prototype.getName = function () {
        return 'LogicGatesExporter';
    };

    LogicGatesExporterPlugin.prototype.main = function (callback) {
        var self = this,
            core = self.core,
            selectedNode = self.activeNode,
            pluginResult = new PluginResult();

        if (!selectedNode) {
            callback('selectedNode is not defined', pluginResult);
        }

        core.loadChildren(selectedNode, function (err, childNodes) {
            self.visitObject(err, childNodes, core, callback);
        });
    };

    LogicGatesExporterPlugin.prototype.visitObject = function (err, childNodes, core, callback) {
        this.objectToVisit += childNodes.length; // all child objects have to be visited

        var self = this,
            i,
            child,
            gmeID,
            parentPath,
            baseClass,
            metaType, // get child's base META Type
            parentClass,
            parentMeta,
            isComplex,
            isGate,
            isWire,
            pluginResult;

        for (i = 0; i < childNodes.length; i += 1) {

            child = childNodes[i];
            gmeID = core.getPath(child);
            parentPath = core.getPath(core.getParent(child));
            baseClass = core.getBase(child);
            metaType = baseClass ? core.getAttribute(baseClass, 'name') : ""; // get child's base META Type
            parentClass = core.getBase(core.getParent(child));
            parentMeta = parentClass ? core.getAttribute(parentClass, 'name') : "";
            isComplex = self.COMPLEX[metaType];
            isGate = self.META_TYPES[metaType] && parentMeta === "LogicCircuit";
            isWire = self.CONNECTION_TYPES[metaType] && parentMeta === "LogicCircuit";

            if (isGate) {

                // if key not exist already, add key; otherwise ignore
                if (!self.id_lut.hasOwnProperty(gmeID)) {
                    // PC: addGate needs to be defined and called as an asynchronous function. see PC10
                    self.addGate(child, metaType, isComplex, parentPath);
                }

            } else if (isWire) {

                self.wiresToAdd.push(child);

            } else if (metaType === 'InputPort') {

                if (!self.children_lut.hasOwnProperty(parentPath)) {

                    self.children_lut[parentPath] = [];
                }
                self.children_lut[parentPath].push(gmeID);
            }

            core.loadChildren(childNodes[i], function (err, childNodes) {
                self.visitObject(err, childNodes, core, callback);
            });
        }

        self.objectToVisit -= 1; // another object was just visited

        if (self.objectToVisit === 0) {

            // had to do it this way because we need to wait for all the gates to be added before adding the wires to avoid problems async causes
            for (i = 0; i < self.wiresToAdd.length; i += 1) {
                self.addWire(self.wiresToAdd[i]);
            }

            self.createObjectFromDiagram();

            // all objects have been visited
            pluginResult = new PluginResult();
            pluginResult.success = true;
            if (callback) {
                callback(null, pluginResult);
            }
        }
    };

    ///**
    // * This function adds a gate to the circuit diagram it belongs to
    // * @param {object} nodeObj - current node to be visited
    // * @param {string} metaType - meta type of current node
    // * @param {boolean} isComplex - indicating whether the current node is a complex logic gate
    // * @param {string} parentPath - the circuit diagram the current node belongs to
    // * @returns {string} The version of the plugin.
    // * @public
    // */
    LogicGatesExporterPlugin.prototype.addGate = function (nodeObj, metaType, isComplex, parentPath) {
        var self = this,
            core = self.core,
            gmeID = core.getPath(nodeObj),
            name = core.getAttribute(nodeObj, 'name'),
            bits = core.getAttribute(nodeObj, 'Bits'),
            selRep = core.getAttribute(nodeObj, 'SelRep'),
            xPos = parseInt(nodeObj.data.reg.position.x, 10),
            yPos = parseInt(nodeObj.data.reg.position.y, 10),
            value = core.getAttribute(nodeObj, 'Value'),
            angle = 0,
            gate;

        self.id_lut[gmeID] = self.modelID;

        // all logic gates component have attrs: Type, Name, ID
        //                                 element: Point (attrs: X, Y, Angle)
        gate = {
            "@Type": metaType,
            "@Name": name,
            "@ID": self.modelID,
            "Point": {
                "@X": xPos,
                "@Y": yPos,
                "@Angle": angle
            }
        };

        if (isComplex) {
            // PC: loadChildren is asynchronous the execution will most likely step to #192 before gate is updated.
            // This fact also makes addGate asynchronous.
            core.loadChildren(nodeObj, function (err, childNodes) {
                gate["@NumInputs"] = childNodes.length - 1;
            });

        } else if (metaType === "Clock") {
            gate["@Milliseconds"] = core.getAttribute(nodeObj, 'Milliseconds');

        } else if (metaType === "NumericInput" || metaType === "NumericOutput") {
            gate["@Bits"] = bits;
            gate["@SelRep"] = selRep;
            gate["@Value"] = value;
        }
        if (!self.components.hasOwnProperty(parentPath)) {
            self.components[parentPath] = {
                "Gate": [],
                "Wire": []
            };
        }
        if (parentPath) {

            self.components[parentPath].Gate.push(gate);
        }

        self.modelID += 1;
    };

    LogicGatesExporterPlugin.prototype.addWire = function (nodeObj) {

        var self = this,
            core = self.core,
            src = core.getPointerPath(nodeObj, "src"),
            dst = core.getPointerPath(nodeObj, "dst"),
            srcNodeObj,
            dstNodeObj,
            srcID,
            dstID,
            srcMetaType,
            dstMetaType,
            srcPort = 0,
            dstPort = 0,
            wire,
            metaType,
            isComplex,
            isGate,
            isPort,
            portGMEId,
            parentPath,
            parentCircuitPath,
            validGates;

        // PC: loadByPath is asynchronous and addWire becomes that too.
        core.loadByPath(self.rootNode, src, function (err, node) {

            if (!err) {
                metaType = core.getAttribute(core.getBase(node), 'name');
                isComplex = self.COMPLEX[metaType];
                isGate = self.META_TYPES[metaType];
                isPort = metaType === 'InputPort' || metaType === 'OutputPort';

                if (isGate) {
                    srcNodeObj = node;
                    parentPath = core.getPath(core.getParent(srcNodeObj));
                    srcMetaType = metaType;
                } else if (isPort) {
                    srcNodeObj = core.getParent(node);
                    portGMEId = core.getPath(srcNodeObj);
                    src = core.getPath(srcNodeObj);
                    srcMetaType = core.getAttribute(srcNodeObj, 'name');
                    parentPath = core.getPath(srcNodeObj);
                    srcPort = 0;
                }

                if ((isPort || isGate) && (!self.id_lut.hasOwnProperty(src))) {
                    self.addGate(srcNodeObj, srcMetaType, isComplex, parentPath);
                }
            }
        });

        core.loadByPath(self.rootNode, dst, function (err, node) {

            if (!err) {
                metaType = core.getAttribute(core.getBase(node), 'name');
                isComplex = self.COMPLEX[metaType];
                isGate = self.META_TYPES[metaType];
                isPort = metaType === 'InputPort' || metaType === 'OutputPort';

                if (isGate) {
                    dstNodeObj = node;
                    parentPath = core.getPath(core.getParent(dstNodeObj));
                    dstMetaType = metaType;
                } else if (isPort) {
                    dstNodeObj = core.getParent(node);
                    portGMEId = core.getPath(dstNodeObj);
                    dst = core.getPath(dstNodeObj);
                    dstMetaType = core.getAttribute(dstNodeObj, 'name');
                    parentPath = core.getPath(dstNodeObj);
                    dstPort = self.children_lut[parentPath].indexOf(portGMEId);
                }

                if ((isPort || isGate) && !self.id_lut.hasOwnProperty(dst)) {
                    self.addGate(dstNodeObj, dstMetaType, isComplex, parentPath);
                }
            }
        });

        // Wire component's elements: From (attrs: ID, Port), To (attrs: ID, Port)

        parentCircuitPath = core.getPath(core.getParent(nodeObj));
        // PC: At this point src, dst, srcID, dstID might not have been modified by
        // the core.loadPath callbacks. More on that later...
        srcID = self.id_lut[src];
        dstID = self.id_lut[dst];

        wire = {
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

        validGates = (srcPort !== undefined) && (dstPort !== undefined) && (srcID !== undefined) && (dstID !== undefined);
        if (parentCircuitPath && validGates) {
            self.components[parentCircuitPath].Wire.push(wire);
        }
    };

    LogicGatesExporterPlugin.prototype.createObjectFromDiagram = function () {

        var self = this,
            i = 0,
            parentPath,
            diagram,
            j2x,
            output;

        for (parentPath in self.components) {
            if (self.components.hasOwnProperty(parentPath)) {
                diagram = {"CircuitGroup":
                    {
                        "@Version": 1.2,
                        "Circuit" :
                            {
                                "Gates": {},
                                "Wires": {}
                            }
                    }
                    };

                diagram.CircuitGroup.Circuit.Gates.Gate = self.components[parentPath].Gate;
                diagram.CircuitGroup.Circuit.Wires.Wire = self.components[parentPath].Wire;
                self.circuits.push(diagram);

                j2x = new Json2Xml;
                output = j2x.convert(diagram);
                // PC: the file system has changed recently and is still under construction..
                self.fs.addFile("output" + i + ".gcg", output);
            }
            i += 1;
        }
        // PC: the file system has changed recently and is still under construction..
        self.fs.saveArtifact();
    };

    return LogicGatesExporterPlugin;
});