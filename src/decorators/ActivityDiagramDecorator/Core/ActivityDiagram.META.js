/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * AUTO GENERATED CODE FOR PROJECT ActivityDiagram
 */

"use strict";

define(['underscore',
        'js/Utils/METAAspectHelper'], function (_underscore,
                                                METAAspectHelper) {

    var _metaID = 'ActivityDiagram.META.js';

    //META ASPECT TYPES
    var _metaTypes = {
		'Action': '/-120/-2',
		'Action2Action': '/-120/-28',
		'Action2Decision': '/-120/-5',
		'Action2End': '/-120/-30',
		'ActionBase': '/-120/-125',
		'ActionBase2Bar': '/-120/-32',
		'ActionBase2Decision': '/-120/-34',
		'ActivityDiagram': '/-120/-122',
		'ActivityDiagramFolder': '/-120/-121',
		'ActivityDiagramMetaModel': '/-120',
		'ActivityFlow': '/-120/-1',
		'Bar': '/-120/-124',
		'Bar2ActionBase': '/-120/-31',
		'Bar2Decision': '/-120/-37',
		'Decision': '/-120/-123',
		'Decision2ActionBase': '/-120/-33',
		'Decision2Bar': '/-120/-36',
		'Decision2Decision': '/-120/-35',
		'End': '/-120/-4',
		'End2Decision': '/-120/-8',
		'FCO': '/-119',
		'Start': '/-120/-3',
		'Start2Action': '/-120/-29',
		'Start2Decision': '/-120/-9'
	};

    //META ASPECT TYPE CHECKING
    var _isAction = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Action); };
	var _isAction2Action = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Action2Action); };
	var _isAction2Decision = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Action2Decision); };
	var _isAction2End = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Action2End); };
	var _isActionBase = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ActionBase); };
	var _isActionBase2Bar = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ActionBase2Bar); };
	var _isActionBase2Decision = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ActionBase2Decision); };
	var _isActivityDiagram = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ActivityDiagram); };
	var _isActivityDiagramFolder = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ActivityDiagramFolder); };
	var _isActivityDiagramMetaModel = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ActivityDiagramMetaModel); };
	var _isActivityFlow = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ActivityFlow); };
	var _isBar = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Bar); };
	var _isBar2ActionBase = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Bar2ActionBase); };
	var _isBar2Decision = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Bar2Decision); };
	var _isDecision = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Decision); };
	var _isDecision2ActionBase = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Decision2ActionBase); };
	var _isDecision2Bar = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Decision2Bar); };
	var _isDecision2Decision = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Decision2Decision); };
	var _isEnd = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.End); };
	var _isEnd2Decision = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.End2Decision); };
	var _isFCO = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FCO); };
	var _isStart = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Start); };
	var _isStart2Action = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Start2Action); };
	var _isStart2Decision = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Start2Decision); };
	

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
			isAction: _isAction,
			isAction2Action: _isAction2Action,
			isAction2Decision: _isAction2Decision,
			isAction2End: _isAction2End,
			isActionBase: _isActionBase,
			isActionBase2Bar: _isActionBase2Bar,
			isActionBase2Decision: _isActionBase2Decision,
			isActivityDiagram: _isActivityDiagram,
			isActivityDiagramFolder: _isActivityDiagramFolder,
			isActivityDiagramMetaModel: _isActivityDiagramMetaModel,
			isActivityFlow: _isActivityFlow,
			isBar: _isBar,
			isBar2ActionBase: _isBar2ActionBase,
			isBar2Decision: _isBar2Decision,
			isDecision: _isDecision,
			isDecision2ActionBase: _isDecision2ActionBase,
			isDecision2Bar: _isDecision2Bar,
			isDecision2Decision: _isDecision2Decision,
			isEnd: _isEnd,
			isEnd2Decision: _isEnd2Decision,
			isFCO: _isFCO,
			isStart: _isStart,
			isStart2Action: _isStart2Action,
			isStart2Decision: _isStart2Decision
		}
    };
});