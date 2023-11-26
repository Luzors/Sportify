import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {IsBoolean, IsInt, IsMongoId, IsString, isDate} from 'class-validator';
import { Association } from '../../association/schemas/association.schema';

export type UserDocument = HydratedDocument<User>;

// export interface IUser {
//   id: Id;
//   name: string;
//   email: string;
//   password: string;
//   male: boolean;
//   roles: string;
//   birthdate: Date;
@Schema()
export class User {
  @IsMongoId()
  _id!: string;

  @Prop()
    name!: string;

  @Prop()
  email!: string;

  @Prop()
  password!: string;

  @Prop()
  male!: boolean;

  @Prop()
  roles!: string;

  @Prop()
  birthdate!: Date;

  @Prop({type: String, ref: 'Association'})
  association!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);