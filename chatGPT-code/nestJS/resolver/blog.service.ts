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



