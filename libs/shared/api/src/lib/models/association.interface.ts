import { _Id } from './id.type';

export enum Sports {
    Footbal = 'Footbal',
    Tennis = 'Tennis',
    Hockey = 'Hockey',
    Other = 'Other'
}

export interface IAssociation {
    _id?: _Id;
    name: string;
    sport: Sports;
}

export type ICreateAssociation = Pick<
    IAssociation,
    '_id'| 'name' | 'sport'
>;
export type IUpdateAssociation = Partial<Omit<IAssociation, '_id'>>;
export type IUpsertAssociation = IAssociation;