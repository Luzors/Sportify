import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateAdminDto, UpdateAdminDto } from '@sportify-nx/backend/dto';
import { AdminService } from './admin.service';
import { Admin } from './schemas/admin.schema';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('')
    getAll(): Promise<Admin[]> {
      return this.adminService.findAll();
    }
  
    @Delete(':id')
    delete(@Param('id') _id: string): Promise<void> {
      return this.adminService.delete(_id);
    }
  
    @Get(':id')
    async getOne(@Param('id') _id: string): Promise<Admin> {
      const admin = await this.adminService.findById(_id);
      if (!admin) {
        throw new NotFoundException('Admin not found');
      }
      return admin;
    }
  
    @Post('')
    create(@Body() data: CreateAdminDto): Promise<Admin> {
        console.log("Creating admin", data);
      return this.adminService.create(data);
    }
    @Put(':id')
    async updateAdmin(@Param('id') adminId: string, @Body() updateAdminDto: UpdateAdminDto): Promise<Admin> {
      try {
        const updatedAdmin = await this.adminService.update(adminId, updateAdminDto);
        return updatedAdmin;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error; // Rethrow other errors
      }
    }
}
