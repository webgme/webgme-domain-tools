/**
 * Created by zsolt on 3/20/14.
 */

'use strict';
define([], function () {

    var PluginManagerBase = function (core, storage) {

        this._core = core;
        this._storage = storage;
    };

    PluginManagerBase.prototype.getPluginByName = function (name) {

    };

    PluginManagerBase.prototype.loadMetaTypes = function () {

    };

    PluginManagerBase.prototype.getPluginConfiguration = function (managerConfiguration) {

    };

    PluginManagerBase.prototype.executePlugin = function (name, managerConfiguration, progress, done) {
        var plugin = this.getPluginByName(name);

        this.loadMetaTypes();

        var pluginConfiguration = this.getPluginConfiguration(managerConfiguration);

        // TODO: if automation - get last config


        // TODO: plugin.doInteractiveConfig

        plugin.main(pluginConfiguration, function () {

        });
    };


    return PluginManagerBase;
});