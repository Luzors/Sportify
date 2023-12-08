import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin/admin.controller';
import { Admin, AdminSchema } from './admin/schemas/admin.schema';
import { AdminService } from './admin/admin.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AdminController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, AdminService ],
  exports: [
    AdminService,
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
})
export class BackendFeaturesAdminModule {}
