var nodeRequire = require;

var config = {
    "server": "localhost",
    "port": "8855",
    "protocol": "http"
};
(function() {
    var fs = nodeRequire('fs');
    try {
        var configJSON = fs.readFileSync('config.json', {encoding: 'utf8'});
        config = JSON.parse(configJSON);
    } catch (e) {
        if (e.code !== "ENOENT") {
            throw e;
        }
    }
})();

var requirejs = require('requirejs');
requirejs.config({
    baseUrl: '..',
    paths: {
        //WebGME custom modules
        "logManager": '../webgme/common/LogManager',
        "eventDispatcher": '../webgme/common/EventDispatcher',
        "notificationManager": 'js/NotificationManager',
        "clientUtil": 'js/util',
        "loaderCircles": "js/Loader/LoaderCircles",
        "loaderProgressBar": "js/Loader/LoaderProgressBar",

        "codemirror": 'lib/codemirror/codemirror.amd',
        "jquery-csszoom": 'lib/jquery/jquery.csszoom',

        "jszip": 'lib/jszip/jszip',
        "executor": 'src/rest/executor',
        "executor_old": 'src/rest/executor_old',
        'blob': '../webgme/blob',
        'superagent': 'lib/superagent/superagent'
        },
    nodeRequire: nodeRequire
});

GLOBAL.webGMEGlobal =  { getConfig: function() { return { server: config.server, serverPort: config.port, httpsecure: config.protocol==='https' }; } };

var worker;
requirejs(['executor/ExecutorWorker', 'executor/JobInfo', 'executor/ExecutorWorkerController'], function(ExecutorWorker, JobInfo, ExecutorWorkerController) {
    worker = new ExecutorWorker({ server: config.server, serverPort: config.port, httpsecure: config.protocol==='https', sessionId: undefined });
    
    worker.queryWorkerAPI(function(err, response) {
        var refreshPeriod = 60 * 1000;
        var callback = function(err, response) {

        if (err) {
                console.log(err);
            } else {
            }
            if (response && response.refreshPeriod) {
                refreshPeriod = response.refreshPeriod;
            }
            var timeoutID = setTimeout(function() {
                worker.queryWorkerAPI(callback);
            }, refreshPeriod);
        };
        callback(err, response);
    });
});
