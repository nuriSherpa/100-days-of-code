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