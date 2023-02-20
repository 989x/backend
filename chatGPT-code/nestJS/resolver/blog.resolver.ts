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