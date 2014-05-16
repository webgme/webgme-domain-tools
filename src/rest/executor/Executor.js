/**
 * Created by Zsolt on 5/16/2014.
 *
 * http://localhost:8888/rest/external/executor/
 * http://localhost:8888/rest/external/executor/create/[validhash]
 *
 */


define(['logManager',
    'blob/BlobRunPluginClient',
    'blob/BlobFSBackend',
    'fs',
    'path',
    'unzip',
    'child_process'], function(logManager, BlobRunPluginClient, BlobFSBackend, fs, path, unzip, child_process) {

    //here you can define global variables for your middleware
    var logger = logManager.create('REST-External-Executor'); //how to define your own logger which will use the global settings

    var executorBackend = null;

    var ExecutorBackend = function (parameters) {
        this.jobList = {};

        // FIXME: should we use HTTP here?
        var blobBackend = new BlobFSBackend();
        this.blobClient = new BlobRunPluginClient(blobBackend);

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

        // TODO: download artifacts

        self.blobClient.getObject(jobInfo.hash, function (err, content) {
            if (err) {
                // TODO: handle errors
                return;
            }

            var jobDir = path.join(self.workingDirectory, jobInfo.hash);

            if (!fs.existsSync(jobDir)) {
                fs.mkdirSync(jobDir);
            }

            var zipPath = path.join(jobDir, 'source.zip');

            fs.writeFile(zipPath, content, function (err) {
                // TODO: handle errors

                // TODO: unzip file
                fs.createReadStream(zipPath).pipe(unzip.Extract({ path: jobDir }));

                // TODO: start job
                var exec = child_process.exec;

                jobInfo.startTime = new Date().toISOString();

                // FIXME: get cmd file dynamically.
                var child = exec('run_jmodelica_model_exchange.cmd', {cwd: jobDir},
                    function (error, stdout, stderr) {

                        jobInfo.finishTime = new Date().toISOString();

                        logger.debug('stdout: ' + stdout);
                        logger.error('stderr: ' + stderr);

                        if (error !== null) {
                            logger.error('exec error: ' + error);
                            jobInfo.status = 'FAILED';
                        } else {
                            jobInfo.status = 'SUCCESS';

                            // TODO: zip results and upload

                            // TODO: delete artifacts.
                        }
                    });
            });
        });
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

            // TODO: send status
            res.send(jobList);
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

        if (jobList.hasOwnProperty(hash)) {
            res.send(jobList[hash]);
        } else {
            res.send(500);
        }
    };


    var setup = function() { //it has to be done this way, but this is probably a placeholder for later option parameters...
        return ExecutorREST;
    };
    return setup();
});