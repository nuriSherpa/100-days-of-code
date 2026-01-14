# **Day 5: Closures Practice Problems**

```javascript
// ==============================================
// DAY 5: CLOSURES PRACTICE PROBLEMS
// ==============================================

console.log("🚀 DAY 5 - CLOSURES PRACTICE PROBLEMS\n");

// ==============================================
// MEDIUM PRACTICE PROBLEMS - PREDICT OUTPUT
// ==============================================

console.log("\n--- MEDIUM PRACTICE PROBLEMS ---\n");

// Problem 1: Basic Closure Counter
console.log("Problem 1: Basic Closure Counter");
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log("counter1():", counter1());
console.log("counter1():", counter1());
console.log("counter2():", counter2());
console.log("counter1():", counter1());

// Questions:
// 1. What will be the output of this code?
// 2. Why do counter1 and counter2 maintain separate counts?
// 3. Can you access the 'count' variable directly from outside? Why?

// Problem 2: Fix the Loop Closure Issue
console.log("\n\nProblem 2: Fix the Loop Closure Issue");

function createLoggers() {
  const loggers = [];
  
  for (var i = 1; i <= 3; i++) {
    loggers.push(function() {
      console.log("Logger " + i);
    });
  }
  
  return loggers;
}

const loggerArray = createLoggers();

// Q1: What will happen when we run these?
loggerArray[0]();
loggerArray[1]();
loggerArray[2]();

// Q2: Fix this code so each logger logs its correct number (1, 2, 3)
// Try fixing with:
// 1. Using 'let' instead of 'var'
// 2. Using IIFE
// 3. Using .bind()

// Problem 3: Predict the Output
console.log("\n\nProblem 3: Predict the Output");
function mysteryFunction() {
  let value = "initial";
  
  return {
    getValue: function() {
      return value;
    },
    setValue: function(newValue) {
      value = newValue;
    },
    logValue: function() {
      console.log(value);
    }
  };
}

const obj1 = mysteryFunction();
const obj2 = mysteryFunction();

obj1.setValue("changed");
obj2.setValue("different");

// Q: What will these log? Predict before running.
obj1.logValue();
obj2.logValue();
console.log(obj1.getValue());
console.log(obj2.getValue());

// Problem 4: Fix the Timer Issue
console.log("\n\nProblem 4: Fix the Timer Issue");

function createTimers() {
  for (var i = 1; i <= 3; i++) {
    setTimeout(function() {
      console.log("Timer " + i + " completed");
    }, i * 100);
  }
}

createTimers();

// Q1: What's wrong with this output?
// Q2: Fix it to show Timer 1, Timer 2, Timer 3 correctly

// Problem 5: Data Privacy Pattern
console.log("\n\nProblem 5: Data Privacy Pattern");

function createBankAccount(initialBalance) {
  // Your implementation here
  
  // Requirements:
  // 1. Balance should be private (not accessible directly)
  // 2. Provide methods: deposit(amount), withdraw(amount), getBalance()
  // 3. Return an object with these methods
  
  // Write your solution:
  
}

// Test your implementation:
// const account = createBankAccount(1000);
// account.deposit(500);  // Should work
// account.withdraw(200); // Should work
// console.log(account.balance); // Should be undefined (private)
// console.log(account.getBalance()); // Should show current balance

// Problem 6: Multiple Closures Chain
console.log("\n\nProblem 6: Multiple Closures Chain");
function multiplier(x) {
  return function(y) {
    return function(z) {
      return x * y * z;
    };
  };
}

// Q1: What does multiplier(2)(3)(4) return?
// Q2: Create a partial application: const double = multiplier(2);
//     What does double(5)(3) return?
// Q3: How many closure environments are created in total?

// ==============================================
// INTERVIEW-STYLE PROBLEMS
// ==============================================

console.log("\n\n--- INTERVIEW-STYLE PROBLEMS ---\n");

// Interview Problem 1: The Module Pattern
console.log("Interview Problem 1: The Module Pattern");

// Fix this broken module implementation:
const userModule = (function() {
  let users = [];
  let userId = 0;
  
  return {
    addUser: function(name) {
      users.push({ id: ++userId, name: name });
    },
    getUsers: function() {
      return users;
    },
    findUser: function(id) {
      return users.find(user => user.id === id);
    }
  };
})();

userModule.addUser("Alice");
userModule.addUser("Bob");

// Q1: What's the problem with this module?
// Q2: How can users be accessed/modified from outside?
// Q3: Fix the privacy issue

// Interview Problem 2: Function Memoization
console.log("\n\nInterview Problem 2: Function Memoization");

// Write a memoize function that:
// 1. Caches results of expensive function calls
// 2. Returns cached result if same arguments are provided
// 3. Works for any function

function expensiveCalculation(n) {
  console.log("Calculating for", n);
  return n * n;
}

// Your memoize function:
function memoize(fn) {
  // Implement here
  
}

// const memoizedCalc = memoize(expensiveCalculation);
// console.log(memoizedCalc(5)); // Should log "Calculating for 5"
// console.log(memoizedCalc(5)); // Should NOT log, should return cached

// Interview Problem 3: Debounce Function
console.log("\n\nInterview Problem 3: Debounce Function");

// Implement a debounce function that:
// 1. Delays function execution until after wait time
// 2. Cancels previous calls if called again within wait time
// 3. Useful for search inputs, window resize, etc.

function debounce(func, wait) {
  // Your implementation here
  
}

// Usage example:
// const debouncedSearch = debounce(searchAPI, 300);
// input.addEventListener('input', debouncedSearch);

// ==============================================
// REAL-WORLD SCENARIOS
// ==============================================

console.log("\n\n--- REAL-WORLD SCENARIOS ---\n");

// Real-world Scenario 1: Shopping Cart
console.log("Real-world Scenario 1: Shopping Cart");

// Create a shopping cart with the following issues to fix:

const shoppingCart = (function() {
  let items = [];
  let total = 0;
  
  function calculateTotal() {
    total = items.reduce((sum, item) => sum + item.price, 0);
  }
  
  return {
    addItem: function(name, price) {
      items.push({ name, price });
      calculateTotal();
    },
    removeItem: function(index) {
      items.splice(index, 1);
      calculateTotal();
    },
    getItems: function() {
      return items;
    },
    getTotal: function() {
      return total;
    },
    applyDiscount: function(percentage) {
      // Problem: This modifies total directly
      total = total * (1 - percentage/100);
    }
  };
})();

// Q1: What are the issues with this implementation?
// Q2: How can items be tampered with from outside?
// Q3: Fix the privacy and data integrity issues

// Real-world Scenario 2: Configuration Manager
console.log("\n\nReal-world Scenario 2: Configuration Manager");

// Create a configuration manager that:
// 1. Stores configuration privately
// 2. Allows getting and setting values
// 3. Validates values before setting
// 4. Notifies listeners when config changes

function createConfigManager(defaultConfig) {
  // Your implementation here
  
  return {
    get: function(key) {},
    set: function(key, value) {},
    subscribe: function(callback) {},
    getAll: function() {}
  };
}

// Usage:
// const config = createConfigManager({ theme: 'light', language: 'en' });
// config.set('theme', 'dark'); // Should validate
// config.subscribe((key, value) => console.log(`${key} changed to ${value}`));

// ==============================================
// DEBUGGING & ANALYSIS
// ==============================================

console.log("\n\n--- DEBUGGING & ANALYSIS ---\n");

// Debug Problem 1: Memory Leak Potential
console.log("Debug Problem 1: Memory Leak Potential");

function createHeavyObject(id) {
  const largeArray = new Array(1000000).fill("data");
  
  return {
    id: id,
    process: function() {
      // Closure over largeArray
      console.log("Processing", largeArray.length, "items");
      return largeArray[0];
    },
    cleanUp: function() {
      // Can we clear largeArray here?
    }
  };
}

const objects = [];
for (let i = 0; i < 10; i++) {
  objects.push(createHeavyObject(i));
}

// Q1: What's the memory concern here?
// Q2: How can we prevent the closure from keeping largeArray in memory?
// Q3: What happens when we try to nullify largeArray in cleanUp()?

// Debug Problem 2: Unexpected Behavior
console.log("\n\nDebug Problem 2: Unexpected Behavior");

function createAdder(x) {
  return function(y) {
    return x + y;
  };
}

const add5 = createAdder(5);
const add10 = createAdder(10);

console.log(add5(3));  // 8
console.log(add10(3)); // 13

// Now, what if we do this:
let x = 100;
const addX = createAdder(x);
x = 200;

// Q1: What will addX(5) return? 105 or 205?
// Q2: Why?
// Q3: How does closure capture variables - by value or reference?

// ==============================================
// CHALLENGE PROBLEMS
// ==============================================

console.log("\n\n--- CHALLENGE PROBLEMS ---\n");

// Challenge 1: Function Composition
console.log("Challenge 1: Function Composition");

// Create a compose function using closures that:
// 1. Takes any number of functions
// 2. Returns a new function that applies them right-to-left
// 3. Each function passes its result to the next

function compose(...functions) {
  // Your implementation here
  
}

// Example:
// const add2 = x => x + 2;
// const multiply3 = x => x * 3;
// const square = x => x * x;
// const composed = compose(square, multiply3, add2);
// console.log(composed(5)); // ((5 + 2) * 3)² = 441

// Challenge 2: State Machine
console.log("\n\nChallenge 2: State Machine");

// Create a state machine using closures that:
// 1. Has private current state
// 2. Allows state transitions
// 3. Validates transitions
// 4. Calls callbacks on state change

function createStateMachine(initialState, transitions) {
  // Your implementation here
  
}

// Example states: 'idle', 'loading', 'success', 'error'
// Transitions define what states can move to what other states

console.log("\n🎯 Practice Instructions:");
console.log("1. For Predict Output problems: Write your prediction first");
console.log("2. For Fix the Code problems: Identify issue, then fix it");
console.log("3. For Implementation problems: Write code from scratch");
console.log("4. For Debugging problems: Analyze memory/performance issues");
console.log("5. Run code to verify your understanding");
```