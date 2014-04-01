/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'plugin/PluginResult',
        'plugin/PluginMessage',
        'plugin/PluginNodeDescription'], function (PluginConfig, PluginBase, PluginResult, PluginMessage, PluginNodeDescription) {
    'use strict';

    var ChildrenPlugin = function () {};

    ChildrenPlugin.prototype = Object.create(PluginBase.prototype);

    ChildrenPlugin.prototype.main = function (config, callback) {
        var core = config.core,
            selectedNode = config.selectedNode;

        // clear valid plugins
//        core.setRegistry(config.rootNode, 'validPlugins', '');
//        // Commit changes.
//        core.persist(config.rootNode, function (err) {
//        });
//
//        var newRootHash = core.getHash(config.rootNode);
//        console.info(config.project.makeCommit);
//        var result = {'commitHash': config.commitHash};
//        result.commitHash = config.project.makeCommit([result.commitHash], newRootHash, 'Plugin updated the model.', function (err) {
//
        //});

        var pluginResult = new PluginResult();

        if (!selectedNode) {
            callback('selectedNode is not defined', pluginResult);
            return;
        }

        core.loadChildren(selectedNode, function (err, childNodes) {
            var i;
            console.log('%j has children::', core.getAttribute(selectedNode, 'name'));

            for (i = 0; i < childNodes.length; i += 1) {
                console.log('  - %j', core.getAttribute(childNodes[i], 'name'));
            }

            if (callback) {
                // TODO: we need a function to set/update success
                pluginResult.success = true;
                callback(null, pluginResult);
            }
        });
    };

    return ChildrenPlugin;
});