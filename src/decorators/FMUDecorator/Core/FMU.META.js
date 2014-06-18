/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 * 
 * AUTO GENERATED CODE FOR PROJECT FMU
 */


define(['underscore',
        'js/Utils/METAAspectHelper'], function (_underscore,
                                                METAAspectHelper) {
    "use strict";
    var _metaID = 'FMU.META.js';

    //META ASPECT TYPES
    var _metaTypes = {
        'FCO': '/1',
        'FMI_Language': '/1822302751',
        'FMU': '/1822302751/902541625',
        'FMU_Library': '/1822302751/531264123',
        'Input': '/1822302751/873609603',
        'ModelExchange': '/1822302751/637828452',
        'ModelExchange_Library': '/1822302751/999948235',
        'Output': '/1822302751/206401000',
        'Parameter': '/1822302751/1582216564',
        'PortComposition': '/1822302751/472382791',
        'Property': '/1822302751/1417572566',
        'SimulationParameter': '/1822302751/1963127367',
        'SimulationParameterCompostiion': '/1822302751/238092457',

    };

    //META ASPECT TYPE CHECKING
    var _isFCO = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FCO); };
    var _isFMI_Language = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FMI_Language); };
    var _isFMU = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FMU); };
    var _isFMU_Library = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FMU_Library); };
    var _isInput = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Input); };
    var _isModelExchange = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ModelExchange); };
    var _isModelExchange_Library = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ModelExchange_Library); };
    var _isOutput = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Output); };
    var _isParameter = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Parameter); };
    var _isPortComposition = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.PortComposition); };
    var _isProperty = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Property); };
    var _isSimulationParameter = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.SimulationParameter); };
    var _isSimulationParameterCompostiion = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.SimulationParameterCompostiion); };


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
            isFCO: _isFCO,
            isFMI_Language: _isFMI_Language,
            isFMU: _isFMU,
            isFMU_Library: _isFMU_Library,
            isInput: _isInput,
            isModelExchange: _isModelExchange,
            isModelExchange_Library: _isModelExchange_Library,
            isOutput: _isOutput,
            isParameter: _isParameter,
            isPortComposition: _isPortComposition,
            isProperty: _isProperty,
            isSimulationParameter: _isSimulationParameter,
            isSimulationParameterCompostiion: _isSimulationParameterCompostiion,

        }
    };
});