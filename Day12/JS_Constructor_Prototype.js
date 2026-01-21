function Person(name, age) {
  // Instance properties (unique per object)
  this.name = name;
  this.age = age;
}

// Shared methods (all instances share the same functions)
Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};

Person.prototype.haveBirthday = function() {
  this.age++;
  console.log(`Happy Birthday! ${this.name} is now ${this.age}`);
};

const alice = new Person("Alice", 25);
const bob = new Person("Bob", 30);

console.log(alice.greet === bob.greet); // true - same function object!
alice.greet();    // "Hello, I'm Alice"
bob.haveBirthday(); // "Happy Birthday! Bob is now 31"


function Person(name) {
  this.name = name;
}

Person.prototype.species = "Human";
Person.prototype.greet = function() {
  return `Hello from ${this.name}`;
};

const john = new Person("John");

// Prototype chain lookup:
console.log(john.name);      // 1. Looks at john object → finds "John"
console.log(john.species);   // 1. john object → not found
                            // 2. Person.prototype → finds "Human"
console.log(john.greet());   // 1. john object → not found
                            // 2. Person.prototype → finds function

console.log(john.hasOwnProperty("name"));     // true
console.log(john.hasOwnProperty("species"));  // false
console.log(john.hasOwnProperty("greet"));    // false



// Parent constructor
function Animal(name, species) {
  this.name = name;
  this.species = species;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} the ${this.species} makes a sound`);
};

Animal.prototype.eat = function(food) {
  console.log(`${this.name} is eating ${food}`);
};

// Child constructor
function Dog(name, breed) {
  // Call parent constructor with current 'this'
  Animal.call(this, name, "Dog");
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Fix constructor reference

// Add Dog-specific methods
Dog.prototype.bark = function() {
  console.log(`${this.name} says: Woof! Woof!`);
};

Dog.prototype.fetch = function(item) {
  console.log(`${this.name} fetched the ${item}`);
};

// Create instance
const myDog = new Dog("Rex", "German Shepherd");
myDog.speak();   // Inherited from Animal: "Rex the Dog makes a sound"
myDog.eat("bone"); // Inherited: "Rex is eating bone"
myDog.bark();    // Dog-specific: "Rex says: Woof! Woof!"
myDog.fetch("ball"); // Dog-specific: "Rex fetched the ball"

// Check inheritance
console.log(myDog instanceof Dog);    // true
console.log(myDog instanceof Animal); // true



function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.getFormattedPrice = function() {
  return `$${this.price.toFixed(2)}`;
};

function ShoppingCart() {
  this.items = [];
  this.total = 0;
}

ShoppingCart.prototype.addItem = function(product, quantity = 1) {
  this.items.push({ product, quantity });
  this.total += product.price * quantity;
  console.log(`Added ${quantity} x ${product.name}`);
};

ShoppingCart.prototype.removeItem = function(index) {
  const removed = this.items.splice(index, 1)[0];
  this.total -= removed.product.price * removed.quantity;
  console.log(`Removed ${removed.quantity} x ${removed.product.name}`);
};

ShoppingCart.prototype.getTotal = function() {
  return this.total.toFixed(2);
};

ShoppingCart.prototype.displayCart = function() {
  console.log("Your Cart:");
  this.items.forEach((item, index) => {
    console.log(`${index + 1}. ${item.quantity}x ${item.product.name} - $${(item.product.price * item.quantity).toFixed(2)}`);
  });
  console.log(`Total: $${this.getTotal()}`);
};

// Usage
const apple = new Product("Apple", 0.99);
const banana = new Product("Banana", 0.59);
const orange = new Product("Orange", 1.29);

const cart = new ShoppingCart();
cart.addItem(apple, 3);
cart.addItem(banana, 6);
cart.addItem(orange, 2);
cart.displayCart();