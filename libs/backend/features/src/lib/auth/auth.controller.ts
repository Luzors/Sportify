import { Body, Controller } from '@nestjs/common';
import { CreateUserDto } from '@sportify-nx/backend/dto';
import { User } from '../user/schemas/user.schema';
import { UserService } from './../user/user.service';
import { AuthService } from './../auth/auth.service';
import { Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ILoginUser } from '@sportify-nx/shared/api';
@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @Post('register')
    create(@Body() data: CreateUserDto): Promise<User> {
      return this.userService.create(data);
    }
    @Post('login')
    login(@Body() data: ILoginUser): Promise<{access_token: string;}> {
      return this.authService.login(data.email, data.password);
    }
}
