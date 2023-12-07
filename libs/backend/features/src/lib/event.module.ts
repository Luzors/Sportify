import { Module } from '@nestjs/common';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event/schemas/event.schema';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/schemas/user.schema';

@Module({
  imports:  [  MongooseModule.forFeature([
    { name: Event.name, schema: EventSchema },
    { name: User.name, schema: UserSchema },
  ])],
  controllers: [EventController],
  providers: [EventService, UserService],
  exports: [EventService, MongooseModule.forFeature([{name: Event.name, schema: EventSchema}])],
})
export class BackendFeaturesEventModule {}
