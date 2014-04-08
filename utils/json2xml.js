/*
 * Created by Dana Zhang on 4/4/2014.
 * Function taken from https://sites.google.com/site/mynotepad2/developer-notes/javascript/javascript-convert-json-object-to-xml-string
 */

'use strict';
define([], function () {

    var json2xml = function () {};

    json2xml.prototype.convert = function (o) {

        if (typeof o == 'object' && o.constructor == Object && this.len(o) == 1) {
            for (var a in o) {
                return this.toXML(a, o[a]);
            }
        }
    };

    json2xml.prototype.main = function (callback) {

        var o = {"e": { "#text": "text",
            "a": {
                "#text": "I'm a",
                "c": "i am tag c",
                "@name": "I'm an attribute",
                "@last": "i'm another one"
            },
            "b": "dana"}};

        console.log(this.convert(o));

        console.log(o.e["#text"]);
    };

    json2xml.prototype.len = function (o) {
        var n = 0;
        for (var a in o) {
            n++;
        }
        return n;
    };

    json2xml.prototype.toXML = function (tag, o) {
        var doc = '<' + tag;
        if (typeof o === 'undefined' || o === null) {
            doc += '/>';
            return doc;
        }
        if (typeof o !== 'object') {
            doc += '>' + this.safeXMLValue(o) + '</' + tag + '>';
            return doc;
        }
        if (o.constructor == Object) {
            for (var a in o) {
                if (a.charAt(0) == '@') {
                    if (typeof o[a] !== 'object') {
                        doc += ' ' + a.substring(1) + '="' + o[a] + '"';
                        delete o[a];
                    } else {
                        throw new Error((typeof o[a])
                            + ' being attribute is not supported.');
                    }
                }
            }
            if (this.len(o) === 0) {
                doc += '/>';
                return doc;
            } else {
                doc += '>';
            }
            if (typeof o['#text'] !== 'undefined') {
                if (typeof o['#text'] !== 'object') {
                    doc += o['#text'];
                    delete o['#text'];
                } else {
                    throw new Error((typeof o['#text'])
                        + ' being #text is not supported.');
                }
            }
            for (var b in o) {
                if (o[b].constructor == Array) {
                    for (var i = 0; i < o[b].length; i++) {
                        if (typeof o[b][i] !== 'object'
                            || o[b][i].constructor == Object) {
                            doc += this.toXML(b, o[b][i]);
                        } else {
                            throw new Error((typeof o[b][i])
                                + ' is not supported.');
                        }
                    }
                } else if (o[b].constructor == Object
                    || typeof o[b] !== 'object') {
                    doc += this.toXML(b, o[b]);
                } else {
                    throw new Error((typeof o[b]) + ' is not supported.');
                }
            }
            doc += '</' + tag + '>';
            return doc;
        }
    };

    json2xml.prototype.safeXMLValue = function (value) {
        var s = value.toString();
        s = s.replace('/\&/g', '&amp;');
        s = s.replace('/\"/g', '&quot;');
        s = s.replace('/</g', '&lt;');
        s = s.replace('/>/g', '&gt;');
        return s;
    };

    return json2xml;
});

