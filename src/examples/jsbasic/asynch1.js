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
    loadByPath(0, function (err, node) {
        if (err) {
            callback('loadByPath failed with error:' + err);
            return;
        }
        console.log('Got node: ' + node);
        callback(null);
    });
    console.log('Picka-boo!');
};


if (require.main === module) {
    main(function (err) {
       if (err) {
           console.log('main1 failed: ' + err);
       } else {
           console.log('main1 done!');
       }
    });
}

