# Day 3: JavaScript Hoisting

## Summary
Studied JavaScript hoisting mechanism where declarations are moved to top of scope during compilation.

## Key Concepts
- **Hoisting**: Only declarations move, not initializations
- **var**: Hoisted with `undefined` value
- **let/const**: Hoisted but in Temporal Dead Zone (TDZ)
- **Function Declarations**: Fully hoisted
- **Function Expressions**: Variable hoisted, function not

## TDZ (Temporal Dead Zone)
Period between scope entry and variable declaration where `let`/`const` exist but can't be accessed.

## Best Practices
1. Use `const` by default
2. Avoid `var`
3. Declare variables at top of scope
4. Enable strict mode
