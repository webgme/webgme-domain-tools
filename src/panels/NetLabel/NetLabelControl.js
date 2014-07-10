/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Authors: Robert Kereskenyi
 *          Dana Zhang
 */

define(['js/Panels/ModelEditor/ModelEditorControl',
    'js/Constants',
    'js/NodePropertyNames',
    'widgets/NetLabel/NetLabelWidget.Constants',
    './NetLabelControl.EventHandlers'], function (ModelEditorControl,
                                                  CONSTANTS,
                                                  NodePropertyNames,
                                                  NetLabelWidgetConstants,
                                                  NetLabelControlEventHandlers) {

    "use strict";

    var NetLabelControl;

    NetLabelControl = function (options) {
        ModelEditorControl.call(this, options);
    };

    _.extend(NetLabelControl.prototype, ModelEditorControl.prototype);
    _.extend(NetLabelControl.prototype, NetLabelControlEventHandlers.prototype);

    NetLabelControl.prototype.getConnectionDescriptor = function (gmeID) {

        var self = this,
            CONSTS =  CONSTANTS, // CONSTANTS can only be loaded by assigning it to a var
            gmeClient = self._client,
            connectionObj = gmeClient.getNode(gmeID),
            name = connectionObj.getAttribute(NodePropertyNames.Attributes.name),
            showAsLabel = connectionObj.getAttribute(NetLabelWidgetConstants.SHOW_AS_LABEL),
            srcID = connectionObj.getPointer(CONSTANTS.POINTER_SOURCE).to,
            dstID = connectionObj.getPointer(CONSTANTS.POINTER_TARGET).to,
            srcObj = gmeClient.getNode(srcID),
            dstObj = gmeClient.getNode(dstID),
            srcParentId = srcObj.getParentId(),
            dstParentId = dstObj.getParentId(),
            srcParentObj = gmeClient.getNode(srcParentId),
            dstParentObj = gmeClient.getNode(dstParentId);

        return {'name': name,
                'showAsLabel': showAsLabel,
                'srcObj': srcObj,
                'dstObj': dstObj,
                'srcParentObj': srcParentObj,
                'dstParentObj': dstParentObj,
                'srcText': '',
                'dstText': ''};
    };

    return NetLabelControl;
});