import { Controller, NotFoundException, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IUser } from '@sportify-nx/shared/api';
import { CreateUserDto, UpdateUserDto } from '@sportify-nx/backend/dto';
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
  @Put(':id')
  async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userService.update(userId, updateUserDto);
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Rethrow other errors
    }
  }
}
