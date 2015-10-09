/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */
 
"use strict";

define(['js/Constants',
    '../Core/ActivityDiagram.META',
    'js/NodePropertyNames',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.DecoratorBase',
    '../Core/ActivityDiagramDecorator.Core.js',
    '../Core/ActivityDiagramDecorator.Constants',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
    'css!./ActivityDiagramDecorator.DiagramDesignerWidget'], function (CONSTANTS,
                                                                       ActivityDiagramMETA,
                                                                       nodePropertyNames,
                                                                       DiagramDesignerWidgetDecoratorBase,
                                                                       ActivityDiagramDecoratorCore,
                                                                       ActivityDiagramDecoratorConstants,
                                                                       DiagramDesignerWidgetConstants) {
    /**
    * A module representing DiagramDesignerWidget specific functionality for the ActivityDiagramModelingLanguage.
    * @exports ActivityDiagramDecoratorDiagramDesignerWidget
    * @version 1.0
    */
    var ActivityDiagramDecoratorDiagramDesignerWidget,
        DECORATOR_ID = "ActivityDiagramDecoratorDiagramDesignerWidget";

    /**
     * Initializes a new instance of ActivityDiagramDecoratorDiagramDesignerWidget
     * @param options {object} options for initialization
     * @constructor
     */
    ActivityDiagramDecoratorDiagramDesignerWidget = function (options) {
        var opts = _.extend({}, options);

        DiagramDesignerWidgetDecoratorBase.apply(this, [opts]);

        // this widget supports connectors and connections
        this._initializeDecorator({"connectors": true});

        this.logger.debug("ActivityDiagramDecoratorDiagramDesignerWidget ctor");
    };

    _.extend(ActivityDiagramDecoratorDiagramDesignerWidget.prototype, DiagramDesignerWidgetDecoratorBase.prototype);
    _.extend(ActivityDiagramDecoratorDiagramDesignerWidget.prototype, ActivityDiagramDecoratorCore.prototype);

    ActivityDiagramDecoratorDiagramDesignerWidget.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DECORATORBASE MEMBERS **************************/

    /**
     * Called when a new element is added to the widget
     */
    ActivityDiagramDecoratorDiagramDesignerWidget.prototype.on_addTo = function () {
        var self = this;

        this._hideName = false;
        this._renderContent();

        if ((this._metaType === ActivityDiagramMETA.TYPE_INFO.isActivityDiagramMetaModel(this._gmeID)) &&
            (ActivityDiagramMETA.getMetaTypesOf(this._gmeID)[0] !== this._gmeID)) {

            this.$name.remove();
        } else {
            // set name editable on double-click
            if (this.$name) {
                this.$name.on("dblclick.editOnDblClick", null, function (event) {
                    if (self.hostDesignerItem.canvas.getIsReadOnlyMode() !== true) {
                        self.hostDesignerItem.canvas.selectNone();
                        $(this).editInPlace({"class": "",
                            "onChange": function (oldValue, newValue) {
                                self._onNodeTitleChanged(oldValue, newValue);
                            }});
                    }
                    event.stopPropagation();
                    event.preventDefault();
                });
            }
        }
    };

    /**
     * Shows all source connectors.
     * @param params {String[]} Registered connector IDs to show.
     */
    ActivityDiagramDecoratorDiagramDesignerWidget.prototype.showSourceConnectors = function (params) {
        this.logger.debug('showSourceConnectors: ' + JSON.stringify(params));
        this.$sourceConnectors.show();
    };

    /**
     * Hides the source 'connectors' - detaches them from the DOM
     */
    ActivityDiagramDecoratorDiagramDesignerWidget.prototype.hideSourceConnectors = function () {
        this.$sourceConnectors.hide();
    };

    /**
     * Shows all end (destination) connectors.
     * @param params {String[]} Registered connector IDs to show.
     */
    ActivityDiagramDecoratorDiagramDesignerWidget.prototype.showEndConnectors = function (params) {
        this.logger.debug('showEndConnectors: ' + JSON.stringify(params));

        // TODO: elements from same ActivityDiagram domain could be connected
        this.$endConnectors.show();
    };

    /**
     * Hides the end (destination) 'connectors' - detaches them from the DOM
     */
    ActivityDiagramDecoratorDiagramDesignerWidget.prototype.hideEndConnectors = function () {
        this.$endConnectors.hide();
    };

    /**
     * Initializes all connectors then hides them.
     */
    ActivityDiagramDecoratorDiagramDesignerWidget.prototype.initializeConnectors = function () {

        //find connectors
        this.$sourceConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);
        this.$endConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);

        // hide all connectors by default
        this.hideSourceConnectors();
        this.hideEndConnectors();
    };


    /**** Override from ModelDecoratorCore ****/
    ActivityDiagramDecoratorDiagramDesignerWidget.prototype._registerForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    ActivityDiagramDecoratorDiagramDesignerWidget.prototype._unregisterForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    ActivityDiagramDecoratorDiagramDesignerWidget.prototype.notifyComponentEvent = function (componentList) {
        this.update();
    };

    return ActivityDiagramDecoratorDiagramDesignerWidget;
});
