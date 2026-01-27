// V8 Architecture:
// ┌─────────────────────────────────────────┐
// │            V8 JavaScript Engine          │
// ├─────────────────────────────────────────┤
// │  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
// │  │  Parser │  │ Ignition │  │  Turbo- │ │
// │  │         │  │ (Inter-  │  │  Fan    │ │
// │  │         │  │ preter)  │  │ (Opt.   │ │
// │  └─────────┘  └─────────┘  └─────────┘ │
// │                                         │
// │  ┌───────────────────────────────────┐  │
// │  │          Orinoco (GC)             │  │
// │  └───────────────────────────────────┘  │
// └─────────────────────────────────────────┘

// Source: let x = 10 + 20;
// Tokens: let, x, =, 10, +, 20, ;


function multiply(a, b) {
    return a * b;
}

// AST Representation (simplified):
// FunctionDeclaration
// ├── Identifier: multiply
// ├── Parameters: [a, b]
// └── Body
//     └── ReturnStatement
//         └── BinaryExpression: *
//             ├── Identifier: a
//             └── Identifier: b


// ┌─────────────────────────────────────────────────────┐
// │              JavaScript Source Code                  │
// └──────────────────┬───────────────────────────────────┘
//                    │ (Parsing)
//                    ▼
// ┌─────────────────────────────────────────────────────┐
// │            Abstract Syntax Tree (AST)                │
// └──────────────────┬───────────────────────────────────┘
//                    │ (Ignition)
//                    ▼
// ┌─────────────────────────────────────────────────────┐
// │                 Ignition Bytecode                    │
// └──────────────────┬───────────────────────────────────┘
//                    │   (Profiling & Execution)
//                    ▼
//             ┌─────────────┐
//             │    Hot?     │←─ No ───┐
//             └─────────────┘         │
//                    │ Yes            │
//                    ▼                │
//          ┌─────────────────┐        │
//          │ TurboFan (JIT)  │        │
//          │ Optimized Code  │        │
//          └─────────────────┘        │
//                    │                │
//                    ▼                │
//             ┌─────────────┐        │
//             │  Deoptimize │───────┘
//             │  if needed  │
//             └─────────────┘


// Initial execution with interpreter
function sum(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}

// Ignition:
// - Quick startup
// - Generates bytecode
// - Collects type feedback


// V8 monitors execution and collects:
// 1. **Type feedback**: What types are used
// 2. **Hot functions**: Frequently executed code
// 3. **Optimization opportunities**

// Example of type feedback:
sum([1, 2, 3]);    // V8 learns: array of integers
sum([1.5, 2.5]);   // V8 learns: array of doubles



// Based on profiling, TurboFan creates optimized machine code

// Before optimization (generic):
function add(a, b) {
    return a + b;
}
// V8 handles all types: numbers, strings, objects...

// After optimization (when types are stable):
// function add(a: number, b: number) {
//     return a + b;  // Direct CPU instructions for addition
// }

// Inline Caches (ICs):
// Fast path for frequent operations




// Example: Hidden Classes
function Person(name, age) {
    this.name = name;  // Transition to hidden class C1
    this.age = age;    // Transition to hidden class C2
}

const p1 = new Person("Alice", 30);
const p2 = new Person("Bob", 25);
// p1 and p2 share the same hidden class structure

// Inline Cache Example:
function getArea(shape) {
    return shape.width * shape.height;
}

// First call: slow path (lookup)
// Subsequent calls with same shape type: fast path (cached)