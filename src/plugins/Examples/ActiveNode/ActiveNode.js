/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig', 'plugin/PluginBase'], function (PluginConfig, PluginBase) {
    'use strict';

    var Logger = function () {
        // Call base class's constructor
        PluginBase.call(this);
    };

    Logger.prototype = Object.create(PluginBase.prototype);

    Logger.prototype.constructor = Logger;

    Logger.prototype.getName = function () {
        return "Children";
    };

    Logger.prototype.main = function (callback) {
        var self = this;
        if (!self.activeNode) {
            self.setSuccess(false);
            callback('no activeNode given', self.result);
            return;
        }

        self.logger.info('name : ' + self.core.getAttribute(self.activeNode, 'name'));
        self.logger.info('path : ' + self.core.getPath(self.activeNode));
        self.logger.info('GUID : ' + self.core.getGuid(self.activeNode));
        self.createMessage(self.activeNode, 'This will be in result.');
        self.setSuccess(true);
        callback(null, self.result);
    };

    return Logger;
});