import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsInt, IsMongoId, IsString, isDate } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Association } from '../../association/schemas/association.schema';
import { OpenTo } from '@sportify-nx/shared/api';

export type EventDocument = HydratedDocument<Event>;

// export interface IEvent {
//     _id?: _Id;
//     name: string;
//     date: Date;
//     location: string;
//     capacity: number;
//     openTo: OpenTo;
//     association: string | null;
//     users: string[];
@Schema()
export class Event {
  @IsMongoId()
  _id!: string;

  @Prop()
    name!: string;

    
  @Prop()
  birthdate!: Date;

  @Prop()
  location!: string;

  @Prop()
  capacity!: number;

  @Prop()
  openTo!: OpenTo;

  @Prop({type: String, ref: 'Association'})
  association!: string;

  @Prop([{type: String, ref: 'User'}])
  users!: string[] | null;
}

export const EventSchema = SchemaFactory.createForClass(Event);