/**
 * Created by Dana Zhang on 3/31/2014.
 */

define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'xmljsonconverter'], function (PluginConfig, PluginBase, Converter) {

    'use strict';

    var PetriNetExporterPlugin = function () {
        PluginBase.call(this);
        this.modelID = 0;
        this.petriNetDiagrams = {};
        this.diagrams = [];
        this.diagram = {};
        this.idLUT = {};
        this.outputFiles = {};
        this.error = '';
        this.childrenLUT = {};
    };

    PetriNetExporterPlugin.prototype = Object.create(PluginBase.prototype);
    PetriNetExporterPlugin.prototype.constructor = PetriNetExporterPlugin;

    PetriNetExporterPlugin.prototype.getName = function () {
        return 'PetriNetExporter';
    };

    PetriNetExporterPlugin.prototype.main = function (callback) {

        var self = this,
            selectedNode = self.activeNode,
            afterAllVisited;

        if (!selectedNode) {
            callback('selectedNode is not defined', self.result);
            return;
        }
        afterAllVisited = function (err) {
            if (err) {
                callback(err, self.result);
                return;
            }
            self.saveResults(callback);
        };
        self.visitFromNode(selectedNode, afterAllVisited);
    };

    PetriNetExporterPlugin.prototype.visitFromNode = function (node, callback) {
        var self = this,
            afterLoading;
        afterLoading = function (err, children) {
            var counter,
                i,
                itrCallback,
                error = '';
            if (err) {
                callback('failed to load children, error: ' + err);
                return;
            }
            counter = {visits: children.length};
            itrCallback = function (err) {
                error = err ? error += err : error;
                counter.visits -= 1;
                if (counter.visits <= 0) {
                    callback(error);
                }
            };

            if (children.length === 0) {
                itrCallback(null);
            } else {
                for (i = 0; i < children.length; i += 1) {
                    self.visitObject(children[i], function (err, node) {
                        self.visitChildrenRec(node, counter, itrCallback);
                    });
                }
            }
        };
        self.core.loadChildren(node, afterLoading);
    };

    PetriNetExporterPlugin.prototype.visitChildrenRec = function (node, counter, callback) {
        var self = this,
            core = self.core,
            afterLoading;

        afterLoading = function (err, children) {
            var i;
            if (err) {
                callback('failed to load children, error: ' + err);
                return;
            }
            counter.visits += children.length;
            if (children.length === 0) {
                callback(null);
            } else {
                counter.visits -= 1;
                for (i = 0; i < children.length; i += 1) {
                    self.visitObject(children[i], function (err, node) {
                        self.visitChildrenRec(node, counter, callback);
                    });
                }
            }
        };
        core.loadChildren(node, afterLoading);
    };

    PetriNetExporterPlugin.prototype.visitObject = function (node, callback) {
        var self = this,
            core = self.core,
            gmeID = core.getPath(node),
            baseClass = self.getMetaType(node),
            isArc = self.isMetaTypeOf(baseClass, self.META.Place2Transition) || self.isMetaTypeOf(baseClass, self.META.Transition2Place),
            validType = (self.isMetaTypeOf(baseClass, self.META.Place) || self.isMetaTypeOf(baseClass, self.META.Transition) || isArc),
            afterConnAdded;

        if (validType) {
            if (isArc) {
                afterConnAdded = function (err) {
                    if (err) {
                        self.error += err;
                        callback(err, node);
                        return;
                    }
                    callback(null, node);
                };
                self.addConnection(node, afterConnAdded);
            } else {
                // if key not exist already, add key; otherwise ignore
                if (!self.idLUT.hasOwnProperty(gmeID)) {
                    self.addComponent(node);
                }
                callback(null, node);
            }
        } else {
            callback(null, node);
        }
    };

    PetriNetExporterPlugin.prototype.saveResults = function (callback) {
        var self = this,
            diagramPath,
            i = 0,
            output,
            json2xml = new Converter.Json2xml(),
            artifact = self.blobClient.createArtifact('PetriNetExporterOutput');

        for (diagramPath in self.petriNetDiagrams) {
            if (self.petriNetDiagrams.hasOwnProperty(diagramPath) && i > 0) {
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

                self.diagram.petrinet.page.place = self.petriNetDiagrams[diagramPath].places;
                self.diagram.petrinet.page.transition = self.petriNetDiagrams[diagramPath].transitions;
                self.diagram.petrinet.page.arc = self.petriNetDiagrams[diagramPath].arcs;
                self.diagrams.push(self.diagram);
            }
            i += 1;
        }

        for (i = 0; i < this.diagrams.length; i += 1) {

            output = json2xml.convertToString(self.diagrams[i]);
            self.outputFiles['output' + i + '.xml'] = output;
        }

        artifact.addFiles(self.outputFiles, function (err, hashes) {
            if (err) {
                callback(err, self.result);
                return;
            }
            self.logger.warning(hashes.toString());
            artifact.save(function (err, hash) {
                if (err) {
                    callback(err, self.result);
                    return;
                }
                self.result.addArtifact(hash);
                self.result.setSuccess(true);
                callback(null, self.result);
            });
        });
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
            transition,
            parentPath = core.getPath(core.getParent(nodeObj));

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
            if (!self.petriNetDiagrams.hasOwnProperty(parentPath)) {
                self.petriNetDiagrams[parentPath] = {};
            }
            if (!self.petriNetDiagrams[parentPath].hasOwnProperty('places')) {
                self.petriNetDiagrams[parentPath].places = [];
            }
            self.petriNetDiagrams[parentPath].places.push(place);

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

            if (!self.petriNetDiagrams.hasOwnProperty(parentPath)) {
                self.petriNetDiagrams[parentPath] = {};
            }
            if (!self.petriNetDiagrams[parentPath].hasOwnProperty('transitions')) {
                self.petriNetDiagrams[parentPath].transitions = [];
            }
            self.petriNetDiagrams[parentPath].transitions.push(transition);
        }
        self.modelID += 1;
    };

    PetriNetExporterPlugin.prototype.addConnection = function (nodeObj, callback) {

        var self = this,
            core = self.core,
            parentPath = core.getPath(core.getParent(nodeObj)),
            src = core.getPointerPath(nodeObj, "src"),
            dst = core.getPointerPath(nodeObj, "dst"),
            delay = core.getAttribute(nodeObj, 'Delay'),
            weight = core.getAttribute(nodeObj, 'Weight'),
            counter = 2,
            error = '',
            pushArc,
            afterSrcLoaded,
            afterDstLoaded,
            srcMetaType,
            dstMetaType,
            srcX,
            srcY,
            dstX,
            dstY;

        pushArc = function (err, shouldPush) {
            var arc;
            if (err) {
                error += err;
                shouldPush = false;
            }
            counter -= 1;
            if (counter === 0) {
                if (error) {
                    callback(error);
                    return;
                }
                if (shouldPush) {

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
                    if (!self.petriNetDiagrams.hasOwnProperty(parentPath)) {
                        self.petriNetDiagrams[parentPath] = {};
                    }
                    if (!self.petriNetDiagrams[parentPath].hasOwnProperty('arcs')) {
                        self.petriNetDiagrams[parentPath].arcs = [];
                    }
                    self.petriNetDiagrams[parentPath].arcs.push(arc);
                }
                self.modelID += 1;
                callback(null);
            }
        };

        afterSrcLoaded = function (err, nodeObj) {
            if (err) {
                pushArc(err, false);
                return;
            }
            if (!self.idLUT.hasOwnProperty(src)) {
                srcMetaType = core.getAttribute(self.getMetaType(nodeObj), 'name');
                self.addComponent(nodeObj, srcMetaType);
                self.modelID += 1;
            }
            srcX = core.getRegistry(nodeObj, 'position').x;
            srcY = core.getRegistry(nodeObj, 'position').y;
            pushArc(null, true);
        };
        core.loadByPath(self.rootNode, src, afterSrcLoaded);

        afterDstLoaded = function (err, nodeObj) {
            if (err) {
                pushArc(err, false);
                return;
            }
            if (!self.idLUT.hasOwnProperty(dst)) {
                srcMetaType = core.getAttribute(self.getMetaType(nodeObj), 'name');
                self.addComponent(nodeObj, dstMetaType);
                self.modelID += 1;
            }
            dstX = core.getRegistry(nodeObj, 'position').x;
            dstY = core.getRegistry(nodeObj, 'position').y;
            pushArc(null, true);
        };
        core.loadByPath(self.rootNode, dst, afterDstLoaded);

    };

    return PetriNetExporterPlugin;
});