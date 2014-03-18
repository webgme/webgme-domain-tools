/*
 * Copyright (C) 2013 Vanderbilt University, All rights reserved.
 * 
 * AUTO GENERATED CODE FOR PROJECT CyPhyLight
 */

"use strict";

define(['underscore',
        'js/Utils/METAAspectHelper'], function (_underscore,
                                                METAAspectHelper) {

    var _metaID = 'CyPhyLight.META.js';

    //META ASPECT TYPES
    var _metaTypes = {
		'Component': '/-2/-19',
		'ComponentAssemblies': '/-2/-15',
		'ComponentAssembly': '/-2/-57',
		'ComponentType': '/-2/-7',
		'Components': '/-2/-14',
		'Connection': '/-2/-40',
		'Connector': '/-2/-27',
		'ConnectorComposition': '/-2/-49',
		'CyPhyLightModelicaLanguage': '/-2',
		'CyPhyProject': '/-2/-56',
		'DesignEntity': '/-2/-6',
		'Environment': '/-2/-26',
		'FCO': '/-2/-1',
		'Folder': '/-2/-3',
		'Metric': '/-2/-36',
		'ModelicaConnector': '/-2/-28',
		'ModelicaConnectorComposition': '/-2/-52',
		'ModelicaModel': '/-2/-23',
		'ModelicaModelType': '/-2/-22',
		'ModelicaParameter': '/-2/-39',
		'ModelicaParameterRedeclare': '/-2/-53',
		'ModelicaTestBench': '/-2/-18',
		'Parameter': '/-2/-33',
		'PostProcessing': '/-2/-100',
		'Property': '/-2/-30',
		'PropertyType': '/-2/-2',
		'SolverSettings': '/-2/-10',
		'TestBenchType': '/-2/-17',
		'TestComponent': '/-2/-20',
		'TestComponents': '/-2/-50',
		'Testing': '/-2/-16',
		'TopLevelSystemUnderTest': '/-2/-21',
		'ValueFlowComposition': '/-2/-41',
		'ValueFlowTarget': '/-2/-29'
	};

    //META ASPECT TYPE CHECKING
    var _isComponent = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Component); };
	var _isComponentAssemblies = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ComponentAssemblies); };
	var _isComponentAssembly = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ComponentAssembly); };
	var _isComponentType = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ComponentType); };
	var _isComponents = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Components); };
	var _isConnection = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Connection); };
	var _isConnector = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Connector); };
	var _isConnectorComposition = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ConnectorComposition); };
	var _isCyPhyLightModelicaLanguage = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.CyPhyLightModelicaLanguage); };
	var _isCyPhyProject = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.CyPhyProject); };
	var _isDesignEntity = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.DesignEntity); };
	var _isEnvironment = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Environment); };
	var _isFCO = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FCO); };
	var _isFolder = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Folder); };
	var _isMetric = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Metric); };
	var _isModelicaConnector = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ModelicaConnector); };
	var _isModelicaConnectorComposition = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ModelicaConnectorComposition); };
	var _isModelicaModel = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ModelicaModel); };
	var _isModelicaModelType = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ModelicaModelType); };
	var _isModelicaParameter = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ModelicaParameter); };
	var _isModelicaParameterRedeclare = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ModelicaParameterRedeclare); };
	var _isModelicaTestBench = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ModelicaTestBench); };
	var _isParameter = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Parameter); };
	var _isPostProcessing = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.PostProcessing); };
	var _isProperty = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Property); };
	var _isPropertyType = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.PropertyType); };
	var _isSolverSettings = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.SolverSettings); };
	var _isTestBenchType = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.TestBenchType); };
	var _isTestComponent = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.TestComponent); };
	var _isTestComponents = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.TestComponents); };
	var _isTesting = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Testing); };
	var _isTopLevelSystemUnderTest = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.TopLevelSystemUnderTest); };
	var _isValueFlowComposition = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ValueFlowComposition); };
	var _isValueFlowTarget = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ValueFlowTarget); };
	

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
			isComponent: _isComponent,
			isComponentAssemblies: _isComponentAssemblies,
			isComponentAssembly: _isComponentAssembly,
			isComponentType: _isComponentType,
			isComponents: _isComponents,
			isConnection: _isConnection,
			isConnector: _isConnector,
			isConnectorComposition: _isConnectorComposition,
			isCyPhyLightModelicaLanguage: _isCyPhyLightModelicaLanguage,
			isCyPhyProject: _isCyPhyProject,
			isDesignEntity: _isDesignEntity,
			isEnvironment: _isEnvironment,
			isFCO: _isFCO,
			isFolder: _isFolder,
			isMetric: _isMetric,
			isModelicaConnector: _isModelicaConnector,
			isModelicaConnectorComposition: _isModelicaConnectorComposition,
			isModelicaModel: _isModelicaModel,
			isModelicaModelType: _isModelicaModelType,
			isModelicaParameter: _isModelicaParameter,
			isModelicaParameterRedeclare: _isModelicaParameterRedeclare,
			isModelicaTestBench: _isModelicaTestBench,
			isParameter: _isParameter,
			isPostProcessing: _isPostProcessing,
			isProperty: _isProperty,
			isPropertyType: _isPropertyType,
			isSolverSettings: _isSolverSettings,
			isTestBenchType: _isTestBenchType,
			isTestComponent: _isTestComponent,
			isTestComponents: _isTestComponents,
			isTesting: _isTesting,
			isTopLevelSystemUnderTest: _isTopLevelSystemUnderTest,
			isValueFlowComposition: _isValueFlowComposition,
			isValueFlowTarget: _isValueFlowTarget
		}
    };
});