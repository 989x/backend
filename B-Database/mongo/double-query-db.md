### Ask

note userID and estateID is my custom id

In the function I get a value like this. 
but want to send only the value head.estateID only goes to the api.

```ts
const checkFavorites = async (req: Request, res: Response) => {
    const userID = req.params.userID;
  
    try {
      const user = await User.findOne({ "acc.userID": userID })
        .populate('saves')
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Extract saved estates from user document
      const savedEstates = user.saves
  
      res.status(200).json({ favorites: savedEstates });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
```

```json
{
    "favorites": [
        {
            "head": {
                "estateID": "list-jqru3vb0r9",
                "post": "active",
                "seen": 267,
                "shares": 830,
                "saves": 296,
                "createdAt": "2021-04-09T21:22:45.991Z",
                "updatedAt": "2021-06-01T20:40:23.001Z"
            },
            "_id": "5b9e0e4ab3987a68cbf26ad2",
            "user": "64cd22b4fc8048b0d7dd8002"
        },
        ...
    ]
}
```

### ChatGPT

If you want to send only the `head.estateID` value in the response instead of the entire object, you can map the `savedEstates` array to extract only the `estateID` values and create a new array with just those values. Here's how you can modify your `checkFavorites` function to achieve this:

...Problem

With this modification, the response will contain an array of `estateID` values from the saved estates, like this:

```json
{
  "favorites": ["list-jqru3vb0r9", ...]
}
```

This code uses the `map` function to iterate through the `user.saves` array and extract only the `estateID` values from the `head` object of each saved estate.

### Problem

Property 'head' does not exist on type 'ObjectId'.ts(2339)
any

### ChatGPT

I apologize for the oversight. The error you're encountering is because `user.saves` is an array of `ObjectId` values, and you're trying to access a property (`head.estateID`) on these `ObjectId` values. You should be retrieving the associated `IEstate` documents from the database before accessing the `head.estateID` property. Here's how you can modify your code to achieve this:

Assuming you have a Mongoose model for your estates called `EstateModel`, you can modify your `checkFavorites` function like this:

```ts
import { Model } from 'mongoose';

const checkFavorites = async (req: Request, res: Response) => {
  const userID = req.params.userID;

  try {
    const user = await User.findOne({ "acc.userID": userID }).populate('saves');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract saved estates from user document and map to get estateID values
    const savedEstates = await EstateModel.find({ _id: { $in: user.saves } });

    const estateIDs = savedEstates.map((estate) => estate.head.estateID);

    res.status(200).json({ favorites: estateIDs });
  } catch (error) {
    res.status(500).json({ error });
  }
};
```

In this modified code, we first retrieve the saved estates using `EstateModel.find` based on the `user.saves` array of `ObjectId` values. Then, we use the `.map` function to extract the `estateID` values from these saved estates. Finally, we send the extracted `estateID` values in the response.

Make sure to replace `EstateModel` with the actual name of your Mongoose estate model.
