import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserService } from './user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HomefillerComponent } from './homefiller/homefiller.component';
import { AboutComponent } from './about/about.component';
import { RouterLink} from '@angular/router';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterLink],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    HomefillerComponent,
    AboutComponent
  ],
  providers: [UserService],
  exports: [UserListComponent, UserDetailComponent, HomefillerComponent, AboutComponent]
})
export class FeaturesModule {}
