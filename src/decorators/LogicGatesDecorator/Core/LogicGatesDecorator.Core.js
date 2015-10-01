/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * Authors:
 * Zsolt Lattmann
 * Robert Kereskenyi
 */

"use strict";

define(['js/Constants',
    'js/NodePropertyNames',
    './IOElements',
    './LogicGateBase',
    './LogicCircuit',
    './LogicGates.META',
    'text!./LogicGatesDecorator.html',
    'text!../default.svg',
    'text!../Icons/Port.svg'], function (CONSTANTS,
                                         nodePropertyNames,
                                         IOElements,
                                         LogicGateBase,
                                         LogicCircuit,
                                         LogicGatesMETA,
                                         LogicGatesDecoratorTemplate,
                                         DefaultSvgTemplate,
                                         PortSvg) {

    /**
     * A module representing core decorator functionality for the LogicGatesModelingLanguage.
     * @exports LogicGatesDecoratorCore
     * @version 1.0
     */
    var LogicGatesDecoratorCore,
        SVG_ICON_PATH = "/decorators/LogicGatesDecorator/Icons/",
        PortBase = $(PortSvg).find("g.port");

    /**
     * Contains downloaded svg elements from the server.
     * @type {{}}
     * @private
     */
    var svgCache = {};

    /**
     * Svg element that can be used as a placeholder for the icon if the icon does not exist on the server.
     * @type {*|jQuery|HTMLElement}
     * @private
     */
    var errorSVGBase = $(DefaultSvgTemplate);


    /**
     * Creates a new instance of LogicGatesDecoratorCore.
     * @constructor
     */
    LogicGatesDecoratorCore = function () {
    };

    /**
     * Represents the base element that would be inserted into the DOM.
     */
    LogicGatesDecoratorCore.prototype.$DOMBase = (function () {
        var el = $(LogicGatesDecoratorTemplate);
        //use the same HTML template as the DefaultDecorator.DiagramDesignerWidget
        //but remove the connector DOM elements since they are not needed in the PartBrowser
        //el.find('div.name').remove();
        return el;
    })();

    /**** Override from *.WidgetDecoratorBase ****/
    LogicGatesDecoratorCore.prototype.getTerritoryQuery = function () {
        var territoryRule = {};

        territoryRule[this._metaInfo[CONSTANTS.GME_ID]] = {"children": 1};

        return territoryRule;
    };

    /**
     * Initializes decorator.
     * @param params {object}  parameters for initialization
     * @param params.connectors {boolean} True if connectors have to be rendered otherwise false.
     * @private
     */
    LogicGatesDecoratorCore.prototype._initializeDecorator = function (params) {
        this.$name = undefined;

        this._displayConnectors = false;
        if (params && params.connectors) {
            this._displayConnectors = params.connectors;
        }

        if(Object.keys(svgCache || {}).length === 0){
            var _metaAspectTypes = LogicGatesMETA.getMetaTypes();

            for (var m in _metaAspectTypes) {

                if (_metaAspectTypes.hasOwnProperty(m)) {

                    // get the svg's url on the server for this META type
                    var svg_resource_url = SVG_ICON_PATH + m + ".svg";

                    // get the svg from the server in SYNC mode, may take some time
                    $.ajax(svg_resource_url, {'async': false})
                        .done(function (data) {

                            // TODO: console.debug('Successfully downloaded: ' + svg_resource_url + ' for ' + metaType);
                            // downloaded successfully
                            // cache the downloaded content
                            svgCache[m] = $(data.childNodes[0]);
                        })
                        .fail(function () {

                            // download failed for this type
                            // TODO: console.warning('Failed to download: ' + svg_resource_url);
                        });
                }
            }
        }

    };

    /**
     * Downloads and caches the svg files for a given METAType based on a gmeID
     * @param gmeID {string} An ID of the GME object.
     * @returns {*|jQuery|HTMLElement} SVG element that should be displayed.
     */
    LogicGatesDecoratorCore.prototype.getSVGByMetaType = function (gmeID) {

        // define local variables
        var LogicGatesClassNames,
            LogicGatesClassName,
            returnSVG,
            len;

        // get all META types for the given GME object including inheritance in the meta model
        LogicGatesClassNames = LogicGatesMETA.getMetaTypesOf(gmeID);

        // reverse the list since the iteration is backwards in the while loop
        LogicGatesClassNames.reverse();

        // lenght of the list on which the iteration is performed
        len = LogicGatesClassNames.length;

        // iterate through the list from the last element to the first one
        while (len--) {
            // get current the META type name
            LogicGatesClassName = LogicGatesClassNames[len];

            if (LogicGatesClassName === undefined || LogicGatesClassName === null || LogicGatesClassName === "") {

                // if the META type name is invalid return with an error SVG
                returnSVG = errorSVGBase.clone();

            } else {

                // META type name is valid
                if (svgCache[LogicGatesClassName]) {

                    // if META type name is already in the cache use the cached value
                    // do NOT download again from the server
                    returnSVG = svgCache[LogicGatesClassName].clone();

                }
            }
        }

        if (returnSVG === undefined) {

            // if svg is not defined use the default error svg
            returnSVG = errorSVGBase.clone();
        }

        return returnSVG;
    };

    /**
     * Gets a clone of a port svg icon.
     * @returns {*|jQuery|HTMLElement} Port svg icon.
     */
    LogicGatesDecoratorCore.prototype.getPortSVG = function () {

        return PortBase.clone();
    };

    /**
     * Gets a clone of an error svg icon.
     * @returns {*|jQuery|HTMLElement} Error svg icon.
     */
    LogicGatesDecoratorCore.prototype.getErrorSVG = function () {

        return this._errorSVGBase.clone();
    };

    /**
     * @todo Not implemented yet.
     * @param searchDesc {string} Search description or query.
     * @returns {boolean} True if this object satisfies the search condition.
     */
    LogicGatesDecoratorCore.prototype.doSearch = function (searchDesc) {

        //TODO: correct implementation needed
        return false;
    };

    /**
     * Renders the content in the placeholder DOM element.
     * @private
     */
    LogicGatesDecoratorCore.prototype._renderContent = function () {

        // gme id of the rendered object
        var gmeID = this._metaInfo[CONSTANTS.GME_ID];

        // meta type of the rendered object
        this._metaType = LogicGatesMETA.getMetaTypesOf(gmeID)[0];


        if (DEBUG) {

            //render GME-ID in the DOM, for debugging
            this.$el.attr({"data-id": gmeID});
        }

        // setting the name of component
        this.skinParts.$name = this.$el.find(".name");

        //empty out SVG container
        this.$el.find('.svg-container').empty();

        //figure out the necessary SVG based on children type
        this.skinParts.$svg = this.getSVGByMetaType(gmeID);

        if (this.skinParts.$svg) {

            //this.skinParts.$svg.append(this._LogicGatesDecoratorCore.getPortSVG());
            this.$el.find('.svg-container').append(this.skinParts.$svg);

            //render the connectors
            this.skinParts.$connectorContainer = this.$el.find('.connector-container');
            this.skinParts.$connectorContainer.empty();

        } else {

            // append error svg if the svg does not exist for this element
            this.$el.find('.svg-container').append(this.getErrorSVG());
        }

        // get domain specific knowledge
        var isTypeLogicCircuit = LogicGatesMETA.TYPE_INFO.isLogicCircuit(gmeID),
            isTypeLogicGateBase = LogicGatesMETA.TYPE_INFO.isLogicGateBase(gmeID),
            isTypeUserInput = LogicGatesMETA.TYPE_INFO.isUserInput(gmeID),
            isTypeUserOutput = LogicGatesMETA.TYPE_INFO.isUserOutput(gmeID),
            isTypeClock = LogicGatesMETA.TYPE_INFO.isClock(gmeID);

        if (isTypeUserInput || isTypeUserOutput || isTypeClock) {

            // use the IOElements decorator
            _.extend(this, new IOElements());

        } else if (isTypeLogicGateBase) {

            // use the LogicGateBase decorator
            _.extend(this, new LogicGateBase());

        } else if (isTypeLogicCircuit) {

            // use the LogicCircuit decorator
            _.extend(this, new LogicCircuit());

        }

        // call the type specific renderer
        this._renderMetaTypeSpecificParts();

        // update the rendered object
        this.update();
    };


    /**
     * Updates the rendered object. This function is called by the Widget.
     */
    LogicGatesDecoratorCore.prototype.update = function () {

        // internal update function
        this._update();

        if (this._displayConnectors) {

            // initializes the connectors if they have to be displayed.
            this.initializeConnectors();
        }
    };

    /**
     * Updates the rendered object.
     * @private
     */
    LogicGatesDecoratorCore.prototype._update = function () {

        // initialize local variables
        var gmeID = this._metaInfo[CONSTANTS.GME_ID],
            client = this._control._client,
            nodeObj = client.getNode(gmeID),
            childrenIDs = nodeObj ? nodeObj.getChildrenIds() : [],
            portId,
            len;

        // children count
        len = childrenIDs.length;

        while (len--) {

            // TODO: do this only for ports

            // get current port id
            portId = childrenIDs[len];

            // register this port for notifications
            this._registerForNotification(portId);
        }

        // update name of the rendered object
        this._updateName();

        // update all ports for the rendered object
        this._updatePorts();

    };

    /**
     * Updates the name of the rendered object.
     * @private
     */
    LogicGatesDecoratorCore.prototype._updateName = function () {

        // initialize local variables
        var control = this._control,
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            name = (control._client.getNode(gmeID)).getAttribute(nodePropertyNames.Attributes.name),
            META_TYPES = LogicGatesMETA.getMetaTypes(),
            isAbstractType = gmeID === META_TYPES.LogicGateBase || gmeID === META_TYPES.SimpleLogicGate ||
                             gmeID === META_TYPES.ComplexLogicGate,
            isTypeLogicGate = LogicGatesMETA.TYPE_INFO.isLogicGateBase(gmeID) && !isAbstractType,
            isAbstractIOType = gmeID === META_TYPES.PortBase || gmeID === META_TYPES.NumericIOBase ||
                               gmeID === META_TYPES.UserInputBase,
            isTypeUserOutput = LogicGatesMETA.TYPE_INFO.isUserOutput(gmeID),
            isAnyIOType = LogicGatesMETA.TYPE_INFO.isNumericIOBase(gmeID) ||
                          LogicGatesMETA.TYPE_INFO.isPortBase(gmeID) ||
                          LogicGatesMETA.TYPE_INFO.isUserInputBase(gmeID) || isTypeUserOutput,
            isIOType = isAnyIOType && !isAbstractType,
            isTypeUserInput = LogicGatesMETA.TYPE_INFO.isUserInput(gmeID),
            isTypeClock = LogicGatesMETA.TYPE_INFO.isClock(gmeID);

        if (this.skinParts.$name) {

            // if name exists
            if (name.indexOf('!') == 0) {

                // if name startswith '!' that means the text has to have an overline
                this.skinParts.$name.text(name.slice(1));
                this.skinParts.$name.css('text-decoration', 'overline');

            } else {

                // normal text
                this.skinParts.$name.text(name);
                this.skinParts.$name.css('text-decoration', 'none');
            }

            if (isIOType || isTypeLogicGate) {

                //this.skinParts.$name.css('width', '80px');
            }
        }
    };


    /* TO BE OVERRIDDEN IN META TYPE SPECIFIC CODE */

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    LogicGatesDecoratorCore.prototype._updatePorts = function () {

    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    LogicGatesDecoratorCore.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Registers a GME ID for notifications.
     * @param portId {string} GME ID for getting notification about this object.
     * @private
     */
    LogicGatesDecoratorCore.prototype._registerForNotification = function (portId) {

    };

    /**
     * Unregisters a GME ID from the event notifications.
     * @param portId {string} GME ID for getting notification about this object.
     * @private
     */
    LogicGatesDecoratorCore.prototype._unregisterForNotification = function (portId) {

    };


    return LogicGatesDecoratorCore;
});
