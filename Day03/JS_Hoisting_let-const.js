// Hoisting with let and const
// Example of variable hoisting with 'let' and 'const'
console.log("Hoisting with let and const:");

try {
    console.log(hoistedLet); // This will throw ReferenceError
} catch (e) {
    console.log("Error accessing hoistedLet:", e.message);
}

let hoistedLet = "I am not hoisted!";

try {
    console.log(hoistedConst); // This will throw ReferenceError
} catch (e) {
    console.log("Error accessing hoistedConst:", e.message);
}

const hoistedConst = "I am not hoisted!";

console.log(hoistedLet);   // Output: I am not hoisted!
console.log(hoistedConst); // Output: I am not hoisted!

// Explanation:
// Variables declared with 'let' and 'const' are not hoisted in the same way as 'var'.
// Accessing them before their declaration results in a ReferenceError due to the
// Temporal Dead Zone (TDZ). They are only accessible after their declaration line.