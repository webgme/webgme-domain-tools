/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 * 
 * AUTO GENERATED CODE FOR PROJECT FMU
 */


define(['underscore'], function (_underscore) {
    "use strict";
    var _metaID = 'FMU.META.js';

    //META ASPECT TYPES
    var _metaTypes = {
        'FCO': '/1',
        'FMI_Language': '/1822302751',
        'FMU': '/1822302751/902541625',
        'FMUBase': '/1822302751/902541625',
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

        },
        client = WebGMEGlobal.Client;

    //META ASPECT TYPE CHECKING
    var _isFCO = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.FCO]);};
    var _isFMI_Language = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.FMI_Language]);};
    var _isFMU = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.FMU]);};
    var _isFMUBase = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.FMUBase]);};
    var _isFMU_Library = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.FMU_Library]);};
    var _isInput = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.Input]);};
    var _isModelExchange = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.ModelExchange]);};
    var _isModelExchange_Library = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.ModelExchange_Library]);};
    var _isOutput = function (objID){ return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.Output]);};
    var _isParameter = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.Parameter]);};
    var _isPortComposition = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.PortComposition]);};
    var _isProperty = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.Property]);};
    var _isSimulationParameter = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.SimulationParameter]);};
    var _isSimulationParameterCompostiion = function (objID){ return client.isTypeOf(objID, _getMetaTypes()[_metaTypes.SimulationParameterCompostiion]);};

    function _getMetaTypes() {
        var metaNodes = client.getAllMetaNodes(),
            dictionary = {},
            i,
            name;

        for (i = 0; i < metaNodes.length; i += 1) {
            name = metaNodes[i].getAttribute('name');
            if (_metaTypes[name]) {
                dictionary[name] = metaNodes[i].getId();
            }
        }

        return dictionary;
    }

    function _getMetaTypesOf(objId) {
        var orderedMetaList = Object.keys(_metaTypes).sort(),
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

    //hook up to META ASPECT CHANGES
    //METAAspectHelper.addEventListener(METAAspectHelper.events.META_ASPECT_CHANGED, function () {
    //    _queryMetaTypes();
    //});

    //generate the META types on the first run
    //_queryMetaTypes();

    //return utility functions
    return {
        META_TYPES: _metaTypes,
        getMetaTypesOf: _getMetaTypesOf,
        getMetaTypes: _getMetaTypes,
        TYPE_INFO: {
            isFCO: _isFCO,
            isFMI_Language: _isFMI_Language,
            isFMU: _isFMU,
            isFMUBase: _isFMUBase,
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