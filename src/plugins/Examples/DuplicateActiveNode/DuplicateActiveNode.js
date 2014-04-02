/**
 * Created by zsolt on 4/1/14.
 */
define(['plugin/PluginConfig',
        'plugin/PluginBase'],
    function (PluginConfig, PluginBase) {
        'use strict';

        var DuplicateActiveNodePlugin = function () {
            // Call base class's constructor
            PluginBase.call(this);
        };

        DuplicateActiveNodePlugin.prototype = Object.create(PluginBase.prototype);

        DuplicateActiveNodePlugin.prototype.constructor = DuplicateActiveNodePlugin;

        DuplicateActiveNodePlugin.prototype.getName = function () {
            return "Duplicate Active Node";
        };

        DuplicateActiveNodePlugin.prototype.main = function (callback) {
            var self = this,
                activeNode = this.activeNode;

            if (!activeNode) {
                callback('activeNode is not defined', this.result);
                return;
            }

            var activeNodeName = this.core.getAttribute(activeNode, 'name');
            this.logger.info('Copying node: ' + activeNodeName);
            var newNode = this.core.copyNode(activeNode, this.core.getParent(activeNode));

            this.core.setAttribute(newNode, 'name', activeNodeName + ' Copy');
            this.logger.info('Copied node: ' + this.core.getAttribute(newNode, 'name'));


            this.save('Copy ' + activeNodeName, function (err) {
                // FIXME: on error?

                if (callback) {
                    // TODO: we need a function to set/update success
                    self.result.success = true;
                    callback(null, self.result);
                }
            });

        };

        return DuplicateActiveNodePlugin;
    });