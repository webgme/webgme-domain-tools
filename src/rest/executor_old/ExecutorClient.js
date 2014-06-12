/**
 * Created by Zsolt on 5/21/2014.
 * 
 * THIS IS A THROW AWAY CODE AND IMPLEMENTATION.
 *
 * TEMPORARY CODE AND IMPLEMENTATION.
 *
 */

define([], function () {

    var ExecutorClient = function () {

        // TODO: TOKEN???
        this.executorUrl = '/rest/external/executor_old/'; // TODO: any ways to ask for this or get it from the configuration?
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
        var oReq = new XMLHttpRequest();
        oReq.open("POST", this.getCreateURL(hash), true);
        oReq.onload = function (oEvent) {
            // Uploaded.
            var response = JSON.parse(oEvent.target.response);
            callback(null, response);
        };

        // data is a file object or blob
        oReq.send();
    };


    ExecutorClient.prototype.getInfo = function (hash, callback) {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", this.getInfoURL(hash), true);
        oReq.onload = function (oEvent) {
            // Uploaded.
            var response = JSON.parse(oEvent.target.response);
            // TODO: handle error
            callback(null, response);
        };

        // data is a file object or blob
        oReq.send();
    };

    ExecutorClient.prototype.getAllInfo = function (callback) {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", this.getInfoURL(), true);
        oReq.onload = function (oEvent) {
            // Uploaded.
            var response = JSON.parse(oEvent.target.response);
            // TODO: handle error
            callback(null, response);
        };

        // data is a file object or blob
        oReq.send();
    };

    return ExecutorClient;
});