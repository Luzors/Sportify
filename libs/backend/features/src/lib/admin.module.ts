import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin/admin.controller';
import { Admin, AdminSchema } from './admin/schemas/admin.schema';
import { AdminService } from './admin/admin.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AdminController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    AdminService,
    UserService,
  ],
  exports: [
    AdminService,
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class BackendFeaturesAdminModule {}
