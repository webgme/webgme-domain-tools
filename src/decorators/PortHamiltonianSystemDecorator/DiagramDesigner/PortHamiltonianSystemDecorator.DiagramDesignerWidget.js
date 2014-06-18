/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 *
 * Authors:
 */

"use strict";

define(['js/Constants',
    'js/Utils/METAAspectHelper',
    'js/NodePropertyNames',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.DecoratorBase',
    '../Core/PortHamiltonianSystemDecorator.Core.js',
    '../Core/PortHamiltonianSystemDecorator.Constants',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
    'css!./PortHamiltonianSystemDecorator.DiagramDesignerWidget'], function (CONSTANTS,
                                                       METAAspectHelper,
                                                       nodePropertyNames,
                                                       DiagramDesignerWidgetDecoratorBase,
                                                       PortHamiltonianSystemDecoratorCore,
                                                       PortHamiltonianSystemDecoratorConstants,
                                                       DiagramDesignerWidgetConstants) {
    /**
    * A module representing DiagramDesignerWidget specific functionality for the PortHamiltonianSystemModelingLanguage.
    * @exports PortHamiltonianSystemDecoratorDiagramDesignerWidget
    * @version 1.0
    */
    var PortHamiltonianSystemDecoratorDiagramDesignerWidget,
        DECORATOR_ID = "PortHamiltonianSystemDecoratorDiagramDesignerWidget";

    /**
     * Initializes a new instance of PortHamiltonianSystemDecoratorDiagramDesignerWidget
     * @param options {object} options for initialization
     * @constructor
     */
    PortHamiltonianSystemDecoratorDiagramDesignerWidget = function (options) {
        var opts = _.extend( {}, options);

        DiagramDesignerWidgetDecoratorBase.apply(this, [opts]);

        // this widget supports connectors and connections
        this._initializeDecorator({"connectors": true});

        this.logger.debug("PortHamiltonianSystemDecoratorDiagramDesignerWidget ctor");
    };

    _.extend(PortHamiltonianSystemDecoratorDiagramDesignerWidget.prototype, DiagramDesignerWidgetDecoratorBase.prototype);
    _.extend(PortHamiltonianSystemDecoratorDiagramDesignerWidget.prototype, PortHamiltonianSystemDecoratorCore.prototype);

    PortHamiltonianSystemDecoratorDiagramDesignerWidget.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DECORATORBASE MEMBERS **************************/

    /**
     * Called when a new element is added to the widget
     */
    PortHamiltonianSystemDecoratorDiagramDesignerWidget.prototype.on_addTo = function () {
        var self = this,
            META_TYPES = METAAspectHelper.getMETAAspectTypes();

        this._hideName = false;
        this._renderContent();

        if ((this._metaType === METAAspectHelper.isMETAType(META_TYPES.PortHamiltonianSystemBase)) &&
            (METAAspectHelper.getMETATypesOf(this._gmeID)[0] !== this._gmeID)) {

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
    PortHamiltonianSystemDecoratorDiagramDesignerWidget.prototype.showSourceConnectors = function (params) {
        this.logger.debug('showSourceConnectors: ' + JSON.stringify(params));
        this.$sourceConnectors.show();
    };

    /**
     * Hides the source 'connectors' - detaches them from the DOM
     */
    PortHamiltonianSystemDecoratorDiagramDesignerWidget.prototype.hideSourceConnectors = function () {
        this.$sourceConnectors.hide();
    };

    /**
     * Shows all end (destination) connectors.
     * @param params {String[]} Registered connector IDs to show.
     */
    PortHamiltonianSystemDecoratorDiagramDesignerWidget.prototype.showEndConnectors = function (params) {
        this.logger.debug('showEndConnectors: ' + JSON.stringify(params));

        // TODO: elements from same PortHamiltonianSystem domain could be connected
        this.$endConnectors.show();
    };

    /**
     * Hides the end (destination) 'connectors' - detaches them from the DOM
     */
    PortHamiltonianSystemDecoratorDiagramDesignerWidget.prototype.hideEndConnectors = function () {
        this.$endConnectors.hide();
    };

    /**
     * Initializes all connectors then hides them.
     */
    PortHamiltonianSystemDecoratorDiagramDesignerWidget.prototype.initializeConnectors = function () {

        //find connectors
        this.$sourceConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);
        this.$endConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);

        // hide all connectors by default
        this.hideSourceConnectors();
        this.hideEndConnectors();
    };


    /**** Override from ModelDecoratorCore ****/
    PortHamiltonianSystemDecoratorDiagramDesignerWidget.prototype._registerForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    PortHamiltonianSystemDecoratorDiagramDesignerWidget.prototype._unregisterForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    PortHamiltonianSystemDecoratorDiagramDesignerWidget.prototype.notifyComponentEvent = function (componentList) {
        this.update();
    };

    return PortHamiltonianSystemDecoratorDiagramDesignerWidget;
});
