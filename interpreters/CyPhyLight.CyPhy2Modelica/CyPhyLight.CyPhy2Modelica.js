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

        // FIXME: this is a hack to get intellisense
        var CyPhyLight = METATypes;
        for (var name in config.META) {
            if (config.META.hasOwnProperty(name)) {
                CyPhyLight[name] = config.META[name];
            }
        }

        var newCyPhyProjectObj = core.createNode({parent: rootNode, base: CyPhyLight.CyPhyProject});
        core.setAttribute(newCyPhyProjectObj, 'name', 'New project');

        console.log(isMetaTypeOf(core, newCyPhyProjectObj, CyPhyLight.Connector));
        console.log(isMetaTypeOf(core, newCyPhyProjectObj, CyPhyLight.CyPhyProject));
        console.log(isMetaTypeOf(core, newCyPhyProjectObj, CyPhyLight.FCO));

        result = {'commitHash': config.commitHash};

        console.log(dataConfig);
        // root name
        console.log(core.getAttribute(rootNode, 'name'));

        // selected object name
        console.log(core.getAttribute(selectedNode, 'name'));

        // selected object position
        console.log(core.getRegistry(selectedNode, 'position'));

        // selected object children
        core.loadChildren(selectedNode, function (err, childNodes) {
            var baseNode = null;
            var len = childNodes.length;
            var metaKinds = {};
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