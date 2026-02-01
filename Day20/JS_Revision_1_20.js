// ========================
// JAVASCRIPT CORE CONCEPTS REVISION
// Days 1-19 Complete Summary
// ========================

console.log('=== DAY 1: SETUP ===');
// - GitHub repo created
// - Daily commit practice established
// - README with learning goals

console.log('\n=== DAY 2: EXECUTION CONTEXT & CALL STACK ===');

// Global Execution Context (GEC)
var globalVariable = "I'm global";

function firstFunction() {
  console.log('First function executing');
  var firstVar = 'Function scoped';

  function secondFunction() {
    console.log('Second function executing');
    console.log('Accessing:', firstVar); // Closure in action
  }

  secondFunction(); // Creates new EC
}

console.log('Memory Phase: Variables declared, functions stored');
console.log('Execution Phase: Code runs');
firstFunction(); // Pushes to call stack

// Call Stack Visualization:
// Step 1: [Global EC]
// Step 2: [Global EC, firstFunction EC]
// Step 3: [Global EC, firstFunction EC, secondFunction EC]
// Step 4: [Global EC, firstFunction EC] (secondFunction pops)
// Step 5: [Global EC] (firstFunction pops)

console.log('\n=== DAY 3: HOISTING ===');

// Hoisting Examples
console.log('1. var hoisting:');
console.log('Before declaration:', hoistedVar); // undefined
var hoistedVar = 'I was hoisted';
console.log('After declaration:', hoistedVar); // "I was hoisted"

// console.log(hoistedLet); // ReferenceError (TDZ)
let hoistedLet = 'let variable';

// console.log(hoistedConst); // ReferenceError (TDZ)
const hoistedConst = 'const variable';

console.log('\n2. Function hoisting:');
hoistedFunction(); // Works - function declaration hoisted
// hoistedExpression(); // TypeError - var hoisted, not function

function hoistedFunction() {
  console.log('Function declaration - fully hoisted');
}

var hoistedExpression = function () {
  console.log('Function expression - var hoisting only');
};

console.log('\n=== DAY 4: SCOPE & LEXICAL ENVIRONMENT ===');

var globalScope = 'Global level';

function scopeDemo() {
  var functionScope = 'Function level';
  console.log('Inside function - Global:', globalScope);
  console.log('Inside function - Local:', functionScope);

  if (true) {
    let blockScope = 'Block level (let)';
    var noBlockScope = 'I escape the block (var)';
    console.log('Inside block - Block:', blockScope);
    console.log('Inside block - Var:', noBlockScope);
  }

  // console.log(blockScope); // Error - block scope not accessible
  console.log('Outside block - Var still accessible:', noBlockScope);
}

scopeDemo();
console.log('Outside function - Global:', globalScope);
// console.log(functionScope); // Error - function scope not accessible

console.log('\n=== DAY 5-6: CLOSURES ===');

// Basic Closure
function outerFunction(outerParam) {
  let outerVariable = "I'm from outer scope";

  return function innerFunction(innerParam) {
    console.log(`Outer param: ${outerParam}`);
    console.log(`Outer variable: ${outerVariable}`);
    console.log(`Inner param: ${innerParam}`);
    return outerVariable + ' ' + innerParam;
  };
}

const closureExample = outerFunction('Hello');
console.log('Closure created');
console.log('Calling closure:', closureExample('World'));

// Data Hiding with Closure
function createCounter() {
  let count = 0; // Private variable

  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = createCounter();
console.log('Counter created');
console.log('Initial count:', counter.getCount());
console.log('After increment:', counter.increment());
console.log('After increment:', counter.increment());
console.log('After decrement:', counter.decrement());
console.log('Final count:', counter.getCount());

// Closure in Loops (Common Issue)
console.log('\nClosure in loops - The Problem:');
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log('var i =', i); // Always 3
  }, 100);
}

console.log('Closure in loops - Solution 1 (IIFE):');
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log('IIFE j =', j); // 0, 1, 2
    }, 100);
  })(i);
}

console.log('Closure in loops - Solution 2 (let):');
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log('let i =', i); // 0, 1, 2
  }, 100);
}

