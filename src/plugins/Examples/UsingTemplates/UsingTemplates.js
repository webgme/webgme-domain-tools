/**
 * Created by Zsolt on 4/2/14.
 */
define(['plugin/PluginConfig',
    'plugin/PluginBase',
    'plugin/UsingTemplates/UsingTemplates/Templates/Templates',
    'ejs'],
    function (PluginConfig, PluginBase, TEMPLATES, EJS) {
        'use strict';

        // FIXME: workaround
        // ejs is defined in tests
        // EJS is defined when plugin runs server side
        // window.ejs is deinfed when plugin runs in client
        if (!ejs) {
            ejs = EJS || window.ejs;
        }

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

            self.logger.debug('Generating files...');

            var data = {'name': core.getAttribute(activeNode, 'name')};
            var ret = ejs.render(TEMPLATES['sample.html.ejs'], data);

            self.fs.addFile('output.html', ret);
            self.fs.saveArtifact();

            self.logger.info('Files were generated...');

            if (callback) {
                // TODO: we need a function to set/update success
                self.result.success = true;
                callback(null, self.result);
            }
        };

        return UsingTemplatesPlugin;
    });