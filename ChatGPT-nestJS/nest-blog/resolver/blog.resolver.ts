// ____________________________________ start BlogResolver ____________________________________

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



// ____________________________________ update createBlog ____________________________________

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



// ____________________________________ update createBlogInput ____________________________________

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



// ____________________________________ update updateBlog ____________________________________

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