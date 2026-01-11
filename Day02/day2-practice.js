// ==============================================
// DAY 2 PRACTICE PROBLEMS - FIX ALL ISSUES!
// ==============================================

console.log("🚀 DAY 2 - EXECUTION CONTEXT & CALL STACK PRACTICE\n");

// ==============================================
// PROBLEM SET 1: HOISTING & EXECUTION CONTEXT
// ==============================================

console.log("=== PROBLEM SET 1: HOISTING ===\n");

// -----------------------------------------------------------------
// PROBLEM 1: Fix the Hoisting Issue
// This code has hoisting issues. Fix it to log the correct values.
// Expected output: undefined, "A+", 20
// -----------------------------------------------------------------
console.log("Problem 1 - Fix Hoisting:");
function problem1() {
    // TODO: Fix the hoisting issue
    console.log(studentName);  // Should log: undefined
    console.log(getGrade());   // Should log: "A+"
    
    var studentName = "John Doe";
    
    function getGrade() {
        return "A+";
    }
    
    let studentAge = 20;
    console.log(studentAge);   // Should log: 20
}
problem1();


// -----------------------------------------------------------------
// PROBLEM 2: Temporal Dead Zone Error
// Fix the TDZ error. Expected output: 100, 5, 500
// -----------------------------------------------------------------
console.log("\nProblem 2 - Fix TDZ:");
function problem2() {
    function calculateTotal() {
        // TODO: Fix the TDZ error
        console.log("Price:", price);      // Should log: 100
        console.log("Quantity:", quantity); // Should log: 5
        
        let price = 100;
        const quantity = 5;
        
        return price * quantity;
    }
    
    console.log("Total:", calculateTotal()); // Should log: 500
}
// problem2(); // Uncomment after fixing

// -----------------------------------------------------------------
// PROBLEM 3: Function Expression Hoisting
// This won't work as expected. Fix it.
// Expected: "Hello, Alice!" then "Hello, Bob!"
// -----------------------------------------------------------------
console.log("\nProblem 3 - Function Expression:");
function problem3() {
    // TODO: Fix the function expression hoisting issue
    console.log(greetUser("Alice"));  // Should log: "Hello, Alice!"
    
    var greetUser = function(name) {
        return `Hello, ${name}!`;
    };
    
    console.log(greetUser("Bob"));    // Should log: "Hello, Bob!"
}
// problem3(); // Uncomment after fixing

// ==============================================
// PROBLEM SET 2: CALL STACK CHALLENGES
// ==============================================

console.log("\n\n=== PROBLEM SET 2: CALL STACK ===\n");

// -----------------------------------------------------------------
// PROBLEM 4: Stack Overflow Error
// This causes infinite recursion. Add a base case to fix it.
// Expected: 5, 4, 3, 2, 1, "Blast off!"
// -----------------------------------------------------------------
console.log("Problem 4 - Fix Stack Overflow:");
function problem4() {
    function countdown(n) {
        // TODO: Add base case to prevent infinite recursion
        console.log(n);
        countdown(n - 1); // ⚠️ Currently infinite recursion!
    }
    
    console.log("Countdown starting:");
    // countdown(5); // Uncomment after fixing
}
problem4();

// -----------------------------------------------------------------
// PROBLEM 5: Wrong Execution Order
// Rearrange function calls to get correct coffee-making order
// Correct order: 1. Boil water, 2. Add coffee, 3. Add sugar, 4. Brew, 5. Ready
// -----------------------------------------------------------------
console.log("\nProblem 5 - Fix Execution Order:");
function problem5() {
    function makeCoffee() {
        // TODO: Rearrange these lines
        console.log("3. Adding sugar");
        boilWater();
        console.log("5. Coffee ready!");
    }
    
    function boilWater() {
        // TODO: Rearrange these lines
        console.log("2. Water boiling...");
        addCoffee();
        console.log("4. Coffee brewing");
    }
    
    function addCoffee() {
        console.log("1. Adding coffee powder");
    }
    
    console.log("Making coffee:");
    makeCoffee();
}
problem5();

