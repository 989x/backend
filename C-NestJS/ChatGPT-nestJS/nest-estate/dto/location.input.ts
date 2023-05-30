import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LocationInput {
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
