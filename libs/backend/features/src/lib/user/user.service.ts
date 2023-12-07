import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '@sportify-nx/backend/dto';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>){
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

      async delete(_id: string): Promise<void> {
        const result = await this.userModel.deleteOne({ _id }).exec();
    
        if (result.deletedCount === 0) {
          throw new NotFoundException(`User with id: ${_id} not found`);
        }
      }
      async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
      }
      async findById(_id: string): Promise<User | null> {
        return this.userModel.findById(_id).exec();
      }
      async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email: email }).exec();
      }
      async findAllById(_ids: string[]): Promise<User[]> {
        return this.userModel.find({
          _id: {
            $in: _ids
          }
        }).exec();
      }
      
}
