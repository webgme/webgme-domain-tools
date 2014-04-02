/**
 * Created by Dana Zhang on 3/31/2014.
 */
define(['plugin/PluginConfig',
    'plugin/PluginBase',
    'plugin/PluginResult'], function (PluginConfig, PluginBase, PluginResult) {
    'use strict';

    var PetriNetExporterPlugin = function () {
        PluginBase.call(this);
    };

    PetriNetExporterPlugin.prototype = Object.create(PluginBase.prototype);

    PetriNetExporterPlugin.prototype.getName = function () {
        return 'PetriNetExporter';
    };

    PetriNetExporterPlugin.prototype.main = function (callback) {
        var self = this,
            core = self.core,
            selectedNode = self.activeNode;

        var pluginResult = new PluginResult();

        if (!selectedNode) {
            callback('selectedNode is not defined', pluginResult);
        }


        // TODO: this is not the right way to do it..., but a way at least
        this.objectToVisit = 0; // number of objects that have to be visited
        this.visitedObjects = 0; // number of already visited

        this.objectToVisit += 1; // we need to visit the selected node

        core.loadChildren(selectedNode, function(err, childNodes) {
            self.visitObject(err, childNodes, core, callback);
        });
    };

    PetriNetExporterPlugin.prototype.visitObject = function (err, childNodes, core, callback) {
        var self = this;

        this.objectToVisit += childNodes.length; // all child objects have to be visited

        var i;
        for (i = 0; i < childNodes.length; ++i) {
            var name = core.getAttribute(childNodes[i], 'name');
            this.logger.info('Visiting: ' + name);

            // TODO: do something here with this object

            core.loadChildren(childNodes[i], function(err, childNodes) {
                self.visitObject(err, childNodes, core, callback);
            });
        }

        this.visitedObjects += 1; // another object was just visited

        if (this.objectToVisit === this.visitedObjects) {
            this.fs.addFile('generatedFile.json', JSON.stringify({'name':'some content'}));
            this.fs.addFile('generatedFile.html', '<html><body>Hello world from an xml</body></html>');
            this.fs.saveArtifact();

            // all objects have been visited
            var pluginResult = new PluginResult();
            pluginResult.success = true;
            if (callback) {
                callback(null, pluginResult);
            }
        } else {
            // some objects still need to be visited
            this.logger.info('Visiting progress: ' + this.visitedObjects + '/' + this.objectToVisit);
        }
    };

    return PetriNetExporterPlugin;
});