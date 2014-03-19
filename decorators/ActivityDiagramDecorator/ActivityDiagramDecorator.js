/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */

"use strict";

define(['js/Decorators/DecoratorBase',
    './DiagramDesigner/ActivityDiagramDecorator.DiagramDesignerWidget',
    './PartBrowser/ActivityDiagramDecorator.PartBrowserWidget'], function (
                                                           DecoratorBase,
                                                           ActivityDiagramDecoratorDiagramDesignerWidget,
                                                           ActivityDiagramDecoratorPartBrowserWidget) {

    /**
    * A module representing a decorator for the PN Modeling Language.
    * @exports ActivityDiagramDecorator
    * @version 1.0
    */
    var ActivityDiagramDecorator,
        __parent__ = DecoratorBase,
        __parent_proto__ = DecoratorBase.prototype,
        DECORATOR_ID = "ActivityDiagramDecorator";

    /**
     * Represents a ActivityDiagramDecorator factory.
     * @constructor
     * @param {object} params Parameters for this object.
     */
    ActivityDiagramDecorator = function (params) {
        var opts = _.extend( {"loggerName": this.DECORATORID}, params);

        __parent__.apply(this, [opts]);

        this.logger.debug("ActivityDiagramDecorator ctor");
    };

    _.extend(ActivityDiagramDecorator.prototype, __parent_proto__);
    ActivityDiagramDecorator.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DecoratorBase MEMBERS **************************/

    /**
     * Initializes the supported widget map for this decorator.
     *
     * @see ActivityDiagramDecoratorDiagramDesignerWidget:ActivityDiagramDecoratorDiagramDesignerWidget
     * @see ActivityDiagramDecoratorPartBrowserWidget:ActivityDiagramDecoratorPartBrowserWidget
     */
    ActivityDiagramDecorator.prototype.initializeSupportedWidgetMap = function () {
        this.supportedWidgetMap = {'DiagramDesigner': ActivityDiagramDecoratorDiagramDesignerWidget,
                                   'PartBrowser': ActivityDiagramDecoratorPartBrowserWidget};
    };

    return ActivityDiagramDecorator;
});
