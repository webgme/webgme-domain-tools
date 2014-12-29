var nodeRequire = require;

if (typeof define !== 'undefined') {

    define('node_worker', [
        'eventDispatcher',
        'blob/BlobClient',
        'logManager',
        'executor/ExecutorWorker',
        'executor/JobInfo',
        'executor/ExecutorWorkerController',
        'url'
    ], function (eventDispatcher, BlobClient, logManager, ExecutorWorker, JobInfo, ExecutorWorkerController, url) {
        return function (webGMEUrl, tempPath, parameters) {
            var worker;
            var webGMEPort = url.parse(webGMEUrl).port || (url.parse(webGMEUrl).protocol === 'https:' ? 443 : 80);
            worker = new ExecutorWorker({
                server: url.parse(webGMEUrl).hostname,
                serverPort: webGMEPort,
                httpsecure: url.parse(webGMEUrl).protocol === 'https:',
                sessionId: undefined,
                availableProcessesContainer: availableProcessesContainer,
                workingDirectory: tempPath,
                executorNonce: parameters.executorNonce
            });

            console.log("Connecting to " + webGMEUrl);

            worker.queryWorkerAPI(function (err, response) {
                if (!err) {
                    console.log("Connected to " + webGMEUrl);
                }
                var refreshPeriod = 60 * 1000;
                var callback = function (err, response) {
                    if (err) {
                        console.log(err);
                    } else {}
                    if (response && response.refreshPeriod) {
                        refreshPeriod = response.refreshPeriod;
                    }
                    var timeoutID = setTimeout(function () {
                        worker.queryWorkerAPI(callback);
                    }, refreshPeriod);
                };
                callback(err, response);
            });
        }
    });
}

if (nodeRequire.main === module) {
    var requirejs = require('./node_worker.classes.build').requirejs;

    [
        'superagent',
        'fs',
        'util',
        'events',
        'path',
        'child_process',
        'minimatch',
        'rimraf',
        'url'
    ].forEach(function (name) {
        requirejs.s.contexts._.defined[name] = nodeRequire(name);
    });

    GLOBAL.webGMEGlobal = {
        getConfig: function () {
            return {};
        }
    } // server: config.server, serverPort: config.port, httpsecure: config.protocol==='https' }; } };

    var webGMEUrls = Object.create(null);
    var availableProcessesContainer = {
        availableProcesses: 1
    }; // shared among all ExecutorWorkers

    requirejs(['node_worker'], function (addWebGMEConnection) {
        var fs = nodeRequire('fs');

        function readConfig() {
            var config = {
                "http://localhost:8888": {}
            };
            try {
                var configJSON = fs.readFileSync('config.json', {
                    encoding: 'utf8'
                });
                config = JSON.parse(configJSON);
                if (Array.isArray(config)) {
                    var oldConfig = config;
                    config = {};
                    oldConfig.forEach(function (webGMEUrl) {
                        config[webGMEUrl] = {};
                    });
                } else if (typeof (config) === "string") {
                    config = {
                        config: {}
                    };
                } else {}
            } catch (e) {
                if (e.code !== "ENOENT") {
                    throw e;
                }
            }
            Object.getOwnPropertyNames(config).forEach(function (webGMEUrl) {
                    if (Object.prototype.hasOwnProperty.call(webGMEUrls, webGMEUrl)) {
                    } else {
                        webGMEUrls[webGMEUrl] = addWebGMEConnection(webGMEUrl, workingDirectory, config[webGMEUrl]);
                    }
                    // TODO: handle removing URL
                });
        }

        var workingDirectory = 'executor-temp';
        var rimraf = nodeRequire('rimraf');
        rimraf(workingDirectory, function (err) {
            if (err) {
                console.log('Could not delete working directory (' + workingDirectory + '), err: ' + err);
                process.exit(2);
            }

            readConfig();
            fs.watch("config.json", function () {
                setTimeout(readConfig, 200);
            }); // setTimeout: likely handle O_TRUNC of config.json (though `move config.json.tmp config.json` is preferred)
        });
    });

}