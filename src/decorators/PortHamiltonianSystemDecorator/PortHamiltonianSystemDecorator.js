/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 *
 * Authors:
 */


define(['js/Decorators/DecoratorBase',
    './DiagramDesigner/PortHamiltonianSystemDecorator.DiagramDesignerWidget',
    './PartBrowser/PortHamiltonianSystemDecorator.PartBrowserWidget'], function (DecoratorBase,
        PortHamiltonianSystemDecoratorDiagramDesignerWidget,
        PortHamiltonianSystemDecoratorPartBrowserWidget
    ) {
    'use strict';

    /**
    * A module representing a decorator for the PortHamiltonianSystem Modeling Language.
    * @exports PortHamiltonianSystemDecorator
    * @version 1.0
    */
    var PortHamiltonianSystemDecorator,
        __parent__ = DecoratorBase,
        __parent_proto__ = DecoratorBase.prototype,
        DECORATOR_ID = "PortHamiltonianSystemDecorator";

    /**
     * Represents a PortHamiltonianSystemDecorator factory.
     * @constructor
     * @param {object} params Parameters for this object.
     */
    PortHamiltonianSystemDecorator = function (params) {
        var opts = _.extend( {"loggerName": this.DECORATORID}, params);

        __parent__.apply(this, [opts]);

        this.logger.debug("PortHamiltonianSystemDecorator ctor");
    };

    _.extend(PortHamiltonianSystemDecorator.prototype, __parent_proto__);
    PortHamiltonianSystemDecorator.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DecoratorBase MEMBERS **************************/

    /**
     * Initializes the supported widget map for this decorator.
     *
     * @see PortHamiltonianSystemDecoratorDiagramDesignerWidget:PortHamiltonianSystemDecoratorDiagramDesignerWidget
     * @see PortHamiltonianSystemDecoratorPartBrowserWidget:PortHamiltonianSystemDecoratorPartBrowserWidget
     */
    PortHamiltonianSystemDecorator.prototype.initializeSupportedWidgetMap = function () {
        this.supportedWidgetMap = {'DiagramDesigner': PortHamiltonianSystemDecoratorDiagramDesignerWidget,
                                   'PartBrowser': PortHamiltonianSystemDecoratorPartBrowserWidget};
    };

    return PortHamiltonianSystemDecorator;
});
