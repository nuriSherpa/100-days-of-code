// ==============================================
// DAY 6: ADVANCED CLOSURES PRACTICE PROBLEMS
// ==============================================

console.log("🚀 DAY 6 - ADVANCED CLOSURES PRACTICE PROBLEMS\n");

// ==============================================
// ADVANCED PRACTICE PROBLEMS - PREDICT OUTPUT
// ==============================================

console.log("\n--- ADVANCED PRACTICE PROBLEMS ---\n");

// Problem 1: Closure with Private State Management
console.log("Problem 1: Closure with Private State Management");
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  const transactionHistory = [];
  
  return {
    deposit: function(amount) {
      balance += amount;
      transactionHistory.push({ type: 'DEPOSIT', amount, balance });
      return `Deposited $${amount}. New balance: $${balance}`;
    },
    
    withdraw: function(amount) {
      if (amount > balance) {
        transactionHistory.push({ type: 'WITHDRAW_FAILED', amount, balance });
        return "Insufficient funds";
      }
      balance -= amount;
      transactionHistory.push({ type: 'WITHDRAW', amount, balance });
      return `Withdrew $${amount}. New balance: $${balance}`;
    },
    
    getBalance: function() {
      return balance;
    },
    
    getStatement: function() {
      return transactionHistory.map(entry => 
        `${entry.type}: $${entry.amount} (Balance: $${entry.balance})`
      );
    }
  };
}

const account = createBankAccount(1000);
console.log(account.deposit(500));
console.log(account.withdraw(200));
console.log(account.withdraw(2000));
console.log("Balance:", account.getBalance());
console.log("Statement:", account.getStatement());

// Questions:
// 1. What will be the output of line 40-44?
// it will output:
// Deposited $500. New balance: $1500
// Withdrew $200. New balance: $1300
// Insufficient funds
// Balance: 1300
// Statement: [ 'DEPOSIT: $500 (Balance: $1500)',
//   'WITHDRAW: $200 (Balance: $1300)',
//   'WITHDRAW_FAILED: $2000 (Balance: $1300)' ]
// 2. What does the transactionHistory array contain after all operations?
// It contains three objects representing each transaction:
// { type: 'DEPOSIT', amount: 500, balance: 1500 }
// { type: 'WITHDRAW', amount: 200, balance: 1300 }
// { type: 'WITHDRAW_FAILED', amount: 2000, balance: 1300 }
// 3. Can we access 'balance' directly using account.balance? Why?
// No, we cannot access 'balance' directly because it is a private variable within the closure of createBankAccount function. It is not exposed in the returned object.
// 4. What happens if we try to modify transactionHistory from outside?
// We cannot modify transactionHistory from outside because it is also a private variable within the closure. It is not accessible from the returned object.
// 5. How many closure scopes exist in this code?
// There is one closure scope created by the createBankAccount function, which contains the private variables balance and transactionHistory.

// Problem 2: Module Pattern with Multiple Instances
console.log("\nProblem 2: Module Pattern with Multiple Instances");
const UserModule = (function() {
  let privateCounter = 0;
  const privateUsers = new Map();
  
  function privateHelper(id) {
    return `USER_${id}_${Date.now()}`;
  }
  
  return {
    createUser: function(name) {
      const id = privateHelper(privateCounter++);
      privateUsers.set(id, { name, createdAt: new Date() });
      return id;
    },
    
    getUser: function(id) {
      const user = privateUsers.get(id);
      return user ? { ...user } : null;
    },
    
    updateUser: function(id, updates) {
      if (privateUsers.has(id)) {
        const user = privateUsers.get(id);
        privateUsers.set(id, { ...user, ...updates, updatedAt: new Date() });
        return true;
      }
      return false;
    },
    
    getStats: function() {
      return {
        totalUsers: privateUsers.size,
        lastCreated: privateCounter
      };
    }
  };
})();

const user1 = UserModule.createUser("Alice");
const user2 = UserModule.createUser("Bob");
console.log("User1 ID:", user1);
console.log("User2 ID:", user2);
console.log("User1 Data:", UserModule.getUser(user1));
console.log("Update User1:", UserModule.updateUser(user1, { age: 25 }));
console.log("Stats:", UserModule.getStats());

