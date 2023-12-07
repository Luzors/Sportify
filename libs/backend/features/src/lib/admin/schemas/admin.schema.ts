import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsInt, IsMongoId, IsString, isDate } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Association } from '../../association/schemas/association.schema';

export type AdminDocument = HydratedDocument<Admin>;

// export interface IAdmin {
//   id: Id;
//   name: string;
//   email: string;
//   password: string;
//   male: boolean;
//   roles: string;
//   birthdate: Date;
@Schema()
export class Admin {
  @IsMongoId()
  _id!: string;

  @Prop()
    name!: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email!: string;

  @Prop()
  password!: string;

  @Prop({type: String, ref: 'Association', required: true})
  association!: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);