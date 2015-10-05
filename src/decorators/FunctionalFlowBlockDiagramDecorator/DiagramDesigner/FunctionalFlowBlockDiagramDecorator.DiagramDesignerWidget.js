/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */

"use strict";

define(['js/Constants',
    '../Core/FunctionalFlowBlockDiagram.META',
    'js/NodePropertyNames',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.DecoratorBase',
    '../Core/FunctionalFlowBlockDiagramDecorator.Core.js',
    '../Core/FunctionalFlowBlockDiagramDecorator.Constants',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
    'css!./FunctionalFlowBlockDiagramDecorator.DiagramDesignerWidget'], function (CONSTANTS,
                                                                                  FunctionalFlowBlockDiagramMETA,
                                                                                  nodePropertyNames,
                                                                                  DiagramDesignerWidgetDecoratorBase,
                                                                                  FunctionalFlowBlockDiagramDecoratorCore,
                                                                                  FunctionalFlowBlockDiagramDecoratorConstants,
                                                                                  DiagramDesignerWidgetConstants) {
    /**
     * A module representing DiagramDesignerWidget specific functionality for the FunctionalFlowBlockDiagramModelingLanguage.
     * @exports FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget
     * @version 1.0
     */
    var FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget,
        DECORATOR_ID = "FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget";

    /**
     * Initializes a new instance of FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget
     * @param options {object} options for initialization
     * @constructor
     */
    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget = function (options) {
        var opts = _.extend({}, options);

        DiagramDesignerWidgetDecoratorBase.apply(this, [opts]);

        // this widget supports connectors and connections
        this._initializeDecorator({"connectors": true});

        this.logger.debug("FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget ctor");
    };

    _.extend(FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype, DiagramDesignerWidgetDecoratorBase.prototype);
    _.extend(FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype, FunctionalFlowBlockDiagramDecoratorCore.prototype);

    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DECORATORBASE MEMBERS **************************/

    /**
     * Called when a new element is added to the widget
     */
    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype.on_addTo = function () {
        var self = this;

        this._renderContent();

        if (this._metaType === FunctionalFlowBlockDiagramMETA.TYPE_INFO.isFFBDMetaLanguage(this._gmeID) &&
            FunctionalFlowBlockDiagramMETA.getMetaTypesOf(this._gmeID)[0] !== this._gmeID) {

            this.skinParts.$name.remove();
        } else {
            // set name editable on double-click
            if (this.skinParts.$name) {
                this.skinParts.$name.on("dblclick.editOnDblClick", null, function (event) {
                    if (self.hostDesignerItem.canvas.getIsReadOnlyMode() !== true) {
                        $(this).editInPlace({
                            "class": "",
                            "onChange": function (oldValue, newValue) {
                                self._onNodeTitleChanged(oldValue, newValue);
                                self.updateName();
                            }
                        });
                    }
                    event.stopPropagation();
                    event.preventDefault();
                });
            }
        }
    };

    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype.updateName = function () {
        var client = this._control._client,
            nodeObj = client.getNode(this._metaInfo[CONSTANTS.GME_ID]),
            newName = "";

        if (nodeObj) {
            newName = nodeObj.getAttribute(nodePropertyNames.Attributes.name) || "";

            if (this.name !== newName) {
                this.name = newName;
                this.skinParts.$name.text(this.name);
            }
        }
    };

    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype._onNodeTitleChanged = function (oldValue, newValue) {
        var client = this._control._client;

        client.setAttributes(this._metaInfo[CONSTANTS.GME_ID], nodePropertyNames.Attributes.name, newValue);
    };

    /**
     * Shows all source connectors.
     * @param params {String[]} Registered connector IDs to show.
     */
    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype.showSourceConnectors = function (params) {
        this.logger.debug('showSourceConnectors: ' + JSON.stringify(params));
        this.$sourceConnectors.show();
    };

    /**
     * Hides the source 'connectors' - detaches them from the DOM
     */
    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype.hideSourceConnectors = function () {
        this.$sourceConnectors.hide();
    };

    /**
     * Shows all end (destination) connectors.
     * @param params {String[]} Registered connector IDs to show.
     */
    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype.showEndConnectors = function (params) {
        this.logger.debug('showEndConnectors: ' + JSON.stringify(params));

        // TODO: elements from same FunctionalFlowBlockDiagram domain could be connected
        this.$endConnectors.show();
    };

    /**
     * Hides the end (destination) 'connectors' - detaches them from the DOM
     */
    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype.hideEndConnectors = function () {
        this.$endConnectors.hide();
    };

    /**
     * Initializes all connectors then hides them.
     */
    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype.initializeConnectors = function () {

        //find connectors
        this.$sourceConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);
        this.$endConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);

        // hide all connectors by default
        this.hideSourceConnectors();
        this.hideEndConnectors();
    };


    /**** Override from ModelDecoratorCore ****/
    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype._registerForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype._unregisterForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget.prototype.notifyComponentEvent = function (componentList) {
        this.update();
    };

    return FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget;
});
