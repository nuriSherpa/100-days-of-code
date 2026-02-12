// Promise Chaining
// Simple chain of async operations
new Promise((resolve) => {
  setTimeout(() => resolve(1), 1000);
})
  .then((result) => {
    console.log(result); // 1
    return result * 2;
  })
  .then((result) => {
    console.log(result); // 2
    return result * 2;
  })
  .then((result) => {
    console.log(result); // 4
    return result * 2;
  });

// Return Values in Chains
// Different ways to return values
fetch('/api/user')
  .then((response) => {
    // Return a primitive value
    return response.json();
  })
  .then((user) => {
    console.log('User:', user);
    // Return another promise
    return fetch(`/api/posts/${user.id}`);
  })
  .then((response) => response.json())
  .then((posts) => {
    // Return undefined (still passes through)
    console.log('Posts:', posts);
    // Implicit return undefined
  })
  .then(() => {
    console.log('Chain continues!');
  });

// Error Flow in Promise Chains
// Basic error handling
function riskyOperation() {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    if (random > 0.5) {
      resolve('Success!');
    } else {
      reject(new Error('Failed!'));
    }
  });
}

// Catch at the end
riskyOperation()
  .then((result) => {
    console.log('Step 1:', result);
    return riskyOperation();
  })
  .then((result) => {
    console.log('Step 2:', result);
    return riskyOperation();
  })
  .then((result) => {
    console.log('Step 3:', result);
  })
  .catch((error) => {
    console.error('Error occurred:', error.message);
  });

//Error Recovery
// Recover from errors and continue chain
fetch('/api/user')
  .then((response) => {
    if (!response.ok) {
      throw new Error('User not found');
    }
    return response.json();
  })
  .catch((error) => {
    console.log('Fetch failed, using cached data');
    return { id: 0, name: 'Guest User' }; // Recovery value
  })
  .then((user) => {
    console.log('User:', user);
    return fetch(`/api/posts/${user.id}`);
  })
  .then((response) => response.json())
  .then((posts) => console.log('Posts:', posts))
  .catch((error) => console.error('Failed to get posts:', error));

//Multiple Catch Blocks
// Specific error handling at different levels
someAsyncOperation()
  .then((result) => {
    // First operation
    return anotherAsyncOperation(result);
  })
  .catch((error) => {
    // Handle errors from first two operations
    console.error('First part failed:', error);
    return defaultResult;
  })
  .then((result) => {
    // Continue with default value
    return thirdAsyncOperation(result);
  })
  .then((finalResult) => {
    console.log('Final:', finalResult);
  })
  .catch((error) => {
    // Handle errors from third operation
    console.error('Final step failed:', error);
  });
