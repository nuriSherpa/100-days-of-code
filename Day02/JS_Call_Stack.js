// Call Stack  
// Call Stack Explanation:
// The call stack is a mechanism that keeps track of function calls in JavaScript.
// It follows a Last In, First Out (LIFO) order, meaning the last function called is the first to finish.
// When a function is called, it's added to the stack.
// When it returns, it's removed from the stack.
// This helps manage execution context and ensures functions complete before moving on.

// Example of Call Stack in action:
console.log("Start"); // 1. Added to stack

function firstFunction() { // 2. Added to stack
    console.log("Inside firstFunction"); // 3. Added to stack
    secondFunction(); // 4. Added to stack
    console.log("Exiting firstFunction"); // 7. Added to stack
} // 8. Removed from stack

function secondFunction() { // 5. Added to stack
    console.log("Inside secondFunction"); // 6. Added to stack
} // 9. Removed from stack

firstFunction(); // Calls firstFunction, starting the chain

console.log("End"); // 10. Added to stack

// Call Stack Execution Steps:
// 1. console.log("Start") - Executes and is removed from stack.
// 2. firstFunction() - Added to stack.
// 3. console.log("Inside firstFunction") - Executes and is removed from stack.
// 4. secondFunction() - Added to stack.
// 5. console.log("Inside secondFunction") - Executes and is removed from stack.
// 6. secondFunction() completes - Removed from stack.
// 7. console.log("Exiting firstFunction") - Executes and is removed from stack.
// 8. firstFunction() completes - Removed from stack.
// 9. console.log("End") - Executes and is removed from stack.

// Summary of Outputs:
// Start
// Inside firstFunction
// Inside secondFunction
// Exiting firstFunction
// End

// Call Stack with recursion function example:
function recursiveFunction(count) {
    if (count <= 0) {
        console.log("Base case reached");
        return;
    }
    console.log("Count:", count);
    recursiveFunction(count - 1); // Recursive call
}

recursiveFunction(3); // Start recursion with count 3

// Call Stack Execution Steps for recursion:
// 1. recursiveFunction(3) - Added to stack.
// 2. console.log("Count:", 3) - Executes and is removed from stack.
// 3. recursiveFunction(2) - Added to stack.
// 4. console.log("Count:", 2) - Executes and is removed from stack.
// 5. recursiveFunction(1) - Added to stack.
// 6. console.log("Count:", 1) - Executes and is removed from stack.
// 7. recursiveFunction(0) - Added to stack.
// 8. console.log("Base case reached") - Executes and is removed from stack.
// 9. recursiveFunction(0) completes - Removed from stack.
// 10. recursiveFunction(1) completes - Removed from stack.
// 11. recursiveFunction(2) completes - Removed from stack.
// 12. recursiveFunction(3) completes - Removed from stack.

// Summary of Outputs for recursion:
// Count: 3
// Count: 2
// Count: 1
// Base case reached

// This demonstrates how the call stack manages function calls, including recursive calls,
// ensuring each function completes before returning to the previous one.


