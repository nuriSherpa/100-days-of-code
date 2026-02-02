console.log('\n📄 FILE READING COMPARISON:');

// Synchronous file reading (pseudo-code - would block)
function readFileSync(filename) {
  console.log(`Reading ${filename} synchronously...`);
  // Blocks until file is completely read
  const data = `Content of ${filename}`;
  console.log(`Finished reading ${filename}`);
  return data;
}

// Asynchronous file reading (pseudo-code - non-blocking)
function readFileAsync(filename, callback) {
  console.log(`Starting to read ${filename} asynchronously...`);

  setTimeout(() => {
    const data = `Content of ${filename}`;
    console.log(`Finished reading ${filename}`);
    callback(data);
  }, 2000); // Simulate 2-second read time
}

// Sync version blocks everything
console.log('\n--- Synchronous Version ---');
const file1 = readFileSync('file1.txt');
const file2 = readFileSync('file2.txt');
console.log('Both files loaded:', file1, file2);
console.log('Only now can we update UI or handle user input');

// Async version is non-blocking
console.log('\n--- Asynchronous Version ---');
readFileAsync('file1.txt', (data1) => {
  console.log('Got file1:', data1);
});

readFileAsync('file2.txt', (data2) => {
  console.log('Got file2:', data2);
});

console.log('UI is responsive while files load in background!');
console.log('We can handle user clicks, animations, etc.');

console.log('\n🌐 NETWORK REQUEST COMPARISON:');

// Simulating API calls
const API_URL = 'https://api.example.com/data';

function syncAPIRequest(endpoint) {
  console.log(`🔴 Making SYNC request to ${endpoint}`);
  // This would freeze the browser for 3 seconds!
  const start = Date.now();
  while (Date.now() - start < 3000) {} // Block for 3 seconds
  console.log(`✅ Received response from ${endpoint}`);
  return `Data from ${endpoint}`;
}

function asyncAPIRequest(endpoint, callback) {
  console.log(`🟢 Making ASYNC request to ${endpoint}`);

  setTimeout(() => {
    console.log(`✅ Received response from ${endpoint}`);
    callback(`Data from ${endpoint}`);
  }, 3000); // Non-blocking 3-second delay
}

// Sync version would freeze everything
// console.log("--- DON'T DO THIS ---");
// const userData = syncAPIRequest("/users");
// const postsData = syncAPIRequest("/posts");
// console.log("Data:", userData, postsData);

// Async version is much better
console.log('--- Async Version ---');
asyncAPIRequest('/users', (userData) => {
  console.log('Processing user data:', userData);
  // Update UI with user data
});

asyncAPIRequest('/posts', (postsData) => {
  console.log('Processing posts data:', postsData);
  // Update UI with posts
});

console.log('User can continue browsing while data loads!');
console.log('Animations still run smoothly!');

console.log('\n🌐 NETWORK REQUEST COMPARISON:');

// Simulating API calls
// const API_URL = 'https://api.example.com/data';

function syncAPIRequest(endpoint) {
  console.log(`🔴 Making SYNC request to ${endpoint}`);
  // This would freeze the browser for 3 seconds!
  const start = Date.now();
  while (Date.now() - start < 3000) {} // Block for 3 seconds
  console.log(`✅ Received response from ${endpoint}`);
  return `Data from ${endpoint}`;
}

function asyncAPIRequest(endpoint, callback) {
  console.log(`🟢 Making ASYNC request to ${endpoint}`);

  setTimeout(() => {
    console.log(`✅ Received response from ${endpoint}`);
    callback(`Data from ${endpoint}`);
  }, 3000); // Non-blocking 3-second delay
}

// Sync version would freeze everything
// console.log("--- DON'T DO THIS ---");
// const userData = syncAPIRequest("/users");
// const postsData = syncAPIRequest("/posts");
// console.log("Data:", userData, postsData);

// Async version is much better
console.log('--- Async Version ---');
asyncAPIRequest('/users', (userData) => {
  console.log('Processing user data:', userData);
  // Update UI with user data
});

asyncAPIRequest('/posts', (postsData) => {
  console.log('Processing posts data:', postsData);
  // Update UI with posts
});

console.log('User can continue browsing while data loads!');
console.log('Animations still run smoothly!');
