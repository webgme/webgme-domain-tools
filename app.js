/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Zsolt Lattmann
 */

var config = require('./config.json'),
    webgme = require('webgme');

// updating default configuration with ours
WebGMEGlobal.setConfig(config);

// standalone server uses WebGMEGlobal.getConfig() if no configuration defined
var myServer = new webgme.standaloneServer();
myServer.start();
