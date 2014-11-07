/**
 * Created by zhangpn on 11/3/2014.
 */
define(['plugin/PluginConfig',
        'plugin/PluginBase'], function (PluginConfig, PluginBase) {

    'use strict';

    var LayoutExporterPlugin = function () {
        PluginBase.call(this);
        this.modelID = 0;
        this.diagram = {};
        this.idLUT = {};
        this.error = '';
        this.childrenLUT = {};
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
            var i,
                error,
                counter = self.wiresToAdd.length,
                afterWireAdded;
            if (err) {
                callback(err, self.result);
                return;
            }
            self.logger.warning('Visited all children!');
            self.saveResults(callback);

        };

        self.getChildrenFromNode(selectedNode, afterAllVisited);

        console.info("Plugin completed");
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

            itrCallback = function (err) {
                error = err ? error += err : error;
            };

            if (children.length === 0) {
                itrCallback(null);
            } else {
                for (i = 0; i < children.length; i += 1) {
                    self.atNode(children[i], function (err, obj, isConnection) {
                        // obj is the resulting component or connection object from atNode()
                        // store obj

                    });
                }
            }
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
            srcPath,
            dstPath,
            srcObj,
            dstObj,
            afterLoadingSrc,
            afterLoadingDst;

        afterLoadingSrc = function (err, node) {

            if (err) {
                callback(err, null, null);
                return;
            }

            // if src node is a port, then return srcObj as its parent node

            // else return node as srcObj

        };

        afterLoadingDst = function (err, node) {

            if (err) {
                callback(err, null, null);
                return;
            }

            // if dst node is a port, then return srcObj as its parent node

            // else return node as dstObj

        };

        // check if node is a connection
        // todo: find a better way to get connections...
        if (ptrArray.indexOf(SRCPTR) > -1 && ptrArray.indexOf(DSTPTR) > - 1) {
            // get source object and dst object:

            srcPath = core.getPointerPath(node, SRCPTR);
            dstPath = core.getPointerPath(node, DSTPTR);

            core.loadByPath(self.rootNode, srcPath, afterLoadingSrc);
            core.loadByPath(self.rootNode, dstPath, afterLoadingDst);

            // name, srcid, dstid, pathpoints
            // callback(null, conn, true);
        } else {

            // node is a component, get id, name, position, size if there's one
            // get ports if component has ports
            // callback(null, comp, false);
        }


    };


    return LayoutExporterPlugin;
});