console.log('\n🔄 ASYNC PATTERNS IN JAVASCRIPT:');

// Pattern 1: Callbacks (Original)
console.log('1. CALLBACKS:');
function getDataCallback(callback) {
  console.log('Fetching data...');
  setTimeout(() => {
    callback('Data received!');
  }, 1000);
}

getDataCallback((result) => {
  console.log(result);
});

// Pattern 2: Promises (ES6)
console.log('\n2. PROMISES:');
function getDataPromise() {
  return new Promise((resolve) => {
    console.log('Fetching data with Promise...');
    setTimeout(() => {
      resolve('Promise resolved!');
    }, 1000);
  });
}

getDataPromise().then((result) => console.log(result));

// Pattern 3: Async/Await (ES2017)
console.log('\n3. ASYNC/AWAIT:');
async function getDataAsync() {
  console.log('Fetching data with async/await...');
  const result = await new Promise((resolve) => {
    setTimeout(() => resolve('Async/await done!'), 1000);
  });
  console.log(result);
}

getDataAsync();
