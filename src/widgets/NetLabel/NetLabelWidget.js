/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Robert Kereskenyi
 *         Dana Zhang
 */


define(['js/Widgets/ModelEditor/ModelEditorWidget',
        'js/Widgets/DiagramDesigner/ConnectionRouteManagerBasic',
        'js/Widgets/DiagramDesigner/ConnectionRouteManager2',
        'js/Widgets/DiagramDesigner/ConnectionRouteManager3',
        'js/Widgets/DiagramDesigner/ConnectionDrawingManager',
        './NetLabelConnection',
        './NetLabelWidget.Mouse',
        'css!./NetLabelWidget'], function (ModelEditorWidget,
                                           ConnectionRouteManagerBasic,
                                           ConnectionRouteManager2,
                                           ConnectionRouteManager3,
                                           ConnectionDrawingManager,
                                           NetLabelConnection,
                                           NetLabelWidgetMouse) {
    "use strict";

    var NetLabelWidget;

    NetLabelWidget = function (container, params) {
        var self = this;
        params = params || {};
        params.loggerName = "NetLabelWidget";

//        params.connectionRouteManager = new ConnectionRouteManager3({"diagramDesigner": this});

        ModelEditorWidget.call(this, container, params);

        this.logger.debug("NetLabelWidget ctor");
        this._activateMouseListeners();
    };

    _.extend(NetLabelWidget.prototype, ModelEditorWidget.prototype);
    _.extend(NetLabelWidget.prototype, NetLabelWidgetMouse.prototype);

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

        newComponent = this.items[connectionId] = new NetLabelConnection(connectionId);
        newComponent._initialize(objDescriptor);
        return newComponent;
    };

    return NetLabelWidget;
});