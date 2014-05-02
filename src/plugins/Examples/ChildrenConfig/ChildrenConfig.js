/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig',
    'plugin/PluginBase',
    'xmljsonconverter',
    'json2xml'], function (PluginConfig, PluginBase, Converter, JSON2XML) {
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
                "name": "myAsset",
                "displayName": "Asset Example",
                "description": '',
                "value": "785ff33577152925fd6b70c92c5ee3400cdbf58b", // this is the 'default config'
                "valueType": "asset",
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
        var self = this,
            currentConfig = this.getCurrentConfig(),
            xml2json = new Converter.Xml2json({
                attrTag: '@',
                textTag: '#text',
                skipWSText: true,
                arrayElements: {}
            }),
            json2xmlOld = new JSON2XML(),
            json2xml = new Converter.Json2xml();

        self.logger.info('Current configuration');
        self.logger.info(currentConfig.logLevel);
        self.logger.info(currentConfig.maxChildrenToLog);
        self.logger.info(currentConfig.whatIsYourName);

        if (currentConfig.myAsset) {
            self.blobClient.getObject(currentConfig.myAsset, function (err, content) {
                var xmlAsJson = xml2json.convertFromBuffer(content),
                    xmlStrOld,
                    xmlStr;
                self.logger.info(content);
                if (xmlAsJson instanceof Error) {
                    self.createMessage(null, 'Parsing provided xml returned with error :' + xmlAsJson.message);
                    return callback(xmlAsJson.message, self.result);
                }
                xmlStr = json2xml.convertToString(xmlAsJson);
                xmlStrOld = json2xmlOld.convert(xmlAsJson);

                self.logger.info(xmlStrOld);
                self.logger.info(xmlStr);
                self.result.setSuccess(true);
                callback(null, self.result);
            });
        } else {
            callback('No asset was specified in configuration.', self.result);
        }
    };

    return ChildrenConfigPlugin;
});
