import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, UnauthorizedException } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, CreateUserDto, UpdateEventDto } from '@sportify-nx/backend/dto';
import { Event } from './schemas/event.schema';
import { User } from '../user/schemas/user.schema';
import { Public } from '../auth/decorators/public.decorator';
import { UserService } from '../user/user.service';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../admin/schemas/admin.schema';

@ApiTags('events') // Tag for grouping API endpoints in Swagger
@Controller('events')
export class EventController {
  constructor(private eventService: EventService, private userService: UserService, private adminService: AdminService) {}

  @Public()
  @Get('')
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'Return a list of events', type: Event, isArray: true })
  getAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  delete(@Param('id') _id: string): Promise<void> {
    return this.eventService.delete(_id);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Return the event', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async getOne(@Param('id') _id: string): Promise<Event> {
    const event = await this.eventService.findById(_id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  @Post('')
  @ApiOperation({ summary: 'Create a new event' })
  @ApiBody({ type: CreateEventDto, description: 'Event data' })
  @ApiResponse({ status: 201, description: 'Event created successfully', type: Event })
  create(@Body() data: CreateEventDto): Promise<Event> {
    return this.eventService.create(data);
  }

  @Post(':id/user')
  @ApiOperation({ summary: 'Add a user to an event' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiBody({ type: CreateUserDto, description: 'User data' })
  @ApiResponse({ status: 200, description: 'User added successfully', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async addUser(@Param('id') eventId: string, @Body('user_id') user_id: string): Promise<Event> {
    console.log('Adding user to event:', eventId, ":::::" ,user_id);
    try {
      const updatedEvent = await this.eventService.addUser(eventId, user_id);
      return updatedEvent;
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.log('error:::', error);
        throw new NotFoundException(error.message);
      }
      throw error; // Rethrow other errors
    }
  }

  @Public()
  @Get(':id/user')
  @ApiOperation({ summary: 'Get all users for an event' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Return a list of users for the event', type: User, isArray: true })
  getAllUsers(@Param('id') eventId: string): Promise<User[]> {
    return this.eventService.findAllUsers(eventId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiBody({ type: UpdateEventDto, description: 'Updated event data' })
  @ApiResponse({ status: 200, description: 'Event updated successfully', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async updateEvent(
    @Req() request: Request,
    @Param('id') eventId: string,
    @Body() updateEventDto: UpdateEventDto
  ): Promise<Event> {
    const userEmail = (request as any)['user'];
    const adminReq = (request as any)['admin'];

    let currentUser;
    if (!userEmail) {
      currentUser = await this.userService.findByEmail(userEmail);
    } else if (!adminReq) {
      currentUser = await this.adminService.findByEmail(adminReq.email);
    } else {
      throw new UnauthorizedException(
        'You need to be logged in to update an admin'
      );
    }
  
    const event = await this.eventService.findById(eventId);
    console.log('association id', event?._id);
    if (
      (event && currentUser instanceof Admin && currentUser?.association === event._id) || 
      (currentUser instanceof User && currentUser?.roles === 'editor')
    ) {
      console.log('Update association');
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
    } else if (!event) {  
      throw new NotFoundException('Association not found');
    } else {  
      throw new UnauthorizedException('You can only update an association if you are an editor');
    }   
  }

  @Put(':id/user')
  @ApiOperation({ summary: 'Remove a user from an event' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiBody({ type: UpdateEventDto, description: 'Updated event data with user_id' })
  @ApiResponse({ status: 200, description: 'User removed successfully', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found' })
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
