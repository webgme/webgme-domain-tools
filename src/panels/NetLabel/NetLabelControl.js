/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Authors: Robert Kereskenyi
 *          Dana Zhang
 */

define(['js/Panels/ModelEditor/ModelEditorControl',
    'js/Constants',
    './NetLabelControl.EventHandlers', 'js/Utils/PreferencesHelper'], function (ModelEditorControl, CONSTANTS, NetLabelControlEventHandlers, PreferencesHelper) {

    "use strict";

    var NetLabelControl;

    NetLabelControl = function (options) {
        ModelEditorControl.call(this, options);
    };

    _.extend(NetLabelControl.prototype, ModelEditorControl.prototype);
    _.extend(NetLabelControl.prototype, NetLabelControlEventHandlers.prototype);

    NetLabelControl.prototype.getConnectionDescriptor = function (gmeID) {

        var self = this,
            CONSTS =  CONSTANTS, // CONSTANTS can only be loaded by assigning it to a var
            gmeClient = self._client,
            connectionObj = gmeClient.getNode(gmeID),
            srcID = connectionObj.getPointer(CONSTANTS.POINTER_SOURCE).to,
            dstID = connectionObj.getPointer(CONSTANTS.POINTER_TARGET).to,
            srcObj = gmeClient.getNode(srcID),
            dstObj = gmeClient.getNode(dstID),
            srcName = srcObj.getAttribute('name'),
            dstName = dstObj.getAttribute('name'),
            srcParentId = srcObj.getParentId(),
            dstParentId = dstObj.getParentId(),
            srcParentName = gmeClient.getNode(srcParentId).getAttribute('name'),
            dstParentName = gmeClient.getNode(dstParentId).getAttribute('name'),
            isSrcAPort = srcID.match(/\//g).length > 3,
            isDstAPort = dstID.match(/\//g).length > 3,
            srcObjPos = srcObj.getRegistry('position'),
            dstObjPos = dstObj.getRegistry('position'),
            srcText = isSrcAPort ? srcParentName + "." + srcName : srcName,
            dstText = isDstAPort ? dstParentName + "." + dstName : dstName;
        return {'srcText': srcText,
                'dstText': dstText,
                'srcObjPos': srcObjPos,
                'dstObjPos': dstObjPos,
                'srcID': srcID,
                'dstID': dstID};
    };
//
//    NetLabelControl.prototype._onLoad = function (gmeID, objD) {
//        var uiComponent,
//            decClass,
//            objDesc,
//            sources = [],
//            destinations = [],
//            getDecoratorTerritoryQueries,
//            territoryChanged = false,
//            self = this;
//
//        getDecoratorTerritoryQueries = function (decorator) {
//            var query,
//                entry;
//
//            if (decorator) {
//                query = decorator.getTerritoryQuery();
//
//                if (query) {
//                    for (entry in query) {
//                        if (query.hasOwnProperty(entry)) {
//                            self._selfPatterns[entry] = query[entry];
//                            territoryChanged = true;
//                        }
//                    }
//                }
//            }
//        };
//
//
//        //component loaded
//        //we are interested in the load of sub_components of the opened component
//        if (this.currentNodeInfo.id !== gmeID) {
//            if (objD) {
//                if (objD.parentId == this.currentNodeInfo.id) {
//                    objDesc = _.extend({}, objD);
//                    this._GmeID2ComponentID[gmeID] = [];
//
//                    if (objDesc.kind === "MODEL") {
//
//                        this._GMEModels.push(gmeID);
//
//                        decClass = this._getItemDecorator(objDesc.decorator);
//
//                        objDesc.decoratorClass = decClass;
//                        objDesc.control = this;
//                        objDesc.metaInfo = {};
//                        objDesc.metaInfo[CONSTANTS.GME_ID] = gmeID;
//                        objDesc.preferencesHelper = PreferencesHelper.getPreferences();
//                        objDesc.aspect = this._selectedAspect;
//
//                        uiComponent = this.designerCanvas.createDesignerItem(objDesc);
//
//
//                        this._GmeID2ComponentID[gmeID].push(uiComponent.id);
//                        this._ComponentID2GmeID[uiComponent.id] = gmeID;
//
//                        getDecoratorTerritoryQueries(uiComponent._decoratorInstance);
//
//                    }
//
//                    if (objDesc.kind === "CONNECTION") {
//
//                        this._GMEConnections.push(gmeID);
//
//                        var srcDst = this._getAllSourceDestinationPairsForConnection(objDesc.source, objDesc.target);
//                        sources = srcDst.sources;
//                        destinations = srcDst.destinations;
//
//                        var k = sources.length;
//                        var l = destinations.length;
//
//                        if (k > 0 && l > 0) {
//                            while (k--) {
//                                while (l--) {
//                                    objDesc.srcObjId = sources[k].objId;
//                                    objDesc.srcSubCompId = sources[k].subCompId;
//                                    objDesc.dstObjId = destinations[l].objId;
//                                    objDesc.dstSubCompId = destinations[l].subCompId;
//                                    objDesc.reconnectable = true;
//                                    objDesc.editable = true;
//
//                                    delete objDesc.source;
//                                    delete objDesc.target;
//
//                                    _.extend(objDesc, this.getConnectionDescriptor(gmeID));
//                                    uiComponent = this.designerCanvas.createConnection(objDesc);
//
//                                    this.logger.debug('Connection: ' + uiComponent.id + ' for GME object: ' + objDesc.id);
//
//                                    this._GmeID2ComponentID[gmeID].push(uiComponent.id);
//                                    this._ComponentID2GmeID[uiComponent.id] = gmeID;
//                                }
//                            }
//                        } else {
//                            //the connection is here, but no valid endpoint on canvas
//                            //save the connection
//                            this._delayedConnections.push(gmeID);
//                        }
//                    }
//                } else {
//                    //supposed to be the grandchild of the currently open node
//                    //--> load of port
//                    /*if(this._GMEModels.indexOf(objD.parentId) !== -1){
//                     this._onUpdate(objD.parentId,this._getObjectDescriptor(objD.parentId));
//                     }*/
//                    this._checkComponentDependency(gmeID, CONSTANTS.TERRITORY_EVENT_LOAD);
//                }
//            }
//        } else {
//            //currently opened node
//            this._updateSheetName(objD.name);
//            this._updateAspects();
//        }
//
//        return territoryChanged;
//
//    };
    return NetLabelControl;
});