// Questions:
// 1. What will user1 ID format look like?
// It will look like "USER_0_<timestamp>" where <timestamp> is the current time in milliseconds when the user was created.
// 2. What happens when we call getUser? Do we get direct reference or copy?
// We get a copy of the user data, not a direct reference. This is done using the spread operator to create a new object.
// 3. Can we access privateUsers directly? Why?
// No, we cannot access privateUsers directly because it is a private variable within the closure. It is not exposed in the returned object.
// 4. What's the value of privateCounter after creating two users?
// The value of privateCounter will be 2 after creating two users.
// 5. How does the module pattern prevent naming collisions?
// The module pattern encapsulates variables and functions within a closure, preventing them from polluting the global namespace. This avoids naming collisions with other variables or functions in the global scope.

// Problem 3: Currying and Partial Application
console.log("\nProblem 3: Currying and Partial Application");
function createDiscountCalculator(baseDiscount) {
  return function(customerType) {
    return function(isMember) {
      return function(amount) {
        let discount = baseDiscount;
        
        if (customerType === 'VIP') discount += 0.1;
        if (customerType === 'REGULAR') discount += 0.05;
        if (isMember) discount += 0.15;
        
        const finalAmount = amount * (1 - discount);
        return {
          original: amount,
          discountRate: discount,
          final: finalAmount,
          saved: amount - finalAmount
        };
      };
    };
  };
}

const standardDiscount = createDiscountCalculator(0.1);
const vipDiscount = standardDiscount('VIP');
const vipMemberDiscount = vipDiscount(true);
const regularNonMember = standardDiscount('REGULAR')(false);

console.log("VIP Member $100:", vipMemberDiscount(100));
console.log("Regular Non-member $100:", regularNonMember(100));

const quickVIP = createDiscountCalculator(0.1)('VIP')(true);
console.log("Quick VIP $200:", quickVIP(200));

// Questions:
// 1. What's the discount rate for VIP Member on $100?
// 2. How many closure levels are created in this example?
// 3. What's the difference between vipMemberDiscount and quickVIP?
// 4. Can we create a new discount type without modifying original function?
// 5. What happens to the closure chain if we remove one level?

// Problem 4: Memoization with Advanced Cache
console.log("\nProblem 4: Memoization with Advanced Cache");
function createMemoizedApiCaller() {
  const cache = new Map();
  const maxCacheSize = 3;
  const callHistory = [];
  
  return async function(url, options = {}) {
    const cacheKey = JSON.stringify({ url, options });
    
    // Cache hit
    if (cache.has(cacheKey)) {
      console.log(`Cache hit for: ${url}`);
      callHistory.push({ url, cached: true, timestamp: Date.now() });
      return cache.get(cacheKey);
    }
    
    // Cache miss - simulate API call
    console.log(`Making API call to: ${url}`);
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay
    
    const response = {
      data: `Response from ${url}`,
      timestamp: Date.now(),
      status: 200
    };
    
    // Cache management (LRU-like)
    if (cache.size >= maxCacheSize) {
      const firstKey = cache.keys().next().value;
      console.log(`Evicting from cache: ${firstKey}`);
      cache.delete(firstKey);
    }
    
    cache.set(cacheKey, response);
    callHistory.push({ url, cached: false, timestamp: Date.now() });
    
    return response;
  };
}

const memoizedFetch = createMemoizedApiCaller();

// Simulate API calls
setTimeout(async () => {
  console.log("\n--- API Call Simulation ---");
  await memoizedFetch('/api/users');
  await memoizedFetch('/api/products');
  await memoizedFetch('/api/users'); // Should cache hit
  await memoizedFetch('/api/orders');
  await memoizedFetch('/api/settings'); // Should evict oldest
  await memoizedFetch('/api/products'); // Should still be in cache?
}, 100);

