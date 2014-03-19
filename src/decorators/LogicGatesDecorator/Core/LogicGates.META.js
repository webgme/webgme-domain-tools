/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * AUTO GENERATED CODE FOR PROJECT LogicGates
 */

"use strict";

define(['underscore',
        'js/Utils/METAAspectHelper'], function (_underscore,
                                                METAAspectHelper) {

    var _metaID = 'LogicGates.META.js';

    //META ASPECT TYPES
    var _metaTypes = {
		'And': '/-149/-38',
		'Buffer': '/-149/-28',
		'Clock': '/-149/-19',
		'ComplexLogicGate': '/-149/-24',
		'InputPort': '/-149/-50',
		'LogicCircuit': '/-149/-5',
		'LogicGateBase': '/-149/-8',
		'LogicGatesDiagrams': '/-149/-2',
		'LogicGatesMetaLanguage': '/-149',
		'Nand': '/-149/-44',
		'Nor': '/-149/-49',
		'Not': '/-149/-25',
		'NumericIOBase': '/-149/-17',
		'NumericInput': '/-149/-3',
		'NumericOutput': '/-149/-7',
		'Or': '/-149/-41',
		'OutputPort': '/-149/-53',
		'OutputPort2InputPort': '/-149/-54',
		'OutputPort2UserOutput': '/-149/-60',
		'PortBase': '/-149/-11',
		'PortBase2UserIOBase': '/-149/-16',
		'PortConnection': '/-149/-14',
		'SimpleLogicGate': '/-149/-21',
		'UserIOBase': '/-149/-20',
		'UserIOBase2PortBase': '/-149/-23',
		'UserIOBase2UserIOBase': '/-149/-31',
		'UserInput': '/-149/-15',
		'UserInput2InputPort': '/-149/-57',
		'UserInputBase': '/-149/-9',
		'UserInputBase2UserOutput': '/-149/-63',
		'UserOutput': '/-149/-13',
		'Xnor': '/-149/-47',
		'Xor': '/-149/-48'
	};

    //META ASPECT TYPE CHECKING
    var _isAnd = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.And); };
	var _isBuffer = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Buffer); };
	var _isClock = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Clock); };
	var _isComplexLogicGate = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ComplexLogicGate); };
	var _isInputPort = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.InputPort); };
	var _isLogicCircuit = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.LogicCircuit); };
	var _isLogicGateBase = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.LogicGateBase); };
	var _isLogicGatesDiagrams = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.LogicGatesDiagrams); };
	var _isLogicGatesMetaLanguage = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.LogicGatesMetaLanguage); };
	var _isNand = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Nand); };
	var _isNor = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Nor); };
	var _isNot = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Not); };
	var _isNumericIOBase = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.NumericIOBase); };
	var _isNumericInput = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.NumericInput); };
	var _isNumericOutput = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.NumericOutput); };
	var _isOr = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Or); };
	var _isOutputPort = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.OutputPort); };
	var _isOutputPort2InputPort = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.OutputPort2InputPort); };
	var _isOutputPort2UserOutput = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.OutputPort2UserOutput); };
	var _isPortBase = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.PortBase); };
	var _isPortBase2UserIOBase = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.PortBase2UserIOBase); };
	var _isPortConnection = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.PortConnection); };
	var _isSimpleLogicGate = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.SimpleLogicGate); };
	var _isUserIOBase = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.UserIOBase); };
	var _isUserIOBase2PortBase = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.UserIOBase2PortBase); };
	var _isUserIOBase2UserIOBase = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.UserIOBase2UserIOBase); };
	var _isUserInput = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.UserInput); };
	var _isUserInput2InputPort = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.UserInput2InputPort); };
	var _isUserInputBase = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.UserInputBase); };
	var _isUserInputBase2UserOutput = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.UserInputBase2UserOutput); };
	var _isUserOutput = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.UserOutput); };
	var _isXnor = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Xnor); };
	var _isXor = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Xor); };
	

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