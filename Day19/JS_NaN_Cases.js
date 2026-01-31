// How you get NaN
console.log(0 / 0); // NaN
console.log(Math.sqrt(-1)); // NaN
console.log(parseInt('hello')); // NaN
console.log(Number(undefined)); // NaN
console.log(NaN + 5); // NaN (contagious!)

// The weirdest part - NaN is not equal to itself!
console.log(NaN === NaN); // false
console.log(NaN == NaN); // false

// Checking for NaN
console.log(isNaN(NaN)); // true
console.log(isNaN('hello')); // true (converts to NaN, returns true)
console.log(Number.isNaN(NaN)); // true (ES6 - better!)
console.log(Number.isNaN('hello')); // false (string is not NaN)

// More isNaN surprises
console.log(isNaN(undefined)); // true
console.log(isNaN({})); // true
console.log(isNaN('123')); // false (converts to 123)

// Reliable NaN check
function isReallyNaN(x) {
  return x !== x; // Only NaN has this property!
}

// ES6 solution
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN('hello')); // false
console.log(Number.isNaN(undefined)); // false
