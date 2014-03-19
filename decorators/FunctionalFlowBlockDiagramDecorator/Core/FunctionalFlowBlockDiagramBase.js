/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */
"use strict";

define(['js/NodePropertyNames',
        'js/Utils/METAAspectHelper',
        './FunctionalFlowBlockDiagramDecorator.Constants',
        './FunctionalFlowBlockDiagram.META',
        'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
        'js/Constants'], function (nodePropertyNames,
                                   METAAspectHelper,
                                   FunctionalFlowBlockDiagramDecoratorConstants,
                                   FunctionalFlowBlockDiagramMETA,
                                   DiagramDesignerWidgetConstants,
                                   CONSTANTS) {

    /**
     * A module representing FunctionalFlowBlockDiagramBase decorator functionality for the FunctionalFlowBlockDiagramModelingLanguage.
     * @exports FunctionalFlowBlockDiagramBase
     * @version 1.0
     */
    var FunctionalFlowBlockDiagramBase;

    /**
     * Initializes a new instance of FunctionalFlowBlockDiagramBase.
     * @constructor
     */
    FunctionalFlowBlockDiagramBase = function () {

    };

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    FunctionalFlowBlockDiagramBase.prototype._updatePorts = function () {
        var len = 4, // create 4 connector classes
            SVGWidth = parseInt(this.skinParts.$svg.attr('width')),
            SVGHeight = parseInt(this.skinParts.$svg.attr('height')),
            PortWidth = FunctionalFlowBlockDiagramDecoratorConstants.PORT_WIDTH;

        // reinitialize the port coordinates with an empty object
        this._connectionAreas = {};    
        this.skinParts.$connectorContainer.empty();

        // positioning the connectors' connection areas
    	// LEFT
    	this._connectionAreas[0] = {
        	"x1": 0,
        	"y1": SVGHeight / 2
        }
        // RIGHT
        this._connectionAreas[1] = {
        	"x1": SVGWidth,
        	"y1": SVGHeight / 2
        }
        // TOP
        this._connectionAreas[2] = {
        	"x1": SVGWidth / 2,
        	"y1": 0
        }
        // BOTTOM
        this._connectionAreas[3] = {
        	"x1": SVGWidth / 2,
        	"y1": SVGHeight
         }

        while(len--) {

            // render connector
            var connectorE = $('<div/>', {'class': DiagramDesignerWidgetConstants.CONNECTOR_CLASS});

            if (len === 3) {
                connectorE.addClass(FunctionalFlowBlockDiagramDecoratorConstants.BOTTOM_PORT_CLASS);
            } else if (len === 2) {
                connectorE.addClass(FunctionalFlowBlockDiagramDecoratorConstants.TOP_PORT_CLASS);
            } else if (len === 1) {
                connectorE.addClass(FunctionalFlowBlockDiagramDecoratorConstants.RIGHT_PORT_CLASS);
            } else {
                connectorE.addClass(FunctionalFlowBlockDiagramDecoratorConstants.LEFT_PORT_CLASS);
            }

            // positioning the connectors with respect to their parent svg
            connectorE.css({
                    'top': this._connectionAreas[len].y1 - PortWidth,
                    'left': this._connectionAreas[len].x1 - PortWidth
                });

            if (this._displayConnectors) {

                // register connectors for creating connections
                if (this.hostDesignerItem) {
                    this.hostDesignerItem.registerConnectors(connectorE);
                } else {
                    this.logger.error("Decorator's hostDesignerItem is not set");
                }

                this.skinParts.$connectorContainer.append(connectorE);
            }
        }
    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    FunctionalFlowBlockDiagramBase.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Gets the connection areas for all connectors associated with this object including ports if there is any.
     * @param id {string} GME id of the port, null if connections has to be specified for this object.
     * @param isEnd {boolean} True if id object is the end point of the connection.
     * @param connectionMetaInfo {object} Source object's meta information.
     * @returns {Array} Connection areas to/from connections can be drawn.
     */
    FunctionalFlowBlockDiagramBase.prototype.getConnectionAreas = function (id/*, isEnd, connectionMetaInfo*/) {
        var result = [],
            LEN = 20, // length of stem that can stick out of the connector before connections can turn 
            ANGLES = [180, 0, 270, 90]; // L, R, T, B

        //by default return the bounding box edges midpoints

        if (id === undefined || id === this.hostDesignerItem.id) {

            for (var i = 0; i < ANGLES.length; i++) {

                result.push( {"id": i,
                    "x1": this._connectionAreas[i].x1, // x's and y's determine the lines where connections can be drawn on
                    "y1": this._connectionAreas[i].y1,
                    "x2": this._connectionAreas[i].x1,
                    "y2": this._connectionAreas[i].y1,
                    "angle1": ANGLES[i], // angles determine from which direction between two angles connections can be drawn
                    "angle2": ANGLES[i],
                    "len": LEN} );

            }    
        }

        return result;
    };

    return FunctionalFlowBlockDiagramBase;
});
