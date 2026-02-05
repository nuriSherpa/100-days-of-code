// Nested callbacks - Callback Hell
function getUserData(userId, callback) {
  console.log(`Getting user ${userId}...`);
  setTimeout(() => {
    const user = { id: userId, name: 'John' };
    callback(user);
  }, 1000);
}

function getUserPosts(user, callback) {
  console.log(`Getting posts for ${user.name}...`);
  setTimeout(() => {
    const posts = ['Post 1', 'Post 2'];
    callback(posts);
  }, 1000);
}

function getPostComments(post, callback) {
  console.log(`Getting comments for ${post}...`);
  setTimeout(() => {
    const comments = ['Comment 1', 'Comment 2'];
    callback(comments);
  }, 1000);
}

// Callback hell - nested callbacks
getUserData(1, function (user) {
  getUserPosts(user, function (posts) {
    posts.forEach(function (post) {
      getPostComments(post, function (comments) {
        console.log(`Comments for ${post}:`, comments);
      });
    });
  });
});



