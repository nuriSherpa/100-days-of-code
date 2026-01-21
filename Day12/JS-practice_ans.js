//1
// FIXED VERSION using instanceof
function Person(name, age) {
    if (!(this instanceof Person)) {
        return new Person(name, age);
    }

    this.name = name;
    this.age = age;
}

Person.prototype.introduce = function () {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
};

// Alternative using new.target (ES6+)
function PersonAlt(name, age) {
    if (!new.target) {
        return new PersonAlt(name, age);
    }

    this.name = name;
    this.age = age;
}

PersonAlt.prototype.introduce = function () {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
};

// Tests
console.log("=== QUESTION 1 ===");
const person1 = new Person("Alice", 25);
const person2 = Person("Bob", 30);

console.log(person1.introduce());
console.log(person2.introduce());

console.log("person1 instanceof Person:", person1 instanceof Person);
console.log("person2 instanceof Person:", person2 instanceof Person);


// 2

function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

Car.prototype.getDetails = function () {
    return `${this.year} ${this.make} ${this.model}`;
};

Car.prototype.isVintage = function () {
    const currentYear = new Date().getFullYear();
    return currentYear - this.year > 25;
};

// Tests
console.log("\n=== QUESTION 2 ===");
const car1 = new Car("Toyota", "Camry", 2010);
const car2 = new Car("Honda", "Accord", 2015);

console.log(car1.getDetails());
console.log(car2.getDetails());

console.log("Same getDetails function:", car1.getDetails === car2.getDetails);
console.log("Same isVintage function:", car1.isVintage === car2.isVintage);


// 3
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function () {
    return `${this.name} makes a sound.`;
};

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

// FIXED PROTOTYPE CHAIN
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
    return `${this.name} barks!`;
};

// Tests
console.log("\n=== QUESTION 3 ===");
const dog1 = new Dog("Rex", "German Shepherd");

console.log(dog1.speak());
console.log(dog1.bark());

console.log("dog1 instanceof Dog:", dog1 instanceof Dog);
console.log("dog1 instanceof Animal:", dog1 instanceof Animal);


// 4
function PersonReturn(name) {
    this.name = name;
    return { custom: "object" };
}

function CarReturn(model) {
    this.model = model;
    return 42; // primitive ignored
}

function BikeReturn(brand) {
    this.brand = brand;
}

// Tests
console.log("\n=== QUESTION 4 ===");
const person = new PersonReturn("Alice");
const car = new CarReturn("Toyota");
const bike = new BikeReturn("Yamaha");

console.log("person:", person);           // { custom: "object" }
console.log("person.name:", person.name); // undefined

console.log("car:", car);                 // CarReturn { model: "Toyota" }
console.log("car.model:", car.model);     // Toyota

console.log("bike:", bike);               // BikeReturn { brand: "Yamaha" }
console.log("bike.brand:", bike.brand);   // Yamaha



// 5:

function Calculator() {
    this.value = 0;
}

Calculator.prototype.add = function (num) {
    this.value += num;
    return this;
};

// STATIC METHOD
Calculator.multiply = function (a, b) {
    return a * b;
};

// Tests
console.log("\n=== QUESTION 5 ===");
const calc = new Calculator();
calc.add(10);

try {
    console.log(calc.multiply(2, 3)); // ❌ Error
} catch (e) {
    console.log("Error:", e.message);
}

console.log("Calculator.multiply(4, 5):", Calculator.multiply(4, 5)); // ✅ Works
