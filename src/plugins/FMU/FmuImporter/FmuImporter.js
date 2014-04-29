/**
* Generated by PluginGenerator from webgme on Mon Apr 28 2014 13:58:17 GMT-0500 (Central Daylight Time).
*/

define(['plugin/PluginConfig',
    'plugin/PluginBase',
    'plugin/FmuImporter/FmuImporter/FMU',
    'jszip',
    'xmljsonconverter'], function (PluginConfig, PluginBase, FmuMetaTypes, JSZip, Converter) {
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
                "name": "UploadedArtifact",
                "displayName": "FMUs",
                "description": "Click and drag existing compiled FMU(s)",
                //"value": "46f9efe35185b3f19cfeeefbf98d22107bbd1b8f", // this is the 'default config'
                "value": "0101da04257bf60436b20beb44433b6a45b84e77", // this is the 'default config'
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
            artifactHash = currentConfig.UploadedArtifact,
            fmuHashes,
            fmuHash,
            numFmus,
            i;

        self.logger.debug('Entering FmuImporter main');

        // get all 'possible' object types from the MetaModel
        this.updateMETA(FmuMetaTypes);

        self.logger.debug('CurrentConfig:');
        self.logger.debug(currentConfigString);

        var getFmuModelDescriptionsCallback = function (err, hashFmuDescriptionMap) {
            if (err) {
                self.logger.error(err);
                return;
            }

            fmuHashes = Object.keys(hashFmuDescriptionMap);
            numFmus = fmuHashes.length;

            for (i = 0; i < numFmus; i += 1) {
                fmuHash = fmuHashes[i];
                self.createNewFmu(hashFmuDescriptionMap[fmuHash]);
            }

            // This will save the changes. If you don't want to save;
            // exclude self.save and call callback directly from this scope.
            self.result.setSuccess(true);
            self.save('Saving FmuImporter results to database...', function (err) {
                mainCallback(null, self.result);
            });
        };

        self.getFmuModelDescriptions(artifactHash, getFmuModelDescriptionsCallback);
    };

    FmuImporter.prototype.createNewFmu = function (fmuModelDescription) {
        var self = this,
            newFmuNode,
            newFmuChildNode,
            fmuInfo = fmuModelDescription["fmiModelDescription"],
            modelName = fmuInfo["_modelName"],
            splitNames = modelName.split('.'),
            modelVariables = fmuInfo["ModelVariables"],
            scalarVariables = modelVariables["ScalarVariable"],
            numVariables = scalarVariables.length,
            variable,
            varName,
            variability,
            causality,
            valueRef,
            varTypeInfo,
            value,
            i,
            paramX = 400,
            paramY = 100,
            inputX = 100,
            inputY = 100,
            outputX = 700,
            outputY = 100,
            offsetY = 60;

        // Create the new FMU in current context
        newFmuNode = self.core.createNode({parent: self.rootNode, base: FmuMetaTypes.FMU});
        self.core.setAttribute(newFmuNode, 'name', modelName);

        // Create the Inputs, Outputs, Parameters
        for (i = 0; i < numVariables; i += 1) {
            variable = scalarVariables[i];
            varName = variable["_name"];
            variability = variable["_variability"];
            causality = variable["_causality"];
            valueRef = variable["_valueReference"];
            varTypeInfo = self.getVariableTypeInfo(variable);

            if (varName.split()[0] === '_') {
                continue;
            }

            if (causality === "input") {
                // Create Input
            } else if (causality === "output") {
                // Create Output
            } else if (causality === "internal") {
                if (variability === "parameter") {
                    if (varTypeInfo.hasOwnProperty("_start")) {
                        value = varTypeInfo["_start"]
                    }
                }
            }
        }
    };

    FmuImporter.prototype.getVariableTypeInfo = function (variableDict) {
        var typeInfo = {};

        if (variableDict.hasOwnProperty("Real")) {
            typeInfo = variableDict["Real"];
            typeInfo["_type"] = "Real";
        } else if (variableDict.hasOwnProperty("Boolean")) {
            typeInfo = variableDict["Boolean"];
            typeInfo["_type"] = "Boolean";
        } else if (variableDict.hasOwnProperty("Integer")) {
            typeInfo = variableDict["Integer"];
            typeInfo["_type"] = "Integer";
        } else if (variableDict.hasOwnProperty("Enumeration")) {
            typeInfo = variableDict["Enumeration"];
            typeInfo["_type"] = "Enumeration";
        }

        return typeInfo;
    };

    FmuImporter.prototype.getFmuModelDescriptions = function (uploadedFileHash, callback) {
        var self = this;

        var blobGetObjectCallback = function (err, content) {
            if (err) {
                callback(err);
                return;
            }

            var zip,
                fmuZip,
                fmuFileHash = 32,
                modelDescriptionXml,
                modelDescriptionJson,
                modelDescriptionMap = {},
                fmusWithinZip,
                numFmus,
                i;

            // TODO: what if the content is not a ZIP? TODO: check metadata
            zip = new JSZip(content);

            modelDescriptionXml = zip.file("modelDescription.xml");

            if (modelDescriptionXml === null) {
                // we might have a zip with multiple fmus within
                fmusWithinZip = zip.file(/\.fmu/);
                numFmus = fmusWithinZip.length;

                for (i = 0; i < numFmus; i += 1) {
                    fmuZip = new JSZip(fmusWithinZip[i].asArrayBuffer());
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
            callback(null, modelDescriptionMap);
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