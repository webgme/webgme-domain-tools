/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'plugin/PluginResult',
        'plugin/PluginMessage',
        'plugin/PluginNodeDescription'], function (PluginConfig, PluginBase, PluginResult, PluginMessage, PluginNodeDescription) {
    'use strict';

    var ChildrenConfigPlugin = function () {
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

        // Example how to use FS
        //console.log(config.FS);

        self.fs.addFile('log.txt', 'hello');


        if (!selectedNode) {
            callback('selectedNode is not defined', pluginResult);
            return;
        }

        // TODO: check model

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
                // TODO: we need a function to set/update success
                pluginResult.success = true;

                self.fs.addFile('pluginResult.json', JSON.stringify(pluginResult.serialize()));
                self.fs.saveArtifact();
                callback(null, pluginResult);
            }
        });
    };


    return ChildrenConfigPlugin;
});
