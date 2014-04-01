/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig',
        'plugin/PluginBase',
        'plugin/PluginResult',
        'plugin/PluginMessage',
        'plugin/PluginNodeDescription'], function (PluginConfig, PluginBase, PluginResult, PluginMessage, PluginNodeDescription) {
    'use strict';

    var ChildrenSaveArtifacts = function () {};

    ChildrenSaveArtifacts.prototype = Object.create(PluginBase.prototype);

    ChildrenSaveArtifacts.prototype.main = function (config, callback) {
        var self = this,
            core = config.core,
            selectedNode = config.selectedNode;

        var pluginResult = new PluginResult();

        if (!config.FS) {
            callback('FileSystem object is undefined or null.', pluginResult);
            return;
        }

        if (!selectedNode) {
            callback('selectedNode is not defined', pluginResult);
            return;
        }

        this.generateNodeInfo(config.FS, selectedNode, core);

        core.loadChildren(selectedNode, function (err, childNodes) {
            var i;
            console.log('%j has children::', core.getAttribute(selectedNode, 'name'));

            for (i = 0; i < childNodes.length; i += 1) {
                console.log('  - %j', core.getAttribute(childNodes[i], 'name'));

                self.generateNodeInfo(config.FS, childNodes[i], core);
            }

            config.FS.addFile('debug.txt', 'Here it comes some text');

            config.FS.saveArtifact();

            if (callback) {
                // TODO: we need a function to set/update success
                pluginResult.success = true;
                callback(null, pluginResult);
            }
        });
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

        // FIXME: check if name is safe as a directory name
        fs.addFile(core.getAttribute(node, 'name') + '/' + core.getGuid(node) + '.txt', info);
    };

    return ChildrenSaveArtifacts;
});