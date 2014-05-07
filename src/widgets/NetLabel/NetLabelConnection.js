/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 * 
 * Author: Robert Kereskenyi
 *         Dana Zhang
 */

"use strict";

define(['js/Widgets/DiagramDesigner/Connection',
        'js/Constants'], function (Connection, CONSTANTS) {

    var NetLabelConnection;

    NetLabelConnection = function (objId) {
        Connection.call(this, objId);
    };

    _.extend(NetLabelConnection.prototype, Connection.prototype);

    NetLabelConnection.prototype.setConnectionRenderData = function (segPoints) {
        var self = this,
            netLabel = $('<div class="netLabel"></div>');
        //this.paper   is a RaphaelJS papers
        this._segPoints = segPoints.slice(0);
        var srcPort = self.diagramDesigner.skinParts.$itemsContainer.find('#' + this.srcID)[0],
            dstPort = self.diagramDesigner.skinParts.$itemsContainer.find('#' + this.dstID)[0];

        if (!srcPort) {
            srcPort = self._toolTipBase.clone()[0];
            srcPort.setAttribute("id", this.srcID);
            srcPort.style.position = "absolute";
            srcPort.style.left = (this.srcPos.x + 75).toString() + "px";
            srcPort.style.top = this.srcPos.y.toString() + "px";
        }

        if (!dstPort) {
            dstPort = self._toolTipBase.clone()[0];
            dstPort.setAttribute("id", this.dstID);
            dstPort.style.position = "absolute";
            dstPort.style.left = (this.dstPos.x + 75).toString() + "px";
            dstPort.style.top = this.dstPos.y.toString() + "px";
        }
        var srcLabel = netLabel.clone();
        srcLabel.text(this.srcText);
        var dstLabel = netLabel.clone();
        dstLabel.text(this.dstText);

        $(dstPort).append(srcLabel);
        self.diagramDesigner.skinParts.$itemsContainer.append(dstPort);
        $(srcPort).append(dstLabel);
        self.diagramDesigner.skinParts.$itemsContainer.append(srcPort);

        self.logger.warning(this.srcText);
        self.logger.warning(this.dstText);
    };

    NetLabelConnection.prototype._toolTipBase = $('<div class="connList" style="width: 50px; height: 100px;"></div>');

    NetLabelConnection.prototype._initializeConnectionProps = function (objDescriptor) {
        this.reconnectable = objDescriptor.reconnectable === true;
        this.editable = !!objDescriptor.editable;
        this.srcText = objDescriptor.srcText;
        this.dstText = objDescriptor.dstText;
        this.srcID = objDescriptor.srcID;
        this.dstID = objDescriptor.dstID;
        this.srcPos = objDescriptor.srcPos;
        this.dstPos = objDescriptor.dstPos;
        this.name = objDescriptor.name;/* || this.id;*/
        this.nameEdit = objDescriptor.nameEdit || false;
        this.srcTextEdit = objDescriptor.srcTextEdit || false;
        this.dstTextEdit = objDescriptor.dstTextEdit || false;
        this.netLabelList = {};
        this.segmentPoints = [];
        if (!this.netLabelList.hasOwnProperty(this.srcID)) {
            this.netLabelList[this.srcID] = [];
        }
        if (!this.netLabelList.hasOwnProperty(this.dstID)) {
            this.netLabelList[this.dstID] = [];
        }
    };

    NetLabelConnection.prototype.getBoundingBox = function () {
        var pSrc = this._segPoints[0];
        var pDst = this._segPoints[this._segPoints.length - 1];

        var bBox = { "x": Math.min(pSrc.x, pDst.x),
               "y": Math.min(pSrc.y, pDst.y),
               "x2": Math.max(pSrc.x, pDst.x),
               "y2": Math.max(pSrc.y, pDst.y),
               "width": 0,
               "height": 0 };

        bBox.width = bBox.x2 - bBox.x;
        bBox.height = bBox.y2 - bBox.y;

        return bBox;
    };

    NetLabelConnection.prototype.onSelect = function (multiSelection) {

    };

    NetLabelConnection.prototype.onDeselect = function () {

    };

    NetLabelConnection.prototype.readOnlyMode = function (readOnly) {
        this._readOnly = readOnly;
        if (readOnly === true) {
            //this._setEditMode(false);
        }
    };

    /******************** HIGHLIGHT / UNHIGHLIGHT MODE *********************/
    NetLabelConnection.prototype.highlight = function () {

    };

    NetLabelConnection.prototype.unHighlight = function () {

    };

    NetLabelConnection.prototype.update = function (objDescriptor) {
        //read props coming from the DataBase or DiagramDesigner
        this._initializeConnectionProps(objDescriptor);
    };

    NetLabelConnection.prototype._renderTexts = function () {

    };

    //ONLY IF CONNECTION CAN BE DRAWN BETWEEN CONNECTIONS
    NetLabelConnection.prototype.getConnectionAreas = function (id, isEnd) {
        var result = [];

        return result;
    };

    NetLabelConnection.prototype.showSourceConnectors = function (params) {
    };

    NetLabelConnection.prototype.hideSourceConnectors = function () {
    };

    NetLabelConnection.prototype.showEndConnectors = function () {
    };

    NetLabelConnection.prototype.hideEndConnectors = function () {
    };
    //END OF --- ONLY IF CONNECTION CAN BE DRAWN BETWEEN CONNECTIONS

    return NetLabelConnection;
});