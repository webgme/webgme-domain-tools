/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Authors: Robert Kereskenyi
 *          Dana Zhang
 */

define(['js/Panels/ModelEditor/ModelEditorControl',
    'js/Constants',
    'js/NodePropertyNames',
    'widgets/NetLabel/NetLabelWidget.Constants',
    './NetLabelControl.EventHandlers',
    'js/Utils/PreferencesHelper'], function (ModelEditorControl,
                                             CONSTANTS,
                                             NodePropertyNames,
                                             NetLabelWidgetConstants,
                                             NetLabelControlEventHandlers,
                                             PreferencesHelper) {

    "use strict";

    var NetLabelControl;

    NetLabelControl = function (options) {
        ModelEditorControl.call(this, options);
        this.designerCanvas._client = this._client;
    };

    _.extend(NetLabelControl.prototype, ModelEditorControl.prototype);
    _.extend(NetLabelControl.prototype, NetLabelControlEventHandlers.prototype);

    // todo: return src/dst texts instead -- in the initprop method these changes are made
    NetLabelControl.prototype.getConnectionDescriptor = function (gmeID) {

        var self = this,
            CONSTS =  CONSTANTS, // CONSTANTS can only be loaded by assigning it to a var
            gmeClient = self._client,
            connectionObj = gmeClient.getNode(gmeID),
            name = connectionObj.getAttribute(NodePropertyNames.Attributes.name),
            showAsLabel = connectionObj.getAttribute(NetLabelWidgetConstants.SHOW_AS_LABEL),
            connectionBaseId = connectionObj.getBaseId(),
            connectionBaseObj = gmeClient.getNode(connectionBaseId),
            defaultName = connectionBaseObj.getAttribute(NodePropertyNames.Attributes.name),
            srcID = connectionObj.getPointer(CONSTANTS.POINTER_SOURCE).to,
            dstID = connectionObj.getPointer(CONSTANTS.POINTER_TARGET).to,
            srcObj = gmeClient.getNode(srcID),
            dstObj = gmeClient.getNode(dstID),
            srcParentId = srcObj.getParentId(),
            dstParentId = dstObj.getParentId(),
            srcParentObj = gmeClient.getNode(srcParentId),
            dstParentObj = gmeClient.getNode(dstParentId);

        return {'name': name,
                'defaultName': defaultName,
                'showAsLabel': showAsLabel,
                'srcObj': srcObj,
                'dstObj': dstObj,
                'srcParentObj': srcParentObj,
                'dstParentObj': dstParentObj,
                'srcText': '',
                'dstText': ''};
    };

    NetLabelControl.prototype._onLoad = function (gmeID, objD) {
        var uiComponent,
            decClass,
            objDesc,
            sources = [],
            destinations = [],
            getDecoratorTerritoryQueries,
            territoryChanged = false,
            self = this;

        getDecoratorTerritoryQueries = function (decorator) {
            var query,
                entry;

            if (decorator) {
                query = decorator.getTerritoryQuery();

                if (query) {
                    for (entry in query) {
                        if (query.hasOwnProperty(entry)) {
                            self._selfPatterns[entry] = query[entry];
                            territoryChanged = true;
                        }
                    }
                }
            }
        };


        //component loaded
        //we are interested in the load of sub_components of the opened component
        if (this.currentNodeInfo.id !== gmeID) {
            if (objD) {
                if (objD.parentId == this.currentNodeInfo.id) {
                    objDesc = _.extend({}, objD);
                    this._GmeID2ComponentID[gmeID] = [];

                    if (objDesc.kind === "MODEL") {

                        this._GMEModels.push(gmeID);

                        decClass = this._getItemDecorator(objDesc.decorator);

                        objDesc.decoratorClass = decClass;
                        objDesc.control = this;
                        objDesc.metaInfo = {};
                        objDesc.metaInfo[CONSTANTS.GME_ID] = gmeID;
                        objDesc.preferencesHelper = PreferencesHelper.getPreferences();
                        objDesc.aspect = this._selectedAspect;

                        uiComponent = this.designerCanvas.createDesignerItem(objDesc);

                        this._GmeID2ComponentID[gmeID].push(uiComponent.id);
                        this._ComponentID2GmeID[uiComponent.id] = gmeID;

                        getDecoratorTerritoryQueries(uiComponent._decoratorInstance);

                    }

                    if (objDesc.kind === "CONNECTION") {

                        this._GMEConnections.push(gmeID);

                        var srcDst = this._getAllSourceDestinationPairsForConnection(objDesc.source, objDesc.target);
                        sources = srcDst.sources;
                        destinations = srcDst.destinations;

                        var k = sources.length;
                        var l = destinations.length;

                        if (k > 0 && l > 0) {
                            while (k--) {
                                while (l--) {
                                    objDesc.srcObjId = sources[k].objId;
                                    objDesc.srcSubCompId = sources[k].subCompId;
                                    objDesc.dstObjId = destinations[l].objId;
                                    objDesc.dstSubCompId = destinations[l].subCompId;
                                    objDesc.reconnectable = true;
                                    objDesc.editable = true;

                                    delete objDesc.source;
                                    delete objDesc.target;

                                    _.extend(objDesc, this.getConnectionDescriptor(gmeID));
                                    uiComponent = this.designerCanvas.createConnection(objDesc);

                                    this.logger.debug('Connection: ' + uiComponent.id + ' for GME object: ' + objDesc.id);

                                    this._GmeID2ComponentID[gmeID].push(uiComponent.id);
                                    this._ComponentID2GmeID[uiComponent.id] = gmeID;
                                }
                            }
                        } else {
                            //the connection is here, but no valid endpoint on canvas
                            //save the connection
                            this._delayedConnections.push(gmeID);
                        }
                    }
                } else {
                    //supposed to be the grandchild of the currently open node
                    //--> load of port
                    /*if(this._GMEModels.indexOf(objD.parentId) !== -1){
                     this._onUpdate(objD.parentId,this._getObjectDescriptor(objD.parentId));
                     }*/
                    this._checkComponentDependency(gmeID, CONSTANTS.TERRITORY_EVENT_LOAD);
                }
            }
        } else {
            //currently opened node
            this._updateSheetName(objD.name);
            this._updateAspects();
        }

        this.designerCanvas._ComponentID2GmeID = this._ComponentID2GmeID;
        return territoryChanged;

    };


    return NetLabelControl;
});