import { _Id } from './id.type';

export interface IAdmin {
    _id?: _Id;
    name: string;
    email: string;
    password: string;
    association: string | null;
}

export type ICreateAdmin = Pick<
    IAdmin,
    '_id'| 'name' | 'email' | 'password' | 'association'
>;
export type IUpdateAdmin = Partial<Omit<IAdmin, '_id'>>;
export type IUpsertAdmin = IAdmin;
export type ILoginAdmin = Pick<IAdmin, 'email' | 'password'>;

