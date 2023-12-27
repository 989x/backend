### Project Structure:

Organize your project with the following structure:

```json
view-tracking-system/
├── src/
|   ├── controllers/
|   |   └── viewsController.ts
|   ├── models/
|   |   └── viewModel.ts
|   ├── routes/
|   |   └── viewsRoutes.ts
|   └── index.ts
├── tsconfig.json
└── package.json
```

### Ask

How to create a system for collecting views? 
It will have the total number of views. and number of views per day.

For example, YouTube's system in the back office will see 2 types of views,
is the total number of views and the number of views that people have seen today.

using node express typescript

### Ask

dailyViews may have more problems in the future as more and more data is added,
In my case, I don't have much budget for database. There may be excessive costs,
I want you to collect dailyViews views for just one day, To see how many views have increased today.

### Ask

It's all working incorrectly. dailyViews should only store this data.

{
  ...
  "dailyViews": [
    {
      "date": "2023-10-01",
      "count": 5   // Views for the next day (October 1, 2023)
    }
  ]
}

If it's a new date, update it from the old value to

{
  ...
  "dailyViews": [
    {
      "date": "2023-10-01",
      "count": 5   // Views for the next day (October 1, 2023)
    }
  ]
}

No new data will be added to the array because it will increase the size of the database too much,
dailyViews stores only one set of data. If there is a change of date, update the information from the existing set,
Change the date to a new date and the count value to a new value.
