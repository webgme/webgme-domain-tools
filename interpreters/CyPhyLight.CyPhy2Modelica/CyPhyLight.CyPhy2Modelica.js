/**
 * Created by Zsolt on 3/17/14.
 */

'use strict';
define([], function () {


    var CyPhy2ModelicaInterpreter = function () {
    };

    CyPhy2ModelicaInterpreter.prototype.doGUIConfig = function (preconfig, callback)
    {
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

        result = {'commitHash': config.commitHash};

        console.log(dataConfig);
        // root name
        console.log(core.getAttribute(rootNode, 'name'));

        // selected object name
        console.log(core.getAttribute(selectedNode, 'name'));

        // selected object position
        console.log(core.getRegistry(selectedNode, 'position'));

//        var metaKindBases = {
//            'ModelicaModel': core.loadByPath(rootNode, '/-2/-23', function (err, selectedNode) {
//                return selectedNode;
//            }),
//            'ModelicaConnector': core.loadByPath(rootNode, '/-2/-28', function (err, selectedNode) {
//                return selectedNode;
//            }),
//            'ModelicaParameter': core.loadByPath(rootNode, '/-2/-39', function (err, selectedNode) {
//                return selectedNode;
//            }),
//            'Connector': core.loadByPath(rootNode, '/-2/-27', function (err, selectedNode) {
//                return selectedNode;
//            }),
//            'Parameter': core.loadByPath(rootNode, '/-2/-33', function (err, selectedNode) {
//                return selectedNode;
//            }),
//            'Property': core.loadByPath(rootNode, '/-2/-30', function (err, selectedNode) {
//                return selectedNode;
//            })
//        };

        //var modelicaModel = core.createNode({parent:selectedNode, base: metaKindBases.ModelicaModel});
        //core.setAttribute(modelicaModel, 'name', 'Fake');
//        console.log('========= %j', core.getAttribute(metaKindBases.ModelicaModel, 'name'));

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
                } else if (childName === 'damper'){
                    metaKinds['ModelicaModel'] = core.getBase(childNodes[len]);
                } else if (childName === 'd'){
                    metaKinds['Property'] = core.getBase(childNodes[len]);
                }else if (childName === 'flange_a'){
                    metaKinds['Connector'] = core.getBase(childNodes[len]);
                }
            }

            var modelicaModel = core.createNode({parent: selectedNode, base: metaKinds.ModelicaModel});
            core.setAttribute(modelicaModel, 'Class', 'Modelica.Does.Not.Exist');
            //var newObjects = [];

            //var newChild = core.createNode({parent:selectedNode, base: baseNode});
            //core.setAttribute(newChild, 'name', 'Fake');


            // save project
            //core.persist(rootNode, function(err) {});
            //var newRootHash = core.getHash(rootNode);
            //console.log(project.makeCommit);
            //result.commitHash = project.makeCommit([result.commitHash], newRootHash, 'Interpreter updated the model.', function(err) {

            //});

            console.log('Run done.');
            if (callback) {
                callback({'success': true, 'run_command': 'dir'});
            }
        });
    };

    console.log('ssssss');

    return CyPhy2ModelicaInterpreter;
});