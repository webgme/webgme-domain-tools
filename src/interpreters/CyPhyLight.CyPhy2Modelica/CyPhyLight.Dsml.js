/**
 * Created by Zsolt on 3/18/14.
 */

define([], function() {

    var CyPhyLight = function () {};

    CyPhyLight.initialize = function (core, storage) {
        CyPhyLight._core = core;
        CyPhyLight._storage = storage;
    };


//    CyPhyLight.METATypes = {
//        "TestComponent": "/-2/-20",
//        "ModelicaConnector": "/-2/-28",
//        "ValueFlowComposition": "/-2/-41",
//        "Property": "/-2/-30",
//        "Parameter": "/-2/-33",
//        "Connection": "/-2/-40",
//        "ConnectorComposition": "/-2/-49",
//        "ModelicaConnectorComposition": "/-2/-52",
//        "Environment": "/-2/-26",
//        "ValueFlowTarget": "/-2/-29",
//        "Metric": "/-2/-36",
//        "ModelicaParameter": "/-2/-39",
//        "Components": "/-2/-14",
//        "TestComponents": "/-2/-50",
//        "SolverSettings": "/-2/-10",
//        "PropertyType": "/-2/-2",
//        "ComponentAssemblies": "/-2/-15",
//        "ModelicaParameterRedeclare": "/-2/-53",
//        "PostProcessing": "/-2/-100",
//        "Component": "/-2/-19",
//        "TopLevelSystemUnderTest": "/-2/-21",
//        "ComponentAssembly": "/-2/-57",
//        "DesignEntity": "/-2/-6",
//        "ComponentType": "/-2/-7",
//        "ModelicaModel": "/-2/-23",
//        "ModelicaModelType": "/-2/-22",
//        "Connector": "/-2/-27",
//        "ModelicaTestBench": "/-2/-18",
//        "CyPhyProject": "/-2/-56",
//        "Folder": "/-2/-3",
//        "Testing": "/-2/-16",
//        "TestBenchType": "/-2/-17",
//        "FCO": "/-2/-1",
//        "CyPhyLightModelicaLanguage": "/-2"
//    };

    CyPhyLight.Component = function (nodeObj) {
        this._nodeObj = nodeObj;
        this.Attributes._nodeObj = this._nodeObj;
    };

    CyPhyLight.Component.Type = "/-2/-19";

    CyPhyLight.Component.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Component.Type});
        return new CyPhyLight.Component(nodeObj);
    };

    CyPhyLight.Component.prototype.getNodeObj = function () { return this._nodeObj; };

    CyPhyLight.Component.prototype.Attributes = {};
    CyPhyLight.Component.prototype.Attributes.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };
    CyPhyLight.Component.prototype.Attributes.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };



    CyPhyLight.ModelicaModel = function (nodeObj) {
        this._nodeObj = nodeObj;
        this.Attributes._nodeObj = this._nodeObj;
        this.Registry._nodeObj = this._nodeObj;
    };

    CyPhyLight.ModelicaModel.Type = "/-2/-19";

    CyPhyLight.ModelicaModel.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ModelicaModel.Type});
        return new CyPhyLight.ModelicaModel(nodeObj);
    };

    CyPhyLight.ModelicaModel.prototype.getNodeObj = function () { return this._nodeObj; };

    CyPhyLight.ModelicaModel.prototype.Attributes = {};
    CyPhyLight.ModelicaModel.prototype.Attributes.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };
    CyPhyLight.ModelicaModel.prototype.Attributes.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };
    CyPhyLight.ModelicaModel.prototype.Attributes.getClass = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Class');
    };
    CyPhyLight.ModelicaModel.prototype.Attributes.setClass = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Class', value);
    };

    CyPhyLight.ModelicaModel.prototype.Registry = {};
    CyPhyLight.ModelicaModel.prototype.Registry.getPosition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };
    CyPhyLight.ModelicaModel.prototype.Registry.setPosition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    CyPhyLight.Property = function (nodeObj) {
        this._nodeObj = nodeObj;
        this.Attributes._nodeObj = this._nodeObj;
        this.Registry._nodeObj = this._nodeObj;
    };

    CyPhyLight.Property.Type = "/-2/-19";

    CyPhyLight.Property.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Property.Type});
        return new CyPhyLight.Property(nodeObj);
    };

    CyPhyLight.Property.prototype.getNodeObj = function () { return this._nodeObj; };

    CyPhyLight.Property.prototype.Attributes = {};
    CyPhyLight.Property.prototype.Attributes.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };
    CyPhyLight.Property.prototype.Attributes.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };
    CyPhyLight.Property.prototype.Attributes.getValue = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Value');
    };
    CyPhyLight.Property.prototype.Attributes.setValue = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Value', value);
    };

    CyPhyLight.Property.prototype.Registry = {};
    CyPhyLight.Property.prototype.Registry.getPosition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };
    CyPhyLight.Property.prototype.Registry.setPosition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };


    CyPhyLight.ModelicaParameter = function (nodeObj) {
        this._nodeObj = nodeObj;
        this.Attributes._nodeObj = this._nodeObj;
        this.Registry._nodeObj = this._nodeObj;
    };

    CyPhyLight.ModelicaParameter.Type = "/-2/-19";

    CyPhyLight.ModelicaParameter.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ModelicaParameter.Type});
        return new CyPhyLight.ModelicaParameter(nodeObj);
    };

    CyPhyLight.ModelicaParameter.prototype.getNodeObj = function () { return this._nodeObj; };

    CyPhyLight.ModelicaParameter.prototype.Attributes = {};
    CyPhyLight.ModelicaParameter.prototype.Attributes.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };
    CyPhyLight.ModelicaParameter.prototype.Attributes.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };
    CyPhyLight.ModelicaParameter.prototype.Attributes.getValue = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Value');
    };
    CyPhyLight.ModelicaParameter.prototype.Attributes.setValue = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Value', value);
    };

    CyPhyLight.ModelicaParameter.prototype.Registry = {};
    CyPhyLight.ModelicaParameter.prototype.Registry.getPosition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };
    CyPhyLight.ModelicaParameter.prototype.Registry.setPosition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    CyPhyLight.ValueFlowComposition = function (nodeObj) {
        this._nodeObj = nodeObj;
        this.Attributes._nodeObj = this._nodeObj;
        this.Registry._nodeObj = this._nodeObj;
    };

    CyPhyLight.ValueFlowComposition.Type = "/-2/-19";

    CyPhyLight.ValueFlowComposition.createObj = function (parent, src, dst) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ValueFlowComposition.Type});
        CyPhyLight._core.setPointer(nodeObj, 'src', src.getNodeObj());
        CyPhyLight._core.setPointer(nodeObj, 'dst', dst.getNodeObj());
        return new CyPhyLight.ValueFlowComposition(nodeObj);
    };

    CyPhyLight.ValueFlowComposition.prototype.getNodeObj = function () { return this._nodeObj; };

    CyPhyLight.ValueFlowComposition.prototype.Attributes = {};
    CyPhyLight.ValueFlowComposition.prototype.Attributes.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };
    CyPhyLight.ValueFlowComposition.prototype.Attributes.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };

    CyPhyLight.ValueFlowComposition.prototype.Registry = {};
    CyPhyLight.ValueFlowComposition.prototype.Registry.getPosition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };
    CyPhyLight.ValueFlowComposition.prototype.Registry.setPosition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };



    CyPhyLight.ModelicaConnectorComposition = function (nodeObj) {
        this._nodeObj = nodeObj;
        this.Attributes._nodeObj = this._nodeObj;
        this.Registry._nodeObj = this._nodeObj;
    };

    CyPhyLight.ModelicaConnectorComposition.Type = "/-2/-19";

    CyPhyLight.ModelicaConnectorComposition.createObj = function (parent, src, dst) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ModelicaConnectorComposition.Type});
        CyPhyLight._core.setPointer(nodeObj, 'src', src.getNodeObj());
        CyPhyLight._core.setPointer(nodeObj, 'dst', dst.getNodeObj());
        return new CyPhyLight.ModelicaConnectorComposition(nodeObj);
    };

    CyPhyLight.ModelicaConnectorComposition.prototype.getNodeObj = function () { return this._nodeObj; };

    CyPhyLight.ModelicaConnectorComposition.prototype.Attributes = {};
    CyPhyLight.ModelicaConnectorComposition.prototype.Attributes.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };
    CyPhyLight.ModelicaConnectorComposition.prototype.Attributes.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };

    CyPhyLight.ModelicaConnectorComposition.prototype.Registry = {};
    CyPhyLight.ModelicaConnectorComposition.prototype.Registry.getPosition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };
    CyPhyLight.ModelicaConnectorComposition.prototype.Registry.setPosition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };


    return CyPhyLight;

});