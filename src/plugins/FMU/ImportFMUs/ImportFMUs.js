/**
 * Created by jklingler on 4/1/2014.
 */

define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'plugin/ImportFMUs/ImportFMUs/FMU',
        'plugin/ImportFMUs/ImportFMUs/resources/ModelicaBlocks'],
    function (PluginConfig, PluginBase, FMU, FmuImportList) {
    'use strict';

    var ImportFMUsPlugin = function () {
        // Call base class's constructor
        PluginBase.call(this);
    };

    ImportFMUsPlugin.prototype = Object.create(PluginBase.prototype);

    ImportFMUsPlugin.prototype.constructor = ImportFMUsPlugin;

    ImportFMUsPlugin.prototype.getName = function () {
        return "Import FMUs";
    };

    ImportFMUsPlugin.getDefaultConfig = function () {
        return new PluginConfig();
    };

    ImportFMUsPlugin.prototype.main = function (callback) {
        var self = this,
            core = this.core,
            rootNode = this.rootNode,
            fmuList = FmuImportList;

        // get all 'possible' object types from the MetaModel
        this.updateMETA(FMU);

        // create an FCO within the rootNode, which is an instance of FMU.FMU_Library
        var newFmuLib = core.createNode({parent: rootNode, base: FMU.FMU_Library});
        // set the name attribute of the new FCO to 'NewImportedFMUs'
        core.setAttribute(newFmuLib, 'name', 'NewImportedFMUs');

        var index;
        var numberOfFmusToImport = fmuList.length;

        for (index = 0; index < numberOfFmusToImport; index += 1){
            var fmuData = fmuList[index],
                modelicaClass = fmuData.ModelicaClass,
                fmuName = modelicaClass.split('.').join('_');

            // create an FCO within the the newFmuLib, which is an instance of FMU.FMU
            var newFMU = core.createNode({parent: newFmuLib, base: FMU.FMU});
            // set the name attribute of the new FCO to 'fmuName'
            core.setAttribute(newFMU, 'name', fmuName);
        }


        // Commit changes to the database.
        this.save('Committing changes to database for ImportFMUs plugin', function (err) {
            // FIXME: on error?

            if (callback) {
                // TODO: we need a function to set/update success
                self.result.success = true;
                callback(null, self.result);
            }
        });
        // End Commit NOTE: You should not have any code here!!!
        // this.save(commit_msg, ______) should be the last statement
    };

    return ImportFMUsPlugin;
});