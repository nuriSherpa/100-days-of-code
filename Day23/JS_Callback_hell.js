// What is Callback Hell?
// Callback Hell (also known as "Pyramid of Doom") is a phenomenon that occurs when multiple nested callbacks create deeply indented code that becomes hard to read and maintain.

// Classic callback hell example
getUserData(userId, function (user) {
  getOrders(user.id, function (orders) {
    getOrderDetails(orders[0].id, function (details) {
      getProductInfo(details.productId, function (product) {
        getInventory(product.sku, function (stock) {
          if (stock > 0) {
            processOrder(user, product, stock, function (result) {
              sendConfirmationEmail(user.email, result, function () {
                console.log('Order completed!');
              });
            });
          }
        });
      });
    });
  });
});



// Problems with Callback Hell
// Hard to Read: Deep nesting makes code difficult to follow

// Error Handling Complexity: Each callback needs individual error handling

// Difficult to Maintain: Changing one part affects many nested levels

// Scope Issues: Variables from outer callbacks become inaccessible

// Debugging Nightmare: Stack traces become hard to interpret




