// call() immediately executes a function with a specific this value.

// Problem: 'this' depends on how function is called
const person1 = {
  name: 'Alice',
  sayHi: function() {
    return `Hi, I'm ${this.name}`;
  }
};

const person2 = {
  name: 'Bob'
};

console.log(person1.sayHi()); // Works: "Hi, I'm Alice"

// But person2 doesn't have sayHi method
// console.log(person2.sayHi()); // ERROR: person2.sayHi is not a function

console.log(person1.sayHi.call(person2));



function introduce(age, city) {
  return `I'm ${this.name}, ${age} years old from ${city}`;
}

const person = { name: 'Charlie' };

// Without call - 'this' would be undefined
console.log(introduce(25, 'NYC')); // ERROR: Cannot read property 'name' of undefined

// With call - we set 'this' to person
console.log(introduce.call(person, 25, 'NYC'));
// Output: "I'm Charlie, 25 years old from NYC"



const car1 = {
  brand: 'Toyota',
  getInfo: function(year) {
    return `${this.brand} made in ${year}`;
  }
};

const car2 = {
  brand: 'Honda'
};

// car2 borrows car1's method
console.log(car1.getInfo.call(car2, 2023));
// Output: "Honda made in 2023"