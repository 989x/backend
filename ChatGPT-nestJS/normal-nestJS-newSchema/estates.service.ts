import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estate, EstateDocument } from './estate.model';
import { CreateEstateInput } from './create-estate.input';

@Injectable()
export class EstateService {
  constructor(
    @InjectModel(Estate.name) private estateModel: Model<EstateDocument>,
  ) {}

    //   async create(createEstateInput: CreateEstateInput): Promise<Estate> {
    //     const estate = new this.estateModel(createEstateInput);
    //     await estate.save();
    //     return estate.toObject();
    //   }

    // 🙎🏻‍♂️ 💬 Estate validation failed: updatedAt: Path `updatedAt` is required., createdAt: Path `createdAt` is required."

  async create(createEstateInput: CreateEstateInput): Promise<Estate> {
    const createdAt = new Date();
    const updatedAt = new Date();
  
    const createdEstate = new this.estateModel({
      ...createEstateInput,
      createdAt,
      updatedAt,
    });
  
    return createdEstate.save();
  }
}
