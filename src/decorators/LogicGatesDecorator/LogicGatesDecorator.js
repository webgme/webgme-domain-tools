/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * Authors:
 * Zsolt Lattmann
 * Robert Kereskenyi
 */

"use strict";

define(['js/Decorators/DecoratorBase',
    './DiagramDesigner/LogicGatesDecorator.DiagramDesignerWidget',
    './PartBrowser/LogicGatesDecorator.PartBrowserWidget'], function (
                                                           DecoratorBase,
                                                           LogicGatesDecoratorDiagramDesignerWidget,
                                                           LogicGatesDecoratorPartBrowserWidget) {

    /**
    * A module representing a decorator for the Logic Gates Modeling Language.
    * @exports LogicGatesDecorator
    * @version 1.0
    */
    var LogicGatesDecorator,
        __parent__ = DecoratorBase,
        __parent_proto__ = DecoratorBase.prototype,
        DECORATOR_ID = "LogicGatesDecorator";

    /**
     * Represents a LogicGatesDecorator factory.
     * @constructor
     * @param {object} params Parameters for this object.
     */
    LogicGatesDecorator = function (params) {
        var opts = _.extend( {"loggerName": this.DECORATORID}, params);

        __parent__.apply(this, [opts]);

        this.logger.debug("LogicGatesDecorator ctor");
    };

    _.extend(LogicGatesDecorator.prototype, __parent_proto__);
    LogicGatesDecorator.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DecoratorBase MEMBERS **************************/

    /**
     * Initializes the supported widget map for this decorator.
     *
     * @see LogicGatesDecoratorDiagramDesignerWidget:LogicGatesDecoratorDiagramDesignerWidget
     * @see LogicGatesDecoratorPartBrowserWidget:LogicGatesDecoratorPartBrowserWidget
     */
    LogicGatesDecorator.prototype.initializeSupportedWidgetMap = function () {
        this.supportedWidgetMap = {'DiagramDesigner': LogicGatesDecoratorDiagramDesignerWidget,
                                   'PartBrowser': LogicGatesDecoratorPartBrowserWidget};
    };

    return LogicGatesDecorator;
});
