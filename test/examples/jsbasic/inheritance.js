/**
 * Created by zsolt on 3/24/14.
 */

var fut = require('../../../src/examples/jsbasic/inheritance.js');
var chai = require('chai'),
    should = chai.should(),
    assert = chai.assert,
    expect = chai.expect;

var A = fut.A;
var B = fut.B;
var C = fut.C;


describe('inheritance', function() {
    var a = new A();
    var b = new B();
    var c = new C();

    // Create two dummy webGME objects.
    it ('a should be an instance of A, B, and C', function() {
        // testing code
        expect(a instanceof(A)).to.equal(true);
        expect(a instanceof(B)).to.equal(true);
        expect(a instanceof(C)).to.equal(true);
    });

    it ('b should be an instance of B and C, but not A', function() {
        // testing code
        expect(b instanceof(A)).to.equal(false);
        expect(b instanceof(B)).to.equal(true);
        expect(b instanceof(C)).to.equal(true);

    });

    it ('c should be an instance of C, but not A nor B', function() {
        // testing code
        expect(c instanceof(A)).to.equal(false);
        expect(c instanceof(B)).to.equal(false);
        expect(c instanceof(C)).to.equal(true);

    });

});