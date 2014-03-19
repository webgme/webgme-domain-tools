/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */

"use strict";

define(['js/Decorators/DecoratorBase',
    './DiagramDesigner/FunctionalFlowBlockDiagramDecorator.DiagramDesignerWidget',
    './PartBrowser/FunctionalFlowBlockDiagramDecorator.PartBrowserWidget'], function (
                                                           DecoratorBase,
                                                           FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget,
                                                           FunctionalFlowBlockDiagramDecoratorPartBrowserWidget) {

    /**
    * A module representing a decorator for the PN Modeling Language.
    * @exports FunctionalFlowBlockDiagramDecorator
    * @version 1.0
    */
    var FunctionalFlowBlockDiagramDecorator,
        __parent__ = DecoratorBase,
        __parent_proto__ = DecoratorBase.prototype,
        DECORATOR_ID = "FunctionalFlowBlockDiagramDecorator";

    /**
     * Represents a FunctionalFlowBlockDiagramDecorator factory.
     * @constructor
     * @param {object} params Parameters for this object.
     */
    FunctionalFlowBlockDiagramDecorator = function (params) {
        var opts = _.extend( {"loggerName": this.DECORATORID}, params);

        __parent__.apply(this, [opts]);

        this.logger.debug("FunctionalFlowBlockDiagramDecorator ctor");
    };

    _.extend(FunctionalFlowBlockDiagramDecorator.prototype, __parent_proto__);
    FunctionalFlowBlockDiagramDecorator.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DecoratorBase MEMBERS **************************/

    /**
     * Initializes the supported widget map for this decorator.
     *
     * @see FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget:FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget
     * @see FunctionalFlowBlockDiagramDecoratorPartBrowserWidget:FunctionalFlowBlockDiagramDecoratorPartBrowserWidget
     */
    FunctionalFlowBlockDiagramDecorator.prototype.initializeSupportedWidgetMap = function () {
        this.supportedWidgetMap = {'DiagramDesigner': FunctionalFlowBlockDiagramDecoratorDiagramDesignerWidget,
                                   'PartBrowser': FunctionalFlowBlockDiagramDecoratorPartBrowserWidget};
    };

    return FunctionalFlowBlockDiagramDecorator;
});
