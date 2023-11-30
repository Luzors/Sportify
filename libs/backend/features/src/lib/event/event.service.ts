import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './schemas/event.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto, UpdateEventDto } from '@sportify-nx/backend/dto';

// export interface IEvent {
//     _id?: _Id;
//     name: string;
//     date: Date;
//     location: string;
//     capacity: number;
//     openTo: OpenTo;
//     association: string | null;
//     users: string[];
// }

@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>){
    }

    async create(createEventDto: CreateEventDto): Promise<Event> {
        const createdEvent = new this.eventModel(createEventDto);
        return createdEvent.save();
      }

      async update(eventId: string, updateEventDto: UpdateEventDto): Promise<Event> {
        const updatedEvent = await this.eventModel.findOneAndUpdate(
          { _id: eventId },
          updateEventDto,
          { new: true }
        );
    
        if (!updatedEvent) {
          throw new NotFoundException('Event not found');
        }
    
        return updatedEvent;
      }

      async delete(_id: string): Promise<void> {
        const result = await this.eventModel.deleteOne({ _id }).exec();
    
        if (result.deletedCount === 0) {
          throw new NotFoundException(`Event with id: ${_id} not found`);
        }
      }

      async findAll(): Promise<Event[]> {
        return this.eventModel.find().exec();
      }
      async findById(_id: string): Promise<Event | null> {
        return this.eventModel.findById(_id).exec();
      }
      
}
