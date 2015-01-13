/*globals describe, it, before*/
/**
 * Created by pmeijer on 1/12/2015.
 */

var chai = require('chai'),
    fs = require('fs'),
    requirejs = require('requirejs'),
    assert = chai.assert;

function XOR(a, b) {
    'use strict';
    return ( a || b ) && !( a && b );
}

describe('Core Mock', function() {
    'use strict';
    var core;

    before(function (done) {
        requirejs(['mocks/CoreMock_v2'],
            function (CoreMock) {
                var model = JSON.parse(fs.readFileSync('test/unit/mocks/flat_test.json', 'utf8'));
                core = new CoreMock(model, { timeouts: [1] });
                done();
            });
    });

    it('getAttribute name', function() {
        var testPath = '/1029223470',
            testNode = core.mockGetNodeByPath(testPath);
        assert.equal(core.getAttribute(testNode, 'name'), 'TestName');
    });

    it('setAttribute name', function() {
        var testPath = '/1406577295',
            testNode = core.mockGetNodeByPath(testPath);
        core.setAttribute(testNode, 'name', 'newName');
        assert.equal(core.getAttribute(testNode, 'name'), 'newName');
    });

    it('getRegistry position', function() {
        var testPath = '/2018335375',
            testNode = core.mockGetNodeByPath(testPath),
            pos;
        pos = core.getRegistry(testNode, 'position');

        assert.equal(pos.x, 260);
        assert.equal(pos.y, 291);
    });

    it('setRegistry position', function() {
        var testPath = '/607366216',
            testNode = core.mockGetNodeByPath(testPath),
            pos,
            newPos = { x: 10, y: 10 };

        core.setRegistry(testNode, 'position', newPos);
        pos = core.getRegistry(testNode, 'position');

        assert.equal(pos.x, 10);
        assert.equal(pos.y, 10);
    });

    it('getParent correct path and name', function() {
        var testPath = '/146679802/1487053016/1879829870',
            testNode = core.mockGetNodeByPath(testPath),
            parentNode = core.getParent(testNode);

        assert.equal(parentNode.id, '/146679802/1487053016');
        assert.equal(core.getAttribute(parentNode, 'name'), 'TestContainer');
    });

    it('getPointerNames/Path correct for pointing node', function() {
        var testPath = '/1109909121/1157805101',
            testNode = core.mockGetNodeByPath(testPath);

        assert.equal(core.getPointerNames(testNode).length, 2);
        assert.equal(core.getPointerPath(testNode, 'TestPoint'), '/1109909121/1368819315');
        assert.equal(core.getPointerPath(testNode, 'base'), '/1008889918/1922772359');
    });

    it('getPointerNames/Path correct for copy of pointing node', function() {
        var testPath = '/1109909121/2065146708',
            testNode = core.mockGetNodeByPath(testPath);

        assert.equal(core.getPointerNames(testNode).length, 2);
        assert.equal(core.getPointerPath(testNode, 'TestPoint'), '/1109909121/1368819315');
        assert.equal(core.getPointerPath(testNode, 'base'), '/1008889918/1922772359');
    });

    it('getPointerNames/Path correct for instance of pointing node', function() {
        var testPath = '/1109909121/1717599495',
            testNode = core.mockGetNodeByPath(testPath);

        assert.equal(core.getPointerNames(testNode).length, 2);
        assert.equal(core.getPointerPath(testNode, 'TestPoint'), '/1109909121/1368819315');
        assert.equal(core.getPointerPath(testNode, 'base'), '/1109909121/1157805101');
    });

    it('getOwnPointerNames/Path correct for pointing node', function() {
        var testPath = '/1109909121/1157805101',
            testNode = core.mockGetNodeByPath(testPath);

        assert.equal(core.getOwnPointerNames(testNode).length, 2);
        //assert.equal(core.getOwnPointerPath(testNode, 'TestPoint'), '/1109909121/1368819315');
        //assert.equal(core.getOwnPointerPath(testNode, 'base'), '/1008889918/1922772359');
    });

    it('getOwnPointerNames/Path correct for copy of pointing node', function() {
        var testPath = '/1109909121/2065146708',
            testNode = core.mockGetNodeByPath(testPath);

        assert.equal(core.getOwnPointerNames(testNode).length, 2);
        //assert.equal(core.getOwnPointerPath(testNode, 'TestPoint'), '/1109909121/1368819315');
        //assert.equal(core.getOwnPointerPath(testNode, 'base'), '/1008889918/1922772359');
    });

    it('getOwnPointerNames/Path correct for instance of pointing node', function() {
        var testPath = '/1109909121/1717599495',
            testNode = core.mockGetNodeByPath(testPath);

        assert.equal(core.getOwnPointerNames(testNode).length, 1);
//        assert.equal(core.getOwnPointerPath(testNode, 'TestPoint'), undefined);
//        assert.equal(core.getOwnPointerPath(testNode, 'base'), '/1109909121/1157805101');
    });

    it('getCollectionNames/Paths correct of pointed node after copy and instantiation of pointing node', function() {
        var testPath = '/1109909121/1368819315',
            testNode = core.mockGetNodeByPath(testPath),
            cNames = core.getCollectionNames(testNode),
            cPaths;

        assert.equal(cNames.length, 1);
        assert.equal(cNames[0], 'TestPoint');
        cPaths = core.getCollectionPaths(testNode, 'TestPoint');
        assert.equal(cPaths.length, 2);
        assert.equal(cPaths.indexOf('/1109909121/1157805101') > -1, true);
        assert.equal(cPaths.indexOf('/1109909121/2065146708') > -1, true);
    });

    it('loadCollection correct of pointed node after copy and instantiation of pointing node', function(done) {
        var testPath = '/1109909121/1368819315',
            testNode = core.mockGetNodeByPath(testPath),
            expectedIds = {
                '/1109909121/1157805101': 0,
                '/1109909121/2065146708': 0
            };

        core.loadCollection(testNode, 'TestPoint', function(err, pNodes) {
            var i;
            assert.equal(err, null);
            for (i = 0; i < pNodes.length; i += 1) {
                assert.equal(expectedIds.hasOwnProperty(pNodes[i].id), true);
                expectedIds[pNodes[i].id] += 1;
            }
            assert.equal(expectedIds['/1109909121/1157805101'], 1);
            assert.equal(expectedIds['/1109909121/2065146708'], 1);
            done();
        });
    });

    it('hasPointer dst/src true for connection', function () {
        var testPath = '/146679802/1487053016/1879829870',
            testNode = core.mockGetNodeByPath(testPath);
        assert.equal(core.hasPointer(testNode, 'dst'), true);
        assert.equal(core.hasPointer(testNode, 'src'), true);
    });

    it('getPointerPath correct for dst/src for connection', function () {
        var testPath = '/146679802/1487053016/1879829870',
            testNode = core.mockGetNodeByPath(testPath);
        assert.equal(core.getPointerPath(testNode, 'dst'), '/146679802/1487053016/2053279246');
        assert.equal(core.getPointerPath(testNode, 'src'), '/146679802/1487053016/153477860');
    });

    it('getCollectionNames correct for dst/src for connection', function () {
        var testPath = '/146679802/1487053016/2053279246',
            testNode = core.mockGetNodeByPath(testPath);
        assert.equal(core.getCollectionNames(testNode).length, 1);
        assert.equal(core.getCollectionNames(testNode)[0], 'dst');
    });

    it('getCollectionPaths correct for dst/src for connection', function () {
        var testPath = '/146679802/1487053016/2053279246',
            testNode = core.mockGetNodeByPath(testPath);
        assert.equal(core.getCollectionPaths(testNode, 'dst').length, 1);
        assert.equal(core.getCollectionPaths(testNode, 'dst')[0], '/146679802/1487053016/1879829870');
    });

    it('name and names of children of copied node is same', function() {
        var testPath = '/146679802/1487053016',
            testNode = core.mockGetNodeByPath(testPath),
            parentNode = core.getParent(testNode),
            i,
            children,
            names = {
                Conn1: 0,
                Conn2: 0,
                Composition: 0
            },
            childName,
            newNode = core.copyNode(testNode, parentNode);
        assert.equal(core.getAttribute(testNode, 'name'), core.getAttribute(newNode, 'name'));
        children = core.mockGetChildren(newNode);
        for (i = 0; i < children.length; i+= 1) {
            childName = core.getAttribute(children[i], 'name');
            assert.equal(names.hasOwnProperty(childName), true);
            names[childName] += 1;
        }
        for (i in names){
            if (names.hasOwnProperty(i)) {
                assert.equal(names[i], 1);
            }
        }
    });

    it('internal pointers point to nodes in copied node', function() {
        var testPath = '/146679802/1487053016',
            testNode = core.mockGetNodeByPath(testPath),
            parentNode = core.getParent(testNode),
            i,
            children,
            childName,
            pPath,
            pNode,
            newNode = core.copyNode(testNode, parentNode);

        children = core.mockGetChildren(newNode);
        for (i = 0; i < children.length; i+= 1) {
            childName = core.getAttribute(children[i], 'name');
            if (childName === 'Composition') {
                assert.equal(core.hasPointer(children[i], 'dst'), true);
                assert.equal(core.hasPointer(children[i], 'src'), true);
                pPath = core.getPointerPath(children[i], 'dst');
                pNode = core.mockGetNodeByPath(pPath);
                assert.equal(newNode.id, core.getParent(pNode).id);
                pPath = core.getPointerPath(children[i], 'src');
                pNode = core.mockGetNodeByPath(pPath);
                assert.equal(newNode.id, core.getParent(pNode).id);
                break;
            }
        }
    });

    it('name and names of children of base and instance is same', function() {
        var testPath = '/785604039/1487053016',
            testNode = core.mockGetNodeByPath(testPath),
            parentNode = core.getParent(testNode),
            i,
            children,
            names = {
                Conn1: 0,
                Conn2: 0,
                Composition: 0
            },
            childName,
            newNode = core.createNode({ base: testNode, parent: parentNode });
        assert.equal(core.getAttribute(testNode, 'name'), core.getAttribute(newNode, 'name'));
        children = core.mockGetChildren(newNode);
        for (i = 0; i < children.length; i+= 1) {
            childName = core.getAttribute(children[i], 'name');
            assert.equal(names.hasOwnProperty(childName), true);
            names[childName] += 1;
        }
        for (i in names){
            if (names.hasOwnProperty(i)) {
                assert.equal(names[i], 1);
            }
        }
    });

    it('internal pointers point to nodes in base of instance', function() {
        var testPath = '/785604039/1487053016',
            testNode = core.mockGetNodeByPath(testPath),
            parentNode = core.getParent(testNode),
            i,
            children,
            childName,
            pPath,
            pNode,
            newNode = core.createNode({ base: testNode, parent: parentNode });

        children = core.mockGetChildren(newNode);
        for (i = 0; i < children.length; i+= 1) {
            childName = core.getAttribute(children[i], 'name');
            if (childName === 'Composition') {
                assert.equal(core.hasPointer(children[i], 'dst'), true);
                assert.equal(core.hasPointer(children[i], 'src'), true);
                pPath = core.getPointerPath(children[i], 'dst');
                pNode = core.mockGetNodeByPath(pPath);
                assert.equal(testNode.id, core.getParent(pNode).id);
                pPath = core.getPointerPath(children[i], 'src');
                pNode = core.mockGetNodeByPath(pPath);
                assert.equal(testNode.id, core.getParent(pNode).id);
                break;
            }
        }
    });

    it('external pointers point to original node after copy', function() {
        var testPath = '/1899800446/1603277152',
            testNode = core.mockGetNodeByPath(testPath),
            parentNode = core.getParent(testNode),
            pNode = core.mockGetNodeByPath('/1899800446/1944646755'),
            cPaths = core.getCollectionPaths(pNode, 'TestPoint'),
            newNode;
        assert.equal(cPaths.length, 1);
        newNode = core.copyNode(testNode, parentNode);

        cPaths = core.getCollectionPaths(pNode, 'TestPoint');
        assert.equal(cPaths.length, 2);

        // Check that one and only one of the collection paths is within the new Node
        assert.equal( XOR(
            core.getParent(core.mockGetNodeByPath(cPaths[0])).id === newNode.id,
            core.getParent(core.mockGetNodeByPath(cPaths[1])).id === newNode.id), true);
    });


});