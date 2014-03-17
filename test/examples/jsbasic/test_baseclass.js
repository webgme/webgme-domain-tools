/**
 * Created by pmeijer on 3/17/14.
 */
require('blanket');
var fut = require('../../../examples/jsbasic/baseclass.js');
var chai = require('chai'),
    should = chai.should(),
    assert = chai.assert,
    expect = chai.expect;

describe('baseclass', function() {
    // Create two dummy webGME objects.
    describe('twoWithSameNamesDifferentIDs', function(done) {
        it ('should pass', function() {
            var fcoA = new fut.FCO('A', '/-1/-1/-4');
            var fcoB = new fut.FCO('A', '/-1/-1/-2');
            // Using these create two new DomainFCOs.
            var a = new fut.DomainFCO(fcoA);
            var b = new fut.DomainFCO(fcoB);

            a.getName().should.equal('A');
            a.getName().should.equal(b.getName());
            expect(a.equals(b)).to.equal(false);
        });
    });

    describe('twoWithDifferentNames', function(done) {
        it ('should pass', function() {
            var fcoA = new fut.FCO('A', '/-1/-1/-4');
            var fcoB = new fut.FCO('B', '/-1/-1/-2');
            // Using these create two new DomainFCOs.
            var a = new fut.DomainFCO(fcoA);
            var b = new fut.DomainFCO(fcoB);

            expect(a.equals(b)).to.equal(false);
            a.getName().should.not.equal(b.getName());
        });
    });

    describe('twoWithSameID', function(done) {
        it ('should pass', function() {
            var fcoA = new fut.FCO('A', '/-1/-1/-2');
            var fcoB = new fut.FCO('A', '/-1/-1/-2');
            // Using these create two new DomainFCOs.
            var a = new fut.DomainFCO(fcoA);
            var b = new fut.DomainFCO(fcoB);

            expect(a.equals(b)).to.equal(true);
        });
    });
});