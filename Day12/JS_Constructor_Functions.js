// Constructor functions are special functions used to create objects with similar properties and methods.

// Trational way 
const person1={
    name: "Tendi",
    age: 23,
    greet(){
        console.log(`hello, I'm ${this.name}`)
    }
}


// With constructor function
function Person(name, age){
    this.name= name;
    this.age= age;
    this.greet= function(){
        console.log(`Hello, i am ${this.name} and i am ${this.age} years old!`);
    };
}

// creating instances
const tendi= new Person("Tendi",23);
const bob= new Person("Bob", 30);

tendi.greet();
bob.greet();


function Person(name, age) {
  // 1. A new empty object is created: {}
  // 2. 'this' is bound to the new object: this = {}
  // 3. The object is linked to the constructor's prototype
  
  this.name = name;
  this.age = age;
  
  // 4. The new object is returned (unless you return something else)
}

// What happens step by step:
const alice = new Person("Alice", 25);
/*
1. Creates: {} (new empty object)
2. Sets: this = {}
3. Links to Person.prototype
4. Executes: this.name = "Alice", this.age = 25
5. Returns: {name: "Alice", age: 25}
*/


// What is new
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// CORRECT: Using new
const correct = new Person("Alice", 25);
console.log(correct); // Person {name: "Alice", age: 25}

// WRONG: Forgetting new
const wrong = Person("Bob", 30); // this refers to window/global
console.log(wrong); // undefined
console.log(window.name); // "Bob" (pollutes global scope)!



function Person(name, age) {
  // Safety check: ensures constructor is called with 'new'
  if (!(this instanceof Person)) {
    return new Person(name, age);
  }
  
  this.name = name;
  this.age = age;
}

// Now both work correctly
const withNew = new Person("Alice", 25);
const withoutNew = Person("Bob", 30); // Automatically fixes itself