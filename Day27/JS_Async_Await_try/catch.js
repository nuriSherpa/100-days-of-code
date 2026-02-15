// Example of using async/await with try/catch
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    // Handle the error appropriately
    return null; // You can return a fallback value
  }
}

// Example of using async/await with multiple asynchronous operations and error handling
async function fetchUserAndPosts(userId) {
  try {
    const userResponse = await fetch(`https://api.example.com/users/${userId}`);
    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data');
    }
    const user = await userResponse.json();
    console.log('User data:', user);

    const postsResponse = await fetch(`https://api.example.com/users/${userId}/posts`);
    if (!postsResponse.ok) {
      throw new Error('Failed to fetch user posts');
    }
    const posts = await postsResponse.json();
    console.log('User posts:', posts);

    return { user, posts };
  } catch (error) {
    console.error('Error fetching user and posts:', error.message);
    // Handle the error appropriately
    return null; // You can return a fallback value
  }
}
