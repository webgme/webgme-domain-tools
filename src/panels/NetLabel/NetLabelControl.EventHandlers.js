/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Dana Zhang
 * Created on 6/20/2014
 */


define(['logManager',
    'js/Panels/ModelEditor/ModelEditorControl.DiagramDesignerWidgetEventHandlers',
    'js/Constants',
    'js/Utils/GMEConcepts',
    'widgets/NetLabel/NetLabelConnection'], function (logManager,
                                         ModelEditorControlDiagramDesignerWidgetEventHandlers,
                                         CONSTANTS,
                                         GMEConcepts, NetLabelConnection) {

    "use strict";

    var NetLabelControlEventHandlers;

    NetLabelControlEventHandlers = function () {
        ModelEditorControlDiagramDesignerWidgetEventHandlers.call(this);
    };

    _.extend(NetLabelControlEventHandlers.prototype, ModelEditorControlDiagramDesignerWidgetEventHandlers.prototype);
    _.extend(NetLabelControlEventHandlers.prototype, NetLabelConnection.prototype);

    NetLabelControlEventHandlers.prototype._onSelectionDelete = function (idList) {
        var objIdList = [],
            i = idList.length,
            compID,
            itemDeleting,
            objID;

        while (i--) {
            compID = idList[i];
            objID = this._ComponentID2GmeID[compID];
            //temporary fix to not allow deleting ROOT AND FCO
            if (GMEConcepts.canDeleteNode(objID)) {
                objIdList.pushUnique(objID);
                // if object to be deleted is a connection object
                if (compID.indexOf("C_") === 0) {
                    itemDeleting = this.designerCanvas.items[compID];
                    itemDeleting.hideEndReconnectors();
                    itemDeleting.unHighlight();
                }
            } else {
                this.logger.warning('Can not delete item with ID: ' + objID + '. Possibly it is the ROOT or FCO');
            }
        }

        if (objIdList.length > 0) {
            this._client.delMoreNodes(objIdList);
        }
    };

    return NetLabelControlEventHandlers;
});
