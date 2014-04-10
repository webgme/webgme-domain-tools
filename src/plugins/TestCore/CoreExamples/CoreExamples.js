/**
* Generated by PluginGenerator from webgme on Mon Apr 07 2014 15:59:37 GMT-0500 (Central Daylight Time)
 * Run this with activeNode "/1023960100"
*/

define(['plugin/PluginConfig', 'plugin/PluginBase'], function (PluginConfig, PluginBase) {
    'use strict';

    /**
    * Initializes a new instance of CoreExamples.
    * @class
    * @augments {PluginBase}
    * @classdesc This class represents the plugin CoreExamples.
    * @constructor
    */
    var CoreExamples = function () {
        // Call base class' constructor.
        PluginBase.call(this);
    };

    // Prototypal inheritance from PluginBase.
    CoreExamples.prototype = Object.create(PluginBase.prototype);
    CoreExamples.prototype.constructor = CoreExamples;

    /**
    * Gets the name of the CoreExamples.
    * @returns {string} The name of the plugin.
    * @public
    */
    CoreExamples.prototype.getName = function () {
        return "Core Examples";
    };

    /**
    * Gets the description of the CoreExamples.
    * @returns {string} The description of the plugin.
    * @public
    */
    CoreExamples.prototype.getDescription = function () {
        return "Run on TestCore project to illustrate common CoreAPI functions.";
    };

    /**
    * Gets the semantic version (semver.org) of the CoreExamples.
    * @returns {string} The version of the plugin.
    * @public
    */
    CoreExamples.prototype.getVersion = function () {
        return "0.1.0";
    };

    /**
    * Main function for the plugin to execute. This will perform the execution.
    * Notes:
    * - Always log with the provided logger.[error,warning,info,debug].
    * - Do NOT put any user interaction logic UI, etc. inside this method.
    * - callback always have to be called even if error happened.
    *
    * @param {function(string, plugin.PluginResult)} callback - the result callback
    */
    CoreExamples.prototype.main = function (callback) {
        // Use self to access core, project, result, logger etc from PluginBase.
        // These are all instantiated at this point.
        var self = this,
            error = '';


        if (self.core.getPath(self.activeNode) !== '/1023960100') {
            self.logger.error('Run this interpreter on "/1023960100" (models in the root) as activeNode.');
            self.logger.error('Current activeNode was : ' + self.core.getPath(self.activeNode));
            self.result.setSuccess(false);
            callback('Run this interpreter on "/1023960100" as activeNode.', self.result);
            return;
        }

        self.core.loadChildren(self.activeNode, function (err, children) {
            var i,
                runningExamples = children.length,
                itrCallback;

            if (runningExamples === 0) {
                self.result.setSuccess(false);
                callback('The active node does not have any children. Are you using the right model?', self.result);
                return;
            }

            if (err) {
                self.result.setSuccess(false);
                callback('LoadChildren failed for the activeNode with error : ' + err, self.result);
                return;
            }

            itrCallback = function (err) {
                runningExamples -= 1;
                error = err ? error += err : error;
                if (runningExamples === 0) {
                    if (error) {
                        self.result.setSuccess(false);
                        callback(error, self.result);
                    } else {
                        self.result.setSuccess(true);
                        callback(null, self.result);
                    }
                }
            };

            for (i = 0; i < children.length; i += 1) {
                self.runExamples(children[i], itrCallback);
            }
        });
    };

    CoreExamples.prototype.runExamples = function (node, callback) {
        var self = this;
        // Load children here since all examples require this.
        self.core.loadChildren(node, function (err, children) {
            var name = self.core.getAttribute(node, 'name');
            if (err) {
                callback(' LoadChildren failed for ' + name + ' with error : ' + err);
            } else if (name === 'ParentExample') {
                self.logger.info('Starting work on ' + name + '...');
                self.parentExample(children, function (err) {
                    self.logger.info('Done with ' + name + '!');
                    callback(err);
                });
            } else if (name === 'ConnectionExample') {
                self.logger.info('Starting work on ' + name + '...');
                self.connectionExample(children, function (err) {
                    self.logger.info('Done with ' + name + '!');
                    callback(err);
                });
            } else if (name === 'ReferenceExample') {
                self.logger.info('Starting work on ' + name + '...');
                self.referenceExample(children, function (err) {
                    self.logger.info('Done with ' + name + '!');
                    callback(err);
                });
            } else if (name === 'RecursiveChildrenExample') {
                self.logger.info('Starting work on ' + name + '...');
                self.recursiveChildrenExample(children, function (err) {
                    self.logger.info('Done with ' + name + '!');
                    callback(err);
                });
            } else {
                self.logger.debug('Found unexpected child, ' + name + ', inside Models.');
                callback(null);
            }
        });
    };

// --------------------------------- Parent Example -------------------------------------
    CoreExamples.prototype.parentExample = function (children, callback) {
        var self = this,
            i,
            childrenVisits = children.length,
            error = '',
            itrCallback;

        if (childrenVisits === 0) {
            callback('The starting node in ParentExample did not have any children!?');
        }

        itrCallback = function (err) {
            error = err ? error += err : error;
            childrenVisits -= 1;
            if (childrenVisits === 0) {
                callback(error);
            }
        };

        for (i = 0; i < children.length; i += 1) {
            self.compareParentAndChildsParent(children[i], itrCallback);
        }
    };

    CoreExamples.prototype.compareParentAndChildsParent = function (node, callback) {
        var self = this,
            name = self.core.getAttribute(node, 'name');
        if (name === 'm_parent') {
            self.core.loadChildren(node, function (err, children) {
                var returnedParent,
                    guid1,
                    guid2,
                    error = '';
                if (err) {
                    callback(err);
                } else if (children.length === 0) {
                    callback('m_parent did not have any children!?');
                } else {
                    returnedParent = self.core.getParent(children[0]);
                    guid1 = self.core.getGuid(node);
                    guid2 = self.core.getGuid(returnedParent);
                    if (guid1 === guid2) {
                        self.logger.info("Parent och its child's parent had the same GUID (as expected).");
                    } else {
                        error += "Parent och its child's parent had the same GUID (very weird indeed).";
                    }
                    callback(error);
                }
            });
        } else {
            callback(null);
        }
    };

// --------------------------------- Connection Example ---------------------------------
    CoreExamples.prototype.connectionExample = function (children, callback) {
        var self = this,
            i,
            childrenVisits = children.length,
            error = '',
            itrCallback;

        if (childrenVisits === 0) {
            callback('The starting node in ConnectionExample did not have any children!?');
            return;
        }

        itrCallback = function (err) {
            error = err ? error += err : error;
            childrenVisits -= 1;
            if (childrenVisits === 0) {
                callback(error);
            }
        };

        for (i = 0; i < children.length; i += 1) {
            if (self.isMetaTypeOf(self, children[i], self.META['PortElement'])) {
                self.visitPorts(children[i], itrCallback);
            } else {
                itrCallback(null);
            }
        }
    };

    CoreExamples.prototype.visitPorts = function (portNode, callback) {
        var self = this,
            j,
            collectionNames = self.core.getCollectionNames(portNode),
            error = '';

        if (collectionNames.indexOf('src') === -1) {
            callback(null);
            return;
        }

        self.core.loadCollection(portNode, 'src', function (err, connections) {
            var connectionVisits,
                portName = self.core.getAttribute(portNode, 'name'),
                itrCallback;
            if (err) {
                error += ' loadCollection failed for ' + portName + ' with error : ' + err;
                callback(error);
                return;
            }

            itrCallback = function (err) {
                error = err ? error += err : error;
                connectionVisits -= 1;
                if (connectionVisits === 0) {
                    callback(error);
                }
            };

            connectionVisits = connections.length;
            for (j = 0; j < connections.length; j += 1) {
                self.visitConnection(connections[j], portName, itrCallback);
            }
        });
    };

    CoreExamples.prototype.visitConnection = function (connectionNode, portName, callback) {
        var self = this,
            error = '';

        if (self.core.hasPointer(connectionNode, 'dst')) {
            self.core.loadPointer(connectionNode, 'dst', function (err, dst) {
                var dstName,
                    connName;
                if (err) {
                    error += ' loadPointer failed for ' + portName + ' with error : ' + err;
                } else {
                    dstName = self.core.getAttribute(dst, 'name');
                    connName = self.core.getAttribute(connectionNode, 'name');
                    self.logger.info(connName + ' connects "' + portName + '" and "' + dstName + '".');
                }

                callback(error);
            });
        } else {
            callback('A connection with src but without dst exists in model!');
        }
    };

// --------------------------------- Reference Example ----------------------------------
    CoreExamples.prototype.referenceExample = function (children, callback) {
        var self = this,
            i,
            childNode,
            reference,
            original,
            error = '';
        for (i = 0; i < children.length; i += 1) {
            childNode = children[i];
            if (self.isMetaTypeOf(self, childNode, self.META['ModelElement'])) {
                original = childNode;
            } else if (self.isMetaTypeOf(self, childNode, self.META['ModelRef'])) {
                reference = childNode;
            }
        }

        if (self.core.hasPointer(reference, 'ref')) {
            self.core.loadPointer(reference, 'ref', function (err, referredNode) {
                var guid1,
                    guid2;
                guid1 = self.core.getGuid(original);
                guid2 = self.core.getGuid(referredNode);
                if (guid1 === guid2) {
                    self.logger.info('Reference and original node had the same GUID (as expected).');
                } else {
                    error = 'Reference and original node did not have the same GUID!';
                }
            });
        } else {
            error = 'Reference did not have a ref pointer!';
        }
        callback(error);
    };

// ------------------------------ Recursive Children Example ----------------------------
    CoreExamples.prototype.recursiveChildrenExample = function (children, callback) {
        var self = this,
            i,
            error = '',
            counter = {visits: children.length},
            itrCallback;

        itrCallback = function (err) {
            error = err ? error += err : error;
            counter.visits -= 1;
            if (counter.visits === 0) {
                callback(error);
            }
        };

        for (i = 0; i < children.length; i += 1) {
            if (self.isMetaTypeOf(self, children[i], self.META['ModelElement'])) {
                self.recurseOverChildren(children[i], counter, itrCallback);
            } else {
                self.logger.info(':: RecursiveChildrenExample :: at ' + self.core.getAttribute(children[i], 'name'));
                itrCallback(null);
            }
        }
    };

    CoreExamples.prototype.recurseOverChildren = function (node, counter, callback) {
        var self = this,
            name = self.core.getAttribute(node, 'name');
        self.logger.info(':: RecursiveChildrenExample :: at ' + name);

        self.core.loadChildren(node, function (err, children) {
            var i;
            if (err) {
                callback(' loadChildren failed for ' + name + ' with error : ' + err);
            }
            counter.visits += children.length;

            if (children.length === 0) {
                callback(null);
            } else {
                // The node needs to be accounted for.
                counter.visits -= 1;
            }
            for (i = 0; i < children.length; i += 1) {
                if (self.isMetaTypeOf(self, children[i], self.META['ModelElement'])) {
                    self.recurseOverChildren(children[i], counter, callback);
                } else {
                    self.logger.info(':: RecursiveChildrenExample :: at ' + self.core.getAttribute(children[i], 'name'));
                    callback(null);
                }
            }
        });
    };

    CoreExamples.prototype.isMetaTypeOf = function (self, nodeObj, metaTypeObj) {
        while (nodeObj) {
            if (self.core.getGuid(nodeObj) === self.core.getGuid(metaTypeObj)) {
                return true;
            }
            nodeObj = self.core.getBase(nodeObj);
        }
        return false;
    };

    return CoreExamples;
});