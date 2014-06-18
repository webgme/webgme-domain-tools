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
    '../Core/PortHamiltonianSystemDecorator.Core.js',
    '../Core/PortHamiltonianSystemDecorator.Constants',
    'css!./PortHamiltonianSystemDecorator.PartBrowserWidget'], function (CONSTANTS,
                                                       METATypesHelper,
                                                       nodePropertyNames,
                                                       PartBrowserWidgetDecoratorBase,
                                                       PortHamiltonianSystemDecoratorCore,
                                                       PortHamiltonianSystemDecoratorConstants) {

    /**
     * A module representing PartBrowserWidget specific functionality for the PortHamiltonianSystemModelingLanguage.
     * @exports PortHamiltonianSystemDecoratorPartBrowserWidget
     * @version 1.0
     */
    var PortHamiltonianSystemDecoratorPartBrowserWidget,
        DECORATOR_ID = "PortHamiltonianSystemDecoratorPartBrowserWidget";

    /**
     * Initializes a new instance of PortHamiltonianSystemDecoratorPartBrowserWidget
     * @param options {object} options for initialization
     * @constructor
     */
    PortHamiltonianSystemDecoratorPartBrowserWidget = function (options) {
        var opts = _.extend( {}, options);

        PartBrowserWidgetDecoratorBase.apply(this, [opts]);

        // Part browser widget does not support creating connections therefore do not render connectors
        this._initializeDecorator({"connectors": false});

        this.logger.debug("PortHamiltonianSystemDecoratorPartBrowserWidget ctor");
    };


    /************************ INHERITANCE *********************/
    _.extend(PortHamiltonianSystemDecoratorPartBrowserWidget.prototype, PartBrowserWidgetDecoratorBase.prototype);
    _.extend(PortHamiltonianSystemDecoratorPartBrowserWidget.prototype, PortHamiltonianSystemDecoratorCore.prototype);


    /**************** OVERRIDE INHERITED / EXTEND ****************/

    /**** Override from PartBrowserWidgetDecoratorBase ****/
    PortHamiltonianSystemDecoratorPartBrowserWidget.prototype.DECORATORID = DECORATOR_ID;

    /**
     * Called before appending the element to the part browser. Renders content for the part browser.
     */
    PortHamiltonianSystemDecoratorPartBrowserWidget.prototype.beforeAppend = function () {
        this.$el = this.$DOMBase.clone();

        this._hideName = true;

        this._renderContent();
    };


    /**
     * Called after element is appended to the part browser. Currently this method does nothing.
     */
    PortHamiltonianSystemDecoratorPartBrowserWidget.prototype.afterAppend = function () {

    };


    /**** Override from ModelDecoratorCore ****/
    PortHamiltonianSystemDecoratorPartBrowserWidget.prototype._registerForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    PortHamiltonianSystemDecoratorPartBrowserWidget.prototype._unregisterForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    return PortHamiltonianSystemDecoratorPartBrowserWidget;
});