const user = {
    name: "Bob",
    
    // Regular function - has its own `this`
    regularGreet: function() {
        return `Regular: Hello, I'm ${this.name}`;
    },
    
    // Arrow function - inherits `this` from surrounding scope
    arrowGreet: () => {
        // This will be undefined or refer to global object
        // because arrow function inherits from global scope here
        return `Arrow: Hello, I'm ${this.name}`;
    },
    
    nestedArrow: function() {
        // Arrow function inside regular function
        const innerFunc = () => {
            return `Nested Arrow: Hello, I'm ${this.name}`;
        };
        return innerFunc();
    }
};

console.log(user.regularGreet()); // "Regular: Hello, I'm Bob"
console.log(user.arrowGreet());   // "Arrow: Hello, I'm undefined" (or global name)
console.log(user.nestedArrow());  // "Nested Arrow: Hello, I'm Bob"