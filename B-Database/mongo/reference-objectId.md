### How to reference the objectId from one collection/schema to another?
- https://www.mongodb.com/community/forums/t/how-to-reference-the-objectid-from-one-collection-schema-to-another/203108

Tarun_Gaur 
MongoDB Community Team 
Dec '22

Hello `@CHH_N_A`,

I notice you haven’t had a response to this topic yet - were you able to find a solution?
If not, could you please confirm if my understanding of your use case is correct?

You are trying to refer the objectId of documents of TestCases collection into documents of TestRun collection.
If this is correct then you can try using `populate()`.

`populate()` ref: https://mongoosejs.com/docs/populate.html

```
Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). We may populate a single document, multiple documents, a plain object, multiple plain objects, or all objects returned from a query. Let’s look at an example.
```

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);
```

In case you have any more queries regarding this, then please provide some sample documents and example scenario to discuss further.

Regards,
Tarun