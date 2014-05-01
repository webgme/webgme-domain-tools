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
        this.objectToVisit  = 1; // number of objects that have to be visited and we are visiting the root one
        this.diagramPath = "";
        this.modelID = 0;
        this.diagrams = [];
        this.diagram = {};
        this.places = [];
        this.transitions = [];
        this.arcs = [];
        this.idLUT = {};
        this.outputFiles = {};
        this.petriNetDiagrams = {};
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
            basenode,
            metatype,
            isPlace,
            isTransition,
            parentPath,
            parentBaseClass,
            isParentNodeDiagram,
            baseClass,
            visitType,
            isArc,
            j2x,
            output,
            artifact,
            fileKeys,
            nbrOfFiles;

        self.objectToVisit += childNodes.length; // all child objects have to be visited

        for (i = 0; i < childNodes.length; i += 1) {

            child = childNodes[i];
//            basenode = self.get
            parentPath = core.getPath(core.getParent(child));
//            parentPath = core.getParent(child) ? core.getPath(core.getParent(child)) : "";
            parentBaseClass = self.getMetaType(core.getParent(child));
            isParentNodeDiagram = self.isMetaTypeOf(parentBaseClass, self.META.PetriNetDiagram);

            // if visiting a new diagram, reset global values
            if ((self.diagramPath && parentPath !== self.diagramPath) || (!self.diagramPath && isParentNodeDiagram)) {

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
                self.idLUT = {};
                self.places = [];
                self.transitions = [];
                self.arcs = [];
                self.diagram = {};
                self.modelID = 0;

                self.diagramPath = parentPath;
            }

            baseClass = self.getMetaType(child);
            isArc = self.isMetaTypeOf(baseClass, self.META.Place2Transition) || self.isMetaTypeOf(baseClass, self.META.Transition2Place);
            visitType = self.isMetaTypeOf(baseClass, self.META.Place) || self.isMetaTypeOf(baseClass, self.META.Transition) || isArc;

            if (visitType) {

                self.modelID += 1;
                if (isArc) {
                    self.addConnection(child, function (err) {
                        console.log("error occured");
                    });
                } else {

                    // if key not exist already, add key; otherwise ignore
                    gmeID = core.getPath(child);
                    if (!self.idLUT.hasOwnProperty(gmeID)) {

                        self.addComponent(child);
                    }
                }
            }

            core.loadChildren(childNodes[i], function (err, childNodes) {
                self.visitObject(err, childNodes, core, callback);
            });
        }

        self.objectToVisit -= 1; // another object was just visited

        if (self.objectToVisit === 0) {

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

            j2x = new Json2Xml();

            for (i = 1; i < this.diagrams.length; i += 1) {

                output = j2x.convert(self.diagrams[i]);
                this.outputFiles['output' + i + '.xml'] = output;
            }
            artifact = self.blobClient.createArtifact('PetriNetExporterOutput');

            fileKeys = Object.keys(this.outputFiles);
            nbrOfFiles = fileKeys.length;
            for (i = 0; i < fileKeys.length; i += 1) {
                artifact.addFile(fileKeys[i], self.outputFiles[fileKeys[i]], function (err, hash) {
                    nbrOfFiles -= 1;
                    if (nbrOfFiles === 0) {
                        if (err) {
                            callback('Something went wrong when adding files: ' + err, self.result);
                            return;
                        }
                        self.blobClient.saveAllArtifacts(function (err, hashes) {
                            if (err) {
                                callback(err, self.result);
                                return;
                            }
                            self.result.addArtifact(hashes[0]);
                            self.logger.info('Artifacts are saved here: ' + hashes.toString());
                            self.result.setSuccess(true);
                            callback(null, self.result);
                        });
                    }
                });
            }
        }
    };

    PetriNetExporterPlugin.prototype.addComponent = function (nodeObj) {

        var self = this,
            core = self.core,
            gmeID = core.getPath(nodeObj),
            baseClass = self.getMetaType(nodeObj),
            name = core.getAttribute(nodeObj, 'name'),
            capacity = core.getAttribute(nodeObj, 'Capacity'),
            marking = core.getAttribute(nodeObj, 'InitialMarking'),
            xPos = core.getRegistry(nodeObj, 'position').x,
            yPos = core.getRegistry(nodeObj, 'position').y,
            place,
            transition;

        self.idLUT[gmeID] = self.modelID;

        if (self.isMetaTypeOf(baseClass, self.META.Place)) {

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

    PetriNetExporterPlugin.prototype.addConnection = function (nodeObj, callback) {

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
            if (err) {
                callback(null);
                return;
            }

            if (!self.idLUT.hasOwnProperty(src)) {
                srcMetaType = core.getAttribute(self.getMetaType(nodeObj), 'name');
                self.addComponent(nodeObj, srcMetaType);

                self.modelID += 1;
            }

            srcX = core.getRegistry(nodeObj, 'position').x;
            srcY = core.getRegistry(nodeObj, 'position').y;

        });

        core.loadByPath(self.rootNode, dst, function (err, nodeObj) {
            if (err) {
                callback(null);
                return;
            }
            if (!err) {
                // nodeObj is available to use and it is loaded.
                if (!self.idLUT.hasOwnProperty(dst)) {
                    srcMetaType = core.getAttribute(self.getMetaType(nodeObj), 'name');
                    self.addComponent(nodeObj, dstMetaType);
                    self.modelID += 1;
                }

                dstX = core.getRegistry(nodeObj, 'position').x;
                dstY = core.getRegistry(nodeObj, 'position').y;
            }
        });

        // Arc component's attrs: id, source, target, delay, weight
        //                 elements: points (element: point (attrs: x, y))

        arc = {
            "@id": self.modelID,
            "@source": self.idLUT[src],
            "@target": self.idLUT[dst],
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

    /**
     * Checks if the given node is of the given meta-type.
     * Usage: <tt>self.isMetaTypeOf(aNode, self.META['FCO']);</tt>
     * @param node - Node to be checked for type.
     * @param metaNode - Node object defining the meta type.
     * @returns {boolean} - True if the given object was of the META type.
     */
    PetriNetExporterPlugin.prototype.isMetaTypeOf = function (node, metaNode) {
        var self = this,
            metaGuid = self.core.getGuid(metaNode);
        while (node) {
            if (self.core.getGuid(node) === metaGuid) {
                return true;
            }
            node = self.core.getBase(node);
        }
        return false;
    };

    /**
     * Finds and returns the node object defining the meta type for node.
     * @param node - Node to be checked for type.
     * @returns {Object} - Node object defining the meta type of node.
     */
    PetriNetExporterPlugin.prototype.getMetaType = function (node) {
        var self = this,
            name;
        while (node) {
            name = self.core.getAttribute(node, 'name');
            if (self.META.hasOwnProperty(name) && self.core.getPath(self.META[name]) === self.core.getPath(node)) {
                break;
            }
            node = self.core.getBase(node);
        }
        return node;
    };

    return PetriNetExporterPlugin;
});