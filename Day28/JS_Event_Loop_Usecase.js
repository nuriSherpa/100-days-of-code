// Event Loop Use Case: Handling User Interactions

// In a web application, you might have a button that, when clicked, fetches data from an API and updates the UI. The event loop allows the application to remain responsive while waiting for the API response.

const button = document.getElementById('fetchButton');
const output = document.getElementById('output');

button.addEventListener('click', () => {
  output.textContent = 'Loading...';

  // Simulate an API call with setTimeout
  setTimeout(() => {
    const data = { message: 'Data fetched successfully!' };
    output.textContent = data.message;
  }, 2000);
});

// In this example, when the button is clicked, the UI immediately updates to show "Loading...". The setTimeout simulates an API call that takes 2 seconds to complete. During this time, the event loop allows the UI to remain responsive, and once the data is "fetched", it updates the output with the new message.    

// More Uese Cases:

// 1. Real-time Chat Application: The event loop allows for handling incoming messages and user interactions without blocking the UI.

// 2. Animation and Game Development: The event loop enables smooth animations and game mechanics by processing user input and rendering frames efficiently.

// 3. Server-Side Applications: In Node.js, the event loop allows for handling multiple client requests concurrently without blocking the server, making it ideal for building scalable applications.   
