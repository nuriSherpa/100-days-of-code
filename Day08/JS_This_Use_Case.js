// const buttonHandler = {
//     button: document.querySelector('#myButton'),
//     message: "Button clicked!",
    
//     // Arrow function won't work here (wrong `this`)
//     setupWrong: function() {
//         this.button.addEventListener('click', () => {
//             console.log(this.message); // Works but 'this' is buttonHandler
//             // 'this' here refers to buttonHandler, not the button element
//             console.log(this === buttonHandler); // true
//         });
//     },
    
//     // Regular function with event object
//     setupCorrect: function() {
//         this.button.addEventListener('click', function(event) {
//             // 'this' refers to the button element
//             console.log(`Clicked button with text: ${this.textContent}`);
//             // To access buttonHandler's properties:
//             console.log(event.target.dataset.message);
//         });
//     },
    
//     // Alternative: bind method
//     setupBound: function() {
//         const handler = function(event) {
//             console.log(this.message);
//             console.log(`Button says: ${event.target.textContent}`);
//         }.bind(this);
        
//         this.button.addEventListener('click', handler);
//     }
// };


const calculator = {
    currentValue: 0,
    
    operations: {
        add: function(x) {
            // 'this' refers to operations object, not calculator
            // This won't work as expected
            this.currentValue += x;
            return this.currentValue;
        },
        
        multiply: (x) => {
            // Arrow function - 'this' refers to outer scope (calculator)
            // This also won't work as expected
            this.currentValue *= x;
            return this.currentValue;
        }
    },
    
    // Correct approach
    add: function(x) {
        this.currentValue += x;
        return this.currentValue;
    },
    
    multiply: function(x) {
        this.currentValue *= x;
        return this.currentValue;
    },
    
    clear: function() {
        this.currentValue = 0;
        return "Cleared!";
    }
};

console.log(calculator.add(5));      // 5
console.log(calculator.multiply(3)); // 15
console.log(calculator.clear());     // "Cleared!"