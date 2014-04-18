/**
 * Created by pmeijer on 4/17/2014.
 */

var dbMock = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
];

// Load children takes an integer and returns the same number of children, starting from 0.
var loadChildren = function (node, callback) {
    'use strict';
    var timeOutFunction = function () {
        var i,
            children = [];
        if (typeof node !== 'number' || node < 0 || node > 9) {
            callback('path must be an integer between 0 and 9.', null);
            return;
        }
        for (i = 0; i < node; i += 1) {
            children.push(dbMock[i]);
        }
        callback(null, children);
    };

    setTimeout(timeOutFunction, Math.random() * 250);
};

var selfDotChildren = [];

var main = function (callback) {
    'use strict';
    visitAllChildren(2, function (err) {
        if (err) {
            callback(err);
            return;
        }
        console.log('Collected all children :: ' + selfDotChildren.toString());
        console.log('Total number of nodes  :: ' + selfDotChildren.length);
        console.log('main is done!');
        callback(null);
    });
};

var visitAllChildren = function (node, callback) {
    loadChildren(node, function (err, children) {
        var counter,
            i,
            itrCallback,
            error = '';
        // Check for error in loading before doing recursion.
        if (err) {
            callback('Could not load children for first object, err: ' + err);
            return;
        }
        // Define a counter and callback for the recursion.
        counter = {visits: children.length};
        console.log('Node : ' + node.toString() + ' has ' + children.length.toString() + ' children.');
        itrCallback = function (err) {
            error = err ? error += err : error;
            counter.visits -= 1;
            if (counter.visits === 0) {
                callback(error);
            }
        };
        // Iterate over children and invoke recursion
        for (i = 0; i < children.length; i += 1) {
            selfDotChildren.push(children[i]);
            visitAllChildrenRec(children[i], counter, itrCallback);
        }
    });
};

var visitAllChildrenRec = function (node, counter, callback) {
    loadChildren(node, function (err, children) {
        var i;
        if (err) {
            callback('loadChildren failed for ' + node.toString());
            return;
        }
        console.log('Node : ' + node.toString() + ' has ' + children.length.toString() + ' children.');
        // The current node's children adds to the counter.
        counter.visits += children.length;
        if (children.length === 0) {
            // The only chance for callback to be called.
            callback(null);
        } else {
            // The current node needs to be accounted for.
            counter.visits -= 1;
        }
        for (i = 0; i < children.length; i += 1) {
            selfDotChildren.push(children[i]);
            visitAllChildrenRec(children[i], counter, callback);
        }
    });
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
