/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 * 
 * Author: Robert Kereskenyi
 *         Dana Zhang
 */

define(['js/Widgets/DiagramDesigner/Connection',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Draggable',
    './NetLabelWidget.Mouse',
    './NetLabelWidget.Constants'], function (Connection, DiagramDesignerWidgetDraggable, NetLabelWidgetMouse, NetLabelWidgetConstants) {

    "use strict";

    var NetLabelConnection;

    NetLabelConnection = function (objId) {
        Connection.call(this, objId);
    };

    _.extend(NetLabelConnection.prototype, Connection.prototype);
    _.extend(NetLabelConnection.prototype, NetLabelWidgetMouse.prototype);

    NetLabelConnection.prototype.setConnectionRenderData = function (segPoints) {
        var self = this,
//            srcPos = self.srcSubCompId ? segPoints[0] : self.srcObjPos,
//            dstPos = self.dstSubCompId ? segPoints[segPoints.length - 1] : self.dstObjPos,
            srcPos = segPoints[0],
            dstPos = segPoints[segPoints.length - 1];

        // setting end connectors positions
        self.sourceCoordinates = { "x": -1,
            "y": -1};

        self.endCoordinates = { "x": -1,
            "y": -1};

        self.sourceCoordinates.x = srcPos.x;
        self.sourceCoordinates.y = srcPos.y;
        self.endCoordinates.x = dstPos.x;
        self.endCoordinates.y = dstPos.y;

        self._segPoints = segPoints.slice(0);


        self._createSrcLabel(self.sourceCoordinates.x, self.sourceCoordinates.y);
        self._createDstLabel(self.endCoordinates.x, self.endCoordinates.y);

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

    NetLabelConnection.prototype._netLabelListBase = $('<div class="connList"></div>');
    NetLabelConnection.prototype._netLabelBase = $('<div class="netLabel"></div>');
    NetLabelConnection.prototype._expandLabelBase = $('<div class="show-all-labels">...</div>');


    NetLabelConnection.prototype._initializeConnectionProps = function (objDescriptor) {
        this.reconnectable = objDescriptor.reconnectable === true;
        this.editable = !!objDescriptor.editable;
        this.name = objDescriptor.name;/* || this.id;*/
        this.nameEdit = objDescriptor.nameEdit || false;

        this.srcTextEdit = objDescriptor.srcTextEdit || false;
        this.dstTextEdit = objDescriptor.dstTextEdit || false;

        // getting relevant src & dst IDs
        this.srcObjId = objDescriptor.srcObjId; // designer item ID (etc 'I_')
        this.srcSubCompId = objDescriptor.srcSubCompId; // port ID, undefined if port nonexistent
        this.dstObjId = objDescriptor.dstObjId;
        this.dstSubCompId = objDescriptor.dstSubCompId;

        this.srcObj = objDescriptor.srcObj;
        this.dstObj = objDescriptor.dstObj;
        this.srcParentObj = objDescriptor.srcParentObj;
        this.dstParentObj = objDescriptor.dstParentObj;

        this.segmentPoints = [];
    };

    NetLabelConnection.prototype._createSrcLabel = function (x, y) {
        var self = this,
            srcID = self.srcSubCompId || self.srcObjId,
            dstID = self.dstSubCompId || self.dstObjId,
            srcPortLabelList = self.diagramDesigner.skinParts.$itemsContainer.find('[obj-id^="' + srcID + '"]')[0],
            srcPortLabel = self._netLabelBase.clone(),
            nbrOfSrcLabels = srcPortLabelList ? (srcPortLabelList.children ? srcPortLabelList.children.length : 0) : 0,
            expandLabel = self._expandLabelBase.clone()[0],
            srcText = self._getSrcText(),
            dstText = self._getDstText(),
            existingLabel,
            existingCollapseLabel,
            collapsed;

        // check if connLists need to be collapsed:
        if (nbrOfSrcLabels > 3 && !$(srcPortLabelList).find('.show-all-labels')[0]) {
            expandLabel.setAttribute('id', srcID);
            $(srcPortLabelList).append(expandLabel);
        }

        // create a label list for the src object or src port
        if (!srcPortLabelList) {
            srcPortLabelList = self._netLabelListBase.clone()[0];
//            srcPortLabelList.setAttribute("objName", srcText); // todo: srcText is the wrong value
            srcPortLabelList.setAttribute("obj-id", srcID); // used to highlight actual object
            srcPortLabelList.style.position = "absolute";
        }

        srcPortLabelList.style.left = x.toString() + "px";
        srcPortLabelList.style.top = y.toString() + "px";

        // this should be done by the decorator -- if name is negated, show overline
        if (dstText.indexOf('!') === 0) {
            srcPortLabel.text(dstText.slice(1));
            srcPortLabel.css("text-decoration", "overline");
        } else {
            srcPortLabel.text(dstText);
            srcPortLabel.css("text-decoration", "none");
        }

        srcPortLabel.attr('id', dstID);
        srcPortLabel.attr('connId', self.id);

        existingLabel = $(srcPortLabelList).find('[connid^="' + self.id + '"]')[0];
        // if dst of the current connection hasn't been added & not collapsed, add it to the list of src object & make it visible
        if (!existingLabel) {
            if (nbrOfSrcLabels > 3) {
                existingCollapseLabel = $(srcPortLabelList).find('.' + NetLabelWidgetConstants.NETLABEL_SHOW_ALL)[0];
                collapsed = existingCollapseLabel ? existingCollapseLabel.style.display === "none" : false;
                if (!collapsed) {
                    srcPortLabel.hide();
                }
            }
            $(srcPortLabelList).append(srcPortLabel);
            self.diagramDesigner.skinParts.$itemsContainer.append(srcPortLabelList);
        } else if (existingLabel.textContent !== dstText) {
            // handling the name update case
            existingLabel.textContent = dstText;
        }

        self.skinParts.srcNetLabel = $(srcPortLabelList).find('[connid^="' + self.id + '"]')[0];
    };

    NetLabelConnection.prototype._getSrcText = function () {
        var self = this,
            srcText,
            srcName = self.srcObj.getAttribute('name'),
            srcParentName = self.srcParentObj.getAttribute('name');

        srcText = self.srcSubCompId ? srcParentName + "." + srcName : srcName;

        return srcText;
    };

    NetLabelConnection.prototype._createDstLabel = function (x, y) {
        var self = this,
            srcID = self.srcSubCompId || self.srcObjId,
            dstID = self.dstSubCompId || self.dstObjId,
            dstPortLabelList = self.diagramDesigner.skinParts.$itemsContainer.find('[obj-id^="' + dstID + '"]')[0],
            dstPortLabel = self._netLabelBase.clone(),
            nbrOfDstLabels = dstPortLabelList ? (dstPortLabelList.children ? dstPortLabelList.children.length : 0) : 0,
            expandLabel = self._expandLabelBase.clone()[0],
            srcText = self._getSrcText(),
            dstText = self._getDstText(),
            existingLabel,
            existingCollapseLabel,
            collapsed,
            OFFSET = srcText.length >= 9 ? 80 : 20;

        if (nbrOfDstLabels > 3 && !$(dstPortLabelList).find('.show-all-labels')[0]) {
            expandLabel.setAttribute('id', dstID);
            $(dstPortLabelList).append(expandLabel);
        }


        // create a label list for the dst object or dst port
        if (!dstPortLabelList) {
            dstPortLabelList = self._netLabelListBase.clone()[0];
//            dstPortLabelList.setAttribute("objName", dstText);
            dstPortLabelList.setAttribute("obj-id", dstID);
            dstPortLabelList.style.position = "absolute";
        }

        dstPortLabelList.style.left = (x - OFFSET).toString() + "px";
        dstPortLabelList.style.top = y.toString() + "px";

        // this should be done by the decorator -- if name is negated, show overline
        if (srcText.indexOf('!') === 0) {
            dstPortLabel.text(srcText.slice(1));
            dstPortLabel.css('text-decoration', 'overline');
        } else {
            dstPortLabel.text(srcText);
            dstPortLabel.css('text-decoration', 'none');
        }

        // making the dstPortLabel
        dstPortLabel.attr('id', srcID);
        dstPortLabel.attr('connId', self.id);

        existingLabel = $(dstPortLabelList).find('[connid^="' + self.id + '"]')[0];
        // if src of the current connection hasn't been added, add it to the list of dst object
        if (!existingLabel) {
            if (nbrOfDstLabels > 3) {
                existingCollapseLabel = $(dstPortLabelList).find('.' + NetLabelWidgetConstants.NETLABEL_SHOW_ALL)[0];
                collapsed = existingCollapseLabel ? existingCollapseLabel.style.display === "none" : false;
                if (!collapsed) {
                    dstPortLabel.hide();
                }
            }
            $(dstPortLabelList).append(dstPortLabel);
            self.diagramDesigner.skinParts.$itemsContainer.append(dstPortLabelList);
        } else if (existingLabel.textContent !== srcText) {
            // handling the name update case
            existingLabel.textContent = srcText;
        }
        self.skinParts.dstNetLabel = $(dstPortLabelList).find('[connid^="' + self.id + '"]')[0];
    };

    NetLabelConnection.prototype._getDstText = function () {
        var self = this,
            dstText,
            dstName = self.dstObj.getAttribute('name'),
            dstParentName = self.dstParentObj.getAttribute('name');

        dstText = self.dstSubCompId ? dstParentName + "." + dstName : dstName;

        return dstText;
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

        if (this.skinParts.srcNetLabel.style.display === "none") {
            this._showAllLabels(this.skinParts.srcNetLabel);
        }

        if (this.skinParts.dstNetLabel.style.display === "none") {
            this._showAllLabels(this.skinParts.dstNetLabel);
        }

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
        var scale = Math.max(1, this.designerAttributes.width / 10);
        if (this.reconnectable) {
            if (this.srcSubCompId) {

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
                //resize connectors to connection width
                this.skinParts.srcDragPoint.css('transform', "scale(" + scale + "," + scale + ")");
            }

            if (this.dstSubCompId) {

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
                this.skinParts.dstDragPoint.css('transform', "scale(" + scale + "," + scale + ")");
            }

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
        var srcObj,
            dstObj;
        $(this.skinParts.srcNetLabel).addClass(NetLabelWidgetConstants.SRCLABEL_HIGHLIGHT_CLASS);
        $(this.skinParts.dstNetLabel).addClass(NetLabelWidgetConstants.DSTLABEL_HIGHLIGHT_CLASS);

        srcObj = this.diagramDesigner.items[this.srcObjId];
        dstObj = this.diagramDesigner.items[this.dstObjId];

        srcObj.$el.css('background-color', '#FFD6D6');
        dstObj.$el.css('background-color', '#CFFAFA');
    };

    NetLabelConnection.prototype.unHighlight = function () {
        var srcObj,
            dstObj;
        $(this.skinParts.srcNetLabel).removeClass(NetLabelWidgetConstants.SRCLABEL_HIGHLIGHT_CLASS);
        $(this.skinParts.dstNetLabel).removeClass(NetLabelWidgetConstants.DSTLABEL_HIGHLIGHT_CLASS);

        srcObj = this.diagramDesigner.items[this.srcObjId];
        dstObj = this.diagramDesigner.items[this.dstObjId];
        srcObj.$el.css('background-color', 'initial');
        dstObj.$el.css('background-color', 'initial');
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