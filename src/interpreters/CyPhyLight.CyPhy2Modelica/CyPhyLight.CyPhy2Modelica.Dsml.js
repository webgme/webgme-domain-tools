/**
 * Created by Zsolt on 3/17/14.
 */

'use strict';
define(['./CyPhyLight.Dsml'], function (CyPhyLight) {

    var CyPhy2ModelicaInterpreter = function () {};

    // TODO: move this function to an API
    var getMetaType = function (core, nodeObj, metaTypes) {
        var name;
        while (nodeObj) {
            name = core.getAttribute(nodeObj, 'name');
            if (metaTypes.hasOwnProperty(name) && core.getPath(metaTypes[name]) === core.getPath(nodeObj)) {

                break;
            }

            nodeObj = core.getBase(nodeObj);
        }

        return nodeObj;

    };

    var isMetaTypeOf = function (core, nodeObj, metaTypeObj) {

        while (nodeObj) {
            if (core.getGuid(nodeObj) === core.getGuid(metaTypeObj)) {

                return true;
            }

            nodeObj = core.getBase(nodeObj);
        }

        return false;

    };


    CyPhy2ModelicaInterpreter.prototype.doGUIConfig = function (preconfig, callback) {
        callback({'dataSourcePath': './src/samples/modelica_components.json'});
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
        var name;
        for (name in config.META) {
            if (config.META.hasOwnProperty(name)) {
                if (CyPhyLight.hasOwnProperty(name)) {
                    CyPhyLight[name].Type = config.META[name];
                } else {
                    CyPhyLight[name] = {};
                    CyPhyLight[name].Type = config.META[name];
                }
            }
        }

        // initialize domain specific API
        CyPhyLight.initialize(core, null);

        var newCyPhyProjectObj = core.createNode({parent: rootNode, base: CyPhyLight.CyPhyProject.Type});
        core.setAttribute(newCyPhyProjectObj, 'name', 'ProjectWithImported');

        console.log(isMetaTypeOf(core, newCyPhyProjectObj, CyPhyLight.Connector.Type));
        console.log(isMetaTypeOf(core, newCyPhyProjectObj, CyPhyLight.CyPhyProject.Type));
        console.log(isMetaTypeOf(core, newCyPhyProjectObj, CyPhyLight.FCO.Type));

        var componentsFolder = core.createNode({parent: newCyPhyProjectObj, base: CyPhyLight.Components.Type});
        core.setAttribute(componentsFolder, 'name', 'ImportedComponents');

        var componentObj = core.createNode({parent: componentsFolder, base: CyPhyLight.Component.Type});
        var component = new CyPhyLight.Component(componentObj);

        function getComponentName() {
            var uriPieces = dataConfig.exportedComponentClass.split('.');
            return uriPieces[uriPieces.length - 1];
        }

        component.Attributes.setname(getComponentName());

        var modelicaModel = CyPhyLight.ModelicaModel.createObj(component);
        modelicaModel.Attributes.setname(getComponentName().toLowerCase());
        modelicaModel.Attributes.setClass(dataConfig.exportedComponentClass);
        modelicaModel.Registry.setPosition({x: 300, y: 150});

        var parameters = {},
            connectors = {};
        var getComponentContent = function getComponentContentRec (modelicaURI) {
            console.log('Getting content for :: %j', modelicaURI);
            var idxC, currComponent,
                idxP, currParameter,
                idxCn, currConnector,
                idxE, currExtends,
                idxEp, currExtendsParameter;

            for (idxC = 0; idxC < dataConfig.components.length; idxC += 1) {
                currComponent = dataConfig.components[idxC];
                if (currComponent.fullName === modelicaURI) {
                    for (idxP = 0; idxP < currComponent.parameters.length; idxP += 1) {
                        currParameter = currComponent.parameters[idxP];
                        parameters[currParameter.name] = parameters[currParameter.name] || currParameter;
                    }
                    for (idxCn = 0; idxCn < currComponent.connectors.length; idxCn += 1) {
                        currConnector = currComponent.connectors[idxCn];
                        connectors[currConnector.name] = connectors[currConnector.name] || currConnector;
                    }
                    for (idxE = 0; idxE < currComponent.extends.length; idxE += 1) {
                        currExtends = currComponent.extends[idxE];
                        for (idxEp = 0; idxEp < currExtends.parameters.length; idxEp += 1) {
                            currExtendsParameter = currExtends.parameters[idxEp];
                            parameters[currExtendsParameter.name] = parameters[currExtendsParameter.name] || currExtendsParameter;
                        }
                        // Recursive Call is made here
                        getComponentContentRec(currExtends.fullName);
                    }
                    break;
                }
            }
        };

        getComponentContent(dataConfig.exportedComponentClass);

//        var setRegistry = function (node, name, value) {
//            node = coretree.getChild(node, REGISTRY);
//            coretree.setProperty(node, name, value);
//        };

//        var setPointer = function (node, name, target) {
//            ASSERT(isValidNode(node) && typeof name === "string" && (!target || isValidNode(target)));
//
//            deletePointer(node, name);
//
//            if (target) {
//                var ancestor = coretree.getAncestor(node, target);
//
//                var overlays = coretree.getChild(ancestor, OVERLAYS);
//                var sourcePath = coretree.getPath(node, ancestor);
//                var targetPath = coretree.getPath(target, ancestor);
//
//                overlayInsert(overlays, sourcePath, name, targetPath);
//            }
//        };
        var buildComponent = function () {
            var property,
                modelicaParameter,
                param,
                valueFlow,
                key,
                connector,
                modelicaConnector,
                modelicaConnectorCon,
                conn,
                connectorComp,
                y = 70,
                dY = 70;

            for (key in parameters) {
                if (parameters.hasOwnProperty(key)) {
                    param = parameters[key];
                    property = core.createNode({parent: component.getNodeObj(), base: CyPhyLight.Property.Type});
                    core.setAttribute(property, 'name', param.name);
                    core.setAttribute(property, 'Value', param.value);
                    core.setRegistry(property, 'position', {x: 70, y: y});

                    modelicaParameter = core.createNode({parent: modelicaModel.getNodeObj(), base: CyPhyLight.ModelicaParameter.Type});
                    core.setAttribute(modelicaParameter, 'name', param.name);
                    core.setAttribute(modelicaParameter, 'Value', param.value);
                    core.setRegistry(modelicaParameter, 'position', {x: 70, y: y});
                    y += dY;
                    console.log('Created Parameter : %j, with Value : %j',  param.name, param.value);
                    // Create connections
                    valueFlow = core.createNode({parent: component.getNodeObj(), base: CyPhyLight.ValueFlowComposition.Type});
                    core.setPointer(valueFlow, 'src', property);
                    core.setPointer(valueFlow, 'dst', modelicaParameter);
                }
            }
            y = 70;
            for (key in connectors) {
                if (connectors.hasOwnProperty(key)) {
                    conn = connectors[key];
                    connector = core.createNode({parent: component.getNodeObj(), base: CyPhyLight.Connector.Type});
                    core.setAttribute(connector, 'name', conn.name);
                    core.setRegistry(connector, 'position', {x: 800, y: y});
                    // Create a modelicaConnector in the connector,..
                    modelicaConnectorCon = core.createNode({parent: connector, base: CyPhyLight.ModelicaConnector.Type});
                    core.setAttribute(modelicaConnectorCon, 'name', conn.name);
                    core.setAttribute(modelicaConnectorCon, 'Class', conn.fullName);
                    core.setRegistry(modelicaConnectorCon, 'position', {x: 70, y: y});
                    // ..and one in the modelicaModel.
                    modelicaConnector = core.createNode({parent: modelicaModel.getNodeObj(), base: CyPhyLight.ModelicaConnector.Type});
                    core.setAttribute(modelicaConnector, 'name', conn.name);
                    core.setAttribute(modelicaConnector, 'Class', conn.fullName);
                    core.setRegistry(modelicaConnector, 'position', {x: 400, y: y});
                    y += dY;
                    console.log('Created Connector : %j, with Class : %j',  conn.name, conn.fullName);
                    // Create connections
                    connectorComp = core.createNode({parent: component.getNodeObj(), base: CyPhyLight.ModelicaConnectorComposition.Type});
                    core.setPointer(connectorComp, 'src', modelicaConnectorCon);
                    core.setPointer(connectorComp, 'dst', modelicaConnector);
                }
            }
        };

        buildComponent();

        result = {'commitHash': config.commitHash};

        // selected object children
        core.loadChildren(selectedNode, function (err, childNodes) {
//            var baseNode = null;
//            var len = childNodes.length;
//            while (len--) {
//                var childName = core.getAttribute(childNodes[len], 'name');
//                console.log(childName);
//                if (core.getAttribute(childNodes[len], 'name').toLowerCase() === 'solversettings') {
//                    baseNode = core.getBase(childNodes[len]);
//                    var metaObj = getMetaType(core, childNodes[len], METATypes);
//                    console.log(core.getPath(baseNode));
//                    console.log(core.getPath(metaObj));
//                }
//            }
//
//            var modelicaModel = core.createNode({parent: selectedNode, base: metaKinds.ModelicaModel});
//            core.setAttribute(modelicaModel, 'Class', 'Modelica.Does.Not.Exist');
//            var newObjects = [];
//            if (metaObj){
//                var newChild = core.createNode({parent:selectedNode, base: metaObj});
//                core.setAttribute(newChild, 'name', 'Fake');
//            }

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