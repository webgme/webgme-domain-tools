/**
 * Created by Zsolt on 3/5/14.
 */


define(['../../node_modules/webgme/common/LogManager', './CyPhyLight'], function (logManager, METATypes) {
    "use strict";

    var CyPhy2ModelicaInterpreter = function () {
    };

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


    CyPhy2ModelicaInterpreter.prototype.doGUIConfig = function (GUI, preconfig, callback) {
        var result = GUI(this.getDefaultConfig);
        callback(result);
    };

    CyPhy2ModelicaInterpreter.prototype.run = function (config, callback) {
        // Setup the logger.
        logManager.setLogLevel(logManager.logLevels.DEBUG);
        // Will only log to file.
        logManager.setFileLogPath('CyPhy2ModelicaInterpreter.log');
        // Create an instance of it.
        var logger = logManager.create('CyPhy2ModelicaInterpreter');

        logger.info('Run started..');
        // TODO: check config structure
        // TODO: set default parameters
        var rootNode = config.rootNode,
            selectedNode = config.selectedNode,
            core = config.core,
            project = config.project,
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

        // root name
        logger.info(core.getAttribute(rootNode, 'name'));

        // selected object name
        logger.info(core.getAttribute(selectedNode, 'name'));

        // selected object position
        logger.info(core.getRegistry(selectedNode, 'position'));

        // selected object children
        core.loadChildren(selectedNode, function (err, childNodes) {
            var baseNode = null;
            var len = childNodes.length;

            while (len--) {
                logger.debug(core.getAttribute(childNodes[len], 'name'));
                if (core.getAttribute(childNodes[len], 'name').toLowerCase() === 'solversettings') {
                    baseNode = core.getBase(childNodes[len]);
                    var metaObj = getMetaType(core, childNodes[len], METATypes);
                    console.log(core.getPath(baseNode));
                    console.log(core.getPath(metaObj));
                }
            }

            // TODO: create 3 objects

            var newObjects = [];

            var newChild = core.createNode({parent: selectedNode, base: baseNode});
            core.setAttribute(newChild, 'name', 'Fake');


            // save project
            core.persist(rootNode, function (err) {
            });
            var newRootHash = core.getHash(rootNode);
            logger.info(project.makeCommit);
            result.commitHash = project.makeCommit([result.commitHash], newRootHash, 'Interpreter updated the model.', function (err) {

            });

            logger.info('Run done.');
            if (callback) {
                callback({'success': true, 'run_command': 'dir'});
            }
        });
    };

    console.log('ssssss');

    return CyPhy2ModelicaInterpreter;
});