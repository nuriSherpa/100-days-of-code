'use strict';

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addItem(product, price, quantity = 1) {
    // Without strict mode: duplicate parameter names would be allowed
    // function addItem(product, product, price) { } // This would ERROR

    // 1. Catches undeclared variables
    if (!product || price < 0) {
      // itemTotal = price * quantity; // ERROR if we forget 'let'
      let itemTotal = price * quantity; // Correct way
      return;
    }

    // 2. Prevents accidental globals
    // discount = 0.1; // ERROR: discount is not defined
    const discount = 0.1;

    // 3. Safer this binding
    const calculateSubtotal = function () {
      // In strict mode: this is undefined here (clearer!)
      // Without strict mode: this would be window/global (confusing)
      return price * quantity * (1 - discount);
    }.bind(this);

    const subtotal = calculateSubtotal();

    this.items.push({
      product,
      price,
      quantity,
      subtotal,
    });

    this.updateTotal();
  }

  updateTotal() {
    // 4. Can't delete important variables
    // delete this.items; // ERROR: Cannot delete property

    this.total = this.items.reduce((sum, item) => sum + item.subtotal, 0);

    // 5. Octal literals are errors (prevents confusion)
    // let taxRate = 010; // ERROR: Octal literals not allowed
    let taxRate = 0.08; // Correct decimal
    // let taxRate = 0o10; // Correct octal syntax (ES6) = 8 in decimal

    return this.total * (1 + taxRate);
  }

  applyCoupon(code) {
    // 6. eval is safer - doesn't leak variables
    if (code === 'DYNAMIC10') {
      // Without strict mode: eval creates global variables
      eval('var discountPercent = 10;');
      // discountPercent is NOT available outside eval in strict mode

      // With strict mode: need to return value properly
      const discountPercent = 10;
      this.total *= 1 - discountPercent / 100;
    }
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem('Laptop', 999.99, 1);
cart.addItem('Mouse', 29.99, 2);
console.log('Total with tax:', cart.updateTotal());

// ERROR examples that strict mode prevents:
// newItem = "Keyboard"; // Would create global without strict mode
// delete cart; // Can't delete cart object
