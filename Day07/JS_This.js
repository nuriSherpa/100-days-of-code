function sayHello() {
  console.log(this); // Who am I?
}

sayHello(); // In browser: Window object


function showMe() {
  this.name = "Function Alice"; // Adds to global object!
  console.log(name);
}

showMe();
console.log(name); // "Function Alice" - Oops, polluted global!


// When a function is inside an object (we call it a "method"), this refers to that object.
const Person={
    name:"Tendinuri",
    age: 23,
    introduction: function(){
        console.log(`Hi my name is ${this.name} and my age is ${this.age}`)
    }
}

Person.introduction();


const user = {
  name: "Sarah",
  sayHi: function() {
    console.log(`Hello from ${this.name}`);
  }
};

// This works fine:
user.sayHi(); // "Hello from Sarah"

// But watch what happens:
const greetFunction = user.sayHi; // Copy the function

greetFunction(); // "Hello from undefined" 
// Why? Because 'this' is now Window, not user!

// Another common mistake with setTimeout:
setTimeout(user.sayHi, 1000); // "Hello from undefined" after 1 second

const greetBindFunction= user.sayHi.bind(user);
greetBindFunction()



const user1 = {
  name: "Lisa",
  
  // Regular function
  regularGreet: function() {
    setTimeout(function() {
      console.log(`Regular: Hello ${this.name}`); // undefined
    }, 100);
  },
  
  // Arrow function
  arrowGreet: function() {
    setTimeout(() => {
      console.log(`Arrow: Hello ${this.name}`); // "Lisa"
    }, 100);
  }
};

user1.regularGreet(); // "Regular: Hello undefined"
user1.arrowGreet();   // "Arrow: Hello Lisa"


// When you create objects using constructor functions (with new), this refers to the new object being created.
// Constructor function (starts with capital letter)
function Person(name, age) {
  // 'this' = new empty object {}
  this.name = name;
  this.age = age;
  this.introduce = function() {
    console.log(`I'm ${this.name}, ${this.age} years old`);
  };
  // Returns 'this' automatically
}

// Create instances using 'new'
const alice = new Person("Alice", 30);
const bob = new Person("Bob", 25);

alice.introduce(); // "I'm Alice, 30 years old"
bob.introduce();   // "I'm Bob, 25 years old"