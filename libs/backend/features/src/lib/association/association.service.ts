import { Injectable, NotFoundException } from '@nestjs/common';
import { Association } from './schemas/association.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssociationDto, UpdateAssociationDto } from '@sportify-nx/backend/dto';
import { Sports } from '@sportify-nx/shared/api';
import { AdminService } from '../admin/admin.service';


@Injectable()
export class AssociationService {
    constructor(@InjectModel(Association.name) private readonly associationModel: Model<Association>, private adminService: AdminService){
        this.seedDb();
    }
    async seedDb(){
        const currentAssociations = await this.findAll();
            if (currentAssociations.length > 0) {
              return;
            }
            const seedAssociation1 = new Association();
            seedAssociation1.name = 'DaWanAssociation';
            seedAssociation1.sport = Sports.Footbal;

            const newSeedAssociation1 = new this.associationModel(seedAssociation1);
            await newSeedAssociation1.save();
    }

    async create(createAssociationDto: CreateAssociationDto): Promise<Association> {
        const createdAssociation = new this.associationModel(createAssociationDto);
        return createdAssociation.save();
      }

      async update(associationId: string, updateAssociationDto: UpdateAssociationDto): Promise<Association> {
        const updatedAssociation = await this.associationModel.findOneAndUpdate(
          { _id: associationId },
          updateAssociationDto,
          { new: true }
        );
    
        if (!updatedAssociation) {
          throw new NotFoundException('Association not found');
        }
    
        return updatedAssociation;
      }

      async delete(_id: string): Promise<void> {
        await this.adminService.deleteAllByAssociation(_id);
        const result = await this.associationModel.deleteOne({ _id }).exec();
    
        if (result.deletedCount === 0) {
          throw new NotFoundException(`Association with id: ${_id} not found`);
        }
      }
      async findAll(): Promise<Association[]> {
        return this.associationModel.find().exec();
      }
      async findById(_id: string): Promise<Association | null> {
        return this.associationModel.findById(_id).exec();
      }
      
}
