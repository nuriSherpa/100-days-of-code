// ==============================================
// PROBLEM SET 1: VARIABLE HOISTING
// ==============================================

console.log("=== PROBLEM SET 1: VARIABLE HOISTING ===\n");

// -----------------------------------------------------------------
// PROBLEM 1: Fix the Hoisting Issue
// This code has hoisting issues. Fix it to log the correct values.
// Expected output: undefined, "A+", 20
// -----------------------------------------------------------------

// Fixed Code:
console.log("Fixed code 1:");
try {
    console.log(score);
    var score = 20;
    let grade = "A+";
    console.log(grade);
    console.log(score);
} catch (e) {
    console.log("Error:", e.message);
}


console.log("\n\n=== PROBLEM SET 2: FUNCTION HOISTING ===\n");

// -----------------------------------------------------------------
// PROBLEM 2: Function Declaration vs Expression
// Why does the first call work but the second fails?
// Fix the code to make both work correctly.
// -----------------------------------------------------------------


// Fixed Code:
console.log("Fixed code 2:");
try {
    console.log("Result 1:", add(5, 3)); 
    
    function add(a, b) {
        return a + b;
    }
    
    var multiply = function(a, b) {
        return a * b;
    };
    console.log("Result 2:", multiply(5, 3)); 
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

// Fixed Code:
console.log("Fixed code 3:");
try {
    function calculate() {
        
        let a;
        const b = 200;
        var c;

        a=100;
        c=300;
        console.log(a);
        console.log(b);
        console.log(c);
    }
    calculate();
} catch (e) {
    console.log("Error:", e.message);
}


console.log("\n\n=== PROBLEM SET 4: SCOPE & HOISTING ===\n");

// -----------------------------------------------------------------
// PROBLEM 4: Nested Scope Hoisting
// Predict and fix the output. Make innerVar accessible in inner function.
// Expected output: "outer", "inner", "inner"
// -----------------------------------------------------------------


// Fixed Code:
console.log("Fixed code 4:");
try {
    var outerVar = "outer";
    
    function outer() {
         var innerVar = "inner";
        console.log(outerVar);
        console.log(innerVar);
        function inner() {
            console.log(innerVar);
        }
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

// Fixed Code:
console.log("Fixed code 5:");

try {
    function confusing1() {
        return "Function first";
    }
    
    var confusing = "I'm the variable";
    

    
    function confusing2() {
        return "Function wins!";
    }
    
    console.log(confusing1());
    console.log(confusing);
    console.log(confusing2());
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

// FIXED CODE:
console.log("Fixed code 6:");
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

console.log("Expected output:");
console.log("1: undefined");
console.log("2: undefined");
console.log("3: function");
console.log("4: First display");
console.log("5: Function expression");

// Explanation:
console.log(`
    Initially, 'display' is hoisted as a function declaration, so 'typeof display' returns 'function'.
    'show' is declared with 'var', so it is hoisted but not initialized, resulting in 'undefined'.
    After the if-else block, 'display' remains a function declaration (the first one), so it is still a function.
    Calling 'display()' invokes the first function, returning "First display".
    'show' is then assigned a function expression, so calling 'show()' returns "Function expression".
`);


// ==============================================
// BONUS: REAL-WORLD SCENARIO
// ==============================================

console.log("\n\n=== BONUS: REAL-WORLD SCENARIO ===\n");

// -----------------------------------------------------------------
// BONUS: Module Pattern with Hoisting
// Convert this module to use proper hoisting patterns.
// Make privateHelper hoisted and fix execution order.
// -----------------------------------------------------------------


// ORIGINAL - POTENTIAL ISSUES:
console.log("Original (potential timing issues):");
const DataProcessor = (function() {
    // Private data
    const config = {
        maxItems: 100,
        timeout: 5000
    };

    // Private functions - declared after use (hoisting saves us)
    function validate(data) {
        return Array.isArray(data) && data.length <= config.maxItems;
    }
    
    function transform(item) {
        return { ...item, processed: true, timestamp: Date.now() };
    }
    
    // Public methods
    function process(items) {
        if (!validate(items)) {
            throw new Error("Invalid items");
        }
        
        return items.map(item => transform(item));
    }
    
    function getConfig() {
        return { ...config };
    }
    return {
        process,
        getConfig
    };
    
})();

try {
    const result = DataProcessor.process([{ id: 1 }, { id: 2 }]);
    console.log("Processed:", result);
    console.log("Config:", DataProcessor.getConfig());
} catch (e) {
    console.log("Error:", e.message);
}