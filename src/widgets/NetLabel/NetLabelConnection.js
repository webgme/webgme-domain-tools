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
        var self = this;
        //this.paper   is a RaphaelJS papers
        this._segPoints = segPoints.slice(0);
//        var _toolTipBase = $('<div class="port_info"><span class="class_name">CLASS NAME</span><span class="name">NAME</span></div>');
        var _toolTipBaseSrc = $('<div class="connList" style="width: 100px; height: 100px;"></div>');
        var _toolTipBaseDst = $('<div class="connList" style="width: 100px; height: 100px;"></div>');
        _toolTipBase.css({"position": "absolute",
            "top": this.srcPos.y,
            "left": this.srcPos.x});

        _toolTipBase.html(this.srcText + " " + this.dstText);
        self.diagramDesigner.skinParts.$itemsContainer.append(_toolTipBase);
        self.logger.warning(this.srcText);
        self.logger.warning(this.dstText);

//        self.logger.error("!!!! CONNECTION DRAWING NOT YET IMPLEMENTED: " + JSON.stringify(segPoints));


    };

    NetLabelConnection.prototype._initializeConnectionProps = function (objDescriptor) {
        this.reconnectable = objDescriptor.reconnectable === true;
        this.editable = !!objDescriptor.editable;
        this.srcText = objDescriptor.srcText;
        this.dstText = objDescriptor.dstText;
        this.srcPos = objDescriptor.srcPos;
        this.dstPos = objDescriptor.dstPos;
        this.name = objDescriptor.name;/* || this.id;*/
        this.nameEdit = objDescriptor.nameEdit || false;
        this.srcTextEdit = objDescriptor.srcTextEdit || false;
        this.dstTextEdit = objDescriptor.dstTextEdit || false;

        this.segmentPoints = [];
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