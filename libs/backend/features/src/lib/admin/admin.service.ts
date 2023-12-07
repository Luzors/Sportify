import { Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from './schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto, UpdateAdminDto } from '@sportify-nx/backend/dto';


@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private readonly adminModel: Model<Admin>){
    }

    async create(createAdminDto: CreateAdminDto): Promise<Admin> {
        const createdAdmin = new this.adminModel(createAdminDto);
        return createdAdmin.save();
      }

      async update(adminId: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
        const updatedAdmin = await this.adminModel.findOneAndUpdate(
          { _id: adminId },
          updateAdminDto,
          { new: true }
        );
    
        if (!updatedAdmin) {
          throw new NotFoundException('Admin not found');
        }
    
        return updatedAdmin;
      }

      async delete(_id: string): Promise<void> {
        const result = await this.adminModel.deleteOne({ _id }).exec();
    
        if (result.deletedCount === 0) {
          throw new NotFoundException(`Admin with id: ${_id} not found`);
        }
      }
      async findAll(): Promise<Admin[]> {
        return this.adminModel.find().exec();
      }
      async findById(_id: string): Promise<Admin | null> {
        return this.adminModel.findById(_id).exec();
      }
      async findByEmail(email: string): Promise<Admin | null> {
        return this.adminModel.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }).exec();
      }
      async findAllById(_ids: string[]): Promise<Admin[]> {
        return this.adminModel.find({
          _id: {
            $in: _ids
          }
        }).exec();
      }
      
}
