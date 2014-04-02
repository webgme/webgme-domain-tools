/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/Children.Dsml/DSML/CyPhyLight.Dsml',
        'plugin/PluginConfig',
        'plugin/PluginBase'], function (CyPhyLight, PluginConfig, PluginBase) {
    'use strict';

    var ChildrenPlugin = function () {
        PluginBase.call(this);
    };

    ChildrenPlugin.prototype = Object.create(PluginBase.prototype);

    ChildrenPlugin.getDefaultConfig = function () {
        return new PluginConfig();
    };

    ChildrenPlugin.prototype.getName = function () {
        return "Children.Dsml";
    };

    ChildrenPlugin.prototype.main = function (config, callback) {
        var core = this.core,
            selectedNode = this.activeNode,
            META = this.META,
            component;

        // initialize domain specific API.
        CyPhyLight.initialize(core, null, META);
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