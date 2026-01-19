// In JavaScript, a prototype is an object from which other objects inherit properties and methods. Every JavaScript object has a hidden [[Prototype]] property that links to another object (its prototype).
function Person(name) {
    this.name = name;
}

// Adding to the prototype
Person.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};

const john = new Person('John');
console.log(john.greet()); // "Hello, I'm John"


function Car(brand) {
    this.brand = brand;
}

Car.prototype.drive = function() {
    return `${this.brand} is driving`;
};

const myCar = new Car('Toyota');

// ❌ Avoid (deprecated in some environments)
console.log(myCar.__proto__ === Car.prototype); // true

// ✅ Recommended (modern approach)
console.log(Object.getPrototypeOf(myCar) === Car.prototype); // true



// Parent constructor
function Animal(name) {
    this.name = name;
}

Animal.prototype.eat = function() {
    return `${this.name} is eating`;
};

console.log(Animal.eat());

// Child constructor
function Dog(name, breed) {
    Animal.call(this, name); // Call parent constructor
    this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Fix constructor reference

// Add Dog-specific methods
Dog.prototype.bark = function() {
    return `${this.name} says Woof!`;
};

// Create instances
const myDog = new Dog('Rex', 'German Shepherd');

console.log(myDog.name);        // "Rex" (from Animal)
console.log(myDog.breed);       // "German Shepherd" (from Dog)
console.log(myDog.eat());       // "Rex is eating" (inherited from Animal)
console.log(myDog.bark());      // "Rex says Woof!" (from Dog)

// Check the prototype chain
console.log(myDog instanceof Dog);     // true
console.log(myDog instanceof Animal);  // true