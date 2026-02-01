// ❌ Current output will have ReferenceErrors
// ✅ Fix the code so it runs without errors
console.log('\n✅ Fixed Code:');

function variableHoistingFixed() {
  // Fix 1: Declare variables before using them
  var a;
  let b;
  const c = 30;

  console.log('Value of a:', a); // undefined
  console.log('Value of b:', b); // undefined (TDZ avoided)
  console.log('Value of c:', c); // 30

  a = 10;
  b = 20;

  if (true) {
    var a = 100; // Re-declares same variable
    let b = 200; // New block-scoped variable
    console.log('Inside block - b:', b); // 200
  }

  console.log('After block - a:', a); // 100 (var is function-scoped)
  console.log('After block - b:', b); // 20 (let is block-scoped)
}

variableHoistingFixed();

// ❌ All will log "i = 3"
// ✅ Fix so each function logs its expected index
console.log('\n✅ Fixed Solutions:');

// Solution 1: Use IIFE
console.log('Solution 1 - IIFE:');
function closureLoopFixed1() {
  var functions = [];

  for (var i = 0; i < 3; i++) {
    (function (index) {
      functions.push(function () {
        console.log('IIFE i =', index);
      });
    })(i);
  }

  functions[0](); // 0
  functions[1](); // 1
  functions[2](); // 2
}

closureLoopFixed1();

// ❌ this.name will be undefined
// ✅ Fix to properly access user.name
console.log('\n✅ Fixed Solutions:');

const userFixed = {
  name: 'John',
  hobbies: ['Reading', 'Gaming'],

  // Solution 1: Arrow function
  printHobbies1: function () {
    this.hobbies.forEach((hobby) => {
      console.log(this.name + ' likes ' + hobby);
    });
  },

  // Solution 2: Bind this
  printHobbies2: function () {
    this.hobbies.forEach(
      function (hobby) {
        console.log(this.name + ' likes ' + hobby);
      }.bind(this),
    );
  },

  // Solution 3: Store reference
  printHobbies3: function () {
    const self = this;
    this.hobbies.forEach(function (hobby) {
      console.log(self.name + ' likes ' + hobby);
    });
  },
};

// ❌ Original object gets mutated
// ✅ Fix to prevent mutation of original object
console.log('\n✅ Fixed Code:');

function objectMutationFixed() {
  const settings = {
    theme: 'dark',
    notifications: true,
    user: {
      name: 'Alice',
      preferences: {
        language: 'en',
        fontSize: 'medium',
      },
    },
  };

  // Solution 1: Deep copy with JSON (for simple objects)
  const deepCopy1 = JSON.parse(JSON.stringify(settings));
  deepCopy1.theme = 'light';
  deepCopy1.user.name = 'Bob';

  console.log('Original theme:', settings.theme); // "dark" ✓
  console.log('Original user name:', settings.user.name); // "Alice" ✓

  // Solution 2: structuredClone (modern browsers)
  const deepCopy2 = structuredClone
    ? structuredClone(settings)
    : JSON.parse(JSON.stringify(settings));
  deepCopy2.user.preferences.language = 'fr';

  console.log('Original language:', settings.user.preferences.language); // "en" ✓

  // Solution 3: Manual deep copy function
  function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    const copy = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopy(obj[key]);
      }
    }
    return copy;
  }

  const deepCopy3 = deepCopy(settings);
  deepCopy3.notifications = false;
  console.log('Original notifications:', settings.notifications); // true ✓
}

objectMutationFixed();

// ❌ Cannot chain .then() after .reduce()
// ✅ Fix the chaining or rewrite properly
console.log('\n✅ Fixed Code:');

function arrayMethodFixed() {
  const numbers = [1, 2, 3, 4, 5];

  // Correct chain
  const squaresOfEvens = numbers.filter((n) => n % 2 === 0).map((n) => n * n);

  const sum1 = squaresOfEvens.reduce((acc, curr) => acc + curr, 0);
  console.log('Sum of squares of evens:', sum1); // 20

  // Alternative: All in one chain
  const sum2 = numbers
    .filter((n) => n % 2 === 0)
    .map((n) => n * n)
    .reduce((acc, curr) => acc + curr, 0);

  console.log('One-chain result:', sum2); // 20

  // If you need to process after reduce, use a function
  const processResult = (total) => total * 2;
  const finalResult = processResult(sum2);
  console.log('Doubled result:', finalResult); // 40

  // Using reduce to both filter and map (advanced)
  const efficientResult = numbers.reduce((acc, curr) => {
    if (curr % 2 === 0) {
      acc += curr * curr;
    }
    return acc;
  }, 0);

  console.log('Efficient result:', efficientResult); // 20
}

