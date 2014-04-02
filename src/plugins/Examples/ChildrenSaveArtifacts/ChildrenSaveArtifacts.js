/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig',
        'plugin/PluginBase'],
    function (PluginConfig, PluginBase) {
    'use strict';

    var ChildrenSaveArtifacts = function () {
        // Call base class's constructor
        PluginBase.call(this);
    };

    ChildrenSaveArtifacts.prototype = Object.create(PluginBase.prototype);

    ChildrenSaveArtifacts.prototype.constructor = ChildrenSaveArtifacts;

    ChildrenSaveArtifacts.prototype.getName = function () {
        return "Children Save Artifacts";
    };

    ChildrenSaveArtifacts.prototype.main = function (callback) {
        var self = this,
            core = this.core,
            activeNode = this.activeNode;

        if (!this.fs) {
            callback('FileSystem object is undefined or null.', this.result);
            return;
        }

        if (!activeNode) {
            callback('activeNode is not defined', this.result);
            return;
        }

        this.generateNodeInfo(self.fs, activeNode, core);

        core.loadChildren(activeNode, function (err, childNodes) {
            var i;
            console.log('%j has children::', core.getAttribute(activeNode, 'name'));

            for (i = 0; i < childNodes.length; i += 1) {
                console.log('  - %j', core.getAttribute(childNodes[i], 'name'));

                self.generateNodeInfo(self.fs, childNodes[i], core);
            }

            self.fs.addFile('debug.txt', 'Here it comes some text');

            self.fs.saveArtifact();

            if (callback) {
                // TODO: we need a function to set/update success
                self.result.success = true;
                callback(null, self.result);
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