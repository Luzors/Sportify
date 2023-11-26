import { Controller, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IUser } from '@sportify-nx/shared/api';
import { CreateUserDto } from '@sportify-nx/backend/dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') _id: string): Promise<User> {
    const user = await this.userService.findById(_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('')
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }
}
