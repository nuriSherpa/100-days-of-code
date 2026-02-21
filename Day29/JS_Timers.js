// JavaScript Timers
// JavaScript provides several functions for scheduling code to run at specific times or intervals. The most commonly used timers are setTimeout and setInterval.

// setTimeout allows you to execute a function after a specified delay (in milliseconds).
console.log('Start');

setTimeout(() => {
  console.log('This will run after 2 seconds');
}, 2000);

console.log('End');

// In this example, "Start" and "End" will be logged immediately, and "This will run after 2 seconds" will be logged after a 2-second delay.

// setInterval allows you to execute a function repeatedly at specified intervals (in milliseconds).
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`This will run every second. Count: ${count}`);

  // Stop the interval after it has run 5 times
  if (count === 5) {
    clearInterval(intervalId);
    console.log('Interval cleared');
  }
}, 1000);

// In this example, the function will run every second, logging the count. After it has run 5 times, the interval will be cleared, and "Interval cleared" will be logged.

//  setTimeout
// setInterval
// clearTimeout
// clearInterval

// Example of using clearTimeout to cancel a scheduled timeout:
const timeoutId = setTimeout(() => {
  console.log('This will not run');
}, 3000);

// Cancel the timeout before it executes
clearTimeout(timeoutId);
console.log('Timeout cleared before execution');

// In this example, the timeout is scheduled to run after 3 seconds, but it is cleared before it can execute, so "This will not run" will never be logged. Instead, "Timeout cleared before execution" will be logged immediately.
