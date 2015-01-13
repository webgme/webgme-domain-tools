/*globals describe, it, before*/
/**
 * Created by pmeijer on 1/12/2015.
 */

var chai = require('chai'),
    fs = require('fs'),
    requirejs = require('requirejs'),
    assert = chai.assert;


describe('Core Mock', function() {
    'use strict';
    var core;

    before(function (done) {
        requirejs(['mocks/CoreMock_v2'],
            function (CoreMock) {
                var model = JSON.parse(fs.readFileSync('test/unit/mocks/flat_test.json', 'utf8'));
                core = new CoreMock(model, {});
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

    it('name and names of children of instantiated node is same', function() {
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

    it('internal pointers point to nodes in base', function() {
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
});