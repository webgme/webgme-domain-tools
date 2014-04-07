/**
 * Created by Dana Zhang on 3/31/2014.
 */

'use strict';

define(['plugin/PluginConfig',
    'plugin/PluginBase',
    'plugin/PluginResult',
    'plugin/PetriNetExporter/PetriNetExporter/json2xml'], function (PluginConfig, PluginBase, PluginResult, json2xml) {

    // TODO: to modify the base dir path in config.json? to allow dependencies from other dirs

    var PetriNetExporterPlugin = function () {
        PluginBase.call(this);
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

        // TODO: maybe there is an existing function that can access position data directly from a given pointer path?
        this.XPOS_LUT = {};
        this.YPOS_LUT = {};

        // only when node is diagram folder then traverse
        core.loadChildren(selectedNode, function(err, childNodes) {
            self.visitObject(err, childNodes, core, callback);
        });

        var o = {"e": { "#text": "text",
            "a": [
                {
                    "#text": "I'm a",
                    "c": "i am tag c",
                    "@name": "I'm an attribute",
                    "@last": "i'm another one",
                    "abc": {
                        "does": "this work",
                        "@or": "not"
                    }
                },
                {
                    "c": "tag"
                }
            ],
            "b": "dana"}};

        var j2x = new json2xml;

        console.log(j2x.convert(o));

        console.log("should've printed here");

    };

    PetriNetExporterPlugin.prototype.visitObject = function (err, childNodes, core, callback) {
        var self = this;

        this.objectToVisit += childNodes.length; // all child objects have to be visited

        var i;
        for (i = 0; i < childNodes.length; ++i) {

            var child = childNodes[i],
                metaType,
                parentPath = child.parent ? core.getPath(child.parent) : "",
                parentBaseClass = parentPath ? core.getBase(child.parent) : "",
                parentMetaType = parentBaseClass ? core.getAttribute(parentBaseClass, 'name') : "";

            // get its base META Type
            var baseClass = core.getBase(child);
            if (baseClass) {
                metaType = core.getAttribute(baseClass, 'name');
            }

            // if visiting a new diagram, reset global values
            if ((this.diagramPath && parentPath !== this.diagramPath) || (!this.diagramPath && parentMetaType === 'PetriNetDiagram')) {


                this.diagram = {"petrinet":
                {
                    "@Name": "untitiled",
                    "page" :
                        {

                            "@id" : "page0",
                            "@name" : "page0"
                        }
                    }
                };

                this.diagram.petrinet.page["place"] = this.places;
                this.diagram.petrinet.page["transition"] = this.transitions;
                this.diagram.petrinet.page["arc"] = this.arcs;

                this.diagrams.push(this.diagram);

                this.places = [];
                this.transitions = [];
                this.arcs = [];
                this.diagram = {};
                this.modelID = 0;

                this.diagramPath = parentPath;
            }


            console.log(core.getAttribute(child, 'name'));
            console.log(core.getPath(child));
//            console.log(core.getAttribute(child.parent, 'name'));

            var name = core.getAttribute(child, 'name'),
                xPos = child.data.reg.position.x,
                yPos = child.data.reg.position.y;

            var visitType = metaType === 'Place' || metaType === 'Transition' || metaType === 'Place2Transition' || metaType === 'Transition2Place';

            if (visitType) {

                ++ this.modelID;
                // foreach eligible component, add its unique id and modelID to the LUT

                if (metaType === 'Place') {

                    var gmeID = core.getPath(child);
                    if (gmeID) {

                        this.ID_LUT[gmeID] = this.modelID;
                        this.XPOS_LUT[gmeID] = xPos;
                        this.YPOS_LUT[gmeID] = yPos;
                    }

                    // Place component's attrs: id, name, portdir, initialmarking, capacity
                    //                   elements: location (attrs: x, y), size (attrs: width, height)

                    var capacity = core.getAttribute(child, 'Capacity'),
                        marking = core.getAttribute(child, 'InitialMarking');

                    // create a new json object for each place
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

                } else if (metaType === 'Transition') {

                    // Transition component's attrs: id, name, portdir
                    //                        elements: location (attrs: x, y), size (attrs: width, height)

                    this.ID_LUT[core.getPath(child)] = this.modelID;

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

                } else if (metaType === 'Place2Transition' || metaType === 'Transition2Place') {
                    // Arc component's attrs: id, source, target, delay, weight
                    //                 elements: points (element: point (attrs: x, y))

                    // getting source and destination paths of a connection object

                    var src = core.getPointerPath(child, "src"),
                        dst = core.getPointerPath(child, "dst"),
                        delay = core.getAttribute(child, 'Delay'),
                        weight = core.getAttribute(child, 'Weight');

                    var arc = {
                        "@id": this.modelID,
                        "@source": this.ID_LUT[src],
                        "@target": this.ID_LUT[dst],
                        "@delay": delay,
                        "@weight": weight,
                        "points": {
                            "point": [

                                {
                                    "@x": this.XPOS_LUT[src],
                                    "@y": this.YPOS_LUT[src]
                                },
                                {
                                    "@x": this.XPOS_LUT[dst],
                                    "@y": this.YPOS_LUT[dst]
                                }
                            ]
                        }
                    };
                    this.arcs.push(arc);
                }
            }

            //    HEIGHT = isTypePlace ? 30 : 20; can we use META Aspect

            core.loadChildren(childNodes[i], function(err, childNodes) {
                self.visitObject(err, childNodes, core, callback);
            });
        }

        this.visitedObjects += 1; // another object was just visited

        if (this.objectToVisit === this.visitedObjects) {

            this.diagram = {"petrinet":
            {
                "@Name": "untitiled",
                "page" :
                {

                    "@id" : "page0",
                    "@name" : "page0"
                }
            }
            };

            this.diagram.petrinet.page["place"] = this.places;
            this.diagram.petrinet.page["transition"] = this.transitions;
            this.diagram.petrinet.page["arc"] = this.arcs;

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

//        else {
//            some objects still need to be visited
//            this.logger.info('Visiting progress: ' + this.visitedObjects + '/' + this.objectToVisit);
//        }
    };

    return PetriNetExporterPlugin;
});