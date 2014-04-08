"use strict";

define(['js/Widgets/ModelEditor/ModelEditorWidget',
        'js/Widgets/DiagramDesigner/ConnectionRouteManagerBasic',
        './NetLabelConnection'], function (ModelEditorWidget,
                                           ConnectionRouteManagerBasic,
                                           NetLabelConnection) {

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

    return NetLabelWidget;
});