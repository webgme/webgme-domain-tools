/**
* Generated by PluginGenerator from webgme on Mon Apr 28 2014 13:58:17 GMT-0500 (Central Daylight Time).
*/

define(['plugin/PluginConfig', 'plugin/PluginBase'], function (PluginConfig, PluginBase) {
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
            fmuHash = currentConfig.FMU,
            fmuModelDescriptionXml,
            fmuJsonDict;

        self.logger.debug('Entering FmuImporter main');

        self.logger.debug('CurrentConfig:');
        self.logger.debug(currentConfigString);

//        var newFmuObject = core.createNode({parent: rootNode, base: '/1822302751/902541625'});  //FMU base object
//        core.newFmuObject(newFmuObject, 'resource', fmuHash);
//        core.newFmuObject(newFmuObject, 'name', 'Here_is_a_brand_new_FMU');

        // TODO: Zsolt please upzip the FMU associated with 'fmuHash' and get the XML only
        fmuModelDescriptionXml = self.getFmuModelDescriptionXml(fmuHash);

        // TODO: Patrik please convert the XML to JSON
        fmuJsonDict = self.convertXml2Json(fmuModelDescriptionXml);

        var testDownloadArtifact = self.blobClient.createArtifact('testArtifact');

        var addHashCallback = function (err, fileHash) {
            if (err) {
                self.result.setSuccess(false);
                mainCallback(err, self.result);
                return;
            }

            self.logger.debug('Added hash ' + fileHash + 'to testArtifact.');

            var artifactSaveCallback = function (err, artifactHash) {
                if (err) {
                    self.result.setSuccess(false);
                    mainCallback(err, self.result);
                    return;
                }

                self.result.addArtifact(artifactHash);

                // This will save the changes. If you don't want to save;
                // exclude self.save and call callback directly from this scope.
                self.result.setSuccess(true);
                self.save('Saving FmuImporter results to database...', function (err) {
                    mainCallback(null, self.result);
                });
            };

            testDownloadArtifact.save(artifactSaveCallback);
        };

        testDownloadArtifact.addHash('aNewFmu.fmu', fmuHash, addHashCallback);
    };

    FmuImporter.prototype.getFmuModelDescriptionXml = function (fmuHash) {
        return false;
        // extract fmu zip
        // return .\modelDescription.xml
    };

    FmuImporter.prototype.convertXml2Json = function (modelDescriptionXml) {
        return false;
        // extract fmu zip
        // return .\modelDescription.xml
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