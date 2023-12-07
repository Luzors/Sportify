import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './schemas/event.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto, CreateUserDto, UpdateEventDto } from '@sportify-nx/backend/dto';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';

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
    constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>, private readonly userService: UserService){
    }

    async create(createEventDto: CreateEventDto): Promise<Event> {
        const createdEvent = new this.eventModel(createEventDto);
        return createdEvent.save();
      }
      async addUser(eventId: string, user_id: string): Promise<Event> {
        try {
          if(await this.userService.findById(user_id)){
            const updatedEvent = await this.eventModel.findOneAndUpdate(
              { _id: eventId },
              { $push: { users: user_id } },
              { new: true }
            );
            if (!updatedEvent) {
              throw new NotFoundException('Event not found');
            }
            return updatedEvent;
          } else{
            throw new NotFoundException('Event not found');
          }
        } catch (error) {
          if (error instanceof NotFoundException) {
            throw error;
          }
          throw new Error('Failed to add user to event');
        }
      }
      async findAllUsers(_id: string): Promise<User[]> {
        const event = await this.eventModel.findById(_id).exec();
        if(!event){
          throw new NotFoundException('Event not found');
        }
        if(event.users){
        return this.userService.findAllById(event.users);
      }
      return [];
    }
    async removeUser(eventId: string, userId: string): Promise<Event> {
      try {
        const updatedEvent = await this.eventModel.findOneAndUpdate(
          { _id: eventId, users: { $in: [userId] } },
          { $pull: { users: userId } }, 
          { new: true }
        );
      
        if (!updatedEvent) {
          throw new NotFoundException('Event not found');
        }
      
        return updatedEvent;
      } catch (error) {
        console.error('Error removing user from event:', error);
        throw error; // rethrow the error
      }
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
