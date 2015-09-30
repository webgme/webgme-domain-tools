/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * Authors:
 * Zsolt Lattmann
 * Robert Kereskenyi
 */

"use strict";

define(['js/Constants',
    'js/NodePropertyNames',
    'js/Widgets/PartBrowser/PartBrowserWidget.DecoratorBase',
    '../Core/LogicGatesDecorator.Core.js',
    '../Core/LogicGatesDecorator.Constants',
    'css!./LogicGatesDecorator.PartBrowserWidget'], function (CONSTANTS,
                                                              nodePropertyNames,
                                                              PartBrowserWidgetDecoratorBase,
                                                              LogicGatesDecoratorCore,
                                                              LogicGatesDecoratorConstants) {

    /**
     * A module representing PartBrowserWidget specific functionality for the LogicGatesModelingLanguage.
     * @exports LogicGatesDecoratorPartBrowserWidget
     * @version 1.0
     */
    var LogicGatesDecoratorPartBrowserWidget,
        DECORATOR_ID = "LogicGatesDecoratorPartBrowserWidget";

    /**
     * Initializes a new instance of LogicGatesDecoratorPartBrowserWidget
     * @param options {object} options for initialization
     * @constructor
     */
    LogicGatesDecoratorPartBrowserWidget = function (options) {
        var opts = _.extend({}, options);

        PartBrowserWidgetDecoratorBase.apply(this, [opts]);

        // Part browser widget does not support creating connections therefore do not render connectors
        this._initializeDecorator({"connectors": false});

        this.logger.debug("LogicGatesDecoratorPartBrowserWidget ctor");
    };


    /************************ INHERITANCE *********************/
    _.extend(LogicGatesDecoratorPartBrowserWidget.prototype, PartBrowserWidgetDecoratorBase.prototype);
    _.extend(LogicGatesDecoratorPartBrowserWidget.prototype, LogicGatesDecoratorCore.prototype);


    /**************** OVERRIDE INHERITED / EXTEND ****************/

    /**** Override from PartBrowserWidgetDecoratorBase ****/
    LogicGatesDecoratorPartBrowserWidget.prototype.DECORATORID = DECORATOR_ID;

    /**
     * Called before appending the element to the part browser. Renders content for the part browser.
     */
    LogicGatesDecoratorPartBrowserWidget.prototype.beforeAppend = function () {
        this.$el = this.$DOMBase.clone();

        this._renderContent();
    };


    /**
     * Called after element is appended to the part browser. Currently this method does nothing.
     */
    LogicGatesDecoratorPartBrowserWidget.prototype.afterAppend = function () {

    };


    /**** Override from ModelDecoratorCore ****/
    LogicGatesDecoratorPartBrowserWidget.prototype._registerForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    LogicGatesDecoratorPartBrowserWidget.prototype._unregisterForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    return LogicGatesDecoratorPartBrowserWidget;
});