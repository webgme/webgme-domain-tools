/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * AUTO GENERATED CODE FOR PROJECT PetriNet
 */

"use strict";

define(['underscore',
        'js/Utils/METAAspectHelper'], function (_underscore,
                                                METAAspectHelper) {

    var _metaID = 'PetriNet.META.js';

    //META ASPECT TYPES
    var _metaTypes = {
		'Arc': '/-2/-6',
		'FCO': '/-1',
		'PetriNetDiagram': '/-2/-4',
		'PetriNetDiagramFolder': '/-2/-3',
		'PetriNetMetaModel': '/-2',
		'Place': '/-2/-5',
		'Place2Transition': '/-2/-8',
		'Transition': '/-2/-7',
		'Transition2Place': '/-2/-9'
	};

    //META ASPECT TYPE CHECKING
    var _isArc = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Arc); };
	var _isFCO = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FCO); };
	var _isPetriNetDiagram = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.PetriNetDiagram); };
	var _isPetriNetDiagramFolder = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.PetriNetDiagramFolder); };
	var _isPetriNetMetaModel = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.PetriNetMetaModel); };
	var _isPlace = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Place); };
	var _isPlace2Transition = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Place2Transition); };
	var _isTransition = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Transition); };
	var _isTransition2Place = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Transition2Place); };
	

    var _queryMetaTypes = function () {
        var nMetaTypes = METAAspectHelper.getMETAAspectTypes(),
            m;

        if (!_.isEqual(_metaTypes,nMetaTypes)) {
            var metaOutOfDateMsg = _metaID + " is not up to date with the latest META aspect. Please update your local copy!";
            if (console.error) {
                console.error(metaOutOfDateMsg);
            } else {
                console.log(metaOutOfDateMsg);
            }

            for (m in _metaTypes) {
                if (_metaTypes.hasOwnProperty(m)) {
                    delete _metaTypes[m];
                }
            }

            for (m in nMetaTypes) {
                if (nMetaTypes.hasOwnProperty(m)) {
                    _metaTypes[m] = nMetaTypes[m];
                }
            }
        }
    };

    //hook up to META ASPECT CHANGES
    METAAspectHelper.addEventListener(METAAspectHelper.events.META_ASPECT_CHANGED, function () {
        _queryMetaTypes();
    });

    //generate the META types on the first run
    _queryMetaTypes();

    //return utility functions
    return {
        META_TYPES: _metaTypes,
        TYPE_INFO: {
			isArc: _isArc,
			isFCO: _isFCO,
			isPetriNetDiagram: _isPetriNetDiagram,
			isPetriNetDiagramFolder: _isPetriNetDiagramFolder,
			isPetriNetMetaModel: _isPetriNetMetaModel,
			isPlace: _isPlace,
			isPlace2Transition: _isPlace2Transition,
			isTransition: _isTransition,
			isTransition2Place: _isTransition2Place
		}
    };
});