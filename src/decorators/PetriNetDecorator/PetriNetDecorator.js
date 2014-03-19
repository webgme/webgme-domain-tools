/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Authors:
 * Peng Zhang
 */


"use strict";

define(['js/Decorators/DecoratorBase',
    './DiagramDesigner/PetriNetDecorator.DiagramDesignerWidget',
    './PartBrowser/PetriNetDecorator.PartBrowserWidget'], function (
                                                           DecoratorBase,
                                                           PetriNetDecoratorDiagramDesignerWidget,
                                                           PetriNetDecoratorPartBrowserWidget) {

    /**
    * A module representing a decorator for the PN Modeling Language.
    * @exports PetriNetDecorator
    * @version 1.0
    */
    var PetriNetDecorator,
        __parent__ = DecoratorBase,
        __parent_proto__ = DecoratorBase.prototype,
        DECORATOR_ID = "PetriNetDecorator";

    /**
     * Represents a PetriNetDecorator factory.
     * @constructor
     * @param {object} params Parameters for this object.
     */
    PetriNetDecorator = function (params) {
        var opts = _.extend( {"loggerName": this.DECORATORID}, params);

        __parent__.apply(this, [opts]);

        this.logger.debug("PetriNetDecorator ctor");
    };

    _.extend(PetriNetDecorator.prototype, __parent_proto__);
    PetriNetDecorator.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DecoratorBase MEMBERS **************************/

    /**
     * Initializes the supported widget map for this decorator.
     *
     * @see PetriNetDecoratorDiagramDesignerWidget:PetriNetDecoratorDiagramDesignerWidget
     * @see PetriNetDecoratorPartBrowserWidget:PetriNetDecoratorPartBrowserWidget
     */
    PetriNetDecorator.prototype.initializeSupportedWidgetMap = function () {
        this.supportedWidgetMap = {'DiagramDesigner': PetriNetDecoratorDiagramDesignerWidget,
                                   'PartBrowser': PetriNetDecoratorPartBrowserWidget};
    };

    return PetriNetDecorator;
});
