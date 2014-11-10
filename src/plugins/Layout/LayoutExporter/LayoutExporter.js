/**
 * Created by zhangpn on 11/3/2014.
 */
define(['plugin/PluginConfig',
        'plugin/PluginBase'], function (PluginConfig, PluginBase) {

    'use strict';

    var NAME = 'name',
        ISPORT = 'isPort',
        DELIM = '=>';

    var LayoutExporterPlugin = function () {
        PluginBase.call(this);
        this.modelID = 0;
        this.diagram = {};
        this.idLUT = {};
        this.error = '';
        this.connections = [];
        this.components = [];
    };

    LayoutExporterPlugin.prototype = Object.create(PluginBase.prototype);
    LayoutExporterPlugin.prototype.constructor = LayoutExporterPlugin;

    LayoutExporterPlugin.prototype.getName = function () {
        return 'LayoutExporter';
    };

    LayoutExporterPlugin.prototype.main = function (callback) {

        var self = this,
            selectedNode = self.activeNode,
            afterAllVisited;

        // uncomment this to enable updating "validPlugin" field
//        var newRootHash,
//            result,
//            core = self.core;
//        core.setRegistry(self.rootNode, 'validPlugins', '');
//        // Commit changes.
//        core.persist(self.rootNode, function (err) {
//        });
//        newRootHash = core.getHash(self.rootNode);
//        console.info("Plugin updated model");
//        result = {'commitHash': self.commitHash};
//        result.commitHash = self.project.makeCommit([result.commitHash], newRootHash, 'Plugin updated the model.', function (err) {
//        });

        if (!selectedNode) {
            callback('selectedNode is not defined', self.result);
            return;
        }

        // after all children are visited
        afterAllVisited = function (err) {
            var output = {
                components: self.components,
                connections: self.connections
            };

            if (err) {
                callback(err, self.result);
                return;
            }
            self.logger.warning('Visited all children!');
            self.saveResults(output, callback);

        };

        self.getChildrenFromNode(selectedNode, afterAllVisited);

        console.info("Plugin completed");
    };

    LayoutExporterPlugin.prototype.saveResults = function (obj, callback) {
        var self = this,
            core = self.core,
            artifact = self.blobClient.createArtifact('LayoutExporterOutput'),
            file = {};

        file[core.getAttribute(self.activeNode, NAME) + ".json"] = JSON.stringify(obj, null, 4);

        artifact.addFiles(file, function (err, hashes) {
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

    LayoutExporterPlugin.prototype.getChildrenFromNode = function (node, callback) {
        var self = this,
            afterLoading;

        afterLoading = function (err, children) {
            var i,
                itrCallback,
                error = '';
            if (err) {
                callback('Could not load children for object, err: ' + err);
                return;
            }

            for (i = 0; i < children.length; i += 1) {
                self.atNode(children[i], function (err) {
                    if (err) {
                        // todo: error handling
                    }

                });
            }

            callback(null);
        };

        // load activeNode's children
        self.core.loadChildren(node, afterLoading);
    };

    LayoutExporterPlugin.prototype.atNode = function (node, callback) {

        var self = this,
            core = self.core,
            SRCPTR = "src",
            DSTPTR = "dst",
            ptrArray = core.getOwnPointerNames(node),
            component = {},
            connection = {},
            srcPath,
            dstPath,
            counter = 2,
            error = "",
            afterLoadingSrc,
            afterLoadingDst,
            pushConnection;

        afterLoadingSrc = function (err, node) {
            var isPort = core.getRegistry(node, ISPORT),
                portId = "",
                srcObj;

            if (err) {
                pushConnection(err);
                return;
            }

            // if src node is a port, then return srcObj as its parent node
            if (isPort) {
                srcObj = core.getParent(node);
                portId = DELIM + core.getPath(node);
            } else {
                // else return node as srcObj
                srcObj = node;
            }

            connection.srcID = core.getPath(srcObj) + portId;
            pushConnection(null, connection);
        };

        afterLoadingDst = function (err, node) {
            var isPort = core.getRegistry(node, ISPORT),
                portId = "",
                dstObj;

            if (err) {
                pushConnection(err);
                return;
            }

            // if dst node is a port, then return dstObj as its parent node
            if (isPort) {
                dstObj = core.getParent(node);
                portId = DELIM + core.getPath(node);
            } else {
                // else return node as dstObj
                dstObj = node;
            }

            connection.dstID = core.getPath(dstObj) + portId;

            pushConnection(null, connection);
        };

        pushConnection = function (err, connection) {
            // todo: get pathpoints of connection
            if (err) {
                error += err;
            }

            --counter;
            // waiting on two threads -- srcobj and dstobj threads
            if (counter === 0) {
                if (error) {
                    callback(error);
                    return;
                }
                self.connections.push(connection);
                callback(null);
            }
        };

        // check if node is a connection
        // todo: find a better way to get connections...
        if (ptrArray.indexOf(SRCPTR) > -1 && ptrArray.indexOf(DSTPTR) > - 1) {
            // get source object and dst object:

            srcPath = core.getPointerPath(node, SRCPTR);
            dstPath = core.getPointerPath(node, DSTPTR);

            // name, id, srcid, dstid, pathpoints

            connection.name = core.getAttribute(node, NAME);
            connection.id = core.getPath(node);

            core.loadByPath(self.rootNode, srcPath, afterLoadingSrc);
            core.loadByPath(self.rootNode, dstPath, afterLoadingDst);

        } else {
            // node is a component, get id, name, position, size if there's one
            // get ports if component has ports

            component.name = core.getAttribute(node, NAME);
            component.id = core.getPath(node);
            component.position = node.data.reg.position;

            // todo: get size of component, ports if any
            self.components.push(component);
        }
    };


    return LayoutExporterPlugin;
});