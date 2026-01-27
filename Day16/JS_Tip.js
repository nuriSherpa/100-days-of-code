//Do o
// 1. Use consistent types
function optimized(arr) {
    // Always pass arrays with same element types
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

// 2. Initialize objects consistently
function createUser(name, age) {
    return { name, age }; // Always same property order
}

// 3. Use monomorphic calls
const obj = { method() { /* ... */ } };
obj.method(); // Same type each time


//Avoid x
// 1. Changing object structure
const obj = { x: 1 };
obj.y = 2; // Hidden class change

// 2. Mixing types in arrays
const mixed = [1, "two", 3.0]; // Deoptimizes

// 3. delete operator
delete obj.property; // Destroys optimization