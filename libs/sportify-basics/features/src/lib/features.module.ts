import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule2 } from '@sportify-nx/sportify-basics/common';
import { AboutComponent } from './about/about.component';
import { AssociationDetailComponent } from './association/association-detail/association-detail.component';
import { AssociationEditComponent } from './association/association-edit/association-edit.component';
import { AssociationListComponent } from './association/association-list/association-list.component';
import { AssociationService } from './association/association.service';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { EventChardsComponent } from './event/event-chards/event-chards.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { HomefillerComponent } from './homefiller/homefiller.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserService } from './user/user.service';
import { EventService } from './event/event.service';
import { UsersInEventComponent } from './event/users-in-event/users-in-event.component';
import { AdminFromAssociationListComponent } from './admin/admin-from-association-list/admin-from-association-list.component';
import { AdminService } from './admin/admin.service';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { AdminEditComponent } from './admin/admin-edit/admin-edit.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterLink,
    CommonModule2,
    FormsModule,
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    HomefillerComponent,
    AboutComponent,
    UserEditComponent,
    EventChardsComponent,
    AssociationListComponent,
    AssociationDetailComponent,
    AssociationEditComponent,
    LoginComponent,
    RegisterComponent,
    AddEventComponent,
    EventDetailComponent,
    UsersInEventComponent,
    AdminFromAssociationListComponent,
    AdminDetailComponent,
    AdminEditComponent,
  ],
  providers: [
    UserService,
    AssociationService,
    AuthService,
    EventService,
    AdminService,
  ],
  exports: [
    UserListComponent,
    UserDetailComponent,
    HomefillerComponent,
    AboutComponent,
    UserEditComponent,
    EventChardsComponent,
    AssociationListComponent,
    AssociationDetailComponent,
    AssociationEditComponent,
    LoginComponent,
    RegisterComponent,
    AddEventComponent,
    EventDetailComponent,
    UsersInEventComponent,
    AdminFromAssociationListComponent,
    AdminDetailComponent,
    AdminEditComponent,
  ],
})
export class FeaturesModule {}
