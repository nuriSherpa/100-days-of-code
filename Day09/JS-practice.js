// ==============================================
// call(), apply(), and bind() EXAMPLES (2 each)
// ==============================================

console.log("=== call(), apply(), bind() EXAMPLES ===");

// Example 1: call() - Context Binding
const person1 = {
  name: 'Alice',
  greet: function(message, punctuation) {
    return `${this.name} says: ${message}${punctuation}`;
  }
};

const person2 = {
  name: 'Bob'
};

// Question 1: Fix to use person2's context using call()
console.log("Q1: Using call() to fix context");
console.log("Current: ", person1.greet('Hello', '!'));
console.log("Expected: Bob says: Hello!");

// Example 2: call() - Function Borrowing
function displayInfo(age, city) {
  return `${this.name} is ${age} years old and lives in ${city}`;
}

const user = { name: 'Charlie' };
// Question 2: Use call() to invoke displayInfo with user as context
console.log("\nQ2: Using call() for function borrowing");
console.log("Expected: Charlie is 25 years old and lives in New York");

// Example 3: apply() - Array Arguments
function calculateSum(a, b, c) {
  return this.multiplier * (a + b + c);
}

const calculator = {
  multiplier: 2
};

const numbers = [1, 2, 3];
// Question 3: Fix to use apply() with the numbers array
console.log("\nQ3: Using apply() with array arguments");
console.log("Expected result: 12");

// Example 4: apply() - Finding Maximum
function findMax() {
  return Math.max.apply(null, arguments);
}

const scores = [85, 92, 78, 96, 88];
// Question 4: Use apply() to find maximum score
console.log("\nQ4: Using apply() to find max in array");
console.log("Expected max score: 96");

// Example 5: bind() - Event Handler
const buttonHandler = {
  count: 0,
  increment: function() {
    this.count++;
    console.log(`Button clicked ${this.count} times`);
  }
};

// Question 5: Fix event listener to properly bind context
console.log("\nQ5: Using bind() for event handler");
console.log("Expected when clicked: 'Button clicked 1 times', 'Button clicked 2 times', etc.");

// Example 6: bind() - Partial Application
function multiply(a, b, c) {
  return a * b * c;
}

// Question 6: Use bind() to create a function that multiplies by 2
console.log("\nQ6: Using bind() for partial application");
console.log("Expected: doubleMultiply(3, 4) should return 24");

// ==============================================
// 5 FIX-THE-CODE PROBLEMS
// ==============================================

console.log("\n\n=== FIX-THE-CODE PROBLEMS ===");

// Problem 1: Event Handler Context Loss
console.log("\nProblem 1: Event Handler Context Loss");
const eventHandler = {
  clicks: 0,
  handleClick: function() {
    this.clicks++;
    console.log(`Total clicks: ${this.clicks}`);
  }
};
// TODO: Fix context loss in event listener

// Problem 2: setTimeout Context Issue
console.log("\nProblem 2: setTimeout Context Issue");
const timer = {
  value: 0,
  startTimer: function() {
    setTimeout(function() {
      this.value++;
      console.log(`Timer value: ${this.value}`);
    }, 1000);
  }
};
// TODO: Fix setTimeout context issue

// Problem 3: Method Borrowing Issue
console.log("\nProblem 3: Method Borrowing Issue");
const objA = {
  items: [1, 2, 3],
  getLength: function() {
    return this.items.length;
  }
};

const objB = {
  items: [4, 5, 6, 7, 8]
};
// TODO: Fix method borrowing to get objB's length (should return 5)

// Problem 4: Constructor Function Issue
console.log("\nProblem 4: Constructor Function Issue");
function Car(make, model) {
  this.make = make;
  this.model = model;
}
// TODO: Fix constructor invocation
const myCar = Car('Toyota', 'Camry');

// Problem 5: Array Method Context Issue
console.log("\nProblem 5: Array Method Context Issue");
const processor = {
  factor: 10,
  process: function(numbers) {
    return numbers.map(function(num) {
      return num * this.factor;
    });
  }
};

const nums = [1, 2, 3];
// TODO: Fix context issue in map callback

// ==============================================
// 3 INTERVIEW QUESTIONS
// ==============================================

console.log("\n\n=== INTERVIEW QUESTIONS ===");

// Question 1: Difference between call, apply, and bind
console.log("\nQ1: Explain the difference between call(), apply(), and bind()");

// Question 2: Real-world use cases
console.log("\nQ2: What are practical use cases for bind() in real applications?");

// Question 3: Polyfill for bind
console.log("\nQ3: How would you implement your own bind() polyfill?");