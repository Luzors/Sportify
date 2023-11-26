import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { AssociationService } from './association.service';
import { CreateAssociationDto, UpdateAssociationDto } from '@sportify-nx/backend/dto';
import { Association } from './schemas/association.schema';

@Controller('associations')
export class AssociationController {
    constructor(private associationService: AssociationService) {}

    
  @Get('')
  getAll(): Promise<Association[]> {
    return this.associationService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') _id: string): Promise<void> {
    return this.associationService.delete(_id);
  }

  @Get(':id')
  async getOne(@Param('id') _id: string): Promise<Association> {
    const association = await this.associationService.findById(_id);
    if (!association) {
      throw new NotFoundException('Association not found');
    }
    return association;
  }

  @Post('')
  create(@Body() data: CreateAssociationDto): Promise<Association> {
    return this.associationService.create(data);
  }
  @Put(':id')
  async updateAssociation(@Param('id') associationId: string, @Body() updateAssociationDto: UpdateAssociationDto): Promise<Association> {
    try {
      const updatedAssociation = await this.associationService.update(associationId, updateAssociationDto);
      return updatedAssociation;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Rethrow other errors
    }
  }
}
