// ==============================================
// DAY 8: this KEYWORD ADVANCED PRACTICE
// ==============================================

console.log("🚀 DAY 8 - this KEYWORD ADVANCED PRACTICE\n");

// ==============================================
// 5 FIX-THE-CODE PROBLEMS
// ==============================================

console.log("\n--- FIX-THE-CODE PROBLEMS ---\n");

// Problem 1: Event Handler Context Loss
console.log("📌 PROBLEM 1: EVENT HANDLER CONTEXT LOSS");
const buttonManager = {
    message: "Clicked: ",
    
    setupHandlers: function() {
        // This doesn't work as expected - FIX IT
        document.querySelectorAll('.btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                console.log(this.message + btn.textContent);
            });
        });
    }
};

// Problem 2: Nested Object Method
console.log("\n📌 PROBLEM 2: NESTED OBJECT METHOD");
const shoppingCart = {
    items: [
        { name: "Laptop", price: 1000, quantity: 1 },
        { name: "Mouse", price: 50, quantity: 2 }
    ],
    
    calculateTotal: function() {
        let total = 0;
        this.items.forEach(function(item) {
            // This doesn't calculate correctly - FIX IT
            total += item.price;
        });
        return total;
    },
    
    showItems: function() {
        this.items.forEach(function(item) {
            // This doesn't work - FIX IT
            console.log(`${item.quantity}x ${item.name} at $${this.currency}${item.price}`);
        });
    },
    
    currency: "$"
};

// Problem 3: Arrow Function in Object Literal
console.log("\n📌 PROBLEM 3: ARROW FUNCTION IN OBJECT LITERAL");
const user = {
    name: "John",
    age: 25,
    
    // These don't work as expected - FIX THEM
    greet: () => {
        return `Hello, I'm ${this.name}`;
    },
    
    birthday: () => {
        this.age++;
        return `Now I'm ${this.age}`;
    }
};

// Problem 4: Constructor with Callback
console.log("\n📌 PROBLEM 4: CONSTRUCTOR WITH CALLBACK");
function Timer(seconds) {
    this.seconds = seconds;
    this.isRunning = false;
    
    this.start = function() {
        this.isRunning = true;
        console.log(`Timer started for ${this.seconds} seconds`);
        
        setTimeout(function() {
            // This doesn't work - FIX IT
            this.isRunning = false;
            console.log(`Timer finished! Was running: ${this.isRunning}`);
        }, this.seconds * 1000);
    };
}

// Problem 5: Prototype Method Chain
console.log("\n📌 PROBLEM 5: PROTOTYPE METHOD CHAIN");
function Calculator() {
    this.value = 0;
}

Calculator.prototype.add = function(x) {
    this.value += x;
    return this;
};

Calculator.prototype.multiply = function(x) {
    this.value *= x;
    return this;
};

Calculator.prototype.logValue = function() {
    // This doesn't work in chain - FIX IT
    console.log(`Current value: ${value}`);
};

// ==============================================
// 5 WRITE-THE-OUTPUT PROBLEMS
// ==============================================

console.log("\n--- WRITE-THE-OUTPUT PROBLEMS ---\n");

// Problem 6: Nested Functions
console.log("📌 PROBLEM 6: NESTED FUNCTIONS");
const obj6 = {
    value: 42,
    
    outer: function() {
        console.log("Outer this.value:", this.value);
        
        function inner() {
            console.log("Inner this.value:", this.value);
        }
        
        const arrowInner = () => {
            console.log("ArrowInner this.value:", this.value);
        };
        
        inner();
        arrowInner();
    }
};
// What will be the output?
// obj6.outer();

// Problem 7: Method Extraction
console.log("\n📌 PROBLEM 7: METHOD EXTRACTION");
const obj7 = {
    name: "Alice",
    
    getName: function() {
        return this.name;
    },
    
    getNameArrow: () => {
        return this.name;
    }
};

const getName = obj7.getName;
const getNameArrow = obj7.getNameArrow;

// What will be the output?
// console.log(obj7.getName());
// console.log(getName());
// console.log(getNameArrow());

// Problem 8: setTimeout Context
console.log("\n📌 PROBLEM 8: setTimeout CONTEXT");
const obj8 = {
    counter: 0,
    
    increment: function() {
        setTimeout(function() {
            this.counter++;
            console.log("Regular function counter:", this.counter);
        }, 100);
        
        setTimeout(() => {
            this.counter++;
            console.log("Arrow function counter:", this.counter);
        }, 100);
    }
};
// What will be the output?
// obj8.increment();

// Problem 9: Class vs Object Literal
console.log("\n📌 PROBLEM 9: CLASS VS OBJECT LITERAL");
class PersonClass {
    constructor(name) {
        this.name = name;
    }
    
    greet() {
        return `Hello from ${this.name}`;
    }
}

const PersonObject = {
    name: "Default",
    
    greet: function() {
        return `Hello from ${this.name}`;
    },
    
    greetArrow: () => {
        return `Hello from ${this.name}`;
    }
};

const person1 = new PersonClass("Bob");
const person2 = { name: "Charlie", greet: PersonObject.greet };
const person3 = { name: "David", greet: PersonObject.greetArrow };

// What will be the output?
// console.log(person1.greet());
// console.log(person2.greet());
// console.log(person3.greet());

