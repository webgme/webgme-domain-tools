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
    '../Core/CyPhyLightDecorator.Core.js',
    '../Core/CyPhyLightDecorator.Constants',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
    'css!./CyPhyLightDecorator.DiagramDesignerWidget'], function (CONSTANTS,
                                                       METAAspectHelper,
                                                       nodePropertyNames,
                                                       DiagramDesignerWidgetDecoratorBase,
                                                       CyPhyLightDecoratorCore,
                                                       CyPhyLightDecoratorConstants,
                                                       DiagramDesignerWidgetConstants) {
    /**
    * A module representing DiagramDesignerWidget specific functionality for the CyPhyLightModelingLanguage.
    * @exports CyPhyLightDecoratorDiagramDesignerWidget
    * @version 1.0
    */
    var CyPhyLightDecoratorDiagramDesignerWidget,
        DECORATOR_ID = "CyPhyLightDecoratorDiagramDesignerWidget";

    /**
     * Initializes a new instance of CyPhyLightDecoratorDiagramDesignerWidget
     * @param options {object} options for initialization
     * @constructor
     */
    CyPhyLightDecoratorDiagramDesignerWidget = function (options) {
        var opts = _.extend( {}, options);

        DiagramDesignerWidgetDecoratorBase.apply(this, [opts]);

        // this widget supports connectors and connections
        this._initializeDecorator({"connectors": true});

        this.logger.debug("CyPhyLightDecoratorDiagramDesignerWidget ctor");
    };

    _.extend(CyPhyLightDecoratorDiagramDesignerWidget.prototype, DiagramDesignerWidgetDecoratorBase.prototype);
    _.extend(CyPhyLightDecoratorDiagramDesignerWidget.prototype, CyPhyLightDecoratorCore.prototype);

    CyPhyLightDecoratorDiagramDesignerWidget.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DECORATORBASE MEMBERS **************************/

    /**
     * Called when a new element is added to the widget
     */
    CyPhyLightDecoratorDiagramDesignerWidget.prototype.on_addTo = function () {
        var self = this,
            META_TYPES = METAAspectHelper.getMETAAspectTypes();

        this._hideName = false;
        this._renderContent();

        if ((this._metaType === METAAspectHelper.isMETAType(META_TYPES.CyPhyLightBase)) &&
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
    CyPhyLightDecoratorDiagramDesignerWidget.prototype.showSourceConnectors = function (params) {
        this.logger.debug('showSourceConnectors: ' + JSON.stringify(params));
        this.$sourceConnectors.show();
    };

    /**
     * Hides the source 'connectors' - detaches them from the DOM
     */
    CyPhyLightDecoratorDiagramDesignerWidget.prototype.hideSourceConnectors = function () {
        this.$sourceConnectors.hide();
    };

    /**
     * Shows all end (destination) connectors.
     * @param params {String[]} Registered connector IDs to show.
     */
    CyPhyLightDecoratorDiagramDesignerWidget.prototype.showEndConnectors = function (params) {
        this.logger.debug('showEndConnectors: ' + JSON.stringify(params));

        // TODO: elements from same CyPhyLight domain could be connected
        this.$endConnectors.show();
    };

    /**
     * Hides the end (destination) 'connectors' - detaches them from the DOM
     */
    CyPhyLightDecoratorDiagramDesignerWidget.prototype.hideEndConnectors = function () {
        this.$endConnectors.hide();
    };

    /**
     * Initializes all connectors then hides them.
     */
    CyPhyLightDecoratorDiagramDesignerWidget.prototype.initializeConnectors = function () {

        //find connectors
        this.$sourceConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);
        this.$endConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);

        // hide all connectors by default
        this.hideSourceConnectors();
        this.hideEndConnectors();
    };


    /**** Override from ModelDecoratorCore ****/
    CyPhyLightDecoratorDiagramDesignerWidget.prototype._registerForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    CyPhyLightDecoratorDiagramDesignerWidget.prototype._unregisterForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    CyPhyLightDecoratorDiagramDesignerWidget.prototype.notifyComponentEvent = function (componentList) {
        this.update();
    };

    return CyPhyLightDecoratorDiagramDesignerWidget;
});
