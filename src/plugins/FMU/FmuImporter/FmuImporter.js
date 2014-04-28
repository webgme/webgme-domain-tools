/**
* Generated by PluginGenerator from webgme on Mon Apr 28 2014 13:58:17 GMT-0500 (Central Daylight Time).
*/

define(['plugin/PluginConfig',
    'plugin/PluginBase',
    'jszip',
    'xmljsonconverter'], function (PluginConfig, PluginBase, JSZip, Converter) {
    'use strict';

    /**
    * Initializes a new instance of FmuImporter.
    * @class
    * @augments {PluginBase}
    * @classdesc This class represents the plugin FmuImporter.
    * @constructor
    */
    var FmuImporter = function () {
        // Call base class' constructor.
        PluginBase.call(this);
    };

    // Prototypal inheritance from PluginBase.
    FmuImporter.prototype = Object.create(PluginBase.prototype);
    FmuImporter.prototype.constructor = FmuImporter;

    /**
    * Gets the name of the FmuImporter.
    * @returns {string} The name of the plugin.
    * @public
    */
    FmuImporter.prototype.getName = function () {
        return "FMU Model Importer";
    };

    /**
    * Gets the semantic version (semver.org) of the FmuImporter.
    * @returns {string} The version of the plugin.
    * @public
    */
    FmuImporter.prototype.getVersion = function () {
        return "0.1.0";
    };

    /**
    * Gets the description of the FmuImporter.
    * @returns {string} The description of the plugin.
    * @public
    */
    FmuImporter.prototype.getDescription = function () {
        return "Creates WebGME models for one or more uploaded FMUs";
    };

    /**
    * Gets the configuration structure for the FmuImporter.
    * The ConfigurationStructure defines the configuration for the plugin
    * and will be used to populate the GUI when invoking the plugin from webGME.
    * @returns {object} The version of the plugin.
    * @public
    */
    FmuImporter.prototype.getConfigStructure = function () {
        return [
            {
                "name": "FMU",
                "displayName": "FmuPackage",
                "description": 'Click and drag an existing compiled FMU',
                "value": "", // this is the 'default config'
                "valueType": "asset",
                "readOnly": false
            }
        ];
    };


    /**
    * Main function for the plugin to execute. This will perform the execution.
    * Notes:
    * - Always log with the provided logger.[error,warning,info,debug].
    * - Do NOT put any user interaction logic UI, etc. inside this method.
    * - callback always has to be called even if error happened.
    *
    * @param {function(string, plugin.PluginResult)} mainCallback - the result callback
    */
    FmuImporter.prototype.main = function (mainCallback) {
        // Use self to access core, project, result, logger etc from PluginBase.
        // These are all instantiated at this point.
        var self = this,
            selectedNode = self.activeNode,
            currentConfig = self.getCurrentConfig(),
            currentConfigString = JSON.stringify(currentConfig, null, 4),
            fmuHash = "46f9efe35185b3f19cfeeefbf98d22107bbd1b8f",
            numFmus,
            i;

        self.logger.debug('Entering FmuImporter main');

        self.logger.debug('CurrentConfig:');
        self.logger.debug(currentConfigString);

//        var newFmuObject = core.createNode({parent: rootNode, base: '/1822302751/902541625'});  //FMU base object
//        core.newFmuObject(newFmuObject, 'resource', fmuHash);
//        core.newFmuObject(newFmuObject, 'name', 'Here_is_a_brand_new_FMU');

        self.getFmuModelDescriptions(fmuHash, function (err, fmuModelDescriptions) {
            if (err) {
                self.logger.error(err);
                return;
            }

            numFmus = fmuModelDescriptions.length;

            for (i = 0; i < numFmus; i += 1) {
                self.createNewFmu(fmuModelDescriptions[i]);
            }

            // This will save the changes. If you don't want to save;
            // exclude self.save and call callback directly from this scope.
            self.result.setSuccess(true);
            self.save('Saving FmuImporter results to database...', function (err) {
                mainCallback(null, self.result);
            });
        });

    };

    FmuImporter.prototype.getFmuModelDescriptions = function (uploadedFileHash, getFmuModelDescriptionsCallback) {
        var self = this,
            zip,
            fmuZip,
            fmuFileHash = 32,
            modelDescriptionXml,
            modelDescriptionJson,
            modelDescriptionMap = {},
            fmusWithinZip,
            numFmus,
            i;

        var blobGetObjectCallback = function (err, content) {
            if (err) {
                getFmuModelDescriptionsCallback(err);
                return;
            }

            // TODO: what if the content is not a ZIP? TODO: check metadata
            zip = new JSZip(content);

            modelDescriptionXml = zip.file("modelDescription.xml");

            if (modelDescriptionXml === null) {
                // we might have a zip with multiple fmus within
                fmusWithinZip = zip.file(/\.fmu/);
                numFmus = fmusWithinZip.length;

                for (i = 0; i < numFmus; i += 1) {
                    fmuZip = fmusWithinZip[i];
                    fmuFileHash += 1;
                    modelDescriptionXml = fmuZip.file("modelDescription.xml");
                    if (modelDescriptionXml != null) {
                        modelDescriptionJson = self.convertXml2Json(modelDescriptionXml.asText());
                        modelDescriptionMap[fmuFileHash] = modelDescriptionJson;
                    } else {
                        self.logger.error('Could not extract fmu modelDescription');
                        continue;
                    }
                }
            } else {
                modelDescriptionJson = self.convertXml2Json(modelDescriptionXml.asText());
                modelDescriptionMap[uploadedFileHash] = modelDescriptionJson;
            }

            // return .\modelDescription.xml
            getFmuModelDescriptionsCallback(null, modelDescriptionMap);
        };

        self.blobClient.getObject(uploadedFileHash, blobGetObjectCallback);
    };

    FmuImporter.prototype.convertXml2Json = function (modelDescriptionXml) {
        // TODO: what if modelDescriptionXml is NOT an xml?

        var self = this,
            converter = new Converter.Xml2json(null, {skipWSText: true}),
            obj = converter.xmlStr2json(modelDescriptionXml);

        return obj;
    };

    /**
     * Finds and returns the node object defining the meta type for the given node.
     * @param node - Node to be check for type.
     * @returns {Object} - Node object defining the meta type of node.
     */
    FmuImporter.prototype.getMetaType = function (node) {
        var self = this,
            name;
        while (node) {
            name = self.core.getAttribute(node, 'name');
            if (self.META.hasOwnProperty(name) && self.core.getPath(self.META[name]) === self.core.getPath(node)) {
                break;
            }
            node = self.core.getBase(node);
        }
        return node;
    };

    return FmuImporter;
});