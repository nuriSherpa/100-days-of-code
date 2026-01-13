// ==============================================
// DAY 4: SCOPE & LEXICAL ENVIRONMENT PRACTICE PROBLEMS ANSWERS
// ==============================================

console.log("🚀 DAY 4 - SCOPE & LEXICAL ENVIRONMENT PRACTICE\n");

// ==============================================
// MEDIUM PRACTICE PROBLEMS - FIND AND FIX THE ISSUES
// ==============================================

console.log("\n--- MEDIUM PRACTICE PROBLEMS ---\n");
// Problem 1: Unexpected Global
console.log("Problem 1: Unexpected Global");
function processData() {
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
}
processData();
console.log("Value of i outside function:", i);
// Fixed by declaring 'i' with 'let' to limit its scope to the for loop


// Problem 2: Loop Variable Scope
console.log("\n\nProblem 2: Loop Variable Scope");
var buttons = [];
for (var i = 0; i < 3; i++) {
  (function(j){
    buttons.push(function() {
    console.log("Button", j, "clicked");
  });
  })(i);
}
buttons[0]();
buttons[1]();
buttons[2]();

// Fixed by using an IIFE to capture the current value of 'i' for each button

// Problem 3: Variable Shadowing Confusion
console.log("\n\nProblem 3: Variable Shadowing Confusion");
let x = 10;

function outer() {
  let x = 20;
  
  function inner() {
    console.log("Inner x:", x);
    let xl = 30;
    console.log("Inner x after declaration:", xl);
  }
  
  inner();
  console.log("Outer x:", x);
}

outer();
console.log("Global x:", x);

// Fixed by rearranging the inner function to avoid accessing 'x' before its declaration



// Problem 4: Block Scope vs Function Scope
console.log("\n\nProblem 4: Block Scope vs Function Scope");
function checkScope() {
  if (true) {
    var functionScoped = "I'm var";
    let blockScoped = "I'm let";
    console.log("Can access blockScoped:", blockScoped);
  }
  
  console.log("Can access functionScoped:", functionScoped);
}

checkScope();

// Fixed by moving the console.log for blockScoped inside the if block where it's defined


// Problem 5: Closure with Loop
console.log("\n\nProblem 5: Closure with Loop");
function createFunctions() {
  var result = [];
  
  for (let i = 0; i < 3; i++) {
    result.push(function() {
      return i;
    });
  }
  
  return result;
}

var functions = createFunctions();
console.log("Function 0 returns:", functions[0]());
console.log("Function 1 returns:", functions[1]());
console.log("Function 2 returns:", functions[2]());

// Fixed by changing 'var' to 'let' in the for loop to create a new binding for each iteration



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
//    Global Scope: a
//    First Function Scope: a, b
//    Second Function Scope: a, b, c
// 2. Explain how variable lookup works
//    - When a variable is accessed, JavaScript looks for it in the current scope first, then in the outer scopes.
// 3. What happens if we add debugger statements?
//    - The debugger will pause execution at that point, allowing inspection of the current scope and variables.


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
//    - Each call to createCounter creates a new lexical environment where 'count' is stored. The returned functions (increment and reset) form a closure over this environment, allowing them to access and modify 'count' even after createCounter has finished executing.
// 2. Why do counter1 and counter2 have separate counts?
//    - Because each counter is created by a separate call to createCounter, they each have their own 'count' variable in their own lexical environment.
// 3. What would happen if count was declared with var?
//    - If count was declared with var, it would be function-scoped, and both counters would share the same 'count' variable, leading to unexpected behavior.



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


// Concepts to explain:
// 1. How does this create encapsulation?
//    - The IIFE creates a private scope where privateVar and privateMethod are defined. They are not accessible from the outside, thus encapsulating them. Only the publicMethod is exposed, which can access the private members.
// 2. What's the purpose of the IIFE?
//    - The IIFE (Immediately Invoked Function Expression) is used to create a new scope. This helps in avoiding polluting the global namespace and allows for private variables and methods.
// 3. Real-world use cases
//    - The module pattern is commonly used in JavaScript to create libraries or modules that expose a public API while keeping internal details private. This is useful for maintaining clean code and preventing naming conflicts.