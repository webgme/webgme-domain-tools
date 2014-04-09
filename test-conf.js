/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Zsolt Lattmann
 *
 * Server side configuration file for all tests.
 */

var PATH = require('path');

var CONFIG = require('./config.json');
var webgme = require('webgme');
webGMEGlobal.setConfig(CONFIG);
var requirejsBase = webGMEGlobal.baseDir;

// specifies all test specific requirejs paths for server side tests
// TODO: read it from the config file
var testConfig = {
    requirejs: {
        paths: {
            mocks: PATH.relative(requirejsBase,PATH.resolve('./src/mocks'))
        }
    }
};

module.exports.testConfig = testConfig;

if (require.main === module) {
    console.log(testConfig);
}