// ============================================
// LEVEL 1: BASE CLASS - Restaurant Staff
// ============================================
function Staff(name, id) {
    this.name = name;
    this.id = id;
    this.hoursWorked = 0;
}

// Methods ALL staff share (in prototype for memory efficiency)
Staff.prototype.clockIn = function() {
    this.isClockedIn = true;
    console.log(`${this.name} (ID: ${this.id}) clocked in`);
    return this;
};

Staff.prototype.clockOut = function() {
    this.isClockedIn = false;
    console.log(`${this.name} (ID: ${this.id}) clocked out`);
    return this;
};

Staff.prototype.work = function(hours) {
    this.hoursWorked += hours;
    console.log(`${this.name} worked ${hours} hours`);
    return this.hoursWorked;
};

Staff.prototype.getPay = function() {
    const pay = this.hoursWorked * this.hourlyRate;
    console.log(`${this.name} earned $${pay}`);
    return pay;
};

// ============================================
// LEVEL 2: CHEF - Inherits from Staff
// ============================================
function Chef(name, id, specialty) {
    // Call parent constructor (THIS IS CRITICAL!)
    Staff.call(this, name, id);
    
    // Chef-specific properties
    this.specialty = specialty;
    this.hourlyRate = 50;  // Chefs earn $50/hour
    this.dishesPrepared = 0;
}

// THE MAGIC LINE: Set up inheritance
Chef.prototype = Object.create(Staff.prototype);
Chef.prototype.constructor = Chef; // Fix constructor

// Chef-specific methods
Chef.prototype.cookDish = function(dishName) {
    if (!this.isClockedIn) {
        console.log(`${this.name} must clock in first!`);
        return;
    }
    this.dishesPrepared++;
    console.log(`${this.name} cooked ${dishName} (Specialty: ${this.specialty})`);
    return dishName;
};

Chef.prototype.createRecipe = function(recipeName) {
    console.log(`${this.name} created new recipe: ${recipeName}`);
    return recipeName;
};

// ============================================
// LEVEL 3: SOUS CHEF - Inherits from Chef
// ============================================
function SousChef(name, id, specialty, station) {
    // Call parent constructor
    Chef.call(this, name, id, specialty);
    
    // SousChef-specific properties
    this.station = station; // e.g., "Grill", "Salad", "Dessert"
    this.hourlyRate = 40;   // Sous chefs earn $40/hour
    this.employeesSupervised = [];
}

// Set up inheritance from Chef
SousChef.prototype = Object.create(Chef.prototype);
SousChef.prototype.constructor = SousChef;

// SousChef-specific methods
SousChef.prototype.superviseStaff = function(staff) {
    this.employeesSupervised.push(staff);
    console.log(`${this.name} is now supervising ${staff.name}`);
    return this.employeesSupervised.length;
};

SousChef.prototype.manageStation = function() {
    console.log(`${this.name} managing ${this.station} station`);
    return this.station;
};

// ============================================
// LEVEL 4: WAITER - Inherits from Staff
// ============================================
function Waiter(name, id, section) {
    Staff.call(this, name, id);
    this.section = section;
    this.hourlyRate = 20;    // Waiters earn $20/hour
    this.tablesServed = 0;
    this.tips = 0;
}

Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;

Waiter.prototype.serveTable = function(tableNumber) {
    if (!this.isClockedIn) {
        console.log(`${this.name} must clock in first!`);
        return;
    }
    this.tablesServed++;
    console.log(`${this.name} served table ${tableNumber} in section ${this.section}`);
    return this.tablesServed;
};

Waiter.prototype.takeOrder = function(order) {
    console.log(`${this.name} took order: ${order}`);
    return order;
};

Waiter.prototype.receiveTip = function(amount) {
    this.tips += amount;
    console.log(`${this.name} received $${amount} tip (Total: $${this.tips})`);
    return this.tips;
};


// Create instances
const headChef = new Chef("Gordon", 101, "French Cuisine");
const grillSousChef = new SousChef("Maria", 102, "Grill", "Grill Station");
const waiterJohn = new Waiter("John", 201, "Patio");

// ============================================
// VISUALIZE THE PROTOTYPE CHAIN
// ============================================
console.log("=== PROTOTYPE CHAIN ANALYSIS ===");

// For SousChef Maria:
console.log("\n1. SousChef Maria's Chain:");
console.log("Maria:", grillSousChef);
console.log("Maria.__proto__ === SousChef.prototype?", 
            grillSousChef.__proto__ === SousChef.prototype); // true
console.log("SousChef.prototype.__proto__ === Chef.prototype?", 
            SousChef.prototype.__proto__ === Chef.prototype); // true
console.log("Chef.prototype.__proto__ === Staff.prototype?", 
            Chef.prototype.__proto__ === Staff.prototype); // true
console.log("Staff.prototype.__proto__ === Object.prototype?", 
            Staff.prototype.__proto__ === Object.prototype); // true
console.log("Object.prototype.__proto__?", 
            Object.prototype.__proto__); // null

// Visual chain:
// grillSousChef → SousChef.prototype → Chef.prototype → Staff.prototype → Object.prototype → null