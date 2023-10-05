## Ask

show data in database take the data case as an exampl. of the current date And tomorrow

## ChatGPT

Certainly! Let's simulate the scenario by incrementing views for the current date and then for the next day:

Assume the initial data looks like this:

```json
{
  "_id": ObjectId("5f7a1b30c1444f3df8a8f244"),
  "totalViews": 100,
  "dailyViews": {
    "date": "2023-09-30",
    "count": 15
  }
}
```

Now, let's increment views for the current date (September 30, 2023):

```json
{
  "message": "Views incremented successfully."
}
```

The database will be updated to:

```json
{
  "_id": ObjectId("5f7a1b30c1444f3df8a8f244"),
  "totalViews": 101,
  "dailyViews": {
    "date": "2023-09-30",
    "count": 16
  }
}
```

Now, let's simulate a new day, October 1, 2023, by incrementing views:

```json
{
  "message": "Views incremented successfully."
}
```

The database will be updated to:

```json
{
  "_id": ObjectId("5f7a1b30c1444f3df8a8f244"),
  "totalViews": 102,
  "dailyViews": {
    "date": "2023-10-01",
    "count": 1
  }
}
```

Now, you have only one entry in `dailyViews`, and it gets updated if the date changes. This approach minimizes the storage and keeps the structure concise.
