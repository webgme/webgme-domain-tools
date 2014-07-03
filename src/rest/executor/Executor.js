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

//console.log("xxxxxx")
//console.log(JSON.stringify(require))
//console.log(require)
//console.log(require.s.contexts)
//require('nedb');
//console.log(require.s.contexts._.config.paths)
    /*
var reqTwoo = require.config({
    context: "version2",
    paths: require.s.contexts._.config.paths,
    baseUrl: require.s.contexts._.config.baseUrl,
    nodeRequire: require.s.contexts._.config.nodeRequire,
});
//console.log("xxx " + require.s.contexts._.config.baseUrl)
var reqTwo = require.config({
    context: "webgme-domain-tools",
    paths: {"nedb": "node_modules/nedb/index"},
    baseUrl: "C:\\Users\\kevin\\Documents\\META\\WebGME\\node_modules\\webgme-domain-tools\\",
    nodeRequire: require,
});
*/
//reqTwo
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

        // TODO: persist this
    var jobList = new Datastore();
    jobList = new Datastore({ filename: 'jobList.nedb', autoload: true });
    jobList.ensureIndex({ fieldName: 'hash', unique: true }, function (err) {});

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
                for (var i = 0; i < docs.length; i++) {
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

        var jobInfo = new JobInfo({hash:hash});
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

        var jobInfo = new JobInfo(req.body);
        jobList.update({ hash: hash }, jobInfo, function(err, numReplaced) {
            if (err) {
                res.send(500);
            } else if (numReplaced !== 1) {
                res.send(404);
            } else {
                res.send(200);
            }
        });
    };

    var ExecutorRESTWorkerAPI = function(req, res, next) {
        if (req.method !== 'POST') {
            res.send(405);
            return;
        }

        var url = require('url').parse(req.url);
        var pathParts = url.pathname.split("/");

        if (pathParts.length < 2) {
            res.send(404);
            return;
        }

        var serverResponse = new WorkerInfo.ServerResponse({ refreshPeriod: 5 * 1000 });
        var clientRequest = new WorkerInfo.ClientRequest(req.body);

        if (clientRequest.availableProcesses) {
            jobList.find({status: 'CREATED'}).limit(clientRequest.availableProcesses).exec(function (err, docs) {
                if (err) {
                    res.send(500);
                    return; // FIXME need to return 2x
                }
                var callback = function (i) {
                    if (i === docs.length) {
                        res.send(JSON.stringify(serverResponse));
                        return;
                    }
                    jobList.update({_id: docs[i]._id}, {$set: {status: 'RUNNING'}}, function (err) {
                        if (err) {
                            res.send(500);
                        } else {
                            serverResponse.jobsToStart.push(docs[i].hash);
                            callback(i + 1);
                        }
                    });
                };
                callback(0);
            });
        } else {
            res.send(JSON.stringify(serverResponse));
        }
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