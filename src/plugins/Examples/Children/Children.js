/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig',
        'plugin/PluginBase'], function (PluginConfig, PluginBase) {
    'use strict';

    var ChildrenPlugin = function () {};

    ChildrenPlugin.prototype = Object.create(PluginBase.prototype);

    ChildrenPlugin.getDefaultConfig = function () {
        return new PluginConfig();
    };

    ChildrenPlugin.prototype.main = function (config, callback) {
        var core = config.core,
            selectedNode = config.selectedNode;

        if (selectedNode) {

            core.loadChildren(selectedNode, function (err, childNodes) {
                var i;
                console.log('%j has children::', core.getAttribute(selectedNode, 'name'));

                for (i = 0; i < childNodes.length; i += 1) {
                    console.log('  - %j', core.getAttribute(childNodes[i], 'name'));
                }

                if (callback) {
                    callback(null, {'success': true});
                }
            });
        } else {
            callback('selectedNode is not defined', {'success': false});
        }
    };

    ChildrenPlugin.prototype.doGUIConfig = function (preconfig, callback) {
        callback({});
    };


    return ChildrenPlugin;
});