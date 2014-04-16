/**
 * Created by pmeijer on 3/26/2014.
 */
define(['plugin/PluginConfig', 'plugin/PluginBase'], function (PluginConfig, PluginBase) {
    'use strict';

    var ChildrenSaveArtifacts = function () {
        // Call base class's constructor
        PluginBase.call(this);
        this.mainArtifact = null;
    };

    ChildrenSaveArtifacts.prototype = Object.create(PluginBase.prototype);

    ChildrenSaveArtifacts.prototype.constructor = ChildrenSaveArtifacts;

    ChildrenSaveArtifacts.prototype.getName = function () {
        return "Children Save Artifacts";
    };

    ChildrenSaveArtifacts.prototype.main = function (callback) {
        var self = this,
            activeNode = this.activeNode;

        if (!self.blobClient) {
            callback('BlobClient object is undefined or null.', self.result);
            return;
        }

        // note no extension here
        self.mainArtifact = self.blobClient.createArtifact('My-generated-files');


        var localArtifact = self.blobClient.createArtifact('My-other-empty-artifact');

        if (!activeNode) {
            callback('activeNode is not defined', self.result);
            return;
        }



        self.generateNodeInfo(activeNode, function (err) {
            if (err) {
                callback(err, self.result);
                return;
            }

            self.core.loadChildren(activeNode, function (err, childNodes) {
                var i;
                self.logger.info(self.core.getAttribute(activeNode, 'name') + ' has children.');

                var remaining = childNodes.length;

                for (i = 0; i < childNodes.length; i += 1) {
                    self.logger.info('  - ' + self.core.getAttribute(childNodes[i], 'name'));

                    (function(childNode) {
                        self.generateNodeInfo(childNode, function (err) {
                            remaining -= 1;

                            if (err) {
                                // TODO: do something?
                                return;
                            }

                            if (remaining === 0) {
                                // finalize ...
                                self.blobClient.saveAllArtifacts(function(err, hashes) {
                                    if (err) {
                                        callback(err, self.result);
                                        return;
                                    }

                                    self.logger.info('Artifacts are saved here: ');
                                    self.logger.info(hashes);

                                    // result add hashes
                                    for (var j = 0; j < hashes.length; j += 1) {
                                        self.result.addArtifact(hashes[j]);
                                    }

                                    self.result.setSuccess(true);
                                    callback(null, self.result);
                                });
                            }

                        });
                    })(childNodes[i]);
                }


            });

        });

    };

    ChildrenSaveArtifacts.prototype.generateNodeInfo = function (node, callback) {
        var self = this,
            info = '';

        info += 'Name: ';
        info += self.core.getAttribute(node, 'name');
        info += '\r\n';


        info += 'Path: ';
        info += self.core.getPath(node);
        info += '\r\n';


        info += 'Guid: ';
        info += self.core.getGuid(node);
        info += '\r\n';

        // FIXME: check if name is safe as a directory name
        self.mainArtifact.addFile(self.core.getAttribute(node, 'name') + '/' + self.core.getGuid(node) + '.txt', info, callback);
    };

    return ChildrenSaveArtifacts;
});