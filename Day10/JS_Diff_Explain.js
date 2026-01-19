// Company's standard equipment for ALL employees
function Employee(name) {
    this.name = name;
}

Employee.prototype = {
    computer: "Dell Laptop",      // All employees get this
    desk: "Standard Desk",        // All employees get this
    work: function() {            // All employees can do this
        return `${this.name} is working`;
    }
};

// This is the COMPANY'S list of what every employee gets
console.log(Employee.prototype);
// {
//   computer: "Dell Laptop",
//   desk: "Standard Desk", 
//   work: function() {...}
// }

// Hire a new employee
const john = new Employee('John');

// What John has access to (__proto__)
console.log(john.__proto__ === Employee.prototype); // true

// John himself only has:
console.log(john); // {name: "John"}

// But he can access company equipment through __proto__
console.log(john.work()); // "John is working"
// How? Looks at john.__proto__ → finds work() in Employee.prototype