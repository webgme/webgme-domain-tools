/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Authors:
 * Peng Zhang
 */



"use strict";

define(['js/NodePropertyNames',
        './PetriNetDecorator.Constants',
        './PetriNet.META',
        'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
        'js/Constants'], function (nodePropertyNames,
                                   PetriNetDecoratorConstants,
                                   PetriNetMETA,
                                   DiagramDesignerWidgetConstants,
                                   CONSTANTS) {

    /**
     * A module representing PetriNetBase decorator functionality for the PetriNetModelingLanguage.
     * @exports PetriNetBase
     * @version 1.0
     */
    var PetriNetBase;

    /**
     * Initializes a new instance of PetriNetBase.
     * @constructor
     */
    PetriNetBase = function () {

    };


    /**
     * Renders and updates the tokens for this Place.
     * @private
     */
    PetriNetBase.prototype._addTokens = function () {

        var svgIcon = this.skinParts.$svg,
            control = this._control,
            gmeID = this._metaInfo[CONSTANTS.GME_ID], 
            capacity = control._client.getNode(gmeID).getAttribute(PetriNetDecoratorConstants.CAPACITY),
            marking = control._client.getNode(gmeID).getAttribute(PetriNetDecoratorConstants.MARKING), 
            SVGWidth = parseInt(this.skinParts.$svg.attr('width')),
            SVGHeight = parseInt(this.skinParts.$svg.attr('height')),
            PortWidth = PetriNetDecoratorConstants.PORT_WIDTH,
            xpos = SVGWidth / 2 - PortWidth, 
            ypos = SVGHeight / 2 - PortWidth, 
            MAX_NUM = 10,
            coef = marking > 3 ? 15 : 10,
            shift = marking > 3 ? (marking < 7 ? 20 : 22) : 18,
            scale = marking > 3 ? (marking < 7 ? 0.7 : 0.5) : 1,
            angle = 0,
            counter = marking < MAX_NUM ? marking : MAX_NUM, 
            angleOffset = Math.PI * 2 / counter;

        if (marking <= capacity && marking <= 20) {

            $(svgIcon[0]).find('.token').remove();

            if (marking === 1) {
                var tokenContainer = $(svgIcon[0]).find('.tokens'),
                    tokenSVG = this.getTokenSVG();
                tokenSVG.attr("transform", "translate(" + xpos + "," + ypos + ")");
                tokenContainer[0].appendChild(tokenSVG[0]);
                return;
            }

            while (counter--) {

                var tokenContainer = $(svgIcon[0]).find('.tokens');
                    var tokenSVG = this.getTokenSVG();
                    //tokenSVG.attr("transform", "translate(" + xpos + "," + ypos + ")");
                    xpos = parseInt(coef * Math.cos(angle) + shift);
                    ypos = parseInt(coef * Math.sin(angle) + shift);
                    tokenSVG.attr("transform", "translate(" + xpos + ", " + ypos + ") scale(" + scale + ")");
                    tokenContainer[0].appendChild(tokenSVG[0]);
                    angle += angleOffset;                
            }

            var extra = marking - MAX_NUM;
            if (extra > 0) {

                angle = 0;
                angleOffset = Math.PI * 2 / extra;
                if (extra === 1) {
                    var tokenContainer = $(svgIcon[0]).find('.tokens'),
                        tokenSVG = this.getTokenSVG();
                    xpos = SVGWidth / 2 - PortWidth/2;
                    ypos = SVGHeight / 2 - PortWidth/2; 
                    tokenSVG.attr("transform", "translate(" + xpos + "," + ypos + ") scale(" + scale + ")");
                    tokenContainer[0].appendChild(tokenSVG[0]);
                    return;
                }

                coef = 15;
                shift = 56;
                scale = 0.4;

                while (extra--) {

                    var tokenContainer = $(svgIcon[0]).find('.tokens');
                    var tokenSVG = this.getTokenSVG();
                    xpos = parseInt(coef * Math.cos(angle) + shift);
                    ypos = parseInt(coef * Math.sin(angle) + shift);
                    tokenSVG.attr("transform", "scale(" + scale + ") translate(" + xpos + ", " + ypos + ")");

                    tokenContainer[0].appendChild(tokenSVG[0]);
                    angle += angleOffset;   
                }
            }
            
        }
    }

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    PetriNetBase.prototype._updatePorts = function () {
        var gmeID = this._metaInfo[CONSTANTS.GME_ID],
            isTypePlace = PetriNetMETA.TYPE_INFO.isPlace(gmeID),
            isTypeTransition = PetriNetMETA.TYPE_INFO.isTransition(gmeID),
            len = 4,
            portId,
            SVGWidth = parseInt(this.skinParts.$svg.attr('width')),
            SVGHeight = parseInt(this.skinParts.$svg.attr('height')), 
            PortWidth = PetriNetDecoratorConstants.PORT_WIDTH,
            FIXTURE = isTypeTransition ? SVGWidth + PortWidth / 2 : 0;


        if (isTypePlace) {

            this._addTokens();
        }

        // reinitialize the port coordinates with an empty object
        this._connectionAreas = {};    
        this.skinParts.$connectorContainer.empty();

        // positioning the connectors' connection areas
    	// LEFT
    	this._connectionAreas[0] = {
        	"x1": FIXTURE,
        	"y1": SVGHeight / 2
        }
        // RIGHT
        this._connectionAreas[1] = {
        	"x1": SVGWidth + FIXTURE,
        	"y1": SVGHeight / 2
        }

        if (isTypePlace) {

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
	    }

        while(len--) {
        	portId = 3 - len;
            // render connector
            var connectorE = $('<div/>', {'class': DiagramDesignerWidgetConstants.CONNECTOR_CLASS});

            if (portId === 3) {
                connectorE.addClass(PetriNetDecoratorConstants.BOTTOM_PORT_CLASS);
            } else if (portId === 2) {
                connectorE.addClass(PetriNetDecoratorConstants.TOP_PORT_CLASS);
            } else if (portId === 1) {
                connectorE.addClass(PetriNetDecoratorConstants.RIGHT_PORT_CLASS);
            } else {
                connectorE.addClass(PetriNetDecoratorConstants.LEFT_PORT_CLASS);
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

            if (isTypeTransition && portId === 1) {

                break;
            }
        }
    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    PetriNetBase.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Gets the connection areas for all connectors associated with this object including ports if there is any.
     * @param id {string} GME id of the port, null if connections has to be specified for this object.
     * @param isEnd {boolean} True if id object is the end point of the connection.
     * @param connectionMetaInfo {object} Source object's meta information.
     * @returns {Array} Connection areas to/from connections can be drawn.
     */
    PetriNetBase.prototype.getConnectionAreas = function (id/*, isEnd, connectionMetaInfo*/) {
        var result = [],
            LEN = 20, // length of stem that can stick out of the connector before connections can turn 
            ANGLES = [180, 0, 270, 90], // L, R, T, B             
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            isTypeTransition = PetriNetMETA.TYPE_INFO.isTransition(gmeID);

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

                if (isTypeTransition && i === 1) {

                	break;
                }
            }
        }	

        return result;
    };

    return PetriNetBase;
});
