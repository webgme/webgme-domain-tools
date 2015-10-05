/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */

"use strict";

define(['js/Constants',
    'js/NodePropertyNames',
    'js/Widgets/PartBrowser/PartBrowserWidget.DecoratorBase',
    '../Core/FunctionalFlowBlockDiagramDecorator.Core.js',
    '../Core/FunctionalFlowBlockDiagramDecorator.Constants',
    'css!./FunctionalFlowBlockDiagramDecorator.PartBrowserWidget'], function (CONSTANTS,
                                                       nodePropertyNames,
                                                       PartBrowserWidgetDecoratorBase,
                                                       FunctionalFlowBlockDiagramDecoratorCore,
                                                       FunctionalFlowBlockDiagramDecoratorConstants) {

    /**
     * A module representing PartBrowserWidget specific functionality for the FunctionalFlowBlockDiagramModelingLanguage.
     * @exports FunctionalFlowBlockDiagramDecoratorPartBrowserWidget
     * @version 1.0
     */
    var FunctionalFlowBlockDiagramDecoratorPartBrowserWidget,
        DECORATOR_ID = "FunctionalFlowBlockDiagramDecoratorPartBrowserWidget";

    /**
     * Initializes a new instance of FunctionalFlowBlockDiagramDecoratorPartBrowserWidget
     * @param options {object} options for initialization
     * @constructor
     */
    FunctionalFlowBlockDiagramDecoratorPartBrowserWidget = function (options) {
        var opts = _.extend( {}, options);

        PartBrowserWidgetDecoratorBase.apply(this, [opts]);

        // Part browser widget does not support creating connections therefore do not render connectors
        this._initializeDecorator({"connectors": false});

        this.logger.debug("FunctionalFlowBlockDiagramDecoratorPartBrowserWidget ctor");
    };


    /************************ INHERITANCE *********************/
    _.extend(FunctionalFlowBlockDiagramDecoratorPartBrowserWidget.prototype, PartBrowserWidgetDecoratorBase.prototype);
    _.extend(FunctionalFlowBlockDiagramDecoratorPartBrowserWidget.prototype, FunctionalFlowBlockDiagramDecoratorCore.prototype);


    /**************** OVERRIDE INHERITED / EXTEND ****************/

    /**** Override from PartBrowserWidgetDecoratorBase ****/
    FunctionalFlowBlockDiagramDecoratorPartBrowserWidget.prototype.DECORATORID = DECORATOR_ID;

    /**
     * Called before appending the element to the part browser. Renders content for the part browser.
     */
    FunctionalFlowBlockDiagramDecoratorPartBrowserWidget.prototype.beforeAppend = function () {
        this.$el = this.$DOMBase.clone();

        this._renderContent();
    };


    /**
     * Called after element is appended to the part browser. Currently this method does nothing.
     */
    FunctionalFlowBlockDiagramDecoratorPartBrowserWidget.prototype.afterAppend = function () {

    };


    /**** Override from ModelDecoratorCore ****/
    FunctionalFlowBlockDiagramDecoratorPartBrowserWidget.prototype._registerForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    FunctionalFlowBlockDiagramDecoratorPartBrowserWidget.prototype._unregisterForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    return FunctionalFlowBlockDiagramDecoratorPartBrowserWidget;
});