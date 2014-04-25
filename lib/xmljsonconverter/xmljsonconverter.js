/**
 * Created by pmeijer on 4/24/2014.
 */

define (['sax'], function (sax) {
    "use strict";

    /**
     * Xml2Json converter
     * @param {object} arrayElements - Dictionary where keys evalutated to true are treated as arrays in the generated json.
     * @param {object} options -
     *    options.attrTag {string} will be prepended to attributes keys.
     *    options.textTag {string} the key values for text items.
     *    options.skipWSText {boolean} if true then text made up of only white-space (including \n, \r, etc.) will not
     *      be generated as text-items in the json.
     * @constructor
     */
    var XML2JSON = function (arrayElements, options) {
        var self = this,
            opts = options || {},
            attrTag = opts.attrTag,
            textTag = opts.textTag || '#text',
            skipWS = opts.skipWSText;
        if (attrTag === undefined) {
            attrTag = '_';
        }
        self.rootNode = {};
        self.stack = [];
        self.parser = sax.parser(true);

        self.parser.ontext = function (text) {
            if (self.stack.length > 0) {
                if (skipWS) {
                    if (text.replace(/\s+?/g, '')) {
                        self.stack[self.stack.length - 1][textTag] = text;
                    }
                } else {
                    self.stack[self.stack.length - 1][textTag] = text;
                }
            }
        };

        if (arrayElements) {
            self.arrayElements = arrayElements;
            self.parser.onopentag = function (node) {
                var key,
                    parentNode,
                    jsonNode = {};

                if (self.stack.length === 0) {
                    self.rootNode[node.name] = jsonNode;
                } else {
                    parentNode = self.stack[self.stack.length - 1];
                    if (self.arrayElements[node.name]) {
                        if (parentNode.hasOwnProperty(node.name)) {
                            parentNode[node.name].push(jsonNode);
                        } else {
                            parentNode[node.name] = [jsonNode];
                        }
                    } else {
                        parentNode[node.name] = jsonNode;
                    }
                }
                self.stack.push(jsonNode);
                for (key in node.attributes) {
                    if (node.attributes.hasOwnProperty(key)) {
                        jsonNode[attrTag + key] = node.attributes[key];
                    }
                }
            };
        } else {
            self.parser.onopentag = function (node) {
                var key,
                    parentNode,
                    jsonNode = {};

                if (self.stack.length === 0) {
                    self.rootNode[node.name] = jsonNode;
                } else {
                    parentNode = self.stack[self.stack.length - 1];
                    if (parentNode.hasOwnProperty(node.name)) {
                        if (parentNode[node.name] instanceof Array) {
                            parentNode[node.name].push(jsonNode);
                        } else {
                            parentNode[node.name] = [parentNode[node.name], jsonNode];
                        }
                    } else {
                        parentNode[node.name] = jsonNode;
                    }
                }
                self.stack.push(jsonNode);
                for (key in node.attributes) {
                    if (node.attributes.hasOwnProperty(key)) {
                        jsonNode[attrTag + key] = node.attributes[key];
                    }
                }
            };
        }
        self.parser.onclosetag = function (node) {
            self.stack.pop();
        };
    };

    /**
     * Converts the xml to a javascript object (JSON).
     * @param xmlString - xml to convert.
     * @returns {JSON} - Javascript object inferred from the xml
     */
    XML2JSON.prototype.xmlStr2json = function (xmlString) {
        this.parser.write(xmlString).close();
        return this.rootNode;
    };

    return {
        Xml2json: XML2JSON
    };
});