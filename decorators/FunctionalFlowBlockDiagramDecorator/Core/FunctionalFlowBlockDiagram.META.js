/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * AUTO GENERATED CODE FOR PROJECT FunctionalFlowBlockDiagram
 */

"use strict";

define(['underscore',
        'js/Utils/METAAspectHelper'], function (_underscore,
                                                METAAspectHelper) {

    var _metaID = 'FunctionalFlowBlockDiagram.META.js';

    //META ASPECT TYPES
    var _metaTypes = {
		'AND': '/-131/-141',
		'FCO': '/-129',
		'FFBDFolder': '/-131/-132',
		'FFBDMetaLanguage': '/-131',
		'FFBDiagram': '/-131/-133',
		'FlowConnection': '/-131/-137',
		'Function': '/-131/-134',
		'Function2Function': '/-131/-145',
		'Function2Logic': '/-131/-153',
		'Function2Reference': '/-131/-151',
		'Logic2Function': '/-131/-154',
		'Logic2Logic': '/-131/-150',
		'Logic2Ref': '/-131/-156',
		'LogicSymbol': '/-131/-136',
		'OR': '/-131/-143',
		'Ref2Logic': '/-131/-155',
		'Reference': '/-131/-135',
		'Reference2Function': '/-131/-152',
		'XOR': '/-131/-144'
	};

    //META ASPECT TYPE CHECKING
    var _isAND = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.AND); };
	var _isFCO = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FCO); };
	var _isFFBDFolder = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FFBDFolder); };
	var _isFFBDMetaLanguage = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FFBDMetaLanguage); };
	var _isFFBDiagram = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FFBDiagram); };
	var _isFlowConnection = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FlowConnection); };
	var _isFunction = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Function); };
	var _isFunction2Function = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Function2Function); };
	var _isFunction2Logic = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Function2Logic); };
	var _isFunction2Reference = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Function2Reference); };
	var _isLogic2Function = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Logic2Function); };
	var _isLogic2Logic = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Logic2Logic); };
	var _isLogic2Ref = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Logic2Ref); };
	var _isLogicSymbol = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.LogicSymbol); };
	var _isOR = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.OR); };
	var _isRef2Logic = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Ref2Logic); };
	var _isReference = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Reference); };
	var _isReference2Function = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Reference2Function); };
	var _isXOR = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.XOR); };
	

    var _queryMetaTypes = function () {
        var nMetaTypes = METAAspectHelper.getMETAAspectTypes(),
            m;

        if (!_.isEqual(_metaTypes,nMetaTypes)) {
            //TODO: when displaying an error message make sure it's the very same project
            /*var metaOutOfDateMsg = _metaID + " is not up to date with the latest META aspect. Please update your local copy!";
            if (console.error) {
                console.error(metaOutOfDateMsg);
            } else {
                console.log(metaOutOfDateMsg);
            }*/

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
			isAND: _isAND,
			isFCO: _isFCO,
			isFFBDFolder: _isFFBDFolder,
			isFFBDMetaLanguage: _isFFBDMetaLanguage,
			isFFBDiagram: _isFFBDiagram,
			isFlowConnection: _isFlowConnection,
			isFunction: _isFunction,
			isFunction2Function: _isFunction2Function,
			isFunction2Logic: _isFunction2Logic,
			isFunction2Reference: _isFunction2Reference,
			isLogic2Function: _isLogic2Function,
			isLogic2Logic: _isLogic2Logic,
			isLogic2Ref: _isLogic2Ref,
			isLogicSymbol: _isLogicSymbol,
			isOR: _isOR,
			isRef2Logic: _isRef2Logic,
			isReference: _isReference,
			isReference2Function: _isReference2Function,
			isXOR: _isXOR
		}
    };
});