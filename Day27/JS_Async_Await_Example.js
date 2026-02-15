// Example of using async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const user = await response.json();
    console.log('User data:', user);
    return user;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    // Handle the error appropriately
    return null; // You can return a fallback value
  }
}

// Example of using async/await with multiple asynchronous operations
async function fetchUserPosts(userId) {
  try {
    const user = await fetchUserData(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const response = await fetch(`https://api.example.com/users/${userId}/posts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const posts = await response.json();
    console.log('User posts:', posts);
    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error.message);
    // Handle the error appropriately
    return []; // You can return a fallback value
  }
}

// Example of using async/await with a finally block
async function saveData(data) {
  try {
    const response = await fetch('https://api.example.com/save', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log('Save successful:', result);
    return result;
  } catch (error) {
    console.error('Error saving data:', error.message);
    // Handle the error appropriately
    return null; // You can return a fallback value
  } finally {
    console.log('Cleanup actions can be performed here');
  }
}
