import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssociationController } from './association/association.controller';
import { AssociationService } from './association/association.service';
import {
  Association,
  AssociationSchema,
} from './association/schemas/association.schema';
import { AdminService } from './admin/admin.service';
import { Admin, AdminSchema } from './admin/schemas/admin.schema';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Association.name, schema: AssociationSchema },
    ]),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AssociationController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    UserService,
    AssociationService,
    AdminService,
  ],
  exports: [
    AssociationService,
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([
      { name: Association.name, schema: AssociationSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class BackendFeaturesAssociationModule {}
