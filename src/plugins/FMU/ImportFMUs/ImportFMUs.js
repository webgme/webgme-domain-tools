/**
 * Created by jklingler on 4/1/2014.
 */

define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'plugin/ImportFMUs/ImportFMUs/FMU',
        'plugin/ImportFMUs/ImportFMUs/resources/ModelicaBlocks'],
    function (PluginConfig, PluginBase, FmuMetaTypes, FmuImportList) {
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
        this.updateMETA(FmuMetaTypes);

        var flatFolderMap = {}; // key is dot-seperated path in project, value is the corresponding node

        // create an FCO within the rootNode, which is an instance of FMU.FMU_Library
        var newFmuLib = core.createNode({parent: rootNode, base: FmuMetaTypes.FMU_Library});
        // set the name attribute of the new FCO to 'NewImportedFMUs'
        var newImportsFolderName = 'NewImportedFMUs';
        core.setAttribute(newFmuLib, 'name', newImportsFolderName);

        flatFolderMap[newImportsFolderName] = newFmuLib;

        var index;
        var numberOfFmusToImport = fmuList.length;

        for (index = 0; index < numberOfFmusToImport; index += 1){
            var fmuData = fmuList[index],
                newFMU,
                modelicaClass = fmuData.ModelicaClass,
                fmuFilePath = fmuData.FMU_package,
                splitModelicaClass = modelicaClass.split('.'),
                parentPackagePath = splitModelicaClass.slice(0, -1).join('.'),  // get the parent folder path
                fmuName = splitModelicaClass.slice(-1)[0];                      // get the new FMU name


            if (splitModelicaClass.length == 0) {
                fmuName = fmuFilePath.split('\\').slice(-1)[0].split('.')[0];

                // create an FCO within the the newFmuLib, which is an instance of FMU.FMU
                newFMU = core.createNode({parent: newFmuLib, base: FmuMetaTypes.FMU});
                // set the name attribute of the new FCO to 'fmuName'
                core.setAttribute(newFMU, 'name', fmuName);

                ImportFMUsPlugin.buildFmuFromJson(core, newFMU, fmuData, FmuMetaTypes)

            } else {
                var fullPackagePathWithinProject = newImportsFolderName + '.' + parentPackagePath;
                var parentFolder = ImportFMUsPlugin.makeFolders(core, fullPackagePathWithinProject, flatFolderMap, FmuMetaTypes);

                // create an FCO within the the newFmuLib, which is an instance of FMU.FMU
                newFMU = core.createNode({parent: parentFolder, base: FmuMetaTypes.FMU});
                // set the name attribute of the new FCO to 'fmuName'
                core.setAttribute(newFMU, 'name', fmuName);

                ImportFMUsPlugin.buildFmuFromJson(core, newFMU, fmuData, FmuMetaTypes)
            }
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

    // Recursively create FmuLibrary objects
    ImportFMUsPlugin.makeFolders = function (core, modelicaPackagePath, existingFolderMap, FmuTypes) {
        var desiredFolderNode;

        if (modelicaPackagePath in existingFolderMap) {
            // the desired folder already exists; return it
            desiredFolderNode = existingFolderMap[modelicaPackagePath];
            return desiredFolderNode;

        } else {
            // the desired folder does not exist; create and return it

            // get the parent package and see if it exists (recursion)

            var parentPackagePath = modelicaPackagePath.split('.').slice(0, -1).join('.');
            var thisPackageName = modelicaPackagePath.split('.').slice(-1)[0];

            var parentFolder = ImportFMUsPlugin.makeFolders(core, parentPackagePath, existingFolderMap, FmuTypes);

            var newFmuLibNode = core.createNode({parent: parentFolder, base: FmuMetaTypes.FMU_Library});
            core.setAttribute(newFmuLibNode, 'name', thisPackageName);

            existingFolderMap[modelicaPackagePath] = newFmuLibNode;

            return newFmuLibNode;
        }
    };

    ImportFMUsPlugin.buildFmuFromJson = function (core, newFmuObject, fmuData, FmuTypes) {
        var parameters = fmuData.Parameters,
            inputs = fmuData.Inputs,
            outputs = fmuData.Outputs,
            index;

        core.setAttribute(newFmuObject, 'fmu_path', fmuData.FMU_package);

        for (index = 0; index < parameters.length; index += 1){
            var paramData = parameters[index];

            var newParamObject = core.createNode({parent: newFmuObject, base: FmuTypes.Parameter});
            core.setAttribute(newParamObject, 'name', paramData.name);

            if (paramData.description) {
                core.setAttribute(newParamObject, 'description', paramData.description);
            }

            if (paramData.startValue) {
                core.setAttribute(newParamObject, 'value', paramData.startValue);
                core.setAttribute(newParamObject, 'default_value', paramData.startValue);
            }
            // TODO: put the parameters in the middle of the canvas
        }

        for (index = 0; index < inputs.length; index += 1){
            var inputData = inputs[index];

            var newInputPortObject = core.createNode({parent: newFmuObject, base: FmuTypes.Input});
            core.setAttribute(newInputPortObject, 'name', inputData.name);

            if (inputData.description) {
                core.setAttribute(newInputPortObject, 'description', inputData.description);
            }

            // TODO: put the inputs on the left-hand side of the canvas
        }

        for (index = 0; index < outputs.length; index += 1){
            var outputData = outputs[index];

            var newInputPortObject = core.createNode({parent: newFmuObject, base: FmuTypes.Input});
            core.setAttribute(newInputPortObject, 'name', outputData.name);

            if (outputData.description) {
                core.setAttribute(newInputPortObject, 'description', outputData.description);
            }
            // TODO: put the outputs on the righthand side of the canvas
        }
    };

    return ImportFMUsPlugin;
});