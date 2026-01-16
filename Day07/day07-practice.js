// ==============================================
// DAY 7: this KEYWORD BASIC PRACTICE
// ==============================================

console.log("🚀 DAY 7 - this KEYWORD BASIC PRACTICE\n");

// ==============================================
// 5 BASIC PRACTICE PROBLEMS
// ==============================================

console.log("\n--- BASIC PRACTICE PROBLEMS ---\n");

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
  person.greet();
  person.greetArrow();
  person.introduce();
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
  myCar.showInfo();
  
  console.log("\nWithout 'new' keyword:");
  const badCar = Car("Honda", "Civic");
  console.log("badCar:", badCar);
  console.log("global.brand:", brand);
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
  calculator.add(5);
  
  console.log("\nMethod assigned to variable:");
  const addFunction = calculator.add;
  addFunction(3);
  
  console.log("\nUsing call():");
  addFunction.call(calculator, 3);
}

// Problem 5: Strict Mode Basics
console.log("\n\n📌 PROBLEM 5: STRICT MODE");
{
  console.log("Non-strict mode:");
  function nonStrict() {
    this.x = 100;
    console.log("x:", x);
  }
  nonStrict();
  
  console.log("\nStrict mode:");
  function strictMode() {
    'use strict';
    try {
      this.y = 200;
      console.log("y:", y);
    } catch(error) {
      console.log("Error:", error.message);
    }
  }
  strictMode();
}

// ==============================================
// 2 INTERVIEW QUESTIONS
// ==============================================

console.log("\n\n--- INTERVIEW QUESTIONS ---\n");

// Interview Question 1: The "this" in setTimeout
console.log("📌 INTERVIEW Q1: setTimeout AND this");
{
  const obj = {
    name: "Interview Object",
    
    regularFunc: function() {
      console.log("Regular function called");
      setTimeout(function() {
        console.log("Inside setTimeout regular:", this.name);
      }, 100);
    },
    
    arrowFunc: function() {
      console.log("\nArrow function called");
      setTimeout(() => {
        console.log("Inside setTimeout arrow:", this.name);
      }, 100);
    },
    
    bindFunc: function() {
      console.log("\nBind function called");
      setTimeout(function() {
        console.log("Inside setTimeout with bind:", this.name);
      }.bind(this), 100);
    }
  };
  
  console.log("What will each print?");
  obj.regularFunc();
  obj.arrowFunc();
  obj.bindFunc();
}

// Interview Question 2: Method Chaining
console.log("\n\n📌 INTERVIEW Q2: METHOD CHAINING");
{
  const calculator = {
    value: 0,
    
    // Current implementation (can't chain)
    add: function(num) {
      this.value += num;
    },
    
    subtract: function(num) {
      this.value -= num;
    },
    
    getValue: function() {
      return this.value;
    }
  };
  
  console.log("Current implementation:");
  calculator.add(10);
  calculator.subtract(5);
  console.log("Result:", calculator.getValue());
  
  // Question: How would you modify this to enable chaining?
  // Example: calculator.add(10).subtract(5).getValue();
  
  console.log("\nHow to fix for chaining?");
  // Answer: Return 'this' from each method
  const chainableCalculator = {
    value: 0,
    
    add: function(num) {
      this.value += num;
      return this; // ← Key change
    },
    
    subtract: function(num) {
      this.value -= num;
      return this; // ← Key change
    },
    
    getValue: function() {
      console.log("Current value:", this.value);
      return this;
    }
  };
  
  console.log("\nFixed version:");
  chainableCalculator.add(10).subtract(5).getValue();
}

// ==============================================
// 4 FIX THE ISSUE PROBLEMS
// ==============================================

console.log("\n\n--- FIX THE ISSUE ---\n");

// Fix 1: Lost Context in Array Method
console.log("📌 FIX 1: ARRAY METHOD CONTEXT");
{
  const data = {
    numbers: [1, 2, 3, 4, 5],
    multiplier: 2,
    
    // Broken version
    multiplyAllBroken: function() {
      return this.numbers.map(function(num) {
        return num * this.multiplier; // this is undefined here
      });
    },
    
    // Fixed version 1: Arrow function
    multiplyAllFixed1: function() {
      return this.numbers.map(num => num * this.multiplier);
    },
    
    // Fixed version 2: Store this in variable
    multiplyAllFixed2: function() {
      const self = this;
      return this.numbers.map(function(num) {
        return num * self.multiplier;
      });
    },
    
    // Fixed version 3: Bind
    multiplyAllFixed3: function() {
      return this.numbers.map(function(num) {
        return num * this.multiplier;
      }.bind(this));
    }
  };
  
  console.log("Broken output:", data.multiplyAllBroken());
  console.log("Fixed 1 (arrow):", data.multiplyAllFixed1());
  console.log("Fixed 2 (self):", data.multiplyAllFixed2());
  console.log("Fixed 3 (bind):", data.multiplyAllFixed3());
}

