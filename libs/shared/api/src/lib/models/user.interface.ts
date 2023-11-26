import { _Id } from './id.type';

// export enum MealSort {
//     Breakfast = 'Breakfast',
//     Lunch = 'Lunch',
//     Dinner = 'Dinner',
//     Other = 'Other'
// }


export interface IUser {
    _id?: _Id;
    name: string;
    email: string;
    password: string;
    male: boolean;
    roles: string;
    birthdate: Date;
}

export type ICreateUser = Pick<
    IUser,
    '_id'| 'name' | 'email' | 'password' | 'male' | 'roles' | 'birthdate'
>;
export type IUpdateUser = Partial<Omit<IUser, '_id'>>;
export type IUpsertUser = IUser;

