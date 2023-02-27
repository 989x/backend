import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

import { LocationInput } from './location.input';

@Schema()
@ObjectType()
export class Estate {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field()
  property_type: string;

  @Field()
  property_status: string;

  @Field()
  post_status: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Location)
  location: Location;

  @Field()
  price: number;

  @Field()
  bedrooms: number;

  @Field()
  bathrooms: number;

  @Field()
  parking: number;

  @Field()
  size: number;

  @Field(() => [String])
  images: string[];

  @Prop({ default: Date.now })
  @Field()
  createdAt: Date;

  @Prop({ default: Date.now })
  @Field()
  updatedAt: Date;
}

export const EstateSchema = SchemaFactory.createForClass(Estate);
