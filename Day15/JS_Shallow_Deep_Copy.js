// Shallow vs Deep Copy in JavaScript

// 1. Shallow Copy Examples

const original = {
  name: 'Alice',
  age: 30,
  hobbies: ['reading', 'gaming'],
  address: { city: 'NYC', zip: '10001' }
};

const shallowCopy = { ...original };

// Test shallow copy behavior
shallowCopy.name = 'Bob'; // ✅ Changes only in copy
shallowCopy.hobbies.push('cooking'); // ❌ Affects original!
shallowCopy.address.city = 'Boston'; // ❌ Affects original!

console.log(original.name); // 'Alice' (unchanged)
console.log(original.hobbies); // ['reading', 'gaming', 'cooking'] (changed!)
console.log(original.address.city); // 'Boston' (changed!)



const original1 = { a: 1, b: { c: 2 } };
const shallowCopy1 = Object.assign({}, original1);

shallowCopy1.b.c = 99; // ❌ Changes original's nested object
console.log(original1.b.c); // 99 (unintended change!)


// 2. Deep Copy Examples

const original2 = {
  name: 'Alice',
  hobbies: ['reading', 'gaming'],
  address: { city: 'NYC' },
  date: new Date(),
  greet: function() { return 'Hello'; }
};

const deepCopy2 = JSON.parse(JSON.stringify(original2));

deepCopy2.address.city = 'Boston'; // ✅ Only affects copy
console.log(original2.address.city); // 'NYC' (unchanged)

// Limitations:
console.log(deepCopy2.date); // string, not Date object
console.log(deepCopy2.greet); // undefined (functions lost)