// -----------------------------------------------------------------
// PROBLEM 6: Call Stack Visualization
// This function has nested calls. Draw the call stack at its deepest point.
// What functions will be in the stack when deepest() is executing?
// -----------------------------------------------------------------
console.log("\nProblem 6 - Visualize Call Stack:");
function problem6() {
    function first() {
        console.log("first() called");
        second();
        console.log("first() returning");
    }
    
    function second() {
        console.log("second() called");
        third();
        console.log("second() returning");
    }
    
    function third() {
        console.log("third() called");
        deepest();
        console.log("third() returning");
    }
    
    function deepest() {
        console.log("deepest() - I'm at the bottom of the stack!");
        // TODO: What functions are in the call stack here?
        // Draw it: [?, ?, ?, ?, Global]
    }
    
    console.log("Starting nested calls:");
    first();
    
    // Question: What's the maximum height of the call stack?
    // Answer: _____ functions + Global
}
problem6();

// ==============================================
// PROBLEM SET 3: EXECUTION CONTEXT PRACTICE
// ==============================================

console.log("\n\n=== PROBLEM SET 3: EXECUTION CONTEXT ===\n");

// -----------------------------------------------------------------
// PROBLEM 7: Predict the Output
// What will this log? Fix if wrong.
// -----------------------------------------------------------------
console.log("Problem 7 - Predict Output:");
function problem7() {
    var x = 1;
    
    function outer() {
        console.log(x);  // What logs here? ______
        var x = 2;
        
        function inner() {
            console.log(x);  // What logs here? ______
        }
        
        inner();
    }
    
    outer();
    console.log(x);  // What logs here? ______
}
problem7();

// -----------------------------------------------------------------
// PROBLEM 8: Fix the Scope Issue
// The counter isn't working. Make it remember its count.
// -----------------------------------------------------------------
console.log("\nProblem 8 - Fix Counter:");
function problem8() {
    function createCounter() {
        // TODO: Fix this - counter should remember its count
        let count = 0;
        
        return function() {
            count++;
            return count;
        };
    }
    
    const counter = createCounter();
    console.log(counter()); // Should log: 1
    console.log(counter()); // Should log: 2
    console.log(counter()); // Should log: 3
}
problem8();

// -----------------------------------------------------------------
// PROBLEM 9: this Keyword Issue
// Fix the this context issue
// -----------------------------------------------------------------
console.log("\nProblem 9 - Fix 'this' Context:");
function problem9() {
    const user = {
        name: "Alice",
        greet: function() {
            // TODO: Fix this to use arrow function or bind
            setTimeout(function() {
                console.log(`Hello, ${this.name}!`); // Should log: "Hello, Alice!"
            }, 100);
        }
    };
    
    user.greet();
}
problem9();

// ==============================================
// BONUS CHALLENGES
// ==============================================

console.log("\n\n=== BONUS CHALLENGES ===\n");

// -----------------------------------------------------------------
// BONUS 1: Memory Leak Pattern
// Can you spot the potential memory issue?
// -----------------------------------------------------------------
console.log("Bonus 1 - Memory Issue:");
function bonus1() {
    function createHeavyObject() {
        const largeArray = new Array(1000000).fill("data");
        return {
            data: largeArray,
            cleanUp: function() {
                // This should help but doesn't work as expected
                largeArray.length = 0;
            }
        };
    }
    
    const objects = [];
    for (let i = 0; i < 10; i++) {
        objects.push(createHeavyObject());
    }
    
    // TODO: How would you properly clean up memory?
    console.log("10 heavy objects created");
}
bonus1();

// -----------------------------------------------------------------
// BONUS 2: Debug Call Stack Error
// This error message is confusing. Fix the code.
// -----------------------------------------------------------------
console.log("\nBonus 2 - Debug Error:");
function bonus2() {
    function processData(data) {
        if (!data) {
            throw new Error("No data provided");
        }
        return data.toUpperCase();
    }
    
    function validateInput(input) {
        // TODO: Fix the error handling
        try {
            return processData(input);
        } catch (error) {
            console.log("Error in validation:", error.message);
        }
    }
    
    function getUserInput() {
        const input = null; // Simulating empty input
        return validateInput(input);
    }
    
    console.log("Result:", getUserInput()); // Should show error message
}
bonus2();
