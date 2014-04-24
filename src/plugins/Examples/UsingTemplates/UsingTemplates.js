/**
 * Created by Zsolt on 4/2/14.
 */
define(['plugin/PluginConfig',
    'plugin/PluginBase',
    'plugin/UsingTemplates/UsingTemplates/Templates/Templates',
    'ejs'],
    function (PluginConfig, PluginBase, TEMPLATES, ejs) {
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
                activeNode = this.activeNode,
                data,
                ret;

            if (!activeNode) {
                callback('activeNode is not defined', this.result);
                return;
            }

            self.logger.debug('Generating files...');

            data = {'name': self.core.getAttribute(activeNode, 'name')};
            ret = ejs.render(TEMPLATES['sample.html.ejs'], data);

            self.fs.addFile('output.html', ret);
            self.fs.saveArtifact();

            self.logger.info('Files were generated...');

            if (callback) {
                self.result.setSuccess(true);
                callback(null, self.result);
            }
        };

        return UsingTemplatesPlugin;
    });