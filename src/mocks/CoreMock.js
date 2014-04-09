/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Zsolt Lattmann
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

    CoreMock.prototype.loadByPath = function (dummyNode, pathToObject, callback) {
        // dummyNode is never used (pass null) since all nodes are accessable from this._nodes.
        var err,
            node;

        if (this._nodes.hasOwnProperty(pathToObject)) {
            node = this._nodes[pathToObject];
        } else {
            err = 'Given path : ' + pathToObject + 'does not exist!';
        }

        callback(err, node);
    };

    CoreMock.prototype.loadChildren = function (node, callback) {
        var err,
            childNodes = [],
            i;
        for (i = 0; i < node.children.length; i += 1) {
            childNodes.push(this._nodes[node.children[i]]);
        }

        callback(err, childNodes);
    };

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
        if (target.collection[name]) {
            target.collection[name].push(node.path);
        } else {
            target.collection[name] = [node.path];
        }
    };

    CoreMock.prototype.hasPointer = function (node, name) {
        return node.pointers.hasOwnProperty(name);
    };

    CoreMock.prototype.loadPointer = function (node, name, callback) {
        var err,
            pointer;
        if (this.hasPointer(node, name)) {
            pointer = this._nodes[node.pointers[name]];
        } else {
            err = this.getAttribute(node, 'name') + ' does not have a pointer ' + name;
        }
        callback(err, pointer);
    };

    CoreMock.prototype.getBase = function (node) {
        // FIXME: temporary change to fix tests, please review it.
        return this._nodes[node.pointers['base']];
    };

    CoreMock.prototype.getParent = function (node) {
        return this._nodes[node.parent];
    };

    CoreMock.prototype.getGuid = function (node) {
        return node.guid;
    };

    CoreMock.prototype.getCollectionNames = function (node) {
        return Object.keys(node.collection);
    };

    CoreMock.prototype.loadCollection = function (node, name, callback) {
        var colNodes = [],
            err,
            i,
            nodeIds = node.collection[name];
        if (nodeIds) {
            for (i = 0; i < nodeIds.length; i += 1) {
                colNodes.push(this._nodes[nodeIds[i]]);
            }
        } else {
            err = this.getAttribute(node, 'name') + ' does not have a collection ' + name;
        }
        callback(err, colNodes);
    };

    return CoreMock;
});