/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig', 'plugin/PluginBase'], function (PluginConfig, PluginBase) {
    'use strict';

    var ActiveNode = function () {
        // Call base class's constructor
        PluginBase.call(this);
    };

    ActiveNode.prototype = Object.create(PluginBase.prototype);
    ActiveNode.prototype.constructor = ActiveNode;

    ActiveNode.prototype.getName = function () {
        return "Active Node";
    };

    ActiveNode.prototype.main = function (callback) {
        var self = this,
            activeNodeName;

        self.logger.debug('Plugin started.');
        self.logger.info('Project is: ' + self.projectName);
        if (!self.activeNode) {
            self.result.setSuccess(false);
            self.logger.error('No activeNode given');
            self.createMessage(self.rootNode, 'No activeNode given.');
            callback('No activeNode given', self.result);
            return;
        }
        activeNodeName = self.core.getAttribute(self.activeNode, 'name');
        self.logger.info('name: ' + activeNodeName);
        self.logger.warning('path: ' + self.core.getPath(self.activeNode));
        self.logger.warn('GUID: ' + self.core.getGuid(self.activeNode));

        self.createMessage(self.activeNode, 'Active node had name ' + activeNodeName + '.');
        self.result.setSuccess(true);
        callback(null, self.result);
    };

    return ActiveNode;
});