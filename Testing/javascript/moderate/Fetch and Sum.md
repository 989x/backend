# Problem: Fetch and Sum

```js
/*
  Problem:
  Write a function that fetches data from a given URL and calculates the sum
  of a specific property from the fetched data.

  Example:
  fetchAndSum('https://jsonplaceholder.typicode.com/posts', 'userId')
    .then(result => {
      console.log(result); // Output: Sum of 'userId' property from the fetched data
    })
    .catch(error => {
      console.error('Error:', error);
    });

  Note:
  - You should use the Fetch API for fetching data.
  - The function should take a URL and a property name as parameters.
  - The fetched data will be an array of objects, each containing the specified property.
  - Sum the values of the specified property from all objects in the array.
  - Provide comments to explain your logic.
*/

async function fetchAndSum(url, propertyName) {
  try {
    // Use the Fetch API to get data from the given URL
    const response = await fetch(url);

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Calculate the sum of the specified property
    const sum = data.reduce((acc, item) => acc + item[propertyName], 0);

    // Return the result
    return sum;
  } catch (error) {
    // Handle errors and log the details
    console.error('Error during fetchAndSum:', error.message);
    throw error;
  }
}

// Test the function with the provided example
fetchAndSum('https://jsonplaceholder.typicode.com/posts', 'userId')
  .then(result => {
    console.log(result); // Expected output: Sum of 'userId' property from the fetched data
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

Your task is to complete the `fetchAndSum` function to meet the specified requirements. Use the Fetch API for fetching data, calculate the sum of the specified property, and handle errors appropriately. 
