import { Route } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AboutComponent, HomefillerComponent, UserDetailComponent, UserEditComponent, UserListComponent } from '@sportify-nx/sportify-basics/features';
import { AddUserButtonComponent } from '@sportify-nx/ui';



export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: HomefillerComponent
    },
    {
       path: 'about',
       pathMatch: 'full',
       component: AboutComponent
    },
    {
        path: 'users',
        pathMatch: 'full',
        component: UserListComponent,
    },
    {
        path: 'users/add',
        pathMatch: 'full',
        component: UserEditComponent
    }
    ,
    {
        path: 'users/edit/:id',
        pathMatch: 'full',
        component: UserEditComponent
    }
    ,
    {
        path: 'users/:id',
        pathMatch: 'full',
        component: UserDetailComponent
    }

];
