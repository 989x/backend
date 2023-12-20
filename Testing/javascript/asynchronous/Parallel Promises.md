# Problem: Parallel Promises

Absolutely, let's continue exploring Asynchronous JavaScript with another challenge. This time, we'll focus on working with async/await and handling multiple asynchronous operations.

Your task is to implement the `fetchParallelData` function and the `fetchData` function. Use `async/await` to handle asynchronous operations, fetch data from both URLs concurrently, and combine the results into a single object. Don't forget to include comments to explain your logic. Feel free to provide your solution or ask for any clarifications!

```js
/*
  Problem:
  Write a function that fetches data from two different URLs in parallel and
  combines the results.

  Example:
  fetchParallelData('https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/posts/1')
    .then(result => {
      console.log(result); // Output: Combined result from both URLs
    })
    .catch(error => {
      console.error('Error:', error);
    });

  Note:
  - You should use async/await to handle asynchronous operations.
  - The function should take two URLs as parameters.
  - Fetch data from both URLs concurrently.
  - Combine the results into a single object and return it.
  - Provide comments to explain your logic.
*/

async function fetchParallelData(url1, url2) {
  try {
    // Use Promise.all to fetch data from both URLs concurrently
    const [data1, data2] = await Promise.all([fetchData(url1), fetchData(url2)]);

    // Combine the results into a single object
    const combinedResult = {
      resultFromUrl1: data1,
      resultFromUrl2: data2
    };

    // Return the combined result
    return combinedResult;
  } catch (error) {
    // Handle errors and log the details
    console.error('Error during fetchParallelData:', error.message);
    throw error;
  }
}

// Asynchronous function to fetch data from a URL
async function fetchData(url) {
  try {
    const response = await fetch(url);

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Return the fetched data
    return data;
  } catch (error) {
    // Handle errors and log the details
    console.error('Error during fetchData:', error.message);
    throw error;
  }
}

// Test the function with the provided example
fetchParallelData('https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/posts/1')
  .then(result => {
    console.log(result); // Expected output: Combined result from both URLs
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

In this code:

- The `fetchParallelData` function uses `Promise.all` to fetch data from both URLs concurrently.
- It then combines the results into a single object.
- The `fetchData` function is an asynchronous function that fetches data from a given URL and handles errors.
- Comments are provided to explain the logic of each function.
