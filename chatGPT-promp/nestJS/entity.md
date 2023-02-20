### 🙎🏻‍♂️ 💬  

change BlogSchema to blog.entity.ts

### ChatGPT

Sure, I can modify the example implementation to use BlogEntity instead of BlogSchema. Here's how it would look like:

First, we'll create a new file called blog.entity.ts:

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const BlogEntity = SchemaFactory.createForClass(Blog);
```
This entity definition is similar to the previous schema definition, but we're using the @nestjs/mongoose decorators to define the schema properties instead of using mongoose.Schema directly. The @Schema() decorator specifies that this class represents a Mongoose schema.

We've also defined a BlogDocument type to use in our BlogService and BlogResolver.

Next, we'll modify our BlogModule to use BlogEntity instead of BlogSchema:

```ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/database.module';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { BlogEntity } from './blog.entity';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogEntity }]),
  ],
  providers: [BlogResolver, BlogService],
})
export class BlogModule {}
```
Here, we're importing BlogEntity and using it with MongooseModule.forFeature to add our Blog entity to the list of schemas that Mongoose should use.

Finally, we'll modify our BlogService to use BlogDocument instead of Blog:

```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOneById(id: string): Promise<Blog> {
    return this.blogModel.findById(id).exec();
  }

  async create(blog: Blog): Promise<Blog> {
    const createdBlog = new this.blogModel(blog);
    return createdBlog.save();
  }

  async update(id: string, blog: Blog): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(id, blog, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.blogModel.findByIdAndDelete(id).exec();
  }
}
```
Here, we're importing BlogDocument and using it with Model<BlogDocument> instead of Model<Blog> to define our model type. This ensures that the returned documents have the appropriate schema properties based on our BlogEntity definition.




### 🙎🏻‍♂️ 💬  

found problem on BlogSchema in blog.entity.ts , The word ObjectType and Field is missing.

### ChatGPT

You're right! The @ObjectType and @Field decorators are required to define a GraphQL object type in NestJS.

Here's how you can modify your Blog entity to add these decorators:

```ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Blog extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  content: string;

  @Field()
  @Prop()
  createdAt: Date;

  @Field()
  @Prop()
  updatedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
```
The @ObjectType decorator indicates that this class represents a GraphQL object type, and the @Field decorator is used to mark each property as a field in the GraphQL schema. We also use the @Prop decorator to mark each property as a field in the Mongoose schema.

With these changes, you should be able to use your Blog entity in your GraphQL resolvers without any issues.