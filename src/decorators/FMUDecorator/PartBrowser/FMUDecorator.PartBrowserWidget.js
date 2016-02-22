/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 *
 * Authors:
 */

"use strict";

define(['js/Constants',
    'js/NodePropertyNames',
    'js/Widgets/PartBrowser/PartBrowserWidget.DecoratorBase',
    '../Core/FMUDecorator.Core.js',
    '../Core/FMUDecorator.Constants',
    'css!./FMUDecorator.PartBrowserWidget'], function (CONSTANTS,
                                                       nodePropertyNames,
                                                       PartBrowserWidgetDecoratorBase,
                                                       FMUDecoratorCore,
                                                       FMUDecoratorConstants) {

    /**
     * A module representing PartBrowserWidget specific functionality for the FMUModelingLanguage.
     * @exports FMUDecoratorPartBrowserWidget
     * @version 1.0
     */
    var FMUDecoratorPartBrowserWidget,
        DECORATOR_ID = "FMUDecoratorPartBrowserWidget";

    /**
     * Initializes a new instance of FMUDecoratorPartBrowserWidget
     * @param options {object} options for initialization
     * @constructor
     */
    FMUDecoratorPartBrowserWidget = function (options) {
        var opts = _.extend( {}, options);

        PartBrowserWidgetDecoratorBase.apply(this, [opts]);

        // Part browser widget does not support creating connections therefore do not render connectors
        this._initializeDecorator({"connectors": false});

        this.logger.debug("FMUDecoratorPartBrowserWidget ctor");
    };


    /************************ INHERITANCE *********************/
    _.extend(FMUDecoratorPartBrowserWidget.prototype, PartBrowserWidgetDecoratorBase.prototype);
    _.extend(FMUDecoratorPartBrowserWidget.prototype, FMUDecoratorCore.prototype);


    /**************** OVERRIDE INHERITED / EXTEND ****************/

    /**** Override from PartBrowserWidgetDecoratorBase ****/
    FMUDecoratorPartBrowserWidget.prototype.DECORATORID = DECORATOR_ID;

    /**
     * Called before appending the element to the part browser. Renders content for the part browser.
     */
    FMUDecoratorPartBrowserWidget.prototype.beforeAppend = function () {
        this.$el = this.$DOMBase.clone();

        this._hideName = true;

        this._renderContent();
    };


    /**
     * Called after element is appended to the part browser. Currently this method does nothing.
     */
    FMUDecoratorPartBrowserWidget.prototype.afterAppend = function () {

    };


    /**** Override from ModelDecoratorCore ****/
    FMUDecoratorPartBrowserWidget.prototype._registerForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    FMUDecoratorPartBrowserWidget.prototype._unregisterForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    return FMUDecoratorPartBrowserWidget;
});