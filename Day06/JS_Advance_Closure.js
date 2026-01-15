// Basic Module Pattern
const UserModule = (function() {
    // Private variables
    let privateCounter = 0;
    let privateData = [];
    
    // Private methods
    function privateIncrement() {
        privateCounter++;
    }
    
    function privateLog(message) {
        console.log(`[Private]: ${message}`);
    }
    
    // Public API (returned as object)
    return {
        // Public method accessing private variables
        incrementCounter: function() {
            privateIncrement();
            privateLog(`Counter incremented to ${privateCounter}`);
        },
        
        // Public method with controlled access
        getCounter: function() {
            return privateCounter;
        },
        
        // Public method to add data
        addData: function(item) {
            privateData.push(item);
            privateLog(`Added: ${item}`);
        },
        
        // Public method to get all data
        getAllData: function() {
            // Return a copy to prevent direct manipulation
            return [...privateData];
        }
    };
})();

// Usage
UserModule.incrementCounter(); // [Private]: Counter incremented to 1
UserModule.incrementCounter(); // [Private]: Counter incremented to 2
console.log(UserModule.getCounter()); // 2
UserModule.addData("User1");
UserModule.addData("User2");
console.log(UserModule.getAllData()); // ["User1", "User2"]

// Private members are inaccessible
console.log(UserModule.privateCounter); // undefined
console.log(UserModule.privateData); // undefined

// Concepts to explain:
// 1. How the module pattern encapsulates private state
//    - The IIFE creates a private scope where privateCounter and privateData are defined. They cannot be accessed directly from outside the module, ensuring encapsulation.
// 2. Controlled access through public methods
//    - The returned object exposes public methods that can interact with the private state in a controlled manner, allowing for safe manipulation and retrieval of data.
// 3. Benefits of using closures for modular design
//    - Closures enable modular design by allowing functions to maintain state and encapsulate functionality, leading to cleaner and more maintainable code.


// Factory Function with Closures
function createBankAccount(initialBalance = 0) {
    // Private state for each instance
    let balance = initialBalance;
    let transactionHistory = [];
    
    // Private helper method
    function recordTransaction(type, amount) {
        transactionHistory.push({
            type,
            amount,
            timestamp: new Date().toISOString(),
            balance: balance
        });
    }
    
    // Return public interface
    return {
        deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
                recordTransaction('DEPOSIT', amount);
                return `Deposited $${amount}. New balance: $${balance}`;
            }
            return "Invalid deposit amount";
        },
        
        withdraw: function(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                recordTransaction('WITHDRAW', amount);
                return `Withdrew $${amount}. New balance: $${balance}`;
            }
            return "Insufficient funds or invalid amount";
        },
        
        getBalance: function() {
            return balance;
        },
        
        getStatement: function() {
            // Return a copy to prevent mutation
            return [...transactionHistory];
        },
        
        // Bonus: Encapsulated business logic
        applyInterest: function(rate) {
            const interest = balance * (rate / 100);
            balance += interest;
            recordTransaction('INTEREST', interest);
            return `Interest applied: $${interest.toFixed(2)}`;
        }
    };
}

// Create multiple instances
const account1 = createBankAccount(1000);
const account2 = createBankAccount(500);

console.log(account1.deposit(200)); // "Deposited $200. New balance: $1200"
console.log(account1.withdraw(300)); // "Withdrew $300. New balance: $900"
console.log(account1.getBalance()); // 900

console.log(account2.deposit(100)); // "Deposited $100. New balance: $600"

// Each instance maintains its own private state
console.log(account1.getStatement()); // Transaction history for account1
console.log(account2.getStatement()); // Transaction history for account2

console.log(createBankAccount(200).getBalance()); // 0 
// New instance with default balance

console.log(createBankAccount().transactionHistory); // undefined

// Concepts to explain:
// 1. How factory functions create multiple instances with private state
//    - Each call to createBankAccount creates a new lexical environment with its own balance and transactionHistory, allowing for independent instances.
// 2. Use of closures to maintain instance-specific data
//    - The returned methods form closures over their respective lexical environments, enabling them to access and modify the private state specific to each instance.
// 3. Advantages of using factory functions for object creation
//    - Factory functions provide a flexible way to create objects with encapsulated state and behavior, promoting code reuse and modularity.


const memoize=(function() {
    const cache = new Map();
    return function(fn) {
        return function(...args) {
            console.log("Arguments received:", args);
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                console.log("Fetching from cache for args:", args);
                return cache.get(key);
            }
            console.log("Calculating result for args:", args);
            const result = fn(...args);
            cache.set(key, result);
            return result;
        };
    };
})();

// Example function to be memoized
function slowFibonacci(n) {
    if (n <= 1) return n;
    return slowFibonacci(n - 1) + slowFibonacci(n - 2);
}

// Create a memoized version of the Fibonacci function
const memoizedFibonacci = memoize(slowFibonacci);

// Usage
console.log(memoizedFibonacci(10)); // Calculating result for args: [10] ... 55
console.log(memoizedFibonacci(10)); // Fetching from cache for args: [10] ... 55
console.log(memoizedFibonacci(15)); // Calculating result for args: [15] ... 610
console.log(memoizedFibonacci(15)); // Fetching from cache for args: [15] ... 610