// Questions:
// 1. Which calls will be cache hits?
// The call to '/api/users' the second time will be a cache hit.
// 2. What gets evicted when cache is full?
// When the cache is full (after 3 entries), the oldest entry (the first one added) will be evicted. In this case, it will be the cache entry for '/api/users'.
// 3. How does closure help in maintaining cache state between calls?
// The closure created by createMemoizedApiCaller maintains the cache Map and callHistory array in its lexical scope. This allows the returned function to access and modify these variables across multiple calls, preserving the state of the cache.
// 4. What happens if we create another memoizedFetch instance?
// If we create another instance of memoizedFetch by calling createMemoizedApiCaller again, it will have its own separate cache and callHistory. The two instances will not share state.
// 5. How could we improve the cache eviction strategy?
// We could implement a more sophisticated eviction strategy, such as Least Recently Used (LRU) or Least Frequently Used (LFU), to ensure that the most relevant data remains in the cache. This could involve tracking access times or usage counts for each cache entry.

// Problem 5: Event System with Closure Scope Chain
console.log("\nProblem 5: Event System with Closure Scope Chain");
function createEventEmitter(namespace) {
  const events = {};
  const middleware = [];
  
  return {
    on: function(eventName, handler) {
      const fullEventName = namespace ? `${namespace}:${eventName}` : eventName;
      
      if (!events[fullEventName]) {
        events[fullEventName] = [];
      }
      
      const wrappedHandler = function(...args) {
        // Apply middleware
        let shouldProceed = true;
        for (const mw of middleware) {
          if (!mw(fullEventName, args)) {
            shouldProceed = false;
            break;
          }
        }
        
        if (shouldProceed) {
          handler(...args);
        }
      };
      
      events[fullEventName].push(wrappedHandler);
      
      // Return unsubscribe function
      return function() {
        const index = events[fullEventName].indexOf(wrappedHandler);
        if (index > -1) {
          events[fullEventName].splice(index, 1);
        }
      };
    },
    
    emit: function(eventName, ...args) {
      const fullEventName = namespace ? `${namespace}:${eventName}` : eventName;
      const handlers = events[fullEventName] || [];
      
      handlers.forEach(handler => {
        try {
          handler(...args);
        } catch (error) {
          console.error(`Error in ${fullEventName} handler:`, error);
        }
      });
    },
    
    use: function(middlewareFn) {
      middleware.push(middlewareFn);
      return this;
    },
    
    getEventCount: function() {
      return Object.keys(events).length;
    }
  };
}

// Create nested event systems
const globalEmitter = createEventEmitter();
const userEmitter = createEventEmitter('user');
const paymentEmitter = createEventEmitter('payment');

// Add middleware to user events
userEmitter.use((event, args) => {
  console.log(`Middleware: ${event}`, args);
  return args[0] !== 'blocked'; // Block if first arg is 'blocked'
});

const unsubscribe = userEmitter.on('login', (user) => {
  console.log(`User logged in: ${user}`);
});

userEmitter.on('logout', (user) => {
  console.log(`User logged out: ${user}`);
});

// Emit events
userEmitter.emit('login', 'Alice');
userEmitter.emit('login', 'blocked'); // Should be blocked by middleware
userEmitter.emit('logout', 'Alice');

unsubscribe();
userEmitter.emit('login', 'Bob'); // Should not fire (unsubscribed)

// Questions:
// 1. What will be the output sequence?
// The output sequence will be:
// Middleware: user:login [ 'Alice' ]
// User logged in: Alice
// Middleware: user:login [ 'blocked' ]
// Middleware: user:logout [ 'Alice' ]
// User logged out: Alice
// 2. How does middleware closure work?
// The middleware functions are stored in the middleware array within the closure of createEventEmitter. When an event is emitted, each middleware function is called in sequence with the event name and arguments. The middleware can modify the arguments or block the event from proceeding by returning false.
// 3. What happens when unsubscribe is called?
// The unsubscribe function removes the specific event handler (wrappedHandler) from the events array, preventing it from being called in the future when the event is emitted.
// 4. How are event namespaced with closure?
// Event names are namespaced by prefixing them with the namespace (if provided) when they are registered and emitted. This is done using the fullEventName variable, which combines the namespace and event name.
// 5. What's the scope chain in the wrappedHandler function?
// The wrappedHandler function has access to its own scope, the scope of the createEventEmitter function, and the global scope. It can access the events and middleware variables defined in the outer function.
// 6. How many closure environments exist in this system?
// There are multiple closure environments: one for each instance of createEventEmitter, and additional ones for each event handler and middleware function created within those instances.