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
        return "ImportFMUs";
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

        this.updateMETA(FMU)

        var newFmuLib = core.createNode({parent: rootNode, base: FMU.FMU_Library});
        core.setAttribute(newFmuLib, 'name', 'NewImportedFMUs');

        // Commit changes.
        core.persist(rootNode, function (err) {
        });

        var newRootHash = core.getHash(rootNode);
        console.info(config.project.makeCommit);

        var result = {'commitHash': config.commitHash};
        result.commitHash = config.project.makeCommit([result.commitHash], newRootHash, 'Plugin updated the model.', function (err) {});

        // End Commit

//        if (selectedNode && typeof selectedNode == FMU.FMU_Library) {
        if (selectedNode) {

            core.loadChildren(selectedNode, function (err, childNodes) {
                var i;
                console.log('%j has children::', core.getAttribute(selectedNode, 'name'));

                for (i = 0; i < childNodes.length; i += 1) {
                    console.log('  - %j', core.getAttribute(childNodes[i], 'name'));
                }

                if (callback) {
                    callback(null, {'success': true});
                }
            });
        } else {
            callback('selectedNode is not defined', {'success': false});
        }
    };

    return ImportFMUsPlugin;
});