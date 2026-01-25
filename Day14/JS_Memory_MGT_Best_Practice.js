// WeakMap doesn't prevent GC of keys
const weakCache = new WeakMap(); // Keys must be objects

let user = { id: 1, name: "Alice" };
weakCache.set(user, "some data");

console.log()

user = null; // user object can be GC'd
// weakCache entry automatically removed

// WeakSet for object collections
const observedObjects = new WeakSet();


console.log(observedObjects);
