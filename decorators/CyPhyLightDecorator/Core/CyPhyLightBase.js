/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 *
 */

"use strict";

define(['js/NodePropertyNames',
        'js/Utils/METAAspectHelper',
        './CyPhyLightDecorator.Constants',
        './CyPhyLight.META',
        'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
        'js/Constants'], function (nodePropertyNames,
                                   METAAspectHelper,
                                   CyPhyLightDecoratorConstants,
                                   CyPhyLightMETA,
                                   DiagramDesignerWidgetConstants,
                                   CONSTANTS) {

    /**
     * A module representing CyPhyLightBase decorator functionality for the CyPhyLightModelingLanguage.
     * @exports CyPhyLightBase
     * @version 1.0
     */
    var CyPhyLightBase;

    /**
     * Initializes a new instance of CyPhyLightBase.
     * @constructor
     */
    CyPhyLightBase = function () {

    };

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    CyPhyLightBase.prototype._updatePorts = function () {
        var portId,
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            client = this._control._client,
            nodeObj = client.getNode(gmeID),
            childrenIDs = nodeObj ?  nodeObj.getChildrenIds() : [],
            len = childrenIDs.length,
            META_TYPES = CyPhyLightMETA.META_TYPES,
            SVGWidth = parseInt(this.skinParts.$svg.attr('width')),
            SVGHeight = parseInt(this.skinParts.$svg.attr('height')),
            PortWidth = CyPhyLightDecoratorConstants.PORT_WIDTH;

        // reinitialize the port coordinates with an empty object

        var isModelicaModel = METAAspectHelper.isMETAType(gmeID, META_TYPES.ModelicaModel);
        if (isModelicaModel && len){

            this._connectionAreas = {};
            this.skinParts.$connectorContainer.empty();
            var modelSVG = this.skinParts.$svg;
            var portsSvgs = modelSVG.find('g');
            var childrenNames = [];
            var caCnt = 0;
            for(var i = 0; i < len; i++){
                var childName = client.getNode(childrenIDs[i]).getAttribute("name");
                //childrenNames.push(client.getNode(childrenIDs[i]).getAttribute("name"));
                for(var j = 0; j < portsSvgs.length; j++){
                    if (childName == $(portsSvgs[j]).attr('id')){
                        var portSvg = $(portsSvgs[j]);
                        var connDec = $('<div/>', {'class': DiagramDesignerWidgetConstants.CONNECTOR_CLASS});

                        // N.B. it's using the x, y assuming rectangle! This is not always the case.
                        var bbox = {
                            'x': parseInt(($(portSvg.find('rect'))).attr('x')),
                            'y': parseInt(($(portSvg.find('rect'))).attr('y')),
                            'width': 20,
                            'height': 20};

                        connDec.css({'left':bbox.x, 'top':bbox.y, 'width':bbox.width, 'height':bbox.height});
                        if (this.hostDesignerItem) {
                            this.hostDesignerItem.registerConnectors(connDec, childrenIDs[i]);
                            this.hostDesignerItem.registerSubcomponent(childrenIDs[i], {"GME_ID": childrenIDs[i]});
                        } else {
                            this.logger.error("Decorator's hostDesignerItem is not set");
                        }

                        this.skinParts.$connectorContainer.append(connDec);
                    }
                }
            }

        } else {
            len = 4;
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

            while(len--) {

                portId = 3 - len;
                // render connector
                var connectorE = $('<div/>', {'class': DiagramDesignerWidgetConstants.CONNECTOR_CLASS});

                if (portId === 3) {
                    connectorE.addClass(CyPhyLightDecoratorConstants.RIGHT_PORT_CLASS);
                } else if (portId === 2) {
                    connectorE.addClass(CyPhyLightDecoratorConstants.LEFT_PORT_CLASS);
                } else if (portId === 1 || portId === 4 || portId === 5) {
                    connectorE.addClass(CyPhyLightDecoratorConstants.BOTTOM_PORT_CLASS);
                } else {
                    connectorE.addClass(CyPhyLightDecoratorConstants.TOP_PORT_CLASS);
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
            }
        }
    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    CyPhyLightBase.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Gets the connection areas for all connectors associated with this object including ports if there is any.
     * @param id {string} GME id of the port, null if connections has to be specified for this object.
     * @param isEnd {boolean} True if id object is the end point of the connection.
     * @param connectionMetaInfo {object} Source object's meta information.
     * @returns {Array} Connection areas to/from connections can be drawn.
     */
    CyPhyLightBase.prototype.getConnectionAreas = function (id/*, isEnd, connectionMetaInfo*/) {

    	var result = [],
            LEN = 10, // length of stem that can stick out of the connector before connections can turn 
            ANGLES = [270, 90, 180, 0], // L, R, T, B
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            META_TYPES = CyPhyLightMETA.META_TYPES;

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

    return CyPhyLightBase;
});
