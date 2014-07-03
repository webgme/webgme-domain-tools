/**
 * Created by Zsolt on 5/21/2014.
 * 
 * THIS IS A THROW AWAY CODE AND IMPLEMENTATION.
 *
 * TEMPORARY CODE AND IMPLEMENTATION.
 *
 */


define([], function () {

    var ExecutorClient = function (parameters) {
        this.isNodeJS = (typeof window === 'undefined') && (typeof process === "object");
        this.isNodeWebkit = (typeof window === 'object') && (typeof process === "object");

        //console.log(isNode);
        if (this.isNodeJS) {
            var config = webGMEGlobal.getConfig();
            this.server = '127.0.0.1';
            this.serverPort = config.port;
            this.httpsecure = config.httpsecure;

            this._clientSession = null; // parameters.sessionId;;
        }
        if (parameters) {
            this.server = parameters.server || this.server;
            this.serverPort = parameters.serverPort || this.serverPort;
            this.httpsecure = (parameters.httpsecure !== undefined) ? parameters.httpsecure : this.httpsecure;
        }
        if (this.isNodeJS) {
            this.http = this.httpsecure ? require('https') : require('http');
        }
        this.executorUrl = '';
        if (this.httpsecure !== undefined && this.server && this.serverPort) {
            this.executorUrl = (this.httpsecure ? 'https://' : 'http://') + this.server + ':' + this.serverPort;
        }
        // TODO: TOKEN???
        this.executorUrl = this.executorUrl + '/rest/external/executor/'; // TODO: any ways to ask for this or get it from the configuration?

    };

    ExecutorClient.prototype.getInfoURL = function (hash) {
        var metadataBase = this.executorUrl + 'info';
        if (hash) {
            return metadataBase + '/' + hash;
        } else {
            return metadataBase;
        }
    };


    ExecutorClient.prototype.getCreateURL = function (hash) {
        var metadataBase = this.executorUrl + 'create';
        if (hash) {
            return metadataBase + '/' + hash;
        } else {
            return metadataBase;
        }
    };

    ExecutorClient.prototype.createJob = function (hash, callback) {
        this.sendHttpRequest('POST', this.getCreateURL(hash), function (err, response) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, JSON.parse(response));
        });
    };

    ExecutorClient.prototype.updateJob = function (jobInfo, callback) {
        this.sendHttpRequestWithData('POST', this.executorUrl + 'update/' + jobInfo.hash, JSON.stringify(jobInfo), function (err, response) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, JSON.parse(response));
        });
    };

    ExecutorClient.prototype.getInfo = function (hash, callback) {
        this.sendHttpRequest('GET', this.getInfoURL(hash), function (err, response) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, JSON.parse(response));
        });
    };

    ExecutorClient.prototype.getAllInfo = function (callback) {

        this.sendHttpRequest('GET', this.getInfoURL(), function (err, response) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, JSON.parse(response));
        });
    };

    ExecutorClient.prototype.getInfoByStatus = function (status, callback) {

        this.sendHttpRequest('GET', this.executorUrl + '?status=' + status, function (err, response) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, JSON.parse(response));
        });
    };

    ExecutorClient.prototype.sendHttpRequest = function (method, url, callback) {
        return this.sendHttpRequestWithData(method, url, null, callback);
    };

    ExecutorClient.prototype.sendHttpRequestWithData = function (method, url, data, callback) {

        if (this.isNodeJS) {
            var options = {
                hostname: this.server,
                port: this.serverPort,
                path: require('url').parse(url).path,
                method: method
            };

            this._sendHttpRequestWithContent(options, null, callback);

        } else {
            var oReq = new XMLHttpRequest();
            oReq.open(method, url, true);
            if (data) {
                oReq.setRequestHeader('Content-Type', 'application/json');
            }
            oReq.onload = function (oEvent) {
                // Uploaded.
                var response = oEvent.target.response;
                if (oEvent.target.status > 399) {
                    callback(oEvent.target.status, response);
                } else {
                    callback(null, response);
                }
            };

            if (data) {
                oReq.send(data);
            } else {
                oReq.send();
            }
        }
    };

    ExecutorClient.prototype._ensureAuthenticated = function (options, callback) {
        //this function enables the session of the client to be authenticated
        //TODO currently this user does not have a session, so it has to upgrade the options always!!!
//        if (options.headers) {
//            options.headers.webgmeclientsession = this._clientSession;
//        } else {
//            options.headers = {
//                'webgmeclientsession': this._clientSession
//            }
//        }
        callback(null, options);
    };


    ExecutorClient.prototype._sendHttpRequestWithContent = function (options, data, callback) {
        var self = this;
        self._ensureAuthenticated(options, function (err, updatedOptions) {
            if (err) {
                callback(err);
            } else {
                self.__sendHttpRequestWithContent(updatedOptions, data, callback);
            }
        });
    };

    ExecutorClient.prototype.__sendHttpRequestWithContent = function (options, data, callback) {
        // TODO: use the http or https
        var req = this.http.request(options, function (res) {
            //    console.log('STATUS: ' + res.statusCode);
            //    console.log('HEADERS: ' + JSON.stringify(res.headers));
            //    res.setEncoding('utf8');
            var d = '';
            res.on('data', function (chunk) {
                d += chunk;
            });

            res.on('end', function () {
                if (res.statusCode === 200) {
                    callback(null, d);
                } else {
                    callback(res.statusCode, d);
                }
            });
        });

        req.on('error', function (e) {
            callback(e);
        });

        if (data) {
            // write data to request body
            req.write(data);
        }

        req.end();
    };

    return ExecutorClient;
});