console.log('\n🎯 REAL-WORLD USE CASES:');

// Scenario 1: User Interface
console.log('1. USER INTERFACE:');
console.log('Button clicked...');

// BAD: Sync operation freezes UI
document.getElementById('bad-button').onclick = function () {
  console.log('Processing... (UI frozen)');
  syncTask(1, 3000); // Freezes for 3 seconds!
  console.log('Done! (UI unfrozen)');
};

// GOOD: Async keeps UI responsive
document.getElementById('good-button').onclick = function () {
  console.log('Processing... (UI still responsive)');

  setTimeout(() => {
    console.log('Task completed!');
    // Update UI with results
  }, 3000);

  console.log('UI remains interactive!');
};

// Scenario 2: Multiple Data Sources
console.log('\n2. MULTIPLE DATA SOURCES:');
function fetchMultipleSources() {
  const sources = [
    { name: 'Database', time: 1500 },
    { name: 'API', time: 2000 },
    { name: 'Cache', time: 500 },
    { name: 'Local Storage', time: 300 },
  ];

  console.log('Fetching from multiple sources:');

  // Sync version - sequential (slowest possible)
  console.log('\n--- Sequential (Sync) ---');
  let syncStart = Date.now();
  sources.forEach((source) => {
    syncTask(source.name, source.time);
  });
  console.log(`Total sync time: ${Date.now() - syncStart}ms`);

  // Async version - parallel (fastest possible)
  console.log('\n--- Parallel (Async) ---');
  let asyncStart = Date.now();
  let completed = 0;

  sources.forEach((source) => {
    setTimeout(() => {
      console.log(`${source.name} data loaded`);
      completed++;

      if (completed === sources.length) {
        console.log(`Total async time: ${Date.now() - asyncStart}ms`);
        console.log('Note: Async time ≈ slowest single task, not sum!');
      }
    }, source.time);
  });
}

// Scenario 3: Progress Updates
console.log('\n3. PROGRESS UPDATES:');
function processWithProgress() {
  console.log('Starting data processing...');

  // Async allows progress updates
  const steps = ['Loading', 'Processing', 'Validating', 'Saving'];

  steps.forEach((step, index) => {
    setTimeout(() => {
      console.log(`✅ ${step} complete`);
      // Update progress bar in UI
      const progress = ((index + 1) / steps.length) * 100;
      console.log(`Progress: ${progress}%`);

      if (index === steps.length - 1) {
        console.log('🎉 All tasks completed!');
      }
    }, index * 1000);
  });

  console.log('Progress updates will appear every second...');
}
