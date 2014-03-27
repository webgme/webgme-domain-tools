/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/Children.Dsml/DSML/CyPhyLight.Dsml',
        'plugin/PluginConfig',
        'plugin/PluginBase'], function (CyPhyLight, PluginConfig, PluginBase) {
    'use strict';

    var ChildrenPlugin = function () {};

    ChildrenPlugin.prototype = Object.create(PluginBase.prototype);

    ChildrenPlugin.getDefaultConfig = function () {
        return new PluginConfig();
    };

    ChildrenPlugin.prototype.main = function (config, callback) {
        var core = config.core,
            selectedNode = config.selectedNode,
            component;

        // initialize domain specific API.
        CyPhyLight.initialize(core, null, config.META);
        component = new CyPhyLight.Component(selectedNode);

        component.childrenOfType.Property(function (properties) {
            var i,
                property;

            for (i = 0; i < properties.length; i += 1) {
                property = properties[i];
                console.log('Property Name :: ' + property.attributes.getname());
            }

            if (callback) {
                callback({'success': true});
            }
        });
    };

    ChildrenPlugin.prototype.doGUIConfig = function (preconfig, callback) {
        callback({});
    };


    return ChildrenPlugin;
});