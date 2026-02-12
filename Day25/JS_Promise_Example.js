// =============================================
// DAY 25: PROMISE CHAINING - COMPLETE EXAMPLES
// =============================================

// Mock API functions that return promises
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, name: 'Alice', role: 'admin' });
      } else if (id === 2) {
        resolve({ id: 2, name: 'Bob', role: 'user' });
      } else {
        reject(new Error(`User ${id} not found`));
      }
    }, 1000);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = {
        1: [
          { id: 101, title: 'Admin Post 1', userId: 1 },
          { id: 102, title: 'Admin Post 2', userId: 1 },
        ],
        2: [{ id: 201, title: 'User Post 1', userId: 2 }],
      };
      resolve(posts[userId] || []);
    }, 800);
  });
}

function fetchComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comments = {
        101: ['Great post!', 'Thanks for sharing'],
        102: ['Very informative'],
        201: ['Nice!', 'Cool', 'Awesome'],
      };
      resolve(comments[postId] || []);
    }, 500);
  });
}

function updateUserLog(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`📝 Log: User ${id} accessed at ${new Date().toLocaleTimeString()}`);
      resolve();
    }, 200);
  });
}

function riskyOperation() {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    setTimeout(() => {
      if (random > 0.3) {
        resolve(`✅ Success (${random.toFixed(2)})`);
      } else {
        reject(new Error(`❌ Failed (${random.toFixed(2)})`));
      }
    }, 500);
  });
}

// =============================================
// EXAMPLE 1: BASIC PROMISE CHAINING
// =============================================
console.log('\n📌 EXAMPLE 1: Basic Promise Chaining');
console.log('====================================');

fetchUser(1)
  .then((user) => {
    console.log('Step 1: User fetched', user.name);
    return fetchPosts(user.id);
  })
  .then((posts) => {
    console.log('Step 2: Posts fetched', posts.length, 'posts');
    console.log('   Posts:', posts.map((p) => p.title).join(', '));
    return fetchComments(posts[0].id);
  })
  .then((comments) => {
    console.log('Step 3: Comments fetched', comments.length, 'comments');
    console.log('   Comments:', comments.join(', '));
    return 'All data fetched successfully!';
  })
  .then((message) => {
    console.log('Step 4:', message);
  })
  .catch((error) => {
    console.error('Error in chain:', error.message);
  });

// =============================================
// EXAMPLE 2: ERROR HANDLING & RECOVERY
// =============================================
setTimeout(() => {
  console.log('\n📌 EXAMPLE 2: Error Handling & Recovery');
  console.log('========================================');

  fetchUser(99) // Non-existent user
    .then((user) => fetchPosts(user.id))
    .then((posts) => console.log('Posts:', posts))
    .catch((error) => {
      console.error('❌ Error caught:', error.message);
      return { id: 0, name: 'Guest User', role: 'guest' }; // Recovery value
    })
    .then((user) => {
      console.log('✅ Recovered with:', user);
      return fetchPosts(user.id);
    })
    .then((posts) => {
      console.log('Guest posts:', posts.length ? posts : 'No posts');
    })
    .catch((error) => {
      console.error("❌ This error won't happen:", error.message);
    });
}, 2000);

// =============================================
// EXAMPLE 3: MULTIPLE CATCH BLOCKS
// =============================================
setTimeout(() => {
  console.log('\n📌 EXAMPLE 3: Multiple Catch Blocks');
  console.log('===================================');

  fetchUser(2)
    .then((user) => {
      console.log('User found:', user.name);
      return updateUserLog(user.id);
    })
    .then(() => {
      console.log('Log updated');
      return riskyOperation(); // Might fail
    })
    .catch((error) => {
      console.log('⚠️ Warning: Operation failed but continuing...');
      console.log('   Reason:', error.message);
      return 'Default data'; // Recovery value
    })
    .then((data) => {
      console.log('Processing with:', data);
      return fetchPosts(2);
    })
    .then((posts) => {
      console.log(
        'Final result - Posts:',
        posts.map((p) => p.title),
      );
    })
    .catch((error) => {
      console.error('❌ Critical error:', error.message);
    });
}, 4000);

