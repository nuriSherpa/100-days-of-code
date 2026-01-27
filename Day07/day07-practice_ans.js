// Problem 1: Global vs Function Context
console.log("📌 PROBLEM 1: GLOBAL vs FUNCTION CONTEXT");
{
  console.log("What will these print?");
  
  // Global scope
  console.log("1. Global this:", this);
  
  // Regular function
  function testFunction() {
    console.log("2. Inside function, this is:", this);
  }
  testFunction();
  
  // Arrow function
  const arrowFunc = () => {
    console.log("3. Inside arrow function, this is:", this);
  };
  arrowFunc();
}


// Problem 2: Object Methods
console.log("\n\n📌 PROBLEM 2: OBJECT METHODS");
{
  const person = {
    name: "John",
    age: 30,
    
    // Regular function method
    greet: function() {
      console.log(`Hello, my name is ${this.name}`);
    },
    
    // Arrow function method
    greetArrow: () => {
      console.log(`Hello from arrow, my name is ${this.name}`);
    },
    
    // Nested function inside method
    introduce: function() {
      console.log(`I am ${this.name}`);
      
      function showAge() {
        console.log(`I am ${this.age} years old`);
      }
      showAge();
    }
  };
  
  console.log("What will these print?");
  person.greet(); // Hello, my name is John.
  person.greetArrow(); // Hello from arrow, my name is undefined
  person.introduce(); // I am John I am undefined years old
}


// Problem 3: Constructor Function
console.log("\n\n📌 PROBLEM 3: CONSTRUCTOR FUNCTION");
{
  function Car(brand, model) {
    this.brand = brand; 
    this.model = model;
    
    this.showInfo = function() {
      console.log(`This is a ${this.brand} ${this.model}`);
    };
  }
  
  console.log("With 'new' keyword:");
  const myCar = new Car("Toyota", "Camry");
  myCar.showInfo(); // This is a Toyota Camry
  
  console.log("\nWithout 'new' keyword:");
  const badCar = Car("Honda", "Civic");
  console.log("badCar:", badCar); // badCar: undefined
  console.log("global.brand:", brand); // global.brand: Honda
}


// Problem 4: Method Assignment
console.log("\n\n📌 PROBLEM 4: METHOD ASSIGNMENT");
{
  const calculator = {
    value: 10,
    
    add: function(num) {
      this.value += num;
      console.log(`Value after adding ${num}: ${this.value}`);
    },
    
    multiply: function(num) {
      this.value *= num;
      console.log(`Value after multiplying by ${num}: ${this.value}`);
    }
  };
  
  console.log("Direct method call:");
  calculator.add(5); // Value after adding 5: 15
  
  console.log("\nMethod assigned to variable:");
  const addFunction = calculator.add;
  addFunction(3); // Value after adding 3: NaN
  
  console.log("\nUsing call():");
  addFunction.call(calculator, 3); // Value after adding 3: 18
}