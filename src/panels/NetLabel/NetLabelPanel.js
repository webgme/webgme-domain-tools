/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Robert Kereskenyi
 *         Dana Zhang
 */

define(['js/PanelBase/PanelBaseWithHeader',
    'js/PanelManager/IActivePanel',
    'widgets/NetLabel/NetLabelWidget',
    './NetLabelControl'
    ], function (PanelBaseWithHeader,
             IActivePanel,
             NetLabelWidget,
             NetLabelControl) {

    "use strict";
    var NetLabelPanel;

    NetLabelPanel = function (layoutManager, params) {
        var options = {};
        //set properties from options
        options[PanelBaseWithHeader.OPTIONS.LOGGER_INSTANCE_NAME] = "NetLabelPanel";
        options[PanelBaseWithHeader.OPTIONS.FLOATING_TITLE] = true;

        //call parent's constructor
        PanelBaseWithHeader.apply(this, [options, layoutManager]);

        this._client = params.client;

        //initialize UI
        this._initialize();

        this.logger.debug("NetLabelPanel ctor finished");
    };

    //inherit from PanelBaseWithHeader
    _.extend(NetLabelPanel.prototype, PanelBaseWithHeader.prototype);
    _.extend(NetLabelPanel.prototype, IActivePanel.prototype);

    NetLabelPanel.prototype._initialize = function () {
        var self = this;

        this.widget = new NetLabelWidget(this.$el, {'toolBar': this.toolBar});

        this.widget.setTitle = function (title) {
            self.setTitle(title);
        };

        this.widget.onUIActivity = function () {
            WebGMEGlobal.PanelManager.setActivePanel(self);
            WebGMEGlobal.KeyboardManager.setListener(self.widget);
        };

        this.control = new NetLabelControl({"client": this._client,
            "widget": this.widget});

        this.onActivate();
    };

    /* OVERRIDE FROM WIDGET-WITH-HEADER */
    /* METHOD CALLED WHEN THE WIDGET'S READ-ONLY PROPERTY CHANGES */
    NetLabelPanel.prototype.onReadOnlyChanged = function (isReadOnly) {
        //apply parent's onReadOnlyChanged
        PanelBaseWithHeader.prototype.onReadOnlyChanged.call(this, isReadOnly);

        this.widget.setReadOnly(isReadOnly);
    };

    NetLabelPanel.prototype.onResize = function (width, height) {
        this.logger.debug('onResize --> width: ' + width + ', height: ' + height);
        this.widget.onWidgetContainerResize(width, height);
    };

    NetLabelPanel.prototype.destroy = function () {
        this.control.destroy();
        this.widget.destroy();

        PanelBaseWithHeader.prototype.destroy.call(this);
        WebGMEGlobal.KeyboardManager.setListener(undefined);
        WebGMEGlobal.Toolbar.refresh();
    };

    /* override IActivePanel.prototype.onActivate */
    NetLabelPanel.prototype.onActivate = function () {
        this.widget.onActivate();
        this.control.onActivate();
        WebGMEGlobal.KeyboardManager.setListener(this.widget);
        WebGMEGlobal.Toolbar.refresh();
    };

    /* override IActivePanel.prototype.onDeactivate */
    NetLabelPanel.prototype.onDeactivate = function () {
        this.widget.onDeactivate();
        this.control.onDeactivate();
        WebGMEGlobal.KeyboardManager.setListener(undefined);
        WebGMEGlobal.Toolbar.refresh();
    };

    NetLabelPanel.prototype.getNodeID = function () {
        return this.control.getNodeID();
    };

    return NetLabelPanel;
});
