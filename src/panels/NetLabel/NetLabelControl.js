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
                'srcObj': srcObj,
                'dstObj': dstObj,
                'srcID': srcID,
                'dstID': dstID};
    };

    NetLabelControl.prototype._onUpdate = function (gmeID, objDesc) {
        var componentID,
            len,
            decClass;

        //self or child updated
        //check if the updated object is the opened node
        if (gmeID === this.currentNodeInfo.id) {
            //the updated object is the parent whose children are displayed here
            //the interest about the parent is:
            // - name change
            this._updateSheetName(objDesc.name);
            this._updateAspects();
        } else {
            if (objDesc) {
                if (objDesc.parentId === this.currentNodeInfo.id) {
                    if (objDesc.kind === "MODEL") {
                        if(this._GmeID2ComponentID[gmeID]){
                            len = this._GmeID2ComponentID[gmeID].length;
                            while (len--) {
                                componentID = this._GmeID2ComponentID[gmeID][len];

                                decClass = this._getItemDecorator(objDesc.decorator);

                                objDesc.decoratorClass = decClass;
                                objDesc.preferencesHelper = PreferencesHelper.getPreferences();
                                objDesc.aspect = this._selectedAspect;

                                this.designerCanvas.updateDesignerItem(componentID, objDesc);
                                this._onItemNameUpdate(componentID, objDesc);

                            }
                        }
                    }

                    //there is a connection associated with this GMEID
                    if (this._GMEConnections.indexOf(gmeID) !== -1) {
                        len = this._GmeID2ComponentID[gmeID].length;
                        var srcDst = this._getAllSourceDestinationPairsForConnection(objDesc.source, objDesc.target);
                        var sources = srcDst.sources;
                        var destinations = srcDst.destinations;

                        var k = sources.length;
                        var l = destinations.length;
                        len -= 1;

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

                                if (len >= 0) {
                                    componentID =  this._GmeID2ComponentID[gmeID][len];

                                    _.extend(objDesc, this.getConnectionDescriptor(gmeID));
                                    this.designerCanvas.updateConnection(componentID, objDesc);

                                    len -= 1;
                                } else {
                                    this.logger.warning('Updating connections...Existing connections are less than the needed src-dst combo...');
                                    //let's create a connection
                                    _.extend(objDesc, this.getConnectionDescriptor(gmeID));
                                    var uiComponent = this.designerCanvas.createConnection(objDesc);
                                    this.logger.debug('Connection: ' + uiComponent.id + ' for GME object: ' + objDesc.id);
                                    this._GmeID2ComponentID[gmeID].push(uiComponent.id);
                                    this._ComponentID2GmeID[uiComponent.id] = gmeID;
                                }
                            }
                        }

                        if (len >= 0) {
                            //some leftover connections on the widget
                            //delete them
                            len += 1;
                            while (len--) {
                                componentID =  this._GmeID2ComponentID[gmeID][len];
                                this.designerCanvas.deleteComponent(componentID);
                                this._GmeID2ComponentID[gmeID].splice(len, 1);
                                delete this._ComponentID2GmeID[componentID];
                            }
                        }
                    }
                } else {
                    //update about a subcomponent - will be handled in the decorator
                    this._checkComponentDependency(gmeID, CONSTANTS.TERRITORY_EVENT_UPDATE);
                }
            }
        }
    };

    NetLabelControl.prototype._onItemNameUpdate = function (componentID, objDesc) {
        // ***************updating netLabels when components names change*********************
        // todo: refinement
        var connections2update = this.designerCanvas.connectionIDbyEndID[componentID],
            counter,
            ctr,
            connComponentId,
            item,
            sCompId,
            labels2update,
            cObjArray;

        if (connections2update) {
            if (connections2update.__SELF__) {
                counter = connections2update.__SELF__.length;
                while (counter--) {
                    connComponentId = connections2update.__SELF__[counter];
                    item = this.designerCanvas.items[connComponentId];
                    labels2update = item.diagramDesigner.$el.find('[connid^="' + connComponentId + '"]');
                    ctr = labels2update.length;
                    while (ctr--) {
                        if (labels2update[ctr].getAttribute("id") === componentID) {
                            if (objDesc.name.indexOf('!') === 0) {
                                labels2update[ctr].textContent = objDesc.name.slice(1);
                                labels2update[ctr].style['text-decoration'] = 'overline';
                            } else {
                                labels2update[ctr].textContent = objDesc.name;
                                labels2update[ctr].style['text-decoration'] = 'none';
                            }
                        }
                    }
                }
            }

            // update label names when a subcomponent's parent name changes
            for (sCompId in connections2update) {
                if (connections2update.hasOwnProperty(sCompId)) {
                    cObjArray = connections2update[sCompId];
                    counter = cObjArray.length;
                    while (counter--) {
                        connComponentId = cObjArray[counter];
                        item = this.designerCanvas.items[connComponentId];
                        labels2update = item.diagramDesigner.$el.find('[connid^="' + connComponentId + '"]');
                        ctr = labels2update.length;
                        while (ctr--) {
                            if (labels2update[ctr].getAttribute("id") === sCompId) {
                                var subStr = labels2update[ctr].textContent.substr(labels2update[ctr].textContent.indexOf('.'), labels2update[ctr].textContent.length);
                                labels2update[ctr].textContent = objDesc.name + subStr;
                            }
                        }
                    }

                }
            }
            counter = connections2update.length;
            while (counter--) {
                connComponentId = connections2update.__SELF__[counter];
                item = this.designerCanvas.items[connComponentId];
                labels2update = item.diagramDesigner.$el.find('[connid^="' + connComponentId + '"]');
                ctr = labels2update.length;
                while (ctr--) {
                    if (labels2update[ctr].getAttribute("id") === componentID) {
                        labels2update[ctr].textContent = objDesc.name;
                    }
                }
            }
        }
        // ***********************************************************************************
    };

    return NetLabelControl;
});