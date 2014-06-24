/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 * 
 * Author: Robert Kereskenyi
 *         Dana Zhang
 */

define(['js/Widgets/DiagramDesigner/Connection',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Draggable',
    './NetLabelWidget.Constants'], function (Connection, DiagramDesignerWidgetDraggable, NetLabelWidgetConstants) {

    "use strict";

    var NetLabelConnection;

    NetLabelConnection = function (objId) {
        Connection.call(this, objId);
    };

    _.extend(NetLabelConnection.prototype, Connection.prototype);
    _.extend(NetLabelConnection.prototype, DiagramDesignerWidgetDraggable.prototype);

    NetLabelConnection.prototype.setConnectionRenderData = function (segPoints) {
        var self = this,
            netLabelList = $('<div class="connList"></div>'),
            netLabel = $('<div class="netLabel"></div>'),
            showAll = $('<div class="show-all-labels">...</div>'),
            srcPortLabel = netLabel.clone(),
            dstPortLabel = netLabel.clone(),
            srcID = self.srcSubCompId || self.srcObjId,
            dstID = self.dstSubCompId || self.dstObjId,
            OFFSET = self.srcText.length >= 9 ? 80 : 20,
//            srcPos = self.srcSubCompId ? segPoints[0] : self.srcObjPos,
//            dstPos = self.dstSubCompId ? segPoints[segPoints.length - 1] : self.dstObjPos,
            srcPos = segPoints[0],
            dstPos = segPoints[segPoints.length - 1],
            srcPortLabelList = self.diagramDesigner.skinParts.$itemsContainer.find('[obj-id^="' + srcID + '"]')[0],
            dstPortLabelList = self.diagramDesigner.skinParts.$itemsContainer.find('[obj-id^="' + dstID + '"]')[0],
            existingLabel,
            nbrOfSrcLabels = srcPortLabelList ? (srcPortLabelList.children ? srcPortLabelList.children.length : 0) : 0,
            nbrOfDstLabels = dstPortLabelList ? (dstPortLabelList.children ? dstPortLabelList.children.length : 0) : 0,
            existingCollapse,
            collapsed;

        // setting end connectors positions
        self.sourceCoordinates = { "x": -1,
            "y": -1};

        self.endCoordinates = { "x": -1,
            "y": -1};

        self.sourceCoordinates.x = srcPos.x;
        self.sourceCoordinates.y = srcPos.y;
        self.endCoordinates.x = dstPos.x;
        self.endCoordinates.y = dstPos.y;
        //this.paper   is a RaphaelJS papers
        self._segPoints = segPoints.slice(0);

        // check if connLists need to be collapsed:
        if (nbrOfSrcLabels > 3 && !$(srcPortLabelList).find('.show-all-labels')[0]) {
            var showallSrcLabels = showAll.clone()[0];
            showallSrcLabels.setAttribute('id', srcID);
            $(srcPortLabelList).append(showallSrcLabels);
        }
        if (nbrOfSrcLabels > 3 && !$(dstPortLabelList).find('.show-all-labels')[0]) {
            var showallDstLabels = showAll.clone()[0];
            showallSrcLabels.setAttribute('id', dstID);
            $(dstPortLabelList).append(showallDstLabels);
        }

        // create a label list for the src object or src port
        if (!srcPortLabelList) {
            srcPortLabelList = netLabelList.clone()[0];
            srcPortLabelList.setAttribute("objName", self.srcText);
            srcPortLabelList.setAttribute("obj-id", srcID); // used to highlight actual object
            srcPortLabelList.style.position = "absolute";
        }
        srcPortLabelList.style.left = self.sourceCoordinates.x.toString() + "px";
        srcPortLabelList.style.top = self.sourceCoordinates.y.toString() + "px";

        // this should be done by the decorator -- if name is negated, show overline
        if (self.dstText.indexOf('!') === 0) {
            srcPortLabel.text(self.dstText.slice(1));
            srcPortLabel.css("text-decoration", "overline");
        } else {
            srcPortLabel.text(self.dstText);
            srcPortLabel.css("text-decoration", "none");
        }

        srcPortLabel.attr('id', dstID);
        srcPortLabel.attr('connId', self.id);

        existingLabel = $(srcPortLabelList).find('[connid^="' + self.id + '"]')[0];
        // if dst of the current connection hasn't been added & not collapsed, add it to the list of src object & make it visible
        if (!existingLabel) {
            if (nbrOfSrcLabels > 3) {
                existingCollapse = $(srcPortLabelList).find('.' + NetLabelWidgetConstants.NETLABEL_SHOW_ALL)[0];
                collapsed = existingCollapse ? existingCollapse.style.display === "none" : false;
                if (!collapsed) {
                    srcPortLabel.hide();
                }
            }
            $(srcPortLabelList).append(srcPortLabel);
            self.diagramDesigner.skinParts.$itemsContainer.append(srcPortLabelList);
        }

        // create a label list for the dst object or dst port
        if (!dstPortLabelList) {
            dstPortLabelList = netLabelList.clone()[0];
            dstPortLabelList.setAttribute("objName", self.dstText);
            dstPortLabelList.setAttribute("obj-id", dstID);
            dstPortLabelList.style.position = "absolute";
        }

        dstPortLabelList.style.left = (self.endCoordinates.x - OFFSET).toString() + "px";
        dstPortLabelList.style.top = self.endCoordinates.y.toString() + "px";

        // this should be done by the decorator -- if name is negated, show overline
        if (self.srcText.indexOf('!') === 0) {
            dstPortLabel.text(self.srcText.slice(1));
            dstPortLabel.css('text-decoration', 'overline');
        } else {
            dstPortLabel.text(self.srcText);
            dstPortLabel.css('text-decoration', 'none');
        }

        dstPortLabel.attr('id', srcID);
        dstPortLabel.attr('connId', self.id);

        existingLabel = $(dstPortLabelList).find('[connid^="' + self.id + '"]')[0];
        // if src of the current connection hasn't been added, add it to the list of dst object
        if (!existingLabel) {
            if (nbrOfDstLabels > 3) {
                existingCollapse = $(dstPortLabelList).find('.' + NetLabelWidgetConstants.NETLABEL_SHOW_ALL)[0];
                collapsed = existingCollapse ? existingCollapse.style.display === "none" : false;
                if (!collapsed) {
                    dstPortLabel.hide();
                }
            }
            $(dstPortLabelList).append(dstPortLabel);
            self.diagramDesigner.skinParts.$itemsContainer.append(dstPortLabelList);
        }

        // create some globals
        self.skinParts.srcNetLabel = $(srcPortLabelList).find('[connid^="' + self.id + '"]')[0];
        self.skinParts.dstNetLabel = $(dstPortLabelList).find('[connid^="' + self.id + '"]')[0];
    };

    NetLabelConnection.prototype.destroy = function () {
        this._destroying = true;
        if (this.diagramDesigner) {

            this.diagramDesigner.skinParts.$itemsContainer.find('.' + NetLabelWidgetConstants.DESIGNER_CONNECTION_CLASS).remove();
            this.logger.debug("Destroyed");
        }
    };

    NetLabelConnection.prototype._createPathShadow = function (segPoints) {

    };
    NetLabelConnection.prototype._highlightPath = function () {

    };

    NetLabelConnection.prototype._toolTipBase = $('<div class="connList"></div>');
    // max-height = 60 for displaying top 3 port only when nothing is selected; later on adjust height when selected
    NetLabelConnection.prototype._initializeConnectionProps = function (objDescriptor) {
        this.reconnectable = objDescriptor.reconnectable === true;
        this.editable = !!objDescriptor.editable;
        this.srcText = objDescriptor.srcText;
        this.dstText = objDescriptor.dstText;
        this.name = objDescriptor.name;/* || this.id;*/
        this.nameEdit = objDescriptor.nameEdit || false;
        this.srcTextEdit = objDescriptor.srcTextEdit || false;
        this.dstTextEdit = objDescriptor.dstTextEdit || false;

        // getting relevant src & dst IDs
        this.srcObjId = objDescriptor.srcObjId; // designer item ID (etc 'I_')
        this.srcSubCompId = objDescriptor.srcSubCompId; // port ID, undefined if port nonexistent
        this.dstObjId = objDescriptor.dstObjId;
        this.dstSubCompId = objDescriptor.dstSubCompId;
        // getting src & dst object positions
        this.srcObjPos = objDescriptor.srcObjPos;
        this.dstObjPos = objDescriptor.dstObjPos;

        this.segmentPoints = [];
    };

    NetLabelConnection.prototype.getBoundingBox = function () {
        var bBox = null;
        bBox = { "x": 0,
            "y": 0,
            "x2": 0,
            "y2": 0,
            "width": 0,
            "height": 0 };
        return bBox;
    };

    NetLabelConnection.prototype.onSelect = function (multiSelection) {

        this.selected = true;
        this.selectedInMultiSelection = multiSelection;

        this.highlight();
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

        this.unHighlight();
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
                "class": NetLabelWidgetConstants.CONNECTION_DRAGGABLE_END_CLASS + " " + NetLabelWidgetConstants.CONNECTION_END_SRC +
                    " " + NetLabelWidgetConstants.DESIGNER_NETLABEL_CLASS
            });

            this.skinParts.srcDragPoint.css({"position": "absolute",
                "top": this.sourceCoordinates.y,
                "left": this.sourceCoordinates.x});

            this.diagramDesigner.skinParts.$itemsContainer.append(this.skinParts.srcDragPoint);


            this.skinParts.dstDragPoint = this.skinParts.dstDragPoint || $('<div/>', {
                "data-end": NetLabelWidgetConstants.CONNECTION_END_DST,
                "data-id": this.id,
                "class": NetLabelWidgetConstants.CONNECTION_DRAGGABLE_END_CLASS + " " + NetLabelWidgetConstants.CONNECTION_END_DST +
                    " " + NetLabelWidgetConstants.DESIGNER_NETLABEL_CLASS
            });

            this.skinParts.dstDragPoint.css({"position": "absolute",
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

    NetLabelConnection.prototype.hideEndReconnectors = function () {
        if (this.skinParts.srcDragPoint) {
            this.skinParts.srcDragPoint.empty();
            this.skinParts.srcDragPoint.remove();
            this.skinParts.srcDragPoint = null;
        }

        if (this.skinParts.dstDragPoint) {
            this.skinParts.dstDragPoint.empty();
            this.skinParts.dstDragPoint.remove();
            this.skinParts.dstDragPoint = null;
        }
    };

    /******************** HIGHLIGHT / UNHIGHLIGHT MODE *********************/
    NetLabelConnection.prototype.highlight = function () {

        $(this.skinParts.srcNetLabel).addClass(NetLabelWidgetConstants.SRCLABEL_HIGHLIGHT_CLASS);
        $(this.skinParts.dstNetLabel).addClass(NetLabelWidgetConstants.DSTLABEL_HIGHLIGHT_CLASS);
    };

    NetLabelConnection.prototype.unHighlight = function () {

        $(this.skinParts.srcNetLabel).removeClass(NetLabelWidgetConstants.SRCLABEL_HIGHLIGHT_CLASS);
        $(this.skinParts.dstNetLabel).removeClass(NetLabelWidgetConstants.DSTLABEL_HIGHLIGHT_CLASS);
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