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

    var syncWorkAtNode = function (node, parentNode, siblings) {
        console.log('node' + node.toString() + ' with parent' + parentNode.toString() +
            ' has siblings ' + siblings.toString());
        selfDotChildren.push(node);
    };

    visitAllChildren(4, syncWorkAtNode, function (err) {
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

var visitAllChildren = function (node, syncWorkAtNode, callback) {
    loadChildren(node, function (err, children) {
        var counter,
            i,
            itrCallback,
            error = '';
        if (err) {
            callback('Could not load children for first object, err: ' + err);
            return;
        }
        counter = {visits: children.length};
        itrCallback = function (err) {
            error = err ? error += err : error;
            counter.visits -= 1;
            if (counter.visits === 0) {
                callback(error);
            }
        };
        for (i = 0; i < children.length; i += 1) {
            syncWorkAtNode(children[i], node, children);
            visitAllChildrenRec(children[i], counter, syncWorkAtNode, itrCallback);
        }
    });
};

var visitAllChildrenRec = function (node, counter, syncWorkAtNode, callback) {
    loadChildren(node, function (err, children) {
        var i;
        if (err) {
            callback('loadChildren failed for ' + node.toString());
            return;
        }
        counter.visits += children.length;
        if (children.length === 0) {
            callback(null);
        } else {
            counter.visits -= 1;
        }
        for (i = 0; i < children.length; i += 1) {
            syncWorkAtNode(children[i], node, children);
            visitAllChildrenRec(children[i], counter, syncWorkAtNode, callback);
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