/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'plugin/PluginResult',
        'plugin/PluginMessage',
        'plugin/PluginNodeDescription'], function (PluginConfig, PluginBase, PluginResult, PluginMessage, PluginNodeDescription) {
    'use strict';

    var ChildrenConfigPlugin = function (LogManager) {
        if (LogManager) {
            this.logger = LogManager.create('Plugin.ChildrenConfigPlugin');
        } else {
            this.logger = console;
        }

        this._currentConfig = ChildrenConfigPlugin.getDefaultConfig();
    };

    ChildrenConfigPlugin.prototype = Object.create(PluginBase.prototype);

    ChildrenConfigPlugin.getConfigStructure = function () {
        var configStructure = [
            {
                "name": "logChildrenNames",
                "value": true, // this is the 'default config'
                "valueType": "boolean"
            },{
                "name": "logLevel",
                "value": "info",
                "valueType": "string",
                "valueItems": [
                    "debug",
                    "info",
                    "warn",
                    "error"
                ]
            },{
                "name": "maxChildrenToLog",
                "value": 4,
                "min": 1,
                "valueType": "number"
            },{
                "name": "whatIsYourName",
                "value": 'Patrik',
                "valueType": "string"
            }
        ];

        return configStructure;
    };

    ChildrenConfigPlugin.getDefaultConfig = function () {
        // TODO: infer default config from config structure.
        // TODO: put this into the base class
        var config = {};
        config.logChildrenNames = true;
        config.logLevel = 3;
//        {
//            debug: 1,
//            info: 2,
//            warn: 3,
//            error: 4
//        };

        config.maxChildrenToLog = 4; // Should be greater than 0.
        config.whatIsYourName = 'Patrik';
        //config.additionalMessages = ['Hello', 'World'];

        return config;
    };

    ChildrenConfigPlugin.prototype.getCurrentConfig = function () {
        return this._currentConfig;
    };

    ChildrenConfigPlugin.prototype.setCurrentConfig = function (newConfig) {
        this._currentConfig = newConfig;
    };

    ChildrenConfigPlugin.prototype.main = function (config, callback) {
        var core = config.core,
            selectedNode = config.selectedNode,
            self = this;

        var pluginResult = new PluginResult();

        if (selectedNode) {

            self.logger.info('Current configuration');

            var currentConfig = this.getCurrentConfig();
            self.logger.info(currentConfig.logChildrenNames);
            self.logger.info(currentConfig.logLevel);
            self.logger.info(currentConfig.maxChildrenToLog);
            self.logger.info(currentConfig.whatIsYourName);


            core.loadChildren(selectedNode, function (err, childNodes) {
                var i;
                self.logger.info(core.getAttribute(selectedNode, 'name') + ' has children');

                var parentDescriptor = new PluginNodeDescription(core.getAttribute(selectedNode, 'name'), core.getPath(selectedNode));

                for (i = 0; i < childNodes.length; i += 1) {

                    var activeDescriptor = [new PluginNodeDescription(core.getAttribute(childNodes[i], 'name'), core.getPath(childNodes[i]))];
                    var message = new PluginMessage(config.commitHash, parentDescriptor, activeDescriptor, 'Message text ' + i + ' element');

                    pluginResult.addMessage(message);

                    self.logger.info('  ' + core.getAttribute(childNodes[i], 'name'));
                }


                if (callback) {
                    // TODO: create a setter and update function
                    pluginResult.success = true;
                    callback(null, pluginResult);
                }
            });
        } else {
            callback('selectedNode is not defined', pluginResult);
        }
    };


    return ChildrenConfigPlugin;
});
