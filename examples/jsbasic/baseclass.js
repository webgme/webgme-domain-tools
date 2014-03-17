/**
 * Created by pmeijer on 3/13/14.
 * This script illustrates how to define "Classes" in javaScript using constructors and
 * prototypes. These are simple classes with no inheritance, that will be shown in classes.js.
 */

'use strict';
// See http://openmymind.net/2012/2/3/Node-Require-and-Exports/
// for info about how importing modules work in nodeJS.
var guid = require('./guid');

/**
 * Initializes a new instance of fco.
 *
 * @class
 * @classdesc This is a dummy class, representing an object in the webGME model.
 * @param {string} name The name of the FCO.
 * @param {string} ID The ID of the FCO.
 * @constructor
 */
function FCO(name, ID) {
    this.name = name;
    this.ID = ID;
    this.GUID = guid.generateGUID();
    this.value = null;
    this.description = null;
    this.range = null;
}

/**
 * Initializes a new instance of DomainFCO.
 *
 * @class
 * @classdesc This class represents the base-object in a domain specific api.
 * @param {FCO} fco The wrapped webGME object.
 * @constructor
 */
function DomainFCO(fco) {
    console.log('Inside DomainFCO constructor.');
    this.fco = fco;
    this.name = null;
    this.ID = null;
    this.GUID = null;
}

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * Expose the properties through getters and setters.
 * These are used here since we don't want to enter the webGME layer
 * at every call and we should only expose setters where applicable.
 *
 * In general methods (which getters and setters are) should be defined through the
 * prototype.
 * ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * Returns the name of the item.
 * @returns {string} The name of the item.
 * @public
 */
DomainFCO.prototype.getName = function () {
    if (this.name === null) {
        this.name = this.fco.name;
    }
    return this.name;
};

/**
 * Sets the name of the item.
 * @param {string} value The new name of the item.
 * @public
 */
DomainFCO.prototype.setName = function (value) {
    this.name = value;
    this.fco.name = this.name;
};

DomainFCO.prototype.getGUID = function () {
    if (this.GUID === null) {
        this.GUID = this.fco.GUID;
    }
    return this.GUID;
};

DomainFCO.prototype.getID = function () {
    if (this.ID === null) {
        this.ID = this.fco.ID;
    }
    return this.ID;
};

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * Override inherited methods.
 * ---------------------------------------------------------------------------------------------------------------------
 */

DomainFCO.prototype.toString = function () {
    return 'Name : ' + this.getName() + ', ID: ' + this.getID() + ', GUID: ' + this.getGUID();
};

DomainFCO.prototype.equals = function (other) {
    return this.getID() === other.getID();
};

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * Utility methods
 * ---------------------------------------------------------------------------------------------------------------------
 */
DomainFCO.prototype.getParentID = function () {
    var path = this.getID().split('/');
    path.pop();
    return path.join('/');
};

DomainFCO.prototype.shareParent = function (other) {
    if (this.getParentID() === other.getParentID()) {
        return this.getParentID();
    }

    return null;
};

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * In node js you can simulate python's if __name__=='__main__' like this.
 * ---------------------------------------------------------------------------------------------------------------------
 */
if (require.main === module) {
    // Create two dummy webGME objects.
    var fcoA = new FCO('A', '/-1/-1/-4');
    var fcoB = new FCO('B', '/-1/-1/-2');
    // Using these create two new DomainFCOs.
    var a = new DomainFCO(fcoA);
    var b = new DomainFCO(fcoB);

    // Printing objects (invokes toString implicitly only IE).
    console.log(a.toString());
    console.log(b.toString());

    // Are they the same webGME object?
    if (a.equals(b)) {
        console.log('a and b represent the same webGME object.');
    } else {
        console.log('a and b represent two different webGME objects.');
    }

    // Do they share a parent at least?
    var commonParent = a.shareParent(b);
    if (commonParent) {
        console.log('a and b share the parent with ID: ' + commonParent);
    } else {
        console.log('a and b do not have the same parent');
    }
}


// See http://openmymind.net/2012/2/3/Node-Require-and-Exports/
// for info about how importing modules work in nodeJS.
module.exports.FCO = FCO;
module.exports.DomainFCO = DomainFCO;

