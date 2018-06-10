/* 
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes

In javascript each object has a prototype object from which it inherits methotds and properties
aka the prototype chain
It's found in the object's constructor functions

 person1 instance  -->  inherits properties from Person prototype  -->  Person prototype inherits properties from Object prototpye

The properties are linked through the described chaining process, and they're accessible through the child object,
but there's no official way to have them appear as native properties.
The unofficial approach via modern browsers is to use an interal property called __proto__
e.g.: person1.__proto__.__proto__

In ES6 you can access an object's prototype object indirectly via Object.getPrototypeOf(obj)

properties & methods defined in the prototype (aka sub-namespace)
*/

function Person(first, last, age, gender, interests) {
    this.name = {
        'first': first,
        'last': last
    }
    this.age = age;
    this.gender = gender;
    this.interests = interests;
    this.bio = function(){
        console.log(`${this.name.first} ${this.name.last} is ${this.age}. ${this.name.first} likes ${interests}`)
    }
    this.greeting = function() {
        console.log(`Hi I'm ${this.name}`)
    }
}


let clare = new Person('clare','mountain','29','female',['airplanes','good things'])
console.log('getting prototypeof',Object.getPrototypeOf(clare))

/*
Modifying protypes
Methods added to the prototype are then available on all object instances created from the constructor
*/

Person.prototype.farewell = function(){
    console.log(`${this.name.first} has left the building`)
}
// invoke with clare.farewell() 
// all people instances created with Person constructor will contain the farewell property because it's automatically inheriited through the prototype

/*
It's a common pattern to define the properties inside the constructor, and the methods on the prototype. 
This makes code easy to read, as the constructor only contains the property definitions, 
and the methods are split off into separate blocks.

E.g.: https://github.com/zalun/school-plan-app/blob/master/stage9/js/index.js
*/