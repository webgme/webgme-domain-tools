/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig',
        'plugin/PluginBase'], function (PluginConfig, PluginBase) {
    'use strict';

    var ChildrenSaveArtifacts = function () {};

    ChildrenSaveArtifacts.prototype = Object.create(PluginBase.prototype);

    ChildrenSaveArtifacts.getConfigStructure = function () {
        var configStructure = [
        ];

        return configStructure;
    };

    ChildrenSaveArtifacts.getDefaultConfig = function () {
        // TODO: infer default config from config structure.
        // TODO: put this into the base class
        var config = {};
        return config;
    };

    ChildrenSaveArtifacts.getCurrentConfig = function () {
        return ChildrenSaveArtifacts._currentConfig;
    };

    ChildrenSaveArtifacts.setCurrentConfig = function (newConfig) {
        ChildrenSaveArtifacts._currentConfig = newConfig;
    };

    ChildrenSaveArtifacts.setCurrentConfig(ChildrenSaveArtifacts.getDefaultConfig());

    ChildrenSaveArtifacts.prototype.main = function (config, callback) {
        var self = this,
            core = config.core,
            selectedNode = config.selectedNode;


        if (!config.fs) {
            callback('FileSystem object is undefined or null.', {'success': false});
        }

        if (selectedNode) {

            this.generateNodeInfo(config.fs, selectedNode, core);

            core.loadChildren(selectedNode, function (err, childNodes) {
                var i;
                console.log('%j has children::', core.getAttribute(selectedNode, 'name'));

                for (i = 0; i < childNodes.length; i += 1) {
                    console.log('  - %j', core.getAttribute(childNodes[i], 'name'));

                    self.generateNodeInfo(config.fs, childNodes[i], core);
                }

                config.fs.addFile('debug.txt', 'Here it comes some text');

                if (callback) {
                    callback(null, {'success': true});
                }
            });
        } else {
            callback('selectedNode is not defined', {'success': false});
        }
    };

    ChildrenSaveArtifacts.prototype.generateNodeInfo = function (fs, node, core) {
        var info = '';

        info += 'Name: ';
        info += core.getAttribute(node, 'name');
        info += '\r\n';


        info += 'Path: ';
        info += core.getPath(node);
        info += '\r\n';


        info += 'Guid: ';
        info += core.getGuid(node);
        info += '\r\n';

        fs.addFile(core.getGuid(node) + '.txt', info);
    };

    return ChildrenSaveArtifacts;
});