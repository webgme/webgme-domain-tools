/**
 * Created by Zsolt on 3/18/14.
 */

define([], function() {

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

    /********************************************************
     * Component
     ********************************************************/
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

    CyPhyLight.Component.prototype.createModelicaModel = function () {
        return CyPhyLight.ModelicaModel.createObj(this);
    };

    CyPhyLight.Component.prototype.createProperty = function () {
        return CyPhyLight.Property.createObj(this);
    };

    CyPhyLight.Component.prototype.createConnector = function () {
        return CyPhyLight.Connector.createObj(this);
    };

    CyPhyLight.Component.prototype.createModelicaConnector = function () {
        return CyPhyLight.ModelicaConnector.createObj(this);
    };

    CyPhyLight.Component.prototype.createValueFlowComposition = function (src, dst) {
        return CyPhyLight.ValueFlowComposition.createObj(this, src, dst);
    };

    CyPhyLight.Component.prototype.createModelicaConnectorComposition = function (src, dst) {
        return CyPhyLight.ModelicaConnectorComposition.createObj(this, src, dst);
    };

    /********************************************************
     * ModelicaModel
     ********************************************************/
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

    CyPhyLight.ModelicaModel.prototype.createModelicaConnector = function () {
        return CyPhyLight.ModelicaConnector.createObj(this);
    };

    CyPhyLight.ModelicaModel.prototype.createModelicaParameter = function () {
        return CyPhyLight.ModelicaParameter.createObj(this);
    };

    /********************************************************
     * Connector
     ********************************************************/
    CyPhyLight.Connector = function (nodeObj) {
        this._nodeObj = nodeObj;
        this.Attributes._nodeObj = this._nodeObj;
        this.Registry._nodeObj = this._nodeObj;
    };

    CyPhyLight.Connector.Type = "/-2/-19";

    CyPhyLight.Connector.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.Connector.Type});
        return new CyPhyLight.Connector(nodeObj);
    };

    CyPhyLight.Connector.prototype.getNodeObj = function () { return this._nodeObj; };

    CyPhyLight.Connector.prototype.Attributes = {};
    CyPhyLight.Connector.prototype.Attributes.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };
    CyPhyLight.Connector.prototype.Attributes.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };

    CyPhyLight.Connector.prototype.Registry = {};
    CyPhyLight.Connector.prototype.Registry.getPosition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    CyPhyLight.Connector.prototype.Registry.setPosition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };

    CyPhyLight.Connector.prototype.createModelicaConnector = function () {
        return CyPhyLight.ModelicaConnector.createObj(this);
    };

    /********************************************************
     * ModelicaConnector
     ********************************************************/
    CyPhyLight.ModelicaConnector = function (nodeObj) {
        this._nodeObj = nodeObj;
        this.Attributes._nodeObj = this._nodeObj;
        this.Registry._nodeObj = this._nodeObj;
    };

    CyPhyLight.ModelicaConnector.Type = "/-2/-19";

    CyPhyLight.ModelicaConnector.createObj = function (parent) {
        var nodeObj = CyPhyLight._core.createNode({parent: parent.getNodeObj(), base: CyPhyLight.ModelicaConnector.Type});
        return new CyPhyLight.ModelicaConnector(nodeObj);
    };

    CyPhyLight.ModelicaConnector.prototype.getNodeObj = function () { return this._nodeObj; };

    CyPhyLight.ModelicaConnector.prototype.Attributes = {};
    CyPhyLight.ModelicaConnector.prototype.Attributes.getname = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'name');
    };
    CyPhyLight.ModelicaConnector.prototype.Attributes.setname = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'name', value);
    };
    CyPhyLight.ModelicaConnector.prototype.Attributes.getClass = function () {
        return CyPhyLight._core.getAttribute(this._nodeObj, 'Class');
    };
    CyPhyLight.ModelicaConnector.prototype.Attributes.setClass = function (value) {
        return CyPhyLight._core.setAttribute(this._nodeObj, 'Class', value);
    };

    CyPhyLight.ModelicaConnector.prototype.Registry = {};
    CyPhyLight.ModelicaConnector.prototype.Registry.getPosition = function () {
        return CyPhyLight._core.getRegistry(this._nodeObj, 'position');
    };

    CyPhyLight.ModelicaConnector.prototype.Registry.setPosition = function (value) {
        return CyPhyLight._core.setRegistry(this._nodeObj, 'position', value);
    };

    CyPhyLight.ModelicaConnector.prototype.createModelicaParameter = function () {
        return CyPhyLight.ModelicaParameter.createObj(this);
    };

    /********************************************************
     * Property
     ********************************************************/
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

    /********************************************************
     * ModelicaParameter
     ********************************************************/
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


    /********************************************************
     * ValueFlowComposition
     ********************************************************/
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


    /********************************************************
     * ModelicaConnectorComposition
     ********************************************************/
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