# Problem: Promise Chain

Your goal is to complete the `double`, `square`, and `addTen` functions to perform the specified operations in the given order. Additionally, make sure to include comments to explain your logic. Feel free to ask questions or provide your solution for feedback!

```js
/*
  Problem:
  Write a function that uses Promises to perform a series of asynchronous operations.
  Each operation should manipulate the data and pass it to the next operation in the chain.

  Example:
  const input = 5;

  processNumber(input)
    .then(double)
    .then(square)
    .then(addTen)
    .then(result => {
      console.log(result); // Output: Result after performing all operations
    })
    .catch(error => {
      console.error('Error:', error);
    });

  Note:
  - You need to implement the processNumber, double, square, and addTen functions.
  - The input will be processed through each function in the specified order.
  - Provide comments to explain your logic.
*/

// Asynchronous function to process the input
function processNumber(input) {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation (e.g., fetching data)
    setTimeout(() => {
      // Process the input (e.g., manipulate data)
      const processedData = input * 2;

      // Resolve the promise with the processed data
      resolve(processedData);
    }, 500);
  });
}

// Double the input
function double(input) {
  // Explanation: Double the input value
  const doubledValue = input * 2;

  // Return the doubled value
  return doubledValue;
}

// Square the input
function square(input) {
  // Explanation: Square the input value
  const squaredValue = input ** 2;

  // Return the squared value
  return squaredValue;
}

// Add ten to the input
function addTen(input) {
  // Explanation: Add ten to the input value
  const result = input + 10;

  // Return the final result
  return result;
}

// Test the function with the provided example
const input = 5;

processNumber(input)
  .then(double)
  .then(square)
  .then(addTen)
  .then(result => {
    console.log(result); // Expected output: Result after performing all operations
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

In this code:

- The `double`, `square`, and `addTen` functions perform their respective operations on the input.
- Each function returns the result of the operation.
- Comments are provided to explain the logic of each function.
