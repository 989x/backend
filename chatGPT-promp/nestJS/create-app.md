### 🙎🏻‍♂️ 💬  

use typescript , graphql

build nestjs and connect database to mongodb.
can create new blog, edit blog.

create blog schema , blog service , blog resolver

### ChatGPT

Sure, I can provide an example implementation for creating a blog schema, blog service, and blog resolver using TypeScript and GraphQL with NestJS, as well as connecting to MongoDB.

First, we'll need to install the necessary dependencies:

```bash
npm install @nestjs/common @nestjs/graphql @nestjs/mongoose graphql-tools graphql mongoose
npm install --save-dev @types/mongoose
```
Next, let's create a new NestJS application:

```bash
nest new my-blog-app
```
Now, let's create a new MongoDB module by running the following command:

```bash
nest g module database
```
In database.module.ts, we'll set up the MongoDB connection:

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/my-blog-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class DatabaseModule {}
```
This will connect to a MongoDB database called "my-blog-app" running on localhost.

Next, let's create a new module for our blog feature:

```bash
nest g module blog
```
In blog.module.ts, we'll set up the GraphQL module and import the DatabaseModule:

```ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/database.module';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
  ],
  providers: [BlogResolver, BlogService],
})
export class BlogModule {}
```
Here, we're using the GraphQLModule from NestJS, which will generate a schema based on our BlogResolver and the associated types. We're also importing MongooseModule.forFeature to add our BlogSchema to the list of schemas that Mongoose should use.

Next, let's define our Blog schema:

```ts
import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
```
This schema defines a blog with a title, content, createdAt, and updatedAt field.

Next, let's create our BlogService:

```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './blog';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

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
This service defines methods to find all blogs