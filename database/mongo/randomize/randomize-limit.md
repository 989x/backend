### Ask

In limitEstate, 
it will pick up the first 8 data in the database and send it to the api.
But want to make estates values ​​able to randomize the data sent to the API.

```ts
const limitEstate = async (req: Request, res: Response) => {
  try {
    const estates: IEstate[] = await Estate.find({ 'head.post': 'active' })
      .populate('user')
      .select('-__v')
      .limit(8);
    return res.status(200).json({ estates });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
```

### ChatGPT

If you want to randomize the data sent to the API, you can use the `aggregate` method in MongoDB along with the `$sample` stage to get a random sample of documents. Here's how you can modify your `limitEstate` function:

```ts
import { Request, Response } from 'express';
import Estate, { IEstate } from '../models/estate'; // Update the path based on your project structure

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

export default limitEstate;
```

This code uses the `$sample` stage in the aggregation pipeline to randomize the documents and then uses `$lookup` to populate the `user` field. The other stages are included to customize the output as needed.

Note: This method might not be suitable for very large datasets, as the `$sample` stage can be resource-intensive. If you have a large dataset, you might want to consider alternative approaches or pagination for more efficient handling.
