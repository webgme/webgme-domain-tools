/*globals define, _, WebGMEGlobal*/
/*jshint browser: true*/
/**
 * @author kecso / https://github.com/kecso
 */

"use strict";

define(['underscore'], function (_underscore) {

    var _metaID = 'LogicGates.META.js',
        META_TYPES = {
            'And': 'And',
            'Buffer': 'Buffer',
            'Clock': 'Clock',
            'ComplexLogicGate': 'ComplexLogicGate',
            'InputPort': 'InputPort',
            'LogicCircuit': 'LogicCircuit',
            'LogicGateBase': 'LogicGateBase',
            'LogicGatesDiagrams': 'LogicGatesDiagrams',
            'LogicGatesMetaLanguage': 'LogicGatesMetaLanguage',
            'Nand': 'Nand',
            'Nor': 'Nor',
            'Not': 'Not',
            'NumericIOBase': 'NumericIOBase',
            'NumericInput': 'NumericInput',
            'NumericOutput': 'NumericOutput',
            'Or': 'Or',
            'OutputPort': 'OutputPort',
            'OutputPort2InputPort': 'OutputPort2InputPort',
            'OutputPort2UserOutput': '/-OutputPort2UserOutput',
            'PortBase': 'PortBase',
            'PortBase2UserIOBase': 'PortBase2UserIOBase',
            'PortConnection': 'PortConnection',
            'SimpleLogicGate': 'SimpleLogicGate',
            'UserIOBase': 'UserIOBase',
            'UserIOBase2PortBase': 'UserIOBase2PortBase',
            'UserIOBase2UserIOBase': 'UserIOBase2UserIOBase',
            'UserInput': 'UserInput',
            'UserInput2InputPort': 'UserInput2InputPort',
            'UserInputBase': 'UserInputBase',
            'UserInputBase2UserOutput': 'UserInputBase2UserOutput',
            'UserOutput': 'UserOutput',
            'Xnor': 'Xnor',
            'Xor': 'Xor'
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

    //META ASPECT TYPES
    //var _metaTypes = {
    //    'And': '/-149/-38',
    //    'Buffer': '/-149/-28',
    //    'Clock': '/-149/-19',
    //    'ComplexLogicGate': '/-149/-24',
    //    'InputPort': '/-149/-50',
    //    'LogicCircuit': '/-149/-5',
    //    'LogicGateBase': '/-149/-8',
    //    'LogicGatesDiagrams': '/-149/-2',
    //    'LogicGatesMetaLanguage': '/-149',
    //    'Nand': '/-149/-44',
    //    'Nor': '/-149/-49',
    //    'Not': '/-149/-25',
    //    'NumericIOBase': '/-149/-17',
    //    'NumericInput': '/-149/-3',
    //    'NumericOutput': '/-149/-7',
    //    'Or': '/-149/-41',
    //    'OutputPort': '/-149/-53',
    //    'OutputPort2InputPort': '/-149/-54',
    //    'OutputPort2UserOutput': '/-149/-60',
    //    'PortBase': '/-149/-11',
    //    'PortBase2UserIOBase': '/-149/-16',
    //    'PortConnection': '/-149/-14',
    //    'SimpleLogicGate': '/-149/-21',
    //    'UserIOBase': '/-149/-20',
    //    'UserIOBase2PortBase': '/-149/-23',
    //    'UserIOBase2UserIOBase': '/-149/-31',
    //    'UserInput': '/-149/-15',
    //    'UserInput2InputPort': '/-149/-57',
    //    'UserInputBase': '/-149/-9',
    //    'UserInputBase2UserOutput': '/-149/-63',
    //    'UserOutput': '/-149/-13',
    //    'Xnor': '/-149/-47',
    //    'Xor': '/-149/-48'
    //};

    //META ASPECT TYPE CHECKING
    var _isAnd = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.And]);
    };
    var _isBuffer = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Buffer]);
    };
    var _isClock = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Clock]);
    };
    var _isComplexLogicGate = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ComplexLogicGate]);
    };
    var _isInputPort = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.InputPort]);
    };
    var _isLogicCircuit = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.LogicCircuit]);
    };
    var _isLogicGateBase = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.LogicGateBase]);
    };
    var _isLogicGatesDiagrams = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.LogicGatesDiagrams]);
    };
    var _isLogicGatesMetaLanguage = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.LogicGatesMetaLanguage]);
    };
    var _isNand = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Nand]);
    };
    var _isNor = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Nor]);
    };
    var _isNot = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Not]);
    };
    var _isNumericIOBase = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.NumericIOBase]);
    };
    var _isNumericInput = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.NumericInput]);
    };
    var _isNumericOutput = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.NumericOutput]);
    };
    var _isOr = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Or]);
    };
    var _isOutputPort = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.OutputPort]);
    };
    var _isOutputPort2InputPort = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.OutputPort2InputPort]);
    };
    var _isOutputPort2UserOutput = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.OutputPort2UserOutput]);
    };
    var _isPortBase = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.PortBase]);
    };
    var _isPortBase2UserIOBase = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.PortBase2UserIOBase]);
    };
    var _isPortConnection = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.PortConnection]);
    };
    var _isSimpleLogicGate = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.SimpleLogicGate]);
    };
    var _isUserIOBase = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.UserIOBase]);
    };
    var _isUserIOBase2PortBase = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.UserIOBase2PortBase]);
    };
    var _isUserIOBase2UserIOBase = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.UserIOBase2UserIOBase]);
    };
    var _isUserInput = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.UserInput]);
    };
    var _isUserInput2InputPort = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.UserInput2InputPort]);
    };
    var _isUserInputBase = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.UserInputBase]);
    };
    var _isUserInputBase2UserOutput = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.UserInputBase2UserOutput]);
    };
    var _isUserOutput = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.UserOutput]);
    };
    var _isXnor = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Xnor]);
    };
    var _isXor = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Xor]);
    };

    //return utility functions
    return {
        getMetaTypes: _getMetaTypes,
        getMetaTypesOf: _getMetaTypesOf,
        TYPE_INFO: {
            isAnd: _isAnd,
            isBuffer: _isBuffer,
            isClock: _isClock,
            isComplexLogicGate: _isComplexLogicGate,
            isInputPort: _isInputPort,
            isLogicCircuit: _isLogicCircuit,
            isLogicGateBase: _isLogicGateBase,
            isLogicGatesDiagrams: _isLogicGatesDiagrams,
            isLogicGatesMetaLanguage: _isLogicGatesMetaLanguage,
            isNand: _isNand,
            isNor: _isNor,
            isNot: _isNot,
            isNumericIOBase: _isNumericIOBase,
            isNumericInput: _isNumericInput,
            isNumericOutput: _isNumericOutput,
            isOr: _isOr,
            isOutputPort: _isOutputPort,
            isOutputPort2InputPort: _isOutputPort2InputPort,
            isOutputPort2UserOutput: _isOutputPort2UserOutput,
            isPortBase: _isPortBase,
            isPortBase2UserIOBase: _isPortBase2UserIOBase,
            isPortConnection: _isPortConnection,
            isSimpleLogicGate: _isSimpleLogicGate,
            isUserIOBase: _isUserIOBase,
            isUserIOBase2PortBase: _isUserIOBase2PortBase,
            isUserIOBase2UserIOBase: _isUserIOBase2UserIOBase,
            isUserInput: _isUserInput,
            isUserInput2InputPort: _isUserInput2InputPort,
            isUserInputBase: _isUserInputBase,
            isUserInputBase2UserOutput: _isUserInputBase2UserOutput,
            isUserOutput: _isUserOutput,
            isXnor: _isXnor,
            isXor: _isXor
        }
    };
});