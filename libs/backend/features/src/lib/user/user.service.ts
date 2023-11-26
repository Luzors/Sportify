import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '@sportify-nx/backend/dto';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>){
        this.seedDb();
    }
    async seedDb(){
        const currentUsers = await this.findAll();
            if (currentUsers.length > 0) {
              return;
            }
            const seedUser1 = new User();
            seedUser1.name = 'Wan Uzehr';
            seedUser1.email = 'wan.uzehr@gmail.com';
            seedUser1.password = 'password';
            seedUser1.male = true;
            seedUser1.roles = 'user,admin';
            seedUser1.birthdate = new Date(2002, 4, 16);
            const newSeedUser1 = new this.userModel(seedUser1);
            await newSeedUser1.save();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
      }

      async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findOneAndUpdate(
          { _id: userId },
          updateUserDto,
          { new: true }
        );
    
        if (!updatedUser) {
          throw new NotFoundException('User not found');
        }
    
        return updatedUser;
      }

    
      async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
      }
      async findById(_id: string): Promise<User | null> {
        return this.userModel.findById(_id).exec();
      }
      
}
