/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 * 
 * Author: Robert Kereskenyi
 */

"use strict";

define(['js/Panels/ModelEditor/ModelEditorControl',
        'js/Constants'], function (ModelEditorControl, CONSTANTS) {

    var NetLabelControl;

    NetLabelControl = function (options) {
        ModelEditorControl.call(this, options);
        this.netLabelList = {};
    };


    _.extend(NetLabelControl.prototype, ModelEditorControl.prototype);


    NetLabelControl.prototype.getConnectionDescriptor = function (gmeID) {

        var self = this,
            CONSTS =  CONSTANTS, // CONSTANTS can only be loaded by assigning it to a var
            gmeClient = self._client,
            connectionObj = gmeClient.getNode(gmeID),
            srcID = connectionObj.getPointer(CONSTANTS.POINTER_SOURCE),
            dstID = connectionObj.getPointer(CONSTANTS.POINTER_TARGET);


        return {'srcText': 'BLA-SRC',
                'dstText': 'BLA-DST'};
    };

    return NetLabelControl;
});