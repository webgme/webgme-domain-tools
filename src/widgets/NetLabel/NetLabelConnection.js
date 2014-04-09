/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 * 
 * Author: Robert Kereskenyi
 */

"use strict";

define(['js/Widgets/DiagramDesigner/Connection'], function (Connection) {

    var NetLabelConnection;

    NetLabelConnection = function (objId) {
        Connection.call(this, objId);
    };

    _.extend(NetLabelConnection.prototype, Connection.prototype);

    NetLabelConnection.prototype.setConnectionRenderData = function (segPoints) {

        this._segPoints = segPoints.slice(0);

        //this.paper   is a RaphaelJS paper
        //this.diagramDesigner.skinParts.$itemsContainer ---- HTML EL


        this.logger.error("!!!! CONNECTION DRAWING NOT YET IMPLEMENTED: " + JSON.stringify(segPoints));


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