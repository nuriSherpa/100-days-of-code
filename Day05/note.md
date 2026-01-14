# Day5: Closures and Scope
# What i have learned so far
- Closures are functions that "remember" their lexical scope even when executed outside that scope.
- They allow for data encapsulation and can create private variables.
- Closures are commonly used in event handlers, callbacks, and functional programming patterns.
- Understanding closures is crucial for mastering JavaScript's asynchronous behavior and functional programming techniques. 

# Summary of Key Concepts
1. **Closure Definition**: A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.

2. **Lexical Environment**: The environment in which a function was created, including any variables that were in scope at that time.

3. **Data Encapsulation**: Closures can be used to create private variables and methods, allowing for data encapsulation and preventing external access.

4. **Practical Uses**:
   - Maintaining state in asynchronous programming.
   - Creating function factories.
   - Implementing module patterns for better code organization.

5. **Memory Implications**: Closures can lead to increased memory usage if they retain references to large objects or data structures that are no longer needed.

6. **Event Handlers**: Closures are often used in event handlers to maintain access to variables from the outer scope, especially when using `var` vs `let` in loops.

# Conclusion
Understanding closures is essential for effective JavaScript programming, especially in asynchronous contexts. They provide powerful tools for data encapsulation and state management, but developers must also be mindful of their memory implications.