// =============================================
// EXAMPLE 4: CONDITIONAL CHAINING
// =============================================
setTimeout(() => {
  console.log('\n📌 EXAMPLE 4: Conditional Chaining');
  console.log('===================================');

  function getDashboard(role) {
    if (role === 'admin') {
      return Promise.resolve({
        type: 'admin',
        widgets: ['users', 'analytics', 'settings'],
      });
    } else {
      return Promise.resolve({
        type: 'user',
        widgets: ['profile', 'posts'],
      });
    }
  }

  fetchUser(1)
    .then((user) => {
      console.log(`User role: ${user.role}`);
      return getDashboard(user.role);
    })
    .then((dashboard) => {
      console.log(`Dashboard type: ${dashboard.type}`);
      console.log(`Widgets: ${dashboard.widgets.join(', ')}`);
      return dashboard;
    })
    .then((dashboard) => {
      // Chain continues with dashboard data
      console.log('✅ Dashboard loaded successfully');
    })
    .catch((error) => console.error('❌ Error:', error.message));
}, 6000);

// =============================================
// EXAMPLE 5: PASSING MULTIPLE VALUES
// =============================================
setTimeout(() => {
  console.log('\n📌 EXAMPLE 5: Passing Multiple Values');
  console.log('=====================================');

  fetchUser(1)
    .then((user) => {
      return Promise.all([
        Promise.resolve(user), // Keep user
        fetchPosts(user.id), // Get posts
        updateUserLog(user.id), // Update log
      ]);
    })
    .then(([user, posts, logResult]) => {
      console.log(`User: ${user.name} (${user.role})`);
      console.log(`Posts: ${posts.length}`);
      console.log(`Log: Updated successfully`);

      // Pass multiple values to next then
      return { user, posts, timestamp: Date.now() };
    })
    .then(({ user, posts, timestamp }) => {
      console.log(`Data processed at: ${new Date(timestamp).toLocaleTimeString()}`);
      console.log(`Summary: ${user.name} has ${posts.length} posts`);
    });
}, 8000);

// =============================================
// EXAMPLE 6: FINALLY BLOCK
// =============================================
setTimeout(() => {
  console.log('\n📌 EXAMPLE 6: Finally Block');
  console.log('============================');

  function showLoading() {
    console.log('⏳ Loading...');
  }

  function hideLoading() {
    console.log('✅ Loading complete');
  }

  showLoading();

  fetchUser(1)
    .then((user) => fetchPosts(user.id))
    .then((posts) => {
      console.log(`📊 Data loaded: ${posts.length} posts`);
      throw new Error('Simulated error!'); // Try removing this
    })
    .catch((error) => {
      console.error('❌ Error:', error.message);
    })
    .finally(() => {
      hideLoading(); // Always executes
      console.log('🧹 Cleanup completed');
    });
}, 10000);

// =============================================
// EXAMPLE 7: SEQUENTIAL PROMISES
// =============================================
setTimeout(() => {
  console.log('\n📌 EXAMPLE 7: Sequential Promises');
  console.log('=================================');

  const userIds = [1, 2, 3]; // 3 will fail

  console.log('Processing users sequentially:');

  let chain = Promise.resolve();

  userIds.forEach((id) => {
    chain = chain
      .then(() => {
        console.log(`\n🔍 Fetching user ${id}...`);
        return fetchUser(id);
      })
      .then((user) => {
        console.log(`✅ Found: ${user.name}`);
        return fetchPosts(user.id);
      })
      .then((posts) => {
        console.log(`📝 Posts: ${posts.length}`);
      })
      .catch((error) => {
        console.log(`❌ User ${id}: ${error.message}`);
      });
  });

  chain.then(() => {
    console.log('\n🎯 All users processed!');
  });
}, 12000);

// =============================================
// EXAMPLE 8: ASYNC/AWAIT VERSION (FOR COMPARISON)
// =============================================
setTimeout(() => {
  console.log('\n📌 EXAMPLE 8: Async/Await Alternative');
  console.log('=====================================');

  async function fetchUserData(userId) {
    try {
      console.log(`Fetching data for user ${userId}...`);

      const user = await fetchUser(userId);
      console.log(`User: ${user.name}`);

      const posts = await fetchPosts(user.id);
      console.log(`Posts: ${posts.length}`);

      if (posts.length > 0) {
        const comments = await fetchComments(posts[0].id);
        console.log(`Comments on first post: ${comments.length}`);
      }

      return { user, posts };
    } catch (error) {
      console.error(`Failed: ${error.message}`);
      throw error;
    }
  }

  fetchUserData(1)
    .then((data) => console.log('✅ Async function completed'))
    .catch((error) => console.error('❌ Async function failed'));
}, 16000);
