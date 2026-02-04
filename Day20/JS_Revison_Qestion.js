// ================================
// JAVASCRIPT FIX-IT INTERVIEW QUESTIONS
// 7 Code Problems to Debug & Fix
// ================================

console.log("=".repeat(60));
console.log("JAVASCRIPT FIX-IT INTERVIEW QUESTIONS");
console.log("=".repeat(60));

// ============================================
// QUESTION 1: Hoisting & Scope Issue
// ============================================
console.log("\n🔍 QUESTION 1: Variable Hoisting Issue");
console.log("Original Code:");

function variableHoistingIssue() {
    console.log("Value of a:", a); // Line to fix
    console.log("Value of b:", b); // Line to fix
    console.log("Value of c:", c); // Line to fix
    
    var a = 10;
    let b = 20;
    const c = 30;
    
    if (true) {
        var a = 100;
        let b = 200;
        console.log("Inside block - b:", b);
    }
    
    console.log("After block - a:", a);
    console.log("After block - b:", b);
}



// ============================================
// QUESTION 2: Closure in Loop Problem
// ============================================
console.log("\n\n🔍 QUESTION 2: Closure in Loop");
console.log("Original Code:");

function closureLoopIssue() {
    var functions = [];
    
    for (var i = 0; i < 3; i++) {
        functions.push(function() {
            console.log("i =", i);
        });
    }
    
    functions[0](); // Expected: 0, Actual: ?
    functions[1](); // Expected: 1, Actual: ?
    functions[2](); // Expected: 2, Actual: ?
}


// Solution 2: Use let
console.log("\nSolution 2 - let keyword:");
function closureLoopFixed2() {
    var functions = [];
    
    for (let i = 0; i < 3; i++) {
        functions.push(function() {
            console.log("let i =", i);
        });
    }
    
    functions[0](); // 0
    functions[1](); // 1
    functions[2](); // 2
}

closureLoopFixed2();

// ============================================
// QUESTION 3: 'this' Context Issue
// ============================================
console.log("\n\n🔍 QUESTION 3: 'this' Context Problem");
console.log("Original Code:");

const user = {
    name: "John",
    hobbies: ["Reading", "Gaming"],
    
    printHobbies: function() {
        this.hobbies.forEach(function(hobby) {
            console.log(this.name + " likes " + hobby);
        });
    }
};



userFixed.printHobbies1();
console.log("---");
userFixed.printHobbies2();
console.log("---");
userFixed.printHobbies3();

// ============================================
// QUESTION 4: Object Mutation Problem
// ============================================
console.log("\n\n🔍 QUESTION 4: Object Mutation Issue");
console.log("Original Code:");

function objectMutationIssue() {
    const settings = {
        theme: "dark",
        notifications: true,
        user: {
            name: "Alice",
            preferences: {
                language: "en",
                fontSize: "medium"
            }
        }
    };
    
    // Trying to create a copy for modification
    const userSettings = settings;
    userSettings.theme = "light";
    userSettings.user.name = "Bob";
    
    console.log("Original theme:", settings.theme); // Unexpected mutation
    console.log("Original user name:", settings.user.name); // Unexpected mutation
    
    // Shallow copy attempt
    const shallowCopy = {...settings};
    shallowCopy.user.preferences.language = "fr";
    
    console.log("Original language:", settings.user.preferences.language); // Still mutated!
}



// ============================================
// QUESTION 5: Array Methods Issue
// ============================================
console.log("\n\n🔍 QUESTION 5: Array Method Chain Problem");
console.log("Original Code:");

function arrayMethodIssue() {
    const numbers = [1, 2, 3, 4, 5];
    
    // Goal: Get squares of even numbers, then sum them
    const result = numbers
        .filter(n => n % 2 === 0)  // [2, 4]
        .map(n => n * n)           // [4, 16]
        .reduce((acc, curr) => acc + curr, 0); // Should be 20
    
    console.log("Result:", result); // Works!
    
    // Problem: Trying to chain incorrectly
    const wrongResult = numbers
        .map(n => n * n)           // [1, 4, 9, 16, 25]
        .filter(n => n % 2 === 0)  // [4, 16]
        .reduce((acc, curr, index, array) => {
            console.log("Processing:", curr);
            return acc + curr;
        });
        // .then(total => total * 2); // ⚠️ This line causes error
    
    console.log("Wrong result:", wrongResult);
}



// ============================================
// QUESTION 6: Promise Chain Issue
// ============================================
console.log("\n\n🔍 QUESTION 6: Promise Chain Problem");
console.log("Original Code:");

function promiseChainIssue() {
    function fetchUser() {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ id: 1, name: "John" }), 100);
        });
    }
    
    function fetchPosts(userId) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(["Post1", "Post2"]), 100);
        });
    }
    
    function fetchComments(postId) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(["Comment1", "Comment2"]), 100);
        });
    }
    
    // Problem: Nested promises (callback hell)
    fetchUser().then(user => {
        console.log("User:", user);
        fetchPosts(user.id).then(posts => {
            console.log("Posts:", posts);
            fetchComments(posts[0]).then(comments => {
                console.log("Comments:", comments);
            });
        });
    });
    
    // Another issue: Error handling
    fetchUser()
        .then(user => fetchPosts(user.id))
        .then(posts => fetchComments(posts[0]))
        .then(comments => console.log(comments))
        .catch(error => console.log("Error:", error)); // Only catches first level errors
}


// ============================================
// QUESTION 7: Event Listener Memory Leak
// ============================================
console.log("\n\n🔍 QUESTION 7: Event Listener & Memory Leak");
console.log("Original Code:");

function memoryLeakIssue() {
    // Simulating a component that adds event listeners
    function Component() {
        this.data = new Array(1000).fill("Some data");
        this.handleClick = this.handleClick.bind(this);
        
        // Adding event listener
        document.addEventListener('click', this.handleClick);
        
        // Simulating some operations
        this.processData = function() {
            console.log("Processing", this.data.length, "items");
        };
    }
    
    Component.prototype.handleClick = function() {
        console.log("Clicked!", this.data.length);
    };
    
    // Creating and destroying components
    let components = [];
    
    for (let i = 0; i < 5; i++) {
        const comp = new Component();
        components.push(comp);
        comp.processData();
    }
    
    // Problem: Event listeners still exist even after components are "destroyed"
    components = []; // Think we're clearing them
    
    console.log("Components cleared, but event listeners still in memory!");
    // The Component instances cannot be garbage collected because
    // document still references their handleClick methods
}

