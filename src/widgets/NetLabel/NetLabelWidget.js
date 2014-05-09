/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Robert Kereskenyi
 *         Dana Zhang
 */


define(['js/Widgets/ModelEditor/ModelEditorWidget',
        'js/Widgets/DiagramDesigner/ConnectionRouteManagerBasic',
        './NetLabelConnection'], function (ModelEditorWidget,
                                           ConnectionRouteManagerBasic,
                                           NetLabelConnection) {
    "use strict";

    var NetLabelWidget;

    NetLabelWidget = function (container, params) {
        params = params || {};
        params.loggerName = "NetLabelWidget";

        params.connectionRouteManager = new ConnectionRouteManagerBasic({"diagramDesigner": this});

        ModelEditorWidget.call(this, container, params);

        this.logger.debug("NetLabelWidget ctor");
    };

    _.extend(NetLabelWidget.prototype, ModelEditorWidget.prototype);


    NetLabelWidget.prototype.createConnection = function (objD) {
        var connectionId = this._getGuid("C_"),
            objDescriptor = _.extend({}, objD),
            sourceId = objDescriptor.srcObjId,
            sourceSubcomponentId = objDescriptor.srcSubCompId,
            targetId = objDescriptor.dstObjId,
            targetSubcomponentId = objDescriptor.dstSubCompId,
            newComponent;

        this.logger.debug("Creating connection component with parameters: " + JSON.stringify(objDescriptor));

        objDescriptor.designerCanvas = this;

        this.connectionIds.push(connectionId);

        //add to accounting queues for performance optimization
        this._insertedConnectionIDs.push(connectionId);

        //accounting connection info
        this.connectionEndIDs[connectionId] = {"srcObjId": sourceId,
            "srcSubCompId": sourceSubcomponentId,
            "dstObjId": targetId,
            "dstSubCompId": targetSubcomponentId};


        this._saveConnectionIDbyEndID(connectionId, sourceId, sourceSubcomponentId);
        this._saveConnectionIDbyEndID(connectionId, targetId, targetSubcomponentId);

        // todo: need to register connectionID-src and connectionID-dst in this.items
        newComponent = this.items[connectionId] = new NetLabelConnection(connectionId);
        newComponent._initialize(objDescriptor);
        // todo: need to register event-handlers, e.g. this._listenForEvents or something and then create such event handling method
        return newComponent;
    };

    // todo: make a note here that this is the event handling function
//    NetLabelWidget.prototype._activateMouseListeners = function () {
//        var self = this,
//            EVENT_POSTFIX = 'DiagramDesignerWidget',
//            logger = this.logger;
//
//        //handle click on designer-items
//        this.$el.on('mousedown.' + EVENT_POSTFIX, 'div.' + DiagramDesignerWidgetConstants.DESIGNER_ITEM_CLASS,  function (event) {
//            var itemId = $(this).attr("id"),
//                eventDetails = self._processMouseEvent(event, true, true, true, true);
//
//            logger.debug('mousedown.item, ItemID: ' + itemId + ' eventDetails: ' + JSON.stringify(eventDetails));
//
//            if (self.onItemMouseDown) {
//                self.onItemMouseDown.call(self, itemId, eventDetails);
//            } else {
//                logger.warning('onItemMouseDown(itemId, eventDetails) is undefined, ItemID: ' + itemId + ' eventDetails: ' + JSON.stringify(eventDetails));
//            }
//        });
//
//        //handle click on designer-connections
//        this.$el.on('mousedown.' + EVENT_POSTFIX, 'path[class~="' + DiagramDesignerWidgetConstants.DESIGNER_CONNECTION_CLASS +'"]',  function (event) {
//            var connId = $(this).attr("id").replace(DiagramDesignerWidgetConstants.PATH_SHADOW_ARROW_END_ID_PREFIX, "").replace(DiagramDesignerWidgetConstants.PATH_SHADOW_ID_PREFIX, ""),
//                eventDetails = self._processMouseEvent(event, true, true, true, true);
//
//            logger.debug('mousedown.connection, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));
//
//            if (self.onConnectionMouseDown) {
//                self.onConnectionMouseDown.call(self, connId, eventDetails);
//            } else {
//                logger.warning('onConnectionMouseDown(connId, eventDetails) is undefined, connId: ' + connId + ' eventDetails: ' + JSON.stringify(eventDetails));
//            }
//        });
//
//        //handle mouse down on background
//        this.$el.on('mousedown.' + EVENT_POSTFIX, function (event) {
//            var eventDetails = self._processMouseEvent(event, true, true, true, true);
//
//            logger.debug('mousedown.background, eventDetails: ' + JSON.stringify(eventDetails));
//
//            if (self.onBackgroundMouseDown) {
//                self.onBackgroundMouseDown.call(self, eventDetails);
//            } else {
//                logger.warning('onBackgroundMouseDown(eventDetails) is undefined, eventDetails: ' + JSON.stringify(eventDetails));
//            }
//        });
//
//        //handle double-click on background
//        this.$el.on('dblclick.' + EVENT_POSTFIX, function (event) {
//            var eventDetails = self._processMouseEvent(event, true, true, true, true);
//
//            if (self.onBackgroundDblClick) {
//                self.onBackgroundDblClick.call(self, eventDetails);
//            } else {
//                logger.warning('onBackgroundDblClick(eventDetails) is undefined, eventDetails: ' + JSON.stringify(eventDetails));
//            }
//
//            logger.warning('dblclick.background, eventDetails: ' + JSON.stringify(eventDetails));
//        });
//
//        //disable context-menu on right-click
//        this.$el.on('contextmenu.' + EVENT_POSTFIX, function (event) {
//            //prevent default actions
//            event.preventDefault();
//            event.stopImmediatePropagation();
//        });
//    };

    NetLabelWidget.prototype._initializeToolbar = function () {
        ModelEditorWidget.prototype._initializeToolbar.call(this);
        if (this.toolbarItems.radioButtonGroupRouteManager) {
            this.toolbarItems.radioButtonGroupRouteManager.enabled(false);
        }
    };

    return NetLabelWidget;
});