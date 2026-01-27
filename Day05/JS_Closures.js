// Closures
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log("Outer Variable:", outerVariable);
    console.log("Inner Variable:", innerVariable);
  };
}

const newFunction = outerFunction("outside");
newFunction("inside");

// Concepts to explain:
// 1. What is a closure?
// Closure is a feature in JavaScript where an inner function has access to the outer (enclosing) function's variables even after the outer function has executed.
// 2. How does innerFunction access outerVariable?
// The innerFunction forms a closure that retains access to the outerFunction's scope, allowing it to use outerVariable.
// 3. Practical uses of closures
// Closures are commonly used for data privacy, creating function factories, and maintaining state in asynchronous programming.

// Memory Implications of Closures
console.log("\n\n--- Memory Implications of Closures ---\n");   
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log("Counter:", counter());
console.log("Counter:", counter());
console.log("Counter:", counter());

// Concepts to explain:
// 1. How closures retain access to variables
// The inner function retains a reference to the outer function's scope, keeping the variable 'count' alive even after createCounter has finished executing.
// 2. Memory usage implications
// Since the closure keeps the outer function's scope in memory, it can lead to increased memory usage if not managed properly.
// 3. Potential for memory leaks and how to avoid them
// To avoid memory leaks, ensure that closures do not unintentionally hold references to large objects or data structures that are no longer needed.

// Closures in Event Handlers
console.log("\n\n--- Closures in Event Handlers ---\n");   
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log("Timeout with var:", i);
  }, 100);
}

for (let j = 0; j < 3; j++) {
  setTimeout(function() {
    console.log("Timeout with let:", j);
  }, 200);
}

// Concepts to explain:
// 1. Difference between var and let in loops
// 'var' is function-scoped and does not create a new scope for each iteration, leading to all timeouts logging the final value of 'i'. 'let' is block-scoped and creates a new scope for each iteration, allowing each timeout to log the correct value of 'j'.
// 2. How closures capture variables
// Closures capture the variable by reference, so when using 'var', all closures refer to the same variable 'i'. With 'let', each closure captures its own instance of 'j'.
// 3. Solutions for both approaches
// To fix the 'var' issue, you can use an IIFE (Immediately Invoked Function Expression) to create a new scope for each iteration.

// Advanced Closure Example: Data Privacy
console.log("\n\n--- Advanced Closure Example: Data Privacy ---\n");   
function Counter() {
  let count = 0; // private variable
  
  this.increment = function() {
    count++;
    return count;
  };
  
  this.decrement = function() {
    count--;
    return count;
  };
  
  this.getCount = function() {
    return count;
  };
}

const myCounter = new Counter();
console.log("Increment:", myCounter.increment());
console.log("Increment:", myCounter.increment());
console.log("Decrement:", myCounter.decrement());
console.log("Current Count:", myCounter.getCount());

// Concepts to explain:
// 1. Using closures for data privacy
// The variable 'count' is private to the Counter function and cannot be accessed directly from outside, ensuring data privacy.
// 2. Encapsulation of state
// The Counter function encapsulates the state of 'count', providing controlled access through its methods.
// 3. Real-world applications
// Closures are often used in module patterns, event handlers, and asynchronous programming to maintain state and ensure data privacy.