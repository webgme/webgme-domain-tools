/**
 * Created by Zsolt on 4/2/14.
 */
define(['plugin/PluginConfig',
    'plugin/PluginBase',
    'ejs',
    'plugin/UsingTemplates/UsingTemplates/pythonTemplate.py'],
    function (PluginConfig, PluginBase, ejs, PYTHONTEMPLATE) {
        'use strict';

        var UsingTemplatesPlugin = function () {
            // Call base class's constructor
            PluginBase.call(this);
        };

        UsingTemplatesPlugin.prototype = Object.create(PluginBase.prototype);

        UsingTemplatesPlugin.prototype.constructor = UsingTemplatesPlugin;

        UsingTemplatesPlugin.prototype.getName = function () {
            return "Using Templates";
        };

        UsingTemplatesPlugin.prototype.main = function (callback) {
            var self = this,
                core = this.core,
                activeNode = this.activeNode;

            if (!activeNode) {
                callback('activeNode is not defined', this.result);
                return;
            }

            var data = {'name': core.getAttribute(activeNode, 'name')};
            var ret = ejs.render(PYTHONTEMPLATE, data);

            self.fs.addFile('output.py', ret);
            self.fs.saveArtifact();

            if (callback) {
                // TODO: we need a function to set/update success
                self.result.success = true;
                callback(null, self.result);
            }

//            core.loadChildren(activeNode, function (err, childNodes) {
//                var i;
//                self.logger.info(core.getAttribute(activeNode, 'name') + ' has children');
//
//                for (i = 0; i < childNodes.length; i += 1) {
//                    self.logger.info('  - ' + core.getAttribute(childNodes[i], 'name'));
//                }
//
//                if (callback) {
//                    // TODO: we need a function to set/update success
//                    self.result.success = true;
//                    callback(null, self.result);
//                }
//            });
        };

        return UsingTemplatesPlugin;
    });