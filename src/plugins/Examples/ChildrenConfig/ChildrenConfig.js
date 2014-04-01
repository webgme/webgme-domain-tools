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

        this._currentConfig = null;
        // initialize default configuration
        this.setCurrentConfig(this.getDefaultConfig());
    };

    ChildrenConfigPlugin.prototype = Object.create(PluginBase.prototype);

    ChildrenConfigPlugin.prototype.getConfigStructure = function () {
        var configStructure = [
            {
                "name": "logChildrenNames",
                "displayName": "Log Children Names",
                "description": '',
                "value": true, // this is the 'default config'
                "valueType": "boolean",
                "readOnly": true
            },{
                "name": "logLevel",
                "displayName": "Logger level",
                "description": '',
                "value": "info",
                "valueType": "string",
                "valueItems": [
                    "debug",
                    "info",
                    "warn",
                    "error"
                ],
                "readOnly": false
            },{
                "name": "maxChildrenToLog",
                "displayName": "Maximum children to log",
                "description": 'Set this parameter to blabla',
                "value": 4,
                "min": 1,
                "valueType": "number",
                "readOnly": false
            },{
                "name": "whatIsYourName",
                "displayName": "Plugin owner",
                "description": '',
                "readOnly": true,
                "value": 'Patrik',
                "valueType": "string"
            }
        ];

        return configStructure;
    };

    ChildrenConfigPlugin.prototype.main = function (config, callback) {
        var core = config.core,
            selectedNode = config.selectedNode,
            self = this;

        var pluginResult = new PluginResult();

        console.log(config.FS);

        config.FS.addFile('log.txt', 'hello');
        config.FS.saveArtifact();

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
