/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 */

"use strict";

define(['js/Constants',
    'js/Utils/METAAspectHelper',
    'js/NodePropertyNames',
    './ActivityDiagramBase',
    './ActivityDiagram.META',
    './ActivityDiagramDecorator.Constants',
    'text!./ActivityDiagramDecorator.html',
    'text!../default.svg'], function (CONSTANTS,
                                      METAAspectHelper,
                                      nodePropertyNames,
                                      ActivityDiagramBase,
                                      ActivityDiagramMETA,
                                      ADConstants,
                                      ActivityDiagramDecoratorTemplate,
                                      DefaultSvgTemplate) {

    /**
    * A module representing core decorator functionality for the ActivityDiagramModelingLanguage.
    * @exports ActivityDiagramDecoratorCore
    * @version 1.0
    */
    var ActivityDiagramDecoratorCore,
        SVG_ICON_PATH = "/decorators/ActivityDiagramDecorator/Icons/";

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
     * ID list of meta types.
     * @type {*}
     * @private
     */
    var _metaAspectTypes = ActivityDiagramMETA.META_TYPES;

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

    /**
     * Creates a new instance of ActivityDiagramDecoratorCore.
     * @constructor
     */
    ActivityDiagramDecoratorCore = function () {
    };

    /**
     * Represents the base element that would be inserted into the DOM.
     */
    ActivityDiagramDecoratorCore.prototype.$DOMBase = (function () {
        var el = $(ActivityDiagramDecoratorTemplate);
        //use the same HTML template as the DefaultDecorator.DiagramDesignerWidget
        //but remove the connector DOM elements since they are not needed in the PartBrowser
        //el.find('div.name').remove();
        return el;
    })();

    /**** Override from *.WidgetDecoratorBase ****/
	ActivityDiagramDecoratorCore.prototype.getTerritoryQuery = function () {
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
    ActivityDiagramDecoratorCore.prototype._initializeDecorator = function (params) {
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
    ActivityDiagramDecoratorCore.prototype.getSVGByMetaType = function (gmeID) {

        // define local variables
        var ActivityDiagramClassNames,
            ActivityDiagramClassName,
            returnSVG,
            len;

        // get all META types for the given GME object including inheritance in the meta model
        ActivityDiagramClassNames = METAAspectHelper.getMETATypesOf(gmeID);

        // reverse the list since the iteration is backwards in the while loop
        ActivityDiagramClassNames.reverse();

        // length of the list on which the iteration is performed
        len = ActivityDiagramClassNames.length;

        // iterate through the list from the last element to the first one
        while (len--) {
            // get current the META type name
            ActivityDiagramClassName = ActivityDiagramClassNames[len];

            if (ActivityDiagramClassName === undefined || ActivityDiagramClassName === null || ActivityDiagramClassName === "") {

                // if the META type name is invalid return with an error SVG
                returnSVG = errorSVGBase.clone();

            } else if (ActivityDiagramClassName != "Action"){

                // META type name is valid
                if (svgCache[ActivityDiagramClassName]) {

                    returnSVG = svgCache[ActivityDiagramClassName].clone();
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
    ActivityDiagramDecoratorCore.prototype.getErrorSVG = function () {

        return this._errorSVGBase.clone();
    };

    /**
     * @todo Not implemented yet.
     * @param searchDesc {string} Search description or query.
     * @returns {boolean} True if this object satisfies the search condition.
     */
    ActivityDiagramDecoratorCore.prototype.doSearch = function (searchDesc) {

        //TODO: correct implementation needed
        return false;
    };

    /**
     * Renders the content in the placeholder DOM element.
     * @private
     */
    ActivityDiagramDecoratorCore.prototype._renderContent = function () {

        // gme id of the rendered object
        var gmeID = this._metaInfo[CONSTANTS.GME_ID],
            META_TYPES = ActivityDiagramMETA.META_TYPES, 
            isTypeDecision = METAAspectHelper.isMETAType(gmeID, META_TYPES.Decision),
            isTypeBar = METAAspectHelper.isMETAType(gmeID, META_TYPES.Bar),
            isTypeActionBase = METAAspectHelper.isMETAType(gmeID, META_TYPES.ActionBase),
            isTypeAction = METAAspectHelper.isMETAType(gmeID, META_TYPES.Action);

        // meta type of the rendered object
        this._metaType = METAAspectHelper.getMETATypesOf(gmeID)[0];

        if (DEBUG) {

            //render GME-ID in the DOM, for debugging
            this.$el.attr({"data-id": gmeID});
        }


        // setting the name of component
        this.skinParts.$name = this.$el.find('.name');

        if (isTypeAction) {

            this.$el.find('.svg-container').remove();
            this.skinParts.$name.css('border', '1px solid #000000');
            this.skinParts.$name.css('border-radius', '2em');
            this.skinParts.$name.css('min-width', '80px');
            this.skinParts.$name.css('display', 'block');
            this.skinParts.$connectorContainer = this.$el.find('.connector-container');
            this.skinParts.$connectorContainer.empty();

        } else {

            //empty out SVG container
            this.$el.find('.svg-container').empty();

            //figure out the necessary SVG based on children type
            this.skinParts.$svg = this.getSVGByMetaType(gmeID);

            if (this.skinParts.$svg) {

                //this.skinParts.$svg.append(this._ActivityDiagramDecoratorCore.getPortSVG());
                this.$el.find('.svg-container').append(this.skinParts.$svg);

                //render the connectors
                this.skinParts.$connectorContainer = this.$el.find('.connector-container');
                this.skinParts.$connectorContainer.empty();

            } else {

                // append error svg if the svg does not exist for this element
                this.$el.find('.svg-container').append(this.getErrorSVG());
            }
        }
        

        if (isTypeDecision || isTypeBar || isTypeActionBase) {

        	_.extend(this, new ActivityDiagramBase());

        }

        // call the type specific renderer
        this._renderMetaTypeSpecificParts();

        // update the rendered object
        this.update();
    };


    /**
     * Updates the rendered object. This function is called by the Widget.
     */
    ActivityDiagramDecoratorCore.prototype.update = function () {

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
    ActivityDiagramDecoratorCore.prototype._update = function () {

        // update name of the rendered object
        this._updateName();
        this._updatePorts();
    };

    /**
     * Updates the name of the rendered object.
     * @private
     */
    ActivityDiagramDecoratorCore.prototype._updateName = function () {

        // initialize local variables
        var control = this._control,
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            name = (control._client.getNode(gmeID)).getAttribute(nodePropertyNames.Attributes.name), 
        	META_TYPES = ActivityDiagramMETA.META_TYPES, 
        	isTypeAction = METAAspectHelper.isMETAType(gmeID, META_TYPES.Action),
        	isTypeDecision = METAAspectHelper.isMETAType(gmeID, META_TYPES.Decision),
        	isTypeBar = METAAspectHelper.isMETAType(gmeID, META_TYPES.Bar),
        	isTypeStart = METAAspectHelper.isMETAType(gmeID, META_TYPES.Start),
        	isTypeEnd = METAAspectHelper.isMETAType(gmeID, META_TYPES.End);

        // update bar's width attribute
        if (isTypeBar) {

            var bar_width = this._control._client.getNode(gmeID).getAttribute(ADConstants.BAR_WIDTH);
            this.skinParts.$svg.attr('width', bar_width);
            this.skinParts.$svg.find('rect').attr('width', bar_width);
        }

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

            if (isTypeAction) {

                var len = name.length * ADConstants.NAME_DIV_FIXTURE,
                    width_set = len > ADConstants.MIN_WIDTH ? len : ADConstants.MIN_WIDTH;
                this.skinParts.$name.css('width', width_set);

            } else{

                this.skinParts.$name.css('width', ADConstants.DEFAULT_NAME_WIDTH);
            }

            if (this._hideName) {

                return;
            }

            if (isTypeBar || isTypeDecision || isTypeStart || isTypeEnd) {

            	this.skinParts.$name.hide();
            } 
        }
    };

    /* TO BE OVERRIDDEN IN META TYPE SPECIFIC CODE */

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    ActivityDiagramDecoratorCore.prototype._updatePorts = function () {

    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    ActivityDiagramDecoratorCore.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Registers a GME ID for notifications.
     * @param portId {string} GME ID for getting notification about this object.
     * @private
     */
    ActivityDiagramDecoratorCore.prototype._registerForNotification = function(portId) {

    };

    /**
     * Unregisters a GME ID from the event notifications.
     * @param portId {string} GME ID for getting notification about this object.
     * @private
     */
    ActivityDiagramDecoratorCore.prototype._unregisterForNotification = function(portId) {

    };


    return ActivityDiagramDecoratorCore;
});
