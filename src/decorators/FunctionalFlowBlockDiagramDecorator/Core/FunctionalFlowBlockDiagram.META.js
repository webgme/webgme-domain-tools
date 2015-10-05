/* globals define, _, WebGMEGlobal */
/* jshint browser: true */
/**
 * @author zhangpn / https://github.com/zhangpn
 */

define(['underscore'], function (_underscore) {
    'use strict';

    var _metaID = 'FunctionalFlowBlockDiagram.META.js',
        META_TYPES = {
            'AND': 'AND',
            'FCO': 'FCO',
            'FFBDFolder': 'FFBDFolder',
            'FFBDMetaLanguage': 'FFBDMetaLanguage',
            'FFBDiagram': 'FFBDiagram',
            'FlowConnection': 'FlowConnection',
            'Function': 'Function',
            'Function2Function': 'Function2Function',
            'Function2Logic': 'Function2Logic',
            'Function2Reference': 'Function2Reference',
            'Logic2Function': 'Logic2Function',
            'Logic2Logic': 'Logic2Logic',
            'Logic2Ref': 'Logic2Ref',
            'LogicSymbol': 'LogicSymbol',
            'OR': 'OR',
            'Ref2Logic': 'Ref2Logic',
            'Reference': 'Reference',
            'Reference2Function': 'Reference2Function',
            'XOR': 'XOR'
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
    var _isAND = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.AND]);};
    var _isFCO = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.FCO]);};
    var _isFFBDFolder = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.FFBDFolder]);};
    var _isFFBDMetaLanguage = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.FFBDMetaLanguage]);};
    var _isFFBDiagram = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.FFBDiagram]);};
    var _isFlowConnection = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.FlowConnection]);};
    var _isFunction = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Function]);};
    var _isFunction2Function = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Function2Function]);};
    var _isFunction2Logic = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Function2Logic]);};
    var _isFunction2Reference = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Function2Reference]);};
    var _isLogic2Function = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Logic2Function]);};
    var _isLogic2Logic = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Logic2Logic]);};
    var _isLogic2Ref = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Logic2Ref]);};
    var _isLogicSymbol = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.LogicSymbol]);};
    var _isOR = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.OR]);};
    var _isRef2Logic = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Ref2Logic]);};
    var _isReference = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Reference]);};
    var _isReference2Function = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Reference2Function]);};
    var _isXOR = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.XOR]);};


    //return utility functions
    return {
        getMetaTypes: _getMetaTypes,
        getMetaTypesOf: _getMetaTypesOf,
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