/**
 * Created by Zsolt on 3/17/14.
 */

var config = require('./config.json'),
    webgme = require('webgme');

// this one sets up only the paths
webGMEGlobal.setConfig(config);

var myServer = new webgme.standaloneServer();
myServer.start();
