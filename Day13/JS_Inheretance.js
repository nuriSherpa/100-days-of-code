// This ES6 class:
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
}


// ES6 inheritance:
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    return `${super.speak()} - Woof!`;
  }
}

// Equivalent prototype chain:
function Dog1(name, breed) {
  Animal.call(this, name); // Similar to super()
  this.breed = breed;
}

// Set up prototype chain
Dog1.prototype = Object.create(Animal.prototype);
Dog1.prototype.constructor = Dog;

Dog1.prototype.speak = function() {
  const parentSpeak = Animal.prototype.speak.call(this);
  return `${parentSpeak} - Woof!`;
};