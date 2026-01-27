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

// Problem: Use john to print full name using prototype method
console.log("Q1:", /* ??? */); // Expected: John Doe

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
console.log("Q2: Next prototype:", /* ??? */);   // Expected: Person.prototype
console.log("Q2: Final prototype:", /* ??? */);  // Expected: Object.prototype

// ------------------------
// Q3: Own vs Inherited Properties
console.log("Q3: Own properties:", /* ??? */); // Expected: ["firstName", "lastName", "title"]
console.log("Q3: hasOwnProperty getDetails:", /* ??? */); // Expected: false
console.log("Q3: hasOwnProperty title:", /* ??? */);      // Expected: true

// ------------------------
// Q4: Property Lookup in Prototype Chain
Person.prototype.greet = function() {
  return `Hello, ${this.firstName}`;
};

// Problem: What does this print?
console.log("Q4:", emp.greet()); // Expected: Hello, Tendi

// ------------------------
// Q5: Debugging Prototype Chain
const animal = {
  eats: true
};

const rabbit = Object.create(animal);
rabbit.jumps = true;

// Question: Fill in to check prototype chain
console.log("Q5: rabbit.__proto__ === animal?", /* ??? */); // Expected: true
console.log("Q5: animal.__proto__ === Object.prototype?", /* ??? */); // Expected: true
console.log("Q5: Object.getPrototypeOf(rabbit) === animal?", /* ??? */); // Expected: true
console.log("Q5: rabbit.eats?", /* ??? */); // Expected: true
