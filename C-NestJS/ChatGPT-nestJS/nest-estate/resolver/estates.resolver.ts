import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Estate } from './estate.schema';
import { EstateService } from './estate.service';
import { CreateEstateInput } from './dto/create-estate.input';

@Resolver(() => Estate)
export class EstateResolver {
  constructor(private estateService: EstateService) {}

  @Query(() => [Estate])
  async estates(): Promise<Estate[]> {
    return this.estateService.findAll();
  }

  @Mutation(() => Estate)
  async createEstate(@Args('createEstateInput') createEstateInput: CreateEstateInput): Promise<Estate> {
    return this.estateService.create(createEstateInput);
  }
}
