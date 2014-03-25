define([], function () {
    'use strict';
    /**
    * A module representing CyPhyLight domain specific API.
    *
    * Generated on Mon Mar 24 2014 21:51:27 GMT-0500 (CDT) [2014-03-25T02:51:27.652Z]
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


    //<editor-fold desc="Component">

    /**
    * Initializes a new instance of Component.
    *
    * @class
    * @augments {CyPhyLight.ComponentType}
    * @classdesc This class represents a(n) Component.
    * @property {CyPhyLight.Component.Attributes} attributes The attributes of the Component.
    * @property {CyPhyLight.Component.Registry} registry The registry of the Component.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.Component = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.ComponentType.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.Component.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.Component.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.ComponentType.prototype could be undefined at this point.
    // CyPhyLight.Component.prototype = Object.create(CyPhyLight.ComponentType.prototype);
    // CyPhyLight.Component.prototype.constructor = CyPhyLight.Component;
    // 

    //<editor-fold desc="Component static fields, properties and functions">

    /**
    * WebGME node object that represents Component type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.Component.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of Component.
    * @type {string}
    * @static
    */
    CyPhyLight.Component.ID = "/-2/-19";

    /**
    * WebGME node object's meta type GUID of Component.
    * @type {string}
    * @static
    */
    CyPhyLight.Component.GUID = "f202d992-2709-597c-1eb6-f9e2ff782c49";

    /**
    * WebGME node object's meta type hash value of Component.
    * @type {string}
    * @static
    */
    CyPhyLight.Component.Hash = "#1926b1e5cc741987ffbefd97f9304d95e536f5d7";

        
    /**
    * Creates a new Component inside given parent.
    * @returns {CyPhyLight.Component} The newly created Component.
    * @param {CyPhyLight.FCO} parent Instance where the new Component should be created.
    * @public
    */
    CyPhyLight.Component.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Component.Type});
        return new CyPhyLight.Component(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="Component create child objects">

    /**
    * Creates a new Connector inside this Component instance.
    * @returns {CyPhyLight.Connector} The newly created Connector.
    * @public
    */
    CyPhyLight.Component.prototype.createConnector = function () {
        return CyPhyLight.Connector.createObj(this);
    };


    /**
    * Creates a new Connection inside this Component instance.
    * @returns {CyPhyLight.Connection} The newly created Connection.
    * @public
    */
    CyPhyLight.Component.prototype.createConnection = function () {
        return CyPhyLight.Connection.createObj(this);
    };


    /**
    * Creates a new Property inside this Component instance.
    * @returns {CyPhyLight.Property} The newly created Property.
    * @public
    */
    CyPhyLight.Component.prototype.createProperty = function () {
        return CyPhyLight.Property.createObj(this);
    };


    /**
    * Creates a new ModelicaModel inside this Component instance.
    * @returns {CyPhyLight.ModelicaModel} The newly created ModelicaModel.
    * @public
    */
    CyPhyLight.Component.prototype.createModelicaModel = function () {
        return CyPhyLight.ModelicaModel.createObj(this);
    };


    /**
    * Creates a new Parameter inside this Component instance.
    * @returns {CyPhyLight.Parameter} The newly created Parameter.
    * @public
    */
    CyPhyLight.Component.prototype.createParameter = function () {
        return CyPhyLight.Parameter.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.Component.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="Component attributes">
    /**
    * Initializes a new instance of Component.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of Component.
    * @param {object} nodeObj The wrapped WebGME object of Component.
    * @constructor
    */
    CyPhyLight.Component.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the Component instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.Component.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the Component instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.Component.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="Component registry entries">
    /**
    * Initializes a new instance of Component.Registry
    *
    * @class
    * @classdesc This class wraps the registry of Component.
    * @param {object} nodeObj The wrapped WebGME object of Component.
    * @constructor
    */
    CyPhyLight.Component.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the Component instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the Component instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the Component instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the Component instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the Component instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the Component instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the Component instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the Component instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the Component instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the Component instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the Component instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the Component instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the Component instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the Component instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the Component instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the Component instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.Component.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ComponentAssemblies">

    /**
    * Initializes a new instance of ComponentAssemblies.
    *
    * @class
    * @augments {CyPhyLight.Folder}
    * @classdesc This class represents a(n) ComponentAssemblies.
    * @property {CyPhyLight.ComponentAssemblies.Attributes} attributes The attributes of the ComponentAssemblies.
    * @property {CyPhyLight.ComponentAssemblies.Registry} registry The registry of the ComponentAssemblies.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ComponentAssemblies = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.Folder.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ComponentAssemblies.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ComponentAssemblies.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.Folder.prototype could be undefined at this point.
    // CyPhyLight.ComponentAssemblies.prototype = Object.create(CyPhyLight.Folder.prototype);
    // CyPhyLight.ComponentAssemblies.prototype.constructor = CyPhyLight.ComponentAssemblies;
    // 

    //<editor-fold desc="ComponentAssemblies static fields, properties and functions">

    /**
    * WebGME node object that represents ComponentAssemblies type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ComponentAssemblies.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ComponentAssemblies.
    * @type {string}
    * @static
    */
    CyPhyLight.ComponentAssemblies.ID = "/-2/-15";

    /**
    * WebGME node object's meta type GUID of ComponentAssemblies.
    * @type {string}
    * @static
    */
    CyPhyLight.ComponentAssemblies.GUID = "0c765199-3d91-f473-725c-c28b07c6e730";

    /**
    * WebGME node object's meta type hash value of ComponentAssemblies.
    * @type {string}
    * @static
    */
    CyPhyLight.ComponentAssemblies.Hash = "#98b4546ccdf3d173bd89bda290ad067514dc925d";

        
    /**
    * Creates a new ComponentAssemblies inside given parent.
    * @returns {CyPhyLight.ComponentAssemblies} The newly created ComponentAssemblies.
    * @param {CyPhyLight.FCO} parent Instance where the new ComponentAssemblies should be created.
    * @public
    */
    CyPhyLight.ComponentAssemblies.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ComponentAssemblies.Type});
        return new CyPhyLight.ComponentAssemblies(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ComponentAssemblies create child objects">

    /**
    * Creates a new ComponentAssemblies inside this ComponentAssemblies instance.
    * @returns {CyPhyLight.ComponentAssemblies} The newly created ComponentAssemblies.
    * @public
    */
    CyPhyLight.ComponentAssemblies.prototype.createComponentAssemblies = function () {
        return CyPhyLight.ComponentAssemblies.createObj(this);
    };


    /**
    * Creates a new ComponentAssembly inside this ComponentAssemblies instance.
    * @returns {CyPhyLight.ComponentAssembly} The newly created ComponentAssembly.
    * @public
    */
    CyPhyLight.ComponentAssemblies.prototype.createComponentAssembly = function () {
        return CyPhyLight.ComponentAssembly.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.ComponentAssemblies.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ComponentAssemblies attributes">
    /**
    * Initializes a new instance of ComponentAssemblies.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ComponentAssemblies.
    * @param {object} nodeObj The wrapped WebGME object of ComponentAssemblies.
    * @constructor
    */
    CyPhyLight.ComponentAssemblies.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the ComponentAssemblies instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ComponentAssemblies instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ComponentAssemblies registry entries">
    /**
    * Initializes a new instance of ComponentAssemblies.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ComponentAssemblies.
    * @param {object} nodeObj The wrapped WebGME object of ComponentAssemblies.
    * @constructor
    */
    CyPhyLight.ComponentAssemblies.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ComponentAssemblies instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ComponentAssemblies instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ComponentAssemblies instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ComponentAssemblies instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ComponentAssemblies instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ComponentAssemblies instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the ComponentAssemblies instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the ComponentAssemblies instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the ComponentAssemblies instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ComponentAssemblies instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ComponentAssemblies instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ComponentAssemblies instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ComponentAssemblies instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ComponentAssemblies instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the ComponentAssemblies instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ComponentAssemblies instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ComponentAssemblies.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ComponentAssembly">

    /**
    * Initializes a new instance of ComponentAssembly.
    *
    * @class
    * @augments {CyPhyLight.TopLevelSystemUnderTest}
    * @classdesc This class represents a(n) ComponentAssembly.
    * @property {CyPhyLight.ComponentAssembly.Attributes} attributes The attributes of the ComponentAssembly.
    * @property {CyPhyLight.ComponentAssembly.Registry} registry The registry of the ComponentAssembly.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ComponentAssembly = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.TopLevelSystemUnderTest.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ComponentAssembly.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ComponentAssembly.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.TopLevelSystemUnderTest.prototype could be undefined at this point.
    // CyPhyLight.ComponentAssembly.prototype = Object.create(CyPhyLight.TopLevelSystemUnderTest.prototype);
    // CyPhyLight.ComponentAssembly.prototype.constructor = CyPhyLight.ComponentAssembly;
    // 

    //<editor-fold desc="ComponentAssembly static fields, properties and functions">

    /**
    * WebGME node object that represents ComponentAssembly type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ComponentAssembly.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ComponentAssembly.
    * @type {string}
    * @static
    */
    CyPhyLight.ComponentAssembly.ID = "/-2/-57";

    /**
    * WebGME node object's meta type GUID of ComponentAssembly.
    * @type {string}
    * @static
    */
    CyPhyLight.ComponentAssembly.GUID = "aca13232-410b-7629-46c1-68a323033ac9";

    /**
    * WebGME node object's meta type hash value of ComponentAssembly.
    * @type {string}
    * @static
    */
    CyPhyLight.ComponentAssembly.Hash = "#b4a2ad03dd2965c8a4e0dfe56a76fe7fd43d68e9";

        
    /**
    * Creates a new ComponentAssembly inside given parent.
    * @returns {CyPhyLight.ComponentAssembly} The newly created ComponentAssembly.
    * @param {CyPhyLight.FCO} parent Instance where the new ComponentAssembly should be created.
    * @public
    */
    CyPhyLight.ComponentAssembly.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ComponentAssembly.Type});
        return new CyPhyLight.ComponentAssembly(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ComponentAssembly create child objects">

    /**
    * Creates a new Connector inside this ComponentAssembly instance.
    * @returns {CyPhyLight.Connector} The newly created Connector.
    * @public
    */
    CyPhyLight.ComponentAssembly.prototype.createConnector = function () {
        return CyPhyLight.Connector.createObj(this);
    };


    /**
    * Creates a new Connection inside this ComponentAssembly instance.
    * @returns {CyPhyLight.Connection} The newly created Connection.
    * @public
    */
    CyPhyLight.ComponentAssembly.prototype.createConnection = function () {
        return CyPhyLight.Connection.createObj(this);
    };


    /**
    * Creates a new ComponentAssembly inside this ComponentAssembly instance.
    * @returns {CyPhyLight.ComponentAssembly} The newly created ComponentAssembly.
    * @public
    */
    CyPhyLight.ComponentAssembly.prototype.createComponentAssembly = function () {
        return CyPhyLight.ComponentAssembly.createObj(this);
    };


    /**
    * Creates a new Property inside this ComponentAssembly instance.
    * @returns {CyPhyLight.Property} The newly created Property.
    * @public
    */
    CyPhyLight.ComponentAssembly.prototype.createProperty = function () {
        return CyPhyLight.Property.createObj(this);
    };


    /**
    * Creates a new Parameter inside this ComponentAssembly instance.
    * @returns {CyPhyLight.Parameter} The newly created Parameter.
    * @public
    */
    CyPhyLight.ComponentAssembly.prototype.createParameter = function () {
        return CyPhyLight.Parameter.createObj(this);
    };


    /**
    * Creates a new Component inside this ComponentAssembly instance.
    * @returns {CyPhyLight.Component} The newly created Component.
    * @public
    */
    CyPhyLight.ComponentAssembly.prototype.createComponent = function () {
        return CyPhyLight.Component.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.ComponentAssembly.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ComponentAssembly attributes">
    /**
    * Initializes a new instance of ComponentAssembly.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ComponentAssembly.
    * @param {object} nodeObj The wrapped WebGME object of ComponentAssembly.
    * @constructor
    */
    CyPhyLight.ComponentAssembly.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the ComponentAssembly instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ComponentAssembly.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ComponentAssembly instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ComponentAssembly.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ComponentAssembly registry entries">
    /**
    * Initializes a new instance of ComponentAssembly.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ComponentAssembly.
    * @param {object} nodeObj The wrapped WebGME object of ComponentAssembly.
    * @constructor
    */
    CyPhyLight.ComponentAssembly.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ComponentAssembly instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ComponentAssembly instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ComponentAssembly instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ComponentAssembly instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ComponentAssembly instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ComponentAssembly instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the ComponentAssembly instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the ComponentAssembly instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the ComponentAssembly instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ComponentAssembly instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ComponentAssembly instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ComponentAssembly instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ComponentAssembly instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ComponentAssembly instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the ComponentAssembly instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ComponentAssembly instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ComponentAssembly.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ComponentType">

    /**
    * Initializes a new instance of ComponentType.
    *
    * @class
    * @augments {CyPhyLight.DesignEntity}
    * @classdesc This class represents a(n) ComponentType.
    * @property {CyPhyLight.ComponentType.Attributes} attributes The attributes of the ComponentType.
    * @property {CyPhyLight.ComponentType.Registry} registry The registry of the ComponentType.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ComponentType = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.DesignEntity.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ComponentType.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ComponentType.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.DesignEntity.prototype could be undefined at this point.
    // CyPhyLight.ComponentType.prototype = Object.create(CyPhyLight.DesignEntity.prototype);
    // CyPhyLight.ComponentType.prototype.constructor = CyPhyLight.ComponentType;
    // 

    //<editor-fold desc="ComponentType static fields, properties and functions">

    /**
    * WebGME node object that represents ComponentType type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ComponentType.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ComponentType.
    * @type {string}
    * @static
    */
    CyPhyLight.ComponentType.ID = "/-2/-7";

    /**
    * WebGME node object's meta type GUID of ComponentType.
    * @type {string}
    * @static
    */
    CyPhyLight.ComponentType.GUID = "6437b89c-23a4-3bc7-2733-5ac6a199636f";

    /**
    * WebGME node object's meta type hash value of ComponentType.
    * @type {string}
    * @static
    */
    CyPhyLight.ComponentType.Hash = "#d2835c334e3d61d98293fa198f249e473b3d69bf";

        
    /**
    * Creates a new ComponentType inside given parent.
    * @returns {CyPhyLight.ComponentType} The newly created ComponentType.
    * @param {CyPhyLight.FCO} parent Instance where the new ComponentType should be created.
    * @public
    */
    CyPhyLight.ComponentType.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ComponentType.Type});
        return new CyPhyLight.ComponentType(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ComponentType create child objects">

    /**
    * Creates a new Connector inside this ComponentType instance.
    * @returns {CyPhyLight.Connector} The newly created Connector.
    * @public
    */
    CyPhyLight.ComponentType.prototype.createConnector = function () {
        return CyPhyLight.Connector.createObj(this);
    };


    /**
    * Creates a new Connection inside this ComponentType instance.
    * @returns {CyPhyLight.Connection} The newly created Connection.
    * @public
    */
    CyPhyLight.ComponentType.prototype.createConnection = function () {
        return CyPhyLight.Connection.createObj(this);
    };


    /**
    * Creates a new Property inside this ComponentType instance.
    * @returns {CyPhyLight.Property} The newly created Property.
    * @public
    */
    CyPhyLight.ComponentType.prototype.createProperty = function () {
        return CyPhyLight.Property.createObj(this);
    };


    /**
    * Creates a new Parameter inside this ComponentType instance.
    * @returns {CyPhyLight.Parameter} The newly created Parameter.
    * @public
    */
    CyPhyLight.ComponentType.prototype.createParameter = function () {
        return CyPhyLight.Parameter.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.ComponentType.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ComponentType attributes">
    /**
    * Initializes a new instance of ComponentType.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ComponentType.
    * @param {object} nodeObj The wrapped WebGME object of ComponentType.
    * @constructor
    */
    CyPhyLight.ComponentType.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the ComponentType instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ComponentType.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ComponentType instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ComponentType.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ComponentType registry entries">
    /**
    * Initializes a new instance of ComponentType.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ComponentType.
    * @param {object} nodeObj The wrapped WebGME object of ComponentType.
    * @constructor
    */
    CyPhyLight.ComponentType.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ComponentType instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ComponentType instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ComponentType instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ComponentType instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ComponentType instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ComponentType instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the ComponentType instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ComponentType instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ComponentType instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ComponentType instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ComponentType instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ComponentType instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the ComponentType instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ComponentType instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ComponentType.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="Components">

    /**
    * Initializes a new instance of Components.
    *
    * @class
    * @augments {CyPhyLight.Folder}
    * @classdesc This class represents a(n) Components.
    * @property {CyPhyLight.Components.Attributes} attributes The attributes of the Components.
    * @property {CyPhyLight.Components.Registry} registry The registry of the Components.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.Components = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.Folder.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.Components.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.Components.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.Folder.prototype could be undefined at this point.
    // CyPhyLight.Components.prototype = Object.create(CyPhyLight.Folder.prototype);
    // CyPhyLight.Components.prototype.constructor = CyPhyLight.Components;
    // 

    //<editor-fold desc="Components static fields, properties and functions">

    /**
    * WebGME node object that represents Components type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.Components.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of Components.
    * @type {string}
    * @static
    */
    CyPhyLight.Components.ID = "/-2/-14";

    /**
    * WebGME node object's meta type GUID of Components.
    * @type {string}
    * @static
    */
    CyPhyLight.Components.GUID = "b6aeedfe-500c-6026-0b24-5a04d6659565";

    /**
    * WebGME node object's meta type hash value of Components.
    * @type {string}
    * @static
    */
    CyPhyLight.Components.Hash = "#83f00b5a603a953f8461b58e7e864b4bac6ff6a3";

        
    /**
    * Creates a new Components inside given parent.
    * @returns {CyPhyLight.Components} The newly created Components.
    * @param {CyPhyLight.FCO} parent Instance where the new Components should be created.
    * @public
    */
    CyPhyLight.Components.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Components.Type});
        return new CyPhyLight.Components(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="Components create child objects">

    /**
    * Creates a new Components inside this Components instance.
    * @returns {CyPhyLight.Components} The newly created Components.
    * @public
    */
    CyPhyLight.Components.prototype.createComponents = function () {
        return CyPhyLight.Components.createObj(this);
    };


    /**
    * Creates a new Component inside this Components instance.
    * @returns {CyPhyLight.Component} The newly created Component.
    * @public
    */
    CyPhyLight.Components.prototype.createComponent = function () {
        return CyPhyLight.Component.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.Components.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="Components attributes">
    /**
    * Initializes a new instance of Components.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of Components.
    * @param {object} nodeObj The wrapped WebGME object of Components.
    * @constructor
    */
    CyPhyLight.Components.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the Components instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.Components.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the Components instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.Components.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="Components registry entries">
    /**
    * Initializes a new instance of Components.Registry
    *
    * @class
    * @classdesc This class wraps the registry of Components.
    * @param {object} nodeObj The wrapped WebGME object of Components.
    * @constructor
    */
    CyPhyLight.Components.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the Components instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the Components instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the Components instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the Components instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the Components instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the Components instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the Components instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the Components instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the Components instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the Components instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the Components instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the Components instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the Components instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the Components instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the Components instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the Components instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.Components.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="Connection">

    /**
    * Initializes a new instance of Connection.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) Connection.
    * @property {CyPhyLight.Connection.Attributes} attributes The attributes of the Connection.
    * @property {CyPhyLight.Connection.Registry} registry The registry of the Connection.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.Connection = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.Connection.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.Connection.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.Connection.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.Connection.prototype.constructor = CyPhyLight.Connection;
    // 

    //<editor-fold desc="Connection static fields, properties and functions">

    /**
    * WebGME node object that represents Connection type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.Connection.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of Connection.
    * @type {string}
    * @static
    */
    CyPhyLight.Connection.ID = "/-2/-40";

    /**
    * WebGME node object's meta type GUID of Connection.
    * @type {string}
    * @static
    */
    CyPhyLight.Connection.GUID = "b503190a-fc8d-4173-7b11-47dd27e9135d";

    /**
    * WebGME node object's meta type hash value of Connection.
    * @type {string}
    * @static
    */
    CyPhyLight.Connection.Hash = "#f4802bba2ccf65d0259f7f2c6103a2c7228b8ebc";

        
    /**
    * Creates a new Connection inside given parent.
    * @returns {CyPhyLight.Connection} The newly created Connection.
    * @param {CyPhyLight.FCO} parent Instance where the new Connection should be created.
    * @public
    */
    CyPhyLight.Connection.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Connection.Type});
        return new CyPhyLight.Connection(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="Connection create child objects">

    //</editor-fold>

    CyPhyLight.Connection.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="Connection attributes">
    /**
    * Initializes a new instance of Connection.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of Connection.
    * @param {object} nodeObj The wrapped WebGME object of Connection.
    * @constructor
    */
    CyPhyLight.Connection.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the Connection instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.Connection.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the Connection instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.Connection.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="Connection registry entries">
    /**
    * Initializes a new instance of Connection.Registry
    *
    * @class
    * @classdesc This class wraps the registry of Connection.
    * @param {object} nodeObj The wrapped WebGME object of Connection.
    * @constructor
    */
    CyPhyLight.Connection.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the Connection instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the Connection instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the Connection instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the Connection instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the Connection instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the Connection instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the Connection instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the Connection instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the Connection instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the Connection instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the Connection instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the Connection instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the Connection instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the Connection instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.Connection.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="Connector">

    /**
    * Initializes a new instance of Connector.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) Connector.
    * @property {CyPhyLight.Connector.Attributes} attributes The attributes of the Connector.
    * @property {CyPhyLight.Connector.Registry} registry The registry of the Connector.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.Connector = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.Connector.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.Connector.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.Connector.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.Connector.prototype.constructor = CyPhyLight.Connector;
    // 

    //<editor-fold desc="Connector static fields, properties and functions">

    /**
    * WebGME node object that represents Connector type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.Connector.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of Connector.
    * @type {string}
    * @static
    */
    CyPhyLight.Connector.ID = "/-2/-27";

    /**
    * WebGME node object's meta type GUID of Connector.
    * @type {string}
    * @static
    */
    CyPhyLight.Connector.GUID = "c4c6d901-745d-9862-3235-eff66cd11758";

    /**
    * WebGME node object's meta type hash value of Connector.
    * @type {string}
    * @static
    */
    CyPhyLight.Connector.Hash = "#f2a612512ae3c26d34981ff1e0c1d6e2b637297b";

        
    /**
    * Creates a new Connector inside given parent.
    * @returns {CyPhyLight.Connector} The newly created Connector.
    * @param {CyPhyLight.FCO} parent Instance where the new Connector should be created.
    * @public
    */
    CyPhyLight.Connector.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Connector.Type});
        return new CyPhyLight.Connector(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="Connector create child objects">

    /**
    * Creates a new ModelicaConnector inside this Connector instance.
    * @returns {CyPhyLight.ModelicaConnector} The newly created ModelicaConnector.
    * @public
    */
    CyPhyLight.Connector.prototype.createModelicaConnector = function () {
        return CyPhyLight.ModelicaConnector.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.Connector.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="Connector attributes">
    /**
    * Initializes a new instance of Connector.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of Connector.
    * @param {object} nodeObj The wrapped WebGME object of Connector.
    * @constructor
    */
    CyPhyLight.Connector.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the Connector instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.Connector.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the Connector instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.Connector.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="Connector registry entries">
    /**
    * Initializes a new instance of Connector.Registry
    *
    * @class
    * @classdesc This class wraps the registry of Connector.
    * @param {object} nodeObj The wrapped WebGME object of Connector.
    * @constructor
    */
    CyPhyLight.Connector.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the Connector instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the Connector instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the Connector instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the Connector instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the Connector instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the Connector instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the Connector instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the Connector instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the Connector instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the Connector instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the Connector instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the Connector instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the Connector instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the Connector instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the Connector instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the Connector instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.Connector.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ConnectorComposition">

    /**
    * Initializes a new instance of ConnectorComposition.
    *
    * @class
    * @augments {CyPhyLight.Connection}
    * @classdesc This class represents a(n) ConnectorComposition.
    * @property {CyPhyLight.ConnectorComposition.Attributes} attributes The attributes of the ConnectorComposition.
    * @property {CyPhyLight.ConnectorComposition.Registry} registry The registry of the ConnectorComposition.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ConnectorComposition = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.Connection.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ConnectorComposition.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ConnectorComposition.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.Connection.prototype could be undefined at this point.
    // CyPhyLight.ConnectorComposition.prototype = Object.create(CyPhyLight.Connection.prototype);
    // CyPhyLight.ConnectorComposition.prototype.constructor = CyPhyLight.ConnectorComposition;
    // 

    //<editor-fold desc="ConnectorComposition static fields, properties and functions">

    /**
    * WebGME node object that represents ConnectorComposition type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ConnectorComposition.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ConnectorComposition.
    * @type {string}
    * @static
    */
    CyPhyLight.ConnectorComposition.ID = "/-2/-49";

    /**
    * WebGME node object's meta type GUID of ConnectorComposition.
    * @type {string}
    * @static
    */
    CyPhyLight.ConnectorComposition.GUID = "4155d935-6d16-37b5-557d-addeb4ae55d8";

    /**
    * WebGME node object's meta type hash value of ConnectorComposition.
    * @type {string}
    * @static
    */
    CyPhyLight.ConnectorComposition.Hash = "#c8ce2c92c12c5745ce7fa924a29ffa449d845f2a";

        
    CyPhyLight.ConnectorComposition.createObj = function (parent, src, dst) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ConnectorComposition.Type});
        CyPhyLight._core.setPointer(nodeObj, 'src', src.getNodeObj());
        CyPhyLight._core.setPointer(nodeObj, 'dst', dst.getNodeObj());
        return new CyPhyLight.ConnectorComposition(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ConnectorComposition create child objects">

    //</editor-fold>

    CyPhyLight.ConnectorComposition.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ConnectorComposition attributes">
    /**
    * Initializes a new instance of ConnectorComposition.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ConnectorComposition.
    * @param {object} nodeObj The wrapped WebGME object of ConnectorComposition.
    * @constructor
    */
    CyPhyLight.ConnectorComposition.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the ConnectorComposition instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ConnectorComposition.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ConnectorComposition instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ConnectorComposition.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ConnectorComposition registry entries">
    /**
    * Initializes a new instance of ConnectorComposition.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ConnectorComposition.
    * @param {object} nodeObj The wrapped WebGME object of ConnectorComposition.
    * @constructor
    */
    CyPhyLight.ConnectorComposition.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ConnectorComposition instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ConnectorComposition instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ConnectorComposition instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ConnectorComposition instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ConnectorComposition instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ConnectorComposition instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the ConnectorComposition instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the ConnectorComposition instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the ConnectorComposition instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ConnectorComposition instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ConnectorComposition instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ConnectorComposition instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ConnectorComposition instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ConnectorComposition instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the ConnectorComposition instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ConnectorComposition instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ConnectorComposition.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="CyPhyLightModelicaLanguage">

    /**
    * Initializes a new instance of CyPhyLightModelicaLanguage.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) CyPhyLightModelicaLanguage.
    * @property {CyPhyLight.CyPhyLightModelicaLanguage.Attributes} attributes The attributes of the CyPhyLightModelicaLanguage.
    * @property {CyPhyLight.CyPhyLightModelicaLanguage.Registry} registry The registry of the CyPhyLightModelicaLanguage.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.CyPhyLightModelicaLanguage = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.CyPhyLightModelicaLanguage.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.CyPhyLightModelicaLanguage.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.CyPhyLightModelicaLanguage.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.CyPhyLightModelicaLanguage.prototype.constructor = CyPhyLight.CyPhyLightModelicaLanguage;
    // 

    //<editor-fold desc="CyPhyLightModelicaLanguage static fields, properties and functions">

    /**
    * WebGME node object that represents CyPhyLightModelicaLanguage type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of CyPhyLightModelicaLanguage.
    * @type {string}
    * @static
    */
    CyPhyLight.CyPhyLightModelicaLanguage.ID = "/-2";

    /**
    * WebGME node object's meta type GUID of CyPhyLightModelicaLanguage.
    * @type {string}
    * @static
    */
    CyPhyLight.CyPhyLightModelicaLanguage.GUID = "5871a7ba-63d2-544f-4ec2-1e2f47aa7ae6";

    /**
    * WebGME node object's meta type hash value of CyPhyLightModelicaLanguage.
    * @type {string}
    * @static
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Hash = "#0ae3bb328a5c3593a07249fd618c5f075546c4ca";

        
    /**
    * Creates a new CyPhyLightModelicaLanguage inside given parent.
    * @returns {CyPhyLight.CyPhyLightModelicaLanguage} The newly created CyPhyLightModelicaLanguage.
    * @param {CyPhyLight.FCO} parent Instance where the new CyPhyLightModelicaLanguage should be created.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.CyPhyLightModelicaLanguage.Type});
        return new CyPhyLight.CyPhyLightModelicaLanguage(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="CyPhyLightModelicaLanguage create child objects">

    /**
    * Creates a new FCO inside this CyPhyLightModelicaLanguage instance.
    * @returns {CyPhyLight.FCO} The newly created FCO.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.prototype.createFCO = function () {
        return CyPhyLight.FCO.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.CyPhyLightModelicaLanguage.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="CyPhyLightModelicaLanguage attributes">
    /**
    * Initializes a new instance of CyPhyLightModelicaLanguage.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of CyPhyLightModelicaLanguage.
    * @param {object} nodeObj The wrapped WebGME object of CyPhyLightModelicaLanguage.
    * @constructor
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the CyPhyLightModelicaLanguage instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the CyPhyLightModelicaLanguage instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="CyPhyLightModelicaLanguage registry entries">
    /**
    * Initializes a new instance of CyPhyLightModelicaLanguage.Registry
    *
    * @class
    * @classdesc This class wraps the registry of CyPhyLightModelicaLanguage.
    * @param {object} nodeObj The wrapped WebGME object of CyPhyLightModelicaLanguage.
    * @constructor
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the CyPhyLightModelicaLanguage instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the CyPhyLightModelicaLanguage instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the CyPhyLightModelicaLanguage instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the CyPhyLightModelicaLanguage instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the CyPhyLightModelicaLanguage instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the CyPhyLightModelicaLanguage instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the CyPhyLightModelicaLanguage instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the CyPhyLightModelicaLanguage instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the CyPhyLightModelicaLanguage instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the CyPhyLightModelicaLanguage instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the CyPhyLightModelicaLanguage instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the CyPhyLightModelicaLanguage instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the CyPhyLightModelicaLanguage instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the CyPhyLightModelicaLanguage instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.CyPhyLightModelicaLanguage.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="CyPhyProject">

    /**
    * Initializes a new instance of CyPhyProject.
    *
    * @class
    * @augments {CyPhyLight.Folder}
    * @classdesc This class represents a(n) CyPhyProject.
    * @property {CyPhyLight.CyPhyProject.Attributes} attributes The attributes of the CyPhyProject.
    * @property {CyPhyLight.CyPhyProject.Registry} registry The registry of the CyPhyProject.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.CyPhyProject = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.Folder.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.CyPhyProject.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.CyPhyProject.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.Folder.prototype could be undefined at this point.
    // CyPhyLight.CyPhyProject.prototype = Object.create(CyPhyLight.Folder.prototype);
    // CyPhyLight.CyPhyProject.prototype.constructor = CyPhyLight.CyPhyProject;
    // 

    //<editor-fold desc="CyPhyProject static fields, properties and functions">

    /**
    * WebGME node object that represents CyPhyProject type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.CyPhyProject.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of CyPhyProject.
    * @type {string}
    * @static
    */
    CyPhyLight.CyPhyProject.ID = "/-2/-56";

    /**
    * WebGME node object's meta type GUID of CyPhyProject.
    * @type {string}
    * @static
    */
    CyPhyLight.CyPhyProject.GUID = "40f2b898-89d2-cf58-a7ac-d59d4a90296a";

    /**
    * WebGME node object's meta type hash value of CyPhyProject.
    * @type {string}
    * @static
    */
    CyPhyLight.CyPhyProject.Hash = "#69a97ee4e0af1832caf1cc1b91fd6665bbef39b9";

        
    /**
    * Creates a new CyPhyProject inside given parent.
    * @returns {CyPhyLight.CyPhyProject} The newly created CyPhyProject.
    * @param {CyPhyLight.FCO} parent Instance where the new CyPhyProject should be created.
    * @public
    */
    CyPhyLight.CyPhyProject.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.CyPhyProject.Type});
        return new CyPhyLight.CyPhyProject(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="CyPhyProject create child objects">

    /**
    * Creates a new ComponentAssemblies inside this CyPhyProject instance.
    * @returns {CyPhyLight.ComponentAssemblies} The newly created ComponentAssemblies.
    * @public
    */
    CyPhyLight.CyPhyProject.prototype.createComponentAssemblies = function () {
        return CyPhyLight.ComponentAssemblies.createObj(this);
    };


    /**
    * Creates a new TestComponents inside this CyPhyProject instance.
    * @returns {CyPhyLight.TestComponents} The newly created TestComponents.
    * @public
    */
    CyPhyLight.CyPhyProject.prototype.createTestComponents = function () {
        return CyPhyLight.TestComponents.createObj(this);
    };


    /**
    * Creates a new Components inside this CyPhyProject instance.
    * @returns {CyPhyLight.Components} The newly created Components.
    * @public
    */
    CyPhyLight.CyPhyProject.prototype.createComponents = function () {
        return CyPhyLight.Components.createObj(this);
    };


    /**
    * Creates a new Testing inside this CyPhyProject instance.
    * @returns {CyPhyLight.Testing} The newly created Testing.
    * @public
    */
    CyPhyLight.CyPhyProject.prototype.createTesting = function () {
        return CyPhyLight.Testing.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.CyPhyProject.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="CyPhyProject attributes">
    /**
    * Initializes a new instance of CyPhyProject.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of CyPhyProject.
    * @param {object} nodeObj The wrapped WebGME object of CyPhyProject.
    * @constructor
    */
    CyPhyLight.CyPhyProject.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the CyPhyProject instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.CyPhyProject.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the CyPhyProject instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.CyPhyProject.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="CyPhyProject registry entries">
    /**
    * Initializes a new instance of CyPhyProject.Registry
    *
    * @class
    * @classdesc This class wraps the registry of CyPhyProject.
    * @param {object} nodeObj The wrapped WebGME object of CyPhyProject.
    * @constructor
    */
    CyPhyLight.CyPhyProject.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the CyPhyProject instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the CyPhyProject instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the CyPhyProject instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the CyPhyProject instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the CyPhyProject instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the CyPhyProject instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the CyPhyProject instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the CyPhyProject instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the CyPhyProject instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the CyPhyProject instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the CyPhyProject instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the CyPhyProject instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the CyPhyProject instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the CyPhyProject instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.CyPhyProject.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="DesignEntity">

    /**
    * Initializes a new instance of DesignEntity.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) DesignEntity.
    * @property {CyPhyLight.DesignEntity.Attributes} attributes The attributes of the DesignEntity.
    * @property {CyPhyLight.DesignEntity.Registry} registry The registry of the DesignEntity.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.DesignEntity = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.DesignEntity.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.DesignEntity.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.DesignEntity.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.DesignEntity.prototype.constructor = CyPhyLight.DesignEntity;
    // 

    //<editor-fold desc="DesignEntity static fields, properties and functions">

    /**
    * WebGME node object that represents DesignEntity type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.DesignEntity.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of DesignEntity.
    * @type {string}
    * @static
    */
    CyPhyLight.DesignEntity.ID = "/-2/-6";

    /**
    * WebGME node object's meta type GUID of DesignEntity.
    * @type {string}
    * @static
    */
    CyPhyLight.DesignEntity.GUID = "194fda2d-f416-444b-f9df-0c9eb057ec0f";

    /**
    * WebGME node object's meta type hash value of DesignEntity.
    * @type {string}
    * @static
    */
    CyPhyLight.DesignEntity.Hash = "#93d4dfa09ea9a9d8f211d4d108e7038d74762ac2";

        
    /**
    * Creates a new DesignEntity inside given parent.
    * @returns {CyPhyLight.DesignEntity} The newly created DesignEntity.
    * @param {CyPhyLight.FCO} parent Instance where the new DesignEntity should be created.
    * @public
    */
    CyPhyLight.DesignEntity.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.DesignEntity.Type});
        return new CyPhyLight.DesignEntity(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="DesignEntity create child objects">

    /**
    * Creates a new Connector inside this DesignEntity instance.
    * @returns {CyPhyLight.Connector} The newly created Connector.
    * @public
    */
    CyPhyLight.DesignEntity.prototype.createConnector = function () {
        return CyPhyLight.Connector.createObj(this);
    };


    /**
    * Creates a new Connection inside this DesignEntity instance.
    * @returns {CyPhyLight.Connection} The newly created Connection.
    * @public
    */
    CyPhyLight.DesignEntity.prototype.createConnection = function () {
        return CyPhyLight.Connection.createObj(this);
    };


    /**
    * Creates a new Property inside this DesignEntity instance.
    * @returns {CyPhyLight.Property} The newly created Property.
    * @public
    */
    CyPhyLight.DesignEntity.prototype.createProperty = function () {
        return CyPhyLight.Property.createObj(this);
    };


    /**
    * Creates a new Parameter inside this DesignEntity instance.
    * @returns {CyPhyLight.Parameter} The newly created Parameter.
    * @public
    */
    CyPhyLight.DesignEntity.prototype.createParameter = function () {
        return CyPhyLight.Parameter.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.DesignEntity.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="DesignEntity attributes">
    /**
    * Initializes a new instance of DesignEntity.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of DesignEntity.
    * @param {object} nodeObj The wrapped WebGME object of DesignEntity.
    * @constructor
    */
    CyPhyLight.DesignEntity.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the DesignEntity instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.DesignEntity.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the DesignEntity instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.DesignEntity.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="DesignEntity registry entries">
    /**
    * Initializes a new instance of DesignEntity.Registry
    *
    * @class
    * @classdesc This class wraps the registry of DesignEntity.
    * @param {object} nodeObj The wrapped WebGME object of DesignEntity.
    * @constructor
    */
    CyPhyLight.DesignEntity.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the DesignEntity instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the DesignEntity instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the DesignEntity instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the DesignEntity instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the DesignEntity instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the DesignEntity instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the DesignEntity instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the DesignEntity instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the DesignEntity instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the DesignEntity instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the DesignEntity instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the DesignEntity instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the DesignEntity instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the DesignEntity instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.DesignEntity.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="Environment">

    /**
    * Initializes a new instance of Environment.
    *
    * @class
    * @augments {CyPhyLight.ModelicaModelType}
    * @classdesc This class represents a(n) Environment.
    * @property {CyPhyLight.Environment.Attributes} attributes The attributes of the Environment.
    * @property {CyPhyLight.Environment.Registry} registry The registry of the Environment.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.Environment = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.ModelicaModelType.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.Environment.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.Environment.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.ModelicaModelType.prototype could be undefined at this point.
    // CyPhyLight.Environment.prototype = Object.create(CyPhyLight.ModelicaModelType.prototype);
    // CyPhyLight.Environment.prototype.constructor = CyPhyLight.Environment;
    // 

    //<editor-fold desc="Environment static fields, properties and functions">

    /**
    * WebGME node object that represents Environment type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.Environment.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of Environment.
    * @type {string}
    * @static
    */
    CyPhyLight.Environment.ID = "/-2/-26";

    /**
    * WebGME node object's meta type GUID of Environment.
    * @type {string}
    * @static
    */
    CyPhyLight.Environment.GUID = "ea7f81e6-723e-fda3-8c83-d68e2ba60f88";

    /**
    * WebGME node object's meta type hash value of Environment.
    * @type {string}
    * @static
    */
    CyPhyLight.Environment.Hash = "#9d21f828ec57bb9d41698a7dc48c7674978a3def";

        
    /**
    * Creates a new Environment inside given parent.
    * @returns {CyPhyLight.Environment} The newly created Environment.
    * @param {CyPhyLight.FCO} parent Instance where the new Environment should be created.
    * @public
    */
    CyPhyLight.Environment.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Environment.Type});
        return new CyPhyLight.Environment(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="Environment create child objects">

    /**
    * Creates a new ModelicaParameter inside this Environment instance.
    * @returns {CyPhyLight.ModelicaParameter} The newly created ModelicaParameter.
    * @public
    */
    CyPhyLight.Environment.prototype.createModelicaParameter = function () {
        return CyPhyLight.ModelicaParameter.createObj(this);
    };


    /**
    * Creates a new ModelicaConnector inside this Environment instance.
    * @returns {CyPhyLight.ModelicaConnector} The newly created ModelicaConnector.
    * @public
    */
    CyPhyLight.Environment.prototype.createModelicaConnector = function () {
        return CyPhyLight.ModelicaConnector.createObj(this);
    };


    /**
    * Creates a new ModelicaParameterRedeclare inside this Environment instance.
    * @returns {CyPhyLight.ModelicaParameterRedeclare} The newly created ModelicaParameterRedeclare.
    * @public
    */
    CyPhyLight.Environment.prototype.createModelicaParameterRedeclare = function () {
        return CyPhyLight.ModelicaParameterRedeclare.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.Environment.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="Environment attributes">
    /**
    * Initializes a new instance of Environment.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of Environment.
    * @param {object} nodeObj The wrapped WebGME object of Environment.
    * @constructor
    */
    CyPhyLight.Environment.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute Class of the Environment instance.
    * @returns {string|object} Currently set Class.
    * @public
    */
    CyPhyLight.Environment.Attributes.prototype.getClass = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Class');
    };

    /**
    * Sets the attribute Class of the Environment instance.
    * @param {string|object} value New Class.
    * @public
    */
    CyPhyLight.Environment.Attributes.prototype.setClass = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Class', value);
    };



    /**
    * Gets the attribute name of the Environment instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.Environment.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the Environment instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.Environment.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="Environment registry entries">
    /**
    * Initializes a new instance of Environment.Registry
    *
    * @class
    * @classdesc This class wraps the registry of Environment.
    * @param {object} nodeObj The wrapped WebGME object of Environment.
    * @constructor
    */
    CyPhyLight.Environment.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the Environment instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the Environment instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the Environment instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the Environment instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the Environment instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the Environment instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the Environment instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the Environment instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the Environment instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the Environment instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the Environment instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the Environment instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the Environment instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the Environment instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the Environment instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the Environment instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.Environment.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="FCO">

    /**
    * Initializes a new instance of FCO.
    *
    * @class
    
    * @classdesc This class represents a(n) FCO.
    * @property {CyPhyLight.FCO.Attributes} attributes The attributes of the FCO.
    * @property {CyPhyLight.FCO.Registry} registry The registry of the FCO.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.FCO = function (nodeObj) {
        
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.FCO.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.FCO.Registry(this._nodeObj);
    };
    

    //<editor-fold desc="FCO static fields, properties and functions">

    /**
    * WebGME node object that represents FCO type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.FCO.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of FCO.
    * @type {string}
    * @static
    */
    CyPhyLight.FCO.ID = "/2083984396";

    /**
    * WebGME node object's meta type GUID of FCO.
    * @type {string}
    * @static
    */
    CyPhyLight.FCO.GUID = "ac68f222-56bc-c3ee-69d4-40f79fae657a";

    /**
    * WebGME node object's meta type hash value of FCO.
    * @type {string}
    * @static
    */
    CyPhyLight.FCO.Hash = "#ca0f9f0051878f64c0a710a35408de184badefd6";

        
    /**
    * Creates a new FCO inside given parent.
    * @returns {CyPhyLight.FCO} The newly created FCO.
    * @param {CyPhyLight.FCO} parent Instance where the new FCO should be created.
    * @public
    */
    CyPhyLight.FCO.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.FCO.Type});
        return new CyPhyLight.FCO(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="FCO create child objects">

    //</editor-fold>

    CyPhyLight.FCO.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="FCO attributes">
    /**
    * Initializes a new instance of FCO.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of FCO.
    * @param {object} nodeObj The wrapped WebGME object of FCO.
    * @constructor
    */
    CyPhyLight.FCO.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the FCO instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.FCO.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the FCO instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.FCO.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="FCO registry entries">
    /**
    * Initializes a new instance of FCO.Registry
    *
    * @class
    * @classdesc This class wraps the registry of FCO.
    * @param {object} nodeObj The wrapped WebGME object of FCO.
    * @constructor
    */
    CyPhyLight.FCO.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the FCO instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the FCO instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the FCO instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the FCO instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the FCO instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the FCO instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the FCO instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the FCO instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the FCO instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the FCO instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the FCO instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the FCO instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the FCO instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the FCO instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.FCO.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="Folder">

    /**
    * Initializes a new instance of Folder.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) Folder.
    * @property {CyPhyLight.Folder.Attributes} attributes The attributes of the Folder.
    * @property {CyPhyLight.Folder.Registry} registry The registry of the Folder.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.Folder = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.Folder.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.Folder.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.Folder.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.Folder.prototype.constructor = CyPhyLight.Folder;
    // 

    //<editor-fold desc="Folder static fields, properties and functions">

    /**
    * WebGME node object that represents Folder type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.Folder.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of Folder.
    * @type {string}
    * @static
    */
    CyPhyLight.Folder.ID = "/-2/-3";

    /**
    * WebGME node object's meta type GUID of Folder.
    * @type {string}
    * @static
    */
    CyPhyLight.Folder.GUID = "41ce81a6-0a54-de1c-ec1f-089ee2a55c7a";

    /**
    * WebGME node object's meta type hash value of Folder.
    * @type {string}
    * @static
    */
    CyPhyLight.Folder.Hash = "#70169a9a3372688100a9ef3ae9c0e56b7708e485";

        
    /**
    * Creates a new Folder inside given parent.
    * @returns {CyPhyLight.Folder} The newly created Folder.
    * @param {CyPhyLight.FCO} parent Instance where the new Folder should be created.
    * @public
    */
    CyPhyLight.Folder.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Folder.Type});
        return new CyPhyLight.Folder(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="Folder create child objects">

    //</editor-fold>

    CyPhyLight.Folder.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="Folder attributes">
    /**
    * Initializes a new instance of Folder.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of Folder.
    * @param {object} nodeObj The wrapped WebGME object of Folder.
    * @constructor
    */
    CyPhyLight.Folder.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the Folder instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.Folder.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the Folder instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.Folder.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="Folder registry entries">
    /**
    * Initializes a new instance of Folder.Registry
    *
    * @class
    * @classdesc This class wraps the registry of Folder.
    * @param {object} nodeObj The wrapped WebGME object of Folder.
    * @constructor
    */
    CyPhyLight.Folder.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the Folder instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the Folder instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the Folder instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the Folder instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the Folder instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the Folder instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the Folder instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the Folder instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the Folder instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the Folder instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the Folder instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the Folder instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the Folder instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the Folder instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.Folder.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="Metric">

    /**
    * Initializes a new instance of Metric.
    *
    * @class
    * @augments {CyPhyLight.ValueFlowTarget}
    * @classdesc This class represents a(n) Metric.
    * @property {CyPhyLight.Metric.Attributes} attributes The attributes of the Metric.
    * @property {CyPhyLight.Metric.Registry} registry The registry of the Metric.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.Metric = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.ValueFlowTarget.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.Metric.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.Metric.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.ValueFlowTarget.prototype could be undefined at this point.
    // CyPhyLight.Metric.prototype = Object.create(CyPhyLight.ValueFlowTarget.prototype);
    // CyPhyLight.Metric.prototype.constructor = CyPhyLight.Metric;
    // 

    //<editor-fold desc="Metric static fields, properties and functions">

    /**
    * WebGME node object that represents Metric type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.Metric.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of Metric.
    * @type {string}
    * @static
    */
    CyPhyLight.Metric.ID = "/-2/-36";

    /**
    * WebGME node object's meta type GUID of Metric.
    * @type {string}
    * @static
    */
    CyPhyLight.Metric.GUID = "75bf083e-a164-4ef7-98f1-3c5629f80ff6";

    /**
    * WebGME node object's meta type hash value of Metric.
    * @type {string}
    * @static
    */
    CyPhyLight.Metric.Hash = "#603be4b61ddcf0110f66d929146117679521c7db";

        
    /**
    * Creates a new Metric inside given parent.
    * @returns {CyPhyLight.Metric} The newly created Metric.
    * @param {CyPhyLight.FCO} parent Instance where the new Metric should be created.
    * @public
    */
    CyPhyLight.Metric.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Metric.Type});
        return new CyPhyLight.Metric(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="Metric create child objects">

    //</editor-fold>

    CyPhyLight.Metric.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="Metric attributes">
    /**
    * Initializes a new instance of Metric.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of Metric.
    * @param {object} nodeObj The wrapped WebGME object of Metric.
    * @constructor
    */
    CyPhyLight.Metric.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute Value of the Metric instance.
    * @returns {string|object} Currently set Value.
    * @public
    */
    CyPhyLight.Metric.Attributes.prototype.getValue = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Value');
    };

    /**
    * Sets the attribute Value of the Metric instance.
    * @param {string|object} value New Value.
    * @public
    */
    CyPhyLight.Metric.Attributes.prototype.setValue = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Value', value);
    };



    /**
    * Gets the attribute name of the Metric instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.Metric.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the Metric instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.Metric.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="Metric registry entries">
    /**
    * Initializes a new instance of Metric.Registry
    *
    * @class
    * @classdesc This class wraps the registry of Metric.
    * @param {object} nodeObj The wrapped WebGME object of Metric.
    * @constructor
    */
    CyPhyLight.Metric.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the Metric instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the Metric instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the Metric instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the Metric instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the Metric instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the Metric instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the Metric instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the Metric instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the Metric instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the Metric instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the Metric instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the Metric instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the Metric instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the Metric instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the Metric instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the Metric instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.Metric.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ModelicaConnector">

    /**
    * Initializes a new instance of ModelicaConnector.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) ModelicaConnector.
    * @property {CyPhyLight.ModelicaConnector.Attributes} attributes The attributes of the ModelicaConnector.
    * @property {CyPhyLight.ModelicaConnector.Registry} registry The registry of the ModelicaConnector.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ModelicaConnector = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ModelicaConnector.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ModelicaConnector.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.ModelicaConnector.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.ModelicaConnector.prototype.constructor = CyPhyLight.ModelicaConnector;
    // 

    //<editor-fold desc="ModelicaConnector static fields, properties and functions">

    /**
    * WebGME node object that represents ModelicaConnector type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ModelicaConnector.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ModelicaConnector.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaConnector.ID = "/-2/-28";

    /**
    * WebGME node object's meta type GUID of ModelicaConnector.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaConnector.GUID = "bf534a54-82dd-b285-5027-6da5e3f35912";

    /**
    * WebGME node object's meta type hash value of ModelicaConnector.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaConnector.Hash = "#eb859968ec2c2e947b83e291ba59f532563f1fa2";

        
    /**
    * Creates a new ModelicaConnector inside given parent.
    * @returns {CyPhyLight.ModelicaConnector} The newly created ModelicaConnector.
    * @param {CyPhyLight.FCO} parent Instance where the new ModelicaConnector should be created.
    * @public
    */
    CyPhyLight.ModelicaConnector.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ModelicaConnector.Type});
        return new CyPhyLight.ModelicaConnector(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ModelicaConnector create child objects">

    /**
    * Creates a new ModelicaParameter inside this ModelicaConnector instance.
    * @returns {CyPhyLight.ModelicaParameter} The newly created ModelicaParameter.
    * @public
    */
    CyPhyLight.ModelicaConnector.prototype.createModelicaParameter = function () {
        return CyPhyLight.ModelicaParameter.createObj(this);
    };


    /**
    * Creates a new ModelicaParameterRedeclare inside this ModelicaConnector instance.
    * @returns {CyPhyLight.ModelicaParameterRedeclare} The newly created ModelicaParameterRedeclare.
    * @public
    */
    CyPhyLight.ModelicaConnector.prototype.createModelicaParameterRedeclare = function () {
        return CyPhyLight.ModelicaParameterRedeclare.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.ModelicaConnector.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ModelicaConnector attributes">
    /**
    * Initializes a new instance of ModelicaConnector.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ModelicaConnector.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaConnector.
    * @constructor
    */
    CyPhyLight.ModelicaConnector.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute Class of the ModelicaConnector instance.
    * @returns {string|object} Currently set Class.
    * @public
    */
    CyPhyLight.ModelicaConnector.Attributes.prototype.getClass = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Class');
    };

    /**
    * Sets the attribute Class of the ModelicaConnector instance.
    * @param {string|object} value New Class.
    * @public
    */
    CyPhyLight.ModelicaConnector.Attributes.prototype.setClass = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Class', value);
    };



    /**
    * Gets the attribute name of the ModelicaConnector instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ModelicaConnector.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ModelicaConnector instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ModelicaConnector.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ModelicaConnector registry entries">
    /**
    * Initializes a new instance of ModelicaConnector.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ModelicaConnector.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaConnector.
    * @constructor
    */
    CyPhyLight.ModelicaConnector.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ModelicaConnector instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ModelicaConnector instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ModelicaConnector instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ModelicaConnector instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ModelicaConnector instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ModelicaConnector instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the ModelicaConnector instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ModelicaConnector instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ModelicaConnector instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ModelicaConnector instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ModelicaConnector instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ModelicaConnector instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the ModelicaConnector instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ModelicaConnector instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ModelicaConnector.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ModelicaConnectorComposition">

    /**
    * Initializes a new instance of ModelicaConnectorComposition.
    *
    * @class
    * @augments {CyPhyLight.Connection}
    * @classdesc This class represents a(n) ModelicaConnectorComposition.
    * @property {CyPhyLight.ModelicaConnectorComposition.Attributes} attributes The attributes of the ModelicaConnectorComposition.
    * @property {CyPhyLight.ModelicaConnectorComposition.Registry} registry The registry of the ModelicaConnectorComposition.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ModelicaConnectorComposition = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.Connection.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ModelicaConnectorComposition.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ModelicaConnectorComposition.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.Connection.prototype could be undefined at this point.
    // CyPhyLight.ModelicaConnectorComposition.prototype = Object.create(CyPhyLight.Connection.prototype);
    // CyPhyLight.ModelicaConnectorComposition.prototype.constructor = CyPhyLight.ModelicaConnectorComposition;
    // 

    //<editor-fold desc="ModelicaConnectorComposition static fields, properties and functions">

    /**
    * WebGME node object that represents ModelicaConnectorComposition type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ModelicaConnectorComposition.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ModelicaConnectorComposition.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaConnectorComposition.ID = "/-2/-52";

    /**
    * WebGME node object's meta type GUID of ModelicaConnectorComposition.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaConnectorComposition.GUID = "4455d935-6d16-37b5-557d-addeb4ae55d8";

    /**
    * WebGME node object's meta type hash value of ModelicaConnectorComposition.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaConnectorComposition.Hash = "#3ea71b9424fe3f1c7724c1aec97c95893b31767c";

        
    CyPhyLight.ModelicaConnectorComposition.createObj = function (parent, src, dst) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ModelicaConnectorComposition.Type});
        CyPhyLight._core.setPointer(nodeObj, 'src', src.getNodeObj());
        CyPhyLight._core.setPointer(nodeObj, 'dst', dst.getNodeObj());
        return new CyPhyLight.ModelicaConnectorComposition(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ModelicaConnectorComposition create child objects">

    //</editor-fold>

    CyPhyLight.ModelicaConnectorComposition.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ModelicaConnectorComposition attributes">
    /**
    * Initializes a new instance of ModelicaConnectorComposition.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ModelicaConnectorComposition.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaConnectorComposition.
    * @constructor
    */
    CyPhyLight.ModelicaConnectorComposition.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the ModelicaConnectorComposition instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ModelicaConnectorComposition instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ModelicaConnectorComposition registry entries">
    /**
    * Initializes a new instance of ModelicaConnectorComposition.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ModelicaConnectorComposition.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaConnectorComposition.
    * @constructor
    */
    CyPhyLight.ModelicaConnectorComposition.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ModelicaConnectorComposition instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ModelicaConnectorComposition instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ModelicaConnectorComposition instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ModelicaConnectorComposition instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ModelicaConnectorComposition instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ModelicaConnectorComposition instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the ModelicaConnectorComposition instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ModelicaConnectorComposition instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ModelicaConnectorComposition instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ModelicaConnectorComposition instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ModelicaConnectorComposition instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ModelicaConnectorComposition instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the ModelicaConnectorComposition instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ModelicaConnectorComposition instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ModelicaConnectorComposition.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ModelicaModel">

    /**
    * Initializes a new instance of ModelicaModel.
    *
    * @class
    * @augments {CyPhyLight.ModelicaModelType}
    * @classdesc This class represents a(n) ModelicaModel.
    * @property {CyPhyLight.ModelicaModel.Attributes} attributes The attributes of the ModelicaModel.
    * @property {CyPhyLight.ModelicaModel.Registry} registry The registry of the ModelicaModel.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ModelicaModel = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.ModelicaModelType.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ModelicaModel.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ModelicaModel.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.ModelicaModelType.prototype could be undefined at this point.
    // CyPhyLight.ModelicaModel.prototype = Object.create(CyPhyLight.ModelicaModelType.prototype);
    // CyPhyLight.ModelicaModel.prototype.constructor = CyPhyLight.ModelicaModel;
    // 

    //<editor-fold desc="ModelicaModel static fields, properties and functions">

    /**
    * WebGME node object that represents ModelicaModel type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ModelicaModel.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ModelicaModel.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaModel.ID = "/-2/-23";

    /**
    * WebGME node object's meta type GUID of ModelicaModel.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaModel.GUID = "e77f81e6-723e-fda3-8c83-d68e2ba60f88";

    /**
    * WebGME node object's meta type hash value of ModelicaModel.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaModel.Hash = "#084f6d8001cc48e131436da9b4fbb31c8c9407ef";

        
    /**
    * Creates a new ModelicaModel inside given parent.
    * @returns {CyPhyLight.ModelicaModel} The newly created ModelicaModel.
    * @param {CyPhyLight.FCO} parent Instance where the new ModelicaModel should be created.
    * @public
    */
    CyPhyLight.ModelicaModel.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ModelicaModel.Type});
        return new CyPhyLight.ModelicaModel(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ModelicaModel create child objects">

    /**
    * Creates a new ModelicaParameter inside this ModelicaModel instance.
    * @returns {CyPhyLight.ModelicaParameter} The newly created ModelicaParameter.
    * @public
    */
    CyPhyLight.ModelicaModel.prototype.createModelicaParameter = function () {
        return CyPhyLight.ModelicaParameter.createObj(this);
    };


    /**
    * Creates a new ModelicaConnector inside this ModelicaModel instance.
    * @returns {CyPhyLight.ModelicaConnector} The newly created ModelicaConnector.
    * @public
    */
    CyPhyLight.ModelicaModel.prototype.createModelicaConnector = function () {
        return CyPhyLight.ModelicaConnector.createObj(this);
    };


    /**
    * Creates a new ModelicaParameterRedeclare inside this ModelicaModel instance.
    * @returns {CyPhyLight.ModelicaParameterRedeclare} The newly created ModelicaParameterRedeclare.
    * @public
    */
    CyPhyLight.ModelicaModel.prototype.createModelicaParameterRedeclare = function () {
        return CyPhyLight.ModelicaParameterRedeclare.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.ModelicaModel.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ModelicaModel attributes">
    /**
    * Initializes a new instance of ModelicaModel.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ModelicaModel.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaModel.
    * @constructor
    */
    CyPhyLight.ModelicaModel.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute Class of the ModelicaModel instance.
    * @returns {string|object} Currently set Class.
    * @public
    */
    CyPhyLight.ModelicaModel.Attributes.prototype.getClass = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Class');
    };

    /**
    * Sets the attribute Class of the ModelicaModel instance.
    * @param {string|object} value New Class.
    * @public
    */
    CyPhyLight.ModelicaModel.Attributes.prototype.setClass = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Class', value);
    };



    /**
    * Gets the attribute name of the ModelicaModel instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ModelicaModel.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ModelicaModel instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ModelicaModel.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ModelicaModel registry entries">
    /**
    * Initializes a new instance of ModelicaModel.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ModelicaModel.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaModel.
    * @constructor
    */
    CyPhyLight.ModelicaModel.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ModelicaModel instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ModelicaModel instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ModelicaModel instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ModelicaModel instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ModelicaModel instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ModelicaModel instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the ModelicaModel instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the ModelicaModel instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the ModelicaModel instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ModelicaModel instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ModelicaModel instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ModelicaModel instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ModelicaModel instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ModelicaModel instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the ModelicaModel instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ModelicaModel instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ModelicaModel.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ModelicaModelType">

    /**
    * Initializes a new instance of ModelicaModelType.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) ModelicaModelType.
    * @property {CyPhyLight.ModelicaModelType.Attributes} attributes The attributes of the ModelicaModelType.
    * @property {CyPhyLight.ModelicaModelType.Registry} registry The registry of the ModelicaModelType.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ModelicaModelType = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ModelicaModelType.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ModelicaModelType.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.ModelicaModelType.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.ModelicaModelType.prototype.constructor = CyPhyLight.ModelicaModelType;
    // 

    //<editor-fold desc="ModelicaModelType static fields, properties and functions">

    /**
    * WebGME node object that represents ModelicaModelType type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ModelicaModelType.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ModelicaModelType.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaModelType.ID = "/-2/-22";

    /**
    * WebGME node object's meta type GUID of ModelicaModelType.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaModelType.GUID = "f9182f42-21c5-ff29-27ea-8de3e34292b2";

    /**
    * WebGME node object's meta type hash value of ModelicaModelType.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaModelType.Hash = "#4f63e50528096481cf7950638d8b56468582a6e1";

        
    /**
    * Creates a new ModelicaModelType inside given parent.
    * @returns {CyPhyLight.ModelicaModelType} The newly created ModelicaModelType.
    * @param {CyPhyLight.FCO} parent Instance where the new ModelicaModelType should be created.
    * @public
    */
    CyPhyLight.ModelicaModelType.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ModelicaModelType.Type});
        return new CyPhyLight.ModelicaModelType(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ModelicaModelType create child objects">

    /**
    * Creates a new ModelicaParameter inside this ModelicaModelType instance.
    * @returns {CyPhyLight.ModelicaParameter} The newly created ModelicaParameter.
    * @public
    */
    CyPhyLight.ModelicaModelType.prototype.createModelicaParameter = function () {
        return CyPhyLight.ModelicaParameter.createObj(this);
    };


    /**
    * Creates a new ModelicaConnector inside this ModelicaModelType instance.
    * @returns {CyPhyLight.ModelicaConnector} The newly created ModelicaConnector.
    * @public
    */
    CyPhyLight.ModelicaModelType.prototype.createModelicaConnector = function () {
        return CyPhyLight.ModelicaConnector.createObj(this);
    };


    /**
    * Creates a new ModelicaParameterRedeclare inside this ModelicaModelType instance.
    * @returns {CyPhyLight.ModelicaParameterRedeclare} The newly created ModelicaParameterRedeclare.
    * @public
    */
    CyPhyLight.ModelicaModelType.prototype.createModelicaParameterRedeclare = function () {
        return CyPhyLight.ModelicaParameterRedeclare.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.ModelicaModelType.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ModelicaModelType attributes">
    /**
    * Initializes a new instance of ModelicaModelType.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ModelicaModelType.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaModelType.
    * @constructor
    */
    CyPhyLight.ModelicaModelType.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute Class of the ModelicaModelType instance.
    * @returns {string|object} Currently set Class.
    * @public
    */
    CyPhyLight.ModelicaModelType.Attributes.prototype.getClass = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Class');
    };

    /**
    * Sets the attribute Class of the ModelicaModelType instance.
    * @param {string|object} value New Class.
    * @public
    */
    CyPhyLight.ModelicaModelType.Attributes.prototype.setClass = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Class', value);
    };



    /**
    * Gets the attribute name of the ModelicaModelType instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ModelicaModelType.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ModelicaModelType instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ModelicaModelType.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ModelicaModelType registry entries">
    /**
    * Initializes a new instance of ModelicaModelType.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ModelicaModelType.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaModelType.
    * @constructor
    */
    CyPhyLight.ModelicaModelType.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ModelicaModelType instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ModelicaModelType instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ModelicaModelType instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ModelicaModelType instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ModelicaModelType instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ModelicaModelType instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the ModelicaModelType instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the ModelicaModelType instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the ModelicaModelType instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ModelicaModelType instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ModelicaModelType instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ModelicaModelType instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ModelicaModelType instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ModelicaModelType instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the ModelicaModelType instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ModelicaModelType instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ModelicaModelType.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ModelicaParameter">

    /**
    * Initializes a new instance of ModelicaParameter.
    *
    * @class
    * @augments {CyPhyLight.ValueFlowTarget}
    * @classdesc This class represents a(n) ModelicaParameter.
    * @property {CyPhyLight.ModelicaParameter.Attributes} attributes The attributes of the ModelicaParameter.
    * @property {CyPhyLight.ModelicaParameter.Registry} registry The registry of the ModelicaParameter.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ModelicaParameter = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.ValueFlowTarget.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ModelicaParameter.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ModelicaParameter.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.ValueFlowTarget.prototype could be undefined at this point.
    // CyPhyLight.ModelicaParameter.prototype = Object.create(CyPhyLight.ValueFlowTarget.prototype);
    // CyPhyLight.ModelicaParameter.prototype.constructor = CyPhyLight.ModelicaParameter;
    // 

    //<editor-fold desc="ModelicaParameter static fields, properties and functions">

    /**
    * WebGME node object that represents ModelicaParameter type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ModelicaParameter.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ModelicaParameter.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaParameter.ID = "/-2/-39";

    /**
    * WebGME node object's meta type GUID of ModelicaParameter.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaParameter.GUID = "76bf083e-a164-4ef7-98f1-3c5629f80ff6";

    /**
    * WebGME node object's meta type hash value of ModelicaParameter.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaParameter.Hash = "#b07156212a335d7ba00d254bb0ff3853706790e9";

        
    /**
    * Creates a new ModelicaParameter inside given parent.
    * @returns {CyPhyLight.ModelicaParameter} The newly created ModelicaParameter.
    * @param {CyPhyLight.FCO} parent Instance where the new ModelicaParameter should be created.
    * @public
    */
    CyPhyLight.ModelicaParameter.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ModelicaParameter.Type});
        return new CyPhyLight.ModelicaParameter(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ModelicaParameter create child objects">

    //</editor-fold>

    CyPhyLight.ModelicaParameter.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ModelicaParameter attributes">
    /**
    * Initializes a new instance of ModelicaParameter.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ModelicaParameter.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaParameter.
    * @constructor
    */
    CyPhyLight.ModelicaParameter.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute Value of the ModelicaParameter instance.
    * @returns {string|object} Currently set Value.
    * @public
    */
    CyPhyLight.ModelicaParameter.Attributes.prototype.getValue = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Value');
    };

    /**
    * Sets the attribute Value of the ModelicaParameter instance.
    * @param {string|object} value New Value.
    * @public
    */
    CyPhyLight.ModelicaParameter.Attributes.prototype.setValue = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Value', value);
    };



    /**
    * Gets the attribute name of the ModelicaParameter instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ModelicaParameter.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ModelicaParameter instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ModelicaParameter.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ModelicaParameter registry entries">
    /**
    * Initializes a new instance of ModelicaParameter.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ModelicaParameter.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaParameter.
    * @constructor
    */
    CyPhyLight.ModelicaParameter.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ModelicaParameter instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ModelicaParameter instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ModelicaParameter instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ModelicaParameter instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ModelicaParameter instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ModelicaParameter instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the ModelicaParameter instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the ModelicaParameter instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the ModelicaParameter instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ModelicaParameter instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ModelicaParameter instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ModelicaParameter instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ModelicaParameter instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ModelicaParameter instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the ModelicaParameter instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ModelicaParameter instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ModelicaParameter.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ModelicaParameterRedeclare">

    /**
    * Initializes a new instance of ModelicaParameterRedeclare.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) ModelicaParameterRedeclare.
    * @property {CyPhyLight.ModelicaParameterRedeclare.Attributes} attributes The attributes of the ModelicaParameterRedeclare.
    * @property {CyPhyLight.ModelicaParameterRedeclare.Registry} registry The registry of the ModelicaParameterRedeclare.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ModelicaParameterRedeclare = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ModelicaParameterRedeclare.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ModelicaParameterRedeclare.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.ModelicaParameterRedeclare.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.ModelicaParameterRedeclare.prototype.constructor = CyPhyLight.ModelicaParameterRedeclare;
    // 

    //<editor-fold desc="ModelicaParameterRedeclare static fields, properties and functions">

    /**
    * WebGME node object that represents ModelicaParameterRedeclare type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ModelicaParameterRedeclare.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ModelicaParameterRedeclare.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaParameterRedeclare.ID = "/-2/-53";

    /**
    * WebGME node object's meta type GUID of ModelicaParameterRedeclare.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaParameterRedeclare.GUID = "8fa5e761-e974-2ee5-eb18-342d9b14287f";

    /**
    * WebGME node object's meta type hash value of ModelicaParameterRedeclare.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaParameterRedeclare.Hash = "#4baae45ccc5655960a70924e700cbb767c8816d7";

        
    /**
    * Creates a new ModelicaParameterRedeclare inside given parent.
    * @returns {CyPhyLight.ModelicaParameterRedeclare} The newly created ModelicaParameterRedeclare.
    * @param {CyPhyLight.FCO} parent Instance where the new ModelicaParameterRedeclare should be created.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ModelicaParameterRedeclare.Type});
        return new CyPhyLight.ModelicaParameterRedeclare(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ModelicaParameterRedeclare create child objects">

    //</editor-fold>

    CyPhyLight.ModelicaParameterRedeclare.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ModelicaParameterRedeclare attributes">
    /**
    * Initializes a new instance of ModelicaParameterRedeclare.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ModelicaParameterRedeclare.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaParameterRedeclare.
    * @constructor
    */
    CyPhyLight.ModelicaParameterRedeclare.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the ModelicaParameterRedeclare instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ModelicaParameterRedeclare instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ModelicaParameterRedeclare registry entries">
    /**
    * Initializes a new instance of ModelicaParameterRedeclare.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ModelicaParameterRedeclare.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaParameterRedeclare.
    * @constructor
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ModelicaParameterRedeclare instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ModelicaParameterRedeclare instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ModelicaParameterRedeclare instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ModelicaParameterRedeclare instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ModelicaParameterRedeclare instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ModelicaParameterRedeclare instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the ModelicaParameterRedeclare instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ModelicaParameterRedeclare instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ModelicaParameterRedeclare instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ModelicaParameterRedeclare instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ModelicaParameterRedeclare instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ModelicaParameterRedeclare instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the ModelicaParameterRedeclare instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ModelicaParameterRedeclare instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ModelicaParameterRedeclare.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ModelicaTestBench">

    /**
    * Initializes a new instance of ModelicaTestBench.
    *
    * @class
    * @augments {CyPhyLight.TestBenchType}
    * @classdesc This class represents a(n) ModelicaTestBench.
    * @property {CyPhyLight.ModelicaTestBench.Attributes} attributes The attributes of the ModelicaTestBench.
    * @property {CyPhyLight.ModelicaTestBench.Registry} registry The registry of the ModelicaTestBench.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ModelicaTestBench = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.TestBenchType.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ModelicaTestBench.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ModelicaTestBench.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.TestBenchType.prototype could be undefined at this point.
    // CyPhyLight.ModelicaTestBench.prototype = Object.create(CyPhyLight.TestBenchType.prototype);
    // CyPhyLight.ModelicaTestBench.prototype.constructor = CyPhyLight.ModelicaTestBench;
    // 

    //<editor-fold desc="ModelicaTestBench static fields, properties and functions">

    /**
    * WebGME node object that represents ModelicaTestBench type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ModelicaTestBench.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ModelicaTestBench.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaTestBench.ID = "/-2/-18";

    /**
    * WebGME node object's meta type GUID of ModelicaTestBench.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaTestBench.GUID = "270c8e6e-5d29-cca7-3350-3b64177e11d2";

    /**
    * WebGME node object's meta type hash value of ModelicaTestBench.
    * @type {string}
    * @static
    */
    CyPhyLight.ModelicaTestBench.Hash = "#0a25d252e0833d9b2deccec6d4af90cfd5511a5e";

        
    /**
    * Creates a new ModelicaTestBench inside given parent.
    * @returns {CyPhyLight.ModelicaTestBench} The newly created ModelicaTestBench.
    * @param {CyPhyLight.FCO} parent Instance where the new ModelicaTestBench should be created.
    * @public
    */
    CyPhyLight.ModelicaTestBench.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ModelicaTestBench.Type});
        return new CyPhyLight.ModelicaTestBench(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ModelicaTestBench create child objects">

    /**
    * Creates a new TopLevelSystemUnderTest inside this ModelicaTestBench instance.
    * @returns {CyPhyLight.TopLevelSystemUnderTest} The newly created TopLevelSystemUnderTest.
    * @public
    */
    CyPhyLight.ModelicaTestBench.prototype.createTopLevelSystemUnderTest = function () {
        return CyPhyLight.TopLevelSystemUnderTest.createObj(this);
    };


    /**
    * Creates a new Metric inside this ModelicaTestBench instance.
    * @returns {CyPhyLight.Metric} The newly created Metric.
    * @public
    */
    CyPhyLight.ModelicaTestBench.prototype.createMetric = function () {
        return CyPhyLight.Metric.createObj(this);
    };


    /**
    * Creates a new TestComponent inside this ModelicaTestBench instance.
    * @returns {CyPhyLight.TestComponent} The newly created TestComponent.
    * @public
    */
    CyPhyLight.ModelicaTestBench.prototype.createTestComponent = function () {
        return CyPhyLight.TestComponent.createObj(this);
    };


    /**
    * Creates a new Connection inside this ModelicaTestBench instance.
    * @returns {CyPhyLight.Connection} The newly created Connection.
    * @public
    */
    CyPhyLight.ModelicaTestBench.prototype.createConnection = function () {
        return CyPhyLight.Connection.createObj(this);
    };


    /**
    * Creates a new PostProcessing inside this ModelicaTestBench instance.
    * @returns {CyPhyLight.PostProcessing} The newly created PostProcessing.
    * @public
    */
    CyPhyLight.ModelicaTestBench.prototype.createPostProcessing = function () {
        return CyPhyLight.PostProcessing.createObj(this);
    };


    /**
    * Creates a new Parameter inside this ModelicaTestBench instance.
    * @returns {CyPhyLight.Parameter} The newly created Parameter.
    * @public
    */
    CyPhyLight.ModelicaTestBench.prototype.createParameter = function () {
        return CyPhyLight.Parameter.createObj(this);
    };


    /**
    * Creates a new Environment inside this ModelicaTestBench instance.
    * @returns {CyPhyLight.Environment} The newly created Environment.
    * @public
    */
    CyPhyLight.ModelicaTestBench.prototype.createEnvironment = function () {
        return CyPhyLight.Environment.createObj(this);
    };


    /**
    * Creates a new SolverSettings inside this ModelicaTestBench instance.
    * @returns {CyPhyLight.SolverSettings} The newly created SolverSettings.
    * @public
    */
    CyPhyLight.ModelicaTestBench.prototype.createSolverSettings = function () {
        return CyPhyLight.SolverSettings.createObj(this);
    };


    /**
    * Creates a new TestComponent inside this ModelicaTestBench instance.
    * @returns {CyPhyLight.TestComponent} The newly created TestComponent.
    * @public
    */
    CyPhyLight.ModelicaTestBench.prototype.createTestComponent = function () {
        return CyPhyLight.TestComponent.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.ModelicaTestBench.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ModelicaTestBench attributes">
    /**
    * Initializes a new instance of ModelicaTestBench.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ModelicaTestBench.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaTestBench.
    * @constructor
    */
    CyPhyLight.ModelicaTestBench.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the ModelicaTestBench instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ModelicaTestBench instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ModelicaTestBench registry entries">
    /**
    * Initializes a new instance of ModelicaTestBench.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ModelicaTestBench.
    * @param {object} nodeObj The wrapped WebGME object of ModelicaTestBench.
    * @constructor
    */
    CyPhyLight.ModelicaTestBench.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ModelicaTestBench instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ModelicaTestBench instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ModelicaTestBench instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ModelicaTestBench instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ModelicaTestBench instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ModelicaTestBench instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the ModelicaTestBench instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the ModelicaTestBench instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the ModelicaTestBench instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ModelicaTestBench instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ModelicaTestBench instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ModelicaTestBench instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ModelicaTestBench instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ModelicaTestBench instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the ModelicaTestBench instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ModelicaTestBench instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ModelicaTestBench.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="Parameter">

    /**
    * Initializes a new instance of Parameter.
    *
    * @class
    * @augments {CyPhyLight.ValueFlowTarget}
    * @classdesc This class represents a(n) Parameter.
    * @property {CyPhyLight.Parameter.Attributes} attributes The attributes of the Parameter.
    * @property {CyPhyLight.Parameter.Registry} registry The registry of the Parameter.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.Parameter = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.ValueFlowTarget.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.Parameter.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.Parameter.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.ValueFlowTarget.prototype could be undefined at this point.
    // CyPhyLight.Parameter.prototype = Object.create(CyPhyLight.ValueFlowTarget.prototype);
    // CyPhyLight.Parameter.prototype.constructor = CyPhyLight.Parameter;
    // 

    //<editor-fold desc="Parameter static fields, properties and functions">

    /**
    * WebGME node object that represents Parameter type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.Parameter.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of Parameter.
    * @type {string}
    * @static
    */
    CyPhyLight.Parameter.ID = "/-2/-33";

    /**
    * WebGME node object's meta type GUID of Parameter.
    * @type {string}
    * @static
    */
    CyPhyLight.Parameter.GUID = "70bf083e-a164-4ef7-98f1-3c5629f80ff6";

    /**
    * WebGME node object's meta type hash value of Parameter.
    * @type {string}
    * @static
    */
    CyPhyLight.Parameter.Hash = "#981481f990ead3a8cf080833769f3d496c3b7f71";

        
    /**
    * Creates a new Parameter inside given parent.
    * @returns {CyPhyLight.Parameter} The newly created Parameter.
    * @param {CyPhyLight.FCO} parent Instance where the new Parameter should be created.
    * @public
    */
    CyPhyLight.Parameter.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Parameter.Type});
        return new CyPhyLight.Parameter(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="Parameter create child objects">

    //</editor-fold>

    CyPhyLight.Parameter.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="Parameter attributes">
    /**
    * Initializes a new instance of Parameter.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of Parameter.
    * @param {object} nodeObj The wrapped WebGME object of Parameter.
    * @constructor
    */
    CyPhyLight.Parameter.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute Value of the Parameter instance.
    * @returns {string|object} Currently set Value.
    * @public
    */
    CyPhyLight.Parameter.Attributes.prototype.getValue = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Value');
    };

    /**
    * Sets the attribute Value of the Parameter instance.
    * @param {string|object} value New Value.
    * @public
    */
    CyPhyLight.Parameter.Attributes.prototype.setValue = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Value', value);
    };



    /**
    * Gets the attribute name of the Parameter instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.Parameter.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the Parameter instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.Parameter.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="Parameter registry entries">
    /**
    * Initializes a new instance of Parameter.Registry
    *
    * @class
    * @classdesc This class wraps the registry of Parameter.
    * @param {object} nodeObj The wrapped WebGME object of Parameter.
    * @constructor
    */
    CyPhyLight.Parameter.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the Parameter instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the Parameter instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the Parameter instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the Parameter instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the Parameter instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the Parameter instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the Parameter instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the Parameter instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the Parameter instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the Parameter instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the Parameter instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the Parameter instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the Parameter instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the Parameter instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the Parameter instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the Parameter instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.Parameter.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="PostProcessing">

    /**
    * Initializes a new instance of PostProcessing.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) PostProcessing.
    * @property {CyPhyLight.PostProcessing.Attributes} attributes The attributes of the PostProcessing.
    * @property {CyPhyLight.PostProcessing.Registry} registry The registry of the PostProcessing.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.PostProcessing = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.PostProcessing.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.PostProcessing.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.PostProcessing.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.PostProcessing.prototype.constructor = CyPhyLight.PostProcessing;
    // 

    //<editor-fold desc="PostProcessing static fields, properties and functions">

    /**
    * WebGME node object that represents PostProcessing type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.PostProcessing.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of PostProcessing.
    * @type {string}
    * @static
    */
    CyPhyLight.PostProcessing.ID = "/-2/-100";

    /**
    * WebGME node object's meta type GUID of PostProcessing.
    * @type {string}
    * @static
    */
    CyPhyLight.PostProcessing.GUID = "fd574789-45bb-24d2-cc59-7f05931c5b82";

    /**
    * WebGME node object's meta type hash value of PostProcessing.
    * @type {string}
    * @static
    */
    CyPhyLight.PostProcessing.Hash = "#92c38bfd2a2675a3ebf6e95d1c76a4210f04f24a";

        
    /**
    * Creates a new PostProcessing inside given parent.
    * @returns {CyPhyLight.PostProcessing} The newly created PostProcessing.
    * @param {CyPhyLight.FCO} parent Instance where the new PostProcessing should be created.
    * @public
    */
    CyPhyLight.PostProcessing.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.PostProcessing.Type});
        return new CyPhyLight.PostProcessing(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="PostProcessing create child objects">

    /**
    * Creates a new Metric inside this PostProcessing instance.
    * @returns {CyPhyLight.Metric} The newly created Metric.
    * @public
    */
    CyPhyLight.PostProcessing.prototype.createMetric = function () {
        return CyPhyLight.Metric.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.PostProcessing.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="PostProcessing attributes">
    /**
    * Initializes a new instance of PostProcessing.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of PostProcessing.
    * @param {object} nodeObj The wrapped WebGME object of PostProcessing.
    * @constructor
    */
    CyPhyLight.PostProcessing.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute ScriptPath of the PostProcessing instance.
    * @returns {string|object} Currently set ScriptPath.
    * @public
    */
    CyPhyLight.PostProcessing.Attributes.prototype.getScriptPath = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'ScriptPath');
    };

    /**
    * Sets the attribute ScriptPath of the PostProcessing instance.
    * @param {string|object} value New ScriptPath.
    * @public
    */
    CyPhyLight.PostProcessing.Attributes.prototype.setScriptPath = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'ScriptPath', value);
    };



    /**
    * Gets the attribute name of the PostProcessing instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.PostProcessing.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the PostProcessing instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.PostProcessing.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="PostProcessing registry entries">
    /**
    * Initializes a new instance of PostProcessing.Registry
    *
    * @class
    * @classdesc This class wraps the registry of PostProcessing.
    * @param {object} nodeObj The wrapped WebGME object of PostProcessing.
    * @constructor
    */
    CyPhyLight.PostProcessing.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the PostProcessing instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the PostProcessing instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the PostProcessing instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the PostProcessing instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the PostProcessing instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the PostProcessing instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the PostProcessing instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the PostProcessing instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the PostProcessing instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the PostProcessing instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the PostProcessing instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the PostProcessing instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the PostProcessing instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the PostProcessing instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.PostProcessing.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="Property">

    /**
    * Initializes a new instance of Property.
    *
    * @class
    * @augments {CyPhyLight.ValueFlowTarget}
    * @classdesc This class represents a(n) Property.
    * @property {CyPhyLight.Property.Attributes} attributes The attributes of the Property.
    * @property {CyPhyLight.Property.Registry} registry The registry of the Property.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.Property = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.ValueFlowTarget.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.Property.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.Property.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.ValueFlowTarget.prototype could be undefined at this point.
    // CyPhyLight.Property.prototype = Object.create(CyPhyLight.ValueFlowTarget.prototype);
    // CyPhyLight.Property.prototype.constructor = CyPhyLight.Property;
    // 

    //<editor-fold desc="Property static fields, properties and functions">

    /**
    * WebGME node object that represents Property type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.Property.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of Property.
    * @type {string}
    * @static
    */
    CyPhyLight.Property.ID = "/-2/-30";

    /**
    * WebGME node object's meta type GUID of Property.
    * @type {string}
    * @static
    */
    CyPhyLight.Property.GUID = "4fbf083e-a164-4ef7-98f1-3c5629f80ff6";

    /**
    * WebGME node object's meta type hash value of Property.
    * @type {string}
    * @static
    */
    CyPhyLight.Property.Hash = "#262ce709776ba79117f0aa1761a0844ca761cec0";

        
    /**
    * Creates a new Property inside given parent.
    * @returns {CyPhyLight.Property} The newly created Property.
    * @param {CyPhyLight.FCO} parent Instance where the new Property should be created.
    * @public
    */
    CyPhyLight.Property.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Property.Type});
        return new CyPhyLight.Property(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="Property create child objects">

    //</editor-fold>

    CyPhyLight.Property.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="Property attributes">
    /**
    * Initializes a new instance of Property.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of Property.
    * @param {object} nodeObj The wrapped WebGME object of Property.
    * @constructor
    */
    CyPhyLight.Property.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute Value of the Property instance.
    * @returns {string|object} Currently set Value.
    * @public
    */
    CyPhyLight.Property.Attributes.prototype.getValue = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Value');
    };

    /**
    * Sets the attribute Value of the Property instance.
    * @param {string|object} value New Value.
    * @public
    */
    CyPhyLight.Property.Attributes.prototype.setValue = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Value', value);
    };



    /**
    * Gets the attribute name of the Property instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.Property.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the Property instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.Property.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="Property registry entries">
    /**
    * Initializes a new instance of Property.Registry
    *
    * @class
    * @classdesc This class wraps the registry of Property.
    * @param {object} nodeObj The wrapped WebGME object of Property.
    * @constructor
    */
    CyPhyLight.Property.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the Property instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the Property instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the Property instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the Property instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the Property instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the Property instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the Property instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the Property instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the Property instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the Property instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the Property instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the Property instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the Property instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the Property instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the Property instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the Property instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.Property.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="PropertyType">

    /**
    * Initializes a new instance of PropertyType.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) PropertyType.
    * @property {CyPhyLight.PropertyType.Attributes} attributes The attributes of the PropertyType.
    * @property {CyPhyLight.PropertyType.Registry} registry The registry of the PropertyType.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.PropertyType = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.PropertyType.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.PropertyType.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.PropertyType.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.PropertyType.prototype.constructor = CyPhyLight.PropertyType;
    // 

    //<editor-fold desc="PropertyType static fields, properties and functions">

    /**
    * WebGME node object that represents PropertyType type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.PropertyType.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of PropertyType.
    * @type {string}
    * @static
    */
    CyPhyLight.PropertyType.ID = "/-2/-2";

    /**
    * WebGME node object's meta type GUID of PropertyType.
    * @type {string}
    * @static
    */
    CyPhyLight.PropertyType.GUID = "c6391f84-c449-a772-46ec-821c24621b69";

    /**
    * WebGME node object's meta type hash value of PropertyType.
    * @type {string}
    * @static
    */
    CyPhyLight.PropertyType.Hash = "#79d169f12dee0f2029734d0a8664c79d1723920d";

        
    /**
    * Creates a new PropertyType inside given parent.
    * @returns {CyPhyLight.PropertyType} The newly created PropertyType.
    * @param {CyPhyLight.FCO} parent Instance where the new PropertyType should be created.
    * @public
    */
    CyPhyLight.PropertyType.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.PropertyType.Type});
        return new CyPhyLight.PropertyType(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="PropertyType create child objects">

    //</editor-fold>

    CyPhyLight.PropertyType.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="PropertyType attributes">
    /**
    * Initializes a new instance of PropertyType.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of PropertyType.
    * @param {object} nodeObj The wrapped WebGME object of PropertyType.
    * @constructor
    */
    CyPhyLight.PropertyType.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the PropertyType instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.PropertyType.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the PropertyType instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.PropertyType.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="PropertyType registry entries">
    /**
    * Initializes a new instance of PropertyType.Registry
    *
    * @class
    * @classdesc This class wraps the registry of PropertyType.
    * @param {object} nodeObj The wrapped WebGME object of PropertyType.
    * @constructor
    */
    CyPhyLight.PropertyType.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the PropertyType instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the PropertyType instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the PropertyType instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the PropertyType instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the PropertyType instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the PropertyType instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the PropertyType instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the PropertyType instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the PropertyType instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the PropertyType instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the PropertyType instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the PropertyType instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the PropertyType instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the PropertyType instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.PropertyType.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="SolverSettings">

    /**
    * Initializes a new instance of SolverSettings.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) SolverSettings.
    * @property {CyPhyLight.SolverSettings.Attributes} attributes The attributes of the SolverSettings.
    * @property {CyPhyLight.SolverSettings.Registry} registry The registry of the SolverSettings.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.SolverSettings = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.SolverSettings.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.SolverSettings.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.SolverSettings.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.SolverSettings.prototype.constructor = CyPhyLight.SolverSettings;
    // 

    //<editor-fold desc="SolverSettings static fields, properties and functions">

    /**
    * WebGME node object that represents SolverSettings type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.SolverSettings.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of SolverSettings.
    * @type {string}
    * @static
    */
    CyPhyLight.SolverSettings.ID = "/-2/-10";

    /**
    * WebGME node object's meta type GUID of SolverSettings.
    * @type {string}
    * @static
    */
    CyPhyLight.SolverSettings.GUID = "aadfb749-e14d-ec47-76b8-4599ef13ee9a";

    /**
    * WebGME node object's meta type hash value of SolverSettings.
    * @type {string}
    * @static
    */
    CyPhyLight.SolverSettings.Hash = "#708eaac2d0e9c453278680cc62ba2b93acd852a7";

        
    /**
    * Creates a new SolverSettings inside given parent.
    * @returns {CyPhyLight.SolverSettings} The newly created SolverSettings.
    * @param {CyPhyLight.FCO} parent Instance where the new SolverSettings should be created.
    * @public
    */
    CyPhyLight.SolverSettings.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.SolverSettings.Type});
        return new CyPhyLight.SolverSettings(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="SolverSettings create child objects">

    //</editor-fold>

    CyPhyLight.SolverSettings.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="SolverSettings attributes">
    /**
    * Initializes a new instance of SolverSettings.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of SolverSettings.
    * @param {object} nodeObj The wrapped WebGME object of SolverSettings.
    * @constructor
    */
    CyPhyLight.SolverSettings.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute StartTime of the SolverSettings instance.
    * @returns {string|object} Currently set StartTime.
    * @public
    */
    CyPhyLight.SolverSettings.Attributes.prototype.getStartTime = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'StartTime');
    };

    /**
    * Sets the attribute StartTime of the SolverSettings instance.
    * @param {string|object} value New StartTime.
    * @public
    */
    CyPhyLight.SolverSettings.Attributes.prototype.setStartTime = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'StartTime', value);
    };



    /**
    * Gets the attribute StopTime of the SolverSettings instance.
    * @returns {string|object} Currently set StopTime.
    * @public
    */
    CyPhyLight.SolverSettings.Attributes.prototype.getStopTime = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'StopTime');
    };

    /**
    * Sets the attribute StopTime of the SolverSettings instance.
    * @param {string|object} value New StopTime.
    * @public
    */
    CyPhyLight.SolverSettings.Attributes.prototype.setStopTime = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'StopTime', value);
    };



    /**
    * Gets the attribute Tool of the SolverSettings instance.
    * @returns {string|object} Currently set Tool.
    * @public
    */
    CyPhyLight.SolverSettings.Attributes.prototype.getTool = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Tool');
    };

    /**
    * Sets the attribute Tool of the SolverSettings instance.
    * @param {string|object} value New Tool.
    * @public
    */
    CyPhyLight.SolverSettings.Attributes.prototype.setTool = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Tool', value);
    };



    /**
    * Gets the attribute name of the SolverSettings instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.SolverSettings.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the SolverSettings instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.SolverSettings.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="SolverSettings registry entries">
    /**
    * Initializes a new instance of SolverSettings.Registry
    *
    * @class
    * @classdesc This class wraps the registry of SolverSettings.
    * @param {object} nodeObj The wrapped WebGME object of SolverSettings.
    * @constructor
    */
    CyPhyLight.SolverSettings.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the SolverSettings instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the SolverSettings instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the SolverSettings instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the SolverSettings instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the SolverSettings instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the SolverSettings instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the SolverSettings instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the SolverSettings instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the SolverSettings instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the SolverSettings instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the SolverSettings instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the SolverSettings instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the SolverSettings instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the SolverSettings instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.SolverSettings.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="TestBenchType">

    /**
    * Initializes a new instance of TestBenchType.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) TestBenchType.
    * @property {CyPhyLight.TestBenchType.Attributes} attributes The attributes of the TestBenchType.
    * @property {CyPhyLight.TestBenchType.Registry} registry The registry of the TestBenchType.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.TestBenchType = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.TestBenchType.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.TestBenchType.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.TestBenchType.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.TestBenchType.prototype.constructor = CyPhyLight.TestBenchType;
    // 

    //<editor-fold desc="TestBenchType static fields, properties and functions">

    /**
    * WebGME node object that represents TestBenchType type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.TestBenchType.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of TestBenchType.
    * @type {string}
    * @static
    */
    CyPhyLight.TestBenchType.ID = "/-2/-17";

    /**
    * WebGME node object's meta type GUID of TestBenchType.
    * @type {string}
    * @static
    */
    CyPhyLight.TestBenchType.GUID = "374c0e63-f06a-9ff1-b807-2ddb3fdda5c7";

    /**
    * WebGME node object's meta type hash value of TestBenchType.
    * @type {string}
    * @static
    */
    CyPhyLight.TestBenchType.Hash = "#ba109440c2ca9d41250c40cc3d6446a5f8d53848";

        
    /**
    * Creates a new TestBenchType inside given parent.
    * @returns {CyPhyLight.TestBenchType} The newly created TestBenchType.
    * @param {CyPhyLight.FCO} parent Instance where the new TestBenchType should be created.
    * @public
    */
    CyPhyLight.TestBenchType.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.TestBenchType.Type});
        return new CyPhyLight.TestBenchType(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="TestBenchType create child objects">

    /**
    * Creates a new TopLevelSystemUnderTest inside this TestBenchType instance.
    * @returns {CyPhyLight.TopLevelSystemUnderTest} The newly created TopLevelSystemUnderTest.
    * @public
    */
    CyPhyLight.TestBenchType.prototype.createTopLevelSystemUnderTest = function () {
        return CyPhyLight.TopLevelSystemUnderTest.createObj(this);
    };


    /**
    * Creates a new Metric inside this TestBenchType instance.
    * @returns {CyPhyLight.Metric} The newly created Metric.
    * @public
    */
    CyPhyLight.TestBenchType.prototype.createMetric = function () {
        return CyPhyLight.Metric.createObj(this);
    };


    /**
    * Creates a new Connection inside this TestBenchType instance.
    * @returns {CyPhyLight.Connection} The newly created Connection.
    * @public
    */
    CyPhyLight.TestBenchType.prototype.createConnection = function () {
        return CyPhyLight.Connection.createObj(this);
    };


    /**
    * Creates a new Parameter inside this TestBenchType instance.
    * @returns {CyPhyLight.Parameter} The newly created Parameter.
    * @public
    */
    CyPhyLight.TestBenchType.prototype.createParameter = function () {
        return CyPhyLight.Parameter.createObj(this);
    };


    /**
    * Creates a new TestComponent inside this TestBenchType instance.
    * @returns {CyPhyLight.TestComponent} The newly created TestComponent.
    * @public
    */
    CyPhyLight.TestBenchType.prototype.createTestComponent = function () {
        return CyPhyLight.TestComponent.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.TestBenchType.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="TestBenchType attributes">
    /**
    * Initializes a new instance of TestBenchType.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of TestBenchType.
    * @param {object} nodeObj The wrapped WebGME object of TestBenchType.
    * @constructor
    */
    CyPhyLight.TestBenchType.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the TestBenchType instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.TestBenchType.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the TestBenchType instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.TestBenchType.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="TestBenchType registry entries">
    /**
    * Initializes a new instance of TestBenchType.Registry
    *
    * @class
    * @classdesc This class wraps the registry of TestBenchType.
    * @param {object} nodeObj The wrapped WebGME object of TestBenchType.
    * @constructor
    */
    CyPhyLight.TestBenchType.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the TestBenchType instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the TestBenchType instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the TestBenchType instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the TestBenchType instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the TestBenchType instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the TestBenchType instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the TestBenchType instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the TestBenchType instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the TestBenchType instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the TestBenchType instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the TestBenchType instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the TestBenchType instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the TestBenchType instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the TestBenchType instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the TestBenchType instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the TestBenchType instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.TestBenchType.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="TestComponent">

    /**
    * Initializes a new instance of TestComponent.
    *
    * @class
    * @augments {CyPhyLight.ComponentType}
    * @classdesc This class represents a(n) TestComponent.
    * @property {CyPhyLight.TestComponent.Attributes} attributes The attributes of the TestComponent.
    * @property {CyPhyLight.TestComponent.Registry} registry The registry of the TestComponent.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.TestComponent = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.ComponentType.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.TestComponent.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.TestComponent.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.ComponentType.prototype could be undefined at this point.
    // CyPhyLight.TestComponent.prototype = Object.create(CyPhyLight.ComponentType.prototype);
    // CyPhyLight.TestComponent.prototype.constructor = CyPhyLight.TestComponent;
    // 

    //<editor-fold desc="TestComponent static fields, properties and functions">

    /**
    * WebGME node object that represents TestComponent type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.TestComponent.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of TestComponent.
    * @type {string}
    * @static
    */
    CyPhyLight.TestComponent.ID = "/-2/-20";

    /**
    * WebGME node object's meta type GUID of TestComponent.
    * @type {string}
    * @static
    */
    CyPhyLight.TestComponent.GUID = "41e038c6-e704-bbab-1df1-af7ed3d6c0a6";

    /**
    * WebGME node object's meta type hash value of TestComponent.
    * @type {string}
    * @static
    */
    CyPhyLight.TestComponent.Hash = "#f16cee5306a790db951884648bc103ba2135c54a";

        
    /**
    * Creates a new TestComponent inside given parent.
    * @returns {CyPhyLight.TestComponent} The newly created TestComponent.
    * @param {CyPhyLight.FCO} parent Instance where the new TestComponent should be created.
    * @public
    */
    CyPhyLight.TestComponent.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.TestComponent.Type});
        return new CyPhyLight.TestComponent(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="TestComponent create child objects">

    /**
    * Creates a new Connector inside this TestComponent instance.
    * @returns {CyPhyLight.Connector} The newly created Connector.
    * @public
    */
    CyPhyLight.TestComponent.prototype.createConnector = function () {
        return CyPhyLight.Connector.createObj(this);
    };


    /**
    * Creates a new Connection inside this TestComponent instance.
    * @returns {CyPhyLight.Connection} The newly created Connection.
    * @public
    */
    CyPhyLight.TestComponent.prototype.createConnection = function () {
        return CyPhyLight.Connection.createObj(this);
    };


    /**
    * Creates a new Property inside this TestComponent instance.
    * @returns {CyPhyLight.Property} The newly created Property.
    * @public
    */
    CyPhyLight.TestComponent.prototype.createProperty = function () {
        return CyPhyLight.Property.createObj(this);
    };


    /**
    * Creates a new Parameter inside this TestComponent instance.
    * @returns {CyPhyLight.Parameter} The newly created Parameter.
    * @public
    */
    CyPhyLight.TestComponent.prototype.createParameter = function () {
        return CyPhyLight.Parameter.createObj(this);
    };


    /**
    * Creates a new ModelicaModel inside this TestComponent instance.
    * @returns {CyPhyLight.ModelicaModel} The newly created ModelicaModel.
    * @public
    */
    CyPhyLight.TestComponent.prototype.createModelicaModel = function () {
        return CyPhyLight.ModelicaModel.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.TestComponent.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="TestComponent attributes">
    /**
    * Initializes a new instance of TestComponent.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of TestComponent.
    * @param {object} nodeObj The wrapped WebGME object of TestComponent.
    * @constructor
    */
    CyPhyLight.TestComponent.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the TestComponent instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.TestComponent.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the TestComponent instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.TestComponent.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="TestComponent registry entries">
    /**
    * Initializes a new instance of TestComponent.Registry
    *
    * @class
    * @classdesc This class wraps the registry of TestComponent.
    * @param {object} nodeObj The wrapped WebGME object of TestComponent.
    * @constructor
    */
    CyPhyLight.TestComponent.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the TestComponent instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the TestComponent instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the TestComponent instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the TestComponent instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the TestComponent instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the TestComponent instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the TestComponent instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the TestComponent instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the TestComponent instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the TestComponent instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the TestComponent instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the TestComponent instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the TestComponent instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the TestComponent instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the TestComponent instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the TestComponent instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.TestComponent.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="TestComponents">

    /**
    * Initializes a new instance of TestComponents.
    *
    * @class
    * @augments {CyPhyLight.Folder}
    * @classdesc This class represents a(n) TestComponents.
    * @property {CyPhyLight.TestComponents.Attributes} attributes The attributes of the TestComponents.
    * @property {CyPhyLight.TestComponents.Registry} registry The registry of the TestComponents.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.TestComponents = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.Folder.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.TestComponents.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.TestComponents.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.Folder.prototype could be undefined at this point.
    // CyPhyLight.TestComponents.prototype = Object.create(CyPhyLight.Folder.prototype);
    // CyPhyLight.TestComponents.prototype.constructor = CyPhyLight.TestComponents;
    // 

    //<editor-fold desc="TestComponents static fields, properties and functions">

    /**
    * WebGME node object that represents TestComponents type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.TestComponents.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of TestComponents.
    * @type {string}
    * @static
    */
    CyPhyLight.TestComponents.ID = "/-2/-50";

    /**
    * WebGME node object's meta type GUID of TestComponents.
    * @type {string}
    * @static
    */
    CyPhyLight.TestComponents.GUID = "68f2b898-89d2-cf58-a7ac-d59d4a90296a";

    /**
    * WebGME node object's meta type hash value of TestComponents.
    * @type {string}
    * @static
    */
    CyPhyLight.TestComponents.Hash = "#0449b43251652dbc225d10a8bdc3fa8ee6f85b3f";

        
    /**
    * Creates a new TestComponents inside given parent.
    * @returns {CyPhyLight.TestComponents} The newly created TestComponents.
    * @param {CyPhyLight.FCO} parent Instance where the new TestComponents should be created.
    * @public
    */
    CyPhyLight.TestComponents.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.TestComponents.Type});
        return new CyPhyLight.TestComponents(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="TestComponents create child objects">

    /**
    * Creates a new TestComponent inside this TestComponents instance.
    * @returns {CyPhyLight.TestComponent} The newly created TestComponent.
    * @public
    */
    CyPhyLight.TestComponents.prototype.createTestComponent = function () {
        return CyPhyLight.TestComponent.createObj(this);
    };


    /**
    * Creates a new TestComponents inside this TestComponents instance.
    * @returns {CyPhyLight.TestComponents} The newly created TestComponents.
    * @public
    */
    CyPhyLight.TestComponents.prototype.createTestComponents = function () {
        return CyPhyLight.TestComponents.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.TestComponents.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="TestComponents attributes">
    /**
    * Initializes a new instance of TestComponents.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of TestComponents.
    * @param {object} nodeObj The wrapped WebGME object of TestComponents.
    * @constructor
    */
    CyPhyLight.TestComponents.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the TestComponents instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.TestComponents.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the TestComponents instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.TestComponents.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="TestComponents registry entries">
    /**
    * Initializes a new instance of TestComponents.Registry
    *
    * @class
    * @classdesc This class wraps the registry of TestComponents.
    * @param {object} nodeObj The wrapped WebGME object of TestComponents.
    * @constructor
    */
    CyPhyLight.TestComponents.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the TestComponents instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the TestComponents instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the TestComponents instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the TestComponents instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the TestComponents instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the TestComponents instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the TestComponents instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the TestComponents instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the TestComponents instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the TestComponents instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the TestComponents instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the TestComponents instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the TestComponents instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the TestComponents instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the TestComponents instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the TestComponents instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.TestComponents.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="Testing">

    /**
    * Initializes a new instance of Testing.
    *
    * @class
    * @augments {CyPhyLight.Folder}
    * @classdesc This class represents a(n) Testing.
    * @property {CyPhyLight.Testing.Attributes} attributes The attributes of the Testing.
    * @property {CyPhyLight.Testing.Registry} registry The registry of the Testing.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.Testing = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.Folder.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.Testing.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.Testing.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.Folder.prototype could be undefined at this point.
    // CyPhyLight.Testing.prototype = Object.create(CyPhyLight.Folder.prototype);
    // CyPhyLight.Testing.prototype.constructor = CyPhyLight.Testing;
    // 

    //<editor-fold desc="Testing static fields, properties and functions">

    /**
    * WebGME node object that represents Testing type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.Testing.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of Testing.
    * @type {string}
    * @static
    */
    CyPhyLight.Testing.ID = "/-2/-16";

    /**
    * WebGME node object's meta type GUID of Testing.
    * @type {string}
    * @static
    */
    CyPhyLight.Testing.GUID = "68f2b898-89d2-cf58-a7ac-d59d4a90296a";

    /**
    * WebGME node object's meta type hash value of Testing.
    * @type {string}
    * @static
    */
    CyPhyLight.Testing.Hash = "#783cd3db0280afd2b8a013b40b62a56e7d7bf97e";

        
    /**
    * Creates a new Testing inside given parent.
    * @returns {CyPhyLight.Testing} The newly created Testing.
    * @param {CyPhyLight.FCO} parent Instance where the new Testing should be created.
    * @public
    */
    CyPhyLight.Testing.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Testing.Type});
        return new CyPhyLight.Testing(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="Testing create child objects">

    /**
    * Creates a new Testing inside this Testing instance.
    * @returns {CyPhyLight.Testing} The newly created Testing.
    * @public
    */
    CyPhyLight.Testing.prototype.createTesting = function () {
        return CyPhyLight.Testing.createObj(this);
    };


    /**
    * Creates a new TestBenchType inside this Testing instance.
    * @returns {CyPhyLight.TestBenchType} The newly created TestBenchType.
    * @public
    */
    CyPhyLight.Testing.prototype.createTestBenchType = function () {
        return CyPhyLight.TestBenchType.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.Testing.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="Testing attributes">
    /**
    * Initializes a new instance of Testing.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of Testing.
    * @param {object} nodeObj The wrapped WebGME object of Testing.
    * @constructor
    */
    CyPhyLight.Testing.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the Testing instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.Testing.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the Testing instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.Testing.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="Testing registry entries">
    /**
    * Initializes a new instance of Testing.Registry
    *
    * @class
    * @classdesc This class wraps the registry of Testing.
    * @param {object} nodeObj The wrapped WebGME object of Testing.
    * @constructor
    */
    CyPhyLight.Testing.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the Testing instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the Testing instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the Testing instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the Testing instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the Testing instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the Testing instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the Testing instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the Testing instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the Testing instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the Testing instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the Testing instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the Testing instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the Testing instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the Testing instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the Testing instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the Testing instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.Testing.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="TopLevelSystemUnderTest">

    /**
    * Initializes a new instance of TopLevelSystemUnderTest.
    *
    * @class
    * @augments {CyPhyLight.DesignEntity}
    * @classdesc This class represents a(n) TopLevelSystemUnderTest.
    * @property {CyPhyLight.TopLevelSystemUnderTest.Attributes} attributes The attributes of the TopLevelSystemUnderTest.
    * @property {CyPhyLight.TopLevelSystemUnderTest.Registry} registry The registry of the TopLevelSystemUnderTest.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.TopLevelSystemUnderTest = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.DesignEntity.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.TopLevelSystemUnderTest.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.TopLevelSystemUnderTest.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.DesignEntity.prototype could be undefined at this point.
    // CyPhyLight.TopLevelSystemUnderTest.prototype = Object.create(CyPhyLight.DesignEntity.prototype);
    // CyPhyLight.TopLevelSystemUnderTest.prototype.constructor = CyPhyLight.TopLevelSystemUnderTest;
    // 

    //<editor-fold desc="TopLevelSystemUnderTest static fields, properties and functions">

    /**
    * WebGME node object that represents TopLevelSystemUnderTest type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.TopLevelSystemUnderTest.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of TopLevelSystemUnderTest.
    * @type {string}
    * @static
    */
    CyPhyLight.TopLevelSystemUnderTest.ID = "/-2/-21";

    /**
    * WebGME node object's meta type GUID of TopLevelSystemUnderTest.
    * @type {string}
    * @static
    */
    CyPhyLight.TopLevelSystemUnderTest.GUID = "a4bfbd07-b2c1-4e97-59c8-d2e153be7159";

    /**
    * WebGME node object's meta type hash value of TopLevelSystemUnderTest.
    * @type {string}
    * @static
    */
    CyPhyLight.TopLevelSystemUnderTest.Hash = "#cea7988c0310b7d28c23916980c5fb4d81eb716b";

        
    /**
    * Creates a new TopLevelSystemUnderTest inside given parent.
    * @returns {CyPhyLight.TopLevelSystemUnderTest} The newly created TopLevelSystemUnderTest.
    * @param {CyPhyLight.FCO} parent Instance where the new TopLevelSystemUnderTest should be created.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.TopLevelSystemUnderTest.Type});
        return new CyPhyLight.TopLevelSystemUnderTest(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="TopLevelSystemUnderTest create child objects">

    /**
    * Creates a new Connector inside this TopLevelSystemUnderTest instance.
    * @returns {CyPhyLight.Connector} The newly created Connector.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.prototype.createConnector = function () {
        return CyPhyLight.Connector.createObj(this);
    };


    /**
    * Creates a new Connection inside this TopLevelSystemUnderTest instance.
    * @returns {CyPhyLight.Connection} The newly created Connection.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.prototype.createConnection = function () {
        return CyPhyLight.Connection.createObj(this);
    };


    /**
    * Creates a new Property inside this TopLevelSystemUnderTest instance.
    * @returns {CyPhyLight.Property} The newly created Property.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.prototype.createProperty = function () {
        return CyPhyLight.Property.createObj(this);
    };


    /**
    * Creates a new Parameter inside this TopLevelSystemUnderTest instance.
    * @returns {CyPhyLight.Parameter} The newly created Parameter.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.prototype.createParameter = function () {
        return CyPhyLight.Parameter.createObj(this);
    };


    //</editor-fold>

    CyPhyLight.TopLevelSystemUnderTest.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="TopLevelSystemUnderTest attributes">
    /**
    * Initializes a new instance of TopLevelSystemUnderTest.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of TopLevelSystemUnderTest.
    * @param {object} nodeObj The wrapped WebGME object of TopLevelSystemUnderTest.
    * @constructor
    */
    CyPhyLight.TopLevelSystemUnderTest.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the TopLevelSystemUnderTest instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the TopLevelSystemUnderTest instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="TopLevelSystemUnderTest registry entries">
    /**
    * Initializes a new instance of TopLevelSystemUnderTest.Registry
    *
    * @class
    * @classdesc This class wraps the registry of TopLevelSystemUnderTest.
    * @param {object} nodeObj The wrapped WebGME object of TopLevelSystemUnderTest.
    * @constructor
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the TopLevelSystemUnderTest instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the TopLevelSystemUnderTest instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the TopLevelSystemUnderTest instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the TopLevelSystemUnderTest instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the TopLevelSystemUnderTest instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the TopLevelSystemUnderTest instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value decorator of the TopLevelSystemUnderTest instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the TopLevelSystemUnderTest instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the TopLevelSystemUnderTest instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the TopLevelSystemUnderTest instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the TopLevelSystemUnderTest instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the TopLevelSystemUnderTest instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the TopLevelSystemUnderTest instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the TopLevelSystemUnderTest instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.TopLevelSystemUnderTest.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ValueFlowComposition">

    /**
    * Initializes a new instance of ValueFlowComposition.
    *
    * @class
    * @augments {CyPhyLight.Connection}
    * @classdesc This class represents a(n) ValueFlowComposition.
    * @property {CyPhyLight.ValueFlowComposition.Attributes} attributes The attributes of the ValueFlowComposition.
    * @property {CyPhyLight.ValueFlowComposition.Registry} registry The registry of the ValueFlowComposition.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ValueFlowComposition = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.Connection.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ValueFlowComposition.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ValueFlowComposition.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.Connection.prototype could be undefined at this point.
    // CyPhyLight.ValueFlowComposition.prototype = Object.create(CyPhyLight.Connection.prototype);
    // CyPhyLight.ValueFlowComposition.prototype.constructor = CyPhyLight.ValueFlowComposition;
    // 

    //<editor-fold desc="ValueFlowComposition static fields, properties and functions">

    /**
    * WebGME node object that represents ValueFlowComposition type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ValueFlowComposition.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ValueFlowComposition.
    * @type {string}
    * @static
    */
    CyPhyLight.ValueFlowComposition.ID = "/-2/-41";

    /**
    * WebGME node object's meta type GUID of ValueFlowComposition.
    * @type {string}
    * @static
    */
    CyPhyLight.ValueFlowComposition.GUID = "5955d935-6d16-37b5-557d-addeb4ae55d8";

    /**
    * WebGME node object's meta type hash value of ValueFlowComposition.
    * @type {string}
    * @static
    */
    CyPhyLight.ValueFlowComposition.Hash = "#10523193576fd51fb2aa56088d7e6d846563a8e5";

        
    CyPhyLight.ValueFlowComposition.createObj = function (parent, src, dst) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ValueFlowComposition.Type});
        CyPhyLight._core.setPointer(nodeObj, 'src', src.getNodeObj());
        CyPhyLight._core.setPointer(nodeObj, 'dst', dst.getNodeObj());
        return new CyPhyLight.ValueFlowComposition(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ValueFlowComposition create child objects">

    //</editor-fold>

    CyPhyLight.ValueFlowComposition.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ValueFlowComposition attributes">
    /**
    * Initializes a new instance of ValueFlowComposition.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ValueFlowComposition.
    * @param {object} nodeObj The wrapped WebGME object of ValueFlowComposition.
    * @constructor
    */
    CyPhyLight.ValueFlowComposition.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute name of the ValueFlowComposition instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ValueFlowComposition instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ValueFlowComposition registry entries">
    /**
    * Initializes a new instance of ValueFlowComposition.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ValueFlowComposition.
    * @param {object} nodeObj The wrapped WebGME object of ValueFlowComposition.
    * @constructor
    */
    CyPhyLight.ValueFlowComposition.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ValueFlowComposition instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ValueFlowComposition instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ValueFlowComposition instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ValueFlowComposition instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ValueFlowComposition instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ValueFlowComposition instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the ValueFlowComposition instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the ValueFlowComposition instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the ValueFlowComposition instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ValueFlowComposition instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ValueFlowComposition instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ValueFlowComposition instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ValueFlowComposition instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ValueFlowComposition instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value lineEndArrow of the ValueFlowComposition instance.
    * @returns {string|object} Currently set lineEndArrow.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.getlineEndArrow = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'lineEndArrow');
    };

    /**
    * Sets the registry value lineEndArrow of the ValueFlowComposition instance.
    * @param {string|object} value New registry value of lineEndArrow.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.setlineEndArrow = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'lineEndArrow', value);
    };


    /**
    * Gets the registry value position of the ValueFlowComposition instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ValueFlowComposition instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ValueFlowComposition.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>


    //<editor-fold desc="ValueFlowTarget">

    /**
    * Initializes a new instance of ValueFlowTarget.
    *
    * @class
    * @augments {CyPhyLight.FCO}
    * @classdesc This class represents a(n) ValueFlowTarget.
    * @property {CyPhyLight.ValueFlowTarget.Attributes} attributes The attributes of the ValueFlowTarget.
    * @property {CyPhyLight.ValueFlowTarget.Registry} registry The registry of the ValueFlowTarget.
    * @param {object} nodeObj The wrapped WebGME object.
    * @constructor
    */
    CyPhyLight.ValueFlowTarget = function (nodeObj) {
        
        // Call the constructor of the base-class as if it were acting on this.
        // This call is probably only needed if we want to cache the attributes and registry
        // while not defining them flat here.
        //CyPhyLight.FCO.call(this, nodeObj);
        //
        this._nodeObj = nodeObj;
        this.attributes = new CyPhyLight.ValueFlowTarget.Attributes(this._nodeObj);
        this.registry = new CyPhyLight.ValueFlowTarget.Registry(this._nodeObj);
    };
    

    // This will give inheritance when checking types, but META-types must be sorted based on the order of inheritance.
    // If not CyPhyLight.FCO.prototype could be undefined at this point.
    // CyPhyLight.ValueFlowTarget.prototype = Object.create(CyPhyLight.FCO.prototype);
    // CyPhyLight.ValueFlowTarget.prototype.constructor = CyPhyLight.ValueFlowTarget;
    // 

    //<editor-fold desc="ValueFlowTarget static fields, properties and functions">

    /**
    * WebGME node object that represents ValueFlowTarget type.
    * @type {nodeObj}
    * @static
    */
    CyPhyLight.ValueFlowTarget.Type = null; // this is set by the CyPhyLight.initialize function

    /**
    * WebGME node object's meta type ID of ValueFlowTarget.
    * @type {string}
    * @static
    */
    CyPhyLight.ValueFlowTarget.ID = "/-2/-29";

    /**
    * WebGME node object's meta type GUID of ValueFlowTarget.
    * @type {string}
    * @static
    */
    CyPhyLight.ValueFlowTarget.GUID = "f8d5184b-1e2c-2ca8-0d59-8b60ca509915";

    /**
    * WebGME node object's meta type hash value of ValueFlowTarget.
    * @type {string}
    * @static
    */
    CyPhyLight.ValueFlowTarget.Hash = "#2cf2710f4b24bdea448c5f51b8c53062da2f9f39";

        
    /**
    * Creates a new ValueFlowTarget inside given parent.
    * @returns {CyPhyLight.ValueFlowTarget} The newly created ValueFlowTarget.
    * @param {CyPhyLight.FCO} parent Instance where the new ValueFlowTarget should be created.
    * @public
    */
    CyPhyLight.ValueFlowTarget.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ValueFlowTarget.Type});
        return new CyPhyLight.ValueFlowTarget(nodeObj);
    };

        
    //</editor-fold>


    //<editor-fold desc="ValueFlowTarget create child objects">

    //</editor-fold>

    CyPhyLight.ValueFlowTarget.prototype.getNodeObj = function () { return this._nodeObj; };

    // TODO: get Id
    // TODO: get Guid

    //<editor-fold desc="ValueFlowTarget attributes">
    /**
    * Initializes a new instance of ValueFlowTarget.Attributes
    *
    * @class
    * @classdesc This class wraps the attributes of ValueFlowTarget.
    * @param {object} nodeObj The wrapped WebGME object of ValueFlowTarget.
    * @constructor
    */
    CyPhyLight.ValueFlowTarget.Attributes = function (nodeObj) {
        this._nodeObj = nodeObj;
    };


    /**
    * Gets the attribute Value of the ValueFlowTarget instance.
    * @returns {string|object} Currently set Value.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Attributes.prototype.getValue = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Value');
    };

    /**
    * Sets the attribute Value of the ValueFlowTarget instance.
    * @param {string|object} value New Value.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Attributes.prototype.setValue = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Value', value);
    };



    /**
    * Gets the attribute name of the ValueFlowTarget instance.
    * @returns {string|object} Currently set name.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Attributes.prototype.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };

    /**
    * Sets the attribute name of the ValueFlowTarget instance.
    * @param {string|object} value New name.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Attributes.prototype.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };




    //</editor-fold>


    //<editor-fold desc="ValueFlowTarget registry entries">
    /**
    * Initializes a new instance of ValueFlowTarget.Registry
    *
    * @class
    * @classdesc This class wraps the registry of ValueFlowTarget.
    * @param {object} nodeObj The wrapped WebGME object of ValueFlowTarget.
    * @constructor
    */
    CyPhyLight.ValueFlowTarget.Registry = function (nodeObj) {
        this._nodeObj = nodeObj;
    };

    /**
    * Gets the registry value DisplayFormat of the ValueFlowTarget instance.
    * @returns {string|object} Currently set DisplayFormat.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.getDisplayFormat = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'DisplayFormat');
    };

    /**
    * Sets the registry value DisplayFormat of the ValueFlowTarget instance.
    * @param {string|object} value New registry value of DisplayFormat.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.setDisplayFormat = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'DisplayFormat', value);
    };


    /**
    * Gets the registry value PortSVGIcon of the ValueFlowTarget instance.
    * @returns {string|object} Currently set PortSVGIcon.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.getPortSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'PortSVGIcon');
    };

    /**
    * Sets the registry value PortSVGIcon of the ValueFlowTarget instance.
    * @param {string|object} value New registry value of PortSVGIcon.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.setPortSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'PortSVGIcon', value);
    };


    /**
    * Gets the registry value SVGIcon of the ValueFlowTarget instance.
    * @returns {string|object} Currently set SVGIcon.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.getSVGIcon = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'SVGIcon');
    };

    /**
    * Sets the registry value SVGIcon of the ValueFlowTarget instance.
    * @param {string|object} value New registry value of SVGIcon.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.setSVGIcon = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'SVGIcon', value);
    };


    /**
    * Gets the registry value color of the ValueFlowTarget instance.
    * @returns {string|object} Currently set color.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.getcolor = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'color');
    };

    /**
    * Sets the registry value color of the ValueFlowTarget instance.
    * @param {string|object} value New registry value of color.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.setcolor = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'color', value);
    };


    /**
    * Gets the registry value decorator of the ValueFlowTarget instance.
    * @returns {string|object} Currently set decorator.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.getdecorator = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'decorator');
    };

    /**
    * Sets the registry value decorator of the ValueFlowTarget instance.
    * @param {string|object} value New registry value of decorator.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.setdecorator = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'decorator', value);
    };


    /**
    * Gets the registry value isAbstract of the ValueFlowTarget instance.
    * @returns {string|object} Currently set isAbstract.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.getisAbstract = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isAbstract');
    };

    /**
    * Sets the registry value isAbstract of the ValueFlowTarget instance.
    * @param {string|object} value New registry value of isAbstract.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.setisAbstract = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isAbstract', value);
    };


    /**
    * Gets the registry value isPort of the ValueFlowTarget instance.
    * @returns {string|object} Currently set isPort.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.getisPort = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'isPort');
    };

    /**
    * Sets the registry value isPort of the ValueFlowTarget instance.
    * @param {string|object} value New registry value of isPort.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.setisPort = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'isPort', value);
    };


    /**
    * Gets the registry value position of the ValueFlowTarget instance.
    * @returns {string|object} Currently set position.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.getposition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    /**
    * Sets the registry value position of the ValueFlowTarget instance.
    * @param {string|object} value New registry value of position.
    * @public
    */
    CyPhyLight.ValueFlowTarget.Registry.prototype.setposition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    //</editor-fold>

    // TODO: DSML connections
    // TODO: DSML references
    // TODO: DSML sets
    // TODO: DSML pointers

    //</editor-fold>



    return CyPhyLight;

});