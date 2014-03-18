/**
 * Created by Zsolt on 3/17/14.
 */

'use strict';
define(['./CyPhyLight'], function (METATypes) {

    var CyPhy2ModelicaInterpreter = function() {};

    // TODO: move this function to an API
    var getMetaType = function (core, nodeObj, metaTypes) {

        while (nodeObj) {
            var name = core.getAttribute(nodeObj, 'name');
            if (metaTypes.hasOwnProperty(name) && core.getPath(metaTypes[name]) === core.getPath(nodeObj)) {

                break;
            } else {

                nodeObj = core.getBase(nodeObj);
            }
        }

        return nodeObj;

    };

    var isMetaTypeOf = function (core, nodeObj, metaTypeObj) {

        while (nodeObj) {
            if (core.getGuid(nodeObj) === core.getGuid(metaTypeObj)) {

                return true;
            } else {

                nodeObj = core.getBase(nodeObj);
            }
        }

        return false;

    };


    CyPhy2ModelicaInterpreter.prototype.doGUIConfig = function (preconfig, callback) {
        callback({'dataSourcePath': './samples/modelica_components.json'});
    };


    CyPhy2ModelicaInterpreter.prototype.run = function (config, callback) {
        console.log('Run started..');

        var rootNode = config.rootNode,
            selectedNode = config.selectedNode,
            core = config.core,
            project = config.project,
            dataConfig = config.dataConfig,
            result;

        console.log(dataConfig);
        // root name
        console.log(core.getAttribute(rootNode, 'name'));

        // selected object name
        console.log(core.getAttribute(selectedNode, 'name'));

        // selected object position
        console.log(core.getRegistry(selectedNode, 'position'));

        // FIXME: this is a hack to get intellisense
        var CyPhyLight = METATypes;
        for (var name in config.META) {
            if (config.META.hasOwnProperty(name)) {
                CyPhyLight[name] = config.META[name];
            }
        }

        var newCyPhyProjectObj = core.createNode({parent: rootNode, base: CyPhyLight.CyPhyProject});
        core.setAttribute(newCyPhyProjectObj, 'name', 'ProjectWithImported');

        console.log(isMetaTypeOf(core, newCyPhyProjectObj, CyPhyLight.Connector));
        console.log(isMetaTypeOf(core, newCyPhyProjectObj, CyPhyLight.CyPhyProject));
        console.log(isMetaTypeOf(core, newCyPhyProjectObj, CyPhyLight.FCO));

        var componentsFolder = core.createNode({parent: newCyPhyProjectObj, base: CyPhyLight.Components});
        core.setAttribute(componentsFolder, 'name', 'ImportedComponents');
        var component = core.createNode({parent: componentsFolder, base: CyPhyLight.Component});

        function getComponentName()
        {
            var uriPieces = dataConfig.exportedComponentClass.split('.');
            return uriPieces[uriPieces.length - 1];
        }

        core.setAttribute(component, 'name', getComponentName());

        var modelicaModel = core.createNode({parent: component, base: CyPhyLight.ModelicaModel});
        core.setAttribute(modelicaModel, 'name', getComponentName().toLowerCase());
        core.setAttribute(modelicaModel, 'Class', dataConfig.exportedComponentClass);

        var parameters = {};
        var connectors = {};
        function getComponentContentRec (modelicaURI) {
            console.log('Getting content for :: %j', modelicaURI);
            var cLen = dataConfig.components.length;
            // Iterating backwards is probably inefficient in this case.
            while (cLen--) {
                var currComponent = dataConfig.components[cLen];
                if (currComponent.fullName === modelicaURI)
                {
                    var pLen = currComponent.parameters.length;
                    while (pLen--) {
                        var currParameter = currComponent.parameters[pLen];
                        parameters[currParameter.name] = parameters[currParameter.name] || currParameter;
                    }

                    var cnLen = currComponent.connectors.length;
                    while (cnLen--) {
                        var currConnector = currComponent.connectors[cnLen];
                        connectors[currConnector.name] = connectors[currConnector.name] || currConnector;
                    }

                    var eLen = currComponent.extends.length;
                    while (eLen--) {
                        var currExtends = currComponent.extends[eLen];
                        var epLen = currExtends.parameters.length;
                        while (epLen--) {
                            var currExtendsParameter = currExtends.parameters[epLen];
                            parameters[currExtendsParameter.name] = parameters[currExtendsParameter.name] || currExtendsParameter;
                        }
                        // Recursive Call is made here
                        getComponentContentRec(currExtends.fullName);
                    }
                    break;
                }
            }
        }

        getComponentContentRec(dataConfig.exportedComponentClass);

        var property;
        var modelicaParameter;
        // These two iterations should probably check for hasOwnProperty, however these are coming from a jsonObject.
        for (var param in parameters)
        {
            property = core.createNode({parent: component, base: CyPhyLight.Property});
            core.setAttribute(property, 'name', parameters[param].name);
            core.setAttribute(property, 'Value', parameters[param].value);

            modelicaParameter = core.createNode({parent: modelicaModel, base: CyPhyLight.ModelicaParameter});
            core.setAttribute(modelicaParameter, 'name', parameters[param].name);
            core.setAttribute(modelicaParameter, 'Value', parameters[param].value);
            console.log('Created Parameter : %j, with Value : %j',  parameters[param].name, parameters[param].value);
        }

        var connector;
        var modelicaConnector;
        for (var conn in connectors)
        {
            connector = core.createNode({parent: component, base: CyPhyLight.Connector});
            core.setAttribute(connector, 'name', connectors[conn].name);

            // Create a modelicaConnector in the connector,..
            modelicaConnector = core.createNode({parent: connector, base: CyPhyLight.ModelicaConnector});
            core.setAttribute(modelicaConnector, 'name', connectors[conn].name);
            core.setAttribute(modelicaConnector, 'Class', connectors[conn].fullName);

            // ..and one in the modelicaModel.
            modelicaConnector = core.createNode({parent: modelicaModel, base: CyPhyLight.ModelicaConnector});
            core.setAttribute(modelicaConnector, 'name', connectors[conn].name);
            core.setAttribute(modelicaConnector, 'Class', connectors[conn].fullName);
            console.log('Created Connector : %j, with Class : %j',  connectors[conn].name, connectors[conn].fullName);
        }

        result = {'commitHash': config.commitHash};

        // selected object children
        core.loadChildren(selectedNode, function (err, childNodes) {
            var baseNode = null;
            var len = childNodes.length;
            while (len--) {
                var childName = core.getAttribute(childNodes[len], 'name');
                console.log(childName);
                if (core.getAttribute(childNodes[len], 'name').toLowerCase() === 'solversettings') {
                    baseNode = core.getBase(childNodes[len]);
                    var metaObj = getMetaType(core, childNodes[len], METATypes);
                    console.log(core.getPath(baseNode));
                    console.log(core.getPath(metaObj));
                }
            }

            //var modelicaModel = core.createNode({parent: selectedNode, base: metaKinds.ModelicaModel});
            //core.setAttribute(modelicaModel, 'Class', 'Modelica.Does.Not.Exist');
            //var newObjects = [];
            if (metaObj){
                var newChild = core.createNode({parent:selectedNode, base: metaObj});
                core.setAttribute(newChild, 'name', 'Fake');
            }

            // save project
            core.persist(rootNode, function (err) {
            });
            var newRootHash = core.getHash(rootNode);
            console.info(project.makeCommit);
            result.commitHash = project.makeCommit([result.commitHash], newRootHash, 'Interpreter updated the model.', function (err) {

            });

            console.log('Run done.');
            if (callback) {
                callback({'success': true, 'run_command': 'dir'});
            }
        });
    };

    console.log('ssssss');

    return CyPhy2ModelicaInterpreter;
});