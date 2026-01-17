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
inner()
},
    
    birthday: () => {
        this.age++;
        return `Now I'm ${this.age}`;
    }
};

console.log(user.greet());