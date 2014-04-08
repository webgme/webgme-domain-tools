/**
 * Created by Dana Zhang on 3/31/2014.
 */

'use strict';

define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'plugin/PluginResult',
        'plugin/LogicGatesExporter/LogicGatesExporter/json2xml'], function (PluginConfig, PluginBase, PluginResult, json2xml) {

    // TODO: to modify the base dir path in config.json? to allow dependencies from other dirs

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

        this.diagrams = [];
        this.diagram = {};
        this.gates = [];
        this.wires = [];

        this.ID_LUT = {};

        // only when node is diagram folder then traverse
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

            var parentPath = child.parent ? core.getPath(child.parent) : "",
                parentBaseClass = parentPath ? core.getBase(child.parent) : "",
                parentMetaType = parentBaseClass ? core.getAttribute(parentBaseClass, 'name') : "";


            // if visiting a new diagram, reset global values
            if ((this.diagramPath && parentPath !== this.diagramPath) || (!this.diagramPath && parentMetaType === 'LogicCircuit')) {

                this.createObjectFromDiagram();

                // reset values
                this.ID_LUT = {};
                this.places = [];
                this.transitions = [];
                this.arcs = [];
                this.diagram = {};
                this.modelID = 0;

                this.diagramPath = parentPath;
            }

            var baseClass = core.getBase(child),
                metaType = baseClass ? core.getAttribute(baseClass, 'name') : ""; // get child's base META Type

                if (metaType === 'Place' || metaType === 'Transition') {

                    // if key not exist already, add key; otherwise ignore
                    var gmeID = core.getPath(child);

                    if (!this.ID_LUT.hasOwnProperty(gmeID)) {

                        this.addComponent(child, metaType);
                    }

                } else if (metaType === 'Place2Transition' || metaType === 'Transition2Place') {

                    this.addConnection(child);
                }

            core.loadChildren(childNodes[i], function(err, childNodes) {
                self.visitObject(err, childNodes, core, callback);
            });
        }

        this.visitedObjects += 1; // another object was just visited

        if (this.objectToVisit === this.visitedObjects) {

            this.createObjectFromDiagram();

            var j2x = new json2xml;

            for (var j = 1; j < this.diagrams.length; ++j) {

                var output = j2x.convert(this.diagrams[j]);
                // this.fs.addFile("output" + j + ".json", output);
                this.fs.addFile("output" + j + ".xml", output);
            }

            this.fs.saveArtifact();

            // all objects have been visited
            var pluginResult = new PluginResult();
            pluginResult.success = true;
            if (callback) {
                callback(null, pluginResult);
            }
        }
    };

    LogicGatesExporterPlugin.prototype.addGate = function(nodeObj, metaType, isComplex) {

        var core = this.core,
            self = this,
            gmeID = core.getPath(nodeObj),
            name = core.getAttribute(nodeObj, 'name'),
            numInputs, // number of children
            xPos = nodeObj.data.reg.position.x,
            yPos = nodeObj.data.reg.position.y,
            angle;

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
            var ms = core.getAttribute(nodeObj, 'Milliseconds');
            gate["@Milliseconds"] = ms;

        } else if (metaType === "NumericInput" || metaType === "NumericOutput") {
            var bits = core.getAttribute(nodeObj, 'Bits');
            var selRep = core.getAttribute(nodeObj, 'SelRep');
            var value = core.getAttribute(nodeObj, 'Value');
            gate["@Bits"] = bits;
            gate["@SelRep"] = selRep;
            gate["@Value"] = value;
        }
        this.gates.push(gate);
        ++this.modelID;
    };

    LogicGatesExporterPlugin.prototype.addWire = function(nodeObj) {

        var core = this.core,
            self = this,
            src = core.getPointerPath(nodeObj, "src"),
            dst = core.getPointerPath(nodeObj, "dst");

        var srcMetaType,
            dstMetaType,
            srcPort,
            dstPort,
            srcID,
            dstID;

        core.loadByPath(self.rootNode, src, function (err, nodeObj) {
            if (!err) {
                // nodeObj is available to use and it is loaded.
                if (!self.ID_LUT.hasOwnProperty(src)) {
                    var baseClass = core.getBase(nodeObj);
                    var parentClass = core.getParent(baseClass);
                    var isComplex = core.getAttribute(parentClass, 'name') === "ComplexLogicGate";
                    srcMetaType = core.getAttribute(baseClass, 'name');
                    self.addGate(nodeObj, srcMetaType, isComplex);

                    self.modelID++;
                }
            }
        });

        core.loadByPath(self.rootNode, dst, function (err, nodeObj) {
            if (!err) {
                // nodeObj is available to use and it is loaded.
                if (!self.ID_LUT.hasOwnProperty(dst)) {
                    var baseClass = core.getBase(nodeObj);
                    var parentClass = core.getParent(baseClass);
                    var isComplex = core.getAttribute(parentClass, 'name') === "ComplexLogicGate";
                    dstMetaType = core.getAttribute(baseClass, 'name');
                    self.addGate(nodeObj, dstMetaType, isComplex);

                    self.modelID++;
                }
            }
        });

        // Wire component's elements: From (attrs: ID, Port), To (attrs: ID, Port)

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

        this.wires.push(wire);
    };

    LogicGatesExporterPlugin.prototype.createObjectFromDiagram = function () {
        this.diagram = {"CircuitGroup":
        {
            "@Version": 1.2,
            "Circuit" :
            {
                "Gates": {},
                "wires": {}
            }
        }
        };

        this.diagram.CircuitGroup.Circuit.Gates["Gate"] = this.gates;
        this.diagram.CircuitGroup.Circuit.Gates["Wire"] = this.wires;

        this.diagrams.push(this.diagram);
    }

    return LogicGatesExporterPlugin;
});