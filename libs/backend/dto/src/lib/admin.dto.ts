import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';
import {
    ICreateAdmin,
    IUpdateAdmin,
    IUpsertAdmin,
} from '@sportify-nx/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateAdminDto implements ICreateAdmin {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    association!: string | null;
}

export class UpsertAdminDto implements IUpsertAdmin {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    association!: string | null;
}

export class UpdateAdminDto implements IUpdateAdmin {
    @IsString()
    @IsOptional()
    name!: string;

    @IsString()
    @IsOptional()
    email!: string;

    @IsString()
    @IsOptional()
    password!: string;

    @IsString()
    @IsNotEmpty()
    association!: string | null;
}
