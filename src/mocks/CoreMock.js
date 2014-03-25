/**
 * Created by Zsolt on 3/20/14.
 */



'use strict';
define(['./NodeMock'], function (NodeMock) {

    var CoreMock = function () {
        this._nodes = {};

        var options = {};
        var node = new NodeMock(this, options);

        this._nodes[this.getPath(node)] = node;
        this._rootNode = node;
    };

    CoreMock.prototype.createNode = function (options) {
        // FIXME: add error handling

        var node = new NodeMock(this, options);

        this._nodes[this.getPath(node)] = node;

        return node;
    };

    CoreMock.prototype.addChild = function (node, child) {
        node.children.push(this.getPath(child));
    };

    // FIXME: this method does not exist on the core API! This should be moved to the StorageMock.
    CoreMock.prototype.getRootNode = function () {
        return this._rootNode;
    };

    CoreMock.prototype.loadByPath = function (dummyNode, pathToObject) {
        return this._nodes[pathToObject];
    };
    // FIXME: How would this be called in a synchronous context?
//    CoreMock.prototype.loadByPath = function (dummyNode, pathToObject, callback) {
//        // dummyNode is never used (pass null) since all nodes are accessable from this._nodes.
//        var err,
//            node;
//
//        if (pathToObject in this._nodes) {
//            err = 'Given path : ' + pathToObject + 'does not exist!';
//        } else {
//            node = this._nodes[pathToObject];
//        }
//
//        callback(err, node);
//    };

    CoreMock.prototype.getPath = function (node) {
        return node.path;
    };

    CoreMock.prototype.setAttribute = function (node, name, value) {
        node.attributes[name] = value;
    };

    CoreMock.prototype.getAttribute = function (node, name) {
        return node.attributes[name];
    };

    CoreMock.prototype.setRegistry = function (node, name, value) {
        node.registry[name] = value;
    };

    CoreMock.prototype.getRegistry = function (node, name) {
        return node.registry[name];
    };

    CoreMock.prototype.setPointer = function (node, name, target) {
        node.pointers[name] = this.getPath(target);
    };

    CoreMock.prototype.getPointer = function (node, name) {
        return this._nodes[node.pointers[name]];
    };

    CoreMock.prototype.getBase = function (node) {
        return this.getPointer(node, 'base');
    };

    return CoreMock;
});