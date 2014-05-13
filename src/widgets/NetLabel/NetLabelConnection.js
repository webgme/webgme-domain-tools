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
            netLabel = $('<div class="netLabel"></div>'),// todo: style the netlabels
            srcLabel = netLabel.clone(),
            srcID = self._generateHash(self.srcID),
            srcLabelID = 'L' + srcID,
            dstLabel = netLabel.clone(),
            dstID = self._generateHash(self.dstID),
            dstLabelID = 'L' + dstID,//self.id
            OFFSET = self.dstText.length >= 11 ? 60 : 20,
            srcXPos = segPoints[0].x,
            srcYPos = segPoints[0].y,
            dstXPos = segPoints[segPoints.length - 1].x - OFFSET,
            dstYPos = segPoints[segPoints.length - 1].y;

        //this.paper   is a RaphaelJS papers
        self._segPoints = segPoints.slice(0);
        var srcPort = self.diagramDesigner.skinParts.$itemsContainer.find('[obj-gmeid^="' + srcID + '"]')[0],
            dstPort = self.diagramDesigner.skinParts.$itemsContainer.find('[obj-gmeid^="' + dstID + '"]')[0];

        if (!srcPort) {
            // give it an id attr
//            srcPort = self._toolTipBase.clone()[0];
            srcPort = self._pathBase.clone()[0];
            srcPort.setAttribute("id", self.registeredSrcId);
            srcPort.setAttribute("objName", self.srcText);
            srcPort.setAttribute("obj-gmeid", srcID); // used to highlight actual object
            // style it
            // todo: style the objects with css style in separate file
            srcPort.style.position = "absolute";
        }
        srcPort.style.left = srcXPos.toString() + "px";
        srcPort.style.top = srcYPos.toString() + "px";

        dstLabel.text(self.dstText);
        dstLabel[0].setAttribute('id', dstLabelID);
        if (!$(srcPort).find('#' + dstLabelID)[0]) {
            $(srcPort).append(dstLabel);
            self.diagramDesigner.skinParts.$itemsContainer.append(srcPort);
        }

        if (!dstPort) {
//            dstPort = self._toolTipBase.clone()[0];
            dstPort = self._pathBase.clone()[0];
            dstPort.setAttribute("id", self.registeredDstId);
            dstPort.setAttribute("objName", self.dstText);
            dstPort.setAttribute("obj-gmeid", dstID);
            dstPort.style.position = "absolute";
        }
        dstPort.style.left = dstXPos.toString() + "px";
        dstPort.style.top = dstYPos.toString() + "px";

        srcLabel.text(self.srcText);
        srcLabel[0].setAttribute('id', srcLabelID);
        if (!$(dstPort).find('#' + srcLabelID)[0]) {
            $(dstPort).append(srcLabel);
            self.diagramDesigner.skinParts.$itemsContainer.append(dstPort);
        }
    };

    NetLabelConnection.prototype.destroy = function () {
        this._destroying = true;
        this.diagramDesigner.skinParts.$itemsContainer.find('.designer-connection').remove();
        this.logger.debug("Destroyed");
    };

    NetLabelConnection.prototype._generateHash = function (str) {
        var hash = 0,
            i,
            chr;
        for (i = 0; i < str.length; i += 1) {
            chr   = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    NetLabelConnection.prototype._pathBase = $('<path fill="none" stroke="#b9dcf7" d="M815.5,274.5L886.5,274.5L886.5,413.5L1026.5,413.5" class="designer-connection" stroke-width="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); "></path>');
    NetLabelConnection.prototype._toolTipBase = $('<div class="connList" style="width: auto; height: auto; border: 1px solid black; display: block; text-align: center"></div>');
    // max-height = 60 for displaying top 3 port only when nothing is selected; later on adjust height when selected
    NetLabelConnection.prototype._initializeConnectionProps = function (objDescriptor) {
//        this.diagramDesigner.skinParts.$itemsContainer.find('.designer-connection').remove();
        this.reconnectable = objDescriptor.reconnectable === true;
        this.editable = !!objDescriptor.editable;
        this.srcText = objDescriptor.srcText;
        this.dstText = objDescriptor.dstText;
        this.srcID = objDescriptor.srcID;
        this.dstID = objDescriptor.dstID;
        this.registeredSrcId = objDescriptor.registeredSrcId;
        this.registeredDstId = objDescriptor.registeredDstId;
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

        this.selected = true;
        this.selectedInMultiSelection = multiSelection;

        this._highlightPath();

        //in edit mode and when not participating in a multiple selection,
        //show endpoint connectors
        if (this.selectedInMultiSelection === true) {
            this._setEditMode(false);
        } else {
            //in edit mode and when not participating in a multiple selection,
            //show connectors
            if (this.diagramDesigner.mode === this.diagramDesigner.OPERATING_MODES.DESIGN) {
                this._setEditMode(true);
            }
        }
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