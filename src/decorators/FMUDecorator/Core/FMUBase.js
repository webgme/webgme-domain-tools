/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 *
 */


define(['js/NodePropertyNames',
        'js/Utils/METAAspectHelper',
        './FMUDecorator.Constants',
        './FMU.META',
        'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
        'js/Constants'], function (nodePropertyNames,
            METAAspectHelper,
            FMUDecoratorConstants,
            FMUMETA,
            DiagramDesignerWidgetConstants,
            CONSTANTS
    ) {
    'use strict';

    /**
     * A module representing FMUBase decorator functionality for the FMUModelingLanguage.
     * @exports FMUBase
     * @version 1.0
     */
    var FMUBase;

    /**
     * Initializes a new instance of FMUBase.
     * @constructor
     */
    FMUBase = function () {

    };

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    FMUBase.prototype._updatePorts = function () {
        var self = this,
            portId,
            len = 4,
            gmeID = self._metaInfo[CONSTANTS.GME_ID],
            META_TYPES = FMUMETA.META_TYPES,
            SVGWidth = parseInt(this.skinParts.$svg.attr('width'), 10),
            SVGHeight = parseInt(this.skinParts.$svg.attr('height'), 10),
            PortWidth = FMUDecoratorConstants.PORT_WIDTH;

        // reinitialize the port coordinates with an empty object
        self._connectionAreas = {};
        self.skinParts.$connectorContainer.empty();

        // positioning the connectors' connection areas

         // TOP
        self._connectionAreas[0] = {
            x1: SVGWidth / 2,
            y1: 0
        };
        // BOTTOM
        self._connectionAreas[1] = {
            x1: SVGWidth / 2,
            y1: SVGHeight
        };
        // LEFT
        self._connectionAreas[2] = {
            x1: 0,
            y1: SVGHeight / 2
        };
        // RIGHT
        self._connectionAreas[3] = {
            x1: SVGWidth,
            y1: SVGHeight / 2
        };

        while (len--) {
            // render connector
            var connectorE = $('<div/>', {class: DiagramDesignerWidgetConstants.CONNECTOR_CLASS});
            portId = 3 - len;
            if (portId === 3) {
                connectorE.addClass(FMUDecoratorConstants.RIGHT_PORT_CLASS);
            } else if (portId === 2) {
                connectorE.addClass(FMUDecoratorConstants.LEFT_PORT_CLASS);
            } else if (portId === 1 || portId === 4 || portId === 5) {
                connectorE.addClass(FMUDecoratorConstants.BOTTOM_PORT_CLASS);
            } else {
                connectorE.addClass(FMUDecoratorConstants.TOP_PORT_CLASS);
            }

            connectorE.css({
                top: self._connectionAreas[portId].y1 - PortWidth,
                left: self._connectionAreas[portId].x1 - PortWidth
            });

            if (self._displayConnectors) {
                // register connectors for creating connections
                if (self.hostDesignerItem) {
                    self.hostDesignerItem.registerConnectors(connectorE);
                } else {
                    self.logger.error("Decorator's hostDesignerItem is not set");
                }

                self.skinParts.$connectorContainer.append(connectorE);
            }
        }
    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    FMUBase.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Gets the connection areas for all connectors associated with this object including ports if there is any.
     * @param id {string} GME id of the port, null if connections has to be specified for this object.
     * @param isEnd {boolean} True if id object is the end point of the connection.
     * @param connectionMetaInfo {object} Source object's meta information.
     * @returns {Array} Connection areas to/from connections can be drawn.
     */
    FMUBase.prototype.getConnectionAreas = function (id/*, isEnd, connectionMetaInfo*/) {
        var self = this,
            result = [],
            i,
            LEN = 10, // length of stem that can stick out of the connector before connections can turn 
            ANGLES = [270, 90, 180, 0], // L, R, T, B
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            META_TYPES = FMUMETA.META_TYPES;

        //by default return the bounding box edges midpoints
        if (id === undefined || id === this.hostDesignerItem.id) {
            for (i = 0; i < ANGLES.length; i += 1) {
                result.push({id: i,
                    x1: self._connectionAreas[i].x1, // xs and ys determine the lines where connections can be drawn on
                    y1: self._connectionAreas[i].y1,
                    x2: self._connectionAreas[i].x1,
                    y2: self._connectionAreas[i].y1,
                    angle1: ANGLES[i], // angles determine from which direction between two angles connections can be drawn
                    angle2: ANGLES[i],
                    len: LEN
                    });
            }
        }

        return result;
    };

    return FMUBase;
});
