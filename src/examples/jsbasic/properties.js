/**
 * Created by zsolt on 3/23/14.
 */

var person = {
    firstName: 'Jimmy',
    lastName: 'Smith',
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
//    set fullName (name) {
//        var words = name.toString().split(' ');
//        this.firstName = words[0] || '';
//        this.lastName = words[1] || '';
//    }
};

var Person = function () {

};

Person.prototype.attributes = person;

Person.prototype = {
    get name() {
        return 's';
    },
    get fullName() {
        return 'p';
    },
    set fullName(value) {
        this.x = value;
    }
};

var p = new Person();

// invalid but webstorm does not help
p.name = 's';

Object.defineProperty(person, 'age', {
    get: function() {
        return this.firstName + ' ' + this.lastName;
    }
});

// invalid but webstorm does not help
person.age = 33;

var a1 = person.fullName;

// invalid and webstorm helps
person.fullName = 33;
person.fullName = 'Jack Franklin';
Person.prototype.attributes.fullName = 4;

// performance considerations: http://jsperf.com/properties-implementation-in-javascript/2

var a = Person.prototype.attributes.fullName + 3;
//person.
console.log(person.firstName); // Jack
console.log(person.lastName); // Franklin