"use strict";
/*
 * STRING CONSTANT DEFINITIONS USED IN DESIGNER DIAGRAM
 */

define(['js/Constants'], function (CONSTANTS) {

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
        DESIGNER_CONNECTION_CLASS : "netLabel",
        CONNECTION_DRAGGABLE_END_CLASS : "c-d-end",
        CONNECTOR_CLASS : "connector",
        CONNECTION_END_SRC : 'src',
        CONNECTION_END_DST : 'dst',
        CONNECTION_CONTAINER_SVG_CLASS : 'connection-container',
        HIGHLIGHT_MODE_CLASS: 'highlight-mode',
        ITEM_HIGHLIGHT_CLASS: 'highlighted',
        DROP_REGION_CLASS: 'drop-region',
        DROP_REGION_ACCEPT_DROPPABLE_CLASS: 'accept-droppable',
        DROP_REGION_REJECT_DROPPABLE_CLASS: 'reject-droppable',

        /*DOM ELEMENT ATTRIBUTES*/
        DATA_ITEM_ID : 'data-oid',
        DATA_SUBCOMPONENT_ID : 'data-sid',

        /*
         * ROTATINO RESET CONSTANTS
         */
        ROTATION_RESET: 'reset'
    };
});