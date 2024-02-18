> use file <database.js />

### Ask

Sent database Still missing favorites data.
Want to see which estateSchema the user has saved?

### ChatGPT

To track which estates a user has saved as favorites, you can modify your `userSchema` by adding a field to store the IDs of the saved estates. This field can be an array of ObjectIDs referencing the `estateSchema`. Here's how you can update your `userSchema` to include a `favorites` field:

```js
const userSchema = new mongoose.Schema({
  // ... Other fields

  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estate', // Reference to the 'estateSchema'
  }],

  // ... Other fields
});
```

With this modification, each user can have an array of estate IDs in their `favorites` field. You can then use Mongoose's `.populate()` method to retrieve the actual estate documents that correspond to these IDs when querying a user's favorites.

Here's an example of how you can use `.populate()` to find the actual favorite estates for a user:

```js
const User = mongoose.model('User');
const Estate = mongoose.model('Estate');

// Find a user by their ID and populate their favorites
User.findById(userId)
  .populate('favorites') // This will populate the 'favorites' field with estate documents
  .exec((err, user) => {
    if (err) {
      // Handle the error
    } else {
      // Access the user's favorite estates
      const favoriteEstates = user.favorites;
      console.log('User\'s favorite estates:', favoriteEstates);
    }
  });
```

In this example, replace `userId` with the actual user's ID for whom you want to retrieve their favorite estates. This code will populate the `favorites` field with actual estate documents, allowing you to access the estates that the user has saved as favorites.

Remember to adjust your data handling logic to add or remove estate IDs in the `favorites` array when a user saves or removes a favorite estate.
