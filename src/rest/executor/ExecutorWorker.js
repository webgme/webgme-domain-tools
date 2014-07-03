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
        'unzip',
        'child_process',
        'minimatch',
        'executor/ExecutorClient',
        'executor/WorkerInfo'
    ],
    function (logManager, BlobClient, BlobMetadata, fs, path, unzip, child_process, minimatch, ExecutorClient, WorkerInfo) {

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
                return;
            }

            if (metadata.contentType !== BlobMetadata.CONTENT_TYPES.COMPLEX) {
                jobInfo.status = 'FAILED_SOURCE_IS_NOT_COMPLEX';
                return;
            }

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

                //content = new Uint8Array(content);
                content = new Buffer(new Uint8Array(content));
                fs.writeFile(zipPath, content, function (err) {
                    if (err) {
                        logger.error('Failed creating source zip-file, err: ' + err.toString());
                        jobInfo.status = 'FAILED_CREATING_SOURCE_ZIP';
                        return;
                    }

                    // unzip downloaded file

                    var child = child_process.execFile("c:\\Program Files\\7-Zip\\7z.exe", ["x", "-y", path.basename(zipPath)], {cwd: jobDir},
                        function (err, stdout, stderr) {
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

    ExecutorWorker.prototype.saveJobResults = function (jobInfo, directory, executorConfig) {
        // TODO: list all files and subdirectories

        var self = this,
            patterns = executorConfig.resultPatterns instanceof Array ? executorConfig.resultPatterns : [],
            resultArtifact = self.blobClient.createArtifact(self.resultFilename);

        walk(directory, function (err, results) {
            var i, j,
                remaining = results.length,
                archive = false,
                filename;
            for (i = 0; i < results.length; i++) {
                archive = false;
                filename = path.relative(directory, results[i]).replace(/\\/g,'/');

                if (patterns.length === 0) {
                    archive = true;
                } else {
                    // Decide if we should archive the file based on match to any of the patterns.
                    for (j = 0; j < patterns.length; j += 1) {

                        var matched = minimatch(filename, patterns[j]);
                        //console.log('filename: "' + filename + '", pattern: "' + patterns[j] + '"');
                        //console.log('Match : ' + matched.toString());
                        if (matched) {
                            archive = true;
                            break;
                        }
                    }
                }

                if (archive) {
                    // FIXME: get the blob client to stream
                    //var stream = fs.createReadStream(results[i]);
                    fs.readFile(results[i], function(err, data) {
                        // archive the given file
                        resultArtifact.addFileAsSoftLink(filename, data, function (err, hash) {
                            remaining -= 1;

                            // FIXME: handle 'Another content with the same name was already added'
                            // if (typeof err === "string"
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
                                    jobInfo.status = 'SUCCESS';
                                    self.executorClient.updateJob(jobInfo, function (err) {
                                        console.log(err); // TODO
                                    });
                                });
                            }

                        });
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

    ExecutorWorker.prototype.cancelJob = function () {

    };

    ExecutorWorker.prototype.queryWorkerAPI = function (callback) {
        var self = this;
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
