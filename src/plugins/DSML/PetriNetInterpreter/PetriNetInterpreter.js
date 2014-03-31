/**
 * Created by Dana Zhang on 3/31/2014.
 */
define(['plugin/PluginConfig',
    'plugin/PluginBase'], function (PluginConfig, PluginBase) {
    'use strict';

    var PNInterpreterPlugin = function () {};

    PNInterpreterPlugin.prototype = Object.create(PluginBase.prototype);

    PNInterpreterPlugin.getDefaultConfig = function () {
        return new PluginConfig();
    };

    PNInterpreterPlugin.prototype.main = function (config, callback) {
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
//        });

        if (selectedNode) {

            core.loadChildren(selectedNode, function (err, childNodes) {
                var i;
                console.log('%j has children::', core.getAttribute(selectedNode, 'name'));
                for (i = 0; i < childNodes.length; ++i) {
                    var isExampleFolder = core.getAttribute(childNodes[i], 'name').toString().toLowerCase() === "examples";
                    if (isExampleFolder) {
                        /* TODO: get all children examples
                                 foreach child example, recursively DFS through all the elements and get their properties including name/token properties, etc
                                 output text in console for now, to xml file later on when FS is ready to use
                        */
                        var examples = childNodes[i].children;

                        console.log(examples.length);

                        for (var j = 0; j < examples.length; ++j) {

                            console.log("getting each instance model");

                            var example = examples[j];

                        }
                    }
                }

                if (callback) {
                    callback(null, {'success': true});
                }
            });
        } else {
            callback('selectedNode is not defined', {'success': false});
        }
    };

    PNInterpreterPlugin.prototype.doGUIConfig = function (preconfig, callback) {
        callback({});
    };


    return PNInterpreterPlugin;
});