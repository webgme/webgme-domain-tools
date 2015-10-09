/* globals define, _, WebGMEGlobal */
/* jshint browser: true */
/**
 * @author zhangpn / https://github.com/zhangpn
 */

define(['underscore'], function (_underscore) {
    'use strict';
    var _metaID = 'ActivityDiagram.META.js',

    //META ASPECT TYPES
        META_TYPES = {
            'Action': 'Action',
            'Action2Action': 'Action2Action',
            'Action2Decision': 'Action2Decision',
            'Action2End': 'Action2End',
            'ActionBase': 'ActionBase',
            'ActionBase2Bar': 'ActionBase2Bar',
            'ActionBase2Decision': 'ActionBase2Decision',
            'ActivityDiagram': 'ActivityDiagram',
            'ActivityDiagramFolder': 'ActivityDiagramFolder',
            'ActivityDiagramMetaModel': 'ActivityDiagramMetaModel',
            'ActivityFlow': 'ActivityFlow',
            'Bar': 'Bar',
            'Bar2ActionBase': 'Bar2ActionBase',
            'Bar2Decision': 'Bar2Decision',
            'Decision': 'Decision',
            'Decision2ActionBase': 'Decision2ActionBase',
            'Decision2Bar': 'Decision2Bar',
            'Decision2Decision': 'Decision2Decision',
            'End': 'End',
            'End2Decision': 'End2Decision',
            'FCO': 'FCO',
            'Start': 'Start',
            'Start2Action': 'Start2Action',
            'Start2Decision': 'Start2Decision'
        },
        client = WebGMEGlobal.Client;

    function _getMetaTypes() {
        var metaNodes = client.getAllMetaNodes(),
            dictionary = {},
            i,
            name;

        for (i = 0; i < metaNodes.length; i += 1) {
            name = metaNodes[i].getAttribute('name');
            if (META_TYPES[name]) {
                dictionary[name] = metaNodes[i].getId();
            }
        }

        return dictionary;
    }

    function _getMetaTypesOf(objId) {
        var orderedMetaList = Object.keys(META_TYPES).sort(),
            metaDictionary = _getMetaTypes(),
            i,
            result = [];

        for (i = 0; i < orderedMetaList.length; i += 1) {
            if (client.isTypeOf(objId, metaDictionary[orderedMetaList[i]])) {
                result.push(orderedMetaList[i]);
            }
        }

        return result;
    }

    //META ASPECT TYPE CHECKING
    var _isAction = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Action]);};
	var _isAction2Action = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Action2Action]);};
	var _isAction2Decision = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Action2Decision]);};
	var _isAction2End = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Action2End]);};
	var _isActionBase = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ActionBase]);};
	var _isActionBase2Bar = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ActionBase2Bar]);};
	var _isActionBase2Decision = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ActionBase2Decision]);};
	var _isActivityDiagram = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ActivityDiagram]);};
	var _isActivityDiagramFolder = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ActivityDiagramFolder]);};
	var _isActivityDiagramMetaModel = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ActivityDiagramMetaModel]);};
	var _isActivityFlow = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ActivityFlow]);};
	var _isBar = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Bar]);};
	var _isBar2ActionBase = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Bar2ActionBase]);};
	var _isBar2Decision = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Bar2Decision]);};
	var _isDecision = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Decision]);};
	var _isDecision2ActionBase = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Decision2ActionBase]);};
	var _isDecision2Bar = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Decision2Bar]);};
	var _isDecision2Decision = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Decision2Decision]);};
	var _isEnd = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.End]);};
	var _isEnd2Decision = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.End2Decision]);};
	var _isFCO = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.FCO]);};
	var _isStart = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Start]);};
	var _isStart2Action = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Start2Action]);};
	var _isStart2Decision = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Start2Decision]);};

    //return utility functions
    return {
        getMetaTypes: _getMetaTypes,
        getMetaTypesOf: _getMetaTypesOf,
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