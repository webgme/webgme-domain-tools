/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */

"use strict";

define(['js/Constants',
    'js/NodePropertyNames',
    'js/Widgets/PartBrowser/PartBrowserWidget.DecoratorBase',
    '../Core/ActivityDiagramDecorator.Core.js',
    'css!./ActivityDiagramDecorator.PartBrowserWidget'], function (CONSTANTS,
                                                       nodePropertyNames,
                                                       PartBrowserWidgetDecoratorBase,
                                                       ActivityDiagramDecoratorCore) {

    /**
     * A module representing PartBrowserWidget specific functionality for the ActivityDiagramModelingLanguage.
     * @exports ActivityDiagramDecoratorPartBrowserWidget
     * @version 1.0
     */
    var ActivityDiagramDecoratorPartBrowserWidget,
        DECORATOR_ID = "ActivityDiagramDecoratorPartBrowserWidget";

    /**
     * Initializes a new instance of ActivityDiagramDecoratorPartBrowserWidget
     * @param options {object} options for initialization
     * @constructor
     */
    ActivityDiagramDecoratorPartBrowserWidget = function (options) {
        var opts = _.extend( {}, options);

        PartBrowserWidgetDecoratorBase.apply(this, [opts]);

        // Part browser widget does not support creating connections therefore do not render connectors
        this._initializeDecorator({"connectors": false});

        this.logger.debug("ActivityDiagramDecoratorPartBrowserWidget ctor");
    };


    /************************ INHERITANCE *********************/
    _.extend(ActivityDiagramDecoratorPartBrowserWidget.prototype, PartBrowserWidgetDecoratorBase.prototype);
    _.extend(ActivityDiagramDecoratorPartBrowserWidget.prototype, ActivityDiagramDecoratorCore.prototype);


    /**************** OVERRIDE INHERITED / EXTEND ****************/

    /**** Override from PartBrowserWidgetDecoratorBase ****/
    ActivityDiagramDecoratorPartBrowserWidget.prototype.DECORATORID = DECORATOR_ID;

    /**
     * Called before appending the element to the part browser. Renders content for the part browser.
     */
    ActivityDiagramDecoratorPartBrowserWidget.prototype.beforeAppend = function () {
        this.$el = this.$DOMBase.clone();

        this._hideName = true;

        this._renderContent();
    };


    /**
     * Called after element is appended to the part browser. Currently this method does nothing.
     */
    ActivityDiagramDecoratorPartBrowserWidget.prototype.afterAppend = function () {

    };


    /**** Override from ModelDecoratorCore ****/
    ActivityDiagramDecoratorPartBrowserWidget.prototype._registerForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    ActivityDiagramDecoratorPartBrowserWidget.prototype._unregisterForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    return ActivityDiagramDecoratorPartBrowserWidget;
});