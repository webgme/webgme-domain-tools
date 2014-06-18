/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 * 
 * AUTO GENERATED CODE FOR PROJECT PortHamiltonianSystem
 */


define(['underscore',
        'js/Utils/METAAspectHelper'], function (_underscore,
                                                METAAspectHelper) {
    "use strict";
    var _metaID = 'PortHamiltonianSystem.META.js';

    //META ASPECT TYPES
    var _metaTypes = {
        'Component': '/1536183540/698902055',
        'ComponentAssembliesFolder': '/1536183540/530776187',
        'ComponentAssembly': '/1536183540/1802052655',
        'ComponentConnection': '/1536183540/880160036',
        'ComponentsFolder': '/1536183540/981958831',
        'ControlPort': '/1536183540/876420956',
        'DiracStructure': '/1536183540/826875168',
        'DiracStructure2ExternalPortConnection': '/1536183540/337415470',
        'DiracStructure2InternalPortConnection': '/1536183540/386518694',
        'DiracStructureConnection': '/1536183540/371990823',
        'ExternalPort': '/1536183540/1506828321',
        'ExternalPort2DiracStructureConnection': '/1536183540/700567378',
        'ExternalPort2InternalPortConnection': '/1536183540/235279032',
        'ExternalPortConnection': '/1536183540/810388703',
        'FCO': '/1',
        'Gyrator': '/1536183540/654448863',
        'InteractionPort': '/1536183540/2106046558',
        'InternalPort': '/1536183540/787120870',
        'InternalPort2DiracStructureConnection': '/1536183540/1039448685',
        'One': '/1536183540/719125838',
        'PHSLanguage': '/1536183540',
        'Project': '/1536183540/552297840',
        'ProjectsFolder': '/1536183540/1529073288',
        'ResistivePort': '/1536183540/1181723130',
        'StoragePort': '/1536183540/1457390394',
        'Transformer': '/1536183540/1165404211',
        'Zero': '/1536183540/1523457733',

    };

    //META ASPECT TYPE CHECKING
    var _isComponent = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Component); };
    var _isComponentAssembliesFolder = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ComponentAssembliesFolder); };
    var _isComponentAssembly = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ComponentAssembly); };
    var _isComponentConnection = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ComponentConnection); };
    var _isComponentsFolder = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ComponentsFolder); };
    var _isControlPort = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ControlPort); };
    var _isDiracStructure = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.DiracStructure); };
    var _isDiracStructure2ExternalPortConnection = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.DiracStructure2ExternalPortConnection); };
    var _isDiracStructure2InternalPortConnection = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.DiracStructure2InternalPortConnection); };
    var _isDiracStructureConnection = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.DiracStructureConnection); };
    var _isExternalPort = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ExternalPort); };
    var _isExternalPort2DiracStructureConnection = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ExternalPort2DiracStructureConnection); };
    var _isExternalPort2InternalPortConnection = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ExternalPort2InternalPortConnection); };
    var _isExternalPortConnection = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ExternalPortConnection); };
    var _isFCO = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.FCO); };
    var _isGyrator = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Gyrator); };
    var _isInteractionPort = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.InteractionPort); };
    var _isInternalPort = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.InternalPort); };
    var _isInternalPort2DiracStructureConnection = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.InternalPort2DiracStructureConnection); };
    var _isOne = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.One); };
    var _isPHSLanguage = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.PHSLanguage); };
    var _isProject = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Project); };
    var _isProjectsFolder = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ProjectsFolder); };
    var _isResistivePort = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.ResistivePort); };
    var _isStoragePort = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.StoragePort); };
    var _isTransformer = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Transformer); };
    var _isZero = function (objID) { return METAAspectHelper.isMETAType(objID, _metaTypes.Zero); };


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
            isComponent: _isComponent,
            isComponentAssembliesFolder: _isComponentAssembliesFolder,
            isComponentAssembly: _isComponentAssembly,
            isComponentConnection: _isComponentConnection,
            isComponentsFolder: _isComponentsFolder,
            isControlPort: _isControlPort,
            isDiracStructure: _isDiracStructure,
            isDiracStructure2ExternalPortConnection: _isDiracStructure2ExternalPortConnection,
            isDiracStructure2InternalPortConnection: _isDiracStructure2InternalPortConnection,
            isDiracStructureConnection: _isDiracStructureConnection,
            isExternalPort: _isExternalPort,
            isExternalPort2DiracStructureConnection: _isExternalPort2DiracStructureConnection,
            isExternalPort2InternalPortConnection: _isExternalPort2InternalPortConnection,
            isExternalPortConnection: _isExternalPortConnection,
            isFCO: _isFCO,
            isGyrator: _isGyrator,
            isInteractionPort: _isInteractionPort,
            isInternalPort: _isInternalPort,
            isInternalPort2DiracStructureConnection: _isInternalPort2DiracStructureConnection,
            isOne: _isOne,
            isPHSLanguage: _isPHSLanguage,
            isProject: _isProject,
            isProjectsFolder: _isProjectsFolder,
            isResistivePort: _isResistivePort,
            isStoragePort: _isStoragePort,
            isTransformer: _isTransformer,
            isZero: _isZero,

        }
    };
});