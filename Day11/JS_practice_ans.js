// ==============================================
// DAY 11 PRACTICE: Prototype Chain & Property Lookup
// Fix the code or answer the questions
// ==============================================

console.log("=== Prototype Chain PRACTICE ===\n");

// ------------------------
// Q1: Basic Prototype Lookup
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

const john = new Person("John", "Doe");

console.log(john.getFullName());



// ------------------------
// Q2: Prototype Chain Traversal
function Employee(firstName, lastName, title) {
  Person.call(this, firstName, lastName);
  this.title = title;
}

// Setup inheritance
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.getDetails = function() {
  return `${this.getFullName()} - ${this.title}`;
};

const emp = new Employee("Tendi", "Sherpa", "Developer");

// Problem: Traverse emp's prototype chain manually
console.log("Q2: Direct prototype:", /* ??? */); // Expected: Employee.prototype
console.log(Object.getPrototypeOf(emp))
console.log("Q2: Next prototype:", /* ??? */);   // Expected: Person.prototype
console.log(Object.getPrototypeOf(Object.getPrototypeOf(emp)));
console.log("Q2: Final prototype:", /* ??? */);  // Expected: Object.prototype
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(emp))));



// ------------------------
// Q3: Own vs Inherited Properties
console.log("Q3: Own properties:", /* ??? */); // Expected: ["firstName", "lastName", "title"]
console.log(Object.keys(emp)); 
console.log("Q3: hasOwnProperty getDetails:", /* ??? */); // Expected: false
console.log(emp.hasOwnProperty("getDetails"))
console.log("Q3: hasOwnProperty title:", /* ??? */);      // Expected: true
console.log(emp.hasOwnProperty("title"))




// ------------------------
// Q4: Property Lookup in Prototype Chain
Person.prototype.greet = function() {
  return `Hello, ${this.firstName}`;
};

// emp
//  → Employee.prototype
//    → Person.prototype
//      → Object.prototype
//        → null


console.log("Q4:", emp.greet()); // Expected: Hello, Tendi

// Problem: What does this print?
console.log("Q4:", emp.greet()); // Expected: Hello, Tendi

// ------------------------
// Q5: Debugging Prototype Chain
const animal = {
  eats: true
};

// Question: Fill in to check prototype chain
console.log("Q5: rabbit.__proto__ === animal?", /* ??? */); // Expected: true
// true
console.log("Q5: animal.__proto__ === Object.prototype?", /* ??? */); // Expected: true
// true
console.log("Q5: Object.getPrototypeOf(rabbit) === animal?", /* ??? */); // Expected: true
// true
console.log("Q5: rabbit.eats?", /* ??? */); // Expected: true
// true




// ==============================================
// INTERVIEW QUESTION: Prototype Chain Debugging
// Fix the code to match the Expected outputs
// ==============================================

console.log("=== Prototype Chain Interview Question ===\n");

// Step 1: Create a Person constructor
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// Step 2: Add a method to Person prototype
Person.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`
};

// Step 3: Create Employee constructor inheriting from Person
function Employee(firstName, lastName, title) {
  this.title = title;
  Person.call(this, firstName, lastName)
}

// Step 4: Set up inheritance (Employee → Person)
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.getDetails = function() {
  // Use getFullName from Person.prototype
  return `${this.getFullName()} - ${this.title}`;
};


// Step 6: Create instance
const emp1 = new Employee("Tendi", "Sherpa", "Developer");

// Step 7: Test outputs
console.log("Full Name:", emp1.getFullName()); // Expected: Tendi Sherpa
console.log("Details:",  emp1.getDetails());   // Expected: Tendi Sherpa - Developer

// Step 8: Debug prototype chain manually
console.log("Direct prototype:", Object.getPrototypeOf(emp1)); // Employee.prototype
console.log("Next prototype:", Object.getPrototypeOf(Object.getPrototypeOf(emp1))); // Person.prototype
console.log("Final prototype:", Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(emp1)))); // Object.prototype


// Step 9: Check own vs inherited properties
console.log("Own properties:", Object.keys(emp1));               // ["firstName", "lastName", "title"]
console.log("Has getFullName as own property?", emp1.hasOwnProperty("getFullName")); // false

