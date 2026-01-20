// The prototype chain is JavaScript's mechanism for inheritance and property lookup. When you access a property on an object, JavaScript searches for it through a chain of linked objects.

// Base object
const animal = {
    eats: true,
    walk() {
        console.log("Animal walks");
    }
};

// Create rabbit that inherits from animal
const rabbit = {
    jumps: true,
    __proto__: animal  // Sets prototype (for demo - not recommended in production)
};

console.log(rabbit.eats);  // true (from animal)
console.log(rabbit.jumps); // true (from rabbit)
rabbit.walk();            // "Animal walks" (from animal)

// The prototype chain: rabbit → animal → Object.prototype → null



function Animal(name) {
    this.name = name;
}

// Methods added to prototype
Animal.prototype.eats = true;
Animal.prototype.walk = function() {
    console.log(`${this.name} walks`);
};

// Create instance
const dog = new Animal("Buddy");

// Prototype chain:
// dog → Animal.prototype → Object.prototype → null

console.log(dog.name);    // "Buddy" (own property)
console.log(dog.eats);    // true (from Animal.prototype)
dog.walk();               // "Buddy walks"

// Check inheritance
console.log(dog instanceof Animal);  // true
console.log(dog instanceof Object);  // true