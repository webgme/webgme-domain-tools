/**
 * Created by Dana Zhang on 4/8/2014.
 */

define(['plugin/PluginConfig',
    'plugin/PluginBase',
    'json2xml'], function (PluginConfig, PluginBase, Json2Xml) {

    'use strict';

    var LogicGatesExporterPlugin = function () {
        PluginBase.call(this);

        this.objectToVisit = 1; // number of objects that have to be visited, visiting the selected node makes it start with 1
        this.diagramPath = "";
        this.modelID = 0;
        this.wiresToAdd = [];
        this.circuits = [];
        this.components = {}; // stores a list of diagrams, each of which contains its circuit diagram components
        this.idLUT = {};
        this.childrenLUT = {};

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

        this.outputFiles = {};

        // debugging use
        this.gates = [];
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

//        core.loadChildren(selectedNode, function (err, childNodes) {
//            self.visitObject(err, childNodes, core, callback);
//        });

        self.visitAllChildren(selectedNode, function (err) {
            var i,
                artifact,
                nbrOfFiles,
                fileKeys,
                counter = self.wiresToAdd.length;
            //TODO: error handling
            self.logger.warning('Visited all children!');
            var whenWired = function (err) {
                //TODO: error handling
                counter -= 1;
                if (counter === 0) {
                    self.createObjectFromDiagram();
                    artifact = self.blobClient.createArtifact('LogicGatesExporterOutput');
                    fileKeys = Object.keys(self.outputFiles);
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

            for (i = 0; i < self.wiresToAdd.length; i += 1) {
                self.addWire(self.wiresToAdd[i], whenWired);
            }
        });
    };

    LogicGatesExporterPlugin.prototype.visitAllChildren = function (node, callback) {
        var self = this;
        // load root's children
        self.core.loadChildren(node, function (err, children) {
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
                if (counter.visits === 0) {
                    callback(error);
                }
            };

            for (i = 0; i < children.length; i += 1) {
                self.atNode(children[i], function (err, node) {
                    self.visitAllChildrenRec(node, counter, itrCallback);
                });
            }
        });
    };

    LogicGatesExporterPlugin.prototype.visitAllChildrenRec = function (node, counter, callback) {
        var self = this,
            core = self.core;

        core.loadChildren(node, function (err, children) {
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
        });
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
            // if key not exist already, add key; otherwise ignore
            self.addGate(node, metaType, isComplex, parentPath, function (err) {
                self.logger.info("we just added a gate");
                callback(err, node);
                self.gates.push(node);
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
            error = '';
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
                }
                callback(null);
            }
        };

        core.loadByPath(self.rootNode, src, function (err, node) {
            var srcNodeObj,
                parentPath,
                metaType,
                isGate,
                isPort,
                isComplex;

            if (err) {
                pushWire(err, false);
                return;
            }

            metaType = core.getAttribute(core.getBase(node), 'name');
            isComplex = self.COMPLEX[metaType];
            isGate = self.GATE_TYPES[metaType];
            isPort = metaType === 'InputPort' || metaType === 'OutputPort';

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
                    self.logger.info("we just added a src gate from addWire()");
                    pushWire(err, true);
                });
            } else {
                pushWire(null, false);
            }
        });

        core.loadByPath(self.rootNode, dst, function (err, node) {
            var portGMEId,
                parentPath,
                metaType,
                isComplex,
                isGate,
                isPort,
                dstNodeObj;

            if (err) {
                pushWire(err, false);
                return;
            }
            metaType = core.getAttribute(core.getBase(node), 'name');
            isComplex = self.COMPLEX[metaType];
            isGate = self.GATE_TYPES[metaType];
            isPort = metaType === 'InputPort' || metaType === 'OutputPort';

            if (isGate) {
                dstNodeObj = node;
                parentPath = core.getPath(core.getParent(dstNodeObj));
            } else if (isPort) {
                dstNodeObj = core.getParent(node);
                portGMEId = core.getPath(dstNodeObj);
                dst = core.getPath(dstNodeObj);
                metaType = core.getAttribute(dstNodeObj, 'name');
                parentPath = core.getPath(dstNodeObj);
                dstPort = self.childrenLUT[parentPath].indexOf(portGMEId);
            }

            if ((isPort || isGate) && !self.idLUT.hasOwnProperty(dst)) {
                self.addGate(dstNodeObj, metaType, isComplex, parentPath, function (err) {
                    pushWire(err, true);
                });
            } else {
                pushWire(null, false);
            }
        });
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

            // debugging use: this becomes true when a gate in a subcircuit is being visited
//            if (!xNull || !yNull || !nodeObj || !yNull.position)
//            {
//                console.log("abc");
//            }

        self.idLUT[gmeID] = self.modelID;

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

        pushGate = function (modGate) {
            if (!self.components.hasOwnProperty(parentPath)) {
                self.components[parentPath] = {
                    "Gate": [],
                    "Wire": []
                };
            }
            if (parentPath) {

                self.components[parentPath].Gate.push(modGate);
            }
            self.modelID += 1;
            callback(null);
        };

        if (isComplex) {
            core.loadChildren(nodeObj, function (err, childNodes) {
                if (err) {
                    callback(err);
                    return;
                }
                gate["@NumInputs"] = childNodes.length - 1;
                self.gates.push(gate);
                pushGate(gate);
            });
        } else if (metaType === "Clock") {
            gate["@Milliseconds"] = core.getAttribute(nodeObj, 'Milliseconds');
            self.gates.push(gate);
            pushGate(gate);
        } else if (metaType === "NumericInput" || metaType === "NumericOutput") {
            gate["@Bits"] = bits;
            gate["@SelRep"] = selRep;
            gate["@Value"] = value;
            self.gates.push(gate);
            pushGate(gate);
        } else {
            callback(null);
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
                diagram = {
                    "CircuitGroup": {
                        "@Version": 1.2,
                        "Circuit" : {
                            "Gates": {},
                            "Wires": {}
                        }
                    }
                };

                diagram.CircuitGroup.Circuit.Gates.Gate = self.components[parentPath].Gate;
                diagram.CircuitGroup.Circuit.Wires.Wire = self.components[parentPath].Wire;
                self.circuits.push(diagram);

                j2x = new Json2Xml();
                output = j2x.convert(diagram);
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