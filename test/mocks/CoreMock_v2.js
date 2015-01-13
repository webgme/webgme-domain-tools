/*globals setTimeout, define */

/*
 *
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * @author pmeijer / https://github.com/pmeijer
 */

define([], function () {

    /**
     *
     * @param {Object} model - output from flatten_project.py
     * @param {Object} opts - options for the instance.
     * @param {number[]} opts.timeouts - Array of timeout durations for calls, see wrapInAsynch for more info.
     * @returns {Object} - Mock of the core in webgme.
     * @constructor
     */
    var CoreMock = function (model, opts) {

        var tree = model.tree,
            nodes = model.nodes,
            timeoutTimes = opts.timeouts || [10],
            mod = timeoutTimes.length,
            relid = 2,
            asynchCount = 0;

        /**** Internal helper functions ****/
        function getTreeNode(path) {
            var paths = path.split('/'),
                treeNode = tree,
                i;
            try {
                for (i = 0; i < paths.length; i += 1) {
                    treeNode = treeNode[paths[i]];
                }
                return treeNode;
            } catch (err) {
                throw new Error('Given path does not exist! ' + path);
            }
        }

        function wrapInAsynch(func) {
            var timeoutTime = timeoutTimes[asynchCount % mod];
            asynchCount += 1;
            console.log('DEBUG: Asynch #' + asynchCount.toString() + ' : ' + timeoutTime.toString() +
                ' ms :: "' + arguments.callee.caller.name + '"');
            setTimeout(func, timeoutTime);
        }

        function addNewNode(baseNode, baseGuid, parentTreeNode, copy) {
            var newGuid,
                newId,
                setNames,
                i,
                newNode;

            relid += 1;
            newId = nodes[parentTreeNode.guid].id + '/' + relid.toString();
            newGuid = generateGUID();

            if (copy) {
                newNode = JSON.parse(JSON.stringify(baseNode));
                newNode.id = newId;
                newNode.parent = parentTreeNode.guid;
                newNode.collection = {};
            } else {
                newNode = {
                    attributes: {},
                    base: baseGuid,
                    id: newId,
                    meta: JSON.parse(JSON.stringify(baseNode.meta)),
                    parent: parentTreeNode.guid,
                    pointers: {
                        'base': baseGuid
                    },
                    registry: {},
                    sets: {}
                };
                setNames = Object.keys(baseNode.sets);
                for (i = 0; i < setNames.length; i += 1) {
                    newNode.sets[setNames[i]] = [];
                }
            }

            nodes[newGuid] = newNode;

            return newGuid;
        }

        function buildTreeRec(baseTreeNode, treeNode, orgToCopy, copy) {
            var key,
                newGuid,
                newTreeNode;
            for (key in baseTreeNode) {
                if (baseTreeNode.hasOwnProperty(key) && key !== 'guid') {

                    newGuid = addNewNode(nodes[baseTreeNode[key].guid], baseTreeNode[key].guid, treeNode, copy);
                    if (orgToCopy) {
                        orgToCopy[baseTreeNode[key].guid] = newGuid;
                    }
                    newTreeNode = { guid: newGuid };
                    treeNode[relid.toString()] = newTreeNode;
                    buildTreeRec(baseTreeNode[key], newTreeNode);
                }
            }
        }

        function updatePointers(treeNode, orgToCopy) {
            var node = nodes[treeNode.guid],
                pName,
                key,
                copyGuid,
                pGuid;
            for (pName in node.pointers) {
                if (node.pointers.hasOwnProperty(pName) && pName !== 'base') {
                    pGuid = node.pointers[pName];
                    copyGuid = orgToCopy[pGuid];
                    if (copyGuid) {
                        // The pointer target was within the copied node.
                        // Set the pointer to the newly create child.
                        node.pointers[pName] = copyGuid;
                        // Update the collection of this child.
                        nodes[copyGuid].collection[pName] = nodes[copyGuid].collection[pName] || [];
                        nodes[copyGuid].collection[pName].push(treeNode.guid);
                    } else {
                        // The pointer target was outside of copied node.
                        // Keep the pointer, but update the collection of the target node.
                        nodes[pGuid].collection[pName].push(treeNode.guid);
                    }
                }
            }
            for (key in treeNode) {
                if (treeNode.hasOwnProperty(key) && key !== 'guid') {
                    updatePointers(treeNode[key], orgToCopy);
                }
            }
        }

        /**** External test helper functions, e.g. for running plugin or setting up some context. ****/
        function mockGetRootNode() {
            var rootPath = Object.keys(tree)[0];
            return nodes[tree[rootPath].guid];
        }

        function mockGetNodeByPath(path) {
            var result = nodes[getTreeNode(path).guid];
            if (result) {
                return result;
            } else {
                throw new Error('Path does not exist: ' + path);
            }
        }

        function mockGetNodeByGuid(guid) {
            var result = nodes[guid];
            if (result) {
                return result;
            } else {
                throw new Error('Guid does not exist: ' + guid);
            }
        }

        function mockGetTree() {
            return tree;
        }

        function mockGetNodes() {
            return nodes;
        }

        function mockGetChildren(node) {
            var treeNode = getTreeNode(node.id),
                key,
                result = [];
            for (key in treeNode) {
                if (treeNode.hasOwnProperty(key) && key !== 'guid') {
                    result.push(nodes[treeNode[key].guid]);
                }
            }
            return result;
        }

        /**** Basic functions ****/
        function loadRoot(callback) {
            wrapInAsynch(function () {
                var rootPath = Object.keys(tree)[0];
                console.log('RootPath is "' + rootPath + '".');
                callback(null, nodes[tree[rootPath].guid]);
            });
        }

        function loadByPath(rootNode, pathToObject, callback) {
            wrapInAsynch(function () {
                var guid;
                try {
                    guid = getTreeNode(pathToObject).guid;
                    callback(null, nodes[guid]);
                } catch (err) {
                    callback(err.toString());
                }
            });
        }

        function getPath(node) {
            return node.id;
        }

        function getGuid(node) {
            return getTreeNode(node.id).guid;
        }

        function getBase(node) {
            return nodes[node.base];
        }

        function getAttribute(node, name) {
            if (node.attributes.hasOwnProperty(name)) {
                return node.attributes[name];
            } else {
                node = nodes[node.base];
                while (node) {
                    if (node.attributes.hasOwnProperty(name)) {
                        return node.attributes[name];
                    }
                    node = nodes[node.base];
                }
                throw new Error('Attribute does not exist!');
            }
        }

        function setAttribute(node, name, value) {
            node.attributes[name] = value;
        }

        function getRegistry(node, name) {
            if (node.registry.hasOwnProperty(name)) {
                return node.registry[name];
            } else {
                node = nodes[node.base];
                while (node) {
                    if (node.registry.hasOwnProperty(name)) {
                        return node.registry[name];
                    }
                    node = nodes[node.base];
                }
                throw new Error('Registry does not exist!');
            }
        }

        function setRegistry(node, name, value) {
            node.registry[name] = value;
        }

        /**** Containment ****/
        function getParent(node) {
            return nodes[node.parent];
        }

        function getChildrenRelids(node) {
            var treeNode = getTreeNode(node.id),
                key,
                result = [];

            for (key in treeNode) {
                if (treeNode.hasOwnProperty(key) && key !== 'guid') {
                    result.push(key);
                }
            }
            return result;
        }

        function getChildrenPaths(node) {
            var result = [],
                relIds = getChildrenRelids(node),
                i;
            for (i = 0; i < relIds.length; i += 1) {
                result.push(node.id + '/' + relIds[i]);
            }
            return result;
        }

        function loadChildren(node, callback) {
            wrapInAsynch(function () {
                var treeNode = getTreeNode(node.id),
                    key,
                    result = [];
                for (key in treeNode) {
                    if (treeNode.hasOwnProperty(key) && key !== 'guid') {
                        result.push(nodes[treeNode[key].guid]);
                    }
                }
                callback(null, result);
            });
        }

        /**** Creators ****/
        function createNode(parameters) {
            var baseTreeNode,
                newTreeNode,
                newGuid,
                parentTreeNode;
            console.assert (typeof parameters.parent === 'object' && typeof parameters.base === 'object' &&
                parameters.parent !== null && parameters.base !== null);

            baseTreeNode = getTreeNode(parameters.base.id);
            parentTreeNode = getTreeNode(parameters.parent.id);
            newGuid = addNewNode(parameters.base, baseTreeNode.guid, parentTreeNode);
            newTreeNode = { guid: newGuid };
            parentTreeNode[relid.toString()] = newTreeNode;
            buildTreeRec(baseTreeNode, newTreeNode, null, false); // false -> no copy
            return nodes[newGuid];
        }

        function copyNode(node, parent) {
            var baseTreeNode,
                newTreeNode,
                newGuid,
                parentTreeNode,
                orgToCopy = {};

            baseTreeNode = getTreeNode(node.id);
            parentTreeNode = getTreeNode(parent.id);
            // Make a copy of node
            newGuid = addNewNode(node, baseTreeNode.guid, parentTreeNode, true); // true -> copy

            // Insert and update the containment tree
            newTreeNode = { guid: newGuid };
            orgToCopy[baseTreeNode.guid] = newGuid;
            parentTreeNode[relid.toString()] = newTreeNode;
            buildTreeRec(baseTreeNode, newTreeNode, orgToCopy, true); // true -> copy

            // Go through all new pointers and update the internal ones.
            updatePointers(newTreeNode, orgToCopy);

            return nodes[newGuid];
        }

        /**** Pointers/Collections ****/
        function getOwnPointerNames(node) {
            return Object.keys(node.pointers);
        }

        function getOwnPointerPath(node, name) {
            return nodes[node.pointers[name]].id;
        }

        function getPointerNames(node) {
            var names = [],
                addUniqueNames = function (node) {
                    var i,
                        pNames = Object.keys(node.pointers);
                    for (i = 0; i < pNames.length; i += 1) {
                        if (names.indexOf(pNames[i]) === -1) {
                            names.push(pNames[i]);
                        }
                    }
                };
            addUniqueNames(node);
            node = nodes[node.base];
            while (node) {
                addUniqueNames(node);
                node = nodes[node.base];
            }
            return names;
        }

        function setPointer(node, name, target) {
            var nodeGuid = getTreeNode(node.id),
                prevTarget,
                indexOfPrev,
                targetGuid = getTreeNode(target.id);

            node.pointers = node.pointers || {};
            prevTarget = node.pointers[name];
            node.pointers[name] = targetGuid;

            if (prevTarget) {
                indexOfPrev = nodes[prevTarget].collection[name].indexOf(nodeGuid);
                nodes[prevTarget].collection[name].splice(indexOfPrev, 1);
            }

            target.collection = target.collection || {};
            target.collection[name] = target.collection[name] || [];
            target.collection[name].push(nodeGuid);
        }

        function hasPointer(node, name) {
            return getPointerNames(node).indexOf(name) > -1;
        }

        function getPointerPath(node, name) {
            var result;
            if (node.pointers.hasOwnProperty(name)) {
                result = nodes[node.pointers[name]].id;
            } else {
                node = nodes[node.base];
                while (node) {
                    if (node.pointers.hasOwnProperty(name)) {
                        result = nodes[node.pointers[name]].id;
                        break;
                    }
                    node = nodes[node.base];
                }
            }
            return result;
        }

        function loadPointer(node, name, callback) {
            wrapInAsynch(function () {
                var result;
                if (node.pointers.hasOwnProperty(name)) {
                    result = nodes[node.pointers[name]];
                } else {
                    node = nodes[node.base];
                    while (node) {
                        if (node.pointers.hasOwnProperty(name)) {
                            result = nodes[node.pointers[name]];
                            break;
                        }
                        node = nodes[node.base];
                    }
                }
                callback(null, result);
            });
        }

        function getCollectionNames(node) {
            if (node.collection) {
                return Object.keys(node.collection);
            } else {
                return [];
            }
        }

        function getCollectionPaths(node, name) {
            if (node.collection && node.collection[name]) {
                return node.collection[name].map(function(guid) {
                    return nodes[guid].id;
                });
            } else {
                return [];
            }
        }

        function loadCollection(node, name, callback) {
            var paths = getCollectionPaths(node, name);
            wrapInAsynch(function () {
                var guid,
                    collection = [],
                    i;
                try {
                    for (i = 0; i < paths.length; i += 1) {
                        guid = getTreeNode(paths[i]).guid;
                        collection.push(nodes[guid]);
                    }
                    callback(null, collection);
                } catch (err) {
                    callback(err.toString());
                }
            });
        }

        /**** Sets ****/
        function getSetNames(node) {
            return Object.keys(node.sets);
        }

        function getSetNumbers(node) {
            return Object.keys(node.sets).length;
        }

        function getMemberPaths(node, name) {
            var paths = [],
                members = node.sets[name],
                addMembers = function (members) {
                    var i;
                    for (i = 0; i < members.length; i += 1) {
                        paths.push(nodes[members[i].guid].id);
                    }
                };

            if (members) {
                addMembers(members);
                node = nodes[node.base];
                members = node.sets[name];
                while (node && members) {
                    addMembers(members);
                    node = nodes[node.base];
                    members = node.sets[name];
                }
            }
            return paths;
        }

        function getMemberAttributeNames(node, setName, memberPath) {
            var result = [],
                members = node.sets[setName],
                guid = getTreeNode(memberPath).guid,
                i;
            if (members) {
                for (i = 0; i < members.length; i += 1) {
                    if (members[i].guid === guid) {
                        result = Object.keys(members[i].attributes);
                        break;
                    }
                }
            }
            return result;
        }

        function getMemberAttribute(node, setName, memberPath, attrName) {
            var result,
                members = node.sets[setName],
                guid = getTreeNode(memberPath).guid,
                i;
            if (members) {
                for (i = 0; i < members.length; i += 1) {
                    if (members[i].guid === guid) {
                        result = members[i].attributes[attrName];
                        break;
                    }
                }
            }
            return result;
        }

        function getMemberRegistryNames(node, setName, memberPath) {
            var result = [],
                members = node.sets[setName],
                guid = getTreeNode(memberPath).guid,
                i;
            if (members) {
                for (i = 0; i < members.length; i += 1) {
                    if (members[i].guid === guid) {
                        result = Object.keys(members[i].registry);
                        break;
                    }
                }
            }
            return result;
        }

        function getMemberRegistry(node, setName, memberPath, regName) {
            var result,
                members = node.sets[setName],
                guid = getTreeNode(memberPath).guid,
                i;
            if (members) {
                for (i = 0; i < members.length; i += 1) {
                    if (members[i].guid === guid) {
                        result = members[i].registry[regName];
                        break;
                    }
                }
            }
            return result;
        }

        return {
            loadRoot: loadRoot,
            loadByPath: loadByPath,
            getPath: getPath,
            getGuid: getGuid,
            getBase: getBase,

            getAttribute: getAttribute,
            setAttribute: setAttribute,
            getRegistry: getRegistry,
            setRegistry: setRegistry,

            getParent: getParent,
            getChildrenRelids: getChildrenRelids,
            getChildrenPaths: getChildrenPaths,
            loadChildren: loadChildren,

            createNode: createNode,
            copyNode: copyNode,

            getOwnPointerNames: getOwnPointerNames,
            getOwnPointerPath: getOwnPointerPath,
            getPointerNames: getPointerNames,
            hasPointer: hasPointer,
            getPointerPath: getPointerPath,
            loadPointer: loadPointer,
            setPointer: setPointer,

            getCollectionNames: getCollectionNames,
            getCollectionPaths: getCollectionPaths,
            loadCollection: loadCollection,

            getSetNames: getSetNames,
            getSetNumbers: getSetNumbers,
            getMemberPaths: getMemberPaths,
            getMemberAttributeNames: getMemberAttributeNames,
            getMemberAttribute: getMemberAttribute,
            getMemberRegistryNames: getMemberRegistryNames,
            getMemberRegistry: getMemberRegistry,

            /* These are ONLY utilities for setting up a context! */
            mockGetRootNode: mockGetRootNode,
            mockGetNodeByPath: mockGetNodeByPath,
            mockGetNodeByGuid: mockGetNodeByGuid,
            mockGetTree: mockGetTree,
            mockGetNodes: mockGetNodes,
            mockGetChildren: mockGetChildren
        };
    };

    function generateGUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    return CoreMock;
});