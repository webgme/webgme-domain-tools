/**
 * Created by pmeijer on 3/13/14.
 * This script illustrates how to define "Classes" in javaScript using constructors and
 * prototypes.
 *
 * BONUS:
 * split()
 * join()
 * pop()
 */

'use strict';
//var guidgen = require('guid.js');
// TODO : move to separate file
var guid = function () {
    var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };

        //return GUID
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

/**
 * Initializes a new instance of fco.
 * This is a dummy class, representing an actual object in the webGME model.
 *
 * In general properties should be defined in the constructor as is done here.
 * @constructor
 */
function FCO(name, ID){
    this.name = name;
    this.ID = ID;
    this.GUID = guid();
}

/**
 * Initializes a new instance of DomainFCO.
 * This class represents the base-object in a domain specific api.
 * All kinds/types in the dsa should extend this class.
 * Note that it does not extend the FCO, but rather wraps it.
 * @constructor
 */
function DomainFCO(fco){
    this.fco_ = fco;
    this.name_ = null;
    this.ID_ = null;
    this.GUID_ = null;
}

// Expose the properties through getters and setters.
// These are used here since we don't want to enter the webGME layer
// at every call and we should only expose setters where applicable.
//
// In general methods (which getters and setters are) should be defined through the
// prototype.
DomainFCO.prototype.getName = function(){
    if (this.name_ == null){
        this.name_ = this.fco_.name;
    }
    return this.name_;
};

DomainFCO.prototype.setName = function(value){
    this.name_ = value;
    this.fco_.name = this.name;
};

DomainFCO.prototype.getGUID = function(){
    if (this.GUID_ == null){
        this.GUID_ = this.fco_.GUID;
    }
    return this.GUID_
};

DomainFCO.prototype.getID = function(){
    if (this.ID_ == null){
        this.ID_ = this.fco_.ID;
    }
    return this.ID_
};

// Override inherited methods.
DomainFCO.prototype.toString = function(){
    return 'Name : ' + this.getName() + ', ID: ' + this.getID() + ', GUID: ' + this.getGUID();
};

DomainFCO.prototype.equals = function(other){
    return this.getID() == other.getID();
};

// Utility methods
DomainFCO.prototype.getParentID = function(){
    var path = this.getID().split('/');
    path.pop();
    return path.join('/');
};

DomainFCO.prototype.shareParent = function(other){
    if(this.getParentID() == other.getParentID()){
        return this.getParentID();
    } else {
        return null;
    }
};

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
if (a == b){
    console.log('a and b represent the same webGME object.');
} else {
    console.log('a and b represent two different webGME objects.');
}

// Do they share a parent at least?
var commonParent = a.shareParent(b);
if (commonParent){
    console.log('a and b share the parent with ID: ' + commonParent);
} else {
    console.log('a and b do not have the same parent');
}
