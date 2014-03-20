/**
 * Created by zsolt on 3/19/14.
 */


// source: http://stackoverflow.com/questions/20473614/mocha-requirejs-amd-testing

'use strict';
var requirejs = require("requirejs");
requirejs.config({
    baseUrl: '.',
    nodeRequire: require
});

suite('Something', function(){
    var foo;

    setup(function (done){
        // This saves the module foo for use in tests. You have to use
        // the done callback because this is asynchronous.
        requirejs(['src/examples/js/foo'],
            function(mod) {
                console.log("fired!");
                foo = mod;
                done();
            });
    });

    suite('blah', function(){
        test('blah', function(){
            if (foo.test !==  "test")
                throw new Error("failed!");
        });
    });
});