// Problem 10: Bind, Call, Apply
console.log("\n📌 PROBLEM 10: BIND, CALL, APPLY");
const obj10 = {
    x: 10,
    y: 20,
    
    sum: function(multiplier) {
        return (this.x + this.y) * multiplier;
    }
};

const otherObj = { x: 100, y: 200 };

// What will be the output?
// console.log(obj10.sum(2));
// console.log(obj10.sum.call(otherObj, 2));
// console.log(obj10.sum.apply(otherObj, [3]));
// const boundSum = obj10.sum.bind(otherObj);
// console.log(boundSum(4));

// ==============================================
// 2 INTERVIEW QUESTIONS TO FIX
// ==============================================

console.log("\n--- INTERVIEW QUESTIONS TO FIX ---\n");

// Interview Question 1: Debounce Function
console.log("🎯 INTERVIEW QUESTION 1: DEBOUNCE FUNCTION IMPLEMENTATION");
function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        // The 'this' context is lost - FIX IT
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            func(...args);
        }, delay);
    };
}

const userInput = {
    value: "",
    
    updateValue: function(newValue) {
        this.value = newValue;
        console.log(`Value updated to: ${this.value}`);
    },
    
    // This won't work correctly - FIX IT
    debouncedUpdate: debounce(this.updateValue, 300)
};

// Interview Question 2: Promise Chain Context
console.log("\n🎯 INTERVIEW QUESTION 2: PROMISE CHAIN CONTEXT");
const apiClient = {
    baseUrl: "https://api.example.com",
    token: "abc123",
    
    fetchData: function(endpoint) {
        console.log(`Fetching from: ${this.baseUrl}/${endpoint}`);
        
        // Simulating fetch promise
        return new Promise((resolve) => {
            setTimeout(function() {
                // This loses context - FIX IT
                console.log(`Using token: ${this.token}`);
                resolve({ data: "some data" });
            }, 1000);
        });
    },
    
    processData: function(data) {
        console.log(`Processing with token: ${this.token}`);
        return `Processed: ${data}`;
    }
};

// This won't work as expected - FIX IT
// apiClient.fetchData("users")
//     .then(function(response) {
//         return apiClient.processData(response.data);
//     })
//     .then(function(result) {
//         console.log(result);
//     });

// ==============================================
// SOLUTIONS (Scroll down to see)
// ==============================================

console.log("\n" + "=".repeat(50));
console.log("SOLUTIONS");
console.log("=".repeat(50) + "\n");

console.log("⚠️  Try to solve the problems first before looking at solutions!\n");

// Solutions for Fix-the-Code Problems
console.log("🔧 FIX-THE-CODE SOLUTIONS:\n");

console.log("1. Event Handler Fix:");
console.log(`   Change to arrow function or use bind:
   btn.addEventListener('click', () => {
       console.log(buttonManager.message + btn.textContent);
   });
   OR
   const self = this;
   btn.addEventListener('click', function() {
       console.log(self.message + btn.textContent);
   });\n`);

console.log("2. Shopping Cart Fix:");
console.log(`   a) calculateTotal: total += item.price * item.quantity;
   b) showItems: Use arrow function or bind 'this':
   this.items.forEach(item => {
       console.log(\`\${item.quantity}x \${item.name} at \${this.currency}\${item.price}\`);
   });\n`);

console.log("3. Arrow Function Fix:");
console.log(`   Change arrow functions to regular functions:
   greet: function() { return \`Hello, I'm \${this.name}\`; }
   birthday: function() { this.age++; return \`Now I'm \${this.age}\`; }\n`);

console.log("4. Timer Constructor Fix:");
console.log(`   Use arrow function or bind 'this':
   setTimeout(() => {
       this.isRunning = false;
       console.log(\`Timer finished! Was running: \${this.isRunning}\`);
   }, this.seconds * 1000);\n`);

console.log("5. Prototype Chain Fix:");
console.log(`   Add return this and fix logValue:
   Calculator.prototype.logValue = function() {
       console.log(\`Current value: \${this.value}\`);
       return this;
   };\n`);

console.log("📝 WRITE-THE-OUTPUT SOLUTIONS:\n");
console.log("6. Output: 42, undefined (or global value), 42");
console.log("7. Output: 'Alice', undefined, undefined (or global name)");
console.log("8. Output: NaN (or global counter), 1");
console.log("9. Output: 'Bob', 'Charlie', 'Hello from undefined'");
console.log("10. Output: 60, 600, 900, 1200\n");

console.log("💼 INTERVIEW QUESTION SOLUTIONS:\n");
console.log("1. Debounce Fix:");
console.log(`   Preserve 'this' context:
   function debounce(func, delay) {
       let timeoutId;
       return function(...args) {
           const context = this;
           clearTimeout(timeoutId);
           timeoutId = setTimeout(function() {
               func.apply(context, args);
           }, delay);
       };
   }\n`);

console.log("2. Promise Chain Fix:");
console.log(`   Use arrow functions in promise chain:
   apiClient.fetchData("users")
       .then(response => apiClient.processData(response.data))
       .then(result => console.log(result));
   
   And in fetchData:
   setTimeout(() => {
       console.log(\`Using token: \${this.token}\`);
       resolve({ data: "some data" });
   }, 1000);`);