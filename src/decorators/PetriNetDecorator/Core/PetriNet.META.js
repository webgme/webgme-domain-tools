/*globals define, _, WebGMEGlobal*/
/*jshint browser: true*/
/**
 * @author kecso / https://github.com/kecso
 */

define(['underscore'], function (_underscore) {
    'use strict';
    var _metaID = 'PetriNet.META.js',
        META_TYPES = {
            'Arc': 'Arc',
            'FCO': 'FCO',
            'PetriNetDiagram': 'PetriNetDiagram',
            'PetriNetDiagramFolder': 'PetriNetDiagramFolder',
            'PetriNetMetaModel': 'PetriNetMetaModel',
            'Place': 'Place',
            'Place2Transition': 'Place2Transition',
            'Transition': 'Transition',
            'Transition2Place': 'Transition2Place'
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
    //'Arc': '/-2/-6',
    //'FCO': '/-1',
    //'PetriNetDiagram': '/-2/-4',
    //'PetriNetDiagramFolder': '/-2/-3',
    //'PetriNetMetaModel': '/-2',
    //'Place': '/-2/-5',
    //'Place2Transition': '/-2/-8',
    //'Transition': '/-2/-7',
    //'Transition2Place': '/-2/-9'
    //};

    //META ASPECT TYPE CHECKING
    var _isArc = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Arc]);
    };
    var _isFCO = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.FCO]);
    };
    var _isPetriNetDiagram = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.PetriNetDiagram]);
    };
    var _isPetriNetDiagramFolder = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.PetriNetDiagramFolder]);
    };
    var _isPetriNetMetaModel = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.PetriNetMetaModel]);
    };
    var _isPlace = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Place]);
    };
    var _isPlace2Transition = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Place2Transition]);
    };
    var _isTransition = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Transition]);
    };
    var _isTransition2Place = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Transition2Place]);
    };


    //return utility functions
    return {
        getMetaTypes: _getMetaTypes,
        getMetaTypesOf: _getMetaTypesOf,
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