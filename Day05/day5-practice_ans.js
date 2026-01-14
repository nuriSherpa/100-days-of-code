// ==============================================
// DAY 5: CLOSURES PRACTICE PROBLEMS ANSWERS
// ==============================================

console.log("🚀 DAY 5 - CLOSURES PRACTICE PROBLEMS Answers\n");

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

// Questions to answer:
// 1. Why do counter1 and counter2 maintain separate counts?
// Each call to createCounter() creates a new closure environment with its own 'count' variable. Therefore, counter1 and counter2 have separate 'count' variables that do not interfere with each other.
// 2. What happens to 'count' variable between function calls?
// The 'count' variable retains its value between function calls because it is enclosed within the closure created by createCounter(). Each time the inner function is called, it has access to the 'count' variable from its own closure environment.
// 3. How many closure environments are created?
// Two closure environments are created, one for counter1 and one for counter2.



// Problem 2: Fix the Loop Closure Issue
console.log("\n\nProblem 2: Fix the Loop Closure Issue");

function createLoggers() {
  const loggers = [];
  
  for (let i = 1; i <= 3; i++) {
    // Using IIFE to capture the current value of 'i'
   (function(index) {
      loggers.push(function() {
        console.log(index);
      });
    })(i);
  }
  // Alternatively, using .bind():
  /*
  for (var i = 1; i <= 3; i++) {
    loggers.push(function(num) {
      console.log(num);
    }.bind(null, i));
  }
  */
  
  return loggers;
}

const loggerArray = createLoggers();

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
// output will be "changed"
obj2.logValue();
// output will be "different"
console.log(obj1.getValue());
// output will be "changed"
console.log(obj2.getValue());
// output will be "different"

// Explanation:
// Each call to mysteryFunction() creates a new closure with its own 'value' variable. Therefore, obj1 and obj2 maintain separate 'value' states, and changes to one do not affect the other.


// Problem 4: Fix the Timer Issue
console.log("\n\nProblem 4: Fix the Timer Issue");

function createTimers() {
  for (var i = 1; i <= 3; i++) {
    setTimeout(function(index) {
      console.log("Timer " + index + " completed");
    }.bind(null, i));
  }
}

createTimers();

// Q1: What's wrong with this output?
// All timers log "Timer 4 completed" because 'var' is function-scoped and the value of 'i' after the loop ends is 4. The closures created by setTimeout all reference the same 'i' variable.
// Q2: Fix it to show Timer 1, Timer 2, Timer 3 correctly


// Problem 5: Data Privacy Pattern
console.log("\n\nProblem 5: Data Privacy Pattern");

function createBankAccount(initialBalance) {
let balance = initialBalance;

  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        console.log(`Deposited: $${amount}`);
      } else {
        console.log("Deposit amount must be positive.");
      }
    },
    withdraw: function(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        console.log(`Withdrew: $${amount}`);
      } else {
        console.log("Insufficient funds or invalid withdrawal amount.");
      }
    },
    getBalance: function() {
      return balance;
    }
  };   
  
}
const myAccount = createBankAccount(1000);
myAccount.deposit(500);
myAccount.withdraw(200);
console.log(myAccount.balance)
console.log("Current Balance:", myAccount.getBalance());

// Q1: How does this pattern ensure data privacy?
// The 'balance' variable is private to the createBankAccount function and cannot be accessed directly from outside. The returned object provides controlled access to modify and retrieve the balance through its methods.
// Q2: Can the balance be accessed directly from outside?
// No, the balance cannot be accessed directly from outside the createBankAccount function. It can only be modified or retrieved using the provided methods (deposit, withdraw, getBalance).


// Problem 6: Multiple Closures Chain
console.log("\n\nProblem 6: Multiple Closures Chain");
function multiplier(x) {
  return function(y) {
    return function(z) {
      return x * y * z;
    };
  };
}
console.log("multiplier(2)(3)(4):", multiplier(2)(3)(4));
const double = multiplier(2);
console.log("double(5)(3):", double(5)(3));

// Q1: What does multiplier(2)(3)(4) return?
// A1: It returns 24 (2 * 3 * 4).
// Q2: Create a partial application: const double = multiplier(2);
//     What does double(5)(3) return?
// A2: It returns 30 (2 * 5 * 3).
// Q3: How many closure environments are created in total?
// A3: 6 closure environments are created (3 for each call).


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

let user1 = userModule.addUser("Alice");
let user2 = userModule.addUser("Bob");

console.log("All Users:", userModule.getUsers());
console.log("Find User with ID 1:", userModule.findUser(1));

