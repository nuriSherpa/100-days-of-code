// What is Strict Mode?
// Strict mode is a feature in JavaScript that enforces stricter parsing and error handling at runtime. It makes code more secure, helps catch common mistakes, and prevents the use of certain problematic features.


"use strict";

// Entire script runs in strict mode
let x = 3.14;
delete x; // TypeError in strict mode

function strictFunction() {
    "use strict";
    // Only this function runs in strict mode
    y = 3.14; // ReferenceError
}

function normalFunction() {
    // This function runs in normal mode
    y = 3.14; // Creates global variable (if not already declared)
}


// ES6 modules are automatically in strict mode
export function myFunction() {
    // Already in strict mode
}


"use strict";

x = 3.14; // ReferenceError: x is not defined
// Without strict mode: creates global variable x

function test() {
    y = 10; // ReferenceError
}


"use strict";

let implements; // Error in strict mode
let interface;
let package;
let private;
let protected;
let public;
let static;
let yield;