### Ask

When using limitEstate, all user data will be sent to the api.
But want to send user information, namely info.info.name, only one value.

```ts
const limitEstate = async (req: Request, res: Response) => {
  try {
    const estates: IEstate[] = await Estate.aggregate([
      { $match: { 'head.post': 'active' } }, // Match only documents with 'head.post' set to 'active'
      { $sample: { size: 8 } }, // Randomly sample 8 documents
      { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } }, // Populate user
      { $unwind: '$user' }, // Unwind the user array
      { $project: { __v: 0 } }, // Exclude the __v field
    ]);
    return res.status(200).json({ estates });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
```

### ChatGPT

To send only the `info.name` of the user information in the API response for the `limitEstate` endpoint, you can modify your aggregation pipeline to project only the necessary fields from the `user` subdocument. Here's how you can do it:

```ts
const limitEstate = async (req: Request, res: Response) => {
  try {
    const estates: IEstate[] = await Estate.aggregate([
      { $match: { 'head.post': 'active' } }, // Match only documents with 'head.post' set to 'active'
      { $sample: { size: 8 } }, // Randomly sample 8 documents
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        }, // Populate user
      },
      { $unwind: '$user' }, // Unwind the user array
      {
        $project: {
          '_id': 0, // Exclude _id
          '__v': 0, // Exclude __v
          'user._id': 0, // Exclude user._id
          'user.acc.userID': 0, // Exclude user.acc.userID
          'user.acc.logins': 0, // Exclude user.acc.logins
          'user.acc.createdAt': 0, // Exclude user.acc.createdAt
          'user.acc.updatedAt': 0, // Exclude user.acc.updatedAt
          'user.subs': 0, // Exclude user.subs
          'user.messages': 0, // Exclude user.messages
          'user.saves': 0, // Exclude user.saves
          'user.estates': 0, // Exclude user.estates
        },
      },
    ]);
    return res.status(200).json({ estates });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
```

In the `$project` stage of the aggregation pipeline, you can use the field names with a value of `0` to exclude those fields from the API response, ensuring that only the `info.name` field is included in the response for the `limitEstate` endpoint. Adjust the projection as needed to match your specific requirements.
