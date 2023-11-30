import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';
import {
    ICreateEvent,
    IUpdateEvent,
    IUpsertEvent,
    OpenTo,
} from '@sportify-nx/shared/api';

// export interface IEvent {
//     _id?: _Id;
//     name: string;
//     date: Date;
//     location: string;
//     capacity: number;
//     openTo: OpenTo;
//     association: string | null;
//     users: string[];
// }

export class CreateEventDto implements ICreateEvent {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsDate()
    @IsNotEmpty()
    date!: Date;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsString()
    @IsNotEmpty()
    capacity!: number;

    @IsString()
    @IsNotEmpty()
    openTo!: OpenTo;

    @IsString()
    @IsNotEmpty()
    association!: string;

    @IsString()
    @IsNotEmpty()
    users!: string[];
}

export class UpsertEventDto implements IUpsertEvent {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsDate()
    @IsNotEmpty()
    date!: Date;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsString()
    @IsNotEmpty()
    capacity!: number;

    @IsString()
    @IsNotEmpty()
    openTo!: OpenTo;

    @IsString()
    @IsNotEmpty()
    association!: string;

    @IsString()
    @IsNotEmpty()
    users!: string[];
}

export class UpdateEventDto implements IUpdateEvent {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsDate()
    @IsNotEmpty()
    date!: Date;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsString()
    @IsNotEmpty()
    capacity!: number;

    @IsString()
    @IsNotEmpty()
    openTo!: OpenTo;

    @IsString()
    @IsNotEmpty()
    association!: string;

    @IsString()
    @IsNotEmpty()
    users!: string[];
}
