import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';
import {
    ICreateUser,
    IUpdateUser,
    IUpsertUser,
} from '@sportify-nx/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateUserDto implements ICreateUser {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsBoolean()
    @IsNotEmpty()
    male!: boolean;

    @IsDate()
    @IsNotEmpty()
    birthdate!: Date;
}

export class UpsertUserDto implements IUpsertUser {
    @IsString()
    @IsNotEmpty()
    id!: string;

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
    male!: boolean;

    @IsString()
    @IsNotEmpty()
    roles!: string;

    @IsDate()
    @IsNotEmpty()
    birthdate!: Date;
}

export class UpdateUserDto implements IUpdateUser {
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
    @IsOptional()
    roles!: string;

    @IsBoolean()
    @IsOptional()
    completed!: boolean;
}
