/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Authors:
 * Peng Zhang
 */

"use strict";

define(['js/Constants',
    'js/NodePropertyNames',
    './PetriNetBase',
    './PetriNetDecorator.Constants',
    './PetriNet.META',
    'text!./PetriNetDecorator.html',
    'text!../default.svg',
    'text!../Icons/Token.svg'], function (CONSTANTS,
                                      nodePropertyNames,
                                      PetriNetBase,
                                      PetriNetDecoratorConstants,
                                      PetriNetMETA,
                                      PetriNetDecoratorTemplate,
                                      DefaultSvgTemplate,
                                      TokenSVG) {

    /**
    * A module representing core decorator functionality for the PetriNetModelingLanguage.
    * @exports PetriNetDecoratorCore
    * @version 1.0
    */
    var PetriNetDecoratorCore,
        SVG_ICON_PATH = "/decorators/PetriNetDecorator/Icons/",
        TokenBase = $(TokenSVG).find("g.token");

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
     * Creates a new instance of PetriNetDecoratorCore.
     * @constructor
     */
    PetriNetDecoratorCore = function () {
    };

    /**
     * Represents the base element that would be inserted into the DOM.
     */
    PetriNetDecoratorCore.prototype.$DOMBase = (function () {
        var el = $(PetriNetDecoratorTemplate);
        //use the same HTML template as the DefaultDecorator.DiagramDesignerWidget
        //but remove the connector DOM elements since they are not needed in the PartBrowser
        //el.find('div.name').remove();
        return el;
    })();

    /**** Override from *.WidgetDecoratorBase ****/
	PetriNetDecoratorCore.prototype.getTerritoryQuery = function () {
        var territoryRule = {};

        territoryRule[this._metaInfo[CONSTANTS.GME_ID]] = { "children": 1 };

        return territoryRule;
    };

    /**
     * Initializes decorator.
     * @param params {object}  parameters for initialization
     * @param params.connectors {boolean} True if connectors have to be rendered otherwise false.
     * @private
     */
    PetriNetDecoratorCore.prototype._initializeDecorator = function (params) {
        this.$name = undefined;

        this._displayConnectors = false;
        if (params && params.connectors) {
            this._displayConnectors = params.connectors;
        }

        if(Object.keys(svgCache || {}).length === 0){
            var _metaAspectTypes = PetriNetMETA.getMetaTypes();

            for (var m in _metaAspectTypes) {
                // TODO: use the right code to do this
                if (_metaAspectTypes.hasOwnProperty(m)) {

                    // get the svg's url on the server for this META type
                    var svg_resource_url = SVG_ICON_PATH + m + ".svg";

                    // get the svg from the server in SYNC mode, may take some time
                    $.ajax(svg_resource_url, {'async': false})
                        .done(function ( data ) {

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
    PetriNetDecoratorCore.prototype.getSVGByMetaType = function (gmeID) {

        // define local variables
        var PetriNetClassNames,
            PetriNetClassName,
            returnSVG,
            len;

        // get all META types for the given GME object including inheritance in the meta model
        PetriNetClassNames = PetriNetMETA.getMetaTypesOf(gmeID);

        // reverse the list since the iteration is backwards in the while loop
        PetriNetClassNames.reverse();

        // length of the list on which the iteration is performed
        len = PetriNetClassNames.length;

        // iterate through the list from the last element to the first one
        while (len--) {
            // get current the META type name
            PetriNetClassName = PetriNetClassNames[len];

            if (PetriNetClassName === undefined || PetriNetClassName === null || PetriNetClassName === "") {

                // if the META type name is invalid return with an error SVG
                returnSVG = errorSVGBase.clone();

            } else {

                // META type name is valid
                if (svgCache[PetriNetClassName]) {

                    // if META type name is already in the cache use the cached value
                    // do NOT download again from the server
                    returnSVG = svgCache[PetriNetClassName].clone();
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
     * Gets a clone of an error svg icon.
     * @returns {*|jQuery|HTMLElement} Error svg icon.
     */
    PetriNetDecoratorCore.prototype.getErrorSVG = function () {

        return this._errorSVGBase.clone();
    };

    /**
     * @todo Not implemented yet.
     * @param searchDesc {string} Search description or query.
     * @returns {boolean} True if this object satisfies the search condition.
     */
    PetriNetDecoratorCore.prototype.doSearch = function (searchDesc) {

        //TODO: correct implementation needed
        return false;
    };

    /**
     * Renders the content in the placeholder DOM element.
     * @private
     */
    PetriNetDecoratorCore.prototype._renderContent = function () {

        // gme id of the rendered object
        var gmeID = this._metaInfo[CONSTANTS.GME_ID],
            isTypePlace = PetriNetMETA.TYPE_INFO.isPlace(gmeID),
            isTypeTransition = PetriNetMETA.TYPE_INFO.isTransition(gmeID);

        // meta type of the rendered object
        this._metaType = PetriNetMETA.getMetaTypesOf(gmeID)[0];


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

            this.$el.find('.svg-container').append(this.skinParts.$svg);

            //render the connectors
            this.skinParts.$connectorContainer = this.$el.find('.connector-container');
            this.skinParts.$connectorContainer.empty();

        } else {

            // append error svg if the svg does not exist for this element
            this.$el.find('.svg-container').append(this.getErrorSVG());
        }

        if (isTypePlace || isTypeTransition) {

            _.extend(this, new PetriNetBase());
        }

        // call the type specific renderer
        this._renderMetaTypeSpecificParts();

        // update the rendered object
        this.update();
    };

    /**
     * Gets a clone of a port svg icon.
     * @returns {*|jQuery|HTMLElement} Port svg icon.
     */
    PetriNetDecoratorCore.prototype.getTokenSVG = function () {
        var control = this._control,
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            color = control._client.getNode(gmeID).getAttribute(PetriNetDecoratorConstants.COLOR);

        TokenBase.find('ellipse').attr('fill', color);

        return TokenBase.clone();
    };

    /**
     * Updates the rendered object. This function is called by the Widget.
     */
    PetriNetDecoratorCore.prototype.update = function () {

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
    PetriNetDecoratorCore.prototype._update = function () {

        // update name of the rendered object
        this._updateName();
        this._updatePorts();
    };

    /**
     * Updates the name of the rendered object.
     * @private
     */
    PetriNetDecoratorCore.prototype._updateName = function () {

        // initialize local variables
        var control = this._control,
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            isTypePlace = PetriNetMETA.TYPE_INFO.isPlace(gmeID),
            isTypeTransition = PetriNetMETA.TYPE_INFO.isTransition(gmeID),
            name = control._client.getNode(gmeID).getAttribute(nodePropertyNames.Attributes.name);

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

            if (isTypePlace || isTypeTransition) {

                this.skinParts.$name.css('width', '50px');
            }
        }
    };

    /* TO BE OVERRIDDEN IN META TYPE SPECIFIC CODE */

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    PetriNetDecoratorCore.prototype._updatePorts = function () {

    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    PetriNetDecoratorCore.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Registers a GME ID for notifications.
     * @param portId {string} GME ID for getting notification about this object.
     * @private
     */
    PetriNetDecoratorCore.prototype._registerForNotification = function(portId) {

    };

    /**
     * Unregisters a GME ID from the event notifications.
     * @param portId {string} GME ID for getting notification about this object.
     * @private
     */
    PetriNetDecoratorCore.prototype._unregisterForNotification = function(portId) {

    };


    return PetriNetDecoratorCore;
});
