// ==============================================
// DAY 4: SCOPE & LEXICAL ENVIRONMENT PRACTICE PROBLEMS
// ==============================================

console.log("🚀 DAY 4 - SCOPE & LEXICAL ENVIRONMENT PRACTICE\n");

// ==============================================
// MEDIUM PRACTICE PROBLEMS - FIND AND FIX THE ISSUES
// ==============================================

console.log("\n--- MEDIUM PRACTICE PROBLEMS ---\n");

// Problem 1: Unexpected Global
console.log("Problem 1: Unexpected Global");
function processData() {
  for (i = 0; i < 5; i++) {
    console.log(i);
  }
}
processData();
console.log("Value of i outside function:", i);

// Issues to fix:
// 1. Find the accidental global variable
// 2. Fix the scope issue
// 3. Prevent variable leakage

// Problem 2: Loop Variable Scope
console.log("\n\nProblem 2: Loop Variable Scope");
var buttons = [];
for (var i = 0; i < 3; i++) {
  buttons.push(function() {
    console.log("Button", i, "clicked");
  });
}
buttons[0]();
buttons[1]();
buttons[2]();

// Issues to fix:
// 1. Why do all buttons show the same value?
// 2. Fix using block scope
// 3. Alternative solution using IIFE

// Problem 3: Variable Shadowing Confusion
console.log("\n\nProblem 3: Variable Shadowing Confusion");
let x = 10;

function outer() {
  let x = 20;
  
  function inner() {
    console.log("Inner x:", x);
    let x = 30;
    console.log("Inner x after declaration:", x);
  }
  
  inner();
  console.log("Outer x:", x);
}

outer();
console.log("Global x:", x);

// Issues to fix:
// 1. Identify the temporal dead zone issue
// 2. Fix the variable shadowing problem
// 3. Understand hoisting with let/const

// Problem 4: Block Scope vs Function Scope
console.log("\n\nProblem 4: Block Scope vs Function Scope");
function checkScope() {
  if (true) {
    var functionScoped = "I'm var";
    let blockScoped = "I'm let";
  }
  
  console.log("Can access functionScoped:", functionScoped);
  console.log("Can access blockScoped:", blockScoped);
}

checkScope();

// Issues to fix:
// 1. Fix the reference error
// 2. Understand difference between var and let/const scoping
// 3. Refactor to use appropriate variable declarations

// Problem 5: Closure with Loop
console.log("\n\nProblem 5: Closure with Loop");
function createFunctions() {
  var result = [];
  
  for (var i = 0; i < 3; i++) {
    result[i] = function() {
      return i;
    };
  }
  
  return result;
}

var functions = createFunctions();
console.log("Function 0 returns:", functions[0]());
console.log("Function 1 returns:", functions[1]());
console.log("Function 2 returns:", functions[2]());

// Issues to fix:
// 1. Why do all functions return 3?
// 2. Fix using let
// 3. Fix using IIFE while keeping var

// Problem 6: Hoisting and Scope Interaction
console.log("\n\nProblem 6: Hoisting and Scope Interaction");
var value = "global";

function test() {
  console.log("First log:", value);
  
  if (false) {
    var value = "local";
  }
  
  console.log("Second log:", value);
}

test();

// Issues to fix:
// 1. Understand why undefined is logged first
// 2. Fix the variable declaration placement
// 3. Explain hoisting mechanism

// ==============================================
// INTERVIEW PRACTICE PROBLEMS
// ==============================================

console.log("\n\n--- INTERVIEW PRACTICE PROBLEMS ---\n");

// Problem 7: Lexical Scope Chain
console.log("Problem 7: Lexical Scope Chain");
let a = 1;

function first() {
  console.log(a);
  let b = 2;
  
  function second() {
    console.log(a, b);
    let c = 3;
    
    function third() {
      console.log(a, b, c);
    }
    
    third();
  }
  
  second();
}

first();

// Concepts to explain:
// 1. Draw the scope chain
// 2. Explain how variable lookup works
// 3. What happens if we add debugger statements?

