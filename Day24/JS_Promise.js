// Promises are JavaScript objects that represent the eventual completion (or failure) of an asynchronous operation. They help us avoid "callback hell" and make asynchronous code easier to read and maintain.
// Basic promise creation
const myPromise = new Promise((resolve, reject) => {
  // Async operation goes here
  setTimeout(() => {
    const success = true; // Change to false to see rejection

    if (success) {
      resolve('Operation completed successfully!');
    } else {
      reject('Operation failed!');
    }
  }, 1000);
});

// Example: Promise that resolves after a delay
const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resolved after ${ms}ms`);
    }, ms);
  });
};

// Example: Promise that might fail
const fetchData = (shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to fetch data'));
      } else {
        resolve({ id: 1, name: 'John Doe', email: 'john@example.com' });
      }
    }, 1500);
  });
};

// Basic .then() usage
myPromise.then(
  (result) => {
    console.log('Success:', result);
  },
  (error) => {
    console.log('Error:', error);
  },
);

// Chaining .then() calls
delay(1000)
  .then((message) => {
    console.log(message); // "Resolved after 1000ms"
    return 'Step 1 complete';
  })
  .then((message) => {
    console.log(message); // "Step 1 complete"
    return delay(500);
  })
  .then((message) => {
    console.log(message); // "Resolved after 500ms"
    console.log('All operations complete!');
  });

// Handling data fetching
fetchData()
  .then((user) => {
    console.log('User data:', user);
    return user.name; // Pass to next .then()
  })
  .then((userName) => {
    console.log('User name:', userName);
    return fetchData(true); // This will fail
  })
  .then((data) => {
    // This won't execute because previous promise rejected
    console.log("This won't show");
  })
  .catch((error) => {
    console.error('Caught error:', error.message);
  });
