### 🙎🏻‍♂️ 💬  

after that create blog resolver file

### ChatGPT

Sure, here's an example implementation of a BlogResolver that uses the BlogService to handle GraphQL queries and mutations related to blogs:

```ts
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';

@Resolver('Blog')
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => [Blog])
  async blogs(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Query(() => Blog)
  async blog(@Args('id') id: string): Promise<Blog> {
    return this.blogService.findOneById(id);
  }

  @Mutation(() => Blog)
  async createBlog(
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<Blog> {
    const blog = { title, content };
    return this.blogService.create(blog);
  }

  @Mutation(() => Blog)
  async updateBlog(
    @Args('id') id: string,
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<Blog> {
    const blog = { title, content };
    return this.blogService.update(id, blog);
  }

  @Mutation(() => Boolean)
  async deleteBlog(@Args('id') id: string): Promise<boolean> {
    await this.blogService.delete(id);
    return true;
  }
}
```
Here, we're defining a BlogResolver class with four methods:

- blogs(): A query that returns an array of all the blogs in the database.
- blog(id): A query that returns a single blog based on its ID.
- createBlog(title, content): A mutation that creates a new blog with the specified title and content.
- updateBlog(id, title, content): A mutation that updates an existing blog's title and content based on its ID.
- deleteBlog(id): A mutation that deletes an existing blog based on its ID.
Each of these methods maps to a corresponding GraphQL query or mutation with the same name and arguments. The @Resolver('Blog') decorator specifies that this resolver handles GraphQL operations related to the Blog type.

In each method, we're calling methods from the BlogService to handle the actual database operations. For example, the createBlog mutation creates a new Blog object with the specified title and content, and passes it to the create method of the BlogService. The updateBlog mutation similarly updates an existing blog based on its ID. The blogs and blog queries retrieve data using the findAll and findOneById methods of the BlogService. Finally, the deleteBlog mutation deletes a blog using the delete method of the BlogService.

With this implementation, we should be able to query and mutate blog data using GraphQL operations.




### 🙎🏻‍♂️ 💬  

blog resolver found problem 

Argument of type '{ title: string; content: string; }' is not assignable to parameter of type 'Blog'.
  Type '{ title: string; content: string; }' is missing the following properties from type 'Blog': createdAt, updatedAt

### ChatGPT

The error message you're seeing suggests that you're passing an object with a title and content property to a function that expects a Blog object. This is because your createBlog mutation is defined to receive title and content as arguments, but the Blog entity has additional fields like createdAt and updatedAt that are required.

To fix this issue, you can modify the createBlog mutation in your BlogResolver to create a new Blog object with the specified title and content, and set default values for the createdAt and updatedAt properties:

```ts
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';

@Resolver('Blog')
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => [Blog])
  async blogs(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Query(() => Blog)
  async blog(@Args('id') id: string): Promise<Blog> {
    return this.blogService.findOneById(id);
  }

  @Mutation(() => Blog)
  async createBlog(
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<Blog> {
    const blog = new Blog();
    blog.title = title;
    blog.content = content;
    blog.createdAt = new Date();
    blog.updatedAt = new Date();
    return this.blogService.create(blog);
  }

  @Mutation(() => Blog)
  async updateBlog(
    @Args('id') id: string,
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<Blog> {
    const blog = { title, content };
    return this.blogService.update(id, blog);
  }

  @Mutation(() => Boolean)
  async deleteBlog(@Args('id') id: string): Promise<boolean> {
    await this.blogService.delete(id);
    return true;
  }
}
```
Here, we're creating a new Blog object and setting its title and content properties to the values passed in as arguments. We're also setting the createdAt and updatedAt properties to the current date using the new Date() constructor.

With these changes, the createBlog mutation should now be able to create new Blog objects with default values for the createdAt and updatedAt fields.




### 🙎🏻‍♂️ 💬  

create new createBlog becase i found same error

### ChatGPT

Sure! Here's an example of how you can define the createBlog mutation in your BlogResolver:

```ts
@Resolver('Blog')
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  // ... other resolver methods

  @Mutation(() => Blog)
  async createBlog(
    @Args('createBlogInput') createBlogInput: CreateBlogInput,
  ): Promise<Blog> {
    const { title, content } = createBlogInput;
    const blog = new Blog();
    blog.title = title;
    blog.content = content;
    blog.createdAt = new Date();
    blog.updatedAt = new Date();
    return this.blogService.create(blog);
  }
}
```
Here, we're defining the createBlog mutation with a single argument createBlogInput, which is of type CreateBlogInput. This input type is defined as follows:

```ts
@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field()
  content: string;
}
```
The @InputType decorator indicates that this class defines an input type for GraphQL, and the @Field decorators on the title and content properties indicate that they should be included in the input.

In the resolver method, we're extracting the title and content properties from the createBlogInput object, creating a new Blog object with these properties and default values for createdAt and updatedAt, and passing it to the blogService.create method to create the blog in the database.

With these changes, you should be able to use the createBlog mutation in your GraphQL API without seeing the error you mentioned.




### 🙎🏻‍♂️ 💬  

create UpdateBlogInput

### ChatGPT

Sure! Here's an example of how you can define the UpdateBlogInput input type in your BlogResolver:

```ts
@InputType()
class UpdateBlogInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;
}
```
This input type has three fields: id, title, and content. The id field is required and of type ID. The title and content fields are optional and nullable, which means they can be omitted when updating a blog post.

In your BlogResolver, you can use this input type as follows to define the updateBlog mutation:

```ts
@Mutation(() => Blog)
async updateBlog(
  @Args('updateBlogInput') updateBlogInput: UpdateBlogInput,
): Promise<Blog> {
  const { id, title, content } = updateBlogInput;
  const blog = await this.blogService.findOne(id);
  if (!blog) {
    throw new NotFoundException(`Blog with ID ${id} not found`);
  }
  if (title) {
    blog.title = title;
  }
  if (content) {
    blog.content = content;
  }
  blog.updatedAt = new Date();
  return this.blogService.update(blog);
}
```
Here, we're using the UpdateBlogInput input type as the argument for the updateBlog mutation. We're extracting the id, title, and content fields from the input object, finding the blog post with the specified id using the blogService.findOne method, and then updating the title, content, and updatedAt fields of the blog post as necessary. Finally, we're returning the updated blog post from the mutation.

With these changes, you should be able to use the updateBlog mutation to update blog posts in your GraphQL API.




### 🙎🏻‍♂️ 💬  

create Service file

### ChatGPT

Sure! Here's an example of how you can define a BlogService class that provides methods for managing blog posts in your MongoDB database:

```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    return this.blogModel.findById(id).exec();
  }

  async create(blog: Blog): Promise<Blog> {
    const createdBlog = new this.blogModel(blog);
    return createdBlog.save();
  }

  async update(blog: Blog): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(blog._id, blog, { new: true }).exec();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.blogModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
```
Here, we're defining a BlogService class that uses the @InjectModel decorator to inject the Blog model, which we can use to perform CRUD operations on the blogs collection in our MongoDB database.

The findAll method returns all blog posts in the database, the findOne method finds a blog post by its _id property, the create method creates a new blog post, the update method updates an existing blog post, and the remove method deletes a blog post by its _id property.

You can use this BlogService class in your BlogResolver to implement the resolvers for your GraphQL API.



