/**
 * Created by Zsolt on 3/20/14.
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

        this.path = options.parent ? core.getPath(options.parent) + '/' + this.ID : '/' + this.ID;
        this.guid = null;
        this.parent = options.parent ? core.getPath(options.parent) : null;
        this.children = [];
    };

    NodeMock._nodes = [];

    return NodeMock;
});