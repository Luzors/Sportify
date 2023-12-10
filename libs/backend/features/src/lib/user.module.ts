import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/schemas/user.schema';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin/admin.service';
import { Admin, AdminSchema } from './admin/schemas/admin.schema';
import { EventService } from './event/event.service';
import { Event, EventSchema } from './event/schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [UserController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: UserService, useFactory: () => forwardRef(() => UserService) },
    { provide: AuthService, useFactory: () => forwardRef(() => AuthService) },
    { provide: AdminService, useFactory: () => forwardRef(() => AdminService) },
    { provide: EventService, useFactory: () => forwardRef(() => EventService) },
  ],
  exports: [
    UserService,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
})
export class BackendFeaturesUserModule {}
