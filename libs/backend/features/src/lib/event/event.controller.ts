import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import {
  CreateEventDto,
  CreateUserDto,
  UpdateEventDto,
} from '@sportify-nx/backend/dto';
import { Event } from './schemas/event.schema';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('')
  getAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') _id: string): Promise<void> {
    return this.eventService.delete(_id);
  }

  @Get(':id')
  async getOne(@Param('id') _id: string): Promise<Event> {
    const event = await this.eventService.findById(_id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  @Post('')
  create(@Body() data: CreateEventDto): Promise<Event> {
    return this.eventService.create(data);
  }

  @Post(':id/user')
  async addUser(
    @Param('id') eventId: string,
    @Body() user_id: string
  ): Promise<Event> {
    try {
      const updatedEvent = await this.eventService.addUser(eventId, user_id);
      return updatedEvent;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Rethrow other errors
    }
  }
  @Get(':id/user')
  getAllUsers(@Param('id') eventId: string): Promise<User[]> {
    return this.eventService.findAllUsers(eventId);
  }
  @Put(':id')
  async updateEvent(
    @Param('id') eventId: string,
    @Body() updateEventDto: UpdateEventDto
  ): Promise<Event> {
    try {
      const updatedEvent = await this.eventService.update(
        eventId,
        updateEventDto
      );
      return updatedEvent;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Rethrow other errors
    }
  }
  @Put(':id/user')
async deleteUser(
  @Param('id') eventId: string,
  @Body('user_id') user_id: string
): Promise<Event> {
  try {
    const updatedEvent = await this.eventService.removeUser(eventId, user_id);
    return updatedEvent;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    throw error; // Rethrow other errors
  }
}

}
