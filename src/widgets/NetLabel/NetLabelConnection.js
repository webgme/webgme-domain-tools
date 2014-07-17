/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 * 
 * Author: Robert Kereskenyi
 *         Dana Zhang
 */

define(['js/Widgets/DiagramDesigner/Connection',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Draggable',
    './NetLabelWidget.Constants',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants'], function (Connection,
                                                                             DiagramDesignerWidgetDraggable,
                                                                             NetLabelWidgetConstants,
                                                                             DiagramDesignerWidgetConstants) {

    "use strict";

    var NetLabelConnection,
        TEXT_OFFSET = 15,
        TEXT_ID_PREFIX = "t_",
        DATA_ID = 'data-id',
        MIN_WIDTH_NOT_TO_NEED_SHADOW = 5,
        CONNECTION_DEFAULT_WIDTH = 1,
        CONNECTION_DEFAULT_COLOR = "#000000",
        CONNECTION_DEFAULT_PATTERN = DiagramDesignerWidgetConstants.LINE_PATTERNS.SOLID,
        CONNECTION_NO_END = DiagramDesignerWidgetConstants.LINE_ARROWS.NONE,
        CONNECTION_DEFAULT_END = CONNECTION_NO_END,
        CONNECTION_SHADOW_DEFAULT_OPACITY = 0,
        CONNECTION_SHADOW_DEFAULT_WIDTH = 5,
        CONNECTION_SHADOW_DEFAULT_OPACITY_WHEN_SELECTED = 1,
        CONNECTION_SHADOW_DEFAULT_COLOR = "#B9DCF7",
        CONNECTION_DEFAULT_LINE_TYPE = DiagramDesignerWidgetConstants.LINE_TYPES.NONE,
        SHADOW_MARKER_SIZE_INCREMENT = 3,
        SHADOW_MARKER_SIZE_INCREMENT_X = 1;

    NetLabelConnection = function (objId) {
        Connection.call(this, objId);
    };

    _.extend(NetLabelConnection.prototype, Connection.prototype);

    NetLabelConnection.prototype.setConnectionRenderData = function (segPoints) {
        var self = this,
            srcPos = segPoints[0],
            dstPos = segPoints[segPoints.length - 1],
            _removeExistingConnection, // fn
            _removeExistingLabels; // fn

        _removeExistingConnection = function () {

            var pathID = DiagramDesignerWidgetConstants.PATH_SHADOW_ID_PREFIX + self.id,
                textID = TEXT_ID_PREFIX + self.id,
                connID = self.id;

            self.diagramDesigner.skinParts.$itemsContainer.find('[id^="' + pathID + '"]').remove();
            self.diagramDesigner.skinParts.$itemsContainer.find('[id^="' + connID + '"]').remove();
            self.diagramDesigner.skinParts.$itemsContainer.find('[id^="' + textID + '"]').remove();
            self.diagramDesigner.skinParts.$itemsContainer.find('[' + DATA_ID + '^="' + connID + '"]').remove(); // dragpoints
            self.skinParts.path = null;
            self.skinParts.pathShadow = null;
            self.pathDef = null;
        };

        _removeExistingLabels = function () {
            var connID = self.id,
                srcID = self.srcSubCompId || self.srcObjId,
                dstID = self.dstSubCompId || self.dstObjId,
                pathID,
                srcNetlist = self.diagramDesigner.skinParts.$itemsContainer.find('[obj-id^="' + srcID + '"]')[0],
                dstNetlist = self.diagramDesigner.skinParts.$itemsContainer.find('[obj-id^="' + dstID + '"]')[0],
                nbrOfConns,
                text;

            if (srcNetlist) {
                if (srcNetlist.childElementCount === 1) {
                    $(srcNetlist).remove();
                    pathID = DiagramDesignerWidgetConstants.PATH_SHADOW_ID_PREFIX + srcID;
                    self.diagramDesigner.skinParts.$itemsContainer.find('[id^="' + pathID + '"]').remove();
                } else {
                    nbrOfConns = srcNetlist.childElementCount - 1;
                    text = nbrOfConns === 1 ? (nbrOfConns + ' connection') : (nbrOfConns + ' connections');

                    $(srcNetlist).find('.' + NetLabelWidgetConstants.NETLIST_TITLE)[0].textContent = text;
                }

                self.srcLabelDetached = $(srcNetlist).find('[connid^="' + connID + '"]').detach();
            }

            if (dstNetlist) {
                if (dstNetlist.childElementCount === 1) {
                    $(dstNetlist).remove();
                    pathID = DiagramDesignerWidgetConstants.PATH_SHADOW_ID_PREFIX + dstID;
                    self.diagramDesigner.skinParts.$itemsContainer.find('[id^="' + pathID + '"]').remove();
                } else {
                    nbrOfConns = dstNetlist.childElementCount - 1;
                    text = nbrOfConns === 1 ? (nbrOfConns + ' connection') : (nbrOfConns + ' connections');

                    $(dstNetlist).find('.' + NetLabelWidgetConstants.NETLIST_TITLE)[0].textContent = text;
                }
                self.dstLabelDetached = $(dstNetlist).find('[connid^="' + connID + '"]').detach();
            }

            self.unHighlight();
        };

        // setting end connectors positions
        self.sourceCoordinates = { "x": srcPos.x,
            "y": srcPos.y};

        self.endCoordinates = { "x": dstPos.x,
            "y": dstPos.y};

        self._segPoints = segPoints.slice(0);
        self._pathPoints = segPoints;

        if (self.showAsLabel) {

            _removeExistingConnection();
            self.setNetRenderData(segPoints);
        } else {

            _removeExistingLabels();
            self.setLineConnectionRenderData(segPoints);
        }

        self._renderEndReconnectors();
    };

    NetLabelConnection.prototype.setNetRenderData = function (segPoints) {
        var srcID = this.srcSubCompId || this.srcObjId,
            dstID = this.dstSubCompId || this.dstObjId,
            srcPathDef = [],
            dstPathDef = [],
            p,
            lastP,
            validPath = segPoints && segPoints.length > 1,
            srcPortLabelList,
            dstPortLabelList;

        if (validPath) {
            // SRC DATA
            srcPortLabelList = this._createSrcNet(srcID, dstID);
            p = segPoints[0]; // src-start
            lastP = segPoints[1]; // src-end
            srcPathDef = this._getPathDef(p, lastP);

            // DST DATA
            dstPortLabelList = this._createDstNet(srcID, dstID);
            p  = segPoints[segPoints.length - 1]; // dst-start
            lastP = segPoints[segPoints.length - 2]; // dst-end
            dstPathDef = this._getPathDef(p, lastP);

            this._renderSrcTexts(srcPortLabelList, srcPathDef);
            this._renderDstTexts(dstPortLabelList, dstPathDef);

        } else {
            this._removePath();
            this._hideAllTexts();
        }
    };

    NetLabelConnection.prototype._netLabelListBase = $('<div class="netlist"><div class="title-container"><div class="add-conn">+</div><div class="title"></div></div></div>');
    NetLabelConnection.prototype._netLabelBase = $('<div class="netLabel"></div>');

    /** CREATE SRC NET LIST **/
    NetLabelConnection.prototype._createSrcNet = function (srcID, dstID) {
        var self = this,
            srcPortLabelList = self.diagramDesigner.skinParts.$itemsContainer.find('[obj-id^="' + srcID + '"]')[0],
            srcPortLabel = self._netLabelBase.clone(),
            dstText = self._getDstText(),
            existingLabel,
            _createNetlist, // fn
            _createLabel, // fn
            _updateText; // fn

        _createNetlist = function () {
            // create a label list for the src object or src port
            if (!srcPortLabelList) {
                srcPortLabelList = self._netLabelListBase.clone()[0];
                srcPortLabelList.setAttribute("obj-id", srcID); // used to highlight actual object
                $(srcPortLabelList).find('.' + NetLabelWidgetConstants.NETLIST_TITLE).text('connections'); // todo: this can go in peace
                $(srcPortLabelList).find('.' + NetLabelWidgetConstants.NETLIST_TITLE).attr(NetLabelWidgetConstants.NETLIST_ID, srcID);
            }
        };

        _createLabel = function () {

            srcPortLabel.attr(NetLabelWidgetConstants.NETLIST_ID, dstID);
            srcPortLabel.attr(NetLabelWidgetConstants.CONNECTION_ID, self.id);
            if (!self.selected) {
                srcPortLabel.css('display', 'none');
            }
            // if show as label and connection name is different than default name, set netlabel name to new name
            if (self.name !== self.defaultName) {
                srcPortLabel.text(self.name);
            } else {
                srcPortLabel.text(dstText);
            }
        };

        _updateText = function () {
            var title,
                nbrOfConns = srcPortLabelList.childElementCount - 1;
            title = $(srcPortLabelList).find('.' + NetLabelWidgetConstants.NETLIST_TITLE);
            if (nbrOfConns === 1) {
                title.text(nbrOfConns + " connection");
            } else {
                title.text(nbrOfConns + " connections");
            }
        };


        _createNetlist();

        // appending label
        if (self.srcLabelDetached) {
            $(srcPortLabelList).append(self.srcLabelDetached[0]);
            _updateText();

        } else {
            existingLabel = $(srcPortLabelList).find('[connid^="' + self.id + '"]')[0];
            // if dst of the current connection hasn't been added & not collapsed, add it to the list of src object & make it visible
            // if show as label and connection name is different than default name, set netlabel name to new name
            if (!existingLabel) {
                _createLabel();
                $(srcPortLabelList).append(srcPortLabel);
                _updateText();

            } else {
                if (self.name !== self.defaultName) {
                    existingLabel.textContent = self.name;
                } else if (existingLabel.textContent !== dstText) {
                    // handling the name update case
                    existingLabel.textContent = dstText;
                }
            }
        }

        self.skinParts.srcNetLabel = $(srcPortLabelList).find('[connid^="' + self.id + '"]')[0];

        return srcPortLabelList;
    };

    NetLabelConnection.prototype._getSrcText = function () {
        var self = this,
            srcText,
            srcName = self.srcObj.getAttribute('name'),
            srcParentName = self.srcParentObj.getAttribute('name');

        srcText = self.srcSubCompId ? srcParentName + "." + srcName : srcName;

        return srcText;
    };

    NetLabelConnection.prototype._netlistContainer = $('<div class="netlist-container"></div>');

    NetLabelConnection.prototype._renderSrcTexts = function (srcPortLabelList, pathDef) {
        var objID = srcPortLabelList.attributes['obj-id'].value,
            id = TEXT_ID_PREFIX + objID,
            pathID = DiagramDesignerWidgetConstants.PATH_SHADOW_ID_PREFIX + objID,
            pathCenter = {},
            newPathDef;

        this._hideSrcTexts();

        pathCenter.x = (pathDef.x1 + pathDef.x2) / 2;
        pathCenter.y = (pathDef.y1 + pathDef.y2) / 2;


        this.skinParts.textContainer1 = this.diagramDesigner.skinParts.$itemsContainer.find('[id^="' + id + '"]')[0];

        if (!this.skinParts.textContainer1) {

            this.skinParts.textContainer1 = this._netlistContainer.clone();
            this.skinParts.textContainer1.css({ 'top': pathCenter.y - TEXT_OFFSET,
                'left': pathCenter.x});
            this.skinParts.textContainer1.attr(NetLabelWidgetConstants.NETLIST_ID, id);
            this.skinParts.textContainer1.append(srcPortLabelList);
            $(this.diagramDesigner.skinParts.$itemsContainer.children()[0]).after(this.skinParts.textContainer1);
        } else {
            $(this.skinParts.textContainer1).css({ 'top': pathCenter.y - TEXT_OFFSET,
                'left': pathCenter.x});
        }

        // remove previous lines drawn for this component/sub-component
        this._removeExistingPath(pathID);
        //construct the SVG path definition from pathDef
        newPathDef = this._getPathDefFromPointObject(pathDef);
        /*CREATE PATH*/
        this.skinParts.srcPath = this.paper.path(newPathDef);

        $(this.skinParts.srcPath.node).attr({"id": pathID,
            "class": NetLabelWidgetConstants.NETLIST});

    };

    /** CREATE DST NET LIST **/
    NetLabelConnection.prototype._createDstNet = function (srcID, dstID) {
        var self = this,
            dstPortLabelList = self.diagramDesigner.skinParts.$itemsContainer.find('[obj-id^="' + dstID + '"]')[0],
            dstPortLabel = self._netLabelBase.clone(),
            srcText = self._getSrcText(),
            existingLabel,
            _createNetlist, // fn
            _createLabel, // fn
            _updateText; // fn


        _createNetlist = function () {
            // create a label list for the dst object or dst port
            if (!dstPortLabelList) {
                dstPortLabelList = self._netLabelListBase.clone()[0];
                dstPortLabelList.setAttribute("obj-id", dstID);
                $(dstPortLabelList).find('.' + NetLabelWidgetConstants.NETLIST_TITLE).text('connections');
                $(dstPortLabelList).find('.' + NetLabelWidgetConstants.NETLIST_TITLE).attr(NetLabelWidgetConstants.NETLIST_ID, dstID);
            }
        };

        _createLabel = function () {
            // making the dstPortLabel
            dstPortLabel.attr(NetLabelWidgetConstants.NETLIST_ID, srcID);
            dstPortLabel.attr(NetLabelWidgetConstants.CONNECTION_ID, self.id);
            if (!self.selected) {
                dstPortLabel.css('display', 'none');
            }
            // if show as label and connection name is different than default name, set netlabel name to new name
            if (self.name !== self.defaultName) {
                dstPortLabel.text(self.name);
            } else {
                dstPortLabel.text(srcText);
            }
        };

        _updateText = function () {
            var title,
                nbrOfConns = dstPortLabelList.childElementCount - 1;
            title = $(dstPortLabelList).find('.' + NetLabelWidgetConstants.NETLIST_TITLE);
            if (nbrOfConns === 1) {
                title.text(nbrOfConns + " connection");
            } else {
                title.text(nbrOfConns + " connections");
            }
        };

        _createNetlist();

        if (self.dstLabelDetached) {

            $(dstPortLabelList).append(self.dstLabelDetached[0]);
            _updateText();
        } else {
            existingLabel = $(dstPortLabelList).find('[connid^="' + self.id + '"]')[0];
            // if src of the current connection hasn't been added, add it to the list of dst object
            if (!existingLabel) {
                _createLabel();
                $(dstPortLabelList).append(dstPortLabel);
                _updateText();

            } else {
                if (self.name !== self.defaultName) {
                    existingLabel.textContent = self.name;
                }
                else if (existingLabel.textContent !== srcText) {
                    // handling the name update case
                    existingLabel.textContent = srcText;
                }
            }
        }

        self.skinParts.dstNetLabel = $(dstPortLabelList).find('[connid^="' + self.id + '"]')[0];

        return dstPortLabelList;
    };

    NetLabelConnection.prototype._getDstText = function () {
        var self = this,
            dstText,
            dstName = self.dstObj.getAttribute('name'),
            dstParentName = self.dstParentObj.getAttribute('name');

        dstText = self.dstSubCompId ? dstParentName + "." + dstName : dstName;

        return dstText;
    };

    NetLabelConnection.prototype._renderDstTexts = function (dstPortLabelList, pathDef) {
        var pathCenter = {},
            objID = dstPortLabelList.attributes['obj-id'].value,
            id = TEXT_ID_PREFIX + objID,
            pathID = DiagramDesignerWidgetConstants.PATH_SHADOW_ID_PREFIX + objID,
            newPathDef;

        this._hideDstTexts();

        pathCenter.x = (pathDef.x1 + pathDef.x2) / 2;
        pathCenter.y = (pathDef.y1 + pathDef.y2) / 2;


        this.skinParts.textContainer2 = this.diagramDesigner.skinParts.$itemsContainer.find('[id^="' + id + '"]')[0];
        if (!this.skinParts.textContainer2) {

            this.skinParts.textContainer2 = this._netlistContainer.clone();
            this.skinParts.textContainer2.css({ 'top': pathCenter.y - TEXT_OFFSET,
                'left': pathCenter.x});
            this.skinParts.textContainer2.attr(NetLabelWidgetConstants.NETLIST_ID, id);
            this.skinParts.textContainer2.append(dstPortLabelList);
            $(this.diagramDesigner.skinParts.$itemsContainer.children()[0]).after(this.skinParts.textContainer2);
        } else {
            $(this.skinParts.textContainer2).css({ 'top': pathCenter.y - TEXT_OFFSET,
                'left': pathCenter.x});
        }

        newPathDef = this._getPathDefFromPointObject(pathDef);
        this._removeExistingPath(pathID);
        this.logger.debug("Creating connection with ID: '" + id + "'");
        /*CREATE PATH*/
        this.skinParts.srcPath = this.paper.path(newPathDef);

        $(this.skinParts.srcPath.node).attr({"id": pathID,
            "class": NetLabelWidgetConstants.NETLIST});
    };

    NetLabelConnection.prototype._renderEndReconnectors = function () {
        //editor handle at src
        this.skinParts.srcDragPoint = this.skinParts.srcDragPoint || $('<div/>', {
            "data-end": NetLabelWidgetConstants.CONNECTION_END_SRC,
            "data-id": this.id,
            "class": NetLabelWidgetConstants.CONNECTION_DRAGGABLE_END_CLASS + " " + NetLabelWidgetConstants.CONNECTION_END_SRC +
                " " + NetLabelWidgetConstants.DESIGNER_NETLABEL_CLASS
        });

        //editor handle at dst
        this.skinParts.dstDragPoint = this.skinParts.dstDragPoint || $('<div/>', {
            "data-end": NetLabelWidgetConstants.CONNECTION_END_DST,
            "data-id": this.id,
            "class": NetLabelWidgetConstants.CONNECTION_DRAGGABLE_END_CLASS + " " + NetLabelWidgetConstants.CONNECTION_END_DST +
                " " + NetLabelWidgetConstants.DESIGNER_NETLABEL_CLASS
        });
    };

    /** CREATE REGULAR DESIGNER-CONNECTION **/
    NetLabelConnection.prototype.setLineConnectionRenderData = function (segPoints) {

        var i = 0,
            len,
            pathDef = [],
            p,
            lastP = { 'x': NaN,
                'y': NaN},
            points = [],
            validPath = segPoints && segPoints.length > 1,
            minX,
            minY,
            maxX,
            maxY;

        //remove edit features
        this._removeEditModePath();

        if (validPath) {
            //there is a points list given and has at least 2 points
            //remove the null points from the list (if any)
            i = len = segPoints.length;
            len--;
            while (i--) {
                if (segPoints[len - i]) {
                    p = this._fixXY(segPoints[len - i]);
                    if (lastP && (lastP.x !== p.x || lastP.y !== p.y)) {
                        points.push(p);
                        lastP = p;
                    }
                }
            }
        }

        this._simplifyTrivially(points);

        this.sourceCoordinates = { "x": -1,
            "y": -1};

        this.endCoordinates = { "x": -1,
            "y": -1};

        len = points.length;
        validPath = len > 1;

        if (validPath) {
            //there is at least 2 points given, good to draw

            this._pathPoints = points;

            //non-edit mode, one path builds the connection
            p = points[0];

            minX = maxX = p.x;
            minY = maxY = p.y;

            //store source coordinate
            this.sourceCoordinates.x = p.x;
            this.sourceCoordinates.y = p.y;

            i = points.length;
            while (i--) {
                p = points[i];
                minX = Math.min(minX, p.x);
                minY = Math.min(minY, p.y);
                maxX = Math.max(maxX, p.x);
                maxY = Math.max(maxY, p.y);
            }

            //save calculated bounding box
            this._pathPointsBBox.x = minX;
            this._pathPointsBBox.y = minY;
            this._pathPointsBBox.x2 = maxX;
            this._pathPointsBBox.y2 = maxY;

            //save endpoint coordinates
            p = points[points.length - 1];
            this.endCoordinates.x = p.x;
            this.endCoordinates.y = p.y;

            //construct the SVG path definition from path-points
            pathDef = this._getPathDefFromPoints(points);
            pathDef = this._jumpOnCrossings(pathDef);
            pathDef = pathDef.join(" ");

            //check if the prev pathDef is the same as the new
            //this way the redraw does not need to happen

            if (this.pathDef !== pathDef) {
                this.pathDef = pathDef;

                //calculate the steep of the curve at the beginning/end of path
                this._calculatePathStartEndAngle();

                if (this.skinParts.path) {
                    this.logger.debug("Redrawing connection with ID: '" + this.id + "'");
                    this.skinParts.path.attr({ "path": pathDef});
                    if (this.skinParts.pathShadow) {
                        this._updatePathShadow(this._pathPoints);
                    }
                } else {
                    this.logger.debug("Drawing connection with ID: '" + this.id + "'");
                    /*CREATE PATH*/
                    this.skinParts.path = this.paper.path(pathDef);

                    $(this.skinParts.path.node).attr({"id": this.id,
                        "class": DiagramDesignerWidgetConstants.DESIGNER_CONNECTION_CLASS});

                    this.skinParts.path.attr({ "arrow-start": this.designerAttributes.arrowStart,
                        "arrow-end": this.designerAttributes.arrowEnd,
                        "stroke": this.designerAttributes.color,
                        "stroke-width": this.designerAttributes.width,
                        "stroke-dasharray": this.designerAttributes.pattern});

                    if (this.designerAttributes.width < MIN_WIDTH_NOT_TO_NEED_SHADOW) {
                        this._createPathShadow(this._pathPoints);
                    }
                }
            }

            //in edit mode add edit features
            if (this._editMode === true) {
                this._drawEditModePath(points);
                //show connection end dragpoints
                this.showEndReconnectors();
            }

            this._showConnectionAreaMarker();

            this._renderTexts();
        } else {
            this.pathDef = null;
            this._removePath();
            this._removePathShadow();
            this._hideConnectionAreaMarker();
            this._hideTexts();
        }
    };

    NetLabelConnection.prototype.destroy = function () {
        this._destroying = true;
        if (this.diagramDesigner) {

            this.diagramDesigner.skinParts.$itemsContainer.find('.' + NetLabelWidgetConstants.NETLIST).remove();
            this._hideTexts();
            this._hideSrcTexts();
            this._hideDstTexts();
            this.logger.debug("Destroyed");

            this._removePath();
            this._removePathShadow();
        }
    };

    NetLabelConnection.prototype._hideAllTexts = function () {
        this._hideTexts();
        this._hideSrcTexts();
        this._hideDstTexts();
    };

    NetLabelConnection.prototype._hideSrcTexts = function () {
        if (this.skinParts.textContainer1) {
            this.skinParts.textContainer1.remove();
        }
    };

    NetLabelConnection.prototype._hideDstTexts = function () {

        if (this.skinParts.textContainer2) {
            this.skinParts.textContainer2.remove();
        }
    };

    NetLabelConnection.prototype._initialize = function (objDescriptor) {

        this.defaultName = objDescriptor.defaultName;
        /*MODELEDITORCONNECTION CONSTANTS***/
        this.diagramDesigner = objDescriptor.designerCanvas;

        this.skinParts = {};
        this.paper = this.diagramDesigner.skinParts.SVGPaper;

        this.reconnectable = false;

        this.selected = false;
        this.selectedInMultiSelection = false;

        this.designerAttributes = {};

        this._editMode = false;
        this._readOnly = false;

        //get segnment points
        this.segmentPoints = [];
        if (objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS]) {
            var fixedP;
            var len =  objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS].length;
            var cx, cy;
            for (var i = 0; i < len; i += 1) {
                fixedP = this._fixXY({'x': objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS][i][0],
                    'y': objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS][i][1]});
                cx = objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS][i].length > 2 ? objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS][i][2] : 0;
                cy = objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS][i].length > 2 ? objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS][i][3] : 0;
                this.segmentPoints.push([fixedP.x, fixedP.y, cx, cy]);
            }
        }

        if (objDescriptor.showAsLabel) {
            this._initializeConnectionProps(objDescriptor);
        } else {
            this._initializeLineConnectionProps(objDescriptor);
        }
    };

    NetLabelConnection.prototype._initializeLineConnectionProps = function (objDescriptor) {

        this._segmentPointMarkers = [];
        this._connectionEditSegments = [];

        this.name = objDescriptor.name;
        this.showAsLabel = objDescriptor.showAsLabel;

        this._pathPointsBBox = {'x': 0,
            'y': 0,
            'x2': 0,
            'y2': 0,
            'w': 0,
            'h': 0};

        this.reconnectable = objDescriptor.reconnectable === true;
        this.editable = !!objDescriptor.editable;

        this.isBezier = (objDescriptor[DiagramDesignerWidgetConstants.LINE_TYPE] || DiagramDesignerWidgetConstants.LINE_TYPES.NONE).toLowerCase() === DiagramDesignerWidgetConstants.LINE_TYPES.BEZIER;

        /*PathAttributes*/
        this.designerAttributes.arrowStart = objDescriptor[DiagramDesignerWidgetConstants.LINE_START_ARROW] || CONNECTION_DEFAULT_END;
        this.designerAttributes.arrowEnd = objDescriptor[DiagramDesignerWidgetConstants.LINE_END_ARROW] || CONNECTION_DEFAULT_END;
        this.designerAttributes.color = objDescriptor[DiagramDesignerWidgetConstants.LINE_COLOR] || CONNECTION_DEFAULT_COLOR;
        this.designerAttributes.width = parseInt(objDescriptor[DiagramDesignerWidgetConstants.LINE_WIDTH], 10) || CONNECTION_DEFAULT_WIDTH;
        this.designerAttributes.pattern = objDescriptor[DiagramDesignerWidgetConstants.LINE_PATTERN] || CONNECTION_DEFAULT_PATTERN
        this.designerAttributes.shadowWidth = this.designerAttributes.width + CONNECTION_SHADOW_DEFAULT_WIDTH - CONNECTION_DEFAULT_WIDTH;
        this.designerAttributes.shadowOpacity = CONNECTION_SHADOW_DEFAULT_OPACITY;
        this.designerAttributes.shadowOpacityWhenSelected = CONNECTION_SHADOW_DEFAULT_OPACITY_WHEN_SELECTED;
        this.designerAttributes.shadowColor = CONNECTION_SHADOW_DEFAULT_COLOR;
        this.designerAttributes.lineType = objDescriptor[DiagramDesignerWidgetConstants.LINE_TYPE] || CONNECTION_DEFAULT_LINE_TYPE;

        this.designerAttributes.shadowEndArrowWidth = this.designerAttributes.width + SHADOW_MARKER_SIZE_INCREMENT;
        if (this.designerAttributes.arrowStart.indexOf('-xx') !== -1 ||
            this.designerAttributes.arrowEnd.indexOf('-xx') !== -1 ||
            this.designerAttributes.arrowStart.indexOf('-x') !== -1 ||
            this.designerAttributes.arrowEnd.indexOf('-x') !== -1) {
            this.designerAttributes.shadowEndArrowWidth = this.designerAttributes.width + SHADOW_MARKER_SIZE_INCREMENT_X;
        }

        this.designerAttributes.shadowArrowStartAdjust = this._raphaelArrowAdjustForSizeToRefSize(this.designerAttributes.arrowStart, this.designerAttributes.shadowEndArrowWidth, this.designerAttributes.width, false);
        this.designerAttributes.shadowArrowEndAdjust = this._raphaelArrowAdjustForSizeToRefSize(this.designerAttributes.arrowEnd, this.designerAttributes.shadowEndArrowWidth, this.designerAttributes.width, true);

        this.srcText = objDescriptor.srcText;
        this.dstText = objDescriptor.dstText;
        this.nameEdit = objDescriptor.nameEdit || false;
        this.srcTextEdit = objDescriptor.srcTextEdit || false;
        this.dstTextEdit = objDescriptor.dstTextEdit || false;

        if (objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS]) {
            var fixedP;
            var len =  objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS].length;
            var cx, cy;
            for (var i = 0; i < len; i += 1) {
                fixedP = this._fixXY({'x': objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS][i][0],
                    'y': objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS][i][1]});
                cx = objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS][i].length > 2 ? objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS][i][2] : 0;
                cy = objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS][i].length > 2 ? objDescriptor[DiagramDesignerWidgetConstants.LINE_POINTS][i][3] : 0;
                this.segmentPoints.push([fixedP.x, fixedP.y, cx, cy]);
            }
        }
    };

    NetLabelConnection.prototype._initializeConnectionProps = function (objDescriptor) {

        this.name = objDescriptor.name;
        this.showAsLabel = objDescriptor.showAsLabel;

        this.reconnectable = objDescriptor.reconnectable === true;
        this.editable = !!objDescriptor.editable;
        this.showAsLabel = objDescriptor.showAsLabel;
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
    };

    NetLabelConnection.prototype.getBoundingBox = function () {
        var bBox,
            strokeWidthAdjust,
            dx,
            dy,
            shadowAdjust = 0,
            endMarkerBBox,
            bBoxPath,
            bPoints,
            len;

        if (this.showAsLabel) {
            bBox = { "x": 0,
                "y": 0,
                "x2": 0,
                "y2": 0,
                "width": 0,
                "height": 0 };
            return bBox;
        }

        //NOTE: getBBox will give back the bounding box of the original path without stroke-width and marker-ending information included
        if (this.skinParts.pathShadow) {
            bBoxPath = this.skinParts.pathShadow.getBBox();
            strokeWidthAdjust = this.designerAttributes.shadowWidth;
            shadowAdjust = this.designerAttributes.shadowArrowEndAdjust;
        } else if (this.skinParts.path) {
            bBoxPath = this.skinParts.path.getBBox();
            strokeWidthAdjust = this.designerAttributes.width;
        } else {
            bBoxPath = { "x": 0,
                "y": 0,
                "x2": 0,
                "y2": 0,
                "width": 0,
                "height": 0 };
        }

        //get a copy of bBoxPath
        //bBoxPath should not be touched because RaphaelJS reuses it unless the path is not redrawn
        bBox = { "x": bBoxPath.x,
            "y": bBoxPath.y,
            "x2": bBoxPath.x2,
            "y2": bBoxPath.y2,
            "width": bBoxPath.width,
            "height": bBoxPath.height };

        //calculate the marker-end size
        if (this.designerAttributes.arrowStart !== CONNECTION_NO_END) {
            bPoints = this._getRaphaelArrowEndBoundingPoints(this.designerAttributes.arrowStart, strokeWidthAdjust, this._pathStartAngle, false);

            dx = shadowAdjust * Math.cos(this._pathStartAngle);
            dy = shadowAdjust * Math.sin(this._pathStartAngle);

            endMarkerBBox = { "x": this.sourceCoordinates.x - dx,
                "y": this.sourceCoordinates.y - dy,
                "x2": this.sourceCoordinates.x - dx,
                "y2": this.sourceCoordinates.y - dy};


            len = bPoints.length;
            while (len--) {
                endMarkerBBox.x = Math.min(endMarkerBBox.x, this.sourceCoordinates.x - dx - bPoints[len].x);
                endMarkerBBox.y = Math.min(endMarkerBBox.y, this.sourceCoordinates.y - dy - bPoints[len].y);

                endMarkerBBox.x2 = Math.max(endMarkerBBox.x2, this.sourceCoordinates.x - dx - bPoints[len].x);
                endMarkerBBox.y2 = Math.max(endMarkerBBox.y2, this.sourceCoordinates.y - dy - bPoints[len].y);
            }
        }

        if (this.designerAttributes.arrowEnd !== CONNECTION_NO_END) {
            bPoints = this._getRaphaelArrowEndBoundingPoints(this.designerAttributes.arrowEnd, strokeWidthAdjust, this._pathEndAngle, true);

            dx = shadowAdjust * Math.cos(this._pathEndAngle) ;
            dy = shadowAdjust * Math.sin(this._pathEndAngle) ;

            endMarkerBBox = endMarkerBBox || { "x": this.endCoordinates.x + dx,
                "y": this.endCoordinates.y + dy,
                "x2": this.endCoordinates.x + dx,
                "y2": this.endCoordinates.y + dy};


            len = bPoints.length;
            while (len--) {
                endMarkerBBox.x = Math.min(endMarkerBBox.x, this.endCoordinates.x + dx + bPoints[len].x);
                endMarkerBBox.y = Math.min(endMarkerBBox.y, this.endCoordinates.y + dy + bPoints[len].y);

                endMarkerBBox.x2 = Math.max(endMarkerBBox.x2, this.endCoordinates.x + dx + bPoints[len].x);
                endMarkerBBox.y2 = Math.max(endMarkerBBox.y2, this.endCoordinates.y + dy + bPoints[len].y);
            }
        }

        //when the line is vertical or horizontal, its dimension information needs to be tweaked
        //otherwise height or width will be 0, no good for selection matching
        if (bBox.height === 0 && bBox.width !== 0) {
            bBox.height = strokeWidthAdjust;
            bBox.y -= strokeWidthAdjust / 2;
            bBox.y2 += strokeWidthAdjust / 2;
        } else if (bBox.height !== 0 && bBox.width === 0) {
            bBox.width = strokeWidthAdjust;
            bBox.x -= strokeWidthAdjust / 2;
            bBox.x2 += strokeWidthAdjust / 2;
        } else if (bBox.height !== 0 && bBox.width !== 0) {
            //check if sourceCoordinates and endCoordinates are closer are
            // TopLeft - TopRight - BottomLeft - BottomRight
            if (Math.abs(bBox.x - this.sourceCoordinates.x) < Math.abs(bBox.x - this.endCoordinates.x)) {
                //source is on the left
                bBox.x -= Math.abs(Math.cos(Math.PI / 2 - this._pathStartAngle) * strokeWidthAdjust / 2);
                //target is on the right
                bBox.x2 +=  Math.abs(Math.cos(Math.PI / 2 - this._pathEndAngle) * strokeWidthAdjust / 2);
            } else {
                //target is on the left
                bBox.x -=Math.abs(Math.cos(Math.PI / 2 - this._pathEndAngle) * strokeWidthAdjust / 2);
                //source is on the right
                bBox.x2 += Math.abs(Math.cos(Math.PI / 2 - this._pathStartAngle) * strokeWidthAdjust / 2);
            }

            if (Math.abs(bBox.y - this.sourceCoordinates.y) < Math.abs(bBox.y - this.endCoordinates.y)) {
                //source is on the top
                bBox.y -= Math.abs(Math.sin(Math.PI / 2 - this._pathStartAngle) * strokeWidthAdjust / 2);
                //target is on the bottom
                bBox.y2 += Math.abs(Math.sin(Math.PI / 2 - this._pathEndAngle) * strokeWidthAdjust / 2);
            } else {
                //target is on the top
                bBox.y -= Math.abs(Math.sin(Math.PI / 2 - this._pathEndAngle) * strokeWidthAdjust / 2);
                //source is on the bottom
                bBox.y2 += Math.abs(Math.sin(Math.PI / 2 - this._pathStartAngle) * strokeWidthAdjust / 2);
            }

            bBox.width = bBox.x2 - bBox.x;
            bBox.height = bBox.y2 - bBox.y;
        }

        //figure out the outermost bounding box for the path itself and the endmarkers
        endMarkerBBox = endMarkerBBox || bBox;
        bBox.x = Math.min(bBox.x, endMarkerBBox.x);
        bBox.y = Math.min(bBox.y, endMarkerBBox.y);
        bBox.x2 = Math.max(bBox.x2, endMarkerBBox.x2);
        bBox.y2 = Math.max(bBox.y2, endMarkerBBox.y2);
        bBox.width = bBox.x2 - bBox.x;
        bBox.height = bBox.y2 - bBox.y;

        //safety check
        if (isNaN(bBox.x)) {bBox.x = 0;}
        if (isNaN(bBox.y)) {bBox.y = 0;}
        if (isNaN(bBox.x2)) {bBox.x2 = 0;}
        if (isNaN(bBox.y2)) {bBox.y2 = 0;}
        if (isNaN(bBox.width)) {bBox.width = 0;}
        if (isNaN(bBox.height)) {bBox.height = 0;}

        return bBox;
    };

    NetLabelConnection.prototype.onSelect = function (multiSelection) {

        var self = this,
            parentNode,
            children,
            i,
            _showLabels; // fn

        _showLabels = function () {
            if (self.skinParts.srcNetLabel.style.display === "none") {
                parentNode = self.skinParts.srcNetLabel.parentNode;
                children = parentNode.childNodes;

                for (i = 1; i < children.length; i += 1) {
                    $(children[i]).show();
                    $(children[i]).addClass(NetLabelWidgetConstants.SHOW_MODE);
                }
            }

            if (self.skinParts.dstNetLabel.style.display === "none") {
                parentNode = self.skinParts.dstNetLabel.parentNode;
                children = parentNode.childNodes;

                for (i = 1; i < children.length; i += 1) {
                    $(children[i]).show();
                    $(children[i]).addClass(NetLabelWidgetConstants.SHOW_MODE);
                }
            }
        };

        this.selected = true;
        this.selectedInMultiSelection = multiSelection;

        if (this.showAsLabel) {
            _showLabels();
        } else {
            this._highlightPath();
        }

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

    NetLabelConnection.prototype.onDeselect = function () {
        var self = this,
            parentNode,
            children,
            i,
            _hideLabels; // fn

        _hideLabels = function () {
            parentNode = self.skinParts.srcNetLabel.parentNode;
            children = parentNode.childNodes;

            for (i = 1; i < children.length; i += 1) {
                $(children[i]).hide();
            }

            parentNode = self.skinParts.dstNetLabel.parentNode;
            children = parentNode.childNodes;

            for (i = 1; i < children.length; i += 1) {
                $(children[i]).hide();
            }
        };

        this.selected = false;
        this.selectedInMultiSelection = false;

        if (!this.showAsLabel) {

            this._unHighlightPath();
        }
//        if (this.showAsLabel) {
//            // todo: this would have worked but SelectionManager "if (idList.length > 1)" length > 1 check?
////            _hideLabels();
//        } else {
//            this._unHighlightPath();
//        }
        this.unHighlight();
        this.hideEndReconnectors();
        this._setEditMode(false);
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

    NetLabelConnection.prototype.readOnlyMode = function (readOnly) {
        this._readOnly = readOnly;
        if (readOnly === true) {
            //this._setEditMode(false);
        }
    };

    /**
     * Show src & dst end connectors of given connection
     * @param id - if undefined, one connection is selected; otherwise, a netlist is hovered over to show all other-end connectors
     */
    NetLabelConnection.prototype.showEndReconnectors = function (id) {
        var self = this,
            scale = Math.max(1, this.designerAttributes.width / 10),
            _showSrcEndReconnector, // fn
            _showDstEndReconnector; // fn

        _showSrcEndReconnector = function (text) {

            self.skinParts.srcDragPoint.css({"position": "absolute",
                "top": self.sourceCoordinates.y,
                "left": self.sourceCoordinates.x});

            self.diagramDesigner.skinParts.$itemsContainer.append(self.skinParts.srcDragPoint);
            //resize connectors to connection width
            self.skinParts.srcDragPoint.css('transform', "scale(" + scale + "," + scale + ")");
            if (text) {

                self.skinParts.srcDragPoint.text(text);
                self.skinParts.srcDragPoint.css('background-color', 'white');
            } else {
                $(self.skinParts.srcDragPoint).addClass(NetLabelWidgetConstants.HIGHLIGHT_CLASS);
            }
        };

        _showDstEndReconnector = function (text) {

            self.skinParts.dstDragPoint.css({"position": "absolute",
                "top": self.endCoordinates.y,
                "left": self.endCoordinates.x});

            self.diagramDesigner.skinParts.$itemsContainer.append(self.skinParts.dstDragPoint);
            //resize connectors to connection width
            self.skinParts.dstDragPoint.css('transform', "scale(" + scale + "," + scale + ")");
            if (text) {

                self.skinParts.dstDragPoint.text(text);
                self.skinParts.dstDragPoint.css('background-color', 'white');
            } else {
                $(self.skinParts.dstDragPoint).addClass(NetLabelWidgetConstants.HIGHLIGHT_CLASS);
            }
        };

        if (self.reconnectable) {

            // if id is defined, don't do anything to object with given id
            if (id) {
                // if srcObj has given id, then highlight dstObj or show dstSubComp
                if (self.srcObjId === id || self.srcSubCompId === id) {
                    if (self.dstSubCompId) {
                        _showDstEndReconnector();
                    } else {
                        self._highlightDst();
                    }
                } else if (self.dstObjId === id || self.dstSubCompId === id) {
                    if (self.srcSubCompId) {
                        _showSrcEndReconnector();
                    } else {
                        self._highlightSrc();
                    }
                }
            } else {
                if (self.showAsLabel) {
                    if (self.srcSubCompId) {
                        _showSrcEndReconnector();
                    }

                    if (self.dstSubCompId) {
                        _showDstEndReconnector();
                    }

                    self.highlight();

                } else {
                    _showSrcEndReconnector('S');
                    _showDstEndReconnector('D');
                }
            }
            this._toggleHighlightClass('add');

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

        this._renderEndReconnectors();
        if (this.showAsLabel) {

            this.unHighlight();
        }
        this._toggleHighlightClass('remove');
    };

    /******************** HIGHLIGHT / UNHIGHLIGHT MODE *********************/
    NetLabelConnection.prototype.highlight = function () {
        this._highlightSrc();
        this._highlightDst();
    };

    NetLabelConnection.prototype.unHighlight = function () {
        var srcObj,
            dstObj;

        srcObj = this.diagramDesigner.items[this.srcObjId];
        dstObj = this.diagramDesigner.items[this.dstObjId];
        if (srcObj) {
            srcObj.$el.removeClass(NetLabelWidgetConstants.SRCLABEL_HIGHLIGHT_CLASS);
        }
        if (dstObj) {
            dstObj.$el.removeClass(NetLabelWidgetConstants.DSTLABEL_HIGHLIGHT_CLASS);
        }
    };

    NetLabelConnection.prototype.update = function (objDescriptor) {
        if (objDescriptor.showAsLabel) {
            this._initializeConnectionProps(objDescriptor);
        } else {
            this._initializeLineConnectionProps(objDescriptor);
        }
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

    //END OF --- ONLY IF CONNECTION CAN BE DRAWN BETWEEN CONNECTIONS

    /** HELPER FUNCTIONS **/
    NetLabelConnection.prototype._getPathDef = function (p, lastP) {
        var pathDef;

        pathDef = {'x1': p.x,
            'y1': p.y,
            'x2': -1,
            'y2': -1
        };

        // if connector is on top or bottom draw vertical lines
        if (p.x === lastP.x) {
            if (p.y <= lastP.y) {
                pathDef.x2 = p.x;
                pathDef.y2 = p.y + NetLabelWidgetConstants.MAX_TEXT_WIDTH;
            } else {
                pathDef.x2 = p.x;
                pathDef.y2 = p.y - NetLabelWidgetConstants.MAX_TEXT_WIDTH;
            }
        } else {
            if (p.x <= lastP.x) {
                pathDef.x2 = p.x + NetLabelWidgetConstants.MAX_TEXT_WIDTH;
                pathDef.y2 = p.y;
            } else {
                pathDef.x2 = p.x - NetLabelWidgetConstants.MAX_TEXT_WIDTH;
                pathDef.y2 = p.y;
            }
        }

        return pathDef;
    };

    NetLabelConnection.prototype._getPathDefFromPointObject = function (pathDef) {
        var newPathDef = [];

        newPathDef.push("M" + pathDef.x1 + "," + pathDef.y1);
        newPathDef.push("L" + pathDef.x2 + "," + pathDef.y2);

        return newPathDef;
    };

    NetLabelConnection.prototype._removeExistingPath = function (id) {
        var path = this.diagramDesigner.skinParts.$itemsContainer.find('[id^="' + id + '"]');
        if (path) {
            path.remove();
        }
    };

    NetLabelConnection.prototype._toggleHighlightClass = function (action) {
        if (action === 'add') {
            $(this.skinParts.srcNetLabel).addClass(NetLabelWidgetConstants.SRCLABEL_HIGHLIGHT_CLASS);
            $(this.skinParts.dstNetLabel).addClass(NetLabelWidgetConstants.DSTLABEL_HIGHLIGHT_CLASS);
        } else if (action === 'remove') {

            $(this.skinParts.srcNetLabel).removeClass(NetLabelWidgetConstants.SRCLABEL_HIGHLIGHT_CLASS);
            $(this.skinParts.dstNetLabel).removeClass(NetLabelWidgetConstants.DSTLABEL_HIGHLIGHT_CLASS);
        }
    };

    NetLabelConnection.prototype._highlightSrc = function () {
        var srcObj = this.diagramDesigner.items[this.srcObjId];
        srcObj.$el.addClass(NetLabelWidgetConstants.SRCLABEL_HIGHLIGHT_CLASS);
    };

    NetLabelConnection.prototype._highlightDst = function () {
        var dstObj = this.diagramDesigner.items[this.dstObjId];
        dstObj.$el.addClass(NetLabelWidgetConstants.DSTLABEL_HIGHLIGHT_CLASS);
    };

    return NetLabelConnection;
});