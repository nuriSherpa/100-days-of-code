// Runtime Environment

// A runtime environment provides everything needed to execute JavaScript code:

// JS engine

// APIs

// Event loop

// Memory & execution context

// JavaScript by itself can’t do much — the runtime gives it superpowers.

// [Call Stack] → [Web APIs] → [Task Queue] → [Render Queue] → [Call Stack]

// ┌───────────────────────────┐
// │        timers          │←setTimeout, setInterval
// ├───────────────────────────┤
// │     pending callbacks  │←I/O callbacks
// ├───────────────────────────┤
// │        idle, prepare   │←internal use
// ├───────────────────────────┤
// │          poll          │←retrieve I/O events
// ├───────────────────────────┤
// │          check          │←setImmediate
// ├───────────────────────────┤
// │      close callbacks   │←socket.on('close')
// └───────────────────────────┘

// Browser-specific code
console.log(window.location.href); // Works in browser
document.getElementById('myElement'); // Works in browser

// Node.js-specific code
const fs = require('fs'); // Works in Node.js
fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log(data);
});

// Universal code (works in both)
console.log('Hello World!');
setTimeout(() => {
  console.log('Timeout executed');
}, 1000);
