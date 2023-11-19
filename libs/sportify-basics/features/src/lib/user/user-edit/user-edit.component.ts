import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sportify-nx-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy{
  user: IUser | null = null;
  subscription: Subscription | undefined;
  
  constructor(private userService: UserService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.subscription = this.userService.read(id).subscribe(
          (user: IUser) => {
            this.user = user;
          },
          error => {
            console.error('Error fetching user:', error);
            // Handle error scenario
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