console.log("\n=== DAY 7-8: 'THIS' KEYWORD ===");

// Global context
console.log('Global context (non-strict):', this === window); // true in browser

// Function context
function regularFunction() {
  console.log("Regular function 'this':", this);
}

regularFunction(); // window/global or undefined in strict

const arrowFunction = () => {
  console.log("Arrow function 'this':", this);
};
arrowFunction(); // Inherits from surrounding scope

// Object method context
const person = {
  name: 'John',
  regularMethod: function () {
    console.log("Regular method 'this':", this.name);
    console.log(
      "Nested regular function 'this':",
      (function () {
        return this.name; // undefined/window
      })(),
    );
    console.log(
      "Nested arrow function 'this':",
      (() => {
        return this.name; // "John" - inherits from method
      })(),
    );
  },
  arrowMethod: () => {
    console.log("Arrow method 'this':", this.name); // undefined - lexical scope
  },
};

person.regularMethod();
person.arrowMethod();

// Constructor context
function Car(make) {
  this.make = make;
  console.log("Constructor 'this':", this.make);
}
const myCar = new Car('Toyota');

console.log('\n=== DAY 9: CALL, APPLY, BIND ===');

function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person1 = { name: 'Alice' };
const person2 = { name: 'Bob' };

// Call - immediately invokes with given context
introduce.call(person1, 'Hello', '!');

// Apply - immediately invokes with array of arguments
introduce.apply(person2, ['Hi', '!!']);

// Bind - returns new function with bound context
const introduceAlice = introduce.bind(person1, 'Hey');
introduceAlice('...');

// Practical use: Borrowing methods
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
const realArray = Array.prototype.slice.call(arrayLike);
console.log('Array-like to real array:', realArray);

console.log('\n=== DAY 10-13: PROTOTYPES & CLASSES ===');

