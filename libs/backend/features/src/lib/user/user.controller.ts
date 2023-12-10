import { Body, Headers, Controller, Delete, Get, NotFoundException, Param, Post, Put, UnauthorizedException, Req } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@sportify-nx/backend/dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { Public } from '../auth/decorators/public.decorator';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Public()
  @Get('')
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Param('id') _id: string): Promise<void> {
    const userEmail = (request as any)['user'];
    if (!userEmail) {
      throw new UnauthorizedException('Only users can delete their own account');
    }
    const currentUser = await this.userService.findByEmail(userEmail.email); 
    const user = await this.userService.findById(_id);

    if (user && currentUser?.email === user.email || currentUser?.roles === 'editor') {
      console.log('Deleting user', _id);
      return this.userService.delete(_id);
    } else if (!user) {
      throw new NotFoundException('User not found');
    } else {
      throw new UnauthorizedException('You can only delete your own account');
    }
  }

  @Public()
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
  async updateUser(@Req() request: Request, @Param('id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const userEmail = (request as any)['user'];
    if (!userEmail) {
      throw new UnauthorizedException('Only users can edit their own account');
    }
    const currentUser = await this.userService.findByEmail(userEmail.email); 
    const user = await this.userService.findById(userId);

    if (user && currentUser?.email === user.email || currentUser?.roles === 'editor') {
      console.log('Updating user', userId);
      try {
        const updatedUser = await this.userService.update(userId, updateUserDto);
        return updatedUser;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error; 
      }
    } else if (!user) {
      throw new NotFoundException('User not found');
    } else {
      throw new UnauthorizedException('You can only update your own account');
    }
    
  }
  // private extractTokenFromHeader(authorizationHeader: string): string {
  //   if (authorizationHeader) {
  //     const [, token] = authorizationHeader.split(' ');
  //     return token;
  //   }
  //   console.log('No token found in header');
  //   return '';
  // }
}
