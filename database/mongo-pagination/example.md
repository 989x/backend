> This file have code before

## Ask

Improve the code
Use the Limit and Pagination method for searching. in the previous code you created.

## ChatGPT

Sure, let's improve the code by implementing limit and pagination for searching. Here's the modified code:

### 1. Update the Controller:

In `controllers/searchController.ts`, add support for limit and pagination to the search function:

<example.ts />

This code adds support for `page` and `limit` query parameters. It calculates the `skip` value based on the current page and limit and uses `.skip()` and `.limit()` to implement pagination.

### 2. Test the Improved Code:

You can now make requests with `page` and `limit` query parameters to control the number of results per page and navigate through the results. For example:

- Get the first 10 results:
```bash
curl "http://localhost:3000/search/books?query=Orwell&page=1&limit=10"
```

- Get the next 10 results (page 2):
```bash
curl "http://localhost:3000/search/books?query=Orwell&page=2&limit=10"
```

This code should provide more control over the number of search results returned and make it easier to handle large datasets efficiently.
