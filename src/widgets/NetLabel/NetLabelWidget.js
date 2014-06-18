/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Robert Kereskenyi
 *         Dana Zhang
 */


define(['js/Widgets/ModelEditor/ModelEditorWidget',
        'js/Widgets/DiagramDesigner/ConnectionRouteManagerBasic',
        './NetLabelConnection',
        './NetLabelWidget.Mouse'], function (ModelEditorWidget,
                                           ConnectionRouteManagerBasic,
                                           NetLabelConnection,
                                           NetLabelWidgetMouse) {
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
        objDescriptor.connectionId = connectionId;

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
        return newComponent;
    };

    NetLabelWidget.prototype._initializeToolbar = function () {
        ModelEditorWidget.prototype._initializeToolbar.call(this);
        if (this.toolbarItems.radioButtonGroupRouteManager) {
            this.toolbarItems.radioButtonGroupRouteManager.enabled(false);
        }
    };

    NetLabelWidget.prototype._refreshScreen = function () {
        var i,
            CANVAS_EDGE = 100,
            connectionIDsToUpdate,
            maxWidth = 0,
            maxHeight = 0,
            redrawnConnectionIDs,
            doRenderGetLayout,
            doRenderSetLayout,
            items = this.items,
            affectedItems = [],
            dispatchEvents,
            self = this;

        this.logger.debug("_refreshScreen START");

        //TODO: updated items probably touched the DOM for modification
        //hopefully none of them forced a reflow by reading values, only setting values
        //browsers will optimize this
        //http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/ --- BROWSER ARE SMART

        /***************** FIRST HANDLE THE DESIGNER ITEMS *****************/
            //add all the inserted items, they are still on a document Fragment
        this.skinParts.$itemsContainer[0].appendChild(this._documentFragment);
        this._documentFragment = document.createDocumentFragment();

        //STEP 1: call the inserted and updated items' getRenderLayout
        doRenderGetLayout = function (itemIDList) {
            var i = itemIDList.length,
                cItem;

            while (i--) {
                cItem = items[itemIDList[i]];
                cItem.renderGetLayoutInfo();

            }
        };
        doRenderGetLayout(this._insertedDesignerItemIDs);
        doRenderGetLayout(this._updatedDesignerItemIDs);

        //STEP 2: call the inserted and updated items' setRenderLayout
        doRenderSetLayout = function (itemIDList) {
            var i = itemIDList.length,
                cItem;

            while (i--) {
                cItem = items[itemIDList[i]];
                cItem.renderSetLayoutInfo();
            }
        };

        doRenderSetLayout(this._insertedDesignerItemIDs);
        doRenderSetLayout(this._updatedDesignerItemIDs);

        /*********** SEND CREATE / UPDATE EVENTS about created/updated items **********/
        dispatchEvents = function (itemIDList, eventType) {
            var i = itemIDList.length;

            while (i--) {
                self.dispatchEvent(eventType, itemIDList[i]);
            }
        };
        dispatchEvents(this._insertedDesignerItemIDs, this.events.ON_COMPONENT_CREATE);
        dispatchEvents(this._insertedConnectionIDs, this.events.ON_COMPONENT_CREATE);
        dispatchEvents(this._updatedDesignerItemIDs, this.events.ON_COMPONENT_UPDATE);
        dispatchEvents(this._updatedConnectionIDs, this.events.ON_COMPONENT_UPDATE);
        /*********************/


        /***************** THEN HANDLE THE CONNECTIONS *****************/

            //get all the connections that needs to be updated
            // - inserted connections
            // - updated connections
            // - connections that are affected because of
            //      - endpoint appearance
            //      - endpoint remove
            //      - endpoint updated
            //TODO: fix this, but right now we call refresh on all of the connections
        affectedItems = this._insertedDesignerItemIDs.concat(this._updatedDesignerItemIDs, this._deletedDesignerItemIDs);

        connectionIDsToUpdate = this._insertedConnectionIDs.concat(this._updatedConnectionIDs, this._getAssociatedConnectionsForItems(affectedItems));
        connectionIDsToUpdate = _.uniq(connectionIDsToUpdate).sort();

        this.logger.debug('Redraw connection request: ' + connectionIDsToUpdate.length + '/' + this.connectionIds.length);

        redrawnConnectionIDs = this._redrawConnections(connectionIDsToUpdate);

        this.logger.debug('Redrawn/Requested: ' + redrawnConnectionIDs.length + '/' + connectionIDsToUpdate.length);

        i = redrawnConnectionIDs.length;

        //adjust the canvas size to the new 'grown' are that the inserted / updated require
        //TODO: canvas size decrease not handled yet
        this._actualSize.w = Math.max(this._actualSize.w, maxWidth + CANVAS_EDGE);
        this._actualSize.h = Math.max(this._actualSize.h, maxHeight + CANVAS_EDGE);
        this._resizeItemContainer();

        //let the selection manager know about deleted items and connections
        /*i = this._deletedDesignerItemIDs.length;
         while (i--) {
         this.dispatchEvent(this.events.ON_COMPONENT_DELETE, this._deletedDesignerItemIDs[i]);
         }

         i = this._deletedConnectionIDs.length;
         while (i--) {
         this.dispatchEvent(this.events.ON_COMPONENT_DELETE, this._deletedConnectionIDs[i]);
         }*/

        /* clear collections */
        this._insertedDesignerItemIDs = [];
        this._updatedDesignerItemIDs = [];
        this._deletedDesignerItemIDs = [];

        this._insertedConnectionIDs = [];
        this._updatedConnectionIDs = [];
        this._deletedConnectionIDs = [];

        if (this.mode === this.OPERATING_MODES.DESIGN ||
            this.mode === this.OPERATING_MODES.READ_ONLY) {
            this.selectionManager.showSelectionOutline();
        }

        this.logger.debug("_refreshScreen END");
    };

    _.extend(NetLabelWidget.prototype, NetLabelWidgetMouse.prototype);

    return NetLabelWidget;
});