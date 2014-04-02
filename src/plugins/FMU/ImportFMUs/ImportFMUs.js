/**
 * Created by jklingler on 4/1/2014.
 */

define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'plugin/ImportFMUs/ImportFMUs/FMU'],
    function (PluginConfig, PluginBase, FMU) {
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
            rootNode = this.rootNode;

        // FIXME: this is a hack to get intellisense
//        var name;
//        for (name in config.META) {
//            if (config.META.hasOwnProperty(name)) {
//                FMU[name] = config.META[name];
//            }
//        }

        this.updateMETA(FMU);

        var newFmuLib = core.createNode({parent: rootNode, base: FMU.FMU_Library});
        core.setAttribute(newFmuLib, 'name', 'NewImportedFMUs');

        // Commit changes.
        this.save('Committing changes to database for ImportFMUs plugin', function (err) {
            // FIXME: on error?

            if (callback) {
                // TODO: we need a function to set/update success
                self.result.success = true;
                callback(null, self.result);
            }
        });
        // End Commit

//        if (selectedNode && typeof selectedNode == FMU.FMU_Library) {

        // NOTE: You should not have any code here!!! Your last executed branch is in the save. Must do everything before the save.

//        if (rootNode) {
//
//            core.loadChildren(rootNode, function (err, childNodes) {
//                var i;
//                console.log('%j has children::', core.getAttribute(rootNode, 'name'));
//
//                for (i = 0; i < childNodes.length; i += 1) {
//                    console.log('  - %j', core.getAttribute(childNodes[i], 'name'));
//                }
//
//                if (callback) {
//                    self.result.success = true;
//                    callback(null, self.result);
//                }
//            });
//        } else {
//            callback('rootNode is not defined', this.result);
//        }
    };

    return ImportFMUsPlugin;
});