// Concepts to explain:
// 1. How memoization improves performance using closures
//    - The memoize function creates a closure over the cache Map, allowing it to store and retrieve previously computed results based on function arguments.
// 2. Use of a cache to store computed results
//    - The cache stores results keyed by a stringified version of the arguments, enabling quick lookups for repeated calls with the same inputs.
// 3. Practical applications of memoization
//    - Memoization is particularly useful for optimizing recursive functions and expensive computations, reducing redundant calculations and improving efficiency. 


// Event Manager with Closure
function createEventManager() {
    // Private event registry
    const events = new Map();
    
    return {
        // Subscribe to event
        on: function(eventName, callback) {
            if (!events.has(eventName)) {
                events.set(eventName, new Set());
            }
            events.get(eventName).add(callback);
            
            // Return unsubscribe function
            return () => {
                const callbacks = events.get(eventName);
                if (callbacks) {
                    callbacks.delete(callback);
                    if (callbacks.size === 0) {
                        events.delete(eventName);
                    }
                }
            };
        },
        
        // Emit event
        emit: function(eventName, data) {
            const callbacks = events.get(eventName);
            if (callbacks) {
                callbacks.forEach(callback => {
                    try {
                        callback(data);
                    } catch (error) {
                        console.error(`Error in ${eventName} handler:`, error);
                    }
                });
            }
        },
        
        // Remove all listeners for event
        off: function(eventName) {
            events.delete(eventName);
        },

        // Get all event
        getEvents: function() {
            return [...events.keys()];
        },
        
        // Get event count (for debugging)
        getEventCount: function() {
            return events.size;
        }
    };
}

// Usage
const eventManager = createEventManager();

// Subscribe to events
const unsubscribeLogin = eventManager.on('user.login', (user) => {
    console.log(`User logged in: ${user.name}`);
});

const unsubscribeLogout = eventManager.on('user.logout', (user) => {
    console.log(`User logged out: ${user.name}`);
});

// Multiple subscribers for same event
const analyticsUnsubscribe = eventManager.on('user.login', (user) => {
    console.log(`[Analytics] Track login: ${user.email}`);
});

// Emit events
eventManager.emit('user.login', { name: 'John', email: 'john@example.com' });
// Output:
// User logged in: John
// [Analytics] Track login: john@example.com

// Unsubscribe specific listener
analyticsUnsubscribe();

// Emit again
eventManager.emit('user.login', { name: 'Jane', email: 'jane@example.com' });
// Output: User logged in: Jane (only one listener now)

eventManager.emit('user.logout', { name: 'John', email: 'john@example.com' });


console.log("Current event types:", eventManager.getEvents()); // ['user.login', 'user.logout']

// Clean up
unsubscribeLogin();
eventManager.off('user.logout');

// see user
console.log("Remaining event types:", eventManager.getEventCount()); // 0




// Singleton with IIFE and Closure
const ConfigurationManager = (function() {
    // Private instance variable
    let instance = null;
    
    // Private configuration data
    let config = {
        apiUrl: 'https://api.example.com',
        timeout: 5000,
        retries: 3,
        theme: 'dark'
    };
    
    // Private methods
    function validateConfig(key, value) {
        const validations = {
            timeout: (val) => val > 0 && val <= 10000,
            retries: (val) => val >= 0 && val <= 5,
            theme: (val) => ['light', 'dark', 'auto'].includes(val)
        };
        
        if (validations[key]) {
            return validations[key](value);
        }
        return true;
    }
    
    function createInstance() {
        return {
            // Get configuration value
            get: function(key) {
                return config[key];
            },
            
            // Set configuration value with validation
            set: function(key, value) {
                if (validateConfig(key, value)) {
                    const oldValue = config[key];
                    config[key] = value;
                    this.emit('configChange', { key, oldValue, newValue: value });
                    return true;
                }
                console.warn(`Invalid value for ${key}: ${value}`);
                return false;
            },
            
            // Get all configuration
            getAll: function() {
                // Return a deep copy
                return JSON.parse(JSON.stringify(config));
            },
            
            // Reset to defaults
            reset: function() {
                const defaults = {
                    apiUrl: 'https://api.example.com',
                    timeout: 5000,
                    retries: 3,
                    theme: 'dark'
                };
                config = { ...defaults };
                this.emit('configReset', config);
            },
            
            // Event emitter methods
            events: new Map(),
            on: function(event, callback) {
                if (!this.events.has(event)) {
                    this.events.set(event, new Set());
                }
                this.events.get(event).add(callback);
            },
            emit: function(event, data) {
                const callbacks = this.events.get(event);
                if (callbacks) {
                    callbacks.forEach(cb => cb(data));
                }
            }
        };
    }
    
    // Public API
    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// Usage - always get the same instance
const config1 = ConfigurationManager.getInstance();
const config2 = ConfigurationManager.getInstance();

console.log(config1 === config2); // true (same instance)

// Subscribe to changes
config1.on('configChange', ({ key, oldValue, newValue }) => {
    console.log(`Config changed: ${key} = ${oldValue} -> ${newValue}`);
});

// Use configuration
console.log(config1.get('apiUrl')); // 'https://api.example.com'
config1.set('theme', 'dark'); // Emits event
config1.set('timeout', 3000); // Invalid value warning


console.log(config1.emit()); // 5000 (unchanged due to invalid set)

console.log(config1.get('theme')); // 'light'
console.log(config1.getAll()); // Current config