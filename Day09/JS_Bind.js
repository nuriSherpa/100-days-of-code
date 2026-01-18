// bind() creates a new function with a preset this value (and optionally, preset arguments), but doesn't call it immediately.

// // call() and apply() - execute immediately
// someFunction.call(context, arg1, arg2);  // Runs NOW
// someFunction.apply(context, [arg1, arg2]); // Runs NOW

// // bind() - creates a new function for later use
// const newFunction = someFunction.bind(context, arg1, arg2); // Creates, doesn't run
// newFunction(); // You call it when you're ready


const user = {
  name: 'Alice',
  showName: function() {
    console.log(`User: ${this.name}`);
  }
};

// Works fine
user.showName(); // "User: Alice"

// But what if we save the method as a variable?
const showNameFunction = user.showName;

// Problem: 'this' is lost!
showNameFunction(); // "User: undefined" 😞

// Solution: Use bind()
const boundFunction = user.showName.bind(user);
boundFunction(); // "User: Alice" ✅




class Button {
  constructor(label) {
    this.label = label;
    this.element = document.createElement('button');
    this.element.textContent = label;
    
    // Without bind: 'this' would be the button element, not our class
    // this.element.addEventListener('click', this.handleClick); // WRONG
    
    // With bind: 'this' is correctly our class instance
    this.element.addEventListener('click', this.handleClick.bind(this));
  }
  
  handleClick() {
    console.log(`${this.label} was clicked!`);
  }
}

const myButton = new Button('Submit');
// Clicking would log: "Submit was clicked!"