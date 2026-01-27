// Prototype-based approach
function Car(make, model) {
  this.make = make;
  this.model = model;
}

Car.prototype.start = function() {
  return `${this.make} ${this.model} is starting...`;
};

Car.prototype.stop = function() {
  return `${this.make} ${this.model} is stopping...`;
};


// ES6 Class approach
class Car1 {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  
  start() {
    return `${this.make} ${this.model} is starting...`;
  }
  
  stop() {
    return `${this.make} ${this.model} is stopping...`;
  }
}



//----------------------------------------------> Comparession <------------------------

// Prototype inheritance
function ElectricCar(make, model, batteryCapacity) {
  Car.call(this, make, model);
  this.batteryCapacity = batteryCapacity;
}

ElectricCar.prototype = Object.create(Car.prototype);
ElectricCar.prototype.constructor = ElectricCar;

ElectricCar.prototype.charge = function() {
  return `Charging ${this.make} ${this.model}`;
};

// Class inheritance
class ElectricCar extends Car {
  constructor(make, model, batteryCapacity) {
    super(make, model);
    this.batteryCapacity = batteryCapacity;
  }
  
  charge() {
    return `Charging ${this.make} ${this.model}`;
  }
}