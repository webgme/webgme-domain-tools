/*globals require, nodeRequire, process, console*/
/**
 * Created by Zsolt on 5/16/2014.
 *
 * THIS IS A THROW AWAY CODE AND IMPLEMENTATION.
 *
 * TEMPORARY CODE AND IMPLEMENTATION.
 *
 */

// eb.executorClient.createJob('1092dd2b135af5d164b9d157b5360391246064db', function (err, res) { console.log(require('util').inspect(res)); })
// eb.executorClient.getInfoByStatus('CREATED', function(err, res) { console.log("xxx " + require('util').inspect(res)); })

define(['logManager',
        'blob/BlobClient',
        'blob/BlobMetadata',
        'fs',
        'path',
        'child_process',
        'minimatch',
        'executor/ExecutorClient',
        'executor/WorkerInfo'
    ],
    function (logManager, BlobClient, BlobMetadata, fs, path, child_process, minimatch, ExecutorClient, WorkerInfo) {

        // FIXME: test for exe existance
        // FIXME: detect arch and use different exe and args
        var UNZIP_EXE = "c:\\Program Files\\7-Zip\\7z.exe";
        var UNZIP_ARGS = ["x", "-y"];

        var walk = function(dir, done) {
        var results = [];
        fs.readdir(dir, function(err, list) {
            if (err) return done(err);
            var i = 0;
            (function next() {
                var file = list[i++];
                if (!file) return done(null, results);
                file = dir + '/' + file;
                fs.stat(file, function(err, stat) {
                    if (stat && stat.isDirectory()) {
                        walk(file, function(err, res) {
                            results = results.concat(res);
                            next();
                        });
                    } else {
                        results.push(file);
                        next();
                    }
                });
            })();
        });
    };

    var deleteFolderRecursive = function(path) {
        if( fs.existsSync(path) ) {
            fs.readdirSync(path).forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    try {
                        fs.unlinkSync(curPath);
                    } catch (err) {
                        logger.error('Could not delete executor-temp file, err:' + err);
                    }
                }
            });
            try {
                fs.rmdirSync(path);
            } catch (err) {
                logger.error('Could not delete executor-temp directory, err:' + err);
            }
        }
    };
    //here you can define global variables for your middleware
    var logger = // logManager.create('REST-External-Executor'); //how to define your own logger which will use the global settings
        function() { };
    logger.prototype.error = function(x) { console.log(x); };
    logger.prototype.debug = logger.prototype.error;
    logger = new logger();

    var ExecutorWorker = function (parameters) {
        this.blobClient = new BlobClient({server: 'kms56', serverPort: 8855, httpsecure: false });

        this.executorClient = new ExecutorClient({server: 'kms56', serverPort: 8855, httpsecure: false });
        this.jobList = {};

        this.sourceFilename = 'source.zip';
        this.resultFilename = 'execution_results';
        this.executorConfigFilename = 'executor_config.json';

        this.workingDirectory = 'executor-temp';

        if (!fs.existsSync(this.workingDirectory)) {
            fs.mkdirSync(this.workingDirectory);
        }
        this.maxProcesses = parameters.maxProcesses || 1;
        this.clientRequest = new WorkerInfo.ClientRequest({ clientId: 'todo' });
        this.clientRequest.availableProcesses = this.maxProcesses;
    };

    ExecutorWorker.prototype.startJob = function (jobInfo) {
        var self = this;

        // TODO: create job
        // TODO: what if job is already running?

        // get metadata for hash
        self.blobClient.getMetadata(jobInfo.hash, function (err, metadata) {
            if (err) {
                logger.error(err);
                jobInfo.status = 'FAILED_TO_GET_SOURCE_METADATA';
                self.sendJobUpdate(jobInfo);
                return;
            }

            if (metadata.contentType !== BlobMetadata.CONTENT_TYPES.COMPLEX) {
                jobInfo.status = 'FAILED_SOURCE_IS_NOT_COMPLEX';
                self.sendJobUpdate(jobInfo);
                return;
            }

            // download artifacts
            self.blobClient.getObject(jobInfo.hash, function (err, content) {
                if (err) {
                    logger.error('Failed obtaining job source content, err: ' + err.toString());
                    jobInfo.status = 'FAILED_SOURCE_COULD_NOT_BE_OBTAINED';
                    self.sendJobUpdate(jobInfo);
                    return;
                }

                var jobDir = path.normalize(path.join(self.workingDirectory, jobInfo.hash));

                if (!fs.existsSync(jobDir)) {
                    fs.mkdirSync(jobDir);
                }

                var zipPath = path.join(jobDir, self.sourceFilename);

                //content = new Uint8Array(content);
                content = new Buffer(new Uint8Array(content));
                fs.writeFile(zipPath, content, function (err) {
                    if (err) {
                        logger.error('Failed creating source zip-file, err: ' + err.toString());
                        jobInfo.status = 'FAILED_CREATING_SOURCE_ZIP';
                        self.sendJobUpdate(jobInfo);
                        return;
                    }

                    // unzip downloaded file

                    var args = [path.basename(zipPath)];
                    args.unshift.apply(args, UNZIP_ARGS);
                    var child = child_process.execFile(UNZIP_EXE, args, {cwd: jobDir},
                        function (err, stdout, stderr) {
                        if (err) {
                            logger.error(err);
                            jobInfo.status = 'FAILED_UNZIP';
                            self.sendJobUpdate(jobInfo);
                            return;
                        }

                        // delete downloaded file
                        fs.unlinkSync(zipPath);

                        var exec = child_process.exec;

                        jobInfo.startTime = new Date().toISOString();

                        // get cmd file dynamically from the this.executorConfigFilename file
                        fs.readFile(path.join(jobDir, self.executorConfigFilename), 'utf8', function (err, data) {
                            if (err) {
                                logger.error('Could not read ' + self.executorConfigFilename + ' err:' + err);
                                jobInfo.status = 'FAILED_EXECUTOR_CONFIG';
                                self.sendJobUpdate(jobInfo);
                                return;
                            }

                            var executorConfig = JSON.parse(data);
                            var cmd = executorConfig.cmd;

                            logger.debug('working directory: ' + jobDir + ' executing: ' + cmd);

                            var child = exec(cmd, {cwd: jobDir},
                                function (error, stdout, stderr) {

                                    jobInfo.finishTime = new Date().toISOString();

                                    logger.debug('stdout: ' + stdout);

                                    if (stderr) {
                                        logger.error('stderr: ' + stderr);
                                    }

                                    if (error !== null) {
                                        logger.error('exec error: ' + error);
                                        jobInfo.status = 'FAILED';
                                    }

                                    // TODO: save stderr and stdout to files.

                                    self.saveJobResults(jobInfo, jobDir, executorConfig);
                                });
                        });
                    });

                });
            });
        });
    };

    ExecutorWorker.prototype.saveJobResults = function (jobInfo, directory, executorConfig) {
        var self = this,
            i,
            jointArtifact = self.blobClient.createArtifact('jobInfo_resultSuperSetHash'),
            resultsArtifacts = [],
            afterWalk,
            archiveFile,
            afterAllFilesArchived,
            addObjectHashesAndSaveArtifact;
        jobInfo.resultHashes = {};

        for (i = 0; i < executorConfig.resultArtifacts.length; i += 1) {
            resultsArtifacts.push(
                {
                    name: executorConfig.resultArtifacts[i].name,
                    artifact: self.blobClient.createArtifact(executorConfig.resultArtifacts[i].name),
                    patterns: executorConfig.resultArtifacts[i].resultPatterns instanceof Array ?
                        executorConfig.resultArtifacts[i].resultPatterns : [],
                    files: {}
                }
            );
        }

        afterWalk = function (filesToArchive) {
            var counter,
                pendingStatus,
                i,
                counterCallback = function (err) {
                    if (err) {
                        pendingStatus = err;
                    }
                    counter -= 1;
                    if (counter <= 0) {
                        if (pendingStatus) {
                            jobInfo.status = pendingStatus;
                        } else {
                            afterAllFilesArchived();
                        }

                    }
                };
            counter = filesToArchive.length;
            if (filesToArchive.length === 0) {
                logger.info('There was no files to archive..');
                counterCallback(null);
            }
            for (i = 0; i < filesToArchive.length; i += 1) {
                archiveFile(filesToArchive[i].filename, filesToArchive[i].filePath, counterCallback);
            }
        };

        archiveFile = function (filename, filePath, callback) {
            // FIXME: get the blob client to stream
            //var stream = fs.createReadStream(results[i]);
            fs.readFile(filePath,  function (err, data) {
                jointArtifact.addFileAsSoftLink(filename, data, function (err, hash) {
                    var j;
                    if (err) {
                        logger.error('Failed to archive as "' + filename + '" from "' + filePath + '", err: ' + err);
                        callback('FAILED_TO_ARCHIVE_FILE');
                    } else {
                        // Add the file-hash to the results artifacts containing the filename.
                        //console.log('Filename added : ' + filename);
                        for (j = 0; j < resultsArtifacts.length; j += 1) {
                            if (resultsArtifacts[j].files[filename] === true) {
                                resultsArtifacts[j].files[filename] = hash;
                                //console.log('Replaced! filename: "' + filename + '", artifact "' + resultsArtifacts[j].name
                                //    + '" with hash: ' + hash);
                            }
                        }
                        callback(null);
                    }
                });
            });
        };

        afterAllFilesArchived = function () {
            jointArtifact.save(function (err, resultHash) {
                var counter,
                    pendingStatus,
                    i,
                    counterCallback;
                if (err) {
                    logger.error(err);
                    jobInfo.status = 'FAILED_TO_SAVE_JOINT_ARTIFACT';
                    self.sendJobUpdate(jobInfo);
                } else {
                    counterCallback = function (err) {
                        if (err) {
                            pendingStatus = err;
                        }
                        counter -= 1;
                        if (counter <= 0) {
                            if (pendingStatus) {
                                jobInfo.status = pendingStatus;
                            } else {
                                jobInfo.status = 'SUCCESS';
                            }
                            self.sendJobUpdate(jobInfo);
                        }
                    };
                    counter = resultsArtifacts.length;
                    if (counter === 0) {
                        counterCallback(null);
                    }
                    // FIXME: This is synchronous
                    deleteFolderRecursive(directory);
                    jobInfo.resultSuperSetHash = resultHash;
                    for (i = 0; i < resultsArtifacts.length; i += 1) {
                        addObjectHashesAndSaveArtifact(resultsArtifacts[i], counterCallback);
                    }
                }
            });
        };

        addObjectHashesAndSaveArtifact = function (resultArtifact, callback) {
            resultArtifact.artifact.addMetadataHashes(resultArtifact.files, function (err, hashes) {
                if (err) {
                    logger.error(err);
                    return callback('FAILED_TO_ADD_OBJECT_HASHES');
                }
                resultArtifact.artifact.save(function (err, resultHash) {
                    if (err) {
                        logger.error(err);
                        return callback('FAILED_TO_SAVE_ARTIFACT');
                    }
                    jobInfo.resultHashes[resultArtifact.name] = resultHash;
                    callback(null);
                });
            });
        };

        walk(directory, function (err, results) {
            var i, j, a,
                filesToArchive = [],
                archive,
                filename,
                matched;
            //console.log('Walking the walk..');
            for (i = 0; i < results.length; i += 1) {
                filename = path.relative(directory, results[i]).replace(/\\/g,'/');
                archive = false;
                for (a = 0; a < resultsArtifacts.length; a += 1) {
                    if (resultsArtifacts[a].patterns.length === 0) {
                        //console.log('Matched! filename: "' + filename + '", artifact "' + resultsArtifacts[a].name + '"');
                        resultsArtifacts[a].files[filename] = true;
                        archive = true;
                    } else {
                        for (j = 0; j < resultsArtifacts[a].patterns.length; j += 1) {
                            matched = minimatch(filename, resultsArtifacts[a].patterns[j]);
                            if (matched) {
                                //console.log('Matched! filename: "' + filename + '", artifact "' + resultsArtifacts[a].name + '"');
                                resultsArtifacts[a].files[filename] = true;
                                archive = true;
                                break;
                            }
                        }
                    }
                }
                if (archive) {
                    filesToArchive.push({ filename: filename, filePath: results[i]});
                }
            }
            afterWalk(filesToArchive);
        });
    };

    ExecutorWorker.prototype.sendJobUpdate = function(jobInfo) {
        this.executorClient.updateJob(jobInfo, function (err) {
            if (err) {
                console.log(err); // TODO
            }
        });
        // TODO: update gui
    };

    ExecutorWorker.prototype.cancelJob = function () {

    };

    ExecutorWorker.prototype.checkForUnzipExe = function() {
        this.checkForUnzipExe = function() { };
        fs.exists(UNZIP_EXE, function (exists) {
            if (exists) {
            } else {
                alert("Unzip exe \"" + UNZIP_EXE + "\" does not exist. Please install it.");
            }
        });
    };

    ExecutorWorker.prototype.queryWorkerAPI = function (callback) {
        var self = this;
        self.checkForUnzipExe();

        var jobs_table = document.getElementById('jobs_table');
        if (jobs_table) {
        } else {
            document.getElementById('jobs').innerHTML = '<table id="jobs_table"><thead><tr><td>Job</td><td>Status</td></tr></thead></table>';
        }

        var oReq = new XMLHttpRequest();
        oReq.open('POST', this.executorClient.executorUrl + 'worker', true);
        oReq.setRequestHeader('Content-Type', 'application/json');
        oReq.timeout = 25 * 1000;
        oReq.ontimeout = function (oEvent) {
            document.getElementById('status').style.color = 'red';
            document.getElementById('status').textContent = 'Timed out';
            callback();
        };
        oReq.onerror = function (oEvent) {
            document.getElementById('status').style.color = 'red';
            document.getElementById('status').textContent = 'Error';
            callback();
        };
        oReq.onload = function (oEvent) {
            // Uploaded.
            var response = oEvent.target.response;
            if (oEvent.target.status > 399) {
                document.getElementById('status').style.color = 'red';
                document.getElementById('status').textContent = 'Server returned ' + oEvent.target.status;
                callback();
            } else {
                document.getElementById('status').style.color = 'green';
                document.getElementById('status').textContent = 'OK';
                var response = JSON.parse(oEvent.target.responseText);
                var jobsToStart = response.jobsToStart;
                for (var i = 0; i < jobsToStart.length; i++) {
                    self.executorClient.getInfo(jobsToStart[i], function(err, info) {
                        if (err) {
                            // TODO
                        }
                        self.jobList[info.hash] = info;
                        self.startJob(info);
                    });
                }

                callback(response);
            }
        };

        oReq.send(JSON.stringify(this.clientRequest));
    };

    return ExecutorWorker;
});
