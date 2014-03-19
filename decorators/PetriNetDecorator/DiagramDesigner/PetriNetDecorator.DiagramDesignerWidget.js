/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Authors:
 * Peng Zhang
 */


"use strict";

define(['js/Constants',
    'js/Utils/METAAspectHelper',
    'js/NodePropertyNames',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.DecoratorBase',
    '../Core/PetriNetDecorator.Core.js',
    '../Core/PetriNetDecorator.Constants',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
    'css!./PetriNetDecorator.DiagramDesignerWidget'], function (CONSTANTS,
                                                       METAAspectHelper,
                                                       nodePropertyNames,
                                                       DiagramDesignerWidgetDecoratorBase,
                                                       PetriNetDecoratorCore,
                                                       PetriNetDecoratorConstants,
                                                       DiagramDesignerWidgetConstants) {
    /**
    * A module representing DiagramDesignerWidget specific functionality for the PetriNetModelingLanguage.
    * @exports PetriNetDecoratorDiagramDesignerWidget
    * @version 1.0
    */
    var PetriNetDecoratorDiagramDesignerWidget,
        DECORATOR_ID = "PetriNetDecoratorDiagramDesignerWidget";

    /**
     * Initializes a new instance of PetriNetDecoratorDiagramDesignerWidget
     * @param options {object} options for initialization
     * @constructor
     */
    PetriNetDecoratorDiagramDesignerWidget = function (options) {
        var opts = _.extend( {}, options);

        DiagramDesignerWidgetDecoratorBase.apply(this, [opts]);

        // this widget supports connectors and connections
        this._initializeDecorator({"connectors": true});

        this.logger.debug("PetriNetDecoratorDiagramDesignerWidget ctor");
    };

    _.extend(PetriNetDecoratorDiagramDesignerWidget.prototype, DiagramDesignerWidgetDecoratorBase.prototype);
    _.extend(PetriNetDecoratorDiagramDesignerWidget.prototype, PetriNetDecoratorCore.prototype);

    PetriNetDecoratorDiagramDesignerWidget.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DECORATORBASE MEMBERS **************************/

    /**
     * Called when a new element is added to the widget
     */
    PetriNetDecoratorDiagramDesignerWidget.prototype.on_addTo = function () {
        var self = this,
            META_TYPES = METAAspectHelper.getMETAAspectTypes();

        this._renderContent();

        if ((this._metaType === METAAspectHelper.isMETAType(META_TYPES.PetriNetBase)) &&
            (METAAspectHelper.getMETATypesOf(this._gmeID)[0] !== this._gmeID)) {

            this.$name.remove();
        } else {
            // set name editable on double-click
            if (this.skinParts.$name) {
                this.skinParts.$name.on("dblclick.editOnDblClick", null, function (event) {
                    if (self.hostDesignerItem.canvas.getIsReadOnlyMode() !== true) {
                        self.hostDesignerItem.canvas.selectNone();
                        $(this).editInPlace({"class": "",
                            "onChange": function (oldValue, newValue) {
                                self._onNodeTitleChanged(oldValue, newValue);
                                self.updateName();
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
    PetriNetDecoratorDiagramDesignerWidget.prototype.showSourceConnectors = function (params) {
        this.logger.debug('showSourceConnectors: ' + JSON.stringify(params));
        this.$sourceConnectors.show();
    };

    /**
     * Hides the source 'connectors' - detaches them from the DOM
     */
    PetriNetDecoratorDiagramDesignerWidget.prototype.hideSourceConnectors = function () {
        this.$sourceConnectors.hide();
    };

    /**
     * Shows all end (destination) connectors.
     * @param params {String[]} Registered connector IDs to show.
     */
    PetriNetDecoratorDiagramDesignerWidget.prototype.showEndConnectors = function (params) {
        this.logger.debug('showEndConnectors: ' + JSON.stringify(params));

        // TODO: elements from same PetriNet domain could be connected
        this.$endConnectors.show();
    };

    /**
     * Hides the end (destination) 'connectors' - detaches them from the DOM
     */
    PetriNetDecoratorDiagramDesignerWidget.prototype.hideEndConnectors = function () {
        this.$endConnectors.hide();
    };

    /**
     * Initializes all connectors then hides them.
     */
    PetriNetDecoratorDiagramDesignerWidget.prototype.initializeConnectors = function () {

        //find connectors
        this.$sourceConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);
        this.$endConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);

        // hide all connectors by default
        this.hideSourceConnectors();
        this.hideEndConnectors();
    };


    /**** Override from ModelDecoratorCore ****/
    PetriNetDecoratorDiagramDesignerWidget.prototype._registerForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    PetriNetDecoratorDiagramDesignerWidget.prototype._unregisterForNotification = function(portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    PetriNetDecoratorDiagramDesignerWidget.prototype.notifyComponentEvent = function (componentList) {
        this.update();
    };

    return PetriNetDecoratorDiagramDesignerWidget;
});
