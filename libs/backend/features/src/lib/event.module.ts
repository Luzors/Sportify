import { Module } from '@nestjs/common';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event/schemas/event.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: Event.name, schema: EventSchema}])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService, MongooseModule.forFeature([{name: Event.name, schema: EventSchema}])],
})
export class BackendFeaturesEventModule {}