// Problem 8: Closure Counter
console.log("\n\nProblem 8: Closure Counter");
function createCounter() {
  let count = 0;
  
  return {
    increment: function() {
      count++;
      return count;
    },
    reset: function() {
      count = 0;
    }
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log("Counter1:", counter1.increment());
console.log("Counter1:", counter1.increment());
console.log("Counter2:", counter2.increment());

// Concepts to explain:
// 1. How do closures work here?
// 2. Why do counter1 and counter2 have separate counts?
// 3. What would happen if count was declared with var?

// Problem 9: Module Pattern
console.log("\n\nProblem 9: Module Pattern");
var Module = (function() {
  var privateVar = "I'm private";
  
  function privateMethod() {
    return privateVar;
  }
  
  return {
    publicMethod: function() {
      return privateMethod();
    }
  };
})();

console.log(Module.publicMethod());
console.log(Module.privateVar);
console.log(Module.privateMethod());

// Concepts to explain:
// 1. How does this create encapsulation?
// 2. What's the purpose of the IIFE?
// 3. Real-world use cases

// Problem 10: This and Arrow Functions Scope
console.log("\n\nProblem 10: This and Arrow Functions Scope");
const obj = {
  name: "John",
  regularFunc: function() {
    console.log("Regular:", this.name);
    
    const innerArrow = () => {
      console.log("Arrow inside regular:", this.name);
    };
    
    const innerRegular = function() {
      console.log("Regular inside regular:", this.name);
    };
    
    innerArrow();
    innerRegular();
  },
  
  arrowFunc: () => {
    console.log("Arrow method:", this.name);
  }
};

obj.regularFunc();
obj.arrowFunc();

// Concepts to explain:
// 1. Difference between arrow and regular functions
// 2. Lexical this binding
// 3. How scope affects this keyword

// Problem 11: Variable Redeclaration
console.log("\n\nProblem 11: Variable Redeclaration");
var x = 10;
var x = 20;

let y = 30;
let y = 40;

const z = 50;
const z = 60;

// Concepts to explain:
// 1. Which lines will cause errors?
// 2. Difference between var, let, const redeclaration
// 3. Best practices for variable declaration

// Problem 12: Scope in Event Handlers
console.log("\n\nProblem 12: Scope in Event Handlers");
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log("Timeout", i);
  }, 100);
}

for (let j = 0; j < 3; j++) {
  setTimeout(function() {
    console.log("Timeout with let", j);
  }, 200);
}

// Concepts to explain:
// 1. Why does var behave differently?
// 2. How does closure capture variables?
// 3. Solutions for both approaches

// Problem 13: Nested Functions and Memory
console.log("\n\nProblem 13: Nested Functions and Memory");
function outerFunction() {
  let largeArray = new Array(1000000).fill("data");
  
  return function innerFunction() {
    console.log("Inner function accessing largeArray length:", largeArray.length);
  };
}

const holdReference = outerFunction();
// What happens to largeArray when outerFunction finishes execution?

// Concepts to explain:
// 1. Memory implications of closures
// 2. Garbage collection
// 3. How to avoid memory leaks

// ==============================================
// BONUS: TRICKY SCOPE PROBLEMS
// ==============================================

console.log("\n\n--- BONUS: TRICKY SCOPE PROBLEMS ---\n");

// Bonus 1: Hoisting with Function Expressions
console.log("Bonus 1: Hoisting with Function Expressions");
testFunction();

var testFunction = function() {
  console.log("Function expression");
};

function testFunction() {
  console.log("Function declaration");
}

testFunction();

// Concepts to explain:
// 1. Order of hoisting
// 2. Difference between function declarations and expressions
// 3. What gets executed and why

// Bonus 2: Block Scope in Switch
console.log("\n\nBonus 2: Block Scope in Switch");
let condition = "case1";

switch (condition) {
  case "case1":
    let message = "First case";
    console.log(message);
    break;
    
  case "case2":
    let message = "Second case";
    console.log(message);
    break;
}

// Concepts to explain:
// 1. Why does this cause an error?
// 2. How to fix it?
// 3. Block scope considerations in switch statements

// Bonus 3: Immediately Resolved Promise
console.log("\n\nBonus 3: Immediately Resolved Promise");
let promiseValue = "outer";

function testPromise() {
  let promiseValue = "inner";
  
  Promise.resolve().then(() => {
    console.log("Promise value:", promiseValue);
  });
  
  promiseValue = "updated";
}

testPromise();

// Concepts to explain:
// 1. When does the closure capture the value?
// 2. Microtask queue timing
// 3. Scope in asynchronous callbacks

console.log("\n\n✅ Practice complete! Try to fix all issues and explain each concept.");