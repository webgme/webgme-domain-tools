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
        self.logger.debug('Interpreter started');
        //self.logger.log('Interpreter started'); N.B. log is not allowed
        self.logger.info('Interpreter started');
        self.logger.warning('Interpreter started');
        self.logger.error('Interpreter started');

        self.result.setSuccess(true);
        if (self.activeNode) {
            self.createMessage(self.activeNode, 'This will be in result.');
        }
        callback(null, self.result);
    };

    return Logger;
});