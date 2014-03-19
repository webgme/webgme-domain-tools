/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * Authors:
 * Zsolt Lattmann
 * Robert Kereskenyi
 */


"use strict";

define(['js/NodePropertyNames',
        'js/Utils/METAAspectHelper',
        './LogicGatesDecorator.Constants',
        './LogicGates.META',
        'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
        'js/Constants'], function (nodePropertyNames,
                                   METAAspectHelper,
                                   LogicGatesDecoratorConstants,
                                   LogicGatesMETA,
                                   DiagramDesignerWidgetConstants,
                                   CONSTANTS) {

    /**
    * A module representing IOElements decorator functionality for the LogicGatesModelingLanguage.
    * @exports IOElements
    * @version 1.0
    */
    var IOElements;

    /**
     * Initializes a new instance of IOElements.
     * @constructor
     */
    IOElements = function () {

    };

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    IOElements.prototype._updatePorts = function () {

        // initialize local variables
        var gmeID = this._metaInfo[CONSTANTS.GME_ID],
            META_TYPES = LogicGatesMETA.META_TYPES,
            isTypeUserOutput = METAAspectHelper.isMETAType(gmeID, META_TYPES.UserOutput),
            SVGWidth = parseInt(this.skinParts.$svg.attr('width')), // TODO: get height and width
            SVGHeight = parseInt(this.skinParts.$svg.attr('height')),
            LEFT_OFFSET = isTypeUserOutput ? 0 : SVGWidth,
            TOP_OFFSET = isTypeUserOutput ? SVGHeight / 2 - LogicGatesDecoratorConstants.PORT_HEIGHT / 2 : SVGHeight / 2 + LogicGatesDecoratorConstants.PORT_HEIGHT / 2,
            rotateTransform = isTypeUserOutput ? "" : " rotate(180)",
            svgIcon = this.skinParts.$svg;

        // get a new port svg
        var portSVG = this.getPortSVG();

        // set the position of this port
        portSVG.attr("transform", "translate(" + LEFT_OFFSET + "," + TOP_OFFSET + ")" + rotateTransform);

        // get port placeholder in svg
        var portContainer = $(svgIcon[0]).find('.ports');

        if (portContainer.length > 0) {
            // add this port to the place holder
            portContainer[0].appendChild(portSVG[0]);
        }

        // set the connection areas for this port
        this._connectionArea = {
            "id": "0",
            "x1": isTypeUserOutput ? LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS : LEFT_OFFSET - LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS,
            "y1": isTypeUserOutput ? TOP_OFFSET - LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS + LogicGatesDecoratorConstants.PORT_HEIGHT : TOP_OFFSET - LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS,
            "x2": isTypeUserOutput ? LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS : LEFT_OFFSET - LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS,
            "y2": isTypeUserOutput ? TOP_OFFSET + LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS + LogicGatesDecoratorConstants.PORT_HEIGHT : TOP_OFFSET + LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS,
            "angle1": isTypeUserOutput ? 180 : 0,
            "angle2": isTypeUserOutput ? 180 : 0,
            "len": LogicGatesDecoratorConstants.PORT_CONNECTOR_LENGTH
        };

        // FIXME: magic fixture for aligning the connectors
        this._connectionArea.y1 -= 7;
        this._connectionArea.y2 -= 7;


        // render connector
        var connectorE = $('<div/>', {'class': DiagramDesignerWidgetConstants.CONNECTOR_CLASS});

        if (isTypeUserOutput) {

            // it is an user output, i.e. has a input port
            connectorE.addClass(LogicGatesDecoratorConstants.INPUT_PORT_CLASS);

        } else {

            // it is an user input, i.e. has an output port
            connectorE.addClass(LogicGatesDecoratorConstants.OUTPUT_PORT_CLASS);

        }

        // set the position of the connector object
        connectorE.css({
            'top': this._connectionArea.y1,
            'left': this._connectionArea.x1 - 6
        });


        if (this._displayConnectors) {

            // if connectors have to be displayed
            if (this.hostDesignerItem) {

                // registering this connector to the host designer item (DiagramDesignerWidget)
                this.hostDesignerItem.registerConnectors(connectorE);

            } else {

                this.logger.warning("Decorator's hostDesignerItem is not set");
            }

            this.skinParts.$connectorContainer.append(connectorE);
        }

    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    IOElements.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Gets the connection areas for all connectors associated with this object including ports if there is any.
     * @param id {string} GME id of the port, null if connections has to be specified for this object.
     * @param isEnd {boolean} True if id object is the end point of the connection.
     * @param connectionMetaInfo {object} Source object's meta information.
     * @returns {Array} Connection areas to/from connections can be drawn.
     */
    IOElements.prototype.getConnectionAreas = function (id, isEnd, connectionMetaInfo) {
        var result = {};

        // add connection area to the result object
        _.extend(result, this._connectionArea);

        return [result];
    };

    return IOElements;
});