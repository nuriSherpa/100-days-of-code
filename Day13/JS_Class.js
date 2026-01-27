// A class in programming is a blueprint or template for creating objects. It defines:

// Properties (data/state) that objects will have

// Methods (functions/behavior) that objects can perform

// Initialization logic (constructor) for setting up new objects


// The cookie cutter (class)
class Cookie {
  constructor(shape, flavor) {
    this.shape = shape;   // All cookies will have a shape
    this.flavor = flavor; // All cookies will have a flavor
    this.isBaked = false; // All cookies start unbaked
  }
  
  bake() {
    this.isBaked = true;
    return `Baking ${this.flavor} ${this.shape} cookie`;
  }
  
  eat() {
    if (this.isBaked) {
      return `Eating delicious ${this.flavor} cookie`;
    }
    return "Can't eat raw cookie!";
  }
}

// Making cookies (objects)
const starCookie = new Cookie("star", "chocolate");
const heartCookie = new Cookie("heart", "vanilla");

console.log(starCookie.shape); // "star"
console.log(heartCookie.bake()); // "Baking vanilla heart cookie"
console.log(starCookie.eat()); // "Can't eat raw cookie!"
starCookie.bake();
console.log(starCookie.eat()); // "Eating delicious chocolate cookie"




// What Happens Internally
// Despite the class syntax, JavaScript remains prototype-based. Classes are syntactic sugar over the existing prototype system.

// How ES6 Classes Translate to Prototypes

// This ES6 class:
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
}

// Is roughly equivalent to this:
function Animal1(name) {
  this.name = name;
}

Animal1.prototype.speak1 = function() {
  return `${this.name} makes a sound`;
};

const animal2= new Animal("Animal1")
console.log(animal2.speak());

const animal3= new Animal1("Animal2");
console.log(animal3.speak1("Animal2"));



