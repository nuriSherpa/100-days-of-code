// Execute promises one after another
const userIds = [1, 2, 3, 4, 5];

let promise = Promise.resolve();

userIds.forEach((id) => {
  promise = promise.then(() => fetchUser(id)).then((user) => console.log('User:', user));
});

// Branch based on results
getUserRole()
  .then((role) => {
    if (role === 'admin') {
      return getAdminDashboard();
    } else {
      return getUserDashboard();
    }
  })
  .then((dashboard) => renderDashboard(dashboard))
  .catch((error) => console.error('Access denied:', error));

// Keep initial values accessible
getUser()
  .then((user) => {
    return Promise.all([Promise.resolve(user), getPosts(user.id)]);
  })
  .then(([user, posts]) => {
    console.log(`${user.name} has ${posts.length} posts`);
    return Promise.all([user, posts, getComments(posts)]);
  })
  .then(([user, posts, comments]) => {
    // All data available
    renderProfile(user, posts, comments);
  });

// Common Pitfalls and Solutions
// ❌ Wrong: Missing return
getData()
  .then((data) => {
    processData(data); // No return!
  })
  .then((result) => {
    console.log(result); // undefined
  });

//✅ Correct: Always return
getData()
  .then((data) => {
    return processData(data); // Return the promise
  })
  .then((result) => {
    console.log(result); // Processed data
  });

//❌ Wrong: Nested chains
getUser().then((user) => {
  getPosts(user.id).then((posts) => {
    // Avoid nesting
    console.log(posts);
  });
});

//✅ Correct: Flat chain
getUser()
  .then((user) => getPosts(user.id))
  .then((posts) => console.log(posts));

//Async/Await Alternative
// Same logic but cleaner with async/await
async function processUserData() {
  try {
    const user = await getUser();
    const posts = await getPosts(user.id);
    const comments = await getComments(posts);
    return { user, posts, comments };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
