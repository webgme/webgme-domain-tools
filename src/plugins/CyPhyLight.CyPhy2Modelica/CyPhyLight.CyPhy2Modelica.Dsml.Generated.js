/**
 * Created by Zsolt on 3/17/14.
 */

'use strict';
define(['./CyPhyLight.Dsml','src/PluginManager/PluginConfig', 'src/PluginManager/PluginBase'],
        function (CyPhyLight, PluginConfig, PluginBase ) {

    var CyPhy2ModelicaPlugin = function () {};

    CyPhy2ModelicaPlugin.prototype = Object.create(PluginBase.prototype);

    CyPhy2ModelicaPlugin.getDefaultConfig = function () {
        return new PluginConfig();
    };

//    CyPhy2ModelicaPlugin.prototype.doGUIConfig = function (preconfig, callback) {
//        callback({'dataSourcePath': './src/samples/modelica_components.json'});
//    };

    var DATACONFIG = require('src/samples/modelica_components');

    CyPhy2ModelicaPlugin.prototype.main = function (config, callback) {
        console.log('Run started..');
        var rootNode = config.rootNode,
            core = config.core,
            project = config.project,
            dataConfig = DATACONFIG,
            result,
            index,
            start = new Date(),
            execTime,
            nbrOfComponents = dataConfig.length,
            newCyPhyProjectObj,
            componentsFolderObj,
            componentsFolder,
            component,
            modelicaModel;

        // initialize domain specific API.
        CyPhyLight.initialize(core, null, config.META);

        // This is still done through the core-API.
        newCyPhyProjectObj = core.createNode({parent: rootNode, base: CyPhyLight.CyPhyProject.Type});
        core.setAttribute(newCyPhyProjectObj, 'name', 'ProjectWithImported');

        componentsFolderObj = core.createNode({parent: newCyPhyProjectObj, base: CyPhyLight.Components.Type});
        core.setAttribute(componentsFolderObj, 'name', 'ImportedComponents');

        // No more core-API from this point and forward.
        componentsFolder = new CyPhyLight.Components(componentsFolderObj);

        for (index = 0; index < nbrOfComponents; index += 1){
            var componentConfig = dataConfig[index],
                uriPieces = componentConfig.exportedComponentClass.split('.'),
                componentName = uriPieces[uriPieces.length - 1];

            component = componentsFolder.createComponent();
            component.attributes.setname(componentName);

            modelicaModel = component.createModelicaModel();
            modelicaModel.attributes.setname(componentName.toLowerCase());
            modelicaModel.attributes.setClass(componentConfig.exportedComponentClass);
            modelicaModel.registry.setposition({x: 300, y: 150});

            var flatData = {
                parameters: {},
                connectors: {}
            };

            CyPhy2ModelicaPlugin.getComponentContent(flatData, componentConfig, componentConfig.exportedComponentClass);
            CyPhy2ModelicaPlugin.buildParameters(CyPhyLight, component, modelicaModel, flatData.parameters);
            CyPhy2ModelicaPlugin.buildConnectors(CyPhyLight, component, modelicaModel, flatData.connectors);
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

    CyPhy2ModelicaPlugin.getComponentContent = function getComponentContentRec (flatData, componentConfig, currentModelicaURI) {
        console.log('Getting content for :: %j', currentModelicaURI);
        var idxC, currComponent,
            idxP, currParameter,
            idxCn, currConnector,
            idxE, currExtends,
            idxEp, currExtendsParameter,
            parameters = flatData.parameters,
            connectors = flatData.connectors;

        for (idxC = 0; idxC < componentConfig.components.length; idxC += 1) {
            currComponent = componentConfig.components[idxC];
            if (currComponent.fullName === currentModelicaURI) {
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
                    getComponentContentRec(flatData, componentConfig, currExtends.fullName);
                }
                break;
            }
        }
    };

    CyPhy2ModelicaPlugin.buildParameters = function (CyPhyLight, component, modelicaModel, parameters) {
        var property,
            modelicaParameter,
            param,
            i,
            keys,
            len,
            y = 70,
            dY = 70;

        keys = Object.keys(parameters);
        len = keys.length;
        for (i = 0; i < len; i += 1){
            param = parameters[keys[i]];
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
    };

    CyPhy2ModelicaPlugin.buildConnectors = function (CyPhyLight, component, modelicaModel, connectors) {
        var connector,
            modelicaConnector,
            modelicaConnectorCon,
            conn,
            i,
            keys,
            len,
            y = 70,
            dY = 70;

        keys = Object.keys(connectors);
        len = keys.length;
        for (i = 0; i < len; i += 1){
            conn = connectors[keys[i]];
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
    };

    return CyPhy2ModelicaPlugin;
});