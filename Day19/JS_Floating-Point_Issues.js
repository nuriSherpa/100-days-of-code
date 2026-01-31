// The classic issue
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false!

// More examples
console.log(0.3 - 0.1); // 0.19999999999999998
console.log(1.005 * 100); // 100.49999999999999
console.log((1.005 * 100) / 100); // 1.0050000000000001

// Solutions:
// 1. Use tolerance (epsilon) for comparisons
function areEqual(a, b, epsilon = 1e-10) {
  return Math.abs(a - b) < epsilon;
}

// 2. Convert to integers when possible
console.log((0.1 * 10 + 0.2 * 10) / 10); // 0.3

// 3. Use libraries like decimal.js for financial calculations
// 4. Round to fixed number of decimal places
console.log(+(0.1 + 0.2).toFixed(10)); // 0.3
