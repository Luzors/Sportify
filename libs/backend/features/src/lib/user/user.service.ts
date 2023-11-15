import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '@sportify-nx/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    TAG = 'UsersService';

    private users$ = new BehaviorSubject<IUser[]>([
        {
            id: '0',
            name: 'Kelvin',
            email: 'k.lai@gmail.com',
            password: 'password',
            male: true,
            roles: 'user',
            birthdate: new Date(2002, 4, 16)
        },
    ]);

    getAll(): IUser[] {
        Logger.log('getAll', this.TAG);
        return this.users$.value;
    }

    getOne(id: string): IUser {
        Logger.log(`getOne(${id})`, this.TAG);
        const user = this.users$.value.find((td) => td.id === id);
        if (!user) {
            throw new NotFoundException(`Users could not be found!`);
        }
        return user;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(user: Pick<IUser, 'id' | 'email'>): IUser {
        Logger.log('create', this.TAG);
        const current = this.users$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newUsers: IUser = {
            ...user,
            id: `user-${Math.floor(Math.random() * 10000)}`,
            name: 'Milko',
            email: 'M.put@gmail.com',
            password: 'password',
            male: true,
            roles: 'user',
            birthdate: new Date(2001, 8, 12)
            
        };
        this.users$.next([...current, newUsers]);
        return newUsers;
    }
}
