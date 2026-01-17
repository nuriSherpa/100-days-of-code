// console.log("\n--- FIX-THE-CODE PROBLEMS ---\n");

// // Problem 1: Event Handler Context Loss
// console.log("📌 PROBLEM 1: EVENT HANDLER CONTEXT LOSS");
// const buttonManager = {
//     message: "Clicked: ",
    
//     setupHandlers: function() {
//         // This doesn't work as expected - FIX IT
//         document.querySelectorAll('.btn').forEach(function(btn) {
//             btn.addEventListener('click', ()=> {
//                 console.log(this.message + btn.textContent);
//             });
//         });
//     }
// };
// buttonManager.setupHandlers();


// Problem 2: Nested Object Method
const shoppingCart = {
    items: [
        { name: "Laptop", price: 1000, quantity: 1 },
        { name: "Mouse", price: 50, quantity: 2 }
    ],
    
    calculateTotal: function() {
        let total = 0;
        this.items.forEach((item) => {   // Arrow function
            total += item.price * item.quantity;
        });
        return total;
    },
    
    showItems: function() {
        this.items.forEach((item) => {   // Arrow function
            console.log(`${item.quantity}x ${item.name} at ${this.currency}${item.price}`);
        });
    },
    
    currency: "$"
};

console.log(shoppingCart.calculateTotal()); // 1100
shoppingCart.showItems(); 


// Problem 3: Arrow Function in Object Literal
console.log("\n📌 PROBLEM 3: ARROW FUNCTION IN OBJECT LITERAL");
const user = {
    name: "John",
    age: 25,
    
    // These don't work as expected - FIX THEM
    greet: function (){
        const inner =() => {
        return `Hello, I'm ${this.name}`;
    }
    return inner();
},
    
    birthday: function (){
        this.age++;
        return `Now I'm ${this.age}`;
    }
};

const user1=user.birthday();
console.log(user1);

console.log(user.greet());



function Timer(seconds) {
    this.seconds = seconds;
    this.isRunning = false;
    
    this.start = function() {
        this.isRunning = true;
        console.log(`Timer started for ${this.seconds} seconds`);
        
        setTimeout(() => {
            this.isRunning = false;
            console.log(`Timer finished! Was running: ${this.isRunning}`);
        }, this.seconds * 1000);
    };
}

const t = new Timer(1);
t.start();




// Problem 5: Prototype Method Chain
console.log("\n📌 PROBLEM 5: PROTOTYPE METHOD CHAIN");
function Calculator() {
    this.value = 0;
}

Calculator.prototype.add = function(x) {
    this.value += x;
    return this;
};

Calculator.prototype.multiply = function(x) {
    this.value *= x;
    return this;
};

Calculator.prototype.logValue = function() {
    // This doesn't work in chain - FIX IT
    console.log(`Current value: ${this.value}`);
    return this;
};

const c1=new Calculator();
c1
  .add(5)
  .multiply(2)
  .logValue()   // Current value: 10
  .add(3)
  .logValue();  // Current value: 13


// 🎯 INTERVIEW QUESTION 1: DEBOUNCE FUNCTION IMPLEMENTATION
console.log("🎯 INTERVIEW QUESTION 1: DEBOUNCE FUNCTION IMPLEMENTATION");

function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        const context = this; // preserve `this`

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(context, args); // restore `this`
        }, delay);
    };
}

const userInput = {
    value: "",

    updateValue: function (newValue) {
        this.value = newValue;
        console.log(`Value updated to: ${this.value}`);
    }
};

// IMPORTANT: assign after object creation
userInput.debouncedUpdate = debounce(userInput.updateValue, 300);

// Test
userInput.debouncedUpdate("Hello");
userInput.debouncedUpdate("Hello W");
userInput.debouncedUpdate("Hello Wo");
userInput.debouncedUpdate("Hello Wor");
userInput.debouncedUpdate("Hello World");
