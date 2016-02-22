/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 *
 * Authors:
 */

"use strict";

define(['js/Constants',
    'js/NodePropertyNames',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.DecoratorBase',
    '../Core/FMUDecorator.Core.js',
    '../Core/FMUDecorator.Constants',
    '../Core/FMU.META',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
    'css!./FMUDecorator.DiagramDesignerWidget'], function (CONSTANTS,
                                                       nodePropertyNames,
                                                       DiagramDesignerWidgetDecoratorBase,
                                                       FMUDecoratorCore,
                                                       FMUDecoratorConstants,
                                                       FMUMETA,
                                                       DiagramDesignerWidgetConstants) {
    /**
    * A module representing DiagramDesignerWidget specific functionality for the FMUModelingLanguage.
    * @exports FMUDecoratorDiagramDesignerWidget
    * @version 1.0
    */
    var FMUDecoratorDiagramDesignerWidget,
        DECORATOR_ID = "FMUDecoratorDiagramDesignerWidget";

    /**
     * Initializes a new instance of FMUDecoratorDiagramDesignerWidget
     * @param options {object} options for initialization
     * @constructor
     */
    FMUDecoratorDiagramDesignerWidget = function (options) {
        var opts = _.extend( {}, options);

        DiagramDesignerWidgetDecoratorBase.apply(this, [opts]);

        // this widget supports connectors and connections
        this._initializeDecorator({"connectors": true});

        this.logger.debug("FMUDecoratorDiagramDesignerWidget ctor");
    };

    _.extend(FMUDecoratorDiagramDesignerWidget.prototype, DiagramDesignerWidgetDecoratorBase.prototype);
    _.extend(FMUDecoratorDiagramDesignerWidget.prototype, FMUDecoratorCore.prototype);

    FMUDecoratorDiagramDesignerWidget.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DECORATORBASE MEMBERS **************************/

    /**
     * Called when a new element is added to the widget
     */
    FMUDecoratorDiagramDesignerWidget.prototype.on_addTo = function () {
        var self = this,
            META_TYPES = FMUMETA.getMetaTypes();

        this._hideName = false;
        this._renderContent();

        //if ((this._metaType === METAAspectHelper.isMETAType(META_TYPES.FMUBase)) &&
            //(METAAspectHelper.getMETATypesOf(this._gmeID)[0] !== this._gmeID)) {
        if (false) {
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
    FMUDecoratorDiagramDesignerWidget.prototype.showSourceConnectors = function (params) {
        this.logger.debug('showSourceConnectors: ' + JSON.stringify(params));
        this.$sourceConnectors.show();
    };

    /**
     * Hides the source 'connectors' - detaches them from the DOM
     */
    FMUDecoratorDiagramDesignerWidget.prototype.hideSourceConnectors = function () {
        this.$sourceConnectors.hide();
    };

    /**
     * Shows all end (destination) connectors.
     * @param params {String[]} Registered connector IDs to show.
     */
    FMUDecoratorDiagramDesignerWidget.prototype.showEndConnectors = function (params) {
        this.logger.debug('showEndConnectors: ' + JSON.stringify(params));

        // TODO: elements from same FMU domain could be connected
        this.$endConnectors.show();
    };

    /**
     * Hides the end (destination) 'connectors' - detaches them from the DOM
     */
    FMUDecoratorDiagramDesignerWidget.prototype.hideEndConnectors = function () {
        this.$endConnectors.hide();
    };

    /**
     * Initializes all connectors then hides them.
     */
    FMUDecoratorDiagramDesignerWidget.prototype.initializeConnectors = function () {

        //find connectors
        this.$sourceConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);
        this.$endConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);

        // hide all connectors by default
        this.hideSourceConnectors();
        this.hideEndConnectors();
    };


    /**** Override from ModelDecoratorCore ****/
    FMUDecoratorDiagramDesignerWidget.prototype._registerForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    FMUDecoratorDiagramDesignerWidget.prototype._unregisterForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    FMUDecoratorDiagramDesignerWidget.prototype.notifyComponentEvent = function (componentList) {
        this.update();
    };

    return FMUDecoratorDiagramDesignerWidget;
});
