// File: Day02/day2-practice_ans.js
// Expected: undefined, "A+", 20
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

// Expected: 100, 5, 500
console.log("\nProblem 2 - Fix TDZ:");
function problem2() {
    function calculateTotal() {
        let price = 100;
        const quantity = 5;

        console.log("Price:", price);      // Should log: 100
        console.log("Quantity:", quantity); // Should log: 5
        
        return price * quantity;
    }
    
    console.log("Total:", calculateTotal()); // Should log: 500
}
problem2(); // Uncomment after fixing

// Expected: "Hello, Alice!" and "Hello, Bob!"
console.log("\nProblem 3 - Function Expression:");
function problem3() {
    var greetUser = function(name) {
        return `Hello, ${name}!`;
    };
    console.log(greetUser("Alice"));  // Should log: "Hello, Alice!"
    console.log(greetUser("Bob"));    // Should log: "Hello, Bob!"
}
problem3(); // Uncomment after fixing

// Expected: 5, 4, 3, 2, 1, "Blast off!"
console.log("Problem 4 - Fix Stack Overflow:");
function problem4() {
    function countdown(n) {
        // TODO: Add base case to prevent infinite recursion
        if(n<=0){console.log("Blast off!"); return;}
        console.log(n);
        countdown(n - 1); // ⚠️ Currently infinite recursion!
    }
    
    console.log("Countdown starting:");
    countdown(5); 
}
problem4();

// Expected Execution Order: 1. Boil water, 2. Add coffee, 3. Add sugar, 4. Brew, 5. Ready
console.log("\nProblem 5 - Fix Execution Order:");
function problem5() {
    function makeCoffee() {
        // TODO: Rearrange these lines
        boilWater();
        console.log("4. Coffee brewing");
        console.log("5. Coffee ready!");
    }
    
    function boilWater() {
        // TODO: Rearrange these lines
        console.log("1. Water boiling...");
        addCoffee();
        console.log("3. Adding sugar");
       
    }
    
    function addCoffee() {
        console.log("2. Adding coffee powder");
    }
    
    console.log("Making coffee:");
    makeCoffee();
}
problem5();


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
        // Draw it: [Global -> first() -> second() -> third() -> deepest()]
    }
    
    console.log("Starting nested calls:");
    first();
    
    // Question: What's the maximum height of the call stack?
    // Answer: 6
}
problem6();


console.log("Problem 7 - Predict Output:");
function problem7() {
    var x = 1;
    
    function outer() {
        console.log(x);  // What logs here? Answer: undefined
        var x = 2;
        
        function inner() {
            console.log(x);  // What logs here? Answer: 2
        }
        
        inner();
    }
    
    outer();
    console.log(x);  // What logs here? Answer: 1
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
            setTimeout(()=> {
                console.log(`Hello, ${this.name}!`); // Should log: "Hello, Alice!"
            }, 100);
        }
    };
    user.greet();
}
problem9();


console.log("Bonus 1 - Memory Issue:");
// -----------------------------------------------------------------
function bonus1() {
    function createHeavyObject() {
        return {
            data: new Array(1_000_000).fill("data"),
            cleanUp() {
                this.data = null;
            }
        };
    }

    const objects = [];

    logMemory("Before creation");

    for (let i = 0; i < 10; i++) {
        objects.push(createHeavyObject());
    }

    logMemory("After creation");

    // Cleanup
    objects.forEach(obj => obj.cleanUp());
    objects.length = 0;

    // Force GC
    if (global.gc) {
        global.gc();
    }

    logMemory("After cleanup");
}

function logMemory(label) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`${label}: ${used.toFixed(2)} MB`);
}

bonus1();



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
              return "Error in validation: " + error.message;
        }
    }
    
    function getUserInput() {
        const input = null; // Simulating empty input
        return validateInput(input);
    }
    
    console.log("Result:", getUserInput()); // Should show error message
}
bonus2();
