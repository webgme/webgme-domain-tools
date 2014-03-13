/**
 * Created by pmeijer on 3/13/14.
 */

'use strict';
var base = require('./baseclass');

/**
 * Initializes a new instance of DomainFCO.
 *
 * @class
 * @classdesc This class represents the base-object in a domain specific api.
 * @param {FCO} fco The wrapped webGME object.
 * @constructor
 */
function ValueFlowTarget(fco){
    // Call the constructor of the base-class.
    base.DomainFCO.apply(fco);
    this.value_ = null;
}


//This is one way to do the inheritance. It'll do for now, but might not be the optimal solution.
ValueFlowTarget.prototype = Object.create(base.DomainFCO);
ValueFlowTarget.constructor = ValueFlowTarget;

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * Add new methods on ValueFlowTarget
 * ---------------------------------------------------------------------------------------------------------------------
 */
/**
 * Returns the value of the item.
 * @returns {string} The value of the item.
 * @public
 */
ValueFlowTarget.prototype.getValue = function(){
    if (this.value_ == null){
        this.value_ = this.fco_.value;
    }
    return this.value;
};

/**
 * Sets the name of the item.
 * @param {string} value The new name of the item.
 * @public
 */
ValueFlowTarget.prototype.setName = function(value){
    this.value_ = value;
    this.fco_.value = this.value_;
};