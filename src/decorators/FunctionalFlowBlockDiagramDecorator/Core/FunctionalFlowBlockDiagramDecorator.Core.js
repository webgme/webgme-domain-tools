/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */

"use strict";

define(['js/Constants',
    './FunctionalFlowBlockDiagramDecorator.Constants',
    'js/NodePropertyNames',
    'js/RegistryKeys',
    './FunctionalFlowBlockDiagramBase',
    './FunctionalFlowBlockDiagram.META',
    'text!./FunctionalFlowBlockDiagramDecorator.html',
    'text!../default.svg'], function (CONSTANTS,
                                      FFBDCONSTANTS,
                                      nodePropertyNames,
                                      REGISTRY_KEYS,
                                      FunctionalFlowBlockDiagramBase,
                                      FunctionalFlowBlockDiagramMETA,
                                      FunctionalFlowBlockDiagramDecoratorTemplate,
                                      DefaultSvgTemplate) {

    /**
     * A module representing core decorator functionality for the FunctionalFlowBlockDiagramModelingLanguage.
     * @exports FunctionalFlowBlockDiagramDecoratorCore
     * @version 1.0
     */
    var FunctionalFlowBlockDiagramDecoratorCore,
        SVG_ICON_PATH = "/decorators/FunctionalFlowBlockDiagramDecorator/Icons/";

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

    if(Object.keys(svgCache || {}).length === 0){
        var _metaAspectTypes = FunctionalFlowBlockDiagramMETA.getMetaTypes();

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

    /**
     * Creates a new instance of FunctionalFlowBlockDiagramDecoratorCore.
     * @constructor
     */
    FunctionalFlowBlockDiagramDecoratorCore = function () {
    };

    /**
     * Represents the base element that would be inserted into the DOM.
     */
    FunctionalFlowBlockDiagramDecoratorCore.prototype.$DOMBase = (function () {
        var el = $(FunctionalFlowBlockDiagramDecoratorTemplate);
        //use the same HTML template as the DefaultDecorator.DiagramDesignerWidget
        //but remove the connector DOM elements since they are not needed in the PartBrowser
        //el.find('div.name').remove();
        return el;
    })();

    /**** Override from *.WidgetDecoratorBase ****/
    FunctionalFlowBlockDiagramDecoratorCore.prototype.getTerritoryQuery = function () {
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
    FunctionalFlowBlockDiagramDecoratorCore.prototype._initializeDecorator = function (params) {
        this.$name = undefined;

        this._displayConnectors = false;
        if (params && params.connectors) {
            this._displayConnectors = params.connectors;
        }
    };

    /**
     * Downloads and caches the svg files for a given METAType based on a gmeID
     * @param gmeID {string} An ID of the GME object.
     * @returns {*|jQuery|HTMLElement} SVG element that should be displayed.
     */
    FunctionalFlowBlockDiagramDecoratorCore.prototype.getSVGByMetaType = function (gmeID) {

        // define local variables
        var FunctionalFlowBlockDiagramClassNames,
            FunctionalFlowBlockDiagramClassName,
            returnSVG,
            len;

        // get all META types for the given GME object including inheritance in the meta model
        FunctionalFlowBlockDiagramClassNames = FunctionalFlowBlockDiagramMETA.getMetaTypesOf(gmeID);

        // reverse the list since the iteration is backwards in the while loop
        FunctionalFlowBlockDiagramClassNames.reverse();

        // length of the list on which the iteration is performed
        len = FunctionalFlowBlockDiagramClassNames.length;

        // iterate through the list from the last element to the first one
        while (len--) {
            // get current the META type name
            FunctionalFlowBlockDiagramClassName = FunctionalFlowBlockDiagramClassNames[len];

            if (FunctionalFlowBlockDiagramClassName === undefined || FunctionalFlowBlockDiagramClassName === null || FunctionalFlowBlockDiagramClassName === "") {

                // if the META type name is invalid return with an error SVG
                returnSVG = errorSVGBase.clone();

            } else {

                // META type name is valid
                if (svgCache[FunctionalFlowBlockDiagramClassName]) {

                    // if META type name is already in the cache use the cached value
                    // do NOT download again from the server
                    returnSVG = svgCache[FunctionalFlowBlockDiagramClassName].clone();
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
    FunctionalFlowBlockDiagramDecoratorCore.prototype.getErrorSVG = function () {

        return this._errorSVGBase.clone();
    };

    /**
     * @todo Not implemented yet.
     * @param searchDesc {string} Search description or query.
     * @returns {boolean} True if this object satisfies the search condition.
     */
    FunctionalFlowBlockDiagramDecoratorCore.prototype.doSearch = function (searchDesc) {

        //TODO: correct implementation needed
        return false;
    };

    /**
     * Renders the content in the placeholder DOM element.
     * @private
     */
    FunctionalFlowBlockDiagramDecoratorCore.prototype._renderContent = function () {

        // gme id of the rendered object
        var gmeID = this._metaInfo[CONSTANTS.GME_ID];

        // meta type of the rendered object
        this._metaType = FunctionalFlowBlockDiagramMETA.getMetaTypesOf(gmeID)[0];


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


        var isTypeFunction = FunctionalFlowBlockDiagramMETA.TYPE_INFO.isFunction(gmeID),
            isTypeReference = FunctionalFlowBlockDiagramMETA.TYPE_INFO.isReference(gmeID),
            isTypeLogicSymbol = FunctionalFlowBlockDiagramMETA.TYPE_INFO.isLogicSymbol(gmeID);

        if (isTypeReference || isTypeFunction || isTypeLogicSymbol) {

            _.extend(this, new FunctionalFlowBlockDiagramBase());
        }


        // call the type specific renderer
        this._renderMetaTypeSpecificParts();

        // update the rendered object
        this.update();
    };


    /**
     * Updates the rendered object. This function is called by the Widget.
     */
    FunctionalFlowBlockDiagramDecoratorCore.prototype.update = function () {

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
    FunctionalFlowBlockDiagramDecoratorCore.prototype._update = function () {

        // update name of the rendered object
        this._updateColors();
        this._updateName();
        this._updatePorts();
    };

    FunctionalFlowBlockDiagramDecoratorCore.prototype._updateColors = function () {
        this._getNodeColorsFromRegistry();

        if (this.fillColor) {
            this.skinParts.$svg.find('path').attr('fill', this.fillColor);
            this.skinParts.$svg.find('ellipse').attr('fill', this.fillColor);
            this.skinParts.$svg.find('rect').attr('fill', this.fillColor);
        } else {
            this.$el.css({'background-color': ''});
        }

        if (this.borderColor) {
            this.skinParts.$svg.css({'border-color': this.borderColor,
                'box-shadow': '0px 0px 7px 0px ' + this.borderColor + ' inset'});
            this.skinParts.$name.css({'border-color': this.borderColor});
        } else {
            this.$el.css({'border-color': '',
                'box-shadow': ''});
            this.skinParts.$name.css({'border-color': ''});
        }

        if (this.textColor) {
            this.$el.css({'color': this.textColor});
        } else {
            this.$el.css({'color': ''});
        }
    };

    FunctionalFlowBlockDiagramDecoratorCore.prototype._getNodeColorsFromRegistry = function () {
        var objID = this._metaInfo[CONSTANTS.GME_ID];
        this.fillColor = this.preferencesHelper.getRegistry(objID, REGISTRY_KEYS.COLOR, true);
        this.borderColor = this.preferencesHelper.getRegistry(objID, REGISTRY_KEYS.BORDER_COLOR, true);
        this.textColor = this.preferencesHelper.getRegistry(objID, REGISTRY_KEYS.TEXT_COLOR, true);
    };

    /**
     * Updates the name of the rendered object.
     * @private
     */
    FunctionalFlowBlockDiagramDecoratorCore.prototype._updateName = function () {

        // initialize local variables
        var control = this._control,
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            name = (control._client.getNode(gmeID)).getAttribute(nodePropertyNames.Attributes.name),
            isTypeLogicSymbol = FunctionalFlowBlockDiagramMETA.TYPE_INFO.isLogicSymbol(gmeID),
            isTypeReference = FunctionalFlowBlockDiagramMETA.TYPE_INFO.isReference(gmeID),
            isTypeFunction = FunctionalFlowBlockDiagramMETA.TYPE_INFO.isFunction(gmeID),
            isTypeFFBDiagram = FunctionalFlowBlockDiagramMETA.TYPE_INFO.isFFBDiagram(gmeID),
            MARGIN_TOPs = {'logic': '10px', 'default': '45px', 'diagram': '60px', 'other': '35px', 'none': '0px'},
            MARGIN_LEFT = '-20px',
            WIDTHs = {'logic': '38px', 'ref': '80px', 'default': '150px'};


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

            if (isTypeLogicSymbol && gmeID != FunctionalFlowBlockDiagramMETA.getMetaTypes().LogicSymbol) {

                this.skinParts.$name.css('text-align', 'center');
                this.skinParts.$name.css('width', WIDTHs['logic']);
                this.skinParts.$name.css('margin-top', MARGIN_TOPs['logic']);

            } else if (isTypeFunction || isTypeReference) {

                this.skinParts.$name.css('width', WIDTHs['ref']);
                this.skinParts.$name.css('margin-top', MARGIN_TOPs['none']);

            } else if (errorSVGBase.text() == this.skinParts.$svg.text()) {

                this.skinParts.$name.css('width', WIDTHs['default']);
                this.skinParts.$name.css('margin-top', MARGIN_TOPs['default']);

            } else if (isTypeFFBDiagram) {

                this.skinParts.$name.css('width', WIDTHs['default']);
                this.skinParts.$name.css('margin-top', MARGIN_TOPs['diagram']);

            } else {
                this.skinParts.$name.css('margin-left', MARGIN_LEFT);
                this.skinParts.$name.css('margin-top', MARGIN_TOPs['other']);
            }
        }
    };

    /* TO BE OVERRIDDEN IN META TYPE SPECIFIC CODE */

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    FunctionalFlowBlockDiagramDecoratorCore.prototype._updatePorts = function () {

    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    FunctionalFlowBlockDiagramDecoratorCore.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Registers a GME ID for notifications.
     * @param portId {string} GME ID for getting notification about this object.
     * @private
     */
    FunctionalFlowBlockDiagramDecoratorCore.prototype._registerForNotification = function(portId) {

    };

    /**
     * Unregisters a GME ID from the event notifications.
     * @param portId {string} GME ID for getting notification about this object.
     * @private
     */
    FunctionalFlowBlockDiagramDecoratorCore.prototype._unregisterForNotification = function(portId) {

    };


    return FunctionalFlowBlockDiagramDecoratorCore;
});
