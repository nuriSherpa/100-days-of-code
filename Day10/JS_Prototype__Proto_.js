function Person(name) {
    this.name = name;
}

// Only constructor functions have .prototype
console.log(Person.prototype); // {constructor: Person}

// Objects DON'T have .prototype
const person = new Person('John');
console.log(person.prototype); // undefined

// Regular functions also have .prototype
function sayHello() {}
console.log(sayHello.prototype); // {constructor: sayHello}


function Person(name) {
    this.name = name;
}

const john = new Person('John');

// john is an object, so it has __proto__
console.log(john.__proto__ === Person.prototype); // true

// Even object literals have __proto__
const obj = {};
console.log(obj.__proto__ === Object.prototype); // true

// Arrays have __proto__
const arr = [];
console.log(arr.__proto__ === Array.prototype); // true



function Car(brand) {
    this.brand = brand;
}

Car.prototype.drive = function() {
    return `Driving ${this.brand}`;
};

const myCar = new Car('Toyota');

// COMPARISON:
console.log(typeof Car.prototype);    // "object"
console.log(typeof myCar.__proto__);  // "object"

console.log(Car.prototype);           // {drive: f, constructor: Car}
console.log(myCar.__proto__);         // {drive: f, constructor: Car}

// They point to the SAME object!
console.log(myCar.__proto__ === Car.prototype); // true

// But they're accessed differently:
console.log(myCar.hasOwnProperty('__proto__'));   // false (inherited)
console.log(Car.hasOwnProperty('prototype'));     // true (own property)