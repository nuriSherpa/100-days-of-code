function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
};

// Employee inherits from Person
function Employee(firstName, lastName, title) {
    Person.call(this, firstName, lastName);  // Call parent constructor
    this.title = title;
}

// Set up inheritance
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Add Employee-specific method
Employee.prototype.getDetails = function() {
    return `${this.getFullName()} - ${this.title}`;
};

const emp = new Employee("John", "Doe", "Developer");

// Debug the prototype chain
console.log("=== Debugging Prototype Chain ===");

// 1. Check own properties
console.log("Own properties:", Object.keys(emp)); 
// ["firstName", "lastName", "title"]

// 2. Check property in prototype chain
console.log("firstName:", emp.hasOwnProperty("firstName"));  // true
console.log("getFullName:", emp.hasOwnProperty("getFullName")); // false

// 3. Traverse prototype chain manually
console.log("Direct prototype:", Object.getPrototypeOf(emp)); // Employee.prototype
console.log("Next prototype:", Object.getPrototypeOf(Object.getPrototypeOf(emp))); // Person.prototype
console.log("Final prototype:", Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(emp)))); // Object.prototype

// 4. Using __proto__ (browser console only, not recommended for production)
console.log("emp.__proto__:", emp.__proto__); // Employee.prototype
console.log("emp.__proto__.__proto__:", emp.__proto__.__proto__); // Person.prototype

// 5. Check instance relationships
console.log("emp instanceof Employee:", emp instanceof Employee); // true
console.log("emp instanceof Person:", emp instanceof Person);     // true
console.log("emp instanceof Object:", emp instanceof Object);     // true