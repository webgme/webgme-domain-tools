/**
 * Created by pmeijer on 4/17/2014.
 */

var dbMock = [
    'Node0',
    'Node1',
    'Node2'
];

var loadByPath = function (path, callback) {
    'use strict';
    var timeOutFunction = function () {
        if (typeof path !== 'number' || path < 0 || path > 2) {
            callback('path must be an integer between 0 and 2.', null);
            return;
        }
        callback(null, dbMock[path]);
    };

    setTimeout(timeOutFunction, Math.random() * 250);
};


var main = function (callback) {
    'use strict';
    var i,
        error = '',
        counter = 3,
        itrCallback = function (err, node) {
            if (err) {
                error += err;
            } else {
                console.log('Got node: ' + node);
            }
            counter -= 1;
            if (counter === 0) {
                console.log('All nodes have been visited.');
                callback(error);
            }
        };

    for (i = 0; i < 3; i += 1) {
        loadByPath(i, itrCallback);
        console.log('Picka-boo ' + i.toString());
    }
};

if (require.main === module) {
    main(function (err) {
        if (err) {
            console.log('main failed: ' + err);
        } else {
            console.log('main done!');
        }
    });
}