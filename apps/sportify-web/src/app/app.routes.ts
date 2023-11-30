import { Route } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AboutComponent,
  AssociationDetailComponent,
  AssociationEditComponent,
  AssociationListComponent,
  EventChardsComponent,
  HomefillerComponent,
  LoginComponent,
  RegisterComponent,
  UserDetailComponent,
  UserEditComponent,
  UserListComponent,
} from '@sportify-nx/sportify-basics/features';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomefillerComponent,
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent,
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: UserListComponent,
  },
  {
    path: 'users/add',
    pathMatch: 'full',
    component: UserEditComponent,
  },
  {
    path: 'users/edit/:id',
    pathMatch: 'full',
    component: UserEditComponent,
  },
  {
    path: 'users/:id',
    pathMatch: 'full',
    component: UserDetailComponent,
  },
  {
    path: 'events',
    pathMatch: 'full',
    component: EventChardsComponent,
  },
  {
    path: 'associations',
    pathMatch: 'full',
    component: AssociationListComponent,
  },
  {
    path: 'associations/add',
    pathMatch: 'full',
    component: AssociationEditComponent,
  },
  {
    path: 'associations/edit/:id',
    pathMatch: 'full',
    component: AssociationEditComponent,
  },
  {
    path: 'associations/:id',
    pathMatch: 'full',
    component: AssociationDetailComponent,
  },
  {
    path: 'auth/register',
    pathMatch: 'full',
    component: RegisterComponent,
  },
  {
    path: 'auth/login',
    pathMatch: 'full',
    component: LoginComponent,
  },
];
