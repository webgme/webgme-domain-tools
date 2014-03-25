/**
 * Created by zsolt on 3/24/14.
 */

// class definitions order does not matter
var A = function (node) { this.initialize(node); };
var B = function (node) { this.initialize(node); };
var C = function (node) { this.initialize(node); };

// inheritance
// order does matter here B inherits from C
B.prototype = Object.create(C.prototype);

// A inherits from B
A.prototype = Object.create(B.prototype);



// these could be in separate files.
A.prototype.initialize = function(node) {
    this.a = 'a';
    this.b = 'b';
    this.c = 'c';
};

A.prototype.getA = function () {
    return this.a;
};

B.prototype.initialize = function(node) {
    this.b = 'b';
    this.c = 'c';
};

B.prototype.getB = function () {
    return this.b;
};

C.prototype.initialize = function(node) {
    this.c = 'c';
};

C.prototype.getC = function () {
    return this.c;
};

module.exports.A = A;
module.exports.B = B;
module.exports.C = C;
