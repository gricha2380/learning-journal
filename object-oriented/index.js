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