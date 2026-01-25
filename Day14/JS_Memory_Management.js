// JavaScript Memory Management: Stack, Heap, GC & Memory Leaks

// Stack allocation - primitive types
let name = "Alice";      // String (primitive)
let age = 30;            // Number
let isStudent = false;   // Boolean
let score = null;        // Null
let nothing = undefined; // Undefined
let id = Symbol("id");   // Symbol
let bigNumber = 9007199254740991n; // BigInt

// These are stored on the stack
// When reassigned, a new copy is created
let originalAge = age;
age = 31;
console.log(originalAge); // 30 (unchanged)
console.log(age);         // 31


// Heap allocation - reference types
let person = {
    name: "Alice",
    age: 30,
    courses: ["Math", "Science"]
}; // Entire object goes to heap

let anotherPerson = person; // Reference copy, not value copy
anotherPerson.age = 31;

console.log(person.age); // 31 (changed!)
// Both variables point to same heap object

// JavaScript Garbage Collection (V8 Engine)
// V8 Memory Structure:

// ┌─────────────────────┐
// │       Stack         │ ← Fast, fixed-size, local vars
// ├─────────────────────┤
// │       New Space     │ ← Young generation (Scavenger GC)
// │   (Young Generation)│
// ├─────────────────────┤
// │       Old Space     │ ← Old generation (Mark-Sweep-Compact)
// │   (Old Generation)  │
// ├─────────────────────┤
// │    Large Object     │ ← Objects > 1MB directly here
// │       Space         │
// ├─────────────────────┤
// │      Code Space     │ ← Compiled JavaScript code
// └─────────────────────┘


function createObjects() {
    // Most objects die young
    for (let i = 0; i < 1000; i++) {
        let tempObj = { index: i }; // Young generation
    }
    // tempObj becomes garbage immediately after loop
}

let longLivedObj = { data: "I live long" }; // Survives to old generation



// 
class MemoryLeakDetector {
    constructor() {
        this.snapshots = [];
        this.leaks = new Set();
    }
    
    takeSnapshot(label) {
        if (global.gc) global.gc(); // Force GC in Node.js
        
        const snapshot = {
            label,
            timestamp: Date.now(),
            memory: process.memoryUsage ? process.memoryUsage() : {},
            heap: this.getHeapInfo()
        };
        
        this.snapshots.push(snapshot);
        console.log(`Snapshot ${label}:`, snapshot);
        
        return snapshot;
    }
    
    getHeapInfo() {
        // Browser environment
        if (window.performance && performance.memory) {
            return {
                usedJSHeapSize: performance.memory.usedJSHeapSize,
                totalJSHeapSize: performance.memory.totalJSHeapSize
            };
        }
        return null;
    }
    
    compareSnapshots() {
        for (let i = 1; i < this.snapshots.length; i++) {
            const prev = this.snapshots[i - 1];
            const curr = this.snapshots[i];
            
            if (curr.memory.heapUsed > prev.memory.heapUsed * 1.5) {
                console.warn(`POSSIBLE LEAK: ${prev.label} → ${curr.label}`);
                console.warn(`Growth: ${prev.memory.heapUsed} → ${curr.memory.heapUsed}`);
            }
        }
    }
}

// Usage:
const detector = new MemoryLeakDetector();
detector.takeSnapshot("Initial");
// ... perform operations ...
detector.takeSnapshot("After operation");
detector.compareSnapshots();