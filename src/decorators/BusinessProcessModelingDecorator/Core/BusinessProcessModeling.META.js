/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * AUTO GENERATED CODE FOR PROJECT BusinessProcessModeling
 */

"use strict";

define(['underscore',
        'js/Utils/METAAspectHelper'], function (_underscore,
                                                METAAspectHelper) {

    var _metaID = 'BusinessProcessModeling.META.js';

    //META ASPECT TYPES
    var _metaTypes = {
		'Activity': '/-2/-7',
		'Annotation': '/-2/-1',
		'Artifact': '/-2/-9',
		'Artifact2Activity': '/-2/-49',
		'BPMFolder': '/-2/-3',
		'BPMMetaLanguage': '/-2',
		'BPModel': '/-2/-4',
		'CallActivity': '/-2/-22',
		'Complex': '/-2/-37',
		'Conditional': '/-2/-27',
		'ConnectionBase': '/-2/-10',
		'DataObject': '/-2/-12',
		'EndEvent': '/-2/-20',
		'Event': '/-2/-5',
		'EventBased': '/-2/-29',
		'Event_Activity': '/-2/-11',
		'Exclusive': '/-2/-36',
		'ExclusiveEventBased': '/-2/-2',
		'FCO': '/-1',
		'Gateway': '/-2/-6',
		'Gateway2Event': '/-2/-48',
		'Gateway_Activity': '/-2/-46',
		'Group': '/-2/-25',
		'Inclusive': '/-2/-43',
		'Intermediate2Gateway': '/-2/-13',
		'IntermediateEvent': '/-2/-19',
		'Lane': '/-2/-24',
		'Parallel': '/-2/-42',
		'ParallelEventBased': '/-2/-38',
		'Pool': '/-2/-8',
		'Sequential': '/-2/-28',
		'StartEvent': '/-2/-16',
		'SubProcess': '/-2/-14',
		'Task': '/-2/-21',
		'Transaction': '/-2/-23'
	};

    //META ASPECT TYPE CHECKING
    var _isActivity = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Activity); };
	var _isAnnotation = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Annotation); };
	var _isArtifact = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Artifact); };
	var _isArtifact2Activity = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Artifact2Activity); };
	var _isBPMFolder = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.BPMFolder); };
	var _isBPMMetaLanguage = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.BPMMetaLanguage); };
	var _isBPModel = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.BPModel); };
	var _isCallActivity = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.CallActivity); };
	var _isComplex = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Complex); };
	var _isConditional = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Conditional); };
	var _isConnectionBase = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ConnectionBase); };
	var _isDataObject = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.DataObject); };
	var _isEndEvent = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.EndEvent); };
	var _isEvent = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Event); };
	var _isEventBased = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.EventBased); };
	var _isEvent_Activity = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Event_Activity); };
	var _isExclusive = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Exclusive); };
	var _isExclusiveEventBased = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ExclusiveEventBased); };
	var _isFCO = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FCO); };
	var _isGateway = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Gateway); };
	var _isGateway2Event = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Gateway2Event); };
	var _isGateway_Activity = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Gateway_Activity); };
	var _isGroup = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Group); };
	var _isInclusive = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Inclusive); };
	var _isIntermediate2Gateway = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Intermediate2Gateway); };
	var _isIntermediateEvent = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.IntermediateEvent); };
	var _isLane = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Lane); };
	var _isParallel = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Parallel); };
	var _isParallelEventBased = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ParallelEventBased); };
	var _isPool = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Pool); };
	var _isSequential = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Sequential); };
	var _isStartEvent = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.StartEvent); };
	var _isSubProcess = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.SubProcess); };
	var _isTask = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Task); };
	var _isTransaction = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Transaction); };
	

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
			isActivity: _isActivity,
			isAnnotation: _isAnnotation,
			isArtifact: _isArtifact,
			isArtifact2Activity: _isArtifact2Activity,
			isBPMFolder: _isBPMFolder,
			isBPMMetaLanguage: _isBPMMetaLanguage,
			isBPModel: _isBPModel,
			isCallActivity: _isCallActivity,
			isComplex: _isComplex,
			isConditional: _isConditional,
			isConnectionBase: _isConnectionBase,
			isDataObject: _isDataObject,
			isEndEvent: _isEndEvent,
			isEvent: _isEvent,
			isEventBased: _isEventBased,
			isEvent_Activity: _isEvent_Activity,
			isExclusive: _isExclusive,
			isExclusiveEventBased: _isExclusiveEventBased,
			isFCO: _isFCO,
			isGateway: _isGateway,
			isGateway2Event: _isGateway2Event,
			isGateway_Activity: _isGateway_Activity,
			isGroup: _isGroup,
			isInclusive: _isInclusive,
			isIntermediate2Gateway: _isIntermediate2Gateway,
			isIntermediateEvent: _isIntermediateEvent,
			isLane: _isLane,
			isParallel: _isParallel,
			isParallelEventBased: _isParallelEventBased,
			isPool: _isPool,
			isSequential: _isSequential,
			isStartEvent: _isStartEvent,
			isSubProcess: _isSubProcess,
			isTask: _isTask,
			isTransaction: _isTransaction
		}
    };
});