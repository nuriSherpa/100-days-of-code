// apply() immediately executes a function with a specific this value AND passes arguments as an array.

// Both do the same thing, but accept arguments differently:
function sum(a, b, c) {
  return a + b + c;
}

// call() - arguments passed individually
console.log(sum.call(null, 1, 2, 3)); // ✅

// apply() - arguments passed as array
console.log(sum.apply(null, [1, 2, 3]))// ✅


// call() = Handing someone items one by one: "Take this, this, and this"

// apply() = Handing someone a box with items: "Take everything in this box"


const numbers = [4, 12, 7, 19, 3];

// Problem: Math.max doesn't accept arrays
// console.log(Math.max(numbers)); // NaN or undefined

// Solution with apply():
const maxNumber = Math.max.apply(null, numbers);
console.log(maxNumber); // 19

const minNumber = Math.min.apply(null, numbers);
console.log(minNumber); // 3


function introduce(greeting, time, place) {
  return `${greeting}! It's ${time} here in ${place}. I'm ${this.name}.`;
}

const person = { name: 'Sarah' };

// If your arguments come from somewhere as an array
const args = ['Hello', 'morning', 'New York'];

console.log(introduce.apply(person, args));
// Output: "Hello! It's morning here in New York. I'm Sarah."