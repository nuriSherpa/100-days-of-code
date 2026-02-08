// Example 1: Simulating API calls
const getUser = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: `User ${userId}` });
    }, 1000);
  });
};

const getPosts = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1', userId },
        { id: 2, title: 'Post 2', userId },
      ]);
    }, 800);
  });
};

// Chaining API calls
getUser(1)
  .then((user) => {
    console.log('Found user:', user.name);
    return getPosts(user.id);
  })
  .then((posts) => {
    console.log("User's posts:", posts);
    return posts.length;
  })
  .then((postCount) => {
    console.log(`Total posts: ${postCount}`);
  });

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resolved after ${ms}ms`);
    }, ms);
  });
};

// Example 2: Handling multiple promises
const promise1 = delay(1000);
const promise2 = delay(500);
const promise3 = delay(1500);

// Execute promises in sequence
promise1
  .then(() => {
    console.log('Promise 1 done');
    return promise2;
  })
  .then(() => {
    console.log('Promise 2 done');
    return promise3;
  })
  .then(() => {
    console.log('All promises completed in sequence');
  });

// Example 3: Error handling with .then()
const riskyOperation = (failProbability) => {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    setTimeout(() => {
      if (random < failProbability) {
        reject(new Error(`Failed with probability ${random}`));
      } else {
        resolve(`Succeeded with value ${random}`);
      }
    }, 1000);
  });
};

riskyOperation(0.3)
  .then(
    (result) => {
      console.log('Success:', result);
      return 'Proceeding to next step';
    },
    (error) => {
      console.log('Handled in second callback:', error.message);
      return 'Recovered from error';
    },
  )
  .then((message) => {
    console.log('Status:', message);
  });

// 1. Immediate resolution/rejection
const resolvedPromise = Promise.resolve('Immediately resolved');
const rejectedPromise = Promise.reject(new Error('Immediately rejected'));

// 2. Wrapping callbacks as promises
const readFileAsync = (filename) => {
  return new Promise((resolve, reject) => {
    // Simulating fs.readFile callback
    setTimeout(() => {
      if (filename === 'valid.txt') {
        resolve(`Contents of ${filename}`);
      } else {
        reject(new Error(`File ${filename} not found`));
      }
    }, 500);
  });
};

// 3. Promise that times out
const fetchWithTimeout = (url, timeout = 3000) => {
  return new Promise((resolve, reject) => {
    // Simulating fetch
    const timer = setTimeout(() => {
      reject(new Error(`Request to ${url} timed out after ${timeout}ms`));
    }, timeout);

    // Simulating successful response
    setTimeout(() => {
      clearTimeout(timer);
      resolve(`Response from ${url}`);
    }, Math.random() * 4000); // Random delay up to 4 seconds
  });
};

// Usage
fetchWithTimeout('https://api.example.com/data', 2000)
  .then((response) => {
    console.log('Got response:', response);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
