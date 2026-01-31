// == vs === (Loose vs Strict Equality)
console.log(5 == '5'); // true (type coercion)
console.log(0 == false); // true
console.log(null == undefined); // true
console.log('' == 0); // true
console.log([] == false); // true (empty array becomes 0)
console.log([] == ![]); // true (mind-bending!)

console.log(5 === '5'); // false
console.log(0 === false); // false
console.log(null === undefined); // false
console.log(NaN === NaN); // false (special case!)
