// Example of function expression hoisting
console.log("Function Expression Hoisting Example:");
try {
    console.log(greetUser("Alice")); // This will throw TypeError
} catch (e) {
    console.log("Error calling greetUser before declaration:", e.message);
}

var greetUser = function(name) {
    return `Hello, ${name}!`;
};

console.log(greetUser("Bob")); // Output: Hello, Bob!

// Explanation:
// In JavaScript, function expressions are not hoisted in the same way as function declarations.
// When you try to call a function expression before its definition, it results in a TypeError
// because the variable (greetUser) is hoisted but not initialized yet. It remains undefined
// until the assignment is executed. Thus, you cannot invoke it before the line where it is defined.