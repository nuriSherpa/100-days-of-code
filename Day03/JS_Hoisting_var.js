// Basic Hoisting Example with var
// Example of variable hoisting with 'var'
console.log(hoistedVar);
var hoistedVar = "I am hoisted!";
console.log(hoistedVar);

// Function Hoisting Example
hoistedFunction();
function hoistedFunction() {
    console.log("I am a hoisted function!");
}

// Hoisting with let and const (will cause ReferenceError if uncommented)
// console.log(notHoistedLet); // Uncommenting this line will throw an error
// let notHoistedLet = "I am not hoisted!";
// console.log(notHoistedConst); // Uncommenting this line will throw an error
// const notHoistedConst = "I am not hoisted!";

// Example 8: Real-world issue
function processItems(items) {
  for (var i = 0; i < items.length; i++) {
    setTimeout(function() {
      console.log(`Processing item ${i}: ${items[i]}`);
    }, 100);
  }
}

processItems(["A", "B", "C"]);
// Output after 100ms: 
// Processing item 3: undefined
// Processing item 3: undefined  
// Processing item 3: undefined

// Why? Because var i is shared across all timeouts