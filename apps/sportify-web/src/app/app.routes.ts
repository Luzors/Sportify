import { Route } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AboutComponent,
  AddEventComponent,
  AdminDetailComponent,
  AdminEditComponent,
  AdminFromAssociationListComponent,
  AssociationDetailComponent,
  AssociationEditComponent,
  AssociationListComponent,
  EventChardsComponent,
  EventDetailComponent,
  HomefillerComponent,
  LoginComponent,
  RegisterComponent,
  UserDetailComponent,
  UserEditComponent,
  UserListComponent,
  UsersInEventComponent,
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
    path: 'events/add',
    pathMatch: 'full',
    component: AddEventComponent,
  },
  {
    path: 'events/add/:id',
    pathMatch: 'full',
    component: AddEventComponent,
  },
  {
    path: 'events/:id',
    pathMatch: 'full',
    component: EventDetailComponent,
  },
  {
    path: 'events/:id/users',
    pathMatch: 'full',
    component: UsersInEventComponent,
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
    path: 'associations/:id/admin',
    pathMatch: 'full',
    component: AdminFromAssociationListComponent,
  },
  {
    path: 'admin/:id',
    pathMatch: 'full',
    component: AdminDetailComponent,
  },
  {
    path: 'admin/:id/edit',
    pathMatch: 'full',
    component: AdminEditComponent,
  },
  {
    path: 'admin/add',
    pathMatch: 'full',
    component: AdminEditComponent,
  },
  {
    path: 'auth/register',
    pathMatch: 'full',
    component: UserEditComponent,
  },
  {
    path: 'auth/login',
    pathMatch: 'full',
    component: LoginComponent,
  },

];
