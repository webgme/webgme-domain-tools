/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig',
        'plugin/PluginBase'],
    function (PluginConfig, PluginBase) {
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
        var self = this,
            core = this.core,
            activeNode = this.activeNode;

        if (!activeNode) {
            callback('activeNode is not defined', this.result);
            return;
        }

        core.loadChildren(activeNode, function (err, childNodes) {
            var i;
            self.logger.info(core.getAttribute(activeNode, 'name') + ' has children');

            for (i = 0; i < childNodes.length; i += 1) {
                self.logger.info('  - ' + core.getAttribute(childNodes[i], 'name'));
            }

            if (callback) {
                // TODO: we need a function to set/update success
                self.result.success = true;
                callback(null, self.result);
            }
        });
    };

    return ChildrenPlugin;
});