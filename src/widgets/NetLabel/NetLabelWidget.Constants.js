/*
 * Copyright (C) 2014 Vanderbilt University, All rights reserved.
 *
 * Author: Dana Zhang
 * Created on 6/17/2014
 */
define([], function () {
    "use strict";

    //return string constants
    return {
        /*
         * TERRITORY EVENTS
         */
        SELF : "__SELF__",

        /*
         * CLASS DEFINITIONS
         */
        DESIGNER_ITEM_CLASS : "designer-item",
        DESIGNER_CONNECTION_CLASS: "connList",
        DESIGNER_NETLABEL_CLASS : "netLabel",
        NETLABEL_SHOW_ALL: "show-all-labels",
        COLLAPSE_LABELS: "collapse-labels",
        MAX_LABEL_NUMBER: 1,
        CONNECTION_DRAGGABLE_END_CLASS : "c-d-end",
        CONNECTOR_CLASS : "connector",
        CONNECTION_END_SRC : 'src',
        CONNECTION_END_DST : 'dst',
        CONNECTION_CONTAINER_SVG_CLASS : 'connection-container',
        HIGHLIGHT_MODE_CLASS: 'highlight-mode',
        SRCLABEL_HIGHLIGHT_CLASS: 'src-highlighted',
        DSTLABEL_HIGHLIGHT_CLASS: 'dst-highlighted',
        DROP_REGION_CLASS: 'drop-region',
        DROP_REGION_ACCEPT_DROPPABLE_CLASS: 'accept-droppable',
        DROP_REGION_REJECT_DROPPABLE_CLASS: 'reject-droppable',

        /*DOM ELEMENT ATTRIBUTES*/
        DATA_ITEM_ID : 'data-oid',
        DATA_SUBCOMPONENT_ID : 'data-sid',

        /* Show connection as label attribute name*/
        SHOW_AS_LABEL: 'ShowAsLabel',

        /*
         * ROTATINO RESET CONSTANTS
         */
        ROTATION_RESET: 'reset'
    };
});