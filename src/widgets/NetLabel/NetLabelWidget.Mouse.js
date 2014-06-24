/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Created on 6/17/2014
 * Author: Dana Zhang
 */

"use strict";

define(['./NetLabelWidget.Constants',
        './NetLabelConnection'], function (NetLabelWidgetConstants, NetLabelConnection) {

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

        // handle click on connLists
        this.$el.on('mousedown.' + EVENT_POSTFIX, 'div.' + NetLabelWidgetConstants.DESIGNER_CONNECTION_CLASS,  function (event) {
            var connId = $(this).attr("id"),
                eventDetails = self._processMouseEvent(event, true, true, true, true);

            logger.debug('mousedown.connection, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));

            if (self.onConnectionMouseDown) {
                self.onConnectionMouseDown.call(self, connId, eventDetails);
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
                eventDetails = self._processMouseEvent(event, true, true, true, true),
                rightClick = event.which === 3;

            logger.debug('mousedown.connection, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));

            if (self.onConnectionMouseDown) {
                if (rightClick) {
                    // todo: do something here - maybe enable menu
                } else {
                    self._showAllLabels(this);
                }
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
    };

    NetLabelWidgetMouse.prototype._showAllLabels = function (node) {
        var self = this,
            parentContainer = node.parentNode.children,
            len = parentContainer.length,
            item;
        $(node).hide();
        while (len--) {
            item = parentContainer[len];
            if (item.className !== NetLabelWidgetConstants.NETLABEL_SHOW_ALL) {
                $(item).show();
            }
        }
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
//    _.extend(NetLabelWidgetMouse.prototype, NetLabelConnection.prototype);

    return NetLabelWidgetMouse;
});
