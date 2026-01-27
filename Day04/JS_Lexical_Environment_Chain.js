// Lexical Environment Chain:   
var globalVar = "I am a global variable";

function outerFunction() {
    var outerVar = "I am an outer function variable";

    function innerFunction() {
        var innerVar = "I am an inner function variable";

        // Accessing variables from innerFunction
        console.log(innerVar); // Accessible here
        console.log(outerVar); // Accessible here (from outerFunction)
        console.log(globalVar); // Accessible here (from global scope)
    }

    innerFunction();

    // Accessing variables from outerFunction
    console.log(outerVar); // Accessible here
    // console.log(innerVar); // Unaccessible here, will throw an error
}

outerFunction();

// Accessing global variable
console.log(globalVar); // Accessible here as well
// console.log(outerVar); // Unaccessible here, will throw an error
// console.log(innerVar); // Unaccessible here, will throw an error