/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Zsolt Lattmann
 *
 * Karma configuration
 * Generated on Wed Mar 26 2014 12:22:22 GMT-0500 (Central Daylight Time)
 *
 */

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'requirejs', 'chai', 'express-http-server'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'node_modules/webgme/src/client/lib/**/*.js', included: false},
      {pattern: 'node_modules/webgme/src/plugin/**/*.js', included: false},
      {pattern: 'node_modules/webgme/src/middleware/blob/*.js', included: false},
      {pattern: 'node_modules/webgme/src/middleware/executor/*.js', included: false},
      {pattern: 'node_modules/webgme/src/common/core/*.js', included: false},
      {pattern: 'lib/**/*.js', included: false},
      {pattern: 'support/**/*.js', included: false},
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'test/mocks/*.js', included: false},
      {pattern: 'test/models/**/*.js', included: false},

      {pattern: 'test/**/*Spec.js', included: false},
      {pattern: 'node_modules/webgme/src/middleware/blob/*Spec.js', included: false},

      'test-main.js'
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

      proxies: {
          '/rest': 'http://localhost:8965/rest'
      },

      expressHttpServer: {
          port: 8965,
          appVisitor: function (app, log) {
              function ensureAuthenticated(req, res, next) {
                  req.session = {udmId: 'karma_test_user'};
                  next();
              };
              var webgme = require('webgme');
              var gmeConfig = require('./config');
              //global.WebGMEGlobal.setConfig(config);

              var requirejs = webgme.requirejs;

              requirejs(['blob/BlobFSBackend', 'blob/BlobServer'], function(BlobFSBackend, BlobServer) {
                  var blobBackend = new BlobFSBackend(gmeConfig);
                  BlobServer.createExpressBlob(app, blobBackend, ensureAuthenticated, log);
              });
              app.use(function(req, res, next) {
                  // TODO: possible race between client and above requirejs call
                  next();
              });
              app.get('/rest/blob/istesting', function (req, res) {
                  res.end('done', 200);
              });
          }
      }
  });
};