// Prototype Basics
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound`);
};

Animal.prototype.eat = function () {
  console.log(`${this.name} is eating`);
};

const dog = new Animal('Rex');
dog.speak(); // "Rex makes a sound"

// Prototype Chain
console.log('dog.__proto__ === Animal.prototype:', dog.__proto__ === Animal.prototype);
console.log(
  'Animal.prototype.__proto__ === Object.prototype:',
  Animal.prototype.__proto__ === Object.prototype,
);
console.log('dog instanceof Animal:', dog instanceof Animal);
console.log('dog instanceof Object:', dog instanceof Object);

// ES6 Classes (Syntactic Sugar)
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }

  honk() {
    console.log(`${this.brand} honks!`);
  }

  static info() {
    console.log('This is a Vehicle class');
  }
}

class CarClass extends Vehicle {
  constructor(brand, model) {
    super(brand);
    this.model = model;
  }

  details() {
    console.log(`${this.brand} ${this.model}`);
  }
}

const myVehicle = new CarClass('Toyota', 'Camry');
myVehicle.honk();
myVehicle.details();
Vehicle.info();

console.log('\n=== DAY 14: MEMORY MANAGEMENT ===');

// Stack vs Heap
let stackVar1 = 10; // Stack - primitive
let stackVar2 = stackVar1; // Copy of value
stackVar1 = 20;
console.log('Stack Example:');
console.log('stackVar1:', stackVar1); // 20
console.log('stackVar2:', stackVar2); // 10

let heapVar1 = { value: 10 }; // Heap - object
let heapVar2 = heapVar1; // Reference to same object
heapVar1.value = 20;
console.log('\nHeap Example:');
console.log('heapVar1.value:', heapVar1.value); // 20
console.log('heapVar2.value:', heapVar2.value); // 20 (same reference)

// Garbage Collection
function createTempObject() {
  let temp = { data: 'temporary' };
  return 'done';
}
// 'temp' becomes unreachable after function ends → eligible for GC

console.log('\n=== DAY 15: SHALLOW VS DEEP COPY ===');

const original = {
  name: 'Original',
  details: {
    id: 1,
    tags: ['a', 'b'],
  },
};

// Shallow Copy
const shallowCopy = { ...original };
shallowCopy.name = 'Shallow';
shallowCopy.details.id = 999; // Affects original!
shallowCopy.details.tags.push('c'); // Affects original!

console.log('Original after shallow copy mutation:');
console.log('original.name:', original.name); // "Original" (unchanged)
console.log('original.details.id:', original.details.id); // 999 (changed!)
console.log('original.details.tags:', original.details.tags); // ["a", "b", "c"] (changed!)

// Deep Copy
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.details.id = 111; // Doesn't affect original
console.log('\nOriginal after deep copy mutation:');
console.log('original.details.id:', original.details.id); // 999 (unchanged)

// Modern Deep Copy
const modernDeepCopy = structuredClone
  ? structuredClone(original)
  : JSON.parse(JSON.stringify(original));

console.log('\n=== DAY 16: JAVASCRIPT ENGINE ===');
console.log('V8 Engine Process:');
console.log('1. Parsing: Source code → AST');
console.log('2. Compilation: AST → Bytecode');
console.log('3. Execution: Bytecode → Machine Code (JIT)');
console.log('4. Optimization: Hot functions optimized');

console.log('\n=== DAY 17: STRICT MODE ===');

function strictModeDemo() {
  'use strict';

  // Strict mode prevents:
  // 1. Implicit globals
  // undeclaredVar = 10; // ReferenceError

  // 2. Duplicate parameter names
  // function duplicate(a, a) {} // SyntaxError

  // 3. Deleting undeletable properties
  // delete Object.prototype; // TypeError

  // 4. Octal literals
  // var octal = 0123; // SyntaxError

  // 5. 'this' in global functions is undefined
  console.log("Strict mode 'this' in function:", this); // undefined

  return 'Strict mode enabled';
}

function nonStrictModeDemo() {
  // Implicit global allowed
  implicitGlobal = 'Oops'; // Creates global variable
  console.log("Non-strict 'this' in function:", this); // window/global

  return 'Non-strict mode';
}

strictModeDemo();
nonStrictModeDemo();

console.log('\n=== DAY 18: RUNTIME ENVIRONMENT ===');

console.log('Browser Runtime:');
console.log('- JavaScript Engine (V8, SpiderMonkey, etc.)');
console.log('- Web APIs (DOM, setTimeout, fetch)');
console.log('- Event Loop & Callback Queue');
console.log('- Task Queue (macrotasks) & Microtask Queue (promises)');

console.log('\nNode.js Runtime:');
console.log('- V8 Engine');
console.log('- LibUV (Event Loop)');
console.log('- C++ Bindings');
console.log('- Modules (fs, http, path)');

// Event Loop Example
console.log('\nEvent Loop Demo:');
console.log('1. Start');

setTimeout(() => {
  console.log('4. setTimeout callback (macrotask)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise callback (microtask)');
});

console.log('2. End');

console.log('\n=== DAY 19: COMMON JS PITFALLS ===');

// == vs ===
console.log('Equality Comparisons:');
console.log("'5' == 5:", '5' == 5); // true (coercion)
console.log("'5' === 5:", '5' === 5); // false
console.log('null == undefined:', null == undefined); // true
console.log('null === undefined:', null === undefined); // false
console.log('0 == false:', 0 == false); // true
console.log('0 === false:', 0 === false); // false

// Truthy/Falsy Values
console.log('\nFalsy Values (6):');
console.log('Boolean(false):', Boolean(false));
console.log('Boolean(0):', Boolean(0));
console.log("Boolean(''):", Boolean(''));
console.log('Boolean(null):', Boolean(null));
console.log('Boolean(undefined):', Boolean(undefined));
console.log('Boolean(NaN):', Boolean(NaN));

console.log('\nTruthy Examples:');
console.log("Boolean('0'):", Boolean('0'));
console.log('Boolean([]):', Boolean([]));
console.log('Boolean({}):', Boolean({}));

// Floating Point Precision
console.log('\nFloating Point Issues:');
console.log('0.1 + 0.2 === 0.3:', 0.1 + 0.2 === 0.3); // false
console.log('0.1 + 0.2:', 0.1 + 0.2); // 0.30000000000000004

// Solution
const areEqual = Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON;
console.log('Safe comparison:', areEqual); // true

// NaN Quirks
console.log('\nNaN Quirks:');
console.log('typeof NaN:', typeof NaN); // "number"
console.log('NaN === NaN:', NaN === NaN); // false
console.log('isNaN(NaN):', isNaN(NaN)); // true
console.log("isNaN('hello'):", isNaN('hello')); // true
console.log('Number.isNaN(NaN):', Number.isNaN(NaN)); // true
console.log("Number.isNaN('hello'):", Number.isNaN('hello')); // false

// Type Coercion Surprises
console.log('\nType Coercion Surprises:');
console.log('[] + []:', [] + []); // ""
console.log('[] + {}:', [] + {}); // "[object Object]"
console.log('{} + []:', {} + []); // 0
console.log('true + true + true:', true + true + true); // 3
console.log('!+[]+!+[]:', !+[] + !+[]); // 2 (wtf JavaScript!)

// ========================
// 10 INTERNAL JS QUESTIONS
// ========================

console.log('\n' + '='.repeat(50));
console.log('10 INTERNAL JAVASCRIPT QUESTIONS');
console.log('='.repeat(50));

// Q1: Hoisting with var in function
console.log("\nQ1: What's logged?");
var x = 10;
function test() {
  console.log('Inside test:', x);
  var x = 20;
}
test();
console.log("Answer: 'undefined' - function-scoped x is hoisted");

// Q2: Closure in loop with var
console.log("\nQ2: What's the output?");
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var i:', i), 100);
}
console.log('Answer: 3, 3, 3 - all closures share same i (function scope)');

// Q3: this in arrow function inside method
console.log("\nQ3: What's logged?");
const obj = {
  name: 'John',
  greet: function () {
    return () => console.log('Arrow this.name:', this.name);
  },
};
const func = obj.greet();
func();
console.log("Answer: 'John' - arrow function inherits this from greet()");

// Q4: Prototype chain
console.log("\nQ4: What's the result?");
function Animal() {}
function Dog() {}
Dog.prototype = Object.create(Animal.prototype);
const d = new Dog();
console.log('d instanceof Animal:', d instanceof Animal);
console.log('Answer: true - d → Dog.prototype → Animal.prototype');

// Q5: Type comparisons
console.log("\nQ5: What's logged?");
console.log('typeof null:', typeof null);
console.log('typeof undefined:', typeof undefined);
console.log('null === undefined:', null === undefined);
console.log('null == undefined:', null == undefined);
console.log("Answer: 'object', 'undefined', false, true");

// Q6: Strict mode error
console.log('\nQ6: What happens in strict mode?');
function strictTest() {
  'use strict';
  // undeclared = 10; // Uncomment for error
  // console.log(undeclared);
}
strictTest();
console.log('Answer: ReferenceError - cannot create implicit globals');

// Q7: Reference vs Value
console.log("\nQ7: What's the output?");
let a = { value: 1 };
let b = a;
let c = { ...a };
a.value = 2;
console.log('b.value:', b.value);
console.log('c.value:', c.value);
console.log('Answer: 2, 1 - b references same object, c is shallow copy');

// Q8: Array length mutation
console.log('\nQ8: What happens?');
const arr = [1, 2, 3];
arr.length = 0;
console.log('arr after length=0:', arr);
console.log('Answer: [] - setting length to 0 empties array');

// Q9: Type coercion in addition
console.log('\nQ9: What does this evaluate to?');
console.log('[] + []:', [] + []);
console.log('[] + {}:', [] + {});
console.log('{} + []:', {} + []);
console.log('{} + {}:', {} + {});
console.log("Answer: '', '[object Object]', 0, NaN");

// Q10: Closure with let in loop (solved)
console.log('\nQ10: Does this work correctly?');
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log('let i:', i), 100);
}
console.log('Answer: Yes! 1, 2, 3 - let creates new binding each iteration');

console.log('\n' + '='.repeat(50));
console.log('REVISION COMPLETE!');
console.log('Days 1-19 concepts reviewed');
console.log('10 internal questions solved');
console.log('='.repeat(50));
