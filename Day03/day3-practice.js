// ==============================================
// DAY 3: HOISTING PRACTICE PROBLEMS - FIX ALL ISSUES!
// ==============================================

console.log("🚀 DAY 3 - HOISTING PRACTICE\n");

// ==============================================
// PROBLEM SET 1: VARIABLE HOISTING
// ==============================================

console.log("=== PROBLEM SET 1: VARIABLE HOISTING ===\n");

// -----------------------------------------------------------------
// PROBLEM 1: Fix the Hoisting Issue
// This code has hoisting issues. Fix it to log the correct values.
// Expected output: undefined, "A+", 20
// -----------------------------------------------------------------

console.log("PROBLEM 1:");
console.log("----------");

// ORIGINAL BUGGY CODE:
console.log("Original (buggy) code:");
try {
    console.log(score);
    console.log(grade);
    var score = 20;
    let grade = "A+";
    console.log(score);
} catch (e) {
    console.log("Error:", e.message);
}

// ==============================================
// PROBLEM SET 2: FUNCTION HOISTING
// ==============================================

console.log("\n\n=== PROBLEM SET 2: FUNCTION HOISTING ===\n");

// -----------------------------------------------------------------
// PROBLEM 2: Function Declaration vs Expression
// Why does the first call work but the second fails?
// Fix the code to make both work correctly.
// -----------------------------------------------------------------

console.log("PROBLEM 2:");
console.log("----------");

// ORIGINAL BUGGY CODE:
console.log("Original (buggy) code:");
try {
    console.log("Result 1:", add(5, 3)); // Should work
    
    console.log("Result 2:", multiply(5, 3)); // Fails
    
    function add(a, b) {
        return a + b;
    }
    
    var multiply = function(a, b) {
        return a * b;
    };
} catch (e) {
    console.log("Error:", e.message);
}


// ==============================================
// PROBLEM SET 3: TEMPORAL DEAD ZONE
// ==============================================

console.log("\n\n=== PROBLEM SET 3: TEMPORAL DEAD ZONE ===\n");

// -----------------------------------------------------------------
// PROBLEM 3: TDZ Challenge
// Identify and fix all TDZ issues in this code.
// Expected output: 100, 200, 300
// -----------------------------------------------------------------

console.log("PROBLEM 3:");
console.log("----------");

// ORIGINAL BUGGY CODE:
console.log("Original (buggy) code:");
try {
    function calculate() {
        console.log(a); // TDZ issue
        console.log(b); // TDZ issue
        console.log(c); // TDZ issue
        
        let a = 100;
        const b = 200;
        var c = 300;
        
        console.log(a);
        console.log(b);
        console.log(c);
    }
    calculate();
} catch (e) {
    console.log("Error:", e.message);
}


// ==============================================
// PROBLEM SET 4: SCOPE & HOISTING INTERACTION
// ==============================================

console.log("\n\n=== PROBLEM SET 4: SCOPE & HOISTING ===\n");

// -----------------------------------------------------------------
// PROBLEM 4: Nested Scope Hoisting
// Predict and fix the output. Make innerVar accessible in inner function.
// Expected output: "outer", "inner", "inner"
// -----------------------------------------------------------------

console.log("PROBLEM 4:");
console.log("----------");

// ORIGINAL BUGGY CODE:
console.log("Original (buggy) code:");
try {
    var outerVar = "outer";
    
    function outer() {
        console.log(outerVar);
        console.log(innerVar); // This fails
        
        function inner() {
            console.log(innerVar);
        }
        
        var innerVar = "inner";
        inner();
    }
    
    outer();
} catch (e) {
    console.log("Error:", e.message);
}


// ==============================================
// PROBLEM SET 5: ADVANCED HOISTING CHALLENGE
// ==============================================

console.log("\n\n=== PROBLEM SET 5: ADVANCED CHALLENGE ===\n");

// -----------------------------------------------------------------
// PROBLEM 5: Complex Hoisting Scenario
// This code has multiple hoisting issues. Fix them all.
// Expected output: 
// - "Function first"
// - "I'm the variable"
// - "Function wins!"
// -----------------------------------------------------------------

console.log("PROBLEM 5:");
console.log("----------");

// ORIGINAL BUGGY CODE:
console.log("Original (buggy) code:");
try {
    console.log(typeof confusing);
    
    var confusing = "I'm the variable";
    
    function confusing() {
        return "Function first";
    }
    
    function confusing() {
        return "Function wins!";
    }
    
    console.log(confusing);
    console.log(confusing());
} catch (e) {
    console.log("Error:", e.message);
}


// ==============================================
// PROBLEM SET 6: INTERVIEW QUESTION - PREDICT OUTPUT
// ==============================================

console.log("\n\n=== PROBLEM SET 6: PREDICT OUTPUT ===\n");

// -----------------------------------------------------------------
// PROBLEM 6: Interview Question
// Predict what this code will output and explain why.
// Then fix any issues to make it work as intended.
// -----------------------------------------------------------------

console.log("PROBLEM 6:");
console.log("----------");

// CODE TO ANALYZE:
console.log("Code to analyze:");
console.log(`
    (function() {
        console.log("1:", typeof display);
        console.log("2:", typeof show);
        
        if (true) {
            function display() {
                return "First display";
            }
        } else {
            function display() {
                return "Second display";
            }
        }
        
        var show = function() {
            return "Function expression";
        };
        
        console.log("3:", typeof display);
        console.log("4:", display());
        console.log("5:", show());
    })();
`);

console.log("\nActual output:");
// ACTUAL EXECUTION:
(function() {
    console.log("1:", typeof display);
    console.log("2:", typeof show);
    
    if (true) {
        function display() {
            return "First display";
        }
    } else {
        function display() {
            return "Second display";
        }
    }
    
    var show = function() {
        return "Function expression";
    };
    
    console.log("3:", typeof display);
    console.log("4:", display());
    console.log("5:", show());
})();

console.log("\nFixed version (more predictable):");
// FIXED VERSION:
(function() {
    var display; // Declare variable first
    var show; // Declare variable first
    
    console.log("1:", typeof display); // undefined
    
    // Use function expression instead of conditional declaration
    if (true) {
        display = function() {
            return "First display";
        };
    } else {
        display = function() {
            return "Second display";
        };
    }
    
    show = function() {
        return "Function expression";
    };
    
    console.log("2:", typeof show); // undefined (before assignment in original)
    console.log("3:", typeof display); // function
    console.log("4:", display()); // "First display"
    console.log("5:", show()); // "Function expression"
})();

// ==============================================
// BONUS: REAL-WORLD SCENARIO
// ==============================================

console.log("\n\n=== BONUS: REAL-WORLD SCENARIO ===\n");

// -----------------------------------------------------------------
// BONUS: Module Pattern with Hoisting
// Convert this module to use proper hoisting patterns.
// Make privateHelper hoisted and fix execution order.
// -----------------------------------------------------------------

console.log("BONUS PROBLEM:");
console.log("---------------");

// ORIGINAL - POTENTIAL ISSUES:
console.log("Original (potential timing issues):");
const DataProcessor = (function() {
    // Private data
    const config = {
        maxItems: 100,
        timeout: 5000
    };
    
    // Public methods
    return {
        process: function(items) {
            if (!validate(items)) {
                throw new Error("Invalid items");
            }
            
            return items.map(item => transform(item));
        },
        
        getConfig: function() {
            return { ...config };
        }
    };
    
    // Private functions - declared after use (hoisting saves us)
    function validate(data) {
        return Array.isArray(data) && data.length <= config.maxItems;
    }
    
    function transform(item) {
        return { ...item, processed: true, timestamp: Date.now() };
    }
})();

try {
    const result = DataProcessor.process([{ id: 1 }, { id: 2 }]);
    console.log("Processed:", result);
    console.log("Config:", DataProcessor.getConfig());
} catch (e) {
    console.log("Error:", e.message);
}


// ==============================================
// SOLUTIONS SUMMARY
// ==============================================

console.log("\n\n=== KEY TAKEAWAYS ===");
console.log("1. var: Hoisted and initialized with undefined");
console.log("2. let/const: Hoisted but not initialized (TDZ)");
console.log("3. Function declarations: Fully hoisted");
console.log("4. Function expressions: Variable hoisted, function not");
console.log("5. Always declare variables at top of scope");
console.log("6. Use const/let instead of var");
console.log("7. Avoid conditional function declarations");

console.log("\n✅ PRACTICE COMPLETE!");