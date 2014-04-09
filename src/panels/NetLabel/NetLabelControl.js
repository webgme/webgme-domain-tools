/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 * 
 * Author: Robert Kereskenyi
 */

"use strict";

define(['js/Panels/ModelEditor/ModelEditorControl'], function (ModelEditorControl) {

    var NetLabelControl;

    NetLabelControl = function (options) {
        ModelEditorControl.call(this, options);
    };


    _.extend(NetLabelControl.prototype, ModelEditorControl.prototype);


    NetLabelControl.prototype.getConnectionDescriptor = function (gmeID) {
        return {'srcText': 'BLA-SRC',
                'dstText': 'BLA-DST'};
    };

    return NetLabelControl;
});