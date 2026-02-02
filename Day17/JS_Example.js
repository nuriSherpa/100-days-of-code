'use strict';
// Without strict mode - these work but cause problems

// Mistake 1: Forgot to declare variable
myName = 'John'; // Creates a GLOBAL variable accidentally!

// Mistake 2: Typos don't get caught
let totalPrice = 100;
totalPrie = 90; // Oops! Typo creates new variable

// Mistake 3: Can delete important things
delete totalPrice; // Weird, but allowed


// Real-Life Example - Calculator App
// ❌ BAD (Without Strict Mode)
// calculator.js - buggy version
function calculate() {
    result = num1 + num2; // Oops! Forgot 'let' or 'const'
    console.log(result);
}

calculate();
// Created global variable 'result' - could conflict with other code
// Created global variables 'num1', 'num2' - BAD!


// ✅ GOOD (With Strict Mode)
// calculator.js - fixed version
"use strict";

function calculate(num1, num2) {
    let result = num1 + num2; // Properly declared
    console.log(result);
    return result;
}

calculate(5, 10); // Works correctly
// calculate(5); // ❌ ERROR: num2 is undefined - Catches the bug!


