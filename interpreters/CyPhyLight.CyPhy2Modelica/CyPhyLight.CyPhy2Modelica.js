/**
 * Created by Zsolt on 3/17/14.
 */

/**
 * Created by Zsolt on 3/5/14.
 */


define(['../../node_modules/webgme/common/LogManager'], function (logManager) {
	"use strict";

    var CyPhy2ModelicaInterpreter = function () {};

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
                }
            }

            // TODO: create 3 objects

            var newObjects = [];

            var newChild = core.createNode({parent:selectedNode, base: baseNode});
            core.setAttribute(newChild, 'name', 'Fake');


            // save project
            core.persist(rootNode, function(err) {});
            var newRootHash = core.getHash(rootNode);
            logger.info(project.makeCommit);
            result.commitHash = project.makeCommit([result.commitHash], newRootHash, 'Interpreter updated the model.', function(err) {

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