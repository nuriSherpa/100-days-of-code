// ==================== PROBLEM 1: Fix the Class Syntax ====================
console.log("=== Problem 1: Fix the Class Syntax ===");

// Original broken code:
/*
class Person {
  constructor(name age) {  // Missing comma
    this.name = name
    this.age = age
  }
  
  sayHello() 
    return `Hello, ${this.name}`;
  }
  
  getBirthYear(currentYear) {
    return currentYear - age;  // Should use this.age
  }
}

const person = new Person("Alice" 25);  // Missing comma
*/



// ==================== PROBLEM 2: Fix Prototype Inheritance ====================
console.log("\n=== Problem 2: Fix Prototype Inheritance ===");

// Original broken code:
/*
function Vehicle(speed) {
  this.speed = speed;
}

Vehicle.move = function() {  // Should be on prototype
  return `Moving at ${this.speed} km/h`;
};

function Car(speed, brand) {
  Vehicle(speed);  // Missing .call(this, speed)
  this.brand = brand;
}

Car.prototype = Vehicle;  // Wrong assignment - should use Object.create
Car.honk = function() {   // Should be on prototype
  return `${this.brand} honks!`;
};

const myCar = new Car(100, "Toyota");
console.log(myCar.move());  // Should work
*/



// Original broken code:
/*
class Animal {
  constructor(name) {
    name = name;  // Should be this.name
  }
  
  speak() {
    return `${name} makes a sound`;  // Should be this.name
  }
}

class Dog {
  constructor(name, breed) {
    super(name);  // super() must be first statement
    this.breed = breed;
  }
  
  speak() {
    return super.speak + " and barks!";  // Should be super.speak()
  }
}

const dog = new Dog("Buddy", "Golden");
console.log(dog.speak());
*/



// Original broken code:
/*
class MathHelper {
  static pi = 3.14159;
  
  calculateArea(radius) {  // Should be static
    return this.pi * radius * radius;  // Should use MathHelper.pi
  }
  
  static double(number) {
    return number * 2;
  }
}

const helper = new MathHelper();
console.log(helper.calculateArea(5));  // Should work without instance
console.log(MathHelper.double(10));
*/



// Original broken code:
/*
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }
  
  get balance() {  // Conflicts with property name
    return this._balance;
  }
  
  set balance(amount) {
    if (amount < 0) {
      console.log("Cannot set negative balance");
      return;
    }
    this.balance = amount;  // Recursive call!
  }
  
  deposit(amount) {
    balance += amount;  // Should be this.balance
  }
}

const account = new BankAccount(100);
account.deposit(50);
console.log(account.balance);
*/



// Original broken code:
/*
class SecretBox {
  #secret;  // Private field
  
  constructor(secret) {
    secret = secret;  // Should assign to this.#secret
  }
  
  reveal() {
    return `The secret is: ${secret}`;  // Should be this.#secret
  }
  
  getSecret() {
    return this.secret;  // Trying to access private field incorrectly
  }
}

const box = new SecretBox("password123");
console.log(box.reveal());
*/

