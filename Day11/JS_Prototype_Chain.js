// The prototype chain is JavaScript's mechanism for inheritance and property lookup. When you access a property on an object, JavaScript searches for it through a chain of linked objects.

// Base object
const animal = {
    eats: true,
    walk() {
        console.log("Animal walks");
    }
};

// Create rabbit that inherits from animal
const rabbit = {
    jumps: true,
    __proto__: animal  // Sets prototype (for demo - not recommended in production)
};

console.log(rabbit.eats);  // true (from animal)
console.log(rabbit.jumps); // true (from rabbit)
rabbit.walk();            // "Animal walks" (from animal)

// The prototype chain: rabbit → animal → Object.prototype → null



function Animal(name) {
    this.name = name;
}

// Methods added to prototype
Animal.prototype.eats = true;
Animal.prototype.walk = function() {
    console.log(`${this.name} walks`);
};

// Create instance
const dog = new Animal("Buddy");

// Prototype chain:
// dog → Animal.prototype → Object.prototype → null

console.log(dog.name);    // "Buddy" (own property)
console.log(dog.eats);    // true (from Animal.prototype)
dog.walk();               // "Buddy walks"

// Check inheritance
console.log(dog instanceof Animal);  // true
console.log(dog instanceof Object);  // true



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
  return /* ??? */; // Fix to return full name
};

// Step 3: Create Employee constructor inheriting from Person
function Employee(firstName, lastName, title) {
  this.title = title;
  // Call parent constructor
  /* ??? */
}

// Step 4: Set up inheritance (Employee → Person)
Employee.prototype = /* ??? */;
Employee.prototype.constructor = Employee;

// Step 5: Add a method to Employee prototype
Employee.prototype.getDetails = function() {
  return /* ??? */; // Fix to return: FullName - title
};

// Step 6: Create instance
const emp = new Employee("Tendi", "Sherpa", "Developer");

// Step 7: Test outputs
console.log("Full Name:", /* ??? */); // Expected: Tendi Sherpa
console.log("Details:", /* ??? */);   // Expected: Tendi Sherpa - Developer

// Step 8: Debug prototype chain manually
console.log("Direct prototype:", /* ??? */); // Expected: Employee.prototype
console.log("Next prototype:", /* ??? */);   // Expected: Person.prototype
console.log("Final prototype:", /* ??? */);  // Expected: Object.prototype

// Step 9: Check own vs inherited properties
console.log("Own properties:", /* ??? */);          // Expected: ["firstName", "lastName", "title"]
console.log("Has getFullName as own property?", /* ??? */); // Expected: false
