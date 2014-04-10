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
                activeNode = this.activeNode,
                activeNodeName,
                newNode;

            if (!activeNode) {
                callback('activeNode is not defined', this.result);
                return;
            }

            activeNodeName = self.core.getAttribute(activeNode, 'name');
            self.logger.info('Copying node: ' + activeNodeName);
            newNode = self.core.copyNode(activeNode, self.core.getParent(activeNode));

            self.core.setAttribute(newNode, 'name', activeNodeName + ' Copy');
            self.logger.info('Copied node: ' + self.core.getAttribute(newNode, 'name'));

            self.save('Copy ' + activeNodeName, function (err) {
                if (err) {
                    self.result.setSuccess(false);
                    callback(err, self.result);
                } else {
                    self.result.setSuccess(true);
                    callback(null, self.result);
                }
            });

        };

        return DuplicateActiveNodePlugin;
    });