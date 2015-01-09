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

        /**** External test helper functions, e.g. for running plugin or setting up some context. ****/
        function _getRootNode() {
            var rootPath = Object.keys(tree)[0];
            return nodes[tree[rootPath].guid];
        }

        function _getNodeByPath(path) {
            return nodes[getTreeNode(path).guid];
        }

        function _getNodeByGuid(guid) {
            return nodes[guid];
        }

        /**** Basic functions ****/
        function loadRoot(callback) {
            wrapInAsynch(function () {
                var rootPath = Object.keys(tree)[0];
                console.log('RootPath is "' + rootPath + '".');
                callback(null, nodes[tree[rootPath].guid]);
            });
        }

        function loadByPath(node, pathToObject, callback) {
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
                        if (names.indexOf[pNames[i]]) {
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

        function hasPointer(node, name) {
            return getPointerNames(node).hasOwnProperty(name);
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
                return node.collection[name];
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
                    callback(null, nodes[guid]);
                } catch (err) {
                    callback(err.toString());
                }
            });
        }

        /**** Sets ****/
        function getMemberPaths(node, name) {
            var paths = [],
                members = node.sets[name],
                i;
            if (members) {
                for (i = 0; i < members.length; i += 1) {
                    paths.push(nodes[members[i].guid].id);
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

            getAttribute: getAttribute,
            setAttribute: setAttribute,
            getRegistry: getRegistry,
            setRegistry: setRegistry,

            getParent: getParent,
            getChildrenRelids: getChildrenRelids,
            getChildrenPaths: getChildrenPaths,
            loadChildren: loadChildren,

            getOwnPointerNames: getOwnPointerNames,
            getOwnPointerPath: getOwnPointerPath,
            getPointerNames: getPointerNames,
            hasPointer: hasPointer,
            getPointerPath: getPointerPath,
            loadPointer: loadPointer,

            getCollectionNames: getCollectionNames,
            getCollectionPaths: getCollectionPaths,
            loadCollection: loadCollection,

            getMemberPaths: getMemberPaths,
            getMemberAttributeNames: getMemberAttributeNames,
            getMemberAttribute: getMemberAttribute,
            getMemberRegistryNames: getMemberRegistryNames,
            getMemberRegistry: getMemberRegistry,

            /* These are ONLY utilities for setting up a context! */
            _getRootNode: _getRootNode,
            _getNodeByPath: _getNodeByPath,
            _getNodeByGuid: _getNodeByGuid
        };
    };

    return CoreMock;
});


/*
 addMember
 buildPath
 clearMetaRules
 copyData
 copyNode
 copyNodes
 createChild
 createNode
 createRoot
 createSet
 delAspectMeta
 delAspectMetaTarget
 delAttribute
 delAttributeDescriptor
 delAttributeMeta
 delChildMeta
 delConstraint
 delMember
 delMemberAttribute
 delMemberRegistry
 delNodeDescriptor
 delPointerDescriptor
 delPointerMeta
 delPointerMetaTarget
 delRegistry
 deleteData
 deleteNode
 deletePointer
 deleteProperty
 deleteSet
 getAncestor
 getAttribute               #
 getAttributeDescriptor
 getAttributeMeta
 getAttributeNames          #
 getBase
 getBaseRoot
 getBaseType
 getChild
 getChildrenPaths           #
 getChildrenRelids          #
 getCollectionNames         #
 getCollectionPaths         #
 getCommonPathPrefixData
 getConstraint
 getConstraintNames
 getCoreTree
 getData
 getDataForSingleHash
 getDescendant
 getDescendantByPath
 getGuid                    #
 getHash
 getJsonMeta
 getKeys
 getLevel
 getMemberAttribute         #
 getMemberAttributeNames    #
 getMemberPaths             #
 getMemberRegistry          #
 getMemberRegistryNames     #
 getMiddleGuid
 getNodeDescriptor
 getOutsidePointerPath
 getOwnAttribute
 getOwnAttributeNames
 getOwnConstraintNames
 getOwnJsonMeta
 getOwnPointerNames
 getOwnPointerPath
 getOwnRegistry
 getOwnRegistryNames
 getParent                  #
 getPath                    #
 getPointerDescriptor
 getPointerNames            #
 getPointerPath             #
 getProperty
 getRegistry                #
 getRegistryNames           #
 getRelid
 getRoot
 getSetNames
 getSetNumbers
 getTypeRoot
 getValidAspectNames
 getValidAttributeNames
 getValidPointerNames
 getValidSetNames
 hasPointer                 #
 isAncestor
 isEmpty
 isHashed
 isInstanceOf
 isMemberOf
 isMutable
 isObject
 isTypeOf
 isValidAttributeValueOf
 isValidChildOf
 isValidNode
 isValidPath
 isValidRelid
 isValidTargetOf
 joinPaths
 loadByPath
 loadChild
 loadChildren               #
 loadCollection             #
 loadPointer                #
 loadRoot
 loadSubTree
 loadTree
 moveNode
 mutate
 normalize
 persist
 setAspectMetaTarget
 setAttribute               #
 setAttributeDescriptor
 setAttributeMeta
 setBase
 setChildMeta
 setChildrenMetaLimits
 setConstraint
 setData
 setGuid
 setHashed
 setMemberAttribute
 setMemberRegistry
 setNodeDescriptor
 setPointer
 setPointerDescriptor
 setPointerMetaLimits
 setPointerMetaTarget
 setProperty
 setRegistry                #
 splitPath
 */