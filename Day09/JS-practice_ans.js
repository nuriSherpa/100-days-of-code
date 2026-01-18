// ==============================================
// call(), apply(), and bind() SOLUTIONS
// ==============================================

console.log("=== call(), apply(), bind() SOLUTIONS ===");

// Solution 1: call() - Context Binding
const person1 = {
  name: 'Alice',
  greet: function(message, punctuation) {
    return `${this.name} says: ${message}${punctuation}`;
  }
};

const person2 = {
  name: 'Bob'
};

console.log("Solution 1: Using call() to fix context");
console.log("Fixed: ", person1.greet.call(person2, 'Hello', '!'));
console.log("Result: Bob says: Hello!");

// Solution 2: call() - Function Borrowing
function displayInfo(age, city) {
  return `${this.name} is ${age} years old and lives in ${city}`;
}

const user = { name: 'Charlie' };
console.log("\nSolution 2: Using call() for function borrowing");
console.log("Result: ", displayInfo.call(user, 25, 'New York'));
console.log("Result: Charlie is 25 years old and lives in New York");

// Solution 3: apply() - Array Arguments
function calculateSum(a, b, c) {
  return this.multiplier * (a + b + c);
}

const calculator = {
  multiplier: 2
};

const numbers = [1, 2, 3];
console.log("\nSolution 3: Using apply() with array arguments");
console.log("Result: ", calculateSum.apply(calculator, numbers));
console.log("Result: 12");

// Solution 4: apply() - Finding Maximum
function findMax() {
  return Math.max.apply(null, arguments);
}

const scores = [85, 92, 78, 96, 88];
console.log("\nSolution 4: Using apply() to find max in array");
console.log("Result: ", Math.max.apply(null, scores));
console.log("Result: 96");

// Solution 5: bind() - Event Handler
const buttonHandler = {
  count: 0,
  increment: function() {
    this.count++;
    console.log(`Button clicked ${this.count} times`);
  }
};

console.log("\nSolution 5: Using bind() for event handler");
// Simulating button click
const boundIncrement = buttonHandler.increment.bind(buttonHandler);
boundIncrement(); // Button clicked 1 times
boundIncrement(); // Button clicked 2 times

// Solution 6: bind() - Partial Application
function multiply(a, b, c) {
  return a * b * c;
}

console.log("\nSolution 6: Using bind() for partial application");
const doubleMultiply = multiply.bind(null, 2);
console.log("Result: ", doubleMultiply(3, 4));
console.log("Result: 24");

// ==============================================
// 5 FIX-THE-CODE PROBLEMS SOLUTIONS
// ==============================================

console.log("\n\n=== FIX-THE-CODE PROBLEMS SOLUTIONS ===");

// Problem 1 Solution: Event Handler Context Loss
console.log("\nProblem 1 Solution: Event Handler Context Loss");
const eventHandler = {
  clicks: 0,
  handleClick: function() {
    this.clicks++;
    console.log(`Total clicks: ${this.clicks}`);
  }
};

// Fixed: Use bind() to preserve context
// document.querySelector('.btn').addEventListener('click', eventHandler.handleClick.bind(eventHandler));

// Simulating clicks for demonstration
const boundHandleClick = eventHandler.handleClick.bind(eventHandler);
boundHandleClick(); // Total clicks: 1
boundHandleClick(); // Total clicks: 2

// Problem 2 Solution: setTimeout Context Issue
console.log("\nProblem 2 Solution: setTimeout Context Issue");
const timer = {
  value: 0,
  startTimer: function() {
    // Fixed: Use arrow function or bind()
    setTimeout(() => {
      this.value++;
      console.log(`Timer value: ${this.value}`);
    }, 100);
  }
};

// Alternative solution using bind():
// setTimeout(function() {
//   this.value++;
//   console.log(`Timer value: ${this.value}`);
// }.bind(this), 1000);

timer.startTimer(); // After 100ms: Timer value: 1

// Problem 3 Solution: Method Borrowing Issue
console.log("\nProblem 3 Solution: Method Borrowing Issue");
const objA = {
  items: [1, 2, 3],
  getLength: function() {
    return this.items.length;
  }
};

const objB = {
  items: [4, 5, 6, 7, 8]
};

// Fixed: Use call() to borrow method with objB context
const length = objA.getLength.call(objB);
console.log("Result: ", length); // 5

// Problem 4 Solution: Constructor Function Issue
console.log("\nProblem 4 Solution: Constructor Function Issue");
function Car(make, model) {
  this.make = make;
  this.model = model;
}

// Fixed: Use 'new' keyword for constructor
const myCar = new Car('Toyota', 'Camry');
console.log("Result: ", myCar.make); // Toyota
console.log("Window.make: ", window.make); // undefined (not polluted)

// Problem 5 Solution: Array Method Context Issue
console.log("\nProblem 5 Solution: Array Method Context Issue");
const processor = {
  factor: 10,
  process: function(numbers) {
    // Fixed solution 1: Use arrow function
    return numbers.map(num => num * this.factor);
    
    // Fixed solution 2: Use bind()
    // return numbers.map(function(num) {
    //   return num * this.factor;
    // }.bind(this));
    
    // Fixed solution 3: Store this in variable
    // const self = this;
    // return numbers.map(function(num) {
    //   return num * self.factor;
    // });
  }
};

const nums = [1, 2, 3];
const processed = processor.process(nums);
console.log("Result: ", processed); // [10, 20, 30]

// ==============================================
// 3 INTERVIEW QUESTIONS SOLUTIONS
// ==============================================

console.log("\n\n=== INTERVIEW QUESTIONS SOLUTIONS ===");

// Question 1 Solution: Difference between call, apply, and bind
console.log("\nQ1 Solution: Difference between call(), apply(), and bind()");
console.log(`1. call(): Immediately invokes function with specified 'this' context and individual arguments
   Example: func.call(context, arg1, arg2, ...)

2. apply(): Immediately invokes function with specified 'this' context and array of arguments
   Example: func.apply(context, [arg1, arg2, ...])

3. bind(): Returns a new function with bound 'this' context and optional preset arguments
   Example: const boundFunc = func.bind(context, arg1, arg2)`);

// Question 2 Solution: Real-world use cases
console.log("\nQ2 Solution: Practical use cases for bind()");
console.log(`1. Event Handlers: Preserving context in DOM event listeners
   button.addEventListener('click', this.handleClick.bind(this))

2. Partial Application: Creating specialized functions
   const multiplyByTwo = multiply.bind(null, 2)

3. Callbacks with Context: Maintaining 'this' in asynchronous callbacks
   setTimeout(this.update.bind(this), 1000)

4. Function Currying: Creating functions with preset parameters
   const logWithPrefix = console.log.bind(console, '[APP]')

5. Method Borrowing: Temporarily using methods from other objects
   Array.prototype.slice.call(arguments)`);

// Question 3 Solution: Polyfill for bind
console.log("\nQ3 Solution: bind() polyfill implementation");
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  
  return function(...innerArgs) {
    return fn.apply(context, [...args, ...innerArgs]);
  };
};
