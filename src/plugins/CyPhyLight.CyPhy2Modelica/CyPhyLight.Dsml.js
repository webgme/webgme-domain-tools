define([
        './CyPhyLight.Component.Dsml',
        './CyPhyLight.ComponentAssemblies.Dsml',
        './CyPhyLight.ComponentAssembly.Dsml',
        './CyPhyLight.ComponentType.Dsml',
        './CyPhyLight.Components.Dsml',
        './CyPhyLight.Connection.Dsml',
        './CyPhyLight.Connector.Dsml',
        './CyPhyLight.ConnectorComposition.Dsml',
        './CyPhyLight.CyPhyLightModelicaLanguage.Dsml',
        './CyPhyLight.CyPhyProject.Dsml',
        './CyPhyLight.DesignEntity.Dsml',
        './CyPhyLight.Environment.Dsml',
        './CyPhyLight.FCO.Dsml',
        './CyPhyLight.Folder.Dsml',
        './CyPhyLight.Metric.Dsml',
        './CyPhyLight.ModelicaConnector.Dsml',
        './CyPhyLight.ModelicaConnectorComposition.Dsml',
        './CyPhyLight.ModelicaModel.Dsml',
        './CyPhyLight.ModelicaModelType.Dsml',
        './CyPhyLight.ModelicaParameter.Dsml',
        './CyPhyLight.ModelicaParameterRedeclare.Dsml',
        './CyPhyLight.ModelicaTestBench.Dsml',
        './CyPhyLight.Parameter.Dsml',
        './CyPhyLight.PostProcessing.Dsml',
        './CyPhyLight.Property.Dsml',
        './CyPhyLight.PropertyType.Dsml',
        './CyPhyLight.SolverSettings.Dsml',
        './CyPhyLight.TestBenchType.Dsml',
        './CyPhyLight.TestComponent.Dsml',
        './CyPhyLight.TestComponents.Dsml',
        './CyPhyLight.Testing.Dsml',
        './CyPhyLight.TopLevelSystemUnderTest.Dsml',
        './CyPhyLight.ValueFlowComposition.Dsml',
        './CyPhyLight.ValueFlowTarget.Dsml'],

    function (
        Component,
        ComponentAssemblies,
        ComponentAssembly,
        ComponentType,
        Components,
        Connection,
        Connector,
        ConnectorComposition,
        CyPhyLightModelicaLanguage,
        CyPhyProject,
        DesignEntity,
        Environment,
        FCO,
        Folder,
        Metric,
        ModelicaConnector,
        ModelicaConnectorComposition,
        ModelicaModel,
        ModelicaModelType,
        ModelicaParameter,
        ModelicaParameterRedeclare,
        ModelicaTestBench,
        Parameter,
        PostProcessing,
        Property,
        PropertyType,
        SolverSettings,
        TestBenchType,
        TestComponent,
        TestComponents,
        Testing,
        TopLevelSystemUnderTest,
        ValueFlowComposition,
        ValueFlowTarget) {


    'use strict';
    /**
    * A module representing CyPhyLight domain specific API.
    *
    * Generated on Mon Mar 24 2014 19:36:42 GMT-0500 (Central Daylight Time) [2014-03-25T00:36:42.571Z]
    * @exports CyPhyLight
    * @version 1.0
    */
    var CyPhyLight = function () {};

    CyPhyLight.initialize = function (core, storage, META) {
        var name;
        for (name in META) {
            if (META.hasOwnProperty(name)) {
                if (CyPhyLight.hasOwnProperty(name)) {
                CyPhyLight[name].Type = META[name];
            } else {
                CyPhyLight[name] = {};
                CyPhyLight[name].Type = META[name];
                }
            }
        }

        CyPhyLight._core = core;
        CyPhyLight._storage = storage;
    };

    CyPhyLight.createMETATypesTests = function (core) {
        var META = {},
            options = {},
            node;

    
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'Component');
        META.Component = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ComponentAssemblies');
        META.ComponentAssemblies = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ComponentAssembly');
        META.ComponentAssembly = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ComponentType');
        META.ComponentType = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'Components');
        META.Components = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'Connection');
        META.Connection = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'Connector');
        META.Connector = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ConnectorComposition');
        META.ConnectorComposition = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'CyPhyLightModelicaLanguage');
        META.CyPhyLightModelicaLanguage = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'CyPhyProject');
        META.CyPhyProject = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'DesignEntity');
        META.DesignEntity = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'Environment');
        META.Environment = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'FCO');
        META.FCO = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'Folder');
        META.Folder = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'Metric');
        META.Metric = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ModelicaConnector');
        META.ModelicaConnector = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ModelicaConnectorComposition');
        META.ModelicaConnectorComposition = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ModelicaModel');
        META.ModelicaModel = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ModelicaModelType');
        META.ModelicaModelType = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ModelicaParameter');
        META.ModelicaParameter = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ModelicaParameterRedeclare');
        META.ModelicaParameterRedeclare = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ModelicaTestBench');
        META.ModelicaTestBench = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'Parameter');
        META.Parameter = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'PostProcessing');
        META.PostProcessing = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'Property');
        META.Property = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'PropertyType');
        META.PropertyType = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'SolverSettings');
        META.SolverSettings = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'TestBenchType');
        META.TestBenchType = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'TestComponent');
        META.TestComponent = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'TestComponents');
        META.TestComponents = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'Testing');
        META.Testing = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'TopLevelSystemUnderTest');
        META.TopLevelSystemUnderTest = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ValueFlowComposition');
        META.ValueFlowComposition = node;
        
        node = core.createNode(options);
        core.setAttribute(node, 'name', 'ValueFlowTarget');
        META.ValueFlowTarget = node;
        
        return META;
    };


    CyPhyLight.Component = Component;

    CyPhyLight.ComponentAssemblies = ComponentAssemblies;

    CyPhyLight.ComponentAssembly = ComponentAssembly;

    CyPhyLight.ComponentType = ComponentType;

    CyPhyLight.Components = Components;

    CyPhyLight.Connection = Connection;

    CyPhyLight.Connector = Connector;

    CyPhyLight.ConnectorComposition = ConnectorComposition;

    CyPhyLight.CyPhyLightModelicaLanguage = CyPhyLightModelicaLanguage;

    CyPhyLight.CyPhyProject = CyPhyProject;

    CyPhyLight.DesignEntity = DesignEntity;

    CyPhyLight.Environment = Environment;

    CyPhyLight.FCO = FCO;

    CyPhyLight.Folder = Folder;

    CyPhyLight.Metric = Metric;

    CyPhyLight.ModelicaConnector = ModelicaConnector;

    CyPhyLight.ModelicaConnectorComposition = ModelicaConnectorComposition;

    CyPhyLight.ModelicaModel = ModelicaModel;

    CyPhyLight.ModelicaModelType = ModelicaModelType;

    CyPhyLight.ModelicaParameter = ModelicaParameter;

    CyPhyLight.ModelicaParameterRedeclare = ModelicaParameterRedeclare;

    CyPhyLight.ModelicaTestBench = ModelicaTestBench;

    CyPhyLight.Parameter = Parameter;

    CyPhyLight.PostProcessing = PostProcessing;

    CyPhyLight.Property = Property;

    CyPhyLight.PropertyType = PropertyType;

    CyPhyLight.SolverSettings = SolverSettings;

    CyPhyLight.TestBenchType = TestBenchType;

    CyPhyLight.TestComponent = TestComponent;

    CyPhyLight.TestComponents = TestComponents;

    CyPhyLight.Testing = Testing;

    CyPhyLight.TopLevelSystemUnderTest = TopLevelSystemUnderTest;

    CyPhyLight.ValueFlowComposition = ValueFlowComposition;

    CyPhyLight.ValueFlowTarget = ValueFlowTarget;


    return CyPhyLight;

});