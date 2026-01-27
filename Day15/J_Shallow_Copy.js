// ✅ BEST PRACTICES:

// 1. Basic shallow copy
const original = { name: 'Alice', age: 30 };
const copy = { ...original };
console.log(copy); // { name: 'Alice', age: 30 }

// 2. Copy with additional properties
const user = { name: 'John', age: 25 };
const userWithId = { 
  id: 1, 
  ...user,           // Copy all properties from user
  active: true       // Add new property
};
console.log(userWithId); // { id: 1, name: 'John', age: 25, active: true }

// 3. Override specific properties while copying
const updatedUser = { 
  ...user, 
  age: 26,           // Override age property
  city: 'NYC'        // Add new property
};
console.log(updatedUser); // { name: 'John', age: 26, city: 'NYC' }

// 4. Merge multiple objects
const defaults = { theme: 'light', fontSize: 16 };
const preferences = { fontSize: 14 };
const settings = { 
  ...defaults, 
  ...preferences,    // Later objects override earlier ones
  language: 'en'
};
console.log(settings); // { theme: 'light', fontSize: 14, language: 'en' }

// 5. Copy array (spread works for arrays too!)
const originalArray = [1, 2, 3];
const arrayCopy = [...originalArray];
console.log(arrayCopy); // [1, 2, 3]

// ⚠️ COMMON PITFALLS TO AVOID:
const obj = { a: 1, b: { inner: 2 } };
const shallow = { ...obj };

// ❌ DON'T: Modify nested objects thinking they're independent
shallow.b.inner = 99; // This affects original.b.inner too!

console.log(obj, shallow);
// ✅ DO: Create proper deep copy for nested structures
const deepCopy = { 
  ...obj, 
  b: { ...obj.b }  // Explicitly copy nested object
};
deepCopy.b.inner = 99; // Now original is safe



// Performance & Memory Considerations
// ✅ PERFORMANCE BEST PRACTICES:

// 1. Avoid unnecessary copies
const largeDataset = /* ... huge array or object ... */;

// ❌ DON'T: Copy unnecessarily
function processBad(data) {
  const copy = [...data]; // Expensive if data is huge
  // ... use copy
  return copy;
}

// ✅ DO: Work with original if possible
function processGood(data) {
  // Use data directly if you don't need to preserve original
  const result = data.filter(item => item.isValid);
  return result;
}

// 2. Batch operations
const items = [/* ... */];

// ❌ DON'T: Copy in loop
let result1 = [];
for (let item of items) {
  const itemCopy = { ...item }; // Creates many copies
  result1.push(processItem(itemCopy));
}

// ✅ DO: Copy once if needed
const itemsCopy = items.map(item => ({ ...item }));
const result = itemsCopy.map(processItem);

// 3. Use Object.assign for multiple sources (can be faster)
const obj1 = { a: 1 }, obj2 = { b: 2 }, obj3 = { c: 3 };

// For 3+ objects, Object.assign can be optimized by JS engine
const merged = Object.assign({}, obj1, obj2, obj3);

// 4. Measure performance if needed
function benchmarkCopy(method, data, iterations = 10000) {
  console.time(method);
  for (let i = 0; i < iterations; i++) {
    if (method === 'spread') ({ ...data });
    else if (method === 'assign') Object.assign({}, data);
  }
  console.timeEnd(method);
}