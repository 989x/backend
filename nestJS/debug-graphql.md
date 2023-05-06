### debug

### NestJs: Make sure your class is decorated with an appropriate decorator
- https://stackoverflow.com/questions/66225288/nestjs-make-sure-your-class-is-decorated-with-an-appropriate-decorator

How is your graphql server supposed to understand the type of FlatDataType when there's no information about it being passed to the graphql parser? You need to add the graphql decorators to it as well. `@ObjectType()`, `@Field()`, etc.

`FlatDataType` is not defined as `@ObjectType()`, therefore type-graphql (or @nestjs/graphql) can't take it as an output in GraphQL.

### Nest JS GraphQL “Cannot return null for non-nullable” [duplicate]
- https://stackoverflow.com/questions/58140891/nest-js-graphql-cannot-return-null-for-non-nullable

This is the fastest fix, just to launch.

```ts
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Recipe {
  @Field(type => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  creationDate?: Date;

  @Field(type => [String], { nullable: true })
  ingredients?: string[];
}
```