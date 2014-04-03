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
            var configStructure = [
                {
                    "name": "pluginID",
                    "displayName": "Unique plugin identifier",
                    "description": 'No spaces and special characters allowed. This value is used as the name of the generated plugin class.',
                    "value": 'MyNewExporterPlugin',
                    "valueType": "string",
                    "readOnly": false
                },{
                    "name": "pluginName",
                    "displayName": "Name",
                    "description": 'Short readable plugin name; spaces are allowed',
                    "value": 'My New Exporter',
                    "valueType": "string",
                    "readOnly": false
                },{
                    "name": "hasVersion",
                    "displayName": "Use version string",
                    "description": '',
                    "value": false,
                    "valueType": "boolean",
                    "readOnly": false
                },{
                    "name": "description",
                    "displayName": "Description",
                    "description": '',
                    "value": '',
                    "valueType": "string",
                    "readOnly": false
                },{
                    "name": "templateType",
                    "displayName": "Example template",
                    "description": '',
                    "value": 'None',
                    "valueType": "string",
                    "valueItems": [
                        "None",
                        "Python",
                        "Javascript",
                        "C#"
                    ],
                    "readOnly": false
                }
            ];

            return configStructure;
        };

        PluginGeneratorPlugin.prototype.main = function (callback) {
            var core = this.core,
                self = this;

            // Assume everything is ok.
            self.result.setSuccess(true);

            var currentConfig = this.getCurrentConfig();
            self.logger.info('Current configuration');
            self.logger.info(JSON.stringify(currentConfig, null, 4));

            currentConfig.date = new Date();

            var pluginJS = ejs.render(TEMPLATES['plugin.js.ejs'], currentConfig);
            var filename = 'src/plugins/' + this.projectName + '/' + currentConfig.pluginID + '/' + currentConfig.pluginID + '.js';

            self.fs.addFile(filename, pluginJS);


            if (callback) {
                self.updateSuccess(true, null);

                self.fs.saveArtifact();

                callback(null, self.result);
            }
        };


        return PluginGeneratorPlugin;
    });