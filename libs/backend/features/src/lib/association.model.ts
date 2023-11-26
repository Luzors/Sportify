import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssociationController } from './association/association.controller';
import { AssociationService } from './association/association.service';
import { Association, AssociationSchema } from './association/schemas/association.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Association.name, schema: AssociationSchema }]),
  ],
  controllers: [AssociationController],
  providers: [AssociationService],
  exports: [
    AssociationService,
    MongooseModule.forFeature([{ name: Association.name, schema: AssociationSchema }]),
  ],
})
export class BackendFeaturesAssociationModule {}
