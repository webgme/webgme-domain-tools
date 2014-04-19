/**
 * Created by Dana Zhang on 3/31/2014.
 */


define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'json2xml'], function (PluginConfig, PluginBase, Json2Xml) {

    'use strict';

    var PetriNetExporterPlugin = function () {
        PluginBase.call(this);
        //TODO: this is not the right way to do it..., but a way at least
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
        this.outputFiles = {};
    };

    PetriNetExporterPlugin.prototype = Object.create(PluginBase.prototype);
    PetriNetExporterPlugin.prototype.constructor = PetriNetExporterPlugin;

    PetriNetExporterPlugin.prototype.getName = function () {
        return 'PetriNetExporter';
    };

    PetriNetExporterPlugin.prototype.main = function (callback) {
        var self = this,
            core = self.core,
            selectedNode = self.activeNode;

        if (!selectedNode) {
            callback('selectedNode is not defined', self.result);
            return;
        }

        core.loadChildren(selectedNode, function (err, childNodes) {
            self.visitObject(err, childNodes, core, callback);
        });
    };

    PetriNetExporterPlugin.prototype.visitObject = function (err, childNodes, core, callback) {
        var self = this,
            i,
            child,
            gmeID,
            parentPath,
            parentBaseClass,
            parentMetaType,
            baseClass,
            metaType,
            visitType,
            j2x,
            output,
            artifact;

        this.objectToVisit += childNodes.length; // all child objects have to be visited

        for (i = 0; i < childNodes.length; i += 1) {

            child = childNodes[i];

            parentPath = core.getParent(child) ? core.getPath(core.getParent(child)) : "";
            parentBaseClass = parentPath ? core.getBase(core.getParent(child)) : "";
            parentMetaType = parentBaseClass ? core.getAttribute(parentBaseClass, 'name') : "";

            // if visiting a new diagram, reset global values
            if ((self.diagramPath && parentPath !== self.diagramPath) || (!self.diagramPath && parentMetaType === 'PetriNetDiagram')) {

                self.diagram = {
                    "petrinet":
                        {
                            "@Name": "untitled",
                            "page" :
                                {
                                    "@id" : "page0",
                                    "@name" : "page0"
                                }
                        }
                };

                self.diagram.petrinet.page.place = self.places;
                self.diagram.petrinet.page.transition = self.transitions;
                self.diagram.petrinet.page.arc = self.arcs;

                self.diagrams.push(self.diagram);

                // reset values
                self.ID_LUT = {};
                self.places = [];
                self.transitions = [];
                self.arcs = [];
                self.diagram = {};
                self.modelID = 0;

                self.diagramPath = parentPath;
            }

            baseClass = core.getBase(child);
            metaType = baseClass ? core.getAttribute(baseClass, 'name') : ""; // get child's base META Type
            visitType = metaType === 'Place' || metaType === 'Transition' || metaType === 'Place2Transition' || metaType === 'Transition2Place';

            if (visitType) {

                self.modelID += 1;

                if (metaType === 'Place' || metaType === 'Transition') {

                    // if key not exist already, add key; otherwise ignore
                    gmeID = core.getPath(child);

                    if (!self.ID_LUT.hasOwnProperty(gmeID)) {

                        self.addComponent(child, metaType);
                    }

                } else if (metaType === 'Place2Transition' || metaType === 'Transition2Place') {

                    self.addConnection(child);
                }
            }

            core.loadChildren(childNodes[i], function (err, childNodes) {
                self.visitObject(err, childNodes, core, callback);
            });
        }

        self.visitedObjects += 1; // another object was just visited

        if (self.objectToVisit === self.visitedObjects) {

            self.diagram = {
                "petrinet":
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

            self.diagram.petrinet.page.place = self.places;
            self.diagram.petrinet.page.transition = self.transitions;
            self.diagram.petrinet.page.arc = self.arcs;

            self.diagrams.push(self.diagram);

            j2x = new Json2Xml();

            for (i = 1; i < this.diagrams.length; i += 1) {

                output = j2x.convert(self.diagrams[i]);
                artifact = self.blobClient.createArtifact('output' + i);
            }
//            artifact = self.blobClient.createArtifact('PetriNetExporterOutput');

//            artifact.addFiles(self.outputFiles, function (err, hashes) {
//                if (err) {
//                    callback(null, null);
//                }
//            });

            self.blobClient.saveAllArtifacts(function (err, hashes) {
                for (i = 0; i < hashes.length; i += 1) {
                    self.result.addArtifact(hashes[i]);
                }

                self.result.setSuccess(true);
                callback(null, self.result);
            });
        }
    };

    PetriNetExporterPlugin.prototype.addComponent = function (nodeObj, metaType) {

        var self = this,
            core = self.core,
            gmeID = core.getPath(nodeObj),
            name = core.getAttribute(nodeObj, 'name'),
            capacity = core.getAttribute(nodeObj, 'Capacity'),
            marking = core.getAttribute(nodeObj, 'InitialMarking'),
            xPos = core.getRegistry(nodeObj, 'position').x,
            yPos = core.getRegistry(nodeObj, 'position').y,
            place,
            transition;

        self.ID_LUT[gmeID] = self.modelID;

        if (metaType === 'Place') {

            // Place component's attrs: id, name, portdir, initialmarking, capacity
            //                   elements: location (attrs: x, y), size (attrs: width, height)

            place = {
                "@id": self.modelID,
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
            self.places.push(place);

        } else {

            // Transition component's attrs: id, name, portdir
            //                        elements: location (attrs: x, y), size (attrs: width, height)
            transition = {
                "@id": self.modelID,
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

            self.transitions.push(transition);
        }
    };

    PetriNetExporterPlugin.prototype.addConnection = function (nodeObj) {

        var self = this,
            core = self.core,
            src = core.getPointerPath(nodeObj, "src"),
            dst = core.getPointerPath(nodeObj, "dst"),
            delay = core.getAttribute(nodeObj, 'Delay'),
            weight = core.getAttribute(nodeObj, 'Weight'),
            srcMetaType,
            dstMetaType,
            srcX,
            srcY,
            dstX,
            dstY,
            arc;

        core.loadByPath(self.rootNode, src, function (err, nodeObj) {
            if (!err) {
                if (!self.ID_LUT.hasOwnProperty(src)) {
                    srcMetaType = core.getAttribute(core.getBase(nodeObj), 'name');
                    self.addComponent(nodeObj, srcMetaType);

                    self.modelID += 1;
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
                    self.modelID += 1;
                }

                dstX = nodeObj.data.reg.position.x;
                dstY = nodeObj.data.reg.position.y;
            }
        });

        // Arc component's attrs: id, source, target, delay, weight
        //                 elements: points (element: point (attrs: x, y))

        arc = {
            "@id": self.modelID,
            "@source": self.ID_LUT[src],
            "@target": self.ID_LUT[dst],
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
        self.arcs.push(arc);
    };

    return PetriNetExporterPlugin;
});