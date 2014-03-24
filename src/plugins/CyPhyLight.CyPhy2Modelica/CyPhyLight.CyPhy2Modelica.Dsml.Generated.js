/**
 * Created by Zsolt on 3/17/14.
 */

'use strict';
define(['./CyPhyLight.Dsml'], function (CyPhyLight) {

    var CyPhy2ModelicaPlugin = function () {};

    CyPhy2ModelicaPlugin.prototype.doGUIConfig = function (preconfig, callback) {
        callback({'dataSourcePath': './src/samples/modelica_components.json'});
    };

    CyPhy2ModelicaPlugin.prototype.main = function (config, callback) {
        console.log('Run started..');
        var rootNode = config.rootNode,
            core = config.core,
            project = config.project,
            dataConfig = config.dataConfig,
            result,
            index,
            start = new Date(),
            execTime,
            nbrOfComponents = dataConfig.length;

        // initialize domain specific API
        CyPhyLight.initialize(core, null, config.META);

        var newCyPhyProjectObj = core.createNode({parent: rootNode, base: CyPhyLight.CyPhyProject.Type});
        core.setAttribute(newCyPhyProjectObj, 'name', 'ProjectWithImported');

        var componentsFolder = core.createNode({parent: newCyPhyProjectObj, base: CyPhyLight.Components.Type});
        core.setAttribute(componentsFolder, 'name', 'ImportedComponents');

        for (index = 0; index < nbrOfComponents; index += 1){
            var componentConfig = dataConfig[index];
            var componentObj = core.createNode({parent: componentsFolder, base: CyPhyLight.Component.Type});
            var component = new CyPhyLight.Component(componentObj);
            var uriPieces = componentConfig.exportedComponentClass.split('.');
            var componentName = uriPieces[uriPieces.length - 1];
            component.attributes.setname(componentName);

            var modelicaModel = component.createModelicaModel();
            modelicaModel.registry.setposition({x: 300, y: 150});

            var parameters = {},
                connectors = {};
            var getComponentContent = function getComponentContentRec (modelicaURI) {
                console.log('Getting content for :: %j', modelicaURI);
                var idxC, currComponent,
                    idxP, currParameter,
                    idxCn, currConnector,
                    idxE, currExtends,
                    idxEp, currExtendsParameter;

                for (idxC = 0; idxC < componentConfig.components.length; idxC += 1) {
                    currComponent = componentConfig.components[idxC];
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

            getComponentContent(componentConfig.exportedComponentClass);

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

                        property = component.createProperty();
                        property.attributes.setname(param.name);
                        property.attributes.setValue(param.value);
                        property.registry.setposition({x: 70, y: y});

                        modelicaParameter = modelicaModel.createModelicaParameter();
                        modelicaParameter.attributes.setname(param.name);
                        modelicaParameter.attributes.setValue(param.value);
                        modelicaParameter.registry.setposition({x: 70, y: y});

                        y += dY;
                        console.log('Created Parameter : %j, with Value : %j',  param.name, param.value);
                        // Create connections
                        CyPhyLight.ValueFlowComposition.createObj(component, property, modelicaParameter);
                    }
                }
                y = 70;
                for (key in connectors) {
                    if (connectors.hasOwnProperty(key)) {
                        conn = connectors[key];
                         // Create a connector
                        connector = component.createConnector();
                        connector.attributes.setname(conn.name);
                        connector.registry.setposition({x: 800, y: y});
                        // Create a modelicaConnector in the connector,..
                        modelicaConnectorCon = connector.createModelicaConnector();
                        modelicaConnectorCon.attributes.setname(conn.name);
                        modelicaConnectorCon.attributes.setClass(conn.fullName);
                        modelicaConnectorCon.registry.setposition({x: 70, y: y});
                        // ..and one in the modelicaModel.
                        modelicaConnector = modelicaModel.createModelicaConnector();
                        modelicaConnector.attributes.setname(conn.name);
                        modelicaConnector.attributes.setClass(conn.fullName);
                        modelicaConnectorCon.registry.setposition({x: 400, y: y});

                        y += dY;
                        console.log('Created Connector : %j, with Class : %j',  conn.name, conn.fullName);

                        CyPhyLight.ModelicaConnectorComposition.createObj(component, modelicaConnectorCon, modelicaConnector);
                    }
                }
            };

            buildComponent();
        }

        core.persist(rootNode, function (err) {
        });
        var newRootHash = core.getHash(rootNode);
        console.info(project.makeCommit);
        result = {'commitHash': config.commitHash};
        result.commitHash = project.makeCommit([result.commitHash], newRootHash, 'Plugin updated the model.', function (err) {

        });

        console.log('Run done.');
        execTime = new Date() - start;
        console.log('Execution Time [n=%j] : %j ms', nbrOfComponents, execTime);
        if (callback) {
            callback({'success': true, 'run_command': 'dir'});
        }

        // selected object children
//        core.loadChildren(selectedNode, function (err, childNodes) {
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
//
//            // save project
//
//        });
    };

    console.log('ssssss');

    return CyPhy2ModelicaPlugin;
});