/**
 * Created by pmeijer on 3/17/14.
 */
//require('blanket');
var fut = require('../../../src/examples/jsbasic/classes.js');
var base = require('../../../src/examples/jsbasic/baseclass.js');
var chai = require('chai'),
    should = chai.should(),
    assert = chai.assert,
    expect = chai.expect;

describe('classes', function() {
    describe('oneParameterAndOneProperty', function() {
        it ('should inherit types', function() {
            // A is a Property
            var fcoA = new base.FCO('A', '/-1/-1/-4');
            fcoA.value = '1';
            fcoA.description = 'This is A.';
            // B is Parameter
            var fcoB = new base.FCO('B', '/-1/-1/-2');
            fcoB.value = '2';
            fcoB.range = '[0,3]';

            var vfA = new fut.Property(fcoA);
            var vfB = new fut.Parameter(fcoB);

            expect(vfA instanceof fut.ValueFlowTarget).to.equal(true);
            expect(vfB instanceof fut.ValueFlowTarget).to.equal(true);
        });
    });

    describe('testPropertyFields', function() {
        it ('should work; set and get', function() {
            var fcoA = new base.FCO('A', '/-1/-1/-4');
            fcoA.value = '1';
            fcoA.description = 'This is A.';

            var prop = new fut.Property(fcoA);
            prop.getValue().should.equal(fcoA.value);
            prop.getDescription().should.equal(fcoA.description);

            var newValue = '2';
            var newDesc = 'New Description';
            prop.setValue(newValue);
            prop.setDescription(newDesc);

            prop.getValue().should.equal(newValue);
            prop.getDescription().should.equal(newDesc);
        });
    });

    describe('testParameterFields', function() {
        it ('should set and get should work', function() {
            var fcoA = new base.FCO('A', '/-1/-1/-4');
            fcoA.value = '1';
            fcoA.range = '[0,1]';

            var prop = new fut.Parameter(fcoA);
            prop.getValue().should.equal(fcoA.value);
            prop.getRange().should.equal(fcoA.range);

            var newValue = '2';
            var newRange = '[1,2]';
            prop.setValue(newValue);
            prop.setRange(newRange);

            prop.getValue().should.equal(newValue);
            prop.getRange().should.equal(newRange);

        });
    });
});