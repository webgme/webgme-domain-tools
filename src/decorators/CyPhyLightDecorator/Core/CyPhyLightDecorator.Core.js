/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 */

"use strict";

define(['js/Constants',
    'js/Utils/METAAspectHelper',
    'js/NodePropertyNames',
    './CyPhyLightBase',
    './CyPhyLight.META',
    './CyPhyLightDecorator.Constants',
    'text!./CyPhyLightDecorator.html',
    'text!../default.svg'], function (CONSTANTS,
                                      METAAspectHelper,
                                      nodePropertyNames,
                                      CyPhyLightBase,
                                      CyPhyLightMETA,
                                      ADConstants,
                                      CyPhyLightDecoratorTemplate,
                                      DefaultSvgTemplate) {

    /**
    * A module representing core decorator functionality for the CyPhyLightModelingLanguage.
    * @exports CyPhyLightDecoratorCore
    * @version 1.0
    */
    var CyPhyLightDecoratorCore,
        SVG_ICON_PATH = "/decorators/CyPhyLightDecorator/Icons/";

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
    var _metaAspectTypes = CyPhyLightMETA.META_TYPES;

    var modelicaUris = [
        'Modelica.Mechanics.Translational.Components.Damper',
        'Modelica.Mechanics.Translational.Components.Mass',
        'Modelica.Mechanics.Translational.Components.Spring',
        'Modelica.Mechanics.Translational.Interfaces.Flange_a',
        'Modelica.Mechanics.Translational.Interfaces.Flange_b',
        'ModifiedMass.MassInitial'];

    for (var i = 0; i < modelicaUris.length; i++){
        var svg_resource_url = SVG_ICON_PATH + modelicaUris[i] + ".svg";

        // get the svg from the server in SYNC mode, may take some time
        $.ajax(svg_resource_url, {'async': false})
            .done(function ( data ) {

                // TODO: console.debug('Successfully downloaded: ' + svg_resource_url + ' for ' + metaType);
                // downloaded successfully
                // cache the downloaded content
                svgCache[modelicaUris[i]] = $(data.childNodes[0]);
            })
            .fail(function () {

                // download failed for this type
                // TODO: console.warning('Failed to download: ' + svg_resource_url);
            });
    }


    /**
     * Creates a new instance of CyPhyLightDecoratorCore.
     * @constructor
     */
    CyPhyLightDecoratorCore = function () {
    };

    /**
     * Represents the base element that would be inserted into the DOM.
     */
    CyPhyLightDecoratorCore.prototype.$DOMBase = (function () {
        var el = $(CyPhyLightDecoratorTemplate);
        //use the same HTML template as the DefaultDecorator.DiagramDesignerWidget
        //but remove the connector DOM elements since they are not needed in the PartBrowser
        el.find('div.name').remove();
        return el;
    })();

    /**** Override from *.WidgetDecoratorBase ****/
	CyPhyLightDecoratorCore.prototype.getTerritoryQuery = function () {
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
    CyPhyLightDecoratorCore.prototype._initializeDecorator = function (params) {
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
    CyPhyLightDecoratorCore.prototype.getSVGByMetaType = function (gmeID) {

        // define local variables
        var CyPhyLightClassNames,
            CyPhyLightClassName,
            returnSVG,
            len;

        // get all META types for the given GME object including inheritance in the meta model
        CyPhyLightClassNames = METAAspectHelper.getMETATypesOf(gmeID);

        // reverse the list since the iteration is backwards in the while loop
        CyPhyLightClassNames.reverse();

        // length of the list on which the iteration is performed
        len = CyPhyLightClassNames.length;

        // iterate through the list from the last element to the first one
        while (len--) {
            // get current the META type name
            CyPhyLightClassName = CyPhyLightClassNames[len];

            if (CyPhyLightClassName === undefined || CyPhyLightClassName === null || CyPhyLightClassName === "") {

                // if the META type name is invalid return with an error SVG
                returnSVG = errorSVGBase.clone();

            } else if (CyPhyLightClassName == "ModelicaModel" || CyPhyLightClassName == "ModelicaConnector"){

                // META type name is valid
                var currModelicaURI = this._control._client.getNode(gmeID).getAttribute("Class");

                if (svgCache[currModelicaURI]) {

                    returnSVG = svgCache[currModelicaURI].clone();
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
    CyPhyLightDecoratorCore.prototype.getErrorSVG = function () {

        return this._errorSVGBase.clone();
    };

    /**
     * @todo Not implemented yet.
     * @param searchDesc {string} Search description or query.
     * @returns {boolean} True if this object satisfies the search condition.
     */
    CyPhyLightDecoratorCore.prototype.doSearch = function (searchDesc) {

        //TODO: correct implementation needed
        return false;
    };

    /**
     * Renders the content in the placeholder DOM element.
     * @private
     */
    CyPhyLightDecoratorCore.prototype._renderContent = function () {

        // gme id of the rendered object
        var gmeID = this._metaInfo[CONSTANTS.GME_ID],
            META_TYPES = CyPhyLightMETA.META_TYPES;

        // meta type of the rendered object
        this._metaType = METAAspectHelper.getMETATypesOf(gmeID)[0];

        if (DEBUG) {

            //render GME-ID in the DOM, for debugging
            this.$el.attr({"data-id": gmeID});
        }


        // setting the name of component
        this.skinParts.$name = this.$el.find('.name');

        
        //empty out SVG container
        this.$el.find('.svg-container').empty();

        //figure out the necessary SVG based on children type
        this.skinParts.$svg = this.getSVGByMetaType(gmeID);

        if (this.skinParts.$svg) {

            //this.skinParts.$svg.append(this._CyPhyLightDecoratorCore.getPortSVG());
            this.$el.find('.svg-container').append(this.skinParts.$svg);

            //render the connectors
            this.skinParts.$connectorContainer = this.$el.find('.connector-container');
            this.skinParts.$connectorContainer.empty();

        } else {

            // append error svg if the svg does not exist for this element
            this.$el.find('.svg-container').append(this.getErrorSVG());
        }

        _.extend(this, new CyPhyLightBase());

        // call the type specific renderer
        this._renderMetaTypeSpecificParts();

        // update the rendered object
        this.update();
        //}
    };

    CyPhyLightDecoratorCore.prototype._renderSvgText = function () {
        var gmeID = this._metaInfo[CONSTANTS.GME_ID],
            client = this._control._client,
            nodeObj = client.getNode(gmeID),
            childrenIDs = nodeObj ?  nodeObj.getChildrenIds() : [];

        var bound_data = this.skinParts.$svg.find('text');

        for (var i = 0; i < bound_data.length; ++i) {
            // get attribute name that is bound
            var bound_param = $(bound_data[i]).find('.data-bind').contents()[0];
            if (bound_param) {

                var data_name = bound_param.data.replace('%', ''),
                    value;

                // if the attribute is name
                if (data_name === nodePropertyNames.Attributes.name)
                {
                    // render name on svg
                    value = client.getNode(gmeID).getAttribute(data_name);
                    $(bound_data[i]).contents()[0].data = value;

                } else {
                    // if data-bind is not name
                    var param_name = data_name.split('=')[0];
                    // find child of bound_param's name: if there is child get & render child value
                    for (var j = 0; j < childrenIDs.length; ++j) {
                        
                        var childName = client.getNode(childrenIDs[j]).getAttribute(nodePropertyNames.Attributes.name);
                        // check if child name is the bound data name
                        // TODO: the seond part of the if condition may need fixes
                        if (childName === param_name || childName[0] === param_name[0]) {

                            value = client.getNode(childrenIDs[j]).getAttribute('Value');
                            // render value to svg's data holder
                            $(bound_data[i]).contents()[0].data = param_name + "=" + value;
                            break;
                        }
                    }
                }
            }
        }
    }

    /**
     * Updates the rendered object. This function is called by the Widget.
     */
    CyPhyLightDecoratorCore.prototype.update = function () {

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
    CyPhyLightDecoratorCore.prototype._update = function () {

        // update name of the rendered object
        this._updateName();
        this._renderSvgText();
        this._updatePorts();
    };

    /**
     * Updates the name of the rendered object.
     * @private
     */
    CyPhyLightDecoratorCore.prototype._updateName = function () {

        // initialize local variables
        var control = this._control,
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            name = (control._client.getNode(gmeID)).getAttribute(nodePropertyNames.Attributes.name), 
        	  META_TYPES = CyPhyLightMETA.META_TYPES;

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
        }
    };

    /* TO BE OVERRIDDEN IN META TYPE SPECIFIC CODE */

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    CyPhyLightDecoratorCore.prototype._updatePorts = function () {

    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    CyPhyLightDecoratorCore.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Registers a GME ID for notifications.
     * @param portId {string} GME ID for getting notification about this object.
     * @private
     */
    CyPhyLightDecoratorCore.prototype._registerForNotification = function(portId) {

    };

    /**
     * Unregisters a GME ID from the event notifications.
     * @param portId {string} GME ID for getting notification about this object.
     * @private
     */
    CyPhyLightDecoratorCore.prototype._unregisterForNotification = function(portId) {

    };


    return CyPhyLightDecoratorCore;
});
