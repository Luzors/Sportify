import { Module, forwardRef } from '@nestjs/common';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event/schemas/event.schema';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/schemas/user.schema';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AdminService } from './admin/admin.service';
import { Admin, AdminSchema } from './admin/schemas/admin.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
      MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [EventController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: UserService, useFactory: () => forwardRef(() => UserService) },
    { provide: AdminService, useFactory: () => forwardRef(() => AdminService) },
    { provide: EventService, useFactory: () => forwardRef(() => EventService) },
  ],
  exports: [
    EventService,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class BackendFeaturesEventModule {}
