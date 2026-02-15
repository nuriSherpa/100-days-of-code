// Today we'll explore how to handle errors in Promises and understand how errors propagate through promise chains.
// Basic catch example
fetchUserData(userId)
  .then((user) => {
    console.log('User data:', user);
    return fetchUserPosts(user);
  })
  .catch((error) => {
    console.error('Something went wrong:', error.message);
    // Handle the error appropriately
    return fallbackData; // You can return a fallback value
  });

//   The .finally() Method
showLoadingSpinner();

fetchData()
  .then((data) => {
    displayData(data);
  })
  .catch((error) => {
    showError(error);
  })
  .finally(() => {
    hideLoadingSpinner(); // Always runs
  });


// 
saveToDatabase(data)
  .then(result => {
    console.log('Save successful');
  })
  .catch(error => {
    console.error('Save failed');
  })
  .finally(() => {
    return closeDatabaseConnection(); // Waits for connection to close
  })
  .then(() => {
    console.log('Cleanup complete');
  });