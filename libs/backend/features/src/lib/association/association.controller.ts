import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AssociationService } from './association.service';
import {
  CreateAssociationDto,
  UpdateAssociationDto,
} from '@sportify-nx/backend/dto';
import { Association } from './schemas/association.schema';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../admin/schemas/admin.schema';
import { Public } from '../auth/decorators/public.decorator';
import { UserService } from '../user/user.service';

@Controller('associations')
export class AssociationController {
  constructor(
    private adminService: AdminService,
    private associationService: AssociationService,
    private userService: UserService,
  ) {}

  @Public()
  @Get('')
  getAll(): Promise<Association[]> {
    return this.associationService.findAll();
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Param('id') _id: string): Promise<void> {
    const userEmail = (request as any)['user'];
    if (!userEmail) {
      throw new UnauthorizedException('Only logged in editors can update an association');
    }
    const currentUser = await this.userService.findByEmail(userEmail.email); 

    if (currentUser?.roles === 'editor') {
      console.log('Create association');
      return this.associationService.delete(_id);
    } else if (!currentUser) {
      throw new NotFoundException('User not logged in');
    } else {
      throw new UnauthorizedException('You can only update an association if you are an editor');
    }
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') _id: string): Promise<Association> {
    const association = await this.associationService.findById(_id);
    if (!association) {
      throw new NotFoundException('Association not found');
    }
    return association;
  }
  
  @Public()
  @Get(':id/admins')
  getAllAdmins(@Param('id') association_id: string): Promise<Admin[]> {
    return this.adminService.findAllByAssociation(association_id);
  }

  @Post('')
  async create(@Req() request: Request, @Body() data: CreateAssociationDto): Promise<Association> {
    const userEmail = (request as any)['user'];
    if (!userEmail) {
      throw new UnauthorizedException('Only users can delete their own account');
    }
    const currentUser = await this.userService.findByEmail(userEmail.email); 

    if (currentUser?.roles === 'editor') {
      console.log('Create association');
      return this.associationService.create(data);
    } else if (!currentUser) {
      throw new NotFoundException('User not logged in');
    } else {
      throw new UnauthorizedException('You can only create an association if you are an editor');
    }

  }
  @Put(':id')
  async updateAssociation(
    @Req() request: Request,
    @Param('id') associationId: string,
    @Body() updateAssociationDto: UpdateAssociationDto
  ): Promise<Association> {
    const userEmail = (request as any)['user'];
    if (!userEmail) {
      throw new UnauthorizedException('Only logged in editors can update an association');
    }
    const currentUser = await this.userService.findByEmail(userEmail.email); 

    if (currentUser?.roles === 'editor') {
      console.log('Create association');
      try {
        const updatedAssociation = await this.associationService.update(
          associationId,
          updateAssociationDto
        );
        return updatedAssociation;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error; // Rethrow other errors
      }
    } else if (!currentUser) {
      throw new NotFoundException('User not logged in');
    } else {
      throw new UnauthorizedException('You can only update an association if you are an editor');
    }
  }
}
