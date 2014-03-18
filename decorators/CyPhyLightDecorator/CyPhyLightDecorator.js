/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 *
 * Authors:
 */

"use strict";

define(['js/Decorators/DecoratorBase',
    './DiagramDesigner/CyPhyLightDecorator.DiagramDesignerWidget',
    './PartBrowser/CyPhyLightDecorator.PartBrowserWidget'], function (
                                                           DecoratorBase,
                                                           CyPhyLightDecoratorDiagramDesignerWidget,
                                                           CyPhyLightDecoratorPartBrowserWidget) {

    /**
    * A module representing a decorator for the PN Modeling Language.
    * @exports CyPhyLightDecorator
    * @version 1.0
    */
    var CyPhyLightDecorator,
        __parent__ = DecoratorBase,
        __parent_proto__ = DecoratorBase.prototype,
        DECORATOR_ID = "CyPhyLightDecorator";

    /**
     * Represents a CyPhyLightDecorator factory.
     * @constructor
     * @param {object} params Parameters for this object.
     */
    CyPhyLightDecorator = function (params) {
        var opts = _.extend( {"loggerName": this.DECORATORID}, params);

        __parent__.apply(this, [opts]);

        this.logger.debug("CyPhyLightDecorator ctor");
    };

    _.extend(CyPhyLightDecorator.prototype, __parent_proto__);
    CyPhyLightDecorator.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DecoratorBase MEMBERS **************************/

    /**
     * Initializes the supported widget map for this decorator.
     *
     * @see CyPhyLightDecoratorDiagramDesignerWidget:CyPhyLightDecoratorDiagramDesignerWidget
     * @see CyPhyLightDecoratorPartBrowserWidget:CyPhyLightDecoratorPartBrowserWidget
     */
    CyPhyLightDecorator.prototype.initializeSupportedWidgetMap = function () {
        this.supportedWidgetMap = {'DiagramDesigner': CyPhyLightDecoratorDiagramDesignerWidget,
                                   'PartBrowser': CyPhyLightDecoratorPartBrowserWidget};
    };

    return CyPhyLightDecorator;
});
