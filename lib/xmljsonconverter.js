/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Patrik Meijer
 *
 * Converter from XML to Json using sax parser. See the doc of constructor for info on how to use.
 */

define(['sax'], function (sax) {
    "use strict";

    /**
     * XML2JSON converter, when instantiated invoke convert(xmlString) to get the corresponding JavaScript object.
     * @param {object} options - optional options.
     * @param {object} options.arrayElements - Dictionary where keys evaluated to true are treated as arrays in the
     *  generated javascript object. If not provided these will be inferred by number of occurrences of the elements.
     * @param {string} options.attrTag - will be prepended to attributes keys, default "@".
     * @param {string} options.textTag - the key values for text items, default "#text".
     * @param {boolean} options.skipWSText - if true then text made up of only white-space (including \n, \r, etc.)
     *  will not be generated as text-items in the javascript object, default false.
     * @constructor
     */
    var XML2JSON = function (options) {
        var self = this,
            opts = options || {},
            attrTag = opts.attrTag,
            textTag = opts.textTag || '#text',
            skipWS = opts.skipWSText;
        if (attrTag === undefined) {
            attrTag = '@';
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

        if (opts.arrayElements) {
            self.arrayElements = opts.arrayElements;
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

        self.parser.onerror = function (error) {
            self.rootNode = error;
            self.parser.error = null;
        };
    };

    /**
     * Converts the xml in the given string to a javascript object. For bigger xmls use convertFromBuffer instead.
     * @param {string} xmlString - xml string representation to convert.
     * @returns {object|Error} - Javascript object inferred from the xml, Error object if failed.
     */
    XML2JSON.prototype.convertFromStr = function (xmlString) {
        this.parser.write(xmlString).close();
        return this.rootNode;
    };

    /**
     * Converts the xml to a javascript object (JSON).
     * @param xmlBuffer {ArrayBuffer} - xml to convert.
     * @param options {object} - optional options.
     * @param options.segmentSize {int} - length of string segments, default 10000.
     * @param options.encoding {TypedArray constructor} - encoding of the ArrayBuffer, default Uint8Array.
     * @returns {object|Error} - Javascript object inferred from the xml, Error object if failed.
     */
    XML2JSON.prototype.convertFromBuffer = function (xmlBuffer, options) {
        var opts = options || {},
            segmentSize = opts.segmentSize || 10000,
            encode = opts.encoding || Uint8Array,
            data = new encode(xmlBuffer),
            dataSegment,
            nbrOfIterations = Math.ceil(data.length / segmentSize),
            startIndex = 0,
            i;

        for (i = 0; i < nbrOfIterations; i += 1) {
            dataSegment = data.subarray(startIndex, startIndex + segmentSize);
            startIndex += segmentSize;
            if (i < nbrOfIterations - 1) {
                this.parser.write(String.fromCharCode.apply(null, dataSegment));
            } else {
                this.parser.write(String.fromCharCode.apply(null, dataSegment)).close();
            }
        }
        return this.rootNode;
    };

    /**
     * XML2JSON converter, when instantiated invoke convert(xmlString) to get the corresponding JavaScript object.
     * @param {object} options - optional options.
     * @param {string} options.attrTag - keys with this will be treated as attributes, default "@".
     * @param {string} options.textTag - the key values for text items, default "#text".
     * @constructor
     */
    var JSON2XML = function (options) {
        var self = this,
            opts = options || {},
            attrTag = opts.attrTag,
            textTag = opts.textTag || '#text';
        if (attrTag === undefined) {
            attrTag = '@';
        }
        self.attrTag = attrTag;
        self.attrTagIndex = self.attrTag.length;
        self.textTag = textTag;
        self.xml = '';
    };

    JSON2XML.prototype.convertToStringRec = function (key, value) {
        var self = this,
            subKeys,
            elemTag = '',
            i,
            content = '';
        if (value instanceof Array) {
            for (i = 0; i < value.length; i += 1) {
                content += self.convertToStringRec(key, value[i]);
            }
            return content;
        }
        if (value instanceof Object) {
            subKeys = Object.keys(value);
            for (i = 0; i < subKeys.length; i += 1) {
                if (value[subKeys[i]] instanceof Object) {
                    content += self.convertToStringRec(subKeys[i], value[subKeys[i]]);
                } else {
                    if (subKeys[i].slice(0, self.attrTag.length) === self.attrTag) {
                        elemTag += ' ' + subKeys[i].substr(self.attrTagIndex) + '="' + value[subKeys[i]].toString() + '"';
                    } else if (subKeys[i] === self.textTag) {
                        content += subKeys[i].toString();
                    }
                }
            }
        } else {
            content += '<' + value.toString + '></' + value.toString + '>';
        }

        if (content) {
            return '<' + key + elemTag + '>' + content + '</' + key + '>';
        }

        return '<' + key + elemTag + '/>';
    };

    JSON2XML.prototype.convertToString = function (jsonObj) {
        var self = this,
            keys = Object.keys(jsonObj),
            i;
        for (i = 0; i < keys.length; i += 1) {
            self.xml += self.convertToStringRec(keys[i], jsonObj[keys[i]]);
        }
        return self.xml;
    };

    return {
        Xml2json: XML2JSON,
        Json2xml: JSON2XML
    };
});