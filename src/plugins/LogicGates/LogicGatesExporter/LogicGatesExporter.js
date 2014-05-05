/**
 * Created by Dana Zhang on 4/8/2014.
 */

define(['plugin/PluginConfig',
    'plugin/PluginBase',
    'xmljsonconverter'], function (PluginConfig, PluginBase, Converter) {

    'use strict';

    var LogicGatesExporterPlugin = function () {
        PluginBase.call(this);

        this.objectToVisit = 1; // number of objects that have to be visited, visiting the selected node makes it start with 1
        this.diagramPath = "";
        this.modelID = 0;
        this.wiresToAdd = [];
        this.circuit = [];
        this.circuits = {}; // stores a list of diagrams, each of which contains its circuit diagram circuits
        this.idLUT = {};
        this.childrenLUT = {};
        this.outputFiles = {};

        this.GATE_TYPES = {
            "Not": true,
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
            "Clock": true
        };

        this.COMPLEX = {
            "And": true,
            "Or": true,
            "Nand": true,
            "Nor": true,
            "Xor": true,
            "Xnor": true
        };

        this.WIRE_TYPES = {
            "OutputPort2InputPort": true,
            "UserInput2InputPort": true,
            "OutputPort2UserOutput": true,
            "UserInputBase2UserOutput": true,
            "PortBase2UserIOBase": true,
            "UserIOBase2PortBase": true,
            "UserIOBase2UserIOBase": true
        };
    };

    LogicGatesExporterPlugin.prototype = Object.create(PluginBase.prototype);
    LogicGatesExporterPlugin.prototype.constructor = LogicGatesExporterPlugin;

    LogicGatesExporterPlugin.prototype.getName = function () {
        return 'LogicGatesExporter';
    };

    LogicGatesExporterPlugin.prototype.main = function (callback) {
        var self = this,
            selectedNode = self.activeNode,
            afterAllVisited;

          // uncomment this to enable updating "validPlugin" field
//        var newRootHash,
//            result;
//        core.setRegistry(self.rootNode, 'validPlugins', '');
//        // Commit changes.
//        core.persist(self.rootNode, function (err) {
//        });
//        newRootHash = core.getHash(self.rootNode);
//        console.info(self.project.makeCommit);
//        result = {'commitHash': self.commitHash};
//        result.commitHash = self.project.makeCommit([result.commitHash], newRootHash, 'Plugin updated the model.', function (err) {
//        });

        if (!selectedNode) {
            self.result.setSuccess(false);
            callback('selectedNode is not defined', self.result);
            return;
        }

        // after all children are visited
        afterAllVisited = function (err) {
            var i,
                error,
                counter = self.wiresToAdd.length,
                afterWireAdded;
            if (err) {
                callback(err, self.result);
                return;
            }
            self.logger.warning('Visited all children!');

            afterWireAdded = function (err) {
                error = err ? error += err : error;
                counter -= 1;
                if (counter === 0) {
                    if (error) {
                        callback(error, self.result);
                        return;
                    }
                    self.createObjectFromDiagram();
                    self.saveResults(callback);
                }
            };

            for (i = 0; i < self.wiresToAdd.length; i += 1) {
                self.addWire(self.wiresToAdd[i], afterWireAdded);
            }
        };

        self.visitAllChildren(selectedNode, afterAllVisited);
    };

    LogicGatesExporterPlugin.prototype.saveResults = function (callback) {
        var self = this,
            i,
            error = '',
            afterFileAdded,
            artifact = self.blobClient.createArtifact('LogicGatesExporterOutput'),
            fileKeys = Object.keys(self.outputFiles),
            nbrOfFiles = fileKeys.length;

        if (nbrOfFiles === 0) {
            callback(null, self.result);
            return;
        }

        afterFileAdded = function (err, hash) {
            var afterSavingArtifact;

            afterSavingArtifact = function (err, hashes) {
                if (err) {
                    callback(err, self.result);
                    return;
                }
                self.result.addArtifact(hashes[0]);
                self.logger.info('Artifacts are saved here: ' + hashes.toString());
                self.result.setSuccess(true);
                callback(null, self.result);
            };

            error = err ? error + err : error;
            nbrOfFiles -= 1;
            if (nbrOfFiles === 0) {
                if (error) {
                    callback('Something went wrong when adding files: ' + err, self.result); // if only using err, then it is only err on the last one
                    return;
                }
                self.blobClient.saveAllArtifacts(afterSavingArtifact);
            }
        };

        for (i = 0; i < fileKeys.length; i += 1) {
            artifact.addFile(fileKeys[i], self.outputFiles[fileKeys[i]], afterFileAdded);
        }
    };

    LogicGatesExporterPlugin.prototype.visitAllChildren = function (node, callback) {
        var self = this,
            afterLoading;

        afterLoading = function (err, children) {
            var counter,
                i,
                itrCallback,
                error = '';
            if (err) {
                callback('Could not load children for object, err: ' + err);
                return;
            }
            counter = {visits: children.length};
            itrCallback = function (err) {
                error = err ? error += err : error;
                counter.visits -= 1;
                self.logger.warning(counter.visits.toString());
                if (counter.visits <= 0) {
                    callback(error);
                }
            };

            if (children.length === 0) {
                itrCallback(null);
            } else {

                for (i = 0; i < children.length; i += 1) {
                    self.atNode(children[i], function (err, node) {
                        self.visitAllChildrenRec(node, counter, itrCallback);
                    });
                }
            }
        };
        // load root's children
        self.core.loadChildren(node, afterLoading);
    };

    LogicGatesExporterPlugin.prototype.visitAllChildrenRec = function (node, counter, callback) {
        var self = this,
            core = self.core,
            afterLoading;

        afterLoading = function (err, children) {
            var i;
            if (err) {
                callback('loadChildren failed'); // for ' + node.toString());
                return;
            }
            counter.visits += children.length;
            if (children.length === 0) {
                callback(null);
            } else {
                counter.visits -= 1;
                for (i = 0; i < children.length; i += 1) {
                    self.atNode(children[i], function (err, node) {
                        self.visitAllChildrenRec(node, counter, callback);
                    });
                }
            }
        };

        core.loadChildren(node, afterLoading);
    };

    LogicGatesExporterPlugin.prototype.atNode = function (node, callback) {
        var self = this,
            core = self.core,
            gmeID = core.getPath(node),
            parentPath = core.getPath(core.getParent(node)),
            baseNode = self.getMetaType(node),
            metaType = baseNode ? core.getAttribute(baseNode, 'name') : "", // get node's base META Type
            parentClass = core.getBase(core.getParent(node)),
            parentMeta = parentClass ? core.getAttribute(parentClass, 'name') : "",
            isComplex = self.COMPLEX[metaType],
            isGate = self.GATE_TYPES[metaType] && parentMeta === "LogicCircuit",
            isWire = self.WIRE_TYPES[metaType] && parentMeta === "LogicCircuit";

        if (isGate) {
            self.addGate(node, metaType, isComplex, parentPath, function (err) {
                callback(err, node);
            });

        } else if (isWire) {

            self.wiresToAdd.push(node);
            callback(null, node);

        } else if (metaType === 'InputPort') {

            if (!self.childrenLUT.hasOwnProperty(parentPath)) {

                self.childrenLUT[parentPath] = [];
            }
            self.childrenLUT[parentPath].push(gmeID);
            callback(null, node);
        } else {
            callback(null, node);
        }
    };

    LogicGatesExporterPlugin.prototype.addWire = function (nodeObj, callback) {
        var self = this,
            core = self.core,
            src = core.getPointerPath(nodeObj, "src"),
            dst = core.getPointerPath(nodeObj, "dst"),
            srcID,
            dstID,
            srcPort = 0,
            dstPort = 0,
            wire,
            parentCircuitPath,
            validGates,
            pushWire,
            counter = 2,
            error = '',
            afterLoadingSrc,
            afterLoadingDst;
        // Wire component's elements: From (attrs: ID, Port), To (attrs: ID, Port)
        pushWire = function (err, shouldPush) {
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
                    parentCircuitPath = core.getPath(core.getParent(nodeObj));
                    srcID = self.idLUT[src];
                    dstID = self.idLUT[dst];

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

                    if (!self.circuits.hasOwnProperty(parentCircuitPath)) {
                        self.circuits[parentCircuitPath] = {
                            "Gate": [],
                            "Wire": []
                        };
                    }

                    validGates = (srcPort !== undefined) && (dstPort !== undefined) && (srcID !== undefined) && (dstID !== undefined);
                    if (parentCircuitPath && validGates) {
                        self.circuits[parentCircuitPath].Wire.push(wire);
                    }
                }
                callback(null);
            }
        };

        afterLoadingSrc = function (err, node) {
            var srcNodeObj,
                parentPath,
                metaType,
                isGate,
                isPort,
                isComplex;

            metaType = core.getAttribute(core.getBase(node), 'name');
            isGate = self.GATE_TYPES[metaType];
            isPort = metaType === 'InputPort' || metaType === 'OutputPort';
            isComplex = self.COMPLEX[metaType];

            if (err) {
                pushWire(err, false);
                return;
            }

            if (isGate) {
                srcNodeObj = node;
                parentPath = core.getPath(core.getParent(srcNodeObj));
            } else if (isPort) {
                srcNodeObj = core.getParent(node);
                src = core.getPath(srcNodeObj);
                metaType = core.getAttribute(srcNodeObj, 'name');
                parentPath = core.getPath(srcNodeObj);
                srcPort = 0;
            }

            if ((isPort || isGate) && (!self.idLUT.hasOwnProperty(src))) {
                self.addGate(srcNodeObj, metaType, isComplex, parentPath, function (err) {
                    pushWire(err, true);
                });
            } else {
                pushWire(null, true);
            }
        };
        core.loadByPath(self.rootNode, src, afterLoadingSrc);

        afterLoadingDst = function (err, node) {
            var portGMEId,
                parentPath,
                metaType,
                isComplex,
                isGate,
                isPort,
                dstNodeObj;

            metaType = core.getAttribute(core.getBase(node), 'name');
            isComplex = self.COMPLEX[metaType];
            isGate = self.GATE_TYPES[metaType];
            isPort = metaType === 'InputPort' || metaType === 'OutputPort';

            if (err) {
                pushWire(err, false);
                return;
            }

            if (isGate) {
                dstNodeObj = node;
                parentPath = core.getPath(core.getParent(dstNodeObj));
            } else if (isPort) {
                dstNodeObj = core.getParent(node);
                portGMEId = core.getPath(node);
                dst = core.getPath(dstNodeObj);
                metaType = core.getAttribute(dstNodeObj, 'name');
                parentPath = core.getPath(dstNodeObj);
                dstPort = self.childrenLUT[parentPath].indexOf(portGMEId);
                if (dstPort === -1) {
                    self.childrenLUT[parentPath].push(portGMEId);
                    dstPort = self.childrenLUT[parentPath].indexOf(portGMEId);
                }
            }

            if ((isPort || isGate) && !self.idLUT.hasOwnProperty(dst)) {
                self.addGate(dstNodeObj, metaType, isComplex, parentPath, function (err) {
                    pushWire(err, true);
                });
            } else {
                pushWire(null, true);
            }
        };
        core.loadByPath(self.rootNode, dst, afterLoadingDst);
    };

    /**
     * This function adds a gate to the circuit diagram it belongs to
     * @param {object} nodeObj - current node to be visited
     * @param {string} metaType - meta type of current node
     * @param {boolean} isComplex - indicating whether the current node is a complex logic gate
     * @param {string} parentPath - the circuit diagram the current node belongs to
     * @param {function(string)} callback - the result callback
     * @returns {string} The version of the plugin.
     * @public
     */
    LogicGatesExporterPlugin.prototype.addGate = function (nodeObj, metaType, isComplex, parentPath, callback) {
        var self = this,
            core = self.core,
            gmeID = core.getPath(nodeObj),
            name = core.getAttribute(nodeObj, 'name'),
            bits = core.getAttribute(nodeObj, 'Bits'),
            selRep = core.getAttribute(nodeObj, 'SelRep'),
            value = core.getAttribute(nodeObj, 'Value'),
            xPos = core.getRegistry(nodeObj, 'position').x,
            yPos = core.getRegistry(nodeObj, 'position').y,
            angle = 0,
            gate,
            pushGate;


        // all logic gates component have attrs: Type, Name, ID
        //                                 element: Point (attrs: X, Y, Angle)
        gate = {
            "@Type": metaType,
            "@Name": name,
            "Point": {
                "@X": xPos,
                "@Y": yPos,
                "@Angle": angle
            }
        };

        pushGate = function (modGate, gateGmeID) {
            modGate["@ID"] = self.modelID;
            self.idLUT[gateGmeID] = self.modelID;
            self.modelID += 1;
            if (!self.circuits.hasOwnProperty(parentPath)) {
                self.circuits[parentPath] = {
                    "Gate": [],
                    "Wire": []
                };
            }
            if (parentPath) {

                self.circuits[parentPath].Gate.push(modGate);
            }
            callback(null);
        };

        if (isComplex) {
            core.loadChildren(nodeObj, function (err, childNodes) {
                if (err) {
                    callback(err);
                    return;
                }
                gate["@NumInputs"] = childNodes.length - 1;
                pushGate(gate, gmeID);
            });

        } else {

            if (metaType === "Clock") {
               gate["@Milliseconds"] = core.getAttribute(nodeObj, 'Milliseconds');
            } else if (metaType === "NumericInput" || metaType === "NumericOutput") {
                gate["@Bits"] = bits;
                gate["@SelRep"] = selRep;
                gate["@Value"] = value;
            }
            pushGate(gate, gmeID);
        }
    };

    LogicGatesExporterPlugin.prototype.createObjectFromDiagram = function () {
        var self = this,
            i = 0,
            parentPath,
            diagram,
            json2xml = new Converter.Json2xml(),
            output;

        for (parentPath in self.circuits) {
            if (self.circuits.hasOwnProperty(parentPath)) {
                diagram = {
                    "circuits": {
                        "@Version": 1.2,
                        "Circuit" : {
                            "Gates": {},
                            "Wires": {}
                        }
                    }
                };

                diagram.circuits.Circuit.Gates.Gate = self.circuits[parentPath].Gate;
                diagram.circuits.Circuit.Wires.Wire = self.circuits[parentPath].Wire;
                self.circuit.push(diagram);
                output = json2xml.convertToString(diagram);
                self.outputFiles["output" + i + ".gcg"] = output;
            }
            i += 1;
        }
    };

    /**
     * Checks if the given node is of the given meta-type.
     * Usage: <tt>self.isMetaTypeOf(aNode, self.META['FCO']);</tt>
     * @param node - Node to be checked for type.
     * @param metaNode - Node object defining the meta type.
     * @returns {boolean} - True if the given object was of the META type.
     */
    LogicGatesExporterPlugin.prototype.isMetaTypeOf = function (node, metaNode) {
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
    LogicGatesExporterPlugin.prototype.getMetaType = function (node) {
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

    /**
     * Returns true if node is a direct instance of a meta-type node (or a meta-type node itself).
     * @param node - Node to be checked.
     * @returns {boolean}
     */
    LogicGatesExporterPlugin.prototype.isBaseMeta = function (node) {
        var self = this,
            baseName,
            baseNode = self.core.getBase(node);

        if (!baseNode) {
            // FCO does not have a base node, by definition function returns true.
            return true;
        }

        baseName = self.core.getAttribute(baseNode, 'name');
        return self.META.hasOwnProperty(baseName) && self.core.getPath(self.META[baseName]) === self.core.getPath(baseNode);
    };

    return LogicGatesExporterPlugin;
});