// modify user 2's name
let userToModify = userModule.findUser(2);
if (userToModify) {
  userToModify.name = "Robert";
}

console.log("All Users after modification:", userModule.getUsers());

// Q1: What's the problem with this module?
// Q2: How can users be accessed/modified from outside?
// Q3: Fix the privacy issue
// Explanation:
// The 'users' array is exposed through the getUsers() method, allowing external code to modify user objects directly. This breaks the encapsulation intended by the module pattern.
// To fix this, we can return copies of user objects instead of references, or provide methods to update user information without exposing the internal array directly.

// Fixed Implementation:
const fixedUserModule = (function() {
  let users = [];
  let userId = 0;
  
  return {
    addUser: function(name) {
      users.push({ id: ++userId, name: name });
    },
    getUsers: function() {
      // Return copies of user objects to prevent external modification
      return users.map(user => ({ ...user }));
    },
    findUser: function(id) {
      const user = users.find(user => user.id === id);
      return user ? { ...user } : null; // Return a copy
    },
    updateUserName: function(id, newName) {
      const user = users.find(user => user.id === id);
      if (user) {
        user.name = newName;
      }
    }
  };
})();

fixedUserModule.addUser("Alice");
fixedUserModule.addUser("Bob");

console.log("All Users:", fixedUserModule.getUsers());
console.log("Find User with ID 1:", fixedUserModule.findUser(1));

// modify user 2's name using the provided method
fixedUserModule.updateUserName(2, "Robert");
console.log("All Users after modification:", fixedUserModule.getUsers());

// Now, users cannot be modified directly from outside the module, ensuring data privacy and encapsulation.



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
  const cache= new Map();
  return function(...args){
    const key=JSON.stringify(args);
    if(cache.has(key)){
      return cache.get(key);
    }else{
      const result=fn(...args);
      cache.set(key,result);
      return result;
    }
  }
  
}

const memoizedCalc = memoize(expensiveCalculation);
console.log(memoizedCalc(5)); // Should log "Calculating for 5"
console.log(memoizedCalc(5)); // Should NOT log, should return cached

console.log(memoizedCalc(10)); // Should log "Calculating for 10"
console.log(memoizedCalc(10)); // Should NOT log, should return cached



// Interview Problem 3: Debounce Function
console.log("\n\nInterview Problem 3: Debounce Function");

// Implement a debounce function that:
// 1. Delays function execution until after wait time
// 2. Cancels previous calls if called again within wait time
// 3. Useful for search inputs, window resize, etc.

function debounce(func, wait) {
  // Your implementation here
    let timeout;
    return function(...args){
      clearTimeout(timeout);
      timeout=setTimeout(()=>{
        func.apply(this,args);
      },wait);
    }   
  
}

// function searchAPI(query) {
//   console.log("Searching for:", query);
// }

// const input = document.createElement('input');
// document.body.appendChild(input);

// // Usage example:
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
// The 'items' array is exposed through the getItems() method, allowing external code to modify item objects directly. The applyDiscount method modifies the total directly, which can lead to inconsistencies if items are added or removed after applying a discount.
// Q2: How can items be tampered with from outside?
// Items can be tampered with by directly modifying the objects returned from the getItems() method.
// Q3: Fix the privacy and data integrity issues
const fixedShoppingCart = (function() {
  let items = [];
  
  function calculateTotal() {
    return items.reduce((sum, item) => sum + item.price, 0);
  }
  
  return {
    addItem: function(name, price) {
      items.push({ name, price });
    },
    removeItem: function(index) {
      items.splice(index, 1);
    },
    getItems: function() {
      // Return copies of item objects to prevent external modification
      return items.map(item => ({ ...item }));
    },
    getTotal: function() {
      return calculateTotal();
    },
    applyDiscount: function(percentage) {
      const total = calculateTotal();
      return total * (1 - percentage/100);
    }
  };
})();

fixedShoppingCart.addItem("Book", 20);
fixedShoppingCart.addItem("Pen", 5);
console.log("Items:", fixedShoppingCart.getItems());
console.log("Total:", fixedShoppingCart.getTotal());
console.log("Total after 10% discount:", fixedShoppingCart.applyDiscount(10));

// Now, items cannot be modified directly from outside the module, and the total is always calculated based on the current items in the cart. The applyDiscount method returns a discounted total without modifying the internal state.



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
    return function(initialValue){
      return functions.reduceRight((acc, fn) => fn(acc), initialValue);
    };
}

// Example:
const add2 = x => x + 2;
const multiply3 = x => x * 3;
const square = x => x * x;
const composed = compose(square, multiply3, add2);
console.log(composed(5)); // ((5 + 2) * 3)² = 441
