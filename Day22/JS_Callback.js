// What are Callbacks?
// A callback is a function passed as an argument to another function, to be executed later. This is a fundamental concept in JavaScript, especially for handling asynchronous operations.

// Function that takes another function as an argument (callback)
function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  callback(); // Execute the callback function
}

// Callback function
function sayGoodbye() {
  console.log('Goodbye!');
}

// Passing function as argument
greet('Alice', sayGoodbye);
// Output:
// Hello, Alice!
// Goodbye!

// 1. Array Methods with Callbacks
const numbers = [1, 2, 3, 4, 5];

// forEach - executes callback for each element
numbers.forEach(function (number) {
  console.log(number * 2);
});

// map - creates new array using callback
const doubled = numbers.map(function (number) {
  return number * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - returns elements that pass callback test
const evens = numbers.filter(function (number) {
  return number % 2 === 0;
});
console.log(evens); // [2, 4]
