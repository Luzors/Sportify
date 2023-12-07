import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin/admin.controller';
import { Admin, AdminSchema } from './admin/schemas/admin.schema';
import { AdminService } from './admin/admin.service';

@Module({ 
imports:[MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema}])],
controllers: [AdminController],
providers: [AdminService],
exports: [AdminService, MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema}])],})
export class BackendFeaturesAdminModule {}
