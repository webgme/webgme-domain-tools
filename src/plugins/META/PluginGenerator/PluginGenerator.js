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

        var PluginGeneratorPlugin = function () {
            // Call base class's constructor
            PluginBase.call(this);
        };

        PluginGeneratorPlugin.prototype = Object.create(PluginBase.prototype);

        PluginGeneratorPlugin.prototype.constructor = PluginGeneratorPlugin;

        // FIXME: workaround
        // ejs is defined in tests
        // EJS is defined when plugin runs server side
        // window.ejs is defined when plugin runs in client
        if (!ejs) {
            ejs = EJS || window.ejs;
        }

        PluginGeneratorPlugin.prototype.getName = function () {
            return "Plugin Generator";
        };

        PluginGeneratorPlugin.prototype.getVersion = function () {
            return "0.1.1";
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
                },
                {
                    "name": "pluginName",
                    "displayName": "Name",
                    "description": 'Short readable plugin name; spaces are allowed',
                    "value": 'My New Exporter',
                    "valueType": "string",
                    "readOnly": false
                },
                {
                    "name": "hasVersion",
                    "displayName": "Use version string",
                    "description": 'Enable to generate version method.',
                    "value": false,
                    "valueType": "boolean",
                    "readOnly": false
                },
                {
                    "name": "description",
                    "displayName": "Description",
                    "description": 'Optional description of the plugin.',
                    "value": '',
                    "valueType": "string",
                    "readOnly": false
                },
                {
                    "name": "test",
                    "displayName": "Include testing script",
                    "description": 'Generate template for unit-tests.',
                    "value": true,
                    "valueType": "boolean",
                    "readOnly": false
                },
                {
                    "name": "templateType",
                    "displayName": "Example template",
                    "description": 'Ejs template for code generation.',
                    "value": 'None',
                    "valueType": "string",
                    "valueItems": [
                        "None",
                        "JavaScript",
                        "Python",
                        "CSharp"
                    ],
                    "readOnly": false
                },
                {
                    "name": "configStructure",
                    "displayName": "Include Configuration Structure.",
                    "description": 'Configuration structure will populate this GUI with controls.',
                    "value": false,
                    "valueType": "boolean",
                    "readOnly": false
                },
                {
                    "name": "core",
                    "displayName": "Include core example",
                    "description": '',
                    "value": false,
                    "valueType": "boolean",
                    "readOnly": false
                },
                {
                    "name": "logger",
                    "displayName": "Include logger example.",
                    "description": '',
                    "value": false,
                    "valueType": "boolean",
                    "readOnly": false
                },
                {
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
                pluginFileName,
                templateFileName,
                dirCommon,
                outputDir,
                testDir;

            // Assume everything is ok.
            self.result.setSuccess(true);
            currentConfig = self.getCurrentConfig();
            self.logger.info('Current configuration');
            self.logger.info(JSON.stringify(currentConfig, null, 4));

            currentConfig.date = new Date();
            currentConfig.projectName = self.projectName;
            dirCommon = '/plugins/' + self.projectName + '/' + currentConfig.pluginID + '/';
            outputDir = 'src' + dirCommon;
            testDir = 'test/unit' + dirCommon;
            if (currentConfig.templateType === 'Python') {
                currentConfig.templateExt = 'py';
                templateFileName = outputDir + 'Templates/Python.py.ejs';
                self.fs.addFile(templateFileName, 'print "<%=a%> and <%=b%> provided."');
            } else if (currentConfig.templateType === 'CSharp') {
                currentConfig.templateExt = 'cs';
                templateFileName = outputDir + 'Templates/CSharp.cs.ejs';
                self.fs.addFile(templateFileName, 'using System;\nnamespace Hey {\n\tclass Hi {\n\t\tstatic void Main()' +
                    ' {\n\t\t\tConsole.WriteLine("<%=a%> and <%=b%> provided.");\n\t\t}\n\t}\n}');
            } else if (currentConfig.templateType === 'JavaScript') {
                currentConfig.templateExt = 'js';
                templateFileName = outputDir + 'Templates/JavaScript.js.ejs';
                self.fs.addFile(templateFileName, 'console.info("<%=a%> and <%=b%> provided.);"');
            } else {
                currentConfig.templateType = null;
            }

            pluginJS = ejs.render(TEMPLATES['plugin.js.ejs'], currentConfig);
            pluginFileName = outputDir + currentConfig.pluginID + '.js';
            self.fs.addFile(pluginFileName, pluginJS);

            if (currentConfig.templateType) {
                self.fs.addFile(outputDir + 'Templates/combine_templates.js',
                    ejs.render(TEMPLATES['combine_templates.js.ejs']));
            }

            if (currentConfig.test) {
                self.fs.addFile(testDir + currentConfig.pluginID + 'Spec.js',
                    ejs.render(TEMPLATES['unit_test.js.ejs'], currentConfig));
            }

            self.fs.saveArtifact();
            self.updateSuccess(true, null);

            callback(null, self.result);

        };


        return PluginGeneratorPlugin;
    });