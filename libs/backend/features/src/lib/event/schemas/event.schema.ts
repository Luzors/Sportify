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

  @Prop({required: true})
  name!: string;

  @Prop({required: true})
  date!: Date;

  @Prop({required: true})
  location!: string;

  @Prop({required: true})
  capacity!: number;

  @Prop({required: true, type: String, enum: Object.values(OpenTo)})
  openTo!: OpenTo;

  @Prop({ type: String, ref: 'Association', required: true })
  association!: string;

  @Prop([{ type: String, ref: 'User' }])
  users!: string[] | null;
}

export const EventSchema = SchemaFactory.createForClass(Event);
