/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * Authors:
 * Zsolt Lattmann
 * Robert Kereskenyi
 */


"use strict";

define(['js/NodePropertyNames',
        'js/RegistryKeys',
        'js/Utils/METAAspectHelper',
        './LogicGatesDecorator.Constants',
        './LogicGates.META',
        'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
        'js/Constants'], function (nodePropertyNames,
                                   REGISTRY_KEYS,
                                   METAAspectHelper,
                                   LogicGatesDecoratorConstants,
                                   LogicGatesMETA,
                                   DiagramDesignerWidgetConstants,
                                   CONSTANTS) {

    /**
    * A module representing LogicCircuit decorator functionality for the LogicGatesModelingLanguage.
    * @exports LogicCircuit
    * @version 1.0
    */
    var LogicCircuit;

    /**
     * Initializes a new instance of LogicCircuit.
     * @constructor
     */
    LogicCircuit = function () {

    };

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    LogicCircuit.prototype._updatePorts = function () {
        var gmeID = this._metaInfo[CONSTANTS.GME_ID],
            client = this._control._client,
            nodeObj = client.getNode(gmeID),
            childrenIDs = nodeObj ?  nodeObj.getChildrenIds() : [],
            META_TYPES = LogicGatesMETA.META_TYPES,
            isTypeUserOutput = METAAspectHelper.isMETAType(gmeID, META_TYPES.UserOutput),
            SVGWidth = parseInt(this.skinParts.$svg.attr('width')), // TODO: get height and width
            SVGHeight = parseInt(this.skinParts.$svg.attr('height')),
            LEFT_OFFSET = isTypeUserOutput ? 0 : SVGWidth,
            TOP_OFFSET = SVGHeight / 2,
            rotateTransform = isTypeUserOutput ? "" : " rotate(180)",
            svgIcon = this.skinParts.$svg,
            len,
            inputPortVerticalOffset,
            outputPortVerticalOffset,
            portId,
            self = this,
            isInput = false,
            isOutput = false;

        // reinitialize the port coordinates with an empty object
        this._portCoordinates = {};
        this.skinParts.$connectorContainer.empty();

        // delete all ports and port names from svg icon
        svgIcon.find('.port').remove();
        svgIcon.find('.name').remove();

        if (this._portTextBase === undefined) {
            this._portTextBase = svgIcon.find('.port-name');
            this._portTextBase.remove();
        }

        svgIcon.find('.port-name').remove();


        len = childrenIDs.length;
        var inputPortNum = 0,
            outputPortNum = 0;

        while (len--) {

            portId = childrenIDs[len];

            isInput = METAAspectHelper.isMETAType(portId, META_TYPES.UserInput) ||
                      METAAspectHelper.isMETAType(portId, META_TYPES.Clock);

            isOutput = METAAspectHelper.isMETAType(portId, META_TYPES.UserOutput);

            if (isInput) {
                inputPortNum += 1;
            } else if (isOutput) {
                outputPortNum += 1;
            }
        }

        // resize svg
        var MIN_BLOCK_HEIGHT = 60;
        var BLOCK_HEIGHT_INCREASE = LogicGatesDecoratorConstants.PORT_HEIGHT;

        var maxPortNum = outputPortNum > inputPortNum ? outputPortNum : inputPortNum;
        var height = MIN_BLOCK_HEIGHT;

        if (maxPortNum > 2) {
            // add more space for ports
            height = MIN_BLOCK_HEIGHT + (maxPortNum  - 1) * BLOCK_HEIGHT_INCREASE;
        }

        // set size for the svg
        $(svgIcon.find('rect')[0]).attr('height', height);
        this.skinParts.$svg.attr('height', height);

        SVGHeight = parseInt(this.skinParts.$svg.attr('height'));

        var LogicGatesClassName = METAAspectHelper.getMETATypesOf(gmeID)[0];

        var classNameSVG = $(svgIcon.find('.type')[0])[0];

        // TODO: set coordinates to center dynamically for type
        $(classNameSVG).text('<< ' + LogicGatesClassName + ' >>');
        //$(classNameSVG).attr('y', height / 2 + 4);

        inputPortVerticalOffset = SVGHeight / (inputPortNum + 1);
        outputPortVerticalOffset = SVGHeight / (outputPortNum + 1);

        len = childrenIDs.length;
        inputPortNum = 1;
        outputPortNum = 1;

        childrenIDs.sort(function (aId, bId) {
            
            if (aId && bId) {
                var nodeA_y = self.preferencesHelper.getRegistry(aId, REGISTRY_KEYS.POSITION, true);
                var nodeB_y = self.preferencesHelper.getRegistry(bId, REGISTRY_KEYS.POSITION, true);

                return nodeA_y < nodeB_y ? 1 : -1;
            }

            return aId < bId ? 1 : -1;
        });

        while (len--) {
            portId = childrenIDs[len];

            isInput = METAAspectHelper.isMETAType(portId, META_TYPES.UserInput) ||
                      METAAspectHelper.isMETAType(portId, META_TYPES.Clock);

            isOutput = METAAspectHelper.isMETAType(portId, META_TYPES.UserOutput);

            if (isInput) {
                // Input port

                LEFT_OFFSET = 0;
                TOP_OFFSET = inputPortVerticalOffset * inputPortNum - LogicGatesDecoratorConstants.PORT_HEIGHT / 2;
                inputPortNum += 1;
                rotateTransform = "";

                this._portCoordinates[portId] = {
                    'x': LEFT_OFFSET + LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS,
                    'y': TOP_OFFSET  + LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS + 1,
                    'w': 1,
                    'h': 1
                };

            } else if (isOutput) {
                // OutputPort

                LEFT_OFFSET = SVGWidth;
                TOP_OFFSET = outputPortVerticalOffset * outputPortNum + LogicGatesDecoratorConstants.PORT_HEIGHT / 2;
                outputPortNum += 1;

                rotateTransform = " rotate(180)";

                this._portCoordinates[portId] = {
                    'x': LEFT_OFFSET - 1.5 * LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS,
                    'y': TOP_OFFSET - LogicGatesDecoratorConstants.PORT_CIRCLE_RADIUS - 1,
                    'w': 1,
                    'h': 1
                };
            } else {
                // not a port keep going
                continue;
            }

            var portSVG = this.getPortSVG();

            portSVG.attr("transform", "translate(" + LEFT_OFFSET + "," + TOP_OFFSET + ")" + rotateTransform);

            var portContainer = $(svgIcon[0]).find('.ports');

            if (portContainer.length > 0) {
                portContainer[0].appendChild(portSVG[0]);

                // add port name
                var portName = this._portTextBase.clone();
                var childNode = this._control._client.getNode(portId);

                if (childNode) {
                    var name = childNode.getAttribute(nodePropertyNames.Attributes.name);

                    if (name.indexOf('!') == 0) {
                        portName.text(name.slice(1));
                        portName.attr('text-decoration', 'overline');
                    } else {
                        portName.text(name);
                        portName.attr('text-decoration', 'none');

                    }
                }

                $(svgIcon[0]).find('.port-names')[0].appendChild(portName[0]);

                // render connector
                var connectorE = $('<div/>', {'class': DiagramDesignerWidgetConstants.CONNECTOR_CLASS});

                if (isInput) {
                    connectorE.addClass(LogicGatesDecoratorConstants.INPUT_PORT_CLASS);
                    portName.attr('x', this._portCoordinates[portId].x + LogicGatesDecoratorConstants.PORT_WIDTH);
                    portName.attr('y', this._portCoordinates[portId].y + 4);
                } else if (isOutput) {
                    connectorE.addClass(LogicGatesDecoratorConstants.OUTPUT_PORT_CLASS);

                    portName.attr('x', this._portCoordinates[portId].x - LogicGatesDecoratorConstants.PORT_WIDTH);
                    portName.attr('y', this._portCoordinates[portId].y + 3);

                    var attrClass = portName.attr('class');
                    portName.attr('class', attrClass + ' right');
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
    LogicCircuit.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Gets the connection areas for all connectors associated with this object including ports if there is any.
     * @param id {string} GME id of the port, null if connections has to be specified for this object.
     * @param isEnd {boolean} True if id object is the end point of the connection.
     * @param connectionMetaInfo {object} Source object's meta information.
     * @returns {Array} Connection areas to/from connections can be drawn.
     */
    LogicCircuit.prototype.getConnectionAreas = function (id, isEnd, connectionMetaInfo) {
        var META_TYPES = LogicGatesMETA.META_TYPES,
            isInput = METAAspectHelper.isMETAType(id, META_TYPES.InputPort);

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

    return LogicCircuit;
});
