// Function Execution Context Example
// This code demonstrates the creation of a Function Execution Context (FEC)
// in JavaScript. The FEC is created whenever a function is invoked.

console.log("Start of Function Execution Context");

function myFunction() {
    // Variable declaration and initialization within the function
    var localVar = "I am a local variable";

    // Function declaration within the function
    function localFunction() {
        console.log("I am a local function");
    }

    // Accessing the local variable and function
    console.log(localVar); // Output: I am a local variable
    localFunction();       // Output: I am a local function
}

// Invoking the function to create its execution context
// Each invocation creates a new Function Execution Context
myFunction();
myFunction();
myFunction();


console.log("End of Function Execution Context");


// Note: The localVar and localFunction are not accessible outside myFunction
// console.log(localVar); // This would throw a ReferenceError
// localFunction();       // This would also throw a ReferenceError