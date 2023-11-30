
import { _Id } from './id.type';

export enum OpenTo {
    AllUsers = 'All users',
    MembersOnly = 'Members only',
    SameSportMembers = 'Same sport members'
}

export interface IEvent {
    _id?: _Id;
    name: string;
    date: Date;
    location: string;
    capacity: number;
    openTo: OpenTo;
    association: string | null;
    users: string[];
}

export type ICreateEvent = Pick<
    IEvent,
    '_id'| 'name' | 'date' | 'location' | 'capacity' | 'openTo' | 'association' | 'users'
>;
export type IUpdateEvent = Partial<Omit<IEvent, '_id'>>;
export type IUpsertEvent = IEvent;