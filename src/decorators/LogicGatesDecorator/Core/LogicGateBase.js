/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * Authors:
 * Zsolt Lattmann
 * Robert Kereskenyi
 */

"use strict";

define(['js/NodePropertyNames',
        './LogicGatesDecorator.Constants',
        './LogicGates.META',
        'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
        'js/Constants'], function (nodePropertyNames,
                                   LogicGatesDecoratorConstants,
                                   LogicGatesMETA,
                                   DiagramDesignerWidgetConstants,
                                   CONSTANTS) {

    /**
     * A module representing LogicGateBase decorator functionality for the LogicGatesModelingLanguage.
     * @exports LogicGateBase
     * @version 1.0
     */
    var LogicGateBase;

    /**
     * Initializes a new instance of LogicGateBase.
     * @constructor
     */
    LogicGateBase = function () {

    };

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    LogicGateBase.prototype._updatePorts = function () {
        var gmeID = this._metaInfo[CONSTANTS.GME_ID],
            client = this._control._client,
            nodeObj = client.getNode(gmeID),
            childrenIDs = nodeObj ?  nodeObj.getChildrenIds() : [],
            isTypeUserOutput = LogicGatesMETA.TYPE_INFO.isUserOutput(gmeID),
            SVGWidth = parseInt(this.skinParts.$svg.attr('width')), // TODO: get height and width
            SVGHeight = parseInt(this.skinParts.$svg.attr('height')),
            LEFT_OFFSET = isTypeUserOutput ? 0 : SVGWidth,
            TOP_OFFSET = SVGHeight / 2,
            rotateTransform = isTypeUserOutput ? "" : " rotate(180)",
            svgIcon = this.skinParts.$svg,
            len,
            inputPortVerticalOffset,
            portId;


        // reinitialize the port coordinates with an empty object
        this._portCoordinates = {};
        this.skinParts.$connectorContainer.empty();

        // delete all ports from svg icon
        svgIcon.find('.port').remove();

        len = childrenIDs.length;
        var inputPortNum = 0;

        while (len--) {
            if (LogicGatesMETA.TYPE_INFO.isInputPort(childrenIDs[len])) {
                inputPortNum += 1;
            }
        }

        inputPortVerticalOffset = SVGHeight / (inputPortNum + 1);

        len = childrenIDs.length;
        inputPortNum = 1;


        var isInput = false;

        while (len--) {
            portId = childrenIDs[len];
            isInput = LogicGatesMETA.TYPE_INFO.isInputPort(portId);

            if (isInput) {
                LEFT_OFFSET = 0;
                TOP_OFFSET = inputPortVerticalOffset * inputPortNum - LogicGatesDecoratorConstants.PORT_HEIGHT / 2;
                inputPortNum += 1;
                rotateTransform = "";


                this._portCoordinates[portId] = {
                    'x': LEFT_OFFSET + LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS,
                    'y': TOP_OFFSET + LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS + 1,
                    'w': 1,
                    'h': 1
                };

            } else {
                // OutputPort

                LEFT_OFFSET = SVGWidth;
                TOP_OFFSET = SVGHeight / 2 + LogicGatesDecoratorConstants.PORT_HEIGHT / 2;
                rotateTransform = " rotate(180)";

                this._portCoordinates[portId] = {
                    'x': LEFT_OFFSET - 1.5 * LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS,
                    'y': TOP_OFFSET - 1.5 * LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS + 1,
                    'w': 1,
                    'h': 1
                };
            }

            var portSVG = this.getPortSVG();

            portSVG.attr("transform", "translate(" + LEFT_OFFSET + "," + TOP_OFFSET + ")" + rotateTransform);

            var portContainer = $(svgIcon[0]).find('.ports');

            if (portContainer.length > 0) {
                portContainer[0].appendChild(portSVG[0]);

                // render connector
                var connectorE = $('<div/>', {'class': DiagramDesignerWidgetConstants.CONNECTOR_CLASS});

                if (isInput) {
                    connectorE.addClass(LogicGatesDecoratorConstants.INPUT_PORT_CLASS);
                } else {
                    connectorE.addClass(LogicGatesDecoratorConstants.OUTPUT_PORT_CLASS);
                }

                connectorE.css({
                    'top': this._portCoordinates[portId].y - 6,
                    'left': this._portCoordinates[portId].x - 6
                });

                if (this._displayConnectors) {

                    // register connectors for creating connections
                    if (this.hostDesignerItem) {
                        this.hostDesignerItem.registerConnectors(connectorE, portId);
                        this.hostDesignerItem.registerSubcomponent(portId, {"GME_ID": portId});
                    } else {
                        this.logger.error("Decorator's hostDesignerItem is not set");
                    }

                    this.skinParts.$connectorContainer.append(connectorE);
                }
            }
        }

    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    LogicGateBase.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Gets the connection areas for all connectors associated with this object including ports if there is any.
     * @param id {string} GME id of the port, null if connections has to be specified for this object.
     * @param isEnd {boolean} True if id object is the end point of the connection.
     * @param connectionMetaInfo {object} Source object's meta information.
     * @returns {Array} Connection areas to/from connections can be drawn.
     */
    LogicGateBase.prototype.getConnectionAreas = function (id, isEnd, connectionMetaInfo) {
        var isInput = LogicGatesMETA.TYPE_INFO.isInputPort(id);

        if (this._portCoordinates[id]) {
            return [{
                "id": id,
                "x1": this._portCoordinates[id].x + this._portCoordinates[id].w / 2,
                "y1": this._portCoordinates[id].y + this._portCoordinates[id].h / 2,
                "x2": this._portCoordinates[id].x + this._portCoordinates[id].w / 2,
                "y2": this._portCoordinates[id].y + this._portCoordinates[id].h / 2,
                "angle1": isInput ? 180 : 0,
                "angle2": isInput ? 180 : 0,
                "len": LogicGatesDecoratorConstants.PORT_CONNECTOR_LENGTH
            }];
        } else {
            return [];
        }
    };

    return LogicGateBase;
});
