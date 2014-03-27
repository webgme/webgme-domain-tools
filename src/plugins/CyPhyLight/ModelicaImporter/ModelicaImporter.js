/**
 * Created by Zsolt on 3/17/14.
 *
 */

'use strict';
define(['plugin/ModelicaImporter/ModelicaImporter/CyPhyLight', 'plugin/PluginConfig', 'plugin/PluginBase', 'plugin/ModelicaImporter/ModelicaImporter/samples/modelica_components'],
    function (METATypes, PluginConfig, PluginBase, DATACONFIG) {

    var ModelicaImporterPlugin = function () {};

    ModelicaImporterPlugin.prototype = Object.create(PluginBase.prototype);

    ModelicaImporterPlugin.getDefaultConfig = function () {
        return new PluginConfig();
    };
//
//    var DATACONFIG = require('../../../samples/modelica_components');

    ModelicaImporterPlugin.prototype.main = function (config, callback) {
        console.log('Inside main...');

        var rootNode = config.rootNode,
            selectedNode = config.selectedNode,
            core = config.core,
            project = config.project,
            dataConfig = DATACONFIG,
            result,
            CyPhyLight = METATypes,
            index,
            start = new Date(),
            nbrOfComponents = dataConfig.length,
            execTime,
            newCyPhyProjectObj,
            componentsFolder,
            component,
            modelicaModel;

        // FIXME: this is a hack to get intellisense
        var name;
        for (name in config.META) {
            if (config.META.hasOwnProperty(name)) {
                CyPhyLight[name] = config.META[name];
            }
        }

        newCyPhyProjectObj = core.createNode({parent: rootNode, base: CyPhyLight.CyPhyProject});
        core.setAttribute(newCyPhyProjectObj, 'name', 'ProjectWithImported');

        componentsFolder = core.createNode({parent: newCyPhyProjectObj, base: CyPhyLight.Components});
        core.setAttribute(componentsFolder, 'name', 'ImportedComponents');

        for (index = 0; index < nbrOfComponents; index += 1){
            var componentConfig = dataConfig[index],
                uriPieces = componentConfig.exportedComponentClass.split('.'),
                componentName = uriPieces[uriPieces.length - 1];

            component = core.createNode({parent: componentsFolder, base: CyPhyLight.Component});
            core.setAttribute(component, 'name', componentName);

            modelicaModel = core.createNode({parent: component, base: CyPhyLight.ModelicaModel});
            core.setAttribute(modelicaModel, 'name', componentName.toLowerCase());
            core.setAttribute(modelicaModel, 'Class', componentConfig.exportedComponentClass);
            core.setRegistry(modelicaModel, 'position', {x: 300, y: 150});
            var flatData = {
                parameters: {},
                connectors: {}
            };

            ModelicaImporterPlugin.getComponentContent(flatData, componentConfig, componentConfig.exportedComponentClass);
            ModelicaImporterPlugin.buildParameters(core, CyPhyLight, component, modelicaModel, flatData.parameters);
            ModelicaImporterPlugin.buildConnectors(core, CyPhyLight, component, modelicaModel, flatData.connectors);

        }

        // Commit changes.
        core.persist(rootNode, function (err) {
        });

        var newRootHash = core.getHash(rootNode);
        console.info(project.makeCommit);
        result = {'commitHash': config.commitHash};
        result.commitHash = project.makeCommit([result.commitHash], newRootHash, 'Plugin updated the model.', function (err) {

        });

        // Print statistics and call callback.
        console.log('Run done.');
        execTime = new Date() - start;
        console.log('Execution Time [n=%j] : %j ms', nbrOfComponents, execTime);
        if (callback) {
            callback(null, {'success': true, 'run_command': 'dir'});
        }
    };

//    ModelicaImporterPlugin.prototype.main = function (config, callback) {
//        console.log('Inside main ...');
//        callback(null, {success:true});
//    };


//    ModelicaImporterPlugin.prototype.progress = function (percent, title, description) {
//        throw new Error('implement this function');
//    };


//    ModelicaImporterPlugin.prototype.checkModel = function () {
//        throw new Error('implement this function');
//    };

//    ModelicaImporterPlugin.getName = function () {
//        throw new Error('implement this function');
//    };
//
//    ModelicaImporterPlugin.getVersion = function () {
//        throw new Error('implement this function');
//    };
//
//    ModelicaImporterPlugin.getSupportedContexts = function () {
//        throw new Error('implement this function');
//    };


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


    ModelicaImporterPlugin.prototype.doGUIConfig = function (preconfig, callback) {
        callback({'dataSourcePath': './src/samples/modelica_components.json'});
    };

    ModelicaImporterPlugin.prototype.run2 = function (config, callback) {

        console.log('Run started..');

        var rootNode = config.rootNode,
            selectedNode = config.selectedNode,
            core = config.core,
            project = config.project,
            dataConfig = config.dataConfig,
            result,
            CyPhyLight = METATypes;


        // root name
        console.log(core.getAttribute(rootNode, 'name'));

        // selected object name
        console.log(core.getAttribute(selectedNode, 'name'));

        // selected object position
        console.log(core.getRegistry(selectedNode, 'position'));

        var newCyPhyProjectObj = core.createNode({parent: rootNode});
        core.setAttribute(newCyPhyProjectObj, 'name', 'ProjectWithImported');

        var componentsFolder = core.createNode({parent: newCyPhyProjectObj, base: newCyPhyProjectObj});
        core.setAttribute(componentsFolder, 'name', 'ImportedComponents');

        console.log('done.');
    };

    ModelicaImporterPlugin.getComponentContent = function getComponentContentRec (flatData, componentConfig, currentModelicaURI) {
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

    ModelicaImporterPlugin.buildParameters = function (core, CyPhyLight, component, modelicaModel, parameters) {
        var property,
            modelicaParameter,
            param,
            valueFlow,
            i,
            keys,
            len,
            y = 70,
            dY = 70;

        keys = Object.keys(parameters);
        len = keys.length;
        for (i = 0; i < len; i += 1){
            param = parameters[keys[i]];
            property = core.createNode({parent: component, base: CyPhyLight.Property});
            core.setAttribute(property, 'name', param.name);
            core.setAttribute(property, 'Value', param.value);
            core.setRegistry(property, 'position', {x: 70, y: y});

            modelicaParameter = core.createNode({parent: modelicaModel, base: CyPhyLight.ModelicaParameter});
            core.setAttribute(modelicaParameter, 'name', param.name);
            core.setAttribute(modelicaParameter, 'Value', param.value);
            core.setRegistry(modelicaParameter, 'position', {x: 70, y: y});
            y += dY;
            console.log('Created Parameter : %j, with Value : %j',  param.name, param.value);
            // Create connections.
            valueFlow = core.createNode({parent: component, base: CyPhyLight.ValueFlowComposition});
            core.setPointer(valueFlow, 'src', property);
            core.setPointer(valueFlow, 'dst', modelicaParameter);
        }
    };

    ModelicaImporterPlugin.buildConnectors = function (core, CyPhyLight, component, modelicaModel, connectors) {
        var connector,
            modelicaConnector,
            modelicaConnectorCon,
            conn,
            connectorComp,
            i,
            keys,
            len,
            y = 70,
            dY = 70;

        keys = Object.keys(connectors);
        len = keys.length;
        for (i = 0; i < len; i += 1){
            conn = connectors[keys[i]];
            connector = core.createNode({parent: component, base: CyPhyLight.Connector});
            core.setAttribute(connector, 'name', conn.name);
            core.setRegistry(connector, 'position', {x: 800, y: y});
            // Create a modelicaConnector in the connector,..
            modelicaConnectorCon = core.createNode({parent: connector, base: CyPhyLight.ModelicaConnector});
            core.setAttribute(modelicaConnectorCon, 'name', conn.name);
            core.setAttribute(modelicaConnectorCon, 'Class', conn.fullName);
            core.setRegistry(modelicaConnectorCon, 'position', {x: 70, y: y});
            // ..and one in the modelicaModel.
            modelicaConnector = core.createNode({parent: modelicaModel, base: CyPhyLight.ModelicaConnector});
            core.setAttribute(modelicaConnector, 'name', conn.name);
            core.setAttribute(modelicaConnector, 'Class', conn.fullName);
            core.setRegistry(modelicaConnector, 'position', {x: 400, y: y});
            y += dY;
            console.log('Created Connector : %j, with Class : %j',  conn.name, conn.fullName);
            // Create connections.
            connectorComp = core.createNode({parent: component, base: CyPhyLight.ModelicaConnectorComposition});
            core.setPointer(connectorComp, 'src', modelicaConnectorCon);
            core.setPointer(connectorComp, 'dst', modelicaConnector);
        }
    };

    return ModelicaImporterPlugin;
});