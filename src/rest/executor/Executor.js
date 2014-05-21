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
    'child_process'], function(logManager, BlobRunPluginClient, BlobFSBackend, BlobMetadata, fs, path, unzip, child_process) {


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
        this.resultFilename = 'execution_results';
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
        // TODO: list all files and subdirectories

        var self = this;

        var resultArtifact = self.blobClient.createArtifact(self.resultFilename);

        walk(directory, function (err, results) {
            var i,
                remaining = results.length;

            for (i = 0; i < results.length; i++) {

                var archive = true;
                var filename = path.relative(directory, results[i]).replace(/\\/g,'/');

                var filePatterns = executorConfig.results.files;
                var dirPatterns = executorConfig.results.dirs;

                if (filePatterns.length + dirPatterns.length === 0) {
                    archive = true;

                } else {
                    // decide if we should archive the file

                    // TODO: we should support glob patterns?
                    if (filePatterns.indexOf(filename) > -1) {
                        archive = true;
                    } else {
                        archive = false;

                        // check for dir
                        for (var j = 0; j < dirPatterns.length; j += 1) {
                            if (filename.indexOf(dirPatterns[j]) === 0) {
                                archive = true;
                                break;
                            }
                        }
                    }

                }

                if (archive) {
                    // archive the given file
                    resultArtifact.addFile(filename, fs.createReadStream(results[i]), function (err, hash) {
                        remaining -= 1;

                        if (err) {
                            logger.error(err);
                        } else {

                        }

                        if (remaining === 0) {
                            resultArtifact.save(function (err, resultHash) {
                                if (err) {
                                    logger.error(err);
                                    jobInfo.status = 'FAILED_TO_SAVE_ARTIFACT';
                                    return;
                                } else {
                                    // FIXME: This is synchronous
                                    deleteFolderRecursive(directory);
                                }

                                jobInfo.resultHash = resultHash;
                                if (jobInfo.status === 'CREATED') {
                                    jobInfo.status = 'SUCCESS';
                                }
                            });
                        }

                    });

                } else {
                    // skip it
                    remaining -= 1;

                }
            }
        });

        // TODO: create a result artifact

        // TODO: delete directory

    };

    ExecutorBackend.prototype.cancelJob = function () {

    };

    // this should be in a database
    var jobList = {};


    var JobInfo = function (parameters) {
        this.hash = parameters.hash;
        this.resultHash = null;
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