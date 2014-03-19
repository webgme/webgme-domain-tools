/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 *
 * Authors:
 */

"use strict";

define(['js/Constants',
    'js/Utils/METAAspectHelper',
    'js/NodePropertyNames',
    'js/Widgets/PartBrowser/PartBrowserWidget.DecoratorBase',
    '../Core/CyPhyLightDecorator.Core.js',
    '../Core/CyPhyLightDecorator.Constants',
    'css!./CyPhyLightDecorator.PartBrowserWidget'], function (CONSTANTS,
                                                       METATypesHelper,
                                                       nodePropertyNames,
                                                       PartBrowserWidgetDecoratorBase,
                                                       CyPhyLightDecoratorCore,
                                                       CyPhyLightDecoratorConstants) {

    /**
     * A module representing PartBrowserWidget specific functionality for the CyPhyLightModelingLanguage.
     * @exports CyPhyLightDecoratorPartBrowserWidget
     * @version 1.0
     */
    var CyPhyLightDecoratorPartBrowserWidget,
        DECORATOR_ID = "CyPhyLightDecoratorPartBrowserWidget";

    /**
     * Initializes a new instance of CyPhyLightDecoratorPartBrowserWidget
     * @param options {object} options for initialization
     * @constructor
     */
    CyPhyLightDecoratorPartBrowserWidget = function (options) {
        var opts = _.extend( {}, options);

        PartBrowserWidgetDecoratorBase.apply(this, [opts]);

        // Part browser widget does not support creating connections therefore do not render connectors
        this._initializeDecorator({"connectors": false});

        this.logger.debug("CyPhyLightDecoratorPartBrowserWidget ctor");
    };


    /************************ INHERITANCE *********************/
    _.extend(CyPhyLightDecoratorPartBrowserWidget.prototype, PartBrowserWidgetDecoratorBase.prototype);
    _.extend(CyPhyLightDecoratorPartBrowserWidget.prototype, CyPhyLightDecoratorCore.prototype);


    /**************** OVERRIDE INHERITED / EXTEND ****************/

    /**** Override from PartBrowserWidgetDecoratorBase ****/
    CyPhyLightDecoratorPartBrowserWidget.prototype.DECORATORID = DECORATOR_ID;

    /**
     * Called before appending the element to the part browser. Renders content for the part browser.
     */
    CyPhyLightDecoratorPartBrowserWidget.prototype.beforeAppend = function () {
        this.$el = this.$DOMBase.clone();

        this._hideName = true;

        this._renderContent();
    };


    /**
     * Called after element is appended to the part browser. Currently this method does nothing.
     */
    CyPhyLightDecoratorPartBrowserWidget.prototype.afterAppend = function () {

    };


    /**** Override from ModelDecoratorCore ****/
    CyPhyLightDecoratorPartBrowserWidget.prototype._registerForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    CyPhyLightDecoratorPartBrowserWidget.prototype._unregisterForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    return CyPhyLightDecoratorPartBrowserWidget;
});