/**
 * Created by pmeijer on 3/13/14.
 * This script contains a GUID generator.
 */

// http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it
// Shortly;
//  Strict mode helps out in a couple ways:
//      - It catches some common coding bloopers, throwing exceptions.
//      - It prevents, or throws errors, when relatively "unsafe" actions are taken (such as gaining access to the global object).
//      - It disables features that are confusing or poorly thought out.
'use strict';

/**
 * Generates a GUID string. Note the inner function s4 (it has access to whatever is defined in generateGUID.
 * @returns {string}
 */
function generateGUID(){
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// In nodeJS you can simulate python's if __name__=='__main__' like this.
if (require.main === module) {
    // Generate and print 10 GUIDs.
    for (var i=1; i < 10; i++)
    {
        console.log(generateGUID());
    }
}

// See http://openmymind.net/2012/2/3/Node-Require-and-Exports/
// for info about how to export things from a script when using nodeJS.
// (This file is imported in baseclass.js)
module.exports.generateGUID = generateGUID;