@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field()
  content: string;
}