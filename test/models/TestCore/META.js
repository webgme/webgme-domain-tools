/**
 * Created by pmeijer on 4/22/2014.
 */

define([], function () {
    'use strict';
    return function (core) {
        var meta = {};

        meta.FCO = core.createNode({});
        core.setAttribute(meta.FCO, 'name', 'FCO');

        meta.ConnectionElement = core.createNode({base: meta.FCO});
        core.setAttribute(meta.ConnectionElement, 'name', 'ConnectionElement');

        meta.Language = core.createNode({base: meta.FCO});
        core.setAttribute(meta.Language, 'name', 'Language');

        meta.ModelElement = core.createNode({base: meta.FCO});
        core.setAttribute(meta.ModelElement, 'name', 'ModelElement');

        meta.ModelRef = core.createNode({base: meta.FCO});
        core.setAttribute(meta.ModelRef, 'name', 'ModelRef');

        meta.PortElement = core.createNode({base: meta.FCO});
        core.setAttribute(meta.PortElement, 'name', 'PortElement');

        return meta;
    };
});