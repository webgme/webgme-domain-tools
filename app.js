/**
 * Created by Zsolt on 3/17/14.
 */

var config = require('./config.json'),
    webgme = require('webgme');

var myServer = new webgme.standaloneServer(config);
myServer.start();
