import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstateResolver } from './estate.resolver';
import { EstateService } from './estate.service';
import { Estate, EstateSchema } from './estate.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([{ name: Estate.name, schema: EstateSchema }]),
  ],
  providers: [EstateResolver, EstateService],
})
export class AppModule {}
