// Function Scope:
// Function scope
function checkFunctionScope() {
    var functionVar = "I am a function-scoped variable";
    console.log(functionVar); // Accessible here
}

checkFunctionScope();
// console.log(functionVar); // Unaccessible here, will throw an error
