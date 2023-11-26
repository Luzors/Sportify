import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@sportify-nx/backend/dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') _id: string): Promise<void> {
    return this.userService.delete(_id);
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
