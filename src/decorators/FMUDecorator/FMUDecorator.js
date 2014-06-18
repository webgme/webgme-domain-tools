/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 *
 * Authors:
 */


define(['js/Decorators/DecoratorBase',
    './DiagramDesigner/FMUDecorator.DiagramDesignerWidget',
    './PartBrowser/FMUDecorator.PartBrowserWidget'], function (DecoratorBase,
        FMUDecoratorDiagramDesignerWidget,
        FMUDecoratorPartBrowserWidget
    ) {
    'use strict';

    /**
    * A module representing a decorator for the FMU Modeling Language.
    * @exports FMUDecorator
    * @version 1.0
    */
    var FMUDecorator,
        __parent__ = DecoratorBase,
        __parent_proto__ = DecoratorBase.prototype,
        DECORATOR_ID = "FMUDecorator";

    /**
     * Represents a FMUDecorator factory.
     * @constructor
     * @param {object} params Parameters for this object.
     */
    FMUDecorator = function (params) {
        var opts = _.extend( {"loggerName": this.DECORATORID}, params);

        __parent__.apply(this, [opts]);

        this.logger.debug("FMUDecorator ctor");
    };

    _.extend(FMUDecorator.prototype, __parent_proto__);
    FMUDecorator.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DecoratorBase MEMBERS **************************/

    /**
     * Initializes the supported widget map for this decorator.
     *
     * @see FMUDecoratorDiagramDesignerWidget:FMUDecoratorDiagramDesignerWidget
     * @see FMUDecoratorPartBrowserWidget:FMUDecoratorPartBrowserWidget
     */
    FMUDecorator.prototype.initializeSupportedWidgetMap = function () {
        this.supportedWidgetMap = {'DiagramDesigner': FMUDecoratorDiagramDesignerWidget,
                                   'PartBrowser': FMUDecoratorPartBrowserWidget};
    };

    return FMUDecorator;
});
