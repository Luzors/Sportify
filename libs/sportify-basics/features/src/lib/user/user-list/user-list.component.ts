import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'sportify-nx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: IUser[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private userService: UserService, private router:Router) {}

  ngOnInit(): void {
      this.subscription = this.userService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.users = results;
      });
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }
  delete(userId:string | undefined):void{
      this.userService.delete(userId).subscribe(
        () => {
          console.log('User deleted successfully:');
          if (this.users){
            this.users = this.users?.filter((user) => user._id !== userId);
          }
        },
        (error) => {
          console.error('Error updating user:', error);
          // Handle error scenario
        }
      );
    }
}