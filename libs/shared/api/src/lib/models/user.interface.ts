import { Id } from './id.type';

// export enum MealSort {
//     Breakfast = 'Breakfast',
//     Lunch = 'Lunch',
//     Dinner = 'Dinner',
//     Other = 'Other'
// }


export interface IUser {
    id: Id;
    name: string;
    email: string;
    password: string;
    male: boolean;
    roles: string;
    birthdate: Date;
}

export type ICreateUser = Pick<
    IUser,
    'id'| 'name' | 'email' | 'password' | 'male' | 'birthdate'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;

