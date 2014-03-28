/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig',
        'plugin/PluginBase'], function (PluginConfig, PluginBase) {
    'use strict';

    var ChildrenConfigPlugin = function (LogManager) {
        if (LogManager) {
            this.logger = LogManager.create('Plugin.ChildrenConfigPlugin');
        } else {
            this.logger = console;
        }
    };

    ChildrenConfigPlugin.prototype = Object.create(PluginBase.prototype);

    ChildrenConfigPlugin.getDefaultConfig = function () {
        var config = new PluginConfig();
        config.logChildrenNames = true;
        config.logLevel = {
            debug: 1,
            info: 2,
            warn: 3,
            error: 4
        };

        config.maxChildrenToLog = 4; // Should be greater than 0.
        config.whatIsYourName = 'Patrik';
        config.additionalMessages = ['Hello', 'World'];
    };

    ChildrenConfigPlugin.prototype.main = function (config, callback) {
        var core = config.core,
            selectedNode = config.selectedNode,
            self = this;

        if (selectedNode) {

            core.loadChildren(selectedNode, function (err, childNodes) {
                var i;
                self.logger.info(core.getAttribute(selectedNode, 'name') + ' has children');

                for (i = 0; i < childNodes.length; i += 1) {
                    self.logger.info('  ' + core.getAttribute(childNodes[i], 'name'));
                }

                if (callback) {
                    callback(null, {'success': true});
                }
            });
        } else {
            callback('selectedNode is not defined', {'success': false});
        }
    };

    ChildrenConfigPlugin.prototype.doGUIConfig = function (preconfig, callback) {
        callback({});
    };


    return ChildrenConfigPlugin;
});