// Example of function hoisting
console.log(hoistedFunction()); // Output: I am a hoisted function!

function hoistedFunction() {
    return "I am a hoisted function!";
}

// Explanation:
// In JavaScript, function declarations are hoisted to the top of their containing scope.
// This means that you can call a function before its declaration in the code.
// In this example, hoistedFunction is called before it is defined, but it works
// because the function declaration is hoisted during the creation phase of the
// execution context.