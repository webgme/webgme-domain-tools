/**
 * Created by Zsolt on 3/17/14.
 */

/**
 * Created by Zsolt on 3/5/14.
 */


define([], function () {
	"use strict";

    var CyPhy2ModelicaInterpreter = function () {};

    CyPhy2ModelicaInterpreter.prototype.run = function (config, callback) {
        console.log('Run started.');

        // TODO: check config structure
        // TODO: set default parameters

        var rootNode = config.rootNode,
            selectedNode = config.selectedNode,
            core = config.core,
            project = config.project,
            result;

        result = {'commitHash': config.commitHash};

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

            while (len--) {
                console.log(core.getAttribute(childNodes[len], 'name'));
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
            console.log(project.makeCommit);
            result.commitHash = project.makeCommit([result.commitHash], newRootHash, 'Interpreter updated the model.', function(err) {

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