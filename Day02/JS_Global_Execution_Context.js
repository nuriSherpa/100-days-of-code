// Global Execution Context Example

// This code demonstrates the creation of the Global Execution Context (GEC)
// in JavaScript. The GEC is created when the JavaScript engine starts executing
// the code in the global scope.

console.log("Start of Global Execution Context");

// Variable declaration and initialization
var globalVar = "I am a global variable";

// Function declaration
function globalFunction() {
    console.log("I am a global function");
}

// Accessing the global variable and function
console.log(globalVar); // Output: I am a global variable
globalFunction();       // Output: I am a global function

console.log("End of Global Execution Context");