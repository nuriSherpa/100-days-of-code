function square(x) {
    return x * x;
}

function calculate(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += square(arr[i]);  // Inlined: sum += arr[i] * arr[i]
    }
    return sum;
}


// 2. Escape Analysis
function createPoint(x, y) {
    return { x, y };  // Object might be allocated on stack
}

// If object doesn't escape function scope,
// V8 might avoid heap allocation



// 3. Dead Code Elimination
function calculate(a, b) {
    const debug = false;
    if (debug) {
        console.log("Debugging...");  // Removed
    }
    return a + b;
}


// Generational GC:
// ┌─────────────────────────────────────┐
// │          Young Generation           │
// │    ┌────────────┬────────────┐     │
// │    │   Nursery  │   Old      │     │
// │    │   (New)    │   Space    │     │
// │    └────────────┴────────────┘     │
// │         Scavenger (Minor GC)       │
// └─────────────────────────────────────┘
//                    │
//                    ▼
// ┌─────────────────────────────────────┐
// │          Old Generation             │
// │                                     │
// │        Mark-Sweep-Compact           │
// │          (Major GC)                 │
// └─────────────────────────────────────┘