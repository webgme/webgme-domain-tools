/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig', 'plugin/PluginBase'], function (PluginConfig, PluginBase) {
    'use strict';

    var ChildrenPlugin = function () {
        // Call base class's constructor
        PluginBase.call(this);
    };

    ChildrenPlugin.prototype = Object.create(PluginBase.prototype);

    ChildrenPlugin.prototype.constructor = ChildrenPlugin;

    ChildrenPlugin.prototype.getName = function () {
        return "Children";
    };

    ChildrenPlugin.prototype.main = function (callback) {
        var self = this;

        if (!self.activeNode) {
            self.result.setSuccess(false);
            callback('activeNode is not defined', self.result);
            return;
        }

        self.core.loadChildren(self.activeNode, function (err, childNodes) {
            var i;
            self.logger.info(self.core.getAttribute(self.activeNode, 'name') + ' has children');

            for (i = 0; i < childNodes.length; i += 1) {
                self.logger.info('  - ' + self.core.getAttribute(childNodes[i], 'name'));
            }

            if (callback) {
                self.result.setSuccess(true);
                callback(null, self.result);
            }
        });
    };

    return ChildrenPlugin;
});