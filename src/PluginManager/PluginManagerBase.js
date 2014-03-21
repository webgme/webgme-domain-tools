/**
 * Created by zsolt on 3/20/14.
 */

'use strict';
define(['./PluginBase', './PluginContext'], function (PluginBase, PluginContext) {

    var PluginManagerBase = function (core, storage, plugins) {

        this._core = core;       // webgme core is used to operate on objects
        this._storage = storage; // webgme storage
        this._plugins = plugins; // key value pair of pluginName: pluginType - plugins are already loaded/downloaded
    };

    /**
     * Gets a new instance of a plugin by name.
     * @param {string} name
     * @returns {PluginBase}
     */
    PluginManagerBase.prototype.getPluginByName = function (name) {
        return new this._plugins[name]();
    };

    PluginManagerBase.prototype.loadMetaTypes = function () {

    };

    /**
     *
     * @param {PluginManagerConfiguration} managerConfiguration
     * @param {function} callback
     */
    PluginManagerBase.prototype.getPluginContext = function (managerConfiguration, callback) {
        var pluginContext =  new PluginContext();

        // TODO: initialize context

        // TODO: based on the string values get the node objects
        // 1) Open project
        // 2) Load commit hash
        // 3) Load rootNode
        // 4) Load selected object
        // 5) Load selected objects
        // 6) Update context
        // 7) return

        callback(null, pluginContext);
    };

    PluginManagerBase.prototype.executePlugin = function (name, managerConfiguration, progress, done) {
        var plugin = this.getPluginByName(name);

        this.loadMetaTypes();

        // TODO: if automation - get last config
        var pluginConfig = plugin.getDefaultConfig();

        // TODO: plugin.doInteractiveConfig

        this.getPluginContext(managerConfiguration, function (err, pluginContext) {
            pluginContext.setConfig(pluginConfig);

            // TODO: provide implementation here
            plugin.main(pluginContext, function () {

            });
        });
    };


    return PluginManagerBase;
});