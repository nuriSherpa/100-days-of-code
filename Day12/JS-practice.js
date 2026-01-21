// Question 1: Constructor Without new - Fix the Issue

function Person(name, age) {
    this.name = name;
    this.age = age;
    
    this.introduce = function() {
        return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
    };
}

// Test cases
console.log("=== Test Case 1: Using 'new' ===");
const person1 = new Person("Alice", 25);
console.log(person1.introduce()); // Should work

console.log("\n=== Test Case 2: Without 'new' ===");
try {
    const person2 = Person("Bob", 30);
    console.log(person2.introduce()); // Currently crashes - FIX THIS!
} catch (e) {
    console.log("Error:", e.message); // Currently shows error
}

// Question 2: Inefficient Method Definition - Fix the Inefficiency
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    
    this.getDetails = function() {
        return `${this.year} ${this.make} ${this.model}`;
    };
    
    this.isVintage = function() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.year > 25;
    };
}

// Test
console.log("=== Creating Car Instances ===");
const car1 = new Car("Toyota", "Camry", 2010);
const car2 = new Car("Honda", "Accord", 2015);

console.log("car1.getDetails === car2.getDetails:", car1.getDetails === car2.getDetails);
console.log("car1.isVintage === car2.isVintage:", car1.isVintage === car2.isVintage);


// Question 3: Prototype Chain - Fix the Inheritance
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return `${this.name} makes a sound.`;
};

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

// Missing prototype connection - FIX THIS!
// Dog.prototype = Object.create(Animal.prototype);
// Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    return `${this.name} barks!`;
};

const dog1 = new Dog("Rex", "German Shepherd");

console.log("=== Testing Inheritance ===");
console.log("dog1.speak():", dog1.speak()); // Should work after fix
console.log("dog1 instanceof Dog:", dog1 instanceof Dog);
console.log("dog1 instanceof Animal:", dog1 instanceof Animal);


// Question 4: Constructor Return Value - Predict the Output
function Person(name) {
    this.name = name;
    return { custom: "object" };
}

function Car(model) {
    this.model = model;
    return 42; // Primitive return
}

function Bike(brand) {
    this.brand = brand;
    // No explicit return
}

console.log("=== Test Cases ===");
const person = new Person("Alice");
const car = new Car("Toyota");
const bike = new Bike("Yamaha");

console.log("person:", person);
console.log("person.name:", person.name);
console.log("\ncar:", car);
console.log("car.model:", car.model);
console.log("\nbike:", bike);
console.log("bike.brand:", bike.brand);


// Question 5: Static vs Instance Methods - Fix Usage Errors
function Calculator() {
    this.value = 0;
}

Calculator.prototype.add = function(num) {
    this.value += num;
    return this;
};

// Static method
Calculator.multiply = function(a, b) {
    return a * b;
};

// Test cases
console.log("=== Test Cases ===");
const calc = new Calculator();
calc.add(10);

try {
    console.log("calc.multiply(2, 3):", calc.multiply(2, 3)); // Should fail - why?
} catch (e) {
    console.log("Error:", e.message);
}

console.log("Calculator.multiply(4, 5):", Calculator.multiply(4, 5)); // Should work