/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Authors:
 * Peng Zhang
 */

"use strict";

define(['js/Constants',
    'js/NodePropertyNames',
    'js/Widgets/PartBrowser/PartBrowserWidget.DecoratorBase',
    '../Core/PetriNetDecorator.Core.js',
    '../Core/PetriNetDecorator.Constants',
    'css!./PetriNetDecorator.PartBrowserWidget'], function (CONSTANTS,
                                                       nodePropertyNames,
                                                       PartBrowserWidgetDecoratorBase,
                                                       PetriNetDecoratorCore,
                                                       PetriNetDecoratorConstants) {

    /**
     * A module representing PartBrowserWidget specific functionality for the PetriNetModelingLanguage.
     * @exports PetriNetDecoratorPartBrowserWidget
     * @version 1.0
     */
    var PetriNetDecoratorPartBrowserWidget,
        DECORATOR_ID = "PetriNetDecoratorPartBrowserWidget";

    /**
     * Initializes a new instance of PetriNetDecoratorPartBrowserWidget
     * @param options {object} options for initialization
     * @constructor
     */
    PetriNetDecoratorPartBrowserWidget = function (options) {
        var opts = _.extend( {}, options);

        PartBrowserWidgetDecoratorBase.apply(this, [opts]);

        // Part browser widget does not support creating connections therefore do not render connectors
        this._initializeDecorator({"connectors": false});

        this.logger.debug("PetriNetDecoratorPartBrowserWidget ctor");
    };


    /************************ INHERITANCE *********************/
    _.extend(PetriNetDecoratorPartBrowserWidget.prototype, PartBrowserWidgetDecoratorBase.prototype);
    _.extend(PetriNetDecoratorPartBrowserWidget.prototype, PetriNetDecoratorCore.prototype);


    /**************** OVERRIDE INHERITED / EXTEND ****************/

    /**** Override from PartBrowserWidgetDecoratorBase ****/
    PetriNetDecoratorPartBrowserWidget.prototype.DECORATORID = DECORATOR_ID;

    /**
     * Called before appending the element to the part browser. Renders content for the part browser.
     */
    PetriNetDecoratorPartBrowserWidget.prototype.beforeAppend = function () {
        this.$el = this.$DOMBase.clone();

        this._renderContent();
    };


    /**
     * Called after element is appended to the part browser. Currently this method does nothing.
     */
    PetriNetDecoratorPartBrowserWidget.prototype.afterAppend = function () {

    };


    /**** Override from ModelDecoratorCore ****/
    PetriNetDecoratorPartBrowserWidget.prototype._registerForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    PetriNetDecoratorPartBrowserWidget.prototype._unregisterForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    return PetriNetDecoratorPartBrowserWidget;
});