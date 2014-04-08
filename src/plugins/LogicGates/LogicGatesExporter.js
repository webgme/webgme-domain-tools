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
        this.places = [];
        this.transitions = [];
        this.arcs = [];

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
            if ((this.diagramPath && parentPath !== this.diagramPath) || (!this.diagramPath && parentMetaType === 'LogicGatesDiagram')) {

                this.diagram = {"LogicGates":
                    {
                        "@Name": "untitled",
                        "page" :
                        {

                            "@id" : "page0",
                            "@name" : "page0"
                        }
                    }
                };

                this.diagram.LogicGates.page["place"] = this.places;
                this.diagram.LogicGates.page["transition"] = this.transitions;
                this.diagram.LogicGates.page["arc"] = this.arcs;

                this.diagrams.push(this.diagram);

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
                metaType = baseClass ? core.getAttribute(baseClass, 'name') : "", // get child's base META Type
                visitType = metaType === 'Place' || metaType === 'Transition' || metaType === 'Place2Transition' || metaType === 'Transition2Place';

            if (visitType) {

                ++ this.modelID;

                if (metaType === 'Place' || metaType === 'Transition') {

                    // if key not exist already, add key; otherwise ignore
                    var gmeID = core.getPath(child);

                    if (!this.ID_LUT.hasOwnProperty(gmeID)) {

                        this.addComponent(child, metaType);
                    }

                } else if (metaType === 'Place2Transition' || metaType === 'Transition2Place') {

                    this.addConnection(child);
                }
            }

            core.loadChildren(childNodes[i], function(err, childNodes) {
                self.visitObject(err, childNodes, core, callback);
            });
        }

        this.visitedObjects += 1; // another object was just visited

        if (this.objectToVisit === this.visitedObjects) {

            this.diagram = {"LogicGates":
                {
                    "@Name": "untitled",
                    "page" :
                    {
                        "@id" : "page0",
                        "@name" : "page0"
                    }
                }
            };

            // TODO: need to fix this. Not a good way to do

            this.diagram.LogicGates.page["place"] = this.places;
            this.diagram.LogicGates.page["transition"] = this.transitions;
            this.diagram.LogicGates.page["arc"] = this.arcs;

            this.diagrams.push(this.diagram);

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

    LogicGatesExporterPlugin.prototype.addComponent = function(nodeObj, metaType) {

        var core = this.core,
            gmeID = core.getPath(nodeObj),
            name = core.getAttribute(nodeObj, 'name'),
            xPos = nodeObj.data.reg.position.x,
            yPos = nodeObj.data.reg.position.y;

        this.ID_LUT[gmeID] = this.modelID;

        if (metaType === 'Place') {

            // Place component's attrs: id, name, portdir, initialmarking, capacity
            //                   elements: location (attrs: x, y), size (attrs: width, height)
            var capacity = core.getAttribute(nodeObj, 'Capacity'),
                marking = core.getAttribute(nodeObj, 'InitialMarking');

            var place = {
                "@id": this.modelID,
                "@name": name,
                "@portdir": "None",
                "@initialmarking": marking,
                "@capacity": capacity,
                "location": {
                    "@x": xPos,
                    "@y": yPos
                },
                "size": {
                    "@width": 50,
                    "@height": 30
                }
            };
            this.places.push(place);

        } else {

            // Transition component's attrs: id, name, portdir
            //                        elements: location (attrs: x, y), size (attrs: width, height)
            var transition = {
                "@id": this.modelID,
                "@name": name,
                "@portdir": "None",
                "location": {
                    "@x": xPos,
                    "@y": yPos
                },
                "size": {
                    "@width": 50,
                    "@height": 20
                }
            };

            this.transitions.push(transition);
        }
    };

    LogicGatesExporterPlugin.prototype.addConnection = function(nodeObj) {

        var core = this.core,
            self = this,
            src = core.getPointerPath(nodeObj, "src"),
            dst = core.getPointerPath(nodeObj, "dst"),
            delay = core.getAttribute(nodeObj, 'Delay'),
            weight = core.getAttribute(nodeObj, 'Weight');

        var srcMetaType,
            dstMetaType,
            srcX,
            srcY,
            dstX,
            dstY;

        core.loadByPath(self.rootNode, src, function (err, nodeObj) {
            if (!err) {
                // nodeObj is available to use and it is loaded.
                if (!self.ID_LUT.hasOwnProperty(src)) {
                    srcMetaType = core.getAttribute(core.getBase(nodeObj), 'name');
                    self.addComponent(nodeObj, srcMetaType);

                    self.modelID++;
                }

                srcX = nodeObj.data.reg.position.x;
                srcY = nodeObj.data.reg.position.y;
            }
        });

        core.loadByPath(self.rootNode, dst, function (err, nodeObj) {
            if (!err) {
                // nodeObj is available to use and it is loaded.
                if (!self.ID_LUT.hasOwnProperty(dst)) {
                    srcMetaType = core.getAttribute(core.getBase(nodeObj), 'name');
                    self.addComponent(nodeObj, dstMetaType);
                    self.modelID++;
                }

                dstX = nodeObj.data.reg.position.x;
                dstY = nodeObj.data.reg.position.y;
            }
        });

        // Arc component's attrs: id, source, target, delay, weight
        //                 elements: points (element: point (attrs: x, y))

        var arc = {
            "@id": this.modelID,
            "@source": this.ID_LUT[src],
            "@target": this.ID_LUT[dst],
            "@delay": delay,
            "@weight": weight,
            "points": {
                "point": [
                    {
                        "@x": srcX,
                        "@y": srcY
                    },
                    {
                        "@x": dstX,
                        "@y": dstY
                    }
                ]
            }
        };
        this.arcs.push(arc);
    };

    return LogicGatesExporterPlugin;
});