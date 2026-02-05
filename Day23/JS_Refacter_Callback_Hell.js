// Solution 1: Named Functions (Modularization)

// Refactored using named functions
function handleOrderCompletion() {
  console.log('Order completed!');
}

function handleEmailSent(user, result) {
  sendConfirmationEmail(user.email, result, handleOrderCompletion);
}

function handleOrderProcessed(user, product, stock) {
  processOrder(user, product, stock, (result) => {
    handleEmailSent(user, result);
  });
}

function handleInventoryCheck(user, product) {
  getInventory(product.sku, (stock) => {
    if (stock > 0) {
      handleOrderProcessed(user, product, stock);
    }
  });
}

function handleProductInfo(user, details) {
  getProductInfo(details.productId, (product) => {
    handleInventoryCheck(user, product);
  });
}

function handleOrderDetails(user, orders) {
  getOrderDetails(orders[0].id, (details) => {
    handleProductInfo(user, details);
  });
}

function handleUserOrders(user) {
  getOrders(user.id, (orders) => {
    handleOrderDetails(user, orders);
  });
}

getUserData(userId, handleUserOrders);

// Solution 2: Promises

// Using Promises
getUserData(userId)
  .then((user) => getOrders(user.id))
  .then((orders) => getOrderDetails(orders[0].id))
  .then((details) => getProductInfo(details.productId))
  .then((product) => getInventory(product.sku))
  .then((stock) => {
    if (stock > 0) {
      return processOrder(user, product, stock);
    }
  })
  .then((result) => sendConfirmationEmail(user.email, result))
  .then(() => console.log('Order completed!'))
  .catch((error) => console.error('Error:', error));

// Solution 3: Async/Await (Modern JavaScript)
// Using Async/Await (cleanest approach)
async function processUserOrder(userId) {
  try {
    const user = await getUserData(userId);
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0].id);
    const product = await getProductInfo(details.productId);
    const stock = await getInventory(product.sku);

    if (stock > 0) {
      const result = await processOrder(user, product, stock);
      await sendConfirmationEmail(user.email, result);
      console.log('Order completed!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

processUserOrder(userId);
