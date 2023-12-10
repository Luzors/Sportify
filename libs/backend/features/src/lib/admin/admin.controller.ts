import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto, UpdateAdminDto } from '@sportify-nx/backend/dto';
import { AdminService } from './admin.service';
import { Admin } from './schemas/admin.schema';
import { Public } from '../auth/decorators/public.decorator';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';

@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private userService: UserService
  ) {}

  @Public()
  @Get('')
  getAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Delete(':id')
  async delete(
    @Req() request: Request,
    @Param('id') _id: string
  ): Promise<void> {
    const userEmail = (request as any)['user'];
    if (!userEmail) {
      throw new UnauthorizedException('Only users can edit their own account');
    }
    const currentUser = await this.userService.findByEmail(userEmail.email);
    const user = await this.adminService.findById(_id);

    if (currentUser?.roles === 'editor') {
      console.log('Updating user', _id);
      return this.adminService.delete(_id);
    } else if (!user) {
      throw new NotFoundException('User not found');
    } else {
      throw new UnauthorizedException('You can only update your own account');
    }
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
  async create(
    @Req() request: Request,
    @Body() data: CreateAdminDto
  ): Promise<Admin> {
    const userEmail = (request as any)['user'];
    if (!userEmail) {
      throw new UnauthorizedException(
        'You need to be logged in to create an admin'
      );
    }
    const currentUser = await this.userService.findByEmail(userEmail.email);

    if (currentUser?.roles === 'editor') {
      console.log('Creating admin');
      return this.adminService.create(data);
    } else if (!currentUser) {
      throw new NotFoundException('User not found');
    } else {
      throw new UnauthorizedException('You can only update your own account');
    }
  }
  @Put(':id')
  async updateAdmin(
    @Req() request: Request,
    @Param('id') adminId: string,
    @Body() updateAdminDto: UpdateAdminDto
  ): Promise<Admin> {
    const userEmail = (request as any)['user'];
    const adminReq = (request as any)['admin'];

    let currentUser;
    if (!userEmail) {
      currentUser = await this.userService.findByEmail(userEmail.email);
    } else if (!adminReq) {
      currentUser = await this.adminService.findByEmail(adminReq.email);
    } else {
      throw new UnauthorizedException(
        'You need to be logged in to update an admin'
      );
    }
    const user = await this.adminService.findById(adminId);

    if (
      (user && currentUser?.email === user.email) || 
      (currentUser instanceof User && currentUser?.roles === 'editor')
    ) {
      console.log('Updating admin');
      try {
        const updatedAdmin = await this.adminService.update(
          adminId,
          updateAdminDto
        );
        return updatedAdmin;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error; // Rethrow other errors
      }
    } else if (!user) {
      throw new NotFoundException('User not found');
    } else {
      throw new UnauthorizedException('You can only update your own account');
    }
  }
}
