// 1. Synchronous (Blocking) Code
// Code executes line by line, in sequence

// Each operation must complete before moving to the next

// Like waiting in line at a coffee shop

// 2. Asynchronous (Non-Blocking) Code
// Code can run out of sequence

// Long operations don't block the main thread

// Like ordering coffee and waiting while doing other things

console.log('=== SYNCHRONOUS VS ASYNCHRONOUS DEMO ===');

// ======================
// SYNCHRONOUS EXAMPLE
// ======================
console.log('\n🔴 SYNCHRONOUS (Blocking) Execution:');

function syncTask(taskNumber, duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {
    // Simulate blocking work
  }
  console.log(`Task ${taskNumber} completed after ${duration}ms`);
}

console.log('Start synchronous tasks...');
syncTask(1, 2000); // Blocks for 2 seconds
syncTask(2, 1000); // Blocks for 1 second
syncTask(3, 500); // Blocks for 0.5 seconds
console.log('All sync tasks completed!');
console.log('Main thread was blocked the whole time!');

// ======================
// ASYNCHRONOUS EXAMPLE
// ======================
console.log('\n🟢 ASYNCHRONOUS (Non-Blocking) Execution:');

function asyncTask(taskNumber, duration) {
  console.log(`Task ${taskNumber} started...`);

  setTimeout(() => {
    console.log(`Task ${taskNumber} completed after ${duration}ms`);
  }, duration);
}

console.log('Start asynchronous tasks...');
asyncTask(1, 2000); // Starts, but doesn't block
asyncTask(2, 1000); // Starts immediately
asyncTask(3, 500); // Starts immediately
console.log('All async tasks INITIATED!');
console.log('Main thread is FREE to do other work!');
