/**
 * Created by Zsolt on 3/17/14.
 */

var webgme = require('webgme');

// TODO: make this nicer...
var CONFIG = {
    port: 8888,
    autorecconnect: true,
    reconndelay: 1000,
    reconnamount: 1000,

    //used by the server
    loglevel: 2, // 5 = ALL, 4 = DEBUG, 3 = INFO, 2 = WARNING, 1 = ERROR, 0 = OFF
    logfile: 'server.log',
    mongoip: 'zsolt-ws.isis.vanderbilt.edu',
    mongoport: 27017,
    mongodatabase: "multi",
    authentication: false,
    httpsecure: false,
    guest: false,
    sessioncookieid : 'webgmeSid',
    sessioncookiesecret : 'meWebGMEez',
    debug: false,

    // Extra application configuration
    basedir: __dirname + '/node_modules/webgme',
    clientbasedir: __dirname + '/node_modules/webgme/client',
    decoratorpaths: ['./decorators', __dirname + '/node_modules/webgme/client/decorators'],
    //interpreterpaths: ['./interpreters']
};

var myServer = new webgme.standaloneServer(CONFIG);
myServer.start();
