/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */

"use strict";

define(['js/NodePropertyNames',
        'js/Utils/METAAspectHelper',
        './ActivityDiagramDecorator.Constants',
        './ActivityDiagram.META',
        'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
        'js/Constants'], function (nodePropertyNames,
                                   METAAspectHelper,
                                   ActivityDiagramDecoratorConstants,
                                   ActivityDiagramMETA,
                                   DiagramDesignerWidgetConstants,
                                   CONSTANTS) {

    /**
     * A module representing ActivityDiagramBase decorator functionality for the ActivityDiagramModelingLanguage.
     * @exports ActivityDiagramBase
     * @version 1.0
     */
    var ActivityDiagramBase;

    /**
     * Initializes a new instance of ActivityDiagramBase.
     * @constructor
     */
    ActivityDiagramBase = function () {

    };

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    ActivityDiagramBase.prototype._updatePorts = function () {
        var len = 6,
            portId,
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            META_TYPES = ActivityDiagramMETA.META_TYPES, 
            isTypeAction = METAAspectHelper.isMETAType(gmeID, META_TYPES.Action),
            isTypeBar = METAAspectHelper.isMETAType(gmeID, META_TYPES.Bar),
            name_len = this.skinParts.$name.contents()[0].length * ActivityDiagramDecoratorConstants.NAME_DIV_FIXTURE,
            width = name_len > ActivityDiagramDecoratorConstants.MIN_WIDTH ? name_len : ActivityDiagramDecoratorConstants.MIN_WIDTH,
            SVGWidth = isTypeAction ? width : parseInt(this.skinParts.$svg.attr('width')),
            SVGHeight = isTypeAction ? ActivityDiagramDecoratorConstants.HEIGHT : parseInt(this.skinParts.$svg.attr('height')),
            PortWidth = ActivityDiagramDecoratorConstants.PORT_WIDTH;

        // reinitialize the port coordinates with an empty object
        this._connectionAreas = {};    
        this.skinParts.$connectorContainer.empty();

    	// positioning the connectors' connection areas

         // TOP
        this._connectionAreas[0] = {
            "x1": SVGWidth / 2,
            "y1": 0
        }
        // BOTTOM
        this._connectionAreas[1] = {
            "x1": SVGWidth / 2,
            "y1": SVGHeight
        }       
        if (!isTypeBar){

            // LEFT
            this._connectionAreas[2] = {
                "x1": 0,
                "y1": SVGHeight / 2
            }
            // RIGHT
            this._connectionAreas[3] = {
                "x1": SVGWidth,
                "y1": SVGHeight / 2
            }
        } else {

             // TOP LEFT
            this._connectionAreas[2] = {
                "x1": SVGWidth / 4,
                "y1": 0
            }
            // TOP RIGHT
            this._connectionAreas[3] = {
                "x1": SVGWidth / 4 * 3,
                "y1": 0
            }
            // BOTTOM LEFT
            this._connectionAreas[4] = {
                "x1": SVGWidth / 4,
                "y1": SVGHeight
            }
            // BOTTOM RIGHT
            this._connectionAreas[5] = {
                "x1": SVGWidth / 4 * 3,
                "y1": SVGHeight
            }
        }



        while(len--) {
            
            portId = 5 - len;
            // render connector
            var connectorE = $('<div/>', {'class': DiagramDesignerWidgetConstants.CONNECTOR_CLASS});

            if (portId === 3 && !isTypeBar) {
                connectorE.addClass(ActivityDiagramDecoratorConstants.RIGHT_PORT_CLASS);
            } else if (portId === 2 && !isTypeBar) {
                connectorE.addClass(ActivityDiagramDecoratorConstants.LEFT_PORT_CLASS);
            } else if (portId === 1 || portId === 4 || portId === 5) {
                connectorE.addClass(ActivityDiagramDecoratorConstants.BOTTOM_PORT_CLASS);
            } else {
                connectorE.addClass(ActivityDiagramDecoratorConstants.TOP_PORT_CLASS);
            }

            connectorE.css({
                    'top': this._connectionAreas[portId].y1 - PortWidth,
                    'left': this._connectionAreas[portId].x1 - PortWidth
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

            if (!isTypeBar && portId === 3) {

                break;
            }
        }
        //this.hideSourceConnectors();
    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    ActivityDiagramBase.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Gets the connection areas for all connectors associated with this object including ports if there is any.
     * @param id {string} GME id of the port, null if connections has to be specified for this object.
     * @param isEnd {boolean} True if id object is the end point of the connection.
     * @param connectionMetaInfo {object} Source object's meta information.
     * @returns {Array} Connection areas to/from connections can be drawn.
     */
    ActivityDiagramBase.prototype.getConnectionAreas = function (id/*, isEnd, connectionMetaInfo*/) {

    	var result = [],
            LEN = 10, // length of stem that can stick out of the connector before connections can turn 
            ANGLES = [270, 90, 180, 0], // L, R, T, B
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            META_TYPES = ActivityDiagramMETA.META_TYPES,
            isTypeBar = METAAspectHelper.isMETAType(gmeID, META_TYPES.Bar);

        //by default return the bounding box edges midpoints

        if (id === undefined || id === this.hostDesignerItem.id) {
            if (!isTypeBar) {

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
            } else {
                ANGLES = [180, 0, 180, 180, 0, 0];
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

        }
        return result;
    };

    return ActivityDiagramBase;
});
