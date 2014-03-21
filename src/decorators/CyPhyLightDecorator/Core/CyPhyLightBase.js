/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 *
 */

"use strict";

define(['js/NodePropertyNames',
        'js/Utils/METAAspectHelper',
        './CyPhyLightDecorator.Constants',
        './CyPhyLight.META',
        './CyPhyLightDecorator.ModelicaURLs',
        'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
        'js/Constants'], function (nodePropertyNames,
                                   METAAspectHelper,
                                   CyPhyLightDecoratorConstants,
                                   CyPhyLightMETA,
                                   ModelicaURLs,
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


    CyPhyLightBase.prototype._toolTipBase = $('<div class="port_info"> \
            <span class="class_name">CLASS NAME</span> \
            <span class="name">NAME</span> \
            <span class="desc">DESCRIPTION</span> \
            <span class="class_desc">CLASS DESCRIPTION</span> \
        </div>');

    CyPhyLightBase.prototype._buildToolTip = function (portConnector, svgPort) {

        var tooltip = this._toolTipBase.clone(),
            svgInfo = $(svgPort).find('#info');

        if (svgInfo.length === 0) {
            return;
        }

        svgInfo = $(svgInfo[0]);

        tooltip.find('.name').text(svgInfo.find('#name').text());
        tooltip.find('.class_name').text(svgInfo.find('#type').text());
        tooltip.find('.desc').text(svgInfo.find('#desc').text());
        tooltip.find('.class_desc').text(svgInfo.find('#classDesc').text());

        svgInfo.remove();

        portConnector.append(tooltip);
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

        var port,
            svgPort;

        // var portName = port.getAttribute(nodePropertyNames.Attributes.name);
        // var svgPort = this.skinParts.$svg.find('#' + portName);

        var isModelicaModel = METAAspectHelper.isMETAType(gmeID, META_TYPES.ModelicaModel);
        if (isModelicaModel && len){

            this._bboxes = [];
            this.skinParts.$connectorContainer.empty();
            var modelSVG = this.skinParts.$svg;
            var portsSvgs = modelSVG.find('g');
            var childrenNames = [];
            var caCnt = 0;
            for(var i = 0; i < len; i++){
                var childName = client.getNode(childrenIDs[i]).getAttribute(nodePropertyNames.Attributes.name);
                //childrenNames.push(client.getNode(childrenIDs[i]).getAttribute("name"));
                for(var j = 0; j < portsSvgs.length; j++){
                    if (childName === $(portsSvgs[j]).attr('id')){
                        var portSvg = $(portsSvgs[j]);
                        var connDec = $('<div/>', {'class': DiagramDesignerWidgetConstants.CONNECTOR_CLASS});
                        
                        svgPort = this.skinParts.$svg.find('#' + childName);
                        if (svgPort.length > 0) {
                            svgPort = svgPort[0];
                        }
                        this._buildToolTip(connDec, svgPort);

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
                            this._bboxes[childrenIDs[i]] = bbox;
                        } else {
                            this.logger.error("Decorator's hostDesignerItem is not set");
                        }

                        this.skinParts.$connectorContainer.append(connDec);
                    } 
                    // else if ( // TODO: fill in here to render text ) {
                    //     var value = client.getNode(childrenIDs[i]).getAttribute("Value");
                    //     //this.skinParts.$svg[0].setAttribute(childName, value);
                    // }
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

        var META_TYPES = CyPhyLightMETA.META_TYPES,
            isInput = METAAspectHelper.isMETAType(id, META_TYPES.InputPort);

        // TODO: this needs to be modified
        // if flange_a, LHS; flange_b, RHS
        var nodeObj = this._control._client.getNode(id);

        var is_FlangeA = nodeObj ? nodeObj.getAttribute("Class") === ModelicaURLs.Flange_a : false;

        if (this._bboxes[id]) {
            return [{
                "id": id,
                "x1": this._bboxes[id].x + this._bboxes[id].width / 2,
                "y1": this._bboxes[id].y + this._bboxes[id].height / 2,
                "x2": this._bboxes[id].x + this._bboxes[id].width / 2,
                "y2": this._bboxes[id].y + this._bboxes[id].height / 2,
                "angle1": is_FlangeA ? 0 : 180,
                "angle2": is_FlangeA ? 0 : 180,
                "len": 0
            }];
        } else {
            return [];
        }
    };

    return CyPhyLightBase;
});
