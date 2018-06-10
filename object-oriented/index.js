// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS

// Defining a person in a normal function
let createNewPerson = (name) => {
    let obj = {};
    obj.name = name;
    obj.greeting = ()=>{alert(`Hello, my name is ${name}.`)};
    return obj;
}
let bob = createNewPerson('Bob');
bob.greeting();

// Defining person with contextual this
function Person(name) {
    this.name = name;
    this.greeting = function(){alert(`Hi I'm ${this.name}.`)}
}
let mike = new Person('Mike');
mike.greeting();

// larger pperson function
function PersonBig(first, last, age, gender, interests) {
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
        alert(`Hi I'm ${this.name}`)
    }
}

let clare = new PersonBig('clare','mountain','29','female',['airplanes','good things'])
let gregor = Object.create(clare)