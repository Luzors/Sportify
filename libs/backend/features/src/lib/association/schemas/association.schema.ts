import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {IsBoolean, IsInt, IsMongoId, IsString, isDate} from 'class-validator';
import { Sports } from '@sportify-nx/shared/api';

export type AssociationDocument = HydratedDocument<Association>;

@Schema()
export class Association {
  @IsMongoId()
  _id!: string;

  @Prop({required: true})
    name!: string;

  @Prop({required: true, type: String, enum: Object.values(Sports)})
  sport!: Sports;

}

export const AssociationSchema = SchemaFactory.createForClass(Association);