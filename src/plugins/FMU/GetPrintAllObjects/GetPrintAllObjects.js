/**
 * Created by jklingler on 3/28/2014.
 */

define(['plugin/PluginConfig',
    'plugin/PluginBase'], function (PluginConfig, PluginBase) {
    'use strict';

    var GetPrintAllObjectsPlugin = function () {};

    GetPrintAllObjectsPlugin.prototype = Object.create(PluginBase.prototype);

    GetPrintAllObjectsPlugin.getDefaultConfig = function () {
        return new PluginConfig();
    };

    GetPrintAllObjectsPlugin.prototype.main = function (config, callback) {
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

    return GetPrintAllObjectsPlugin;
});