// Understanding the Event Loop in JavaScript
// The event loop is a fundamental concept in JavaScript that allows for non-blocking I/O operations.
// It enables asynchronous programming by using a single-threaded model with an event queue.

console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
});

setTimeout(() => {
  console.log('Timeout 2');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 2');
});

console.log('End');

// In this example, the output will be:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Timeout 2

// The event loop processes the call stack and the event queue, allowing for asynchronous operations to be handled efficiently.
