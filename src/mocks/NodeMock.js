/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Zsolt Lattmann
 */

'use strict';
define([], function () {

    var NodeMock = function (core, options) {

        NodeMock._nodes.push(this);

        this.ID = NodeMock._nodes.length;
        this.attributes = {
            name: ''
        };

        this.registry = {
            DisplayFormat: '',
            PortSVGIcon: '',
            SVGIcon: '',
            decorator: '',
            isAbstract: '',
            isPort: '',
            position: {
                x: 0,
                y: 0
            }
        };

        this.pointers = {
            base: null
        };

        if (options.base) {
            this.pointers.base = core.getPath(options.base);
        }

        this.collection = {};
        this.path = options.parent ? core.getPath(options.parent) + '/' + this.ID : '/' + this.ID;
        this.guid = generateGUID();
        this.parent = options.parent ? core.getPath(options.parent) : null;
        this.children = [];

        if (options.parent) {
            core.addChild(options.parent, this);
        }
    };

    NodeMock._nodes = [];

    function generateGUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    return NodeMock;
});