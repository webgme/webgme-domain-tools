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

var testConfig = {
    requirejs: {
        paths: {
            mocks: PATH.relative(requirejsBase,PATH.resolve('./src/mocks'))
        }
    }
};

//if (CONFIG.hasOwnProperty('pluginBasePaths')) {
//
//    // resolve plugin base paths for requirejs
//
//    if (CONFIG.pluginBasePaths && CONFIG.pluginBasePaths.length) {
//
//
//        for (var i = 0; i < CONFIG.pluginBasePaths.length; i++) {
//            var baseDir = CONFIG.pluginBasePaths[i];
//
//            var subDirs = fs.readdirSync(CONFIG.pluginBasePaths[i]);
//            for (var j = 0; j < subDirs.length; j++) {
//                var subDir = subDirs[j];
//                var fileName = path.join(baseDir, subDir, subDir + '.js');
//                if (fs.existsSync(fileName)) {
//                    //console.log('plugin/' + subDir + " : " + baseDir);
//                    testConfig.requirejs.paths['plugin/' + subDir] = baseDir;
//                }
//            }
//        }
//    }
//}

module.exports.testConfig = testConfig;

if (require.main === module) {
    console.log(testConfig);
}