// Surprising truthy values
if ("0") console.log("truthy!"); // Executes
if ([]) console.log("truthy!");  // Executes
if ({}) console.log("truthy!");  // Executes

// Surprising falsy comparisons
console.log(false == "0");  // true (falsy equivalence)
console.log(null == 0);     // false (but null is falsy!)
console.log(undefined == 0); // false (but undefined is falsy!)

// Checking for empty arrays/objects
const arr = [];
const obj = {};

if (arr) console.log("array exists"); // Executes (but array might be empty!)
if (obj) console.log("object exists"); // Executes (but object might be empty!)

// Better checks
if (Array.isArray(arr) && arr.length > 0) // Check for non-empty array
if (obj && Object.keys(obj).length > 0) // Check for non-empty object