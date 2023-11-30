import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserService } from './user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HomefillerComponent } from './homefiller/homefiller.component';
import { AboutComponent } from './about/about.component';
import { RouterLink, Router } from '@angular/router';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { CommonModule2 } from '@sportify-nx/sportify-basics/common';
import { EventChardsComponent } from './event/event-chards/event-chards.component';
import { FormsModule } from '@angular/forms';
import { AssociationListComponent } from './association/association-list/association-list.component';
import { AssociationDetailComponent } from './association/association-detail/association-detail.component';
import { AssociationEditComponent } from './association/association-edit/association-edit.component';
import { AssociationService } from './association/association.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { forwardRef } from '@angular/core';

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
  ],
  providers: [UserService, AssociationService, AuthService],
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
  ],
})
export class FeaturesModule {}
