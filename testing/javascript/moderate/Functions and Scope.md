# Problem: Closure Counter

Your goal is to implement the `createCounter` function so that it returns a counter function with the specified behavior. As always, include comments to explain your code. Feel free to ask questions or provide your solution for feedback. If you'd like more questions or have a specific topic in mind, let me know!

```js
/*
  Problem:
  Write a function that returns a counter function. The counter function, when invoked,
  should increment the counter value with each call.

  Example:
  const counter1 = createCounter();
  console.log(counter1()); // Output: 1
  console.log(counter1()); // Output: 2

  const counter2 = createCounter();
  console.log(counter2()); // Output: 1

  Note:
  - You need to implement the createCounter function.
  - The counter value should be private and inaccessible from outside the createCounter function.
  - Provide comments to explain your logic.
*/

function createCounter() {
  // Initialize a private counter variable using closure
  let counter = 0;

  // Return a function that increments and returns the counter value
  return function () {
    // Increment the counter
    counter++;

    // Return the updated counter value
    return counter;
  };
}

// Test the function with the provided example
const counter1 = createCounter();
console.log(counter1()); // Expected output: 1
console.log(counter1()); // Expected output: 2

const counter2 = createCounter();
console.log(counter2()); // Expected output: 1
```

In this code:

- The `createCounter` function initializes a private `counter` variable using closure.
- It returns an inner function that, when invoked, increments the counter and returns the updated value.
- Each time `createCounter` is called, it creates a new closure with its own private `counter` variable, allowing multiple independent counters to exist.
