/**
 * Created by Zsolt on 3/18/14.
 */

define([], function() {

    var METATypes = {
  "TestComponent": "41e038c6-e704-bbab-1df1-af7ed3d6c0a6",
  "ModelicaConnector": "bf534a54-82dd-b285-5027-6da5e3f35912",
  "ValueFlowComposition": "5955d935-6d16-37b5-557d-addeb4ae55d8",
  "Property": "4fbf083e-a164-4ef7-98f1-3c5629f80ff6",
  "Parameter": "70bf083e-a164-4ef7-98f1-3c5629f80ff6",
  "Connection": "b503190a-fc8d-4173-7b11-47dd27e9135d",
  "ConnectorComposition": "4155d935-6d16-37b5-557d-addeb4ae55d8",
  "ModelicaConnectorComposition": "4455d935-6d16-37b5-557d-addeb4ae55d8",
  "Environment": "ea7f81e6-723e-fda3-8c83-d68e2ba60f88",
  "ValueFlowTarget": "f8d5184b-1e2c-2ca8-0d59-8b60ca509915",
  "Metric": "75bf083e-a164-4ef7-98f1-3c5629f80ff6",
  "ModelicaParameter": "76bf083e-a164-4ef7-98f1-3c5629f80ff6",
  "Components": "b6aeedfe-500c-6026-0b24-5a04d6659565",
  "TestComponents": "68f2b898-89d2-cf58-a7ac-d59d4a90296a",
  "SolverSettings": "aadfb749-e14d-ec47-76b8-4599ef13ee9a",
  "PropertyType": "c6391f84-c449-a772-46ec-821c24621b69",
  "ComponentAssemblies": "0c765199-3d91-f473-725c-c28b07c6e730",
  "ModelicaParameterRedeclare": "8fa5e761-e974-2ee5-eb18-342d9b14287f",
  "PostProcessing": "fd574789-45bb-24d2-cc59-7f05931c5b82",
  "Component": "f202d992-2709-597c-1eb6-f9e2ff782c49",
  "TopLevelSystemUnderTest": "a4bfbd07-b2c1-4e97-59c8-d2e153be7159",
  "ComponentAssembly": "aca13232-410b-7629-46c1-68a323033ac9",
  "DesignEntity": "194fda2d-f416-444b-f9df-0c9eb057ec0f",
  "ComponentType": "6437b89c-23a4-3bc7-2733-5ac6a199636f",
  "ModelicaModel": "e77f81e6-723e-fda3-8c83-d68e2ba60f88",
  "ModelicaModelType": "f9182f42-21c5-ff29-27ea-8de3e34292b2",
  "Connector": "c4c6d901-745d-9862-3235-eff66cd11758",
  "ModelicaTestBench": "270c8e6e-5d29-cca7-3350-3b64177e11d2",
  "CyPhyProject": "40f2b898-89d2-cf58-a7ac-d59d4a90296a",
  "Folder": "41ce81a6-0a54-de1c-ec1f-089ee2a55c7a",
  "Testing": "68f2b898-89d2-cf58-a7ac-d59d4a90296a",
  "TestBenchType": "374c0e63-f06a-9ff1-b807-2ddb3fdda5c7",
  "FCO": "ac68f222-56bc-c3ee-69d4-40f79fae657a",
  "CyPhyLightModelicaLanguage": "5871a7ba-63d2-544f-4ec2-1e2f47aa7ae6"
};

    var PROJECTNAME = function (core, storage) {
        this._core = core;
        this._storage = storage;
    };

    PROJECTNAME.prototype.createByMetaName = function (name, parent) {

    };

    return PROJECTNAME;

});