// Fix 2: Event Handler Context
console.log("\n📌 FIX 2: EVENT HANDLER");
{
  const buttonHandler = {
    clicks: 0,
    
    // Broken version
    handleClickBroken: function() {
      this.clicks++;
      console.log(`Button clicked ${this.clicks} times`);
    },
    
    // Fixed version 1: Bind in constructor
    handleClickFixed1: function() {
      this.clicks++;
      console.log(`Fixed 1: Clicked ${this.clicks} times`);
    },
    
    // Fixed version 2: Arrow function
    handleClickFixed2: () => {
      // Note: Arrow functions don't work well here either!
      console.log(`Fixed 2: This won't work with clicks`);
    }
  };
  
  // Simulating event listener
  console.log("Simulating button clicks:");
  
  // Broken
  const brokenClick = buttonHandler.handleClickBroken;
  brokenClick(); // clicks is NaN or undefined
  
  // Fixed 1
  const fixedClick1 = buttonHandler.handleClickFixed1.bind(buttonHandler);
  fixedClick1();
  fixedClick1();
  
  // Another fix: Call with correct context
  buttonHandler.handleClickBroken.call(buttonHandler);
}

// Fix 3: Nested Object Methods
console.log("\n📌 FIX 3: NESTED OBJECT");
{
  const app = {
    name: "MyApp",
    
    config: {
      version: "1.0",
      
      showInfoBroken: function() {
        console.log(`App: ${this.name}, Version: ${this.version}`);
      },
      
      showInfoFixed: function() {
        console.log(`App: ${app.name}, Version: ${this.version}`);
      }
    }
  };
  
  console.log("Broken version:");
  app.config.showInfoBroken();
  
  console.log("\nFixed version:");
  app.config.showInfoFixed();
}

// Fix 4: Constructor Without 'new'
console.log("\n📌 FIX 4: SAFE CONSTRUCTOR");
{
  function User(name) {
    // Broken: if called without 'new', this is global
    this.name = name;
    
    // Fix: Check if 'new' was used
    if (!(this instanceof User)) {
      return new User(name);
    }
  }
  
  console.log("With 'new':");
  const user1 = new User("Alice");
  console.log("user1.name:", user1.name);
  
  console.log("\nWithout 'new' (fixed):");
  const user2 = User("Bob");
  console.log("user2.name:", user2.name);
  console.log("global.name:", global.name || "undefined");
}

// ==============================================
// 1 FIND THE ANSWER PROBLEM
// ==============================================

console.log("\n\n--- FIND THE ANSWER ---\n");

console.log("📌 FIND THE OUTPUT");
{
  var team = "Global Team";
  
  const tournament = {
    team: "Tournament Team",
    
    start: function() {
      console.log("1. Outer function this.team:", this.team);
      
      const match = {
        team: "Match Team",
        
        play: function() {
          console.log("2. Inner function this.team:", this.team);
        },
        
        playArrow: () => {
          console.log("3. Inner arrow this.team:", this.team);
        }
      };
      
      match.play();
      match.playArrow();
      
      const playFunc = match.play;
      playFunc();
    }
  };
  
  console.log("What will be the output in order?");
  tournament.start();
}

// ==============================================
// BONUS: PRACTICE TEST
// ==============================================

console.log("\n\n--- BONUS PRACTICE TEST ---\n");

console.log("Test your understanding:");
console.log("For each line, predict what 'this' refers to:\n");

const obj = {
  prop: "value",
  
  methodA: function() {
    console.log("A. this.prop =", this.prop);
  },
  
  methodB: () => {
    console.log("B. this.prop =", this.prop);
  }
};

// 1. Direct method call
obj.methodA();

// 2. Arrow method call  
obj.methodB();

// 3. Method assigned to variable
const funcA = obj.methodA;
funcA();

// 4. Using call()
funcA.call({ prop: "new value" });

// 5. Nested function
function outer() {
  console.log("E. Outer this =", this);
  
  function inner() {
    console.log("F. Inner this =", this);
  }
  inner();
}
outer.call(obj);