import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '@sportify-nx/backend/dto';
import { User } from '../user/schemas/user.schema';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private userService: UserService, private jwtService: JwtService){}

    async login(email: string, pass: string) {
        const user = await this.userService.findByEmail(email);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user._id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
          user: user,
        };
      }
      async validateToken(token: string) {
        try {
          const decoded = await this.jwtService.verifyAsync(token);
          const user = await this.userService.findByEmail(decoded.email);
    
          if (!user) {
            throw new UnauthorizedException();
          }
    
          return user;
        } catch (error) {
          throw new UnauthorizedException();
        }
      }
      
      
}