arrayMethodFixed();

// ❌ Nested promises, poor error handling
// ✅ Fix with proper promise chaining and error handling
console.log('\n✅ Fixed Code:');

function promiseChainFixed() {
  function fetchUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random error
        if (Math.random() > 0.8) {
          reject(new Error('Failed to fetch user'));
        } else {
          resolve({ id: 1, name: 'John' });
        }
      }, 100);
    });
  }

  function fetchPosts(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.9) {
          reject(new Error('Failed to fetch posts'));
        } else {
          resolve(['Post1', 'Post2']);
        }
      }, 100);
    });
  }

  function fetchComments(postId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.95) {
          reject(new Error('Failed to fetch comments'));
        } else {
          resolve(['Comment1', 'Comment2']);
        }
      }, 100);
    });
  }

  // Solution 1: Proper promise chaining
  console.log('Solution 1 - Proper chaining:');
  fetchUser()
    .then((user) => {
      console.log('User fetched:', user);
      return fetchPosts(user.id);
    })
    .then((posts) => {
      console.log('Posts fetched:', posts);
      return fetchComments(posts[0]);
    })
    .then((comments) => {
      console.log('Comments fetched:', comments);
      console.log('All data loaded successfully!');
    })
    .catch((error) => {
      console.error('Error in chain:', error.message);
    })
    .finally(() => {
      console.log('Promise chain completed');
    });

  // Solution 2: Async/await (cleaner)
  console.log('\nSolution 2 - Async/await:');
  async function loadAllData() {
    try {
      const user = await fetchUser();
      console.log('User (async):', user);

      const posts = await fetchPosts(user.id);
      console.log('Posts (async):', posts);

      const comments = await fetchComments(posts[0]);
      console.log('Comments (async):', comments);

      return { user, posts, comments };
    } catch (error) {
      console.error('Async error:', error.message);
      throw error;
    } finally {
      console.log('Async function completed');
    }
  }

  // Start async function
  loadAllData();
}

// Note: Due to async nature, output might appear out of order
setTimeout(() => {
  promiseChainFixed();
}, 1000);

// ❌ Memory leak: Event listeners keep components in memory
// ✅ Fix with proper cleanup
console.log('\n✅ Fixed Code:');

function memoryLeakFixed() {
  function Component() {
    this.data = new Array(1000).fill('Some data');
    this.handleClick = this.handleClick.bind(this);

    // Store reference to bound function for removal
    this.boundHandleClick = this.handleClick.bind(this);
    document.addEventListener('click', this.boundHandleClick);

    this.processData = function () {
      console.log('Processing', this.data.length, 'items');
    };
  }

  Component.prototype.handleClick = function () {
    console.log('Clicked!', this.data.length);
  };

  // Add cleanup method
  Component.prototype.destroy = function () {
    // Remove event listener
    document.removeEventListener('click', this.boundHandleClick);

    // Clear references
    this.data = null;
    this.handleClick = null;
    this.boundHandleClick = null;
    this.processData = null;

    console.log('Component cleaned up');
  };

  // Using components with proper cleanup
  let components = [];

  for (let i = 0; i < 3; i++) {
    const comp = new Component();
    components.push(comp);
    comp.processData();
  }

  console.log('Created', components.length, 'components');

  // Proper cleanup
  components.forEach((comp) => comp.destroy());
  components = null; // Remove reference

  console.log('Components properly cleaned up ✓');

  // Alternative: Use WeakRef for automatic cleanup
  console.log('\nAlternative: Using WeakRef');

  const weakComponents = new Set();

  function createWeakComponent() {
    const comp = new Component();
    const weakRef = new WeakRef(comp);
    weakComponents.add(weakRef);
    return comp;
  }

  const weakComp = createWeakComponent();
  console.log('Weak component created');

  // When strong reference is removed, component can be GC'd
  // Note: This is advanced and not always necessary
}

// Since we're in Node.js (no document), simulate it
if (typeof document === 'undefined') {
  global.document = {
    addEventListener: () => console.log('Event listener added'),
    removeEventListener: () => console.log('Event listener removed'),
  };
}

memoryLeakFixed();
