import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsInt, IsMongoId, IsString, isDate } from 'class-validator';
import { HydratedDocument } from 'mongoose';
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

  @Prop({required: true})
    name!: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email!: string;

  @Prop({required: true})
  password!: string;

  @Prop({required: true})
  male!: boolean;

  @Prop({required: true})
  roles!: string;

  @Prop({required: true})
  birthdate!: Date;

  @Prop({type: String, ref: 'Association', required: true})
  association!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);