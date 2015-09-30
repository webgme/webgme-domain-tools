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
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.DecoratorBase',
    '../Core/LogicGatesDecorator.Core.js',
    '../Core/LogicGatesDecorator.Constants',
    '../Core/LogicGates.META',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
    'css!./LogicGatesDecorator.DiagramDesignerWidget'], function (CONSTANTS,
                                                                  nodePropertyNames,
                                                                  DiagramDesignerWidgetDecoratorBase,
                                                                  LogicGatesDecoratorCore,
                                                                  LogicGatesDecoratorConstants,
                                                                  LogicGatesMETA,
                                                                  DiagramDesignerWidgetConstants) {
    /**
     * A module representing DiagramDesignerWidget specific functionality for the LogicGatesModelingLanguage.
     * @exports LogicGatesDecoratorDiagramDesignerWidget
     * @version 1.0
     */
    var LogicGatesDecoratorDiagramDesignerWidget,
        DECORATOR_ID = "LogicGatesDecoratorDiagramDesignerWidget";

    /**
     * Initializes a new instance of LogicGatesDecoratorDiagramDesignerWidget
     * @param options {object} options for initialization
     * @constructor
     */
    LogicGatesDecoratorDiagramDesignerWidget = function (options) {
        var opts = _.extend({}, options);

        DiagramDesignerWidgetDecoratorBase.apply(this, [opts]);

        // this widget supports connectors and connections
        this._initializeDecorator({"connectors": true});

        this.logger.debug("LogicGatesDecoratorDiagramDesignerWidget ctor");
    };

    _.extend(LogicGatesDecoratorDiagramDesignerWidget.prototype, DiagramDesignerWidgetDecoratorBase.prototype);
    _.extend(LogicGatesDecoratorDiagramDesignerWidget.prototype, LogicGatesDecoratorCore.prototype);

    LogicGatesDecoratorDiagramDesignerWidget.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DECORATORBASE MEMBERS **************************/

    /**
     * Called when a new element is added to the widget
     */
    LogicGatesDecoratorDiagramDesignerWidget.prototype.on_addTo = function () {
        var self = this;

        this._renderContent();


        if ((this._metaType === LogicGatesMETA.TYPE_INFO.isLogicGateBase(this._gmeID)) &&
            (LogicGatesMETA.getMETATypesOf(this._gmeID)[0] !== this._gmeID)) {

            this.$name.remove();
        } else {
            // set name editable on double-click
            if (this.$name) {
                this.$name.on("dblclick.editOnDblClick", null, function (event) {
                    if (self.hostDesignerItem.canvas.getIsReadOnlyMode() !== true) {
                        self.hostDesignerItem.canvas.selectNone();
                        $(this).editInPlace({
                            "class": "",
                            "onChange": function (oldValue, newValue) {
                                self._onNodeTitleChanged(oldValue, newValue);
                            }
                        });
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
    LogicGatesDecoratorDiagramDesignerWidget.prototype.showSourceConnectors = function (params) {
        this.logger.debug('showSourceConnectors: ' + JSON.stringify(params));
        this.$sourceConnectors.show();
    };

    /**
     * Hides the source 'connectors' - detaches them from the DOM
     */
    LogicGatesDecoratorDiagramDesignerWidget.prototype.hideSourceConnectors = function () {
        this.$sourceConnectors.hide();
    };

    /**
     * Shows all end (destination) connectors.
     * @param params {String[]} Registered connector IDs to show.
     */
    LogicGatesDecoratorDiagramDesignerWidget.prototype.showEndConnectors = function (params) {
        this.logger.debug('showEndConnectors: ' + JSON.stringify(params));

        // TODO: elements from same LogicGates domain could be connected
        this.$endConnectors.show();
    };

    /**
     * Hides the end (destination) 'connectors' - detaches them from the DOM
     */
    LogicGatesDecoratorDiagramDesignerWidget.prototype.hideEndConnectors = function () {
        this.$endConnectors.hide();
    };

    /**
     * Initializes all connectors then hides them.
     */
    LogicGatesDecoratorDiagramDesignerWidget.prototype.initializeConnectors = function () {

        //find connectors
        this.$sourceConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS + '.' +
                                               LogicGatesDecoratorConstants.OUTPUT_PORT_CLASS);
        this.$endConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS + '.' +
                                            LogicGatesDecoratorConstants.INPUT_PORT_CLASS);

        // hide all connectors by default
        this.hideSourceConnectors();
        this.hideEndConnectors();
    };


    /**** Override from ModelDecoratorCore ****/
    LogicGatesDecoratorDiagramDesignerWidget.prototype._registerForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    LogicGatesDecoratorDiagramDesignerWidget.prototype._unregisterForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    LogicGatesDecoratorDiagramDesignerWidget.prototype.notifyComponentEvent = function (componentList) {
        this.update();
    };

    return LogicGatesDecoratorDiagramDesignerWidget;
});
