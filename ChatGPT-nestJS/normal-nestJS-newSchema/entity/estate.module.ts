import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@ObjectType()
export class Location {
  @Field()
  address: string;

  @Field()
  subdistrict: string;

  @Field()
  district: string;

  @Field()
  province: string;

  @Field()
  postcode: string;

  @Field()
  country: string;
}

export type EstateDocument = Estate & mongoose.Document;

@Schema()
@ObjectType()
export class Estate {
  @Field(() => ID)
  _id: number;

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

  @Prop({ required: true, default: Date.now })
  @Field()
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  @Field()
  updatedAt: Date;
}

export const EstateSchema = SchemaFactory.createForClass(Estate);
