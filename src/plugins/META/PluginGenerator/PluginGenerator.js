/**
 * Created by Zsolt on 4/3/2014.
 *
 * Regenerate templates:
 *   node src\tools\combine_templates.js -t src\plugins\META\PluginGenerator\Templates
 */


define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'ejs',
        'plugin/PluginGenerator/PluginGenerator/Templates/Templates'],
    function (PluginConfig, PluginBase, EJS, TEMPLATES) {
        'use strict';

        var ejs = EJS || window.ejs;

        var PluginGeneratorPlugin = function () {
            // Call base class's constructor
            PluginBase.call(this);
        };

        PluginGeneratorPlugin.prototype = Object.create(PluginBase.prototype);

        PluginGeneratorPlugin.prototype.constructor = PluginGeneratorPlugin;

        PluginGeneratorPlugin.prototype.getName = function () {
            return "Plugin Generator";
        };

        PluginGeneratorPlugin.prototype.getConfigStructure = function () {
            return [
                {
                    "name": "pluginID",
                    "displayName": "Unique plugin identifier",
                    "description": 'No spaces and special characters allowed. This value is used as the name of the generated plugin class.',
                    "value": 'MyNewExporterPlugin',
                    "valueType": "string",
                    "readOnly": false
                }, {
                    "name": "pluginName",
                    "displayName": "Name",
                    "description": 'Short readable plugin name; spaces are allowed',
                    "value": 'My New Exporter',
                    "valueType": "string",
                    "readOnly": false
                }, {
                    "name": "hasVersion",
                    "displayName": "Use version string",
                    "description": 'Enable to generate version method.',
                    "value": false,
                    "valueType": "boolean",
                    "readOnly": false
                }, {
                    "name": "description",
                    "displayName": "Description",
                    "description": 'Optional description of the plugin.',
                    "value": '',
                    "valueType": "string",
                    "readOnly": false
                }, {
                    "name": "templateType",
                    "displayName": "Example template",
                    "description": '',
                    "value": 'Javascript',
                    "valueType": "string",
                    "valueItems": [
                        "Javascript",
                        "Python",
                        "C#"
                    ],
                    "readOnly": false
                }, {
                    "name": "configStructure",
                    "displayName": "Include Configuration Structure.",
                    "description": 'Configuration structure will populate this GUI with controls.',
                    "value": false,
                    "valueType": "boolean",
                    "readOnly": false
                }, {
                    "name": "core",
                    "displayName": "Include core example",
                    "description": '',
                    "value": false,
                    "valueType": "boolean",
                    "readOnly": false
                }, {
                    "name": "logger",
                    "displayName": "Include logger example.",
                    "description": '',
                    "value": false,
                    "valueType": "boolean",
                    "readOnly": false
                }, {
                    "name": "fs",
                    "displayName": "Include file-system example.",
                    "description": '',
                    "value": false,
                    "valueType": "boolean",
                    "readOnly": false
                }, {
                    "name": "fs",
                    "displayName": "Include file-system example.",
                    "description": '',
                    "value": false,
                    "valueType": "boolean",
                    "readOnly": false
                }
            ];
        };

        PluginGeneratorPlugin.prototype.main = function (callback) {
            var self = this,
                currentConfig,
                pluginJS,
                fileName;

            // Assume everything is ok.

            currentConfig = this.getCurrentConfig();
            self.logger.info('Current configuration');
            self.logger.info(JSON.stringify(currentConfig, null, 4));

            if (currentConfig.templateType === 'Python' || currentConfig.templateType === 'C#') {
                self.result.setSuccess(false);
                self.logger.warning('Python and C# are currently not supported, aborting...');
                callback('Python and C# are currently not supported!', self.result);
                return;
            }

            currentConfig.date = new Date();

            pluginJS = ejs.render(TEMPLATES['plugin.js.ejs'], currentConfig);
            fileName = 'src/plugins/' + this.projectName + '/' + currentConfig.pluginID + '/' + currentConfig.pluginID + '.js';

            self.fs.addFile(fileName, pluginJS);
            self.updateSuccess(true, null);
            self.fs.saveArtifact();

            self.save('added obj', function (err) {
                callback(null, self.result);
            });

        };


        return PluginGeneratorPlugin;
    });