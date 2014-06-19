/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 * 
 * Author: Robert Kereskenyi
 *         Dana Zhang
 */

"use strict";

define(['js/Widgets/DiagramDesigner/Connection',
    './NetLabelWidget.Constants',
    'js/Constants'], function (Connection, NetLabelWidgetConstants, CONSTANTS) {

    var NetLabelConnection;

    NetLabelConnection = function (objId) {
        Connection.call(this, objId);
    };

    _.extend(NetLabelConnection.prototype, Connection.prototype);

    NetLabelConnection.prototype.setConnectionRenderData = function (segPoints) {
        var self = this,
            netLabel = $('<div class="netLabel"></div>'),// todo: style the netlabels
            srcPortLabel = netLabel.clone(),
            dstPortLabel = netLabel.clone(),
            srcID = self._generateHash(self.srcID),
            dstID = self._generateHash(self.dstID),
            srcLabelID = self.srcID,
            dstLabelID = self.dstID,
            OFFSET = self.dstText.length >= 11 ? 60 : 20,
            srcXPos = segPoints[0].x,
            srcYPos = segPoints[0].y,
            dstXPos = segPoints[segPoints.length - 1].x - OFFSET,
            dstYPos = segPoints[segPoints.length - 1].y,
            srcPortLabelList = self.diagramDesigner.skinParts.$itemsContainer.find('[obj-gmeid^="' + srcID + '"]')[0],
            dstPortLabelList = self.diagramDesigner.skinParts.$itemsContainer.find('[obj-gmeid^="' + dstID + '"]')[0];

        self.sourceCoordinates = { "x": -1,
            "y": -1};

        self.endCoordinates = { "x": -1,
            "y": -1};

        self.sourceCoordinates.x = srcXPos;
        self.sourceCoordinates.y = srcYPos;
        self.endCoordinates.x = segPoints[segPoints.length - 1].x;
        self.endCoordinates.y = dstYPos;
        //this.paper   is a RaphaelJS papers
        self._segPoints = segPoints.slice(0);

        if (!srcPortLabelList) {
            // give it an id attr
            srcPortLabelList = self._toolTipBase.clone()[0];
            srcPortLabelList.setAttribute("id", self.id);
            srcPortLabelList.setAttribute("objName", self.srcText);
            srcPortLabelList.setAttribute("obj-gmeid", srcID); // used to highlight actual object
            // todo: style the objects with css style in separate file
            srcPortLabelList.style.position = "absolute";
        }
        srcPortLabelList.style.left = srcXPos.toString() + "px";
        srcPortLabelList.style.top = srcYPos.toString() + "px";

        srcPortLabel.text(self.dstText);
        srcPortLabel[0].setAttribute('id', dstLabelID);
        srcPortLabel[0].setAttribute('connId', self.connectionId);
        if (!$(srcPortLabelList).find('[id^="' + dstLabelID + '"]')[0]) {
            $(srcPortLabelList).append(srcPortLabel);
            self.diagramDesigner.skinParts.$itemsContainer.append(srcPortLabelList);
        }

        if (!dstPortLabelList) {
            dstPortLabelList = self._toolTipBase.clone()[0];
            dstPortLabelList.setAttribute("id", self.id);
            dstPortLabelList.setAttribute("objName", self.dstText);
            dstPortLabelList.setAttribute("obj-gmeid", dstID);
            dstPortLabelList.style.position = "absolute";
        }
        dstPortLabelList.style.left = dstXPos.toString() + "px";
        dstPortLabelList.style.top = dstYPos.toString() + "px";

        dstPortLabel.text(self.srcText);
        dstPortLabel[0].setAttribute('id', srcLabelID);
        dstPortLabel[0].setAttribute('connId', self.connectionId);

        if (!$(dstPortLabelList).find('[id^="' + srcLabelID + '"]')[0]) {
            $(dstPortLabelList).append(dstPortLabel);
            self.diagramDesigner.skinParts.$itemsContainer.append(dstPortLabelList);
        }
    };

    NetLabelConnection.prototype.destroy = function () {
        this._destroying = true;
        if (this.diagramDesigner) {

            this.diagramDesigner.skinParts.$itemsContainer.find('.' + NetLabelWidgetConstants.DESIGNER_CONNECTION_CLASS).remove();
            this.logger.debug("Destroyed");
        }
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

    // todo: implement this to create shadow for highlighted netlabel lists
    NetLabelConnection.prototype._createPathShadow = function (segPoints) {

    };
    NetLabelConnection.prototype._highlightPath = function () {

    };

    NetLabelConnection.prototype._toolTipBase = $('<div class="connList" style="width: auto; height: auto; border: 1px solid black; display: block; text-align: center"></div>');
    // max-height = 60 for displaying top 3 port only when nothing is selected; later on adjust height when selected
    NetLabelConnection.prototype._initializeConnectionProps = function (objDescriptor) {
        this.reconnectable = objDescriptor.reconnectable === true;
        this.editable = !!objDescriptor.editable;
        this.srcText = objDescriptor.srcText;
        this.dstText = objDescriptor.dstText;
        this.srcID = objDescriptor.srcID;
        this.dstID = objDescriptor.dstID;
        this.connectionId = objDescriptor.connectionId;
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
        var bBox = null;
//        bBox = { "x": NaN,
//            "y": NaN,
//            "x2": NaN,
//            "y2": NaN,
//            "width": 0,
//            "height": 0 };
        return bBox;
    };

    NetLabelConnection.prototype.onSelect = function (multiSelection) {

        this.selected = true;
        this.selectedInMultiSelection = multiSelection;

        this.showEndReconnectors();
        //in edit mode and when not participating in a multiple selection,
        //show endpoint connectors
        if (this.selectedInMultiSelection === true) {
            this._setEditMode(false);
        } else {
            //in edit mode and when not participating in a multiple selection,
            //show connectors
            if (this.diagramDesigner.mode === this.diagramDesigner.OPERATING_MODES.DESIGN) {
                this._setEditMode(false); // todo: set it to false for debugging purpose
            }
        }
    };

    NetLabelConnection.prototype._setEditMode = function (editMode) {
        if (this._readOnly === false && this._editMode !== editMode) {
            this._editMode = editMode;
            this.setConnectionRenderData(this._pathPoints);
            if (this._editMode === false) {
                this.hideEndReconnectors();
            }
        }
    };

    NetLabelConnection.prototype.onDeselect = function () {
        this.selected = false;
        this.selectedInMultiSelection = false;

        this.hideEndReconnectors();
        this._setEditMode(false);
    };

    NetLabelConnection.prototype.readOnlyMode = function (readOnly) {
        this._readOnly = readOnly;
        if (readOnly === true) {
            //this._setEditMode(false);
        }
    };

    NetLabelConnection.prototype.showEndReconnectors = function () {
        if (this.reconnectable) {
            //editor handle at src
            this.skinParts.srcDragPoint = this.skinParts.srcDragPoint || $('<div/>', {
                "data-end": NetLabelWidgetConstants.CONNECTION_END_SRC,
                "data-id": this.id,
                "class": NetLabelWidgetConstants.CONNECTION_DRAGGABLE_END_CLASS + " " + NetLabelWidgetConstants.CONNECTION_END_SRC
            });

            this.skinParts.srcDragPoint.css({"position": "absolute",
//                "background-color" : "red",
                "top": this.sourceCoordinates.y,
                "left": this.sourceCoordinates.x});

            this.diagramDesigner.skinParts.$itemsContainer.append(this.skinParts.srcDragPoint);


            this.skinParts.dstDragPoint = this.skinParts.dstDragPoint || $('<div/>', {
                "data-end": NetLabelWidgetConstants.CONNECTION_END_DST,
                "data-id": this.id,
                "class": NetLabelWidgetConstants.CONNECTION_DRAGGABLE_END_CLASS + " " + NetLabelWidgetConstants.CONNECTION_END_DST
            });

            this.skinParts.dstDragPoint.css({"position": "absolute",
//                "background-color" : "blue",
                "top": this.endCoordinates.y,
                "left": this.endCoordinates.x});

            this.diagramDesigner.skinParts.$itemsContainer.append(this.skinParts.dstDragPoint);

            //resize connectors to connection width
            var scale = Math.max(1, this.designerAttributes.width / 10); //10px is the width of the connector end
            this.skinParts.srcDragPoint.css('transform', "scale(" + scale + "," + scale + ")");
            this.skinParts.dstDragPoint.css('transform', "scale(" + scale + "," + scale + ")");
        } else {
            this.hideEndReconnectors();
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