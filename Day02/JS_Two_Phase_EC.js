// Two-Phase Function Execution Context Example
// 1. MEMORY CREATION PHASE (Hoisting Phase)

// Before any code executes, JavaScript scans and sets up memory

// What you write:

// YOUR CODE:
console.log(myVar); // Line 1
var myVar = 10;     // Line 2
console.log(myFunction); // Line 3
function myFunction() { // Line 4
    return "Hello";
}

// WHAT JAVASCRIPT DOES FIRST (invisibly):
// 1. Scans for variable declarations with 'var'
//    - Finds: var myVar
//    - Action: Allocates memory, sets myVar = undefined

// 2. Scans for function declarations
//    - Finds: function myFunction() {...}
//    - Action: Allocates memory, stores ENTIRE function

// 3. Scans other code (console.log, etc.)
//    - Action: Notes they exist, but doesn't execute yet

// After Memory Creation Phase, memory looks like:
// Global Memory: {
//   myVar: undefined,
//   myFunction: function() { return "Hello"; }
// }

// Example of memory creation phase.
console.log("Start");
console.log(a);
var a = "Hello";
console.log(a);
sayHi();

function sayHi() {
    console.log("Hi!");
}

console.log("End");

// 2. CODE EXECUTION PHASE
// Now JavaScript executes the code line by line

// Code Execution phase example:
console.log(myVar); // Line 1
var myVar = 10;     // Line 2
console.log(myFunction); // Line 3
function myFunction() { // Line 4
    return "Hello";
}

// Execution Steps:
// Line 1: console.log(myVar);
//   - myVar is currently undefined
//   - Output: undefined

// Line 2: var myVar = 10;
//   - Updates myVar in memory to 10

// Line 3: console.log(myFunction);
//   - myFunction is a function, so it outputs the function definition
//   - Output: function myFunction() { return "Hello"; }

// Line 4: function myFunction() {...}
//   - Already stored in memory, no action needed

// If we were to call myFunction now:
// console.log(myFunction()); // This would output "Hello"

// Summary of Outputs:
// undefined
// 10
// function myFunction() { return "Hello"; }