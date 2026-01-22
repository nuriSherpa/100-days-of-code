// Fixed version:
class Person {
  constructor(name, age) {  // Added comma
    this.name = name;
    this.age = age;
  }
  
  sayHello() {
    return `Hello, ${this.name}`;
  }
  
  getBirthYear(currentYear) {
    return currentYear - this.age;  // Added 'this.'
  }
}

const person = new Person("Alice", 25);  // Added comma
console.log(person.sayHello()); // "Hello, Alice"
console.log(person.getBirthYear(2024)); // 1999




// ==================== PROBLEM 2: Fix Prototype Inheritance ====================
console.log("\n=== Problem 2: Fix Prototype Inheritance ===");
// Fixed version:
function Vehicle(speed) {
  this.speed = speed;
}

Vehicle.prototype.move = function() {  // Correct: on prototype
  return `Moving at ${this.speed} km/h`;
};

function Car(speed, brand) {
  Vehicle.call(this, speed);  // Added .call(this, speed)
  this.brand = brand;
}

Car.prototype = Object.create(Vehicle.prototype);  // Correct inheritance
Car.prototype.constructor = Car;  // Fix constructor reference

Car.prototype.honk = function() {   // Correct: on prototype
  return `${this.brand} honks!`;
};

const myCar = new Car(100, "Toyota");
console.log(myCar.move());  // "Moving at 100 km/h"
console.log(myCar.honk());  // "Toyota honks!"


// ==================== PROBLEM 3: Fix Super() Usage ====================
console.log("\n=== Problem 3: Fix Super() Usage ===");


// Fixed version:
class Animal {
  constructor(name) {
    this.name = name;  // Added 'this.'
  }
  
  speak() {
    return `${this.name} makes a sound`;  // Added 'this.'
  }
}

class Dog extends Animal {  // Added 'extends Animal'
  constructor(name, breed) {
    super(name);  // super() is first
    this.breed = breed;
  }
  
  speak() {
    return super.speak() + " and barks!";  // Added parentheses
  }
}

const dog = new Dog("Buddy", "Golden");
console.log(dog.speak()); // "Buddy makes a sound and barks!"

// ==================== PROBLEM 4: Fix Static Methods ====================
console.log("\n=== Problem 4: Fix Static Methods ===");

// Fixed version:
class MathHelper {
  static pi = 3.14159;
  
  static calculateArea(radius) {  // Made static
    return MathHelper.pi * radius * radius;  // Added class name
  }
  
  static double(number) {
    return number * 2;
  }
}

// Can't instantiate to use static method
// console.log(helper.calculateArea(5));  // Wouldn't work
console.log(MathHelper.calculateArea(5));  // Works: 78.53975
console.log(MathHelper.double(10));  // 20

// Alternative with instance method:
class Circle {
  static pi = 3.14159;
  
  constructor(radius) {
    this.radius = radius;
  }
  
  area() {  // Instance method
    return Circle.pi * this.radius * this.radius;  // Use Circle.pi
  }
}

const circle = new Circle(5);
console.log(circle.area());  // 78.53975

// ==================== PROBLEM 5: Fix Getter/Setter ====================
console.log("\n=== Problem 5: Fix Getter/Setter ===");
// Fixed version:
class BankAccount {
  constructor(balance) {
    this._balance = balance;  // Use different property name
  }
  
  get balance() {
    return this._balance;
  }
  
  set balance(amount) {
    if (amount < 0) {
      console.log("Cannot set negative balance");
      return;
    }
    this._balance = amount;  // Set the backing field
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;  // Use setter
    }
  }
  
  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return amount;
    }
    return 0;
  }
}

const account = new BankAccount(100);
console.log(account.balance);  // 100
account.deposit(50);
console.log(account.balance);  // 150
account.balance = -50;  // "Cannot set negative balance"
console.log(account.balance);  // Still 150
account.withdraw(30);
console.log(account.balance);  // 120

// ==================== BONUS PROBLEM: Fix Private Fields ====================
console.log("\n=== Bonus Problem: Fix Private Fields ===");
// Fixed version:
class SecretBox {
  #secret;  // Private field
  
  constructor(secret) {
    this.#secret = secret;  // Assign to private field
  }
  
  reveal() {
    return `The secret is: ${this.#secret}`;  // Access with this.#
  }
  
  // No direct getter for private field - must access within class
  getSecret() {
    return this.reveal();
  }
  
  // Can have public method that accesses private field
  checkSecret(guess) {
    return guess === this.#secret;
  }
}

const box = new SecretBox("password123");
console.log(box.reveal());  // "The secret is: password123"
console.log(box.getSecret());  // "The secret is: password123"
console.log(box.checkSecret("password123"));  // true
console.log(box.checkSecret("wrong"));  // false
// console.log(box.#secret);  // ❌ SyntaxError: Private field must be declared in class