/**
* Generated by PluginGenerator from webgme on Wed Apr 16 2014 16:05:02 GMT-0500 (Central Daylight Time).
*/

define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'plugin/FmiExporter/FmiExporter/FMU',
        'plugin/FmiExporter/FmiExporter/Templates/Templates',
        'ejs'], function (PluginConfig, PluginBase, FmuMetaTypes, TEMPLATES, ejs) {
    // PM: This change saves you one indent (or JSLint complaints for each method).
    'use strict';

    /**
    * Initializes a new instance of FmiExporter.
    * @class
    * @augments {PluginBase}
    * @classdesc This class represents the plugin FmiExporter.
    * @constructor
    */
    var FmiExporter = function () {
        // Call base class' constructor.
        PluginBase.call(this);

        this.pathToFmuInfo = {};
        this.pathToTarjansVertex = {};
        this.nodeCount = 0;
        this.path2node = {};
        this.fmuPackageHashMap = {};
        this.connectionMap = {};
        this.connections = [];
        this.simulationInfo = {
            'StartTime': 0,
            'StopTime': 1,
            'StepSize': 0.001
        };
        this.modelExchangeConfig = {};
        this.filesToSave = {};
    };

    // Prototype inheritance from PluginBase.
    FmiExporter.prototype = Object.create(PluginBase.prototype);
    FmiExporter.prototype.constructor = FmiExporter;

    /**
    * Gets the name of the FmiExporter.
    * @returns {string} The name of the plugin.
    * @public
    */
    FmiExporter.prototype.getName = function () {
        return 'FMI ModelExchange Exporter';
    };

    /**
    * Gets the description of the FmiExporter.
    * @returns {string} The description of the plugin.
    * @public
    */
    FmiExporter.prototype.getDescription = function () {
        return 'Generates a model_exchange_config.json for simulating a FMI system';
    };

    /**
    * Gets the semantic version (semver.org) of the FmiExporter.
    * @returns {string} The version of the plugin.
    * @public
    */
    FmiExporter.prototype.getVersion = function () {
        return '0.1.0';
    };

    FmiExporter.prototype.main = function (callback) {
        var self = this,
            selectedNode = self.activeNode,
            modelExchangeNode,
            modelExchangeName;

        if (!selectedNode) {
            callback('selectedNode is not defined', self.result);
            return;
        }

        this.updateMETA(FmuMetaTypes);

        if (self.isMetaTypeOf(selectedNode, FmuMetaTypes.ModelExchange)) {
            modelExchangeNode = selectedNode;
            modelExchangeName = self.core.getAttribute(modelExchangeNode, 'name');
            self.nodeCount +=1;
        } else {
            callback('SelectedNode is not a ModelExchange!', self.result);
            return;
        }

        var allNodesAreLoadedCallbackFunction = function (err) {
            if (err) {
                var msg = 'Something went wrong getting loading child nodes';
                self.logger.error(msg);
                return callback(msg, self.result);
            }

            self.buildModelExchangeConfig();
            self.runTarjansAlgorithm();

            //=================================================================
            var artifact = self.blobClient.createArtifact(modelExchangeName);

            self.modelExchangeConfig['ConnectionMap'] = self.connectionMap;
            self.modelExchangeConfig['FMUs'] = self.pathToFmuInfo;
            self.modelExchangeConfig['SimulationInfo'] = self.simulationInfo;
            var fileInfo = JSON.stringify(self.modelExchangeConfig, null, 4);

            var tt1 = ejs.render(TEMPLATES['fmi_wrapper.py.ejs']);
            var tt2 = ejs.render(TEMPLATES['jmodelica_model_exchange.py.ejs']);
            var tt3 = ejs.render(TEMPLATES['run_jmodelica_model_exchange.cmd.ejs']);
            var tt4 = ejs.render(TEMPLATES['ReadMe.txt.ejs']);

            self.filesToSave['model_exchange_config.json'] = fileInfo;
            self.filesToSave['fmi_wrapper.py'] = tt1;
            self.filesToSave['jmodelica_model_exchange.py'] = tt2;
            self.filesToSave['run_jmodelica_model_exchange.cmd'] = tt3;
            self.filesToSave['ReadMe.txt'] = tt4;

            var addFilesCallback = function (err, fileHashes) {
                if (err) {
                    self.result.setSuccess(false);
                    return callback(err, self.result);
                }

                var i,
                    fmuPathWithinArtifact,
                    fmuHash,
                    fmuPackageHashMapKeys = Object.keys(self.fmuPackageHashMap),
                    addHashesError,
                    addHashesCounter = fmuPackageHashMapKeys.length;

                var addHashCounterCallback = function (addHashCallbackError, addedHash) {
                    if (addHashCallbackError) {
                        addHashesError += addHashCallbackError;
                    }

                    fileHashes.push(addedHash);
                    addHashesCounter -= 1;

                    if (addHashesCounter === 0) {

                        if (addHashesError) {
                            self.result.setSuccess(false);
                            callback(addHashesError, self.result);
                            return;
                        }

                        var artifactSaveCallback = function (err, artifactHash) {
                            if (err) {
                                self.result.setSuccess(false);
                                callback(err, self.result);
                                return;
                            }

                            self.logger.info('Saved artifact hashes are: ' + artifactHash);

                            self.result.addArtifact(artifactHash);

                            self.result.setSuccess(true);

                            // This will save the changes. If you don't want to save;
                            // exclude self.save and call callback directly from this scope.
                            self.save('Finished FmiExporter', function (err) {
                                if (err) {
                                    self.result.setSuccess(false);
                                    callback(err, self.result);
                                    return;
                                }

                                callback(null, self.result);
                            });
                        };

                        artifact.save(artifactSaveCallback);
                    }
                };

                for (i = 0; i < fmuPackageHashMapKeys.length; i += 1) {
                    fmuPathWithinArtifact = fmuPackageHashMapKeys[i];
                    fmuHash = self.fmuPackageHashMap[fmuPathWithinArtifact];
                    artifact.addObjectHash(fmuPathWithinArtifact, fmuHash, addHashCounterCallback);
                }
            };

            artifact.addFiles(self.filesToSave, addFilesCallback);
            //=================================================================

        };

        self.loadAllNodesRecursive(modelExchangeNode, null, allNodesAreLoadedCallbackFunction);
    };

    FmiExporter.prototype.buildModelExchangeConfig = function () {
        var self = this,
            thisNode,
            thisNodeName,
            thisNodePath,
            parentFmuPath,
            connSrcPath,
            connDstPath,
            isFmu,
            isParam,
            isInput,
            isOutput;

        for (thisNodePath in self.path2node) {
            thisNode = self.path2node[thisNodePath];
            thisNodeName = self.core.getAttribute(thisNode, 'name');

            // DEBUG
            isFmu = self.isMetaTypeOf(thisNode, FmuMetaTypes.FMU);
            isParam = self.isMetaTypeOf(thisNode, FmuMetaTypes.Parameter);
            isInput = self.isMetaTypeOf(thisNode, FmuMetaTypes.Input);
            isOutput = self.isMetaTypeOf(thisNode, FmuMetaTypes.Output);
            //

            if (self.isMetaTypeOf(thisNode, FmuMetaTypes.PortComposition)) {

                connSrcPath = self.core.getPointerPath(thisNode, 'src');
                connDstPath = self.core.getPointerPath(thisNode, 'dst');

                if (connSrcPath && connDstPath) {
                    if (self.connectionMap.hasOwnProperty(connSrcPath)) {
                        self.connectionMap[connSrcPath].push(connDstPath);   // append to existing list of destinations

                    } else {
                        self.connectionMap[connSrcPath] = [connDstPath];
                    }
                } else {
                    var portCompositionPath = self.core.getPath(thisNode);
                    self.logger.warning('PortComposition (' + portCompositionPath + ') is missing a SrcPointer or DstPointer.');
                }

            } else if (isFmu) {
                if (!self.pathToFmuInfo.hasOwnProperty(thisNodePath)) {
                    self.getFmuInfo(thisNodePath, thisNode, thisNodeName);
                }

            } else if (isParam) {
                parentFmuPath = self.getParentPath(thisNodePath);

                if (!self.pathToFmuInfo.hasOwnProperty(parentFmuPath)) {
                    self.getFmuInfo(parentFmuPath);
                }

                self.pathToFmuInfo[parentFmuPath].Parameters[thisNodeName] = self.core.getAttribute(thisNode, 'value');

            } else if (isInput) {
                parentFmuPath = self.getParentPath(thisNodePath);

                if (!self.pathToFmuInfo.hasOwnProperty(parentFmuPath)) {
                    self.getFmuInfo(parentFmuPath);
                }

                self.pathToFmuInfo[parentFmuPath].Inputs[thisNodePath] = thisNodeName;

            } else if (isOutput) {
                parentFmuPath = self.getParentPath(thisNodePath);

                if (!self.pathToFmuInfo.hasOwnProperty(parentFmuPath)) {
                    self.getFmuInfo(parentFmuPath);
                }

                self.pathToFmuInfo[parentFmuPath].Outputs[thisNodePath] = thisNodeName;

            } else if (self.isMetaTypeOf(thisNode, FmuMetaTypes.SimulationParameter)) {
                if (self.simulationInfo.hasOwnProperty(thisNodeName)) {
                    self.simulationInfo[thisNodeName] = self.core.getAttribute(thisNode, 'value');
                }
            }
        }
    };

    FmiExporter.prototype.getFmuInfo = function (fmuNodePath, fmuNode, fmuNodeName) {
        var self = this;
        fmuNode = fmuNode || self.path2node(fmuNodePath);
        fmuNodeName = fmuNodeName || self.core.getAttribute(fmuNode, 'name');

        var fmuInstanceAssetHash = self.core.getAttribute(fmuNode, 'resource'),
            fmuBaseNode = self.core.getBase(fmuNode),
            fmuBaseName = self.core.getAttribute(fmuBaseNode, 'name'),
            fmuBaseAssetHash = self.core.getAttribute(fmuBaseNode, 'resource'),
            fmuInfo = {
                'InstanceName': fmuNodeName,
                'Priority': 1,
                'Parameters': {},
                'Inputs': {},
                'Outputs': {}
            };

        self.pathToTarjansVertex[fmuNodePath] = new TarjansVertex(fmuNodePath);

        if (fmuInstanceAssetHash === fmuBaseAssetHash) {
            fmuInfo['File'] = 'FMUs/' + fmuBaseName + '.fmu';
            fmuInfo['Asset'] = self.core.getAttribute(fmuBaseNode, 'resource');
        } else {
            fmuInfo['File'] = 'FMUs/' + fmuNodeName + '.fmu';
            fmuInfo['Asset'] = self.core.getAttribute(fmuNode, 'resource');
        }

        self.fmuPackageHashMap[fmuInfo.File] = fmuInfo.Asset;
        self.pathToFmuInfo[fmuNodePath] = fmuInfo;
    };

    FmiExporter.prototype.getParentPath = function (childPath) {
        var splitPath = childPath.split('/'),
            slicedPath = splitPath.slice(0, -1),
            parentPath = slicedPath.join('/');

        return parentPath;
    };

    FmiExporter.prototype.loadAllNodesRecursive = function (parentNode, errors, callback) {
        var self = this,
            loadChildrenCallbackFunction,
            parentName = self.core.getAttribute(parentNode, 'name');

        loadChildrenCallbackFunction = function (err, children) {
            if (err) {
                errors += err;
            }

            self.nodeCount -= 1;

            var childNodes = children;
            self.nodeCount += childNodes.length;

            if (self.nodeCount === 0) {
                callback(errors);
            }

            for (var i = 0; i < childNodes.length; i += 1) {
                self.path2node[self.core.getPath(childNodes[i])] = childNodes[i];
                self.loadAllNodesRecursive(childNodes[i], errors, callback)
            }
        };

        self.core.loadChildren(parentNode, loadChildrenCallbackFunction);
    };

    FmiExporter.prototype.runTarjansAlgorithm = function() {
        var self = this,
            tarjansVertex,
            tarjansVertices = [],
            fmuPath,
            fmuInfo,
            fmuTargetPath,
            outputPath,
            connectedInputs,
            ithConnectedInput,
            i;


        for (fmuPath in self.pathToTarjansVertex) {
            fmuInfo = self.pathToFmuInfo[fmuPath];
            tarjansVertex = self.pathToTarjansVertex[fmuPath];

            for (outputPath in fmuInfo.Outputs) {
                if (!self.connectionMap.hasOwnProperty(outputPath)) {
                    continue;
                }
                connectedInputs = self.connectionMap[outputPath];
                
                for (i = 0; i < connectedInputs.length; i += 1) {
                    ithConnectedInput = connectedInputs[i];

                    fmuTargetPath = self.getParentPath(ithConnectedInput);
                    tarjansVertex.connections.push(self.pathToTarjansVertex[fmuTargetPath]);
                }

            }
            
            tarjansVertices.push(tarjansVertex);
        }

        var tarjansGraph = new TarjansGraph(tarjansVertices),
            tarjansAlgorithm = new TarjansAlgorithm(tarjansGraph),
            tarjansScc = tarjansAlgorithm.run();

        for (i = 0; i < tarjansScc.length; i += 1) {
            if (tarjansScc[i].length === 1) {
                self.pathToFmuInfo[tarjansScc[i][0].name].Priority = tarjansScc.length - i;
            } else {
                self.logger.error("Tarjan's algorithm detected a loop with fmu " + tarjansScc[i][0].name);
            }
        }
    };

//<editor-fold desc="============================ Tarjans Definitions ==================================">

    var TarjansVertex = function (name) {
        this.name = name || null;
        this.connections = [];
        this.index= -1;
        this.lowlink = -1;
    };

    TarjansVertex.prototype.equals = function (vertex) {
        // equality check based on vertex name
        return (vertex.name && this.name==vertex.name);
    };

    var TarjansGraph = function (vertices){
        this.vertices = vertices || [];
    };

    var TarjansVertexStack = function (vertices) {
        this.vertices = vertices || [];
    };
    TarjansVertexStack.prototype.contains = function (vertex) {
        var nbrVertices = this.vertices.length,
            ithVertex;

        for (var i = 0; i < nbrVertices; i += 1) {
            ithVertex = this.vertices[i];
            if (ithVertex.equals(vertex)) {
                return true;
            }
        }
        return false;
    };

    var TarjansAlgorithm = function (graph) {
        this.index = 0;
        this.stack = new TarjansVertexStack();
        this.graph = graph;
        this.scc = [];
    };

    TarjansAlgorithm.prototype.run = function () {
        var nbrGraphVertices = this.graph.vertices.length,
            ithGraphVertex;

        for (var i = 0; i < nbrGraphVertices; i += 1) {
            ithGraphVertex = this.graph.vertices[i];
            if (ithGraphVertex.index < 0) {
                this.strongconnect(ithGraphVertex);
            }
        }
        return this.scc;
    };

    TarjansAlgorithm.prototype.strongconnect = function (vertex) {
        var w;

        // Set the depth index for v to the smallest unused index
        vertex.index = this.index;
        vertex.lowlink = this.index;
        this.index = this.index + 1;
        this.stack.vertices.push(vertex);

        // Consider successors of v
        // aka... consider each vertex in vertex.connections
        for (var i in vertex.connections){
            var v = vertex;
            w = vertex.connections[i];
            if (w.index < 0) {
                // Successor w has not yet been visited; recurse on it
                this.strongconnect(w);
                v.lowlink = Math.min(v.lowlink,w.lowlink);
            } else if (this.stack.contains(w)){
                // Successor w is in stack S and hence in the current SCC
                v.lowlink = Math.min(v.lowlink,w.index);
            }
        }

        // If v is a root node, pop the stack and generate an SCC
        if (vertex.lowlink==vertex.index){
            // start a new strongly connected component
            var vertices = [];
            w = null;
            if (this.stack.vertices.length>0){
                do {
                    w = this.stack.vertices.pop();
                    // add w to current strongly connected component
                    vertices.push(w);
                } while (!vertex.equals(w));
            }
            // output the current strongly connected component
            // ... i'm going to push the results to a member scc array variable
            if (vertices.length>0){
                this.scc.push(vertices);
            }
        }
    };

    //</editor-fold>

    return FmiExporter;
});

