/**
 * Generated by PluginGenerator from webgme on Wed May 21 2014 11:33:03 GMT-0500 (Central Daylight Time).
 * To run from server (webgme-domain-tools is working directory)
 * node node_modules\webgme\src\bin\run_plugin.js -c config.json -n ExecutionPackageGeneration -p TestCore -j "src/plugins/Examples/ExecutionPackageGeneration/serverConfig.json"
*/

define(['plugin/PluginConfig',
    'plugin/PluginBase',
    'ejs',
    'plugin/ExecutionPackageGeneration/ExecutionPackageGeneration/Templates/Templates',
    'executor/ExecutorClient'], function (PluginConfig, PluginBase, ejs, TEMPLATES, ExecutorClient) {
    'use strict';

    /**
    * Initializes a new instance of ExecutionPackageGeneration.
    * @class
    * @augments {PluginBase}
    * @classdesc This class represents the plugin ExecutionPackageGeneration.
    * @constructor
    */
    var ExecutionPackageGeneration = function () {
        // Call base class' constructor.
        PluginBase.call(this);
    };

    // Prototypal inheritance from PluginBase.
    ExecutionPackageGeneration.prototype = Object.create(PluginBase.prototype);
    ExecutionPackageGeneration.prototype.constructor = ExecutionPackageGeneration;

    /**
    * Gets the name of the ExecutionPackageGeneration.
    * @returns {string} The name of the plugin.
    * @public
    */
    ExecutionPackageGeneration.prototype.getName = function () {
        return "Execution Package Generation";
    };

    /**
    * Gets the semantic version (semver.org) of the ExecutionPackageGeneration.
    * @returns {string} The version of the plugin.
    * @public
    */
    ExecutionPackageGeneration.prototype.getVersion = function () {
        return "0.1.0";
    };

    /**
    * Gets the description of the ExecutionPackageGeneration.
    * @returns {string} The description of the plugin.
    * @public
    */
    ExecutionPackageGeneration.prototype.getDescription = function () {
        return "Generates an execution package and with configuration file.";
    };

    /**
     * Gets the configuration structure for the ExecutionPackageGeneration.
     * The ConfigurationStructure defines the configuration for the plugin
     * and will be used to populate the GUI when invoking the plugin from webGME.
     * @returns {object} The version of the plugin.
     * @public
     */
    ExecutionPackageGeneration.prototype.getConfigStructure = function () {
        return [
            {
                'name': 'update',
                'displayName': 'Write back to model',
                'description': 'If false no need to provide active node.',
                'value': true,
                'valueType': 'boolean',
                'readOnly': false
            },
            {
                'name': 'success',
                'displayName': 'Should succeed',
                'description': 'Should the execution exit with 0?',
                'value': true,
                'valueType': 'boolean',
                'readOnly': false
            },
            {
                'name': 'time',
                'displayName': 'Execution time [s]',
                'description': 'How long should the script run?',
                'value': 1,
                'valueType': 'number',
                'minValue': 0.1,
                'maxValue': 10000,
                'readOnly': false
            }
        ];
    };
    /**
    * Main function for the plugin to execute. This will perform the execution.
    * Notes:
    * - Always log with the provided logger.[error,warning,info,debug].
    * - Do NOT put any user interaction logic UI, etc. inside this method.
    * - callback always has to be called even if error happened.
    *
    * @param {function(string, plugin.PluginResult)} callback - the result callback
    */
    ExecutionPackageGeneration.prototype.main = function (callback) {
        // Use self to access core, project, result, logger etc from PluginBase.
        // These are all instantiated at this point.
        var self = this,
            config = self.getCurrentConfig(),
            exitCode = config.success ? 0 : 1,
            executor_config = {
                cmd: 'C:/Python27/python.exe ' + 'generate_name.py ',
                resultArtifacts: [
                    {
                        name: 'all',
                        resultPatterns: []
                    },
                    {
                        name: 'logs',
                        resultPatterns: ['log/**/*']
                    },
                    {
                        name: 'resultFile',
                        resultPatterns: ['new_name.json']
                    }
                ]
            },
            filesToAdd = {
                'generate_name.py': ejs.render(TEMPLATES['generate_name.py.ejs'], {
                    exitCode: exitCode,
                    sleepTime: config.time
                })
            },
            artifact = self.blobClient.createArtifact('executionFiles');
        if (config.update) {
            if (!self.activeNode) {
                return callback('No activeNode specified! Set update to false or provide one.', self.result);
            }
            executor_config.cmd += self.core.getPath(self.activeNode);
        } else {
            executor_config.cmd += 'dummy';
        }

        filesToAdd['executor_config.json'] = JSON.stringify(executor_config, null, 4);
        artifact.addFiles(filesToAdd, function (err) {
            if (err) {
                callback(err, self.result);
                return;
            }
            artifact.save(function (err, hash) {
                if (err) {
                    callback(err, self.result);
                    return;
                }
                self.result.addArtifact(hash);

                // FIXME: this will work only on client side...
                var executorClient = new ExecutorClient();

                executorClient.createJob(hash, function (err, jobInfo) {
                    var intervalID,
                        atSucceedJob;
                    if (err) {
                        return callback('Creating job failed: ' + err.toString(), self.result);
                    }
                    self.logger.debug(jobInfo);
                    atSucceedJob = function (jInfo) {
                        self.blobClient.getMetadata(jInfo.resultHashes.resultFile, function (err, metaData) {
                            var newNameJsonHash;
                            if (err) {
                                return callback('Getting results metadata failed: ' + err.toString(), self.result);
                            }
                            newNameJsonHash = metaData.content['new_name.json'].content;
                            self.blobClient.getObject(newNameJsonHash, function (err, content) {
                                var results,
                                    newName,
                                    key;
                                if (err) {
                                    return callback('Getting content failed: ' + err.toString(), self.result);
                                }
                                results = String.fromCharCode.apply(null, new Uint8Array(content));
                                newName = JSON.parse(results);
                                if (config.update) {
                                    for (key in newName) {
                                        if (newName.hasOwnProperty(key)) {
                                            self.core.setAttribute(self.activeNode, 'name', newName[key]);
                                        }
                                    }
                                    for (key in jInfo.resultHashes) {
                                        if (jInfo.resultHashes.hasOwnProperty(key)) {
                                            self.result.addArtifact(jInfo.resultHashes[key]);
                                        }
                                    }
                                    self.result.setSuccess(true);
                                    self.save('Updated new name from execution', function (err) {
                                        callback(null, self.result);
                                    });
                                } else {
                                    for (key in jInfo.resultHashes) {
                                        if (jInfo.resultHashes.hasOwnProperty(key)) {
                                            self.result.addArtifact(jInfo.resultHashes[key]);
                                        }
                                    }
                                    self.result.setSuccess(true);
                                    callback(null, self.result);
                                }

                            });
                        });
                    };

                    intervalID = setInterval(function () {
                        // Get the job-info at intervals and check for a non-CREATED status.
                        executorClient.getInfo(hash, function (err, jInfo) {
                            var key;
                            self.logger.info(JSON.stringify(jInfo, null, 4));
                            if (jInfo.status === 'CREATED' || jInfo.status ==='RUNNING') { // FIXME
                                // The job is still running..
                                return;
                            }

                            clearInterval(intervalID);
                            if (jInfo.status === 'SUCCESS') {
                                atSucceedJob(jInfo);
                            } else {
                                for (key in jInfo.resultHashes) {
                                    if (jInfo.resultHashes.hasOwnProperty(key)) {
                                        self.result.addArtifact(jInfo.resultHashes[key]);
                                    }
                                }
                                callback('Job execution failed', self.result);
                            }
                        });
                    }, 400);
                });
            });
        });
    };

    return ExecutionPackageGeneration;
});