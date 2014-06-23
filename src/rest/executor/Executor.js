/**
 * Created by Zsolt on 5/16/2014.
 *
 * http://localhost:8888/rest/external/executor/
 * http://localhost:8888/rest/external/executor/create/[validhash]
 *
 * THIS IS A THROW AWAY CODE AND IMPLEMENTATION.
 *
 * TEMPORARY CODE AND IMPLEMENTATION.
 *
 */

define(['logManager',
    'blob/BlobRunPluginClient',
    'blob/BlobFSBackend',
    'blob/BlobMetadata',
    'fs',
    'path',
    'unzip',
    'child_process',
    'minimatch'],
    function (logManager, BlobRunPluginClient, BlobFSBackend, BlobMetadata, fs, path, unzip, child_process, minimatch) {

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
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };

    //here you can define global variables for your middleware
    var logger = logManager.create('REST-External-Executor'); //how to define your own logger which will use the global settings

    var executorBackend = null;

    var ExecutorBackend = function (parameters) {
        this.jobList = {};

        // FIXME: should we use HTTP here?
        var blobBackend = new BlobFSBackend();
        this.blobClient = new BlobRunPluginClient(blobBackend);

        this.sourceFilename = 'source.zip';
        this.executorConfigFilename = 'executor_config.json';

        this.workingDirectory = 'executor-temp';

        if (!fs.existsSync(this.workingDirectory)) {
            fs.mkdirSync(this.workingDirectory);
        }
    };

    ExecutorBackend.prototype.startJob = function (jobInfo) {
        // FIXME: This is the server side implementation of a dumb executor.

        var self = this;

        // TODO: create job
        // TODO: what if job is already running?

        this.jobList[jobInfo.hash] = jobInfo;


        // get metadata for hash
        self.blobClient.getMetadata(jobInfo.hash, function (err, metadata) {
            if (err) {
                logger.error(err);
                jobInfo.status = 'FAILED_TO_GET_SOURCE_METADATA';
                return;
            }

            if (metadata.contentType !== BlobMetadata.CONTENT_TYPES.COMPLEX) {
                jobInfo.status = 'FAILED_SOURCE_IS_NOT_COMPLEX';
                return;
            }


//            if (metadata.content.hasOwnProperty(self.executorConfigFilename)) {
//
//            } else {
//                jobInfo.status = 'FAILED_EXECUTOR_CONFIG_DOES_NOT_EXIST';
//                return;
//            }

            // download artifacts
            self.blobClient.getObject(jobInfo.hash, function (err, content) {
                if (err) {
                    logger.error('Failed obtaining job source content, err: ' + err.toString());
                    jobInfo.status = 'FAILED_SOURCE_COULD_NOT_BE_OBTAINED';
                    return;
                }

                var jobDir = path.normalize(path.join(self.workingDirectory, jobInfo.hash));

                if (!fs.existsSync(jobDir)) {
                    fs.mkdirSync(jobDir);
                }

                var zipPath = path.join(jobDir, self.sourceFilename);

                fs.writeFile(zipPath, content, function (err) {
                    if (err) {
                        logger.error('Failed creating source zip-file, err: ' + err.toString());
                        jobInfo.status = 'FAILED_CREATING_SOURCE_ZIP';
                        return;
                    }

                    // unzip downloaded file

                    var extract = unzip.Extract({ path: jobDir });
                    fs.createReadStream(zipPath).pipe(extract);

                    extract.on('close', function(err) {
                        if (err) {
                            logger.error(err);
                            jobInfo.status = 'FAILED_UNZIP';
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

    ExecutorBackend.prototype.saveJobResults = function (jobInfo, directory, executorConfig) {
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

            jointArtifact.addFileAsSoftLink(filename, fs.createReadStream(filePath), function (err, hash) {
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

    ExecutorBackend.prototype.cancelJob = function () {

    };

    // this should be in a database
    var jobList = {};


    var JobInfo = function (parameters) {
        this.hash = parameters.hash;
        this.resultSuperSetHash = null;
        this.resultHashes = null;
        this.userId = [];
        this.status = 'CREATED'; // TODO: define a constant for this
        this.startTime = null;
        this.finishTime = null;
    };


    var ExecutorREST = function(req,res,next){
        //global config is accessible via webGMEGlobal.getConfig()
        var config = webGMEGlobal.getConfig();
        logger.debug('Executor request');


        var url = req.url.split('/');

        if (url.length === 2) {
            //next should be always called / the response should be sent otherwise this thread will stop without and end

            res.send(jobList);

            // TODO: send status
            // FIXME: this path will not be safe
//            res.sendfile(path.join('src', 'rest', 'executor', 'index2.html'), function (err) {
//                if (err) {
//                    logger.error(err);
//                    res.send(500);
//                }
//            });

        } else {

            switch (url[1]) {
                case "create":
                    ExecutorRESTCreate(req, res, next);
                    break;
                case "cancel":
                    ExecutorRESTCancel(req, res, next);
                    break;
                case "info":
                    ExecutorRESTInfo(req, res, next);
                    break;
                default:
                    res.send(500);
            }

        }

    };

    var ExecutorRESTCreate = function(req, res, next) {
        // TODO: accept only POST

        var url = req.url.split('/');

        if (url.length < 3 || !url[2]) {
            res.send(500);
        }

        var hash = url[2];
        var jobInfo = new JobInfo({hash:hash});

        // TODO: check if hash ok
        jobList[hash] = jobInfo;

        // TODO: get job description

        // TODO: schedule job

        if (!executorBackend) {
            executorBackend = new ExecutorBackend();
        }

        executorBackend.startJob(jobInfo);

        res.send(jobInfo);
    };


    var ExecutorRESTCancel = function(req, res, next) {
        // TODO: accept only POST
        var url = req.url.split('/');

        if (url.length < 3 || !url[2]) {
            res.send(500);
        }

        var hash = url[2];

        if (!executorBackend) {
            res.send(500);
        } else {

            executorBackend.cancelJob(hash);

            res.send(200);
        }
    };


    var ExecutorRESTInfo = function(req, res, next) {
        // TODO: accept only GET

        var url = req.url.split('/');

        if (url.length < 3 || !url[2]) {
            res.send(500);
        }

        var hash = url[2];

        if (hash) {
            if (jobList.hasOwnProperty(hash)) {
                res.send(jobList[hash]);
            } else {
                res.send(500);
            }
        } else {
            res.send(jobList);
        }
    };


    var setup = function() { //it has to be done this way, but this is probably a placeholder for later option parameters...
        return ExecutorREST;
    };
    return setup();
});