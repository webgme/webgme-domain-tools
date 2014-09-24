/*globals require, console*/
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
    'fs',
    'path',
    'unzip',
    'child_process',
    'minimatch',
    'nedb',
    'executor/JobInfo',
    'executor/WorkerInfo'
    ],
    function (logManager, fs, path, unzip, child_process, minimatch, Datastore, JobInfo, WorkerInfo) {

    var logger = logManager.create('REST-External-Executor'); //how to define your own logger which will use the global settings

    var jobList = new Datastore({ filename: 'jobList.nedb', autoload: true });
    jobList.ensureIndex({ fieldName: 'hash', unique: true }, function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });

    var workerRefreshInterval = 5 * 1000;
    // worker = { clientId:, lastSeen: }
    var workerList = new Datastore({ filename: 'workerList.nedb', autoload: true});
    var workerTimeout = function() {
        if (process.uptime() < workerRefreshInterval / 1000 * 5) {
            return;
        }
        workerList.find({ lastSeen: { $lt: (new Date).getTime() / 1000 - workerRefreshInterval / 1000 * 5} }, function(err, docs) {
            for (var i = 0; i < docs.length; i += 1) {
                // reset unfinished jobs assigned to worker to CREATED, so they'll be executed by someone else
                logger.info('worker "' + docs[i].clientId + '" is gone');
                workerList.remove({_id: docs[i]._id});
                // FIXME: race after assigning finishTime between this and uploading to blob
                jobList.update({ worker: docs[i].clientId, finishTime: null}, { $set: { worker: null, status: 'CREATED', startTime: null }}, function () { });
            }
        });
    };
    setInterval(workerTimeout, 10 * 1000);

    var labelJobs = {}; // map from label to blob hash
    var labelJobsFilename = 'labelJobs.json'; // TODO put somewhere that makes sense
    function updateLabelJobs() {
        var fs = require('fs');
        fs.readFile(labelJobsFilename, {encoding: 'utf-8'}, function (err, data) {
            logger.info("Reading " + labelJobsFilename);
            labelJobs = JSON.parse(data);
        });
    }
    function watchLabelJobs() {
        var fs = require('fs');
        fs.exists(labelJobsFilename, function (exists) {
            if (exists) {
                updateLabelJobs();
                fs.watch(labelJobsFilename, { persistent: false }, function() { setTimeout(updateLabelJobs, 200); });
            } else {
                setTimeout(watchLabelJobs, 10 * 1000);
            }
        });
    };
    watchLabelJobs();

    var ExecutorREST = function(req,res,next){
        //global config is accessible via webGMEGlobal.getConfig()
        var config = webGMEGlobal.getConfig();
        // logger.debug('Executor request');

        var url = require('url').parse(req.url);
        var pathParts = url.pathname.split("/");

        if (pathParts.length < 2) {
            res.send(404);
            return;
        }

        if (pathParts.length === 2 && pathParts[1] === '') {
            //next should be always called / the response should be sent otherwise this thread will stop without and end

            var query = {}
            if (req.query.hasOwnProperty('status')) {
                query.status = req.query.status;
            }
            jobList.find(query, function(err, docs) {
                if (err) {
                    res.send(500);
                    return;
                }
                var jobList = {};
                for (var i = 0; i < docs.length; i += 1) {
                    jobList[docs[i].hash] = docs[i];
                    delete docs[i]._id;
                }
                res.send(jobList);
            });

            // TODO: send status
            // FIXME: this path will not be safe
//            res.sendfile(path.join('src', 'rest', 'executor', 'index2.html'), function (err) {
//                if (err) {
//                    logger.error(err);
//                    res.send(500);
//                }
//            });

        } else {

            switch (pathParts[1]) {
                case "create":
                    ExecutorRESTCreate(req, res, next);
                    break;
                case "worker":
                    ExecutorRESTWorkerAPI(req, res, next);
                    break;
                case "cancel":
                    ExecutorRESTCancel(req, res, next);
                    break;
                case "info":
                    ExecutorRESTInfo(req, res, next);
                    break;
                case "update":
                    ExecutorRESTUpdate(req, res, next);
                    break;
                default:
                    res.send(404);
                    break;
            }

        }

    };

    var ExecutorRESTCreate = function(req, res, next) {
        if (req.method !== 'POST') {
            res.send(405);
        }
        var url = req.url.split('/');

        if (url.length < 3 || !url[2]) {
            res.send(404);
            return;
        }
        var hash = url[2];

        var info = req.body;
        info.hash = hash;
        info.createTime = new Date().toISOString();
        info.status = info.status || 'CREATED'; // TODO: define a constant for this
        var jobInfo = new JobInfo(info);
        // TODO: check if hash ok
        jobList.update({ hash: hash }, jobInfo, { upsert: true }, function(err) {
            if (err) {
                res.send(500);
            } else {
                delete jobInfo._id;
                res.send(jobInfo);
            }
        });

        // TODO: get job description
    };

    var ExecutorRESTUpdate = function(req, res, next) {
        if (req.method !== 'POST') {
            res.send(405);
        }
        var url = req.url.split('/');

        if (url.length < 3 || !url[2]) {
            res.send(404);
            return;
        }
        var hash = url[2];

        if (hash) {
        } else {
            res.send(500);
            return;
        }

        jobList.find({hash: hash}, function(err, docs) {
            if (err) {
                res.send(500);
            } else if (docs.length) {
                var jobInfo = new JobInfo(docs[0]);
                var jobInfoUpdate = new JobInfo(req.body);
                jobInfoUpdate.hash = hash;
                for (var i in jobInfoUpdate) {
                    if (jobInfoUpdate[i] !== null && (!(jobInfoUpdate[i] instanceof Array) || jobInfoUpdate[i].length !== 0)) {
                        jobInfo[i] = jobInfoUpdate[i];
                    }
                }
                jobList.update({ hash: hash }, jobInfo, function(err, numReplaced) {
                    if (err) {
                        res.send(500);
                    } else if (numReplaced !== 1) {
                        res.send(404);
                    } else {
                        res.send(200);
                    }
                });
            } else {
                res.send(404);
            }
        });

    };

    var ExecutorRESTWorkerGET = function(req, res, next) {
        var response = {};
        workerList.find({ }, function (err, workers) {
            var jobQuery = function (i) {
                if (i === workers.length) {
                    res.send(JSON.stringify(response));
                    return;
                }
                var worker = workers[i];
                jobList.find({status: 'RUNNING', worker: worker.clientId}).sort({createTime: 1}).exec(function (err, jobs) {
                    // FIXME: index jobList on status?
                    for (var j = 0; j < jobs.length; j += 1) {
                        delete jobs[j]._id;
                    }
                    delete worker._id;
                    response[worker.clientId] = worker;
                    response[worker.clientId].jobs = jobs;

                    jobQuery(i + 1);
                });
            }
            jobQuery(0);
        });
    }

    var ExecutorRESTWorkerAPI = function(req, res, next) {
        if (req.method !== 'POST' && req.method !== 'GET') {
            res.send(405);
            return;
        }
        if (req.method === 'GET') {
            return ExecutorRESTWorkerGET(req, res, next);
        }

        var url = require('url').parse(req.url);
        var pathParts = url.pathname.split("/");

        if (pathParts.length < 2) {
            res.send(404);
            return;
        }

        var serverResponse = new WorkerInfo.ServerResponse({ refreshPeriod: workerRefreshInterval });
        serverResponse.labelJobs = labelJobs;
        var clientRequest = new WorkerInfo.ClientRequest(req.body);

        workerList.update({ clientId: clientRequest.clientId }, { $set: { lastSeen: (new Date).getTime() / 1000, labels: clientRequest.labels }}, { upsert: true }, function() {
            if (clientRequest.availableProcesses) {
                jobList.find({status: 'CREATED', $not: { labels: {$nin: clientRequest.labels} }}).limit(clientRequest.availableProcesses).exec(function (err, docs) {
                    if (err) {
                        res.send(500);
                        return; // FIXME need to return 2x
                    }

                    var callback = function (i) {
                        if (i === docs.length) {
                            res.send(JSON.stringify(serverResponse));
                            return;
                        }
                        jobList.update({_id: docs[i]._id, status: 'CREATED'}, {$set: {status: 'RUNNING', worker: clientRequest.clientId}}, function (err, numReplaced) {
                            if (err) {
                                res.send(500);
                                return;
                            } else if (numReplaced) {
                                serverResponse.jobsToStart.push(docs[i].hash);
                            }
                            callback(i + 1);
                        });
                    };
                    callback(0);
                });
            } else {
                res.send(JSON.stringify(serverResponse));
            }
        });
    };


    var ExecutorRESTCancel = function(req, res, next) {
        if (req.method !== 'POST') {
            res.send(405);
            return;
        }

        var url = req.url.split('/');

        if (url.length < 3 || !url[2]) {
            res.send(500);
            return;
        }

        var hash = url[2];

        if (false) {
            // TODO
            executorBackend.cancelJob(hash);

            res.send(200);
        } else {
            res.send(500);
        }

    };


    var ExecutorRESTInfo = function(req, res, next) {
        if (req.method !== 'GET') {
            res.send(405);
            return;
        }

        var url = req.url.split('/');

        if (url.length < 3 || !url[2]) {
            res.send(500);
            return;
        }

        var hash = url[2];

        if (hash) {
            jobList.find({hash: hash}, function(err, docs) {
                if (err) {
                    res.send(500);
                } else if (docs.length) {
                    res.send(docs[0]);
                } else {
                    res.send(404);
                }
            });
        } else {
            res.send(500);
        }
    };


    var setup = function() { //it has to be done this way, but this is probably a placeholder for later option parameters...
        return ExecutorREST;
    };
    return setup();
});
