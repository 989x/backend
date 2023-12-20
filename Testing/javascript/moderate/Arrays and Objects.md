# Problem: Array Manipulation

Your task is to complete the `manipulateArray` function to meet the specified requirements. Feel free to provide comments explaining your code and logic. Once you give your solution, I can offer feedback and explanations if needed. Good luck with your preparation!

```js
/*
  Problem:
  Given an array of numbers, write a function that manipulates the array as follows:
  - Remove all even numbers.
  - Double the value of each remaining number.
  - Return the modified array.

  Example:
  Input: [1, 2, 3, 4, 5, 6]
  Output: [2, 6, 10]

  Note:
  - You can use any method to solve the problem.
  - Please include comments in your code to explain the logic.
*/

function manipulateArray(inputArray) {
  // Filter out even numbers from the array
  const filteredArray = inputArray.filter(number => number % 2 !== 0);

  // Double the value of each remaining number
  const doubledArray = filteredArray.map(number => number * 2);

  // Return the modified array
  return doubledArray;
}

// Test the function with the provided example
const input = [1, 2, 3, 4, 5, 6];
const output = manipulateArray(input);
console.log(output); // Expected output: [2, 6, 10]
```

Explanation of the logic:

1. `Filtering Even Numbers:`
- We use the `filter` method to create a new array that includes only the elements for which the provided function returns true.
- The filtering condition checks if the number is not divisible by 2 (i.e., not even).

2. `Doubling Remaining Numbers:`
- We use the `map` method to create a new array with the results of calling a provided function on every element in the array.
- The provided function doubles each number in the array.

3. `Returning the Modified Array:`
- The final modified array is returned.
