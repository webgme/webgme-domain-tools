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
                self.srcLabelDetached = $(srcNetlist).find('[connid^="' + connID + '"]').detach();
                if (srcNetlist.childElementCount === 1) {
                    $(srcNetlist).remove();
                    pathID = DiagramDesignerWidgetConstants.PATH_SHADOW_ID_PREFIX + srcID;
                    self.diagramDesigner.skinParts.$itemsContainer.find('[id^="' + pathID + '"]').remove();
                } else {
                    nbrOfConns = $(srcNetlist).find('.' + NetLabelWidgetConstants.DESIGNER_NETLABEL_CLASS).length;
                    text = nbrOfConns === 1 ? (nbrOfConns + ' connection') : (nbrOfConns + ' connections');

                    $(srcNetlist).find('.' + NetLabelWidgetConstants.NETLIST_TITLE)[0].textContent = text;
                }
            }

            if (dstNetlist) {
                self.dstLabelDetached = $(dstNetlist).find('[connid^="' + connID + '"]').detach();
                if (dstNetlist.childElementCount === 1) {
                    $(dstNetlist).remove();
                    pathID = DiagramDesignerWidgetConstants.PATH_SHADOW_ID_PREFIX + dstID;
                    self.diagramDesigner.skinParts.$itemsContainer.find('[id^="' + pathID + '"]').remove();
                } else {
                    nbrOfConns = $(dstNetlist).find('.' + NetLabelWidgetConstants.DESIGNER_NETLABEL_CLASS).length;
                    text = nbrOfConns === 1 ? (nbrOfConns + ' connection') : (nbrOfConns + ' connections');

                    $(dstNetlist).find('.' + NetLabelWidgetConstants.NETLIST_TITLE)[0].textContent = text;
                }
            }
        };


        if (self.showAsLabel) {
            // setting end connectors positions
            self.sourceCoordinates = { "x": srcPos.x,
                "y": srcPos.y};

            self.endCoordinates = { "x": dstPos.x,
                "y": dstPos.y};

            self._segPoints = segPoints.slice(0);
            self._pathPoints = segPoints;
//            _removeExistingConnection();
//
            if (this._prevShowLabel === false) {
                this.pathDef = null;

                Connection.prototype.destroy.call(this);
            }
            self.setNetRenderData(segPoints);

            self.unHighlight();
            self.hideEndReconnectors();
            self._renderEndReconnectors();
            if (self.selected) {
                self.showEndReconnectors();
            }
        } else {

            _removeExistingLabels();
            Connection.prototype.setConnectionRenderData.call(self, segPoints);
        }
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
                nbrOfConns = $(srcPortLabelList).find('.' + NetLabelWidgetConstants.DESIGNER_NETLABEL_CLASS).length;
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
                if (self.diagramDesigner.items[dstID] && self.diagramDesigner.items[dstID]._decoratorInstance.$sourceConnectors[0]);
                else {
                    $(dstPortLabelList).find('.' + NetLabelWidgetConstants.ADD_CONNECTION).remove();
                }
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
                nbrOfConns = $(dstPortLabelList).find('.' + NetLabelWidgetConstants.DESIGNER_NETLABEL_CLASS).length;
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

    NetLabelConnection.prototype.destroy = function () {
        this._destroying = true;
        if (this.diagramDesigner) {

            this.diagramDesigner.skinParts.$itemsContainer.find('.' + NetLabelWidgetConstants.NETLIST).remove();
            this._hideTexts();
            this._hideSrcTexts();
            this._hideDstTexts();
            this.logger.debug("Destroyed");
//
//            this._removePath();
//            this._removePathShadow();
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
        this.showAsLabel = objDescriptor.showAsLabel;

        this.diagramDesigner = objDescriptor.designerCanvas;

        this.skinParts = {};
        this.paper = this.diagramDesigner.skinParts.SVGPaper;

        this.selected = false;
        this.selectedInMultiSelection = false;

        this.designerAttributes = {};

        this._editMode = false;
        this._readOnly = false;

        this.segmentPoints = [];
        this.reconnectable = false;

        this._segmentPointMarkers = [];
        this._connectionEditSegments = [];

        this._pathPointsBBox = {'x': 0,
            'y': 0,
            'x2': 0,
            'y2': 0,
            'w': 0,
            'h': 0};

        this._initializeConnectionProps(objDescriptor);
    };

    NetLabelConnection.prototype._initializeConnectionProps = function (objDescriptor) {
        if (objDescriptor.showAsLabel) {

            // connection attributes
            this.name = objDescriptor.name;
            this.defaultName = objDescriptor.defaultName;
            this.showAsLabel = objDescriptor.showAsLabel;

            this.reconnectable = objDescriptor.reconnectable === true;
            this.editable = !!objDescriptor.editable;
            this.nameEdit = objDescriptor.nameEdit || false;

            this.srcTextEdit = objDescriptor.srcTextEdit || false;
            this.dstTextEdit = objDescriptor.dstTextEdit || false;

            // getting relevant src & dst IDs & objects (used to update src/dst port names)
            this.srcObjId = objDescriptor.srcObjId; // designer item ID (etc 'I_')
            this.srcSubCompId = objDescriptor.srcSubCompId; // port ID, undefined if port nonexistent
            this.dstObjId = objDescriptor.dstObjId;
            this.dstSubCompId = objDescriptor.dstSubCompId;

            this.srcObj = objDescriptor.srcObj;
            this.dstObj = objDescriptor.dstObj;
            this.srcParentObj = objDescriptor.srcParentObj;
            this.dstParentObj = objDescriptor.dstParentObj;
        } else {
            Connection.prototype._initializeConnectionProps.call(this, objDescriptor);
        }
    };

    NetLabelConnection.prototype.getBoundingBox = function () {
        var bBox;

        if (this.showAsLabel) {
            bBox = { "x": 0,
                "y": 0,
                "x2": 0,
                "y2": 0,
                "width": 0,
                "height": 0 };

        } else {
            bBox = Connection.prototype.getBoundingBox.call(this);
        }

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
        } else {
            Connection.prototype.onSelect.call(this, multiSelection);
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

        if (this.showAsLabel) {

            this.unHighlight();
            this.hideEndReconnectors();
            this._setEditMode(false);
        } else {
            Connection.prototype.onDeselect.call(this);
        }
    };

    /**
     * Show src & dst end connectors of given connection
     * @param id - if undefined, one connection is selected; otherwise, a netlist is hovered over to show all other-end connectors
     */
    NetLabelConnection.prototype.showEndReconnectors = function (id) {
        if (this.showAsLabel) {

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
        } else {
            Connection.prototype.showEndReconnectors.call(this);
        }
    };

    NetLabelConnection.prototype.hideEndReconnectors = function () {
        var self = this;
        if (this.showAsLabel) {

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
        } else {
            Connection.prototype.hideEndReconnectors.call(self);
        }
    };

    /******************** HIGHLIGHT / UNHIGHLIGHT MODE *********************/
    NetLabelConnection.prototype.highlight = function () {
        if (this.showAsLabel) {

            this._highlightSrc();
            this._highlightDst();
        } else {
            Connection.prototype.highlight.call(this);
        }
    };

    NetLabelConnection.prototype.unHighlight = function () {
        if (this.showAsLabel) {

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
        } else {
            Connection.prototype.unHighlight.call(this);
        }
    };

    NetLabelConnection.prototype.update = function (objDescriptor) {
        this._prevShowLabel = this.showAsLabel;
        this.showAsLabel = objDescriptor.showAsLabel;
        if (objDescriptor.showAsLabel) {
            this._initializeConnectionProps(objDescriptor);
        } else {
            this.showAsLabel = objDescriptor.showAsLabel;
            Connection.prototype.update.call(this, objDescriptor);
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