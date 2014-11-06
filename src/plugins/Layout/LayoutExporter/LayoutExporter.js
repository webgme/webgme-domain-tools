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
//        console.info(self.project.makeCommit);
//        result = {'commitHash': self.commitHash};
//        result.commitHash = self.project.makeCommit([result.commitHash], newRootHash, 'Plugin updated the model.', function (err) {
//        });

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

    LayoutExporterPlugin.prototype.visitFromNode = function (node, callback) {

    };

    return LayoutExporterPlugin;
});