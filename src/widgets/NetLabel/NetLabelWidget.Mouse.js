/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Created on 6/17/2014
 * Author: Dana Zhang
 */


define(['./NetLabelWidget.Constants',
        'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants'], function (NetLabelWidgetConstants,
                                                                                 DiagramDesignerWidgetConstants) {

    "use strict";

    var NetLabelWidgetMouse,
        EVENT_POSTFIX = 'NetLabelWidget';

    NetLabelWidgetMouse = function () {
    };

    NetLabelWidgetMouse.prototype.initialize = function (el) {
        this.$el = el;

        this._activateMouseListeners();
    };

    NetLabelWidgetMouse.prototype._activateMouseListeners = function () {
        var self = this,
            logger = this.logger;

        //handle click on designer-items
        this.$el.on('mousedown.' + EVENT_POSTFIX, 'div.' + NetLabelWidgetConstants.DESIGNER_ITEM_CLASS,  function (event) {
            var itemId = $(this).attr("id"),
                eventDetails = self._processMouseEvent(event, true, true, true, true);

            logger.debug('mousedown.item, ItemID: ' + itemId + ' eventDetails: ' + JSON.stringify(eventDetails));

            if (self.onItemMouseDown) {
                self.onItemMouseDown.call(self, itemId, eventDetails);
            } else {
                logger.warning('onItemMouseDown(itemId, eventDetails) is undefined, ItemID: ' + itemId + ' eventDetails: ' + JSON.stringify(eventDetails));
            }
        });

        //handle click on designer-connections
        this.$el.on('mousedown.' + EVENT_POSTFIX, 'path[class~="' + DiagramDesignerWidgetConstants.DESIGNER_CONNECTION_CLASS + '"]',  function (event) {
            var connId = $(this).attr("id").replace(DiagramDesignerWidgetConstants.PATH_SHADOW_ARROW_END_ID_PREFIX, "").replace(DiagramDesignerWidgetConstants.PATH_SHADOW_ID_PREFIX, ""),
                eventDetails = self._processMouseEvent(event, true, true, true, true);

            logger.debug('mousedown.connection, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));

            if (self.onConnectionMouseDown) {
                self.onConnectionMouseDown.call(self, connId, eventDetails);
            } else {
                logger.warning('onConnectionMouseDown(connId, eventDetails) is undefined, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));
            }
        });

        // handle click on netlist title
        this.$el.on('mousedown.' + EVENT_POSTFIX, 'span.' + NetLabelWidgetConstants.NETLIST_TITLE,  function (event) {
            var connId = $(this).attr("id"),
                eventDetails = self._processMouseEvent(event, true, true, true, true);

            logger.debug('mousedown.connection, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));

            if (self.onConnectionMouseDown) {
                self.selectionManager._clearSelection();
                self._hideAllLabels();
                self._showAllLabels(this);
//                self._showAllEndConnectors(this);
            } else {
                logger.warning('onConnectionMouseDown(connId, eventDetails) is undefined, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));
            }
        });

        //handle click on netLabels
        this.$el.on('mousedown.' + EVENT_POSTFIX, 'div.' + NetLabelWidgetConstants.DESIGNER_NETLABEL_CLASS,  function (event) {
            var connId = $(this).attr("connId"),
                eventDetails = self._processMouseEvent(event, true, true, true, true),
                rightClick = event.which === 3;

            logger.debug('mousedown.connection, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));

            if (self.onConnectionMouseDown) {
                if (rightClick) {
                    // todo: do something here - maybe enable menu-delete
                } else {
                    self.onConnectionMouseDown.call(self, connId, eventDetails);
                }
            } else {
                logger.warning('onConnectionMouseDown(connId, eventDetails) is undefined, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));
            }
        });

        //handle click on show-all-labels class
        this.$el.on('mousedown.' + EVENT_POSTFIX, 'div.' + NetLabelWidgetConstants.NETLABEL_SHOW_ALL,  function (event) {
            var connId = $(this).attr("connId"),
                eventDetails = self._processMouseEvent(event, true, true, true, true);

            logger.debug('mousedown.connection, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));

            if (self.onConnectionMouseDown) {
                self._showAllLabels(this);
                self.selectionManager._clearSelection();
            } else {
                logger.warning('onConnectionMouseDown(connId, eventDetails) is undefined, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));
            }
        });

        // handle click on collapse-labels class
        this.$el.on('mousedown.' + EVENT_POSTFIX, 'div.' + NetLabelWidgetConstants.COLLAPSE_LABELS,  function (event) {
            var connId = $(this).attr("connId"),
                eventDetails = self._processMouseEvent(event, true, true, true, true);

            logger.debug('mousedown.connection, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));

            if (self.onConnectionMouseDown) {
                self.selectionManager._clearSelection();
//                self._hideLabels(this);
            } else {
                logger.warning('onConnectionMouseDown(connId, eventDetails) is undefined, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));
            }
        });

        //handle mouse down on background
        this.$el.on('mousedown.' + EVENT_POSTFIX, function (event) {
            var eventDetails = self._processMouseEvent(event, true, true, true, true);

            logger.debug('mousedown.background, eventDetails: ' + JSON.stringify(eventDetails));

            if (self.onBackgroundMouseDown) {
                self.onBackgroundMouseDown.call(self, eventDetails);
                self._hideAllLabels();
            } else {
                logger.warning('onBackgroundMouseDown(eventDetails) is undefined, eventDetails: ' + JSON.stringify(eventDetails));
            }
        });

        //handle double-click on background
        this.$el.on('dblclick.' + EVENT_POSTFIX, function (event) {
            var eventDetails = self._processMouseEvent(event, true, true, true, true);

            if (self.onBackgroundDblClick) {
                self.onBackgroundDblClick.call(self, eventDetails);
            } else {
                logger.warning('onBackgroundDblClick(eventDetails) is undefined, eventDetails: ' + JSON.stringify(eventDetails));
            }

            logger.warning('dblclick.background, eventDetails: ' + JSON.stringify(eventDetails));
        });

        //disable context-menu on right-click
        this.$el.on('contextmenu.' + EVENT_POSTFIX, function (event) {
            //prevent default actions
            event.preventDefault();
            event.stopImmediatePropagation();
        });

        // handle mouse enter on netlists
        // todo: on hover collapse all labels, on click expand all labels of current obj and collapse all other labels
        // todo: the labels need to now show collapse-all div
        this.$el.on('mouseenter.' + EVENT_POSTFIX, 'span.' + NetLabelWidgetConstants.NETLIST_TITLE,  function (event) {
            var objId = $(this).text(),
                eventDetails = self._processMouseEvent(event, true, true, true, true);

            logger.debug('Showing all end connectors from object ' + objId);

            if (self.onConnectionMouseDown) {
                self.selectionManager._clearSelection();
//                self._hideLabels(this);
                self._showAllEndConnectors(this);

            } else {
                logger.warning('onConnectionMouseDown(connId, eventDetails) is undefined, connId: ' + objId + ' eventDetails: ' + JSON.stringify(eventDetails));
            }
        });

        // handle mouse leave on netlists
        this.$el.on('mouseleave.' + EVENT_POSTFIX, 'span.' + NetLabelWidgetConstants.NETLIST_TITLE,  function (event) {
            var objId = $(this).text(),
                eventDetails = self._processMouseEvent(event, true, true, true, true);

            logger.debug('Showing all end connectors from object ' + objId);

            if (self.onConnectionMouseDown) {
                self.selectionManager._clearSelection();
//                self._hideLabels(this);
                self._hideAllEndConnectors(this);

            } else {
                logger.warning('onConnectionMouseDown(connId, eventDetails) is undefined, connId: ' + objId + ' eventDetails: ' + JSON.stringify(eventDetails));
            }
        });

    };

    NetLabelWidgetMouse.prototype._processMouseEvent = function (event, triggerUIActivity, preventDefault, stopPropagation, stopImmediatePropagation) {
        //trigger that the user switched to this widget
        if (triggerUIActivity === true) {
            this._triggerUIActivity();
        }

        if (preventDefault === true) {
            event.preventDefault();
        }

        if (stopPropagation === true) {
            event.stopPropagation();
        }

        if (stopImmediatePropagation === true) {
            event.stopImmediatePropagation();
        }

        return this._getMouseEventDetails(event);
    };

    NetLabelWidgetMouse.prototype._getMouseEventDetails = function (event) {
        var mousePos = this.getAdjustedMousePos(event),
            eventDetails = { 'rightClick': event.which === 3,
                'ctrlKey': event.ctrlKey,
                'metaKey': event.metaKey,
                'altKey': event.altKey,
                'shiftKey': event.shiftKey,
                'mouseX': mousePos.mX,
                'mouseY': mousePos.mY };

        return eventDetails;
    };

    NetLabelWidgetMouse.prototype.trackMouseMoveMouseUp = function (fnMouseMove, fnMouseUp) {
        var self = this;

        $(document).on('mousemove.' + EVENT_POSTFIX, function (event) {
            var mouseDetails = self._processMouseEvent(event, false, true, true, true);

            if (fnMouseMove) {
                fnMouseMove.call(self, mouseDetails);
            }
        });

        $(document).on('mouseup.' + EVENT_POSTFIX, function (event) {
            var mouseDetails = self._processMouseEvent(event, false, true, true, true);

            $(document).off('mousemove.' + EVENT_POSTFIX);
            $(document).off('mouseup.' + EVENT_POSTFIX);

            if (fnMouseUp) {
                fnMouseUp.call(self, mouseDetails);
            }
        });
    };

    /** HELPER FUNCTIONS **/
    NetLabelWidgetMouse.prototype._showAllLabels = function (node) {
        var parentNode = node.parentNode,
            children = parentNode.children,
            i;

        // show all labels for this NetList
        for (i = 1; i < children.length; i += 1) {
            $(children[i]).show();
        }

    };

    NetLabelWidgetMouse.prototype._hideLabels = function (node) {
        var parentNode = node.parentNode,
            childElements = parentNode.children, // children are elements, childNodes are nodes including textContent
            len = childElements.length,
            i,
            expandDiv;

        // collapse overflown labels
        for (i = NetLabelWidgetConstants.MAX_LABEL_NUMBER; i < len; i += 1) {
            $(childElements[i]).hide();
        }
        // show expand div
        expandDiv = $(parentNode).find('.' + NetLabelWidgetConstants.NETLABEL_SHOW_ALL);
        expandDiv.show();
    };

    NetLabelWidgetMouse.prototype._showAllEndConnectors = function (node) {
        var children = node.parentNode.childNodes,
            childrenCount = children.length,
            i,
            id,
            nodeId = node.id,
            idList = [],
            connObj;

        // first get the connection ids associated with this object
        for (i = 1; i < childrenCount; i += 1) {
            id = children[i].getAttribute('connid');
            // show all end connectors except the current object
            if (id && id !== nodeId) {
                // todo: add this to const file and delete the check
                idList.push(children[i].getAttribute('connid'));
            }
        }

        // get all the connection objects associated with connid
        for (i = 0; i < idList.length; i += 1) {
            connObj = this.items[idList[i]];
            connObj.showEndReconnectors(nodeId);
        }
    };

    // todo: there has to a better way to do this
    NetLabelWidgetMouse.prototype._hideAllLabels = function () {

        this.skinParts.$itemsContainer.find('.netLabel').hide()
    };

    NetLabelWidgetMouse.prototype._hideAllEndConnectors = function (node) {
        var children = node.parentNode.childNodes,
            childrenCount = children.length,
            i,
            id,
            idList = [],
            connObj;

        // first get the connection ids associated with this object
        for (i = 1; i < childrenCount; i += 1) {
            // hide all labels in net list
//            $(children[i]).hide();
            id = children[i].getAttribute('connid');
            if (id) {
                // todo: add this to const file and delete the check
                idList.push(children[i].getAttribute('connid'));
            }
        }

        // get all the connection objects associated with connid
        for (i = 0; i < idList.length; i += 1) {
            connObj = this.items[idList[i]];
            connObj.hideEndReconnectors();
        }

    };

    return NetLabelWidgetMouse;
});
