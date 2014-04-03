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

    ImportFMUsPlugin.prototype.main = function (callback) {
        var self = this,
            core = this.core,
            rootNode = this.rootNode,
            fmuList = FmuImportList;

        // get all 'possible' object types from the MetaModel
        this.updateMETA(FMU);

        var flatFolderMap = {};

        // create an FCO within the rootNode, which is an instance of FMU.FMU_Library
        var newFmuLib = core.createNode({parent: rootNode, base: FMU.FMU_Library});
        // set the name attribute of the new FCO to 'NewImportedFMUs'
        core.setAttribute(newFmuLib, 'name', 'NewImportedFMUs');

        flatFolderMap['NewImportedFMUs'] = '/' + newFmuLib.relid;

        var index;
        var numberOfFmusToImport = fmuList.length;

        for (index = 0; index < numberOfFmusToImport; index += 1){
            var fmuData = fmuList[index],
                modelicaClass = fmuData.ModelicaClass,
                fmuPathWithinProject = modelicaClass.split('.'),
                folders = fmuPathWithinProject.slice(0, -1).join('.'),      // get the folder structure
                fmuName = fmuPathWithinProject.slice(-1)[0];                // get the new FMU name


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

    // This should check if a folder (fco?) exists and create it (recursively) if necessary
    ImportFMUsPlugin.makeFolders = function (modelicaPackagePath, existingFolderMap, core, FMU) {

        var existingFolderId = existingFolderMap[modelicaPackagePath];

        if (existingFolder) {return;};

    };

    return ImportFMUsPlugin;
});