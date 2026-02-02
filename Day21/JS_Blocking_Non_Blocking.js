// 🔴 BLOCKING (Avoid in main thread)
// ---------------
// heavyLoop();               // Blocks
// JSON.parse(hugeString);    // Blocks
// complexCalculation();      // Blocks
// syncFileRead();           // Blocks
// while(Date.now() < time){} // Blocks

// // 🟢 NON-BLOCKING (Use these instead)
// // ---------------
// setTimeout(task, 0);      // Non-blocking
// Promise.resolve().then(); // Non-blocking
// async function() {        // Non-blocking
//   await someTask();
// }
// fetch('/api/data');       // Non-blocking
// setImmediate(task);       // Non-blocking (Node.js)

// ⚡ OPTIMIZATION TIPS
// ---------------
// 1. Break large operations into chunks
// 2. Use requestAnimationFrame() for UI updates
// 3. Web Workers for CPU-intensive tasks
// 4. Debounce/throttle rapid events
// 5. Virtualize long lists

console.log('=== BLOCKING vs NON-BLOCKING DEMO ===');

// ============================================
// 🔴 BLOCKING CODE EXAMPLES
// ============================================

console.log('\n🔴 BLOCKING CODE (Synchronous):');

// Example 1: CPU-Intensive Loop
function blockingLoop() {
  console.log('Starting CPU-intensive task...');
  const start = Date.now();

  // This BLOCKS the main thread
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    // 1 billion iterations
    sum += Math.sqrt(i) * Math.random();
  }

  const duration = Date.now() - start;
  console.log(`Task completed in ${duration}ms`);
  console.log('Result:', sum);
  return sum;
}

// Example 2: Sync File/Network Operations (simulated)
function blockingAPIRequest(url) {
  console.log(`Fetching ${url}...`);
  const start = Date.now();

  // Simulate network delay - BLOCKS
  while (Date.now() - start < 2000) {
    // Waiting... (blocks everything!)
  }

  console.log(`Received response from ${url}`);
  return `Data from ${url}`;
}

// Example 3: Blocking UI Update
function blockingUIExample() {
  console.log('Button clicked...');

  // This will freeze the UI
  blockingLoop();

  console.log('UI unfrozen - user can interact again');
  // Button stays "pressed" until loop finishes
}

// ============================================
// 🟢 NON-BLOCKING CODE EXAMPLES
// ============================================

console.log('\n🟢 NON-BLOCKING CODE (Asynchronous):');

// Example 1: Using setTimeout (defer execution)
function nonBlockingTimer() {
  console.log('Starting non-blocking timer...');

  setTimeout(() => {
    console.log('Timer completed after 2 seconds');
    // This runs later, doesn't block
  }, 2000);

  console.log('Timer started, main thread continues...');
}

// Example 2: Using Promises
function nonBlockingAPIRequest(url) {
  console.log(`Starting async request to ${url}...`);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Async response from ${url}`);
      resolve(`Async data from ${url}`);
    }, 2000);
  });
}

// Example 3: Using async/await (still non-blocking!)
async function nonBlockingAsync() {
  console.log('Starting async operations...');

  const result1 = await nonBlockingAPIRequest('/api/data');
  console.log('Got result 1:', result1);

  const result2 = await nonBlockingAPIRequest('/api/users');
  console.log('Got result 2:', result2);

  console.log('All async operations completed!');
}

// ============================================
// 🎯 REAL-WORLD COMPARISON
// ============================================

console.log('\n🎯 REAL-WORLD SCENARIO: Loading Dashboard');

// 🔴 BLOCKING VERSION (BAD)
function loadDashboardBlocking() {
  console.log('\n🔴 BLOCKING DASHBOARD LOAD:');

  console.log('1. Fetching user data...');
  blockingAPIRequest('/api/user'); // Blocks for 2s

  console.log('2. Fetching posts...');
  blockingAPIRequest('/api/posts'); // Blocks for 2s

  console.log('3. Loading notifications...');
  blockingAPIRequest('/api/notifications'); // Blocks for 2s

  console.log('4. Dashboard loaded (after 6s blocking)');
  console.log('⚠️ UI was frozen the whole time!');
  console.log("❌ User couldn't click, scroll, or interact");
}

// 🟢 NON-BLOCKING VERSION (GOOD)
async function loadDashboardNonBlocking() {
  console.log('\n🟢 NON-BLOCKING DASHBOARD LOAD:');

  console.log('1. Starting all async requests...');

  // Start all requests concurrently
  const userPromise = nonBlockingAPIRequest('/api/user');
  const postsPromise = nonBlockingAPIRequest('/api/posts');
  const notificationsPromise = nonBlockingAPIRequest('/api/notifications');

  console.log('2. All requests initiated!');
  console.log('✅ UI remains responsive');
  console.log('✅ User can interact while loading');

  // Wait for all to complete
  const [user, posts, notifications] = await Promise.all([
    userPromise,
    postsPromise,
    notificationsPromise,
  ]);

  console.log('3. All data loaded!');
  console.log('✅ Total time: ~2s (not 6s)');
  console.log('✅ User had smooth experience');
}

// ============================================
// 📈 PERFORMANCE DEMONSTRATION
// ============================================

console.log('\n📈 PERFORMANCE COMPARISON DEMO');

function demonstrateBlockingVsNonBlocking() {
  let lastClickTime = Date.now();

  // Create interactive UI
  console.log('\nCreating interactive test environment...');
  console.log("Try clicking 'immediate' button during operations");

  // Setup click handlers to show responsiveness
  const immediateAction = () => {
    const now = Date.now();
    const responseTime = now - lastClickTime;
    console.log(`✅ Immediate action! Response time: ${responseTime}ms`);
    lastClickTime = now;
  };

  // Test 1: Blocking operation
  console.log('\n--- TEST 1: During BLOCKING Operation ---');
  console.log('Starting blocking computation...');

  // Try to click during this
  setTimeout(() => {
    console.log('Try clicking now (should be delayed)...');
    immediateAction(); // Will be delayed!
  }, 100);

  // Start blocking
  const blockStart = Date.now();
  let blockSum = 0;
  for (let i = 0; i < 50000000; i++) {
    // 50 million iterations
    blockSum += i;
  }
  console.log(`Blocking operation took: ${Date.now() - blockStart}ms`);

  // Test 2: Non-blocking operation
  console.log('\n--- TEST 2: During NON-BLOCKING Operation ---');
  console.log('Starting non-blocking timeout...');

  // This won't block
  setTimeout(() => {
    console.log('Non-blocking timeout completed');
  }, 100);

  console.log('Try clicking now (should work immediately)...');
  immediateAction(); // Works immediately!
}

// ============================================
// 🚨 DANGER ZONE: Common Blocking Pitfalls
// ============================================

console.log('\n🚨 COMMON BLOCKING PITFALLS');

function commonBlockingMistakes() {
  console.log('\n1. ❌ Synchronous Loops in Event Handlers:');
  document.addEventListener('click', () => {
    // This freezes the browser!
    // for (let i = 0; i < 1000000000; i++) {}
  });

  console.log('\n2. ❌ Blocking DOM Updates:');
  // BAD:
  function updateDOMBlocking() {
    const element = document.createElement('div');
    for (let i = 0; i < 100000; i++) {
      element.textContent = `Item ${i}`; // Reflows/repaints each time
    }
    document.body.appendChild(element);
  }

  // GOOD:
  function updateDOMNonBlocking() {
    const element = document.createElement('div');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 100000; i++) {
      const item = document.createElement('div');
      item.textContent = `Item ${i}`;
      fragment.appendChild(item);
    }

    element.appendChild(fragment);
    document.body.appendChild(element); // Single reflow
  }

  console.log('\n3. ❌ Large JSON.parse/JSON.stringify:');
  const bigData = { data: new Array(1000000).fill('value') };

  // BAD in main thread:
  // const jsonString = JSON.stringify(bigData); // Can block

  // BETTER: Use setTimeout to chunk
  function stringifyInChunks(data, chunkSize = 10000) {
    return new Promise((resolve) => {
      let result = '';
      let index = 0;

      function processChunk() {
        const chunk = data.data.slice(index, index + chunkSize);
        result += JSON.stringify(chunk);
        index += chunkSize;

        if (index < data.data.length) {
          setTimeout(processChunk, 0); // Yield to browser
        } else {
          resolve(result);
        }
      }

      setTimeout(processChunk, 0);
    });
  }
}

// ============================================
// 🎪 INTERACTIVE DEMONSTRATION
// ============================================

async function interactiveDemo() {
  console.log('\n' + '='.repeat(50));
  console.log('INTERACTIVE DEMONSTRATION');
  console.log('='.repeat(50));

  // Simulate a progress bar
  function updateProgress(percent) {
    const bar = '█'.repeat(percent / 2) + '░'.repeat(50 - percent / 2);
    console.log(`[${bar}] ${percent}%`);
  }

  console.log('\n🔴 WITH BLOCKING CODE:');
  console.log('Progress bar will JUMP from 0% to 100%');

  // Blocking progress (bad)
  for (let i = 0; i <= 100; i += 10) {
    // Simulate work
    const start = Date.now();
    while (Date.now() - start < 100) {}

    updateProgress(i);
  }

  console.log('\n🟢 WITH NON-BLOCKING CODE:');
  console.log('Progress bar will update smoothly');

  // Non-blocking progress (good)
  for (let i = 0; i <= 100; i += 10) {
    await new Promise((resolve) => {
      setTimeout(() => {
        updateProgress(i);
        resolve();
      }, 100);
    });
  }
}

// ============================================
// 📋 DECISION GUIDE: When to Use Each
// ============================================

console.log('\n' + '='.repeat(50));
console.log('DECISION GUIDE');
console.log('='.repeat(50));

console.log('\n🔴 USE BLOCKING CODE WHEN:');
console.log('✓ Processing small datasets (< 1000 items)');
console.log('✓ Simple calculations that complete in < 16ms');
console.log('✓ Operations that MUST complete in sequence');
console.log('✓ Initial page setup/configuration');
console.log('✓ Synchronous validation/parsing');

console.log('\n🟢 USE NON-BLOCKING CODE WHEN:');
console.log('✓ Network requests (API calls, fetch)');
console.log('✓ File I/O operations');
console.log('✓ Timers and delays (setTimeout, setInterval)');
console.log('✓ Processing large datasets');
console.log('✓ Complex calculations (> 16ms)');
console.log('✓ Any user-facing operation');
console.log('✓ DOM updates on large pages');
console.log('✓ Database queries');

console.log('\n' + '='.repeat(50));
console.log('GOLDEN RULE:');
console.log('If an operation takes > 50ms, make it non-blocking!');
console.log('Frame budget: 16ms for 60fps smoothness');
console.log('='.repeat(50));

// ============================================
// 🧪 RUN THE DEMOS
// ============================================

// Uncomment to run specific demos:

// ⚠️ Warning: Blocking code will freeze execution!
// console.log("\nRunning blocking demo...");
// loadDashboardBlocking();

console.log('\nRunning non-blocking demo...');
loadDashboardNonBlocking()
  .then(() => {
    console.log('\nRunning interactive demo...');
    return interactiveDemo();
  })
  .then(() => {
    console.log('\n' + '='.repeat(50));
    console.log('SUMMARY:');
    console.log('='.repeat(50));
    console.log('🔴 Blocking = Simple but dangerous');
    console.log('🟢 Non-blocking = Complex but essential');
    console.log('\nIn modern JavaScript, prefer non-blocking patterns!');
    console.log('Use: async/await > Promises > callbacks');
    console.log('For CPU-heavy tasks: Web Workers');
  });

// Simulate immediate user interaction
setTimeout(() => {
  console.log('\n👆 User clicking around - UI remains responsive!');
}, 500);
