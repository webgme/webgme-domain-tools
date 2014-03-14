/**
 * Created by pmeijer on 3/13/14.
 * This script illustrates how inheritance can be emulated in JavaScript.
 * There are more than one way to do this and this approach uses Object.create() and thus assumes ECMAScript >= 5.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
 */

'use strict';
var base = require('./baseclass');

/**
 * Initializes a new instance of ValueFlowTarget.
 *
 * @class
 * @classdesc This class represents the base-object in a domain specific api.
 * @param {FCO} fco The wrapped webGME object.
 * @constructor
 */
function ValueFlowTarget(fco){
    // Call the constructor of the base-class as if it were acting on this.
    base.DomainFCO.call(this, fco);
    console.log('Inside ValueFlowTarget constructor.');
    this.value_ = null;
}


// This is one way to do the inheritance. It'll do for now, but might not be the optimal solution.
//
ValueFlowTarget.prototype = Object.create(base.DomainFCO.prototype);
// The assignment overrides all prototype properties, but we want the constructor to point to the one defined above.
ValueFlowTarget.prototype.constructor = ValueFlowTarget;

/**
 * Returns the value of the item.
 * @returns {string} The value of the item.
 * @public
 */
ValueFlowTarget.prototype.getValue = function(){
    if (this.value_ == null){
        this.value_ = this.fco_.value;
    }
    return this.value_;
};

/**
 * Sets the value of the item.
 * @param {string} value The new value of the item.
 * @public
 */
ValueFlowTarget.prototype.setValue = function(value){
    this.value_ = value;
    this.fco_.value = this.value_;
};

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * Property
 * ---------------------------------------------------------------------------------------------------------------------
 */
/**
 * Initializes a new instance of Property.
 *
 * @class
 * @classdesc This class represents the base-object in a domain specific api.
 * @param {FCO} fco The wrapped webGME object.
 * @constructor
 */
function Property(fco){
    ValueFlowTarget.call(this, fco);
    console.log('Inside Property constructor.');
    this.description_ = null;
}


// Property inherits from ValueFlowTarget
Property.prototype = Object.create(ValueFlowTarget.prototype);
Property.prototype.constructor = Property;

/**
 * Returns the description of the item.
 * @returns {string} The description of the item.
 * @public
 */
Property.prototype.getDescription = function(){
    if (this.description_ == null){
        this.description_ = this.fco_.description;
    }
    return this.description_;
};

/**
 * Sets the description of the item.
 * @param {string} value The new description of the item.
 * @public
 */
Property.prototype.setDescription = function(value){
    this.description_ = value;
    this.fco_.description = this.description_;
};

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * Parameter
 * ---------------------------------------------------------------------------------------------------------------------
 */
/**
 * Initializes a new instance of Parameter.
 *
 * @class
 * @classdesc This class represents the base-object in a domain specific api.
 * @param {FCO} fco The wrapped webGME object.
 * @constructor
 */
function Parameter(fco){
    ValueFlowTarget.call(this, fco);
    console.log('Inside Parameter constructor.');
    this.range_ = null;
}


// Property inherits from ValueFlowTarget
Parameter.prototype = Object.create(ValueFlowTarget.prototype);
Parameter.prototype.constructor = Parameter;

/**
 * Returns the range of the item.
 * @returns {string} The range of the item.
 * @public
 */
Parameter.prototype.getRange = function(){
    if (this.range_ == null){
        this.range_ = this.fco_.range;
    }
    return this.range_;
};

/**
 * Sets the description of the item.
 * @param {string} value The new description of the item.
 * @public
 */
Parameter.prototype.setRange = function(value){
    this.range_ = value;
    this.fco_.range = this.range_;
};

// Execution
if (require.main === module) {
    // A is a Property
    var fcoA = new base.FCO('A', '/-1/-1/-4');
    fcoA.value = '1';
    fcoA.description = 'This is A.';
    // B is Parameter
    var fcoB = new base.FCO('B', '/-1/-1/-2');
    fcoB.value = '2';
    fcoB.range = '[0,3]';

    var vfA = new Property(fcoA);
    var vfB = new Parameter(fcoB);

    console.log(vfA.getValue());
    console.log(vfB.getValue());
    console.log(vfA.getName());
    console.log(vfB.getName());
    console.log(vfA.getDescription());
    console.log(vfB.getRange());

    if (vfA instanceof base.DomainFCO){
        console.log('vfA is a DomainFCO.')
    }
    if (vfB instanceof ValueFlowTarget){
        console.log('vfB is a ValueFlowTarget.')
    }
    if (vfA instanceof Parameter == false){
        console.log('vfA is not a Parameter.')
    }
}