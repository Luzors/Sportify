import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';
import {
    ICreateAssociation,
    IUpdateAssociation,
    IUpsertAssociation,
    Sports,
} from '@sportify-nx/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateAssociationDto implements ICreateAssociation {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    sport!: Sports;

}

export class UpsertAssociationDto implements IUpsertAssociation {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    sport!: Sports;
}

export class UpdateAssociationDto implements IUpdateAssociation {
    @IsString()
    @IsOptional()
    name!: string;

    @IsOptional()
    sport!: Sports;
}
