/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig', 'plugin/PluginBase', 'xmljsonconverter'], function (PluginConfig, PluginBase, Converter) {
    'use strict';

    var Logger = function () {
        // Call base class's constructor
        PluginBase.call(this);
    };

    Logger.prototype = Object.create(PluginBase.prototype);

    Logger.prototype.constructor = Logger;

    Logger.prototype.getName = function () {
        return "Active Node";
    };

    Logger.prototype.main = function (callback) {
        var self = this,
            xml2json = new Converter.XmlStr2json(null, {skipWSText: true}),
            obj = xml2json.convert('<xml>Hello, <who name="world">world<ttt attr="4"> \n\r  </ttt></who>!</xml>');
        self.logger.info(JSON.stringify(obj, null, 4));

        if (!self.activeNode) {
            self.result.setSuccess(false);
            callback('no activeNode given', self.result);
            return;
        }

        self.logger.info('name : ' + self.core.getAttribute(self.activeNode, 'name'));
        self.logger.info('path : ' + self.core.getPath(self.activeNode));
        self.logger.info('GUID : ' + self.core.getGuid(self.activeNode));
        self.createMessage(self.activeNode, JSON.stringify(obj, null, 0));
        self.result.setSuccess(true);
        callback(null, self.result);
    };

    return Logger;
});