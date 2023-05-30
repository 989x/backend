// ------------------------------------
// version 1
// <generateUniqueId.ts/version1.1>
// ------------------------------------

import { generateUniqueId } from './id-generator';

@Injectable()
export class EstateService {
  constructor(@InjectModel(Estate.name) private estateModel: Model<Estate>) {}

  async create(createEstateDto: CreateEstateDto): Promise<Estate> {
    const createdAt = new Date();
    const updatedAt = new Date();
    const estateId = generateUniqueId();
    const createdEstate = new this.estateModel({
      ...createEstateDto,
      estateId,
      createdAt,
      updatedAt,
    });
    return createdEstate.save();
  }

  // ...
}

// ------------------------------------
// version 2
// <generateUniqueId.ts/version1.1>
// ------------------------------------

async create(createEstateDto: CreateEstateDto): Promise<Estate> {
  const estateId = generateUniqueId();
  const createdAt = new Date();
  const updatedAt = new Date();

  // Check if the generated ID already exists in the database
  const existingEstate = await this.estateModel.findOne({ estateId }).exec();
  if (existingEstate) {
    // If the ID already exists, generate a new one recursively
    return this.create(createEstateDto);
  }

  const createdEstate = new this.estateModel({
    ...createEstateDto,
    estateId,
    createdAt,
    updatedAt,
  });
  return createdEstate.save();
}