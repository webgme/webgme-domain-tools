var nodeRequire = require;

var requirejs = require('requirejs');
requirejs.config({
    baseUrl: '..',
    paths: {
        //WebGME custom modules
        "logManager": '../webgme/src/common/LogManager',
        "eventDispatcher": '../webgme/src/common/EventDispatcher',
        "notificationManager": 'js/NotificationManager',
        "clientUtil": 'js/util',
        "loaderCircles": "js/Loader/LoaderCircles",
        "loaderProgressBar": "js/Loader/LoaderProgressBar",

        "codemirror": 'lib/codemirror/codemirror.amd',
        "jquery-csszoom": 'lib/jquery/jquery.csszoom',

        "jszip": 'lib/jszip/jszip',
        "executor": 'src/rest/executor',
        "executor_old": 'src/rest/executor_old',
        'blob': '../webgme/src/middleware/blob',
        'superagent': 'lib/superagent/superagent'
        },
    nodeRequire: nodeRequire
});

GLOBAL.webGMEGlobal =  { getConfig: function() { return { }; } } // server: config.server, serverPort: config.port, httpsecure: config.protocol==='https' }; } };
var url = require('url');

function addWebGMEConnection(webGMEUrl, tempPath) {
    var worker;
    requirejs(['executor/ExecutorWorker', 'executor/JobInfo', 'executor/ExecutorWorkerController'], function (ExecutorWorker, JobInfo, ExecutorWorkerController) {
        var webGMEPort = url.parse(webGMEUrl).port || (url.parse(webGMEUrl).protocol === 'https:' ? 443 : 80);
        worker = new ExecutorWorker({ server: url.parse(webGMEUrl).hostname, serverPort: webGMEPort,
            httpsecure: url.parse(webGMEUrl).protocol === 'https:', sessionId: undefined,
            availableProcessesContainer: availableProcessesContainer, workingDirectory: tempPath});

        console.log("Connecting to " + webGMEUrl);

        worker.queryWorkerAPI(function (err, response) {
            var refreshPeriod = 60 * 1000;
            var callback = function (err, response) {

                if (err) {
                    console.log(err);
                } else {
                }
                if (response && response.refreshPeriod) {
                    refreshPeriod = response.refreshPeriod;
                }
                var timeoutID = setTimeout(function () {
                    worker.queryWorkerAPI(callback);
                }, refreshPeriod);
            };
            callback(err, response);
        });
    });
}

var webGMEUrls = Object.create(null);
var availableProcessesContainer = { availableProcesses: 1 }; // shared among all ExecutorWorkers

(function() {
    var fs = nodeRequire('fs');

    function readConfig() {
        var config = [ "http://localhost:8888" ];
        try {
            var configJSON = fs.readFileSync('config.json', {encoding: 'utf8'});
            config = JSON.parse(configJSON);
            if (Array.isArray(config)) {
                config = {};
                config.forEach(function (webGMEUrl) {
                    config[webGMEUrl] = {};
                });
            } else if (typeof(config) === "string") {
                config = { config: {} };
            } else {
            }
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
        fs.watch("config.json", function() { setTimeout(readConfig, 200); }); // setTimeout: likely handle O_TRUNC of config.json (though `move config.json.tmp config.json` is preferred)
    });
})();
