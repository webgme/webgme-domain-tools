/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig', 'plugin/PluginBase'], function (PluginConfig, PluginBase) {
    'use strict';

    /**
     * Initializes a new instance of ActiveNode.
     * @class
     * @augments {PluginBase}
     * @classdesc This class represents the plugin ActiveNode.
     * @constructor
     */
    var ActiveNode = function () {
        // Call base class's constructor
        PluginBase.call(this);
    };

    // Prototypal inheritance from PluginBase.
    ActiveNode.prototype = Object.create(PluginBase.prototype);
    ActiveNode.prototype.constructor = ActiveNode;

    /**
     * Gets the name of the ActiveNode.
     * @returns {string} The name of the plugin.
     * @public
     */
    ActiveNode.prototype.getName = function () {
        return "Active Node";
    };

    /**
     * Main function for the plugin to execute. This will perform the execution.
     * Notes:
     * - Always log with the provided logger.[error,warning,info,debug].
     * - Do NOT put any user interaction logic UI, etc. inside this method.
     * - callback always has to be called even if error happened.
     *
     * @param {function(string, plugin.PluginResult)} callback - the result callback
     */
    ActiveNode.prototype.main = function (callback) {
        var self = this,
            activeNodeName;

        self.logger.debug('Plugin started.');
        self.logger.info('Project is: ' + self.projectName);
        if (!self.activeNode) {
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