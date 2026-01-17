const User={
    name:"Tendinuri Sherpa",
    age: 30,
    greet:function(){
        return `Hello my name is ${this.name} and my age is ${this.age}`
    },
    celebrateBirthday: function(){
        this.age++;
        return `Happy Birthday ${this.name} you are now ${this.age}`
    }
}

console.log(User.greet());
console.log(User.celebrateBirthday());
console.log(User.greet());