/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig', 'plugin/PluginBase'], function (PluginConfig, PluginBase) {
    'use strict';

    var ChildrenConfigPlugin = function () {
        // Call base class's constructor
        PluginBase.call(this);
    };

    ChildrenConfigPlugin.prototype = Object.create(PluginBase.prototype);

    ChildrenConfigPlugin.prototype.constructor = ChildrenConfigPlugin;

    ChildrenConfigPlugin.prototype.getName = function () {
        return "Children Config";
    };

    ChildrenConfigPlugin.prototype.getConfigStructure = function () {
        return [
            {
                "name": "logChildrenNames",
                "displayName": "Log Children Names",
                "description": '',
                "value": true, // this is the 'default config'
                "valueType": "boolean",
                "readOnly": false
            },
            {
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
            },
            {
                "name": "maxChildrenToLog",
                "displayName": "Maximum children to log",
                "description": 'Set this parameter to blabla',
                "value": 4,
                "minValue": 1,
                "valueType": "number",
                "readOnly": false
            },
            {
                "name": "whatIsYourName",
                "displayName": "Plugin owner",
                "description": '',
                "readOnly": false,
                "value": 'Patrik',
                "valueType": "string"
            },
            {
                "name": "jsClassName",
                "displayName": "Plugin class name",
                "description": 'Name of the plugin\'s class',
                "readOnly": false,
                "regex": '^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[A-Z_$][0-9a-zA-Z_$]*',
                "value": 'MyNewClassName',
                "valueType": "string"
            },
            {
                "name": "itemColor",
                "displayName": "Color",
                "description": 'The color of the item on the screen',
                "readOnly": false,
                "value": '#FF0000',
                "regex": '^#([A-Fa-f0-9]{6})$',
                "valueType": "string"
            }
        ];
    };

    ChildrenConfigPlugin.prototype.main = function (callback) {
        var core = this.core,
            activeNode = this.activeNode,
            self = this;

        // Example how to use FS
        self.fs.addFile('log.txt', 'hello');


        if (!activeNode) {
            callback('activeNode is not defined', this.result);
            return;
        }

        // TODO: check model

        self.logger.info('Current configuration');

        var currentConfig = this.getCurrentConfig();
        self.logger.info(currentConfig.logChildrenNames);
        self.logger.info(currentConfig.logLevel);
        self.logger.info(currentConfig.maxChildrenToLog);
        self.logger.info(currentConfig.whatIsYourName);


        core.loadChildren(activeNode, function (err, childNodes) {
            var i;
            self.logger.info(core.getAttribute(activeNode, 'name') + ' has children');

            for (i = 0; i < childNodes.length; i += 1) {

                self.createMessage(childNodes[i], 'Message text ' + i + ' element');

                self.logger.info('  ' + core.getAttribute(childNodes[i], 'name'));
            }


            if (callback) {
                // TODO: we need a function to set/update success
                self.result.setSuccess(true);

                self.fs.addFile('pluginResult.json', JSON.stringify(self.result.serialize()));
                self.fs.saveArtifact();
                callback(null, self.result);
            }
        });
    };


    return ChildrenConfigPlugin;
});
