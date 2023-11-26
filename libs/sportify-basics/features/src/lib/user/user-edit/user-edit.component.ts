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
  user: IUser = {
    name: "",
    email: "",
    password: "",
    male: true,
    roles: "",
    birthdate: new Date(2000, 4, 16)
  };
  subscription: Subscription | undefined;
  
  constructor(private userService: UserService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
  
      this.user = {
        name: "New User",
        email: "",
        password: "",
        male: true,
        roles: "user",
        birthdate: new Date(2000, 4, 16)
      };
  
      if (_id) {
        this.subscription = this.userService.read(_id).subscribe(
          (user: IUser) => {
            if (user) {
              this.user = user;
            } else {
              console.error('User not found');
            }
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
  createUser(): void {
    
    if (this.user) {
      this.userService.create(this.user).subscribe(
        (createdUser: IUser) => {
          console.log('User created successfully:', createdUser);

        },
        (error) => {
          console.error('Error creating user:', error);
          // Handle error scenario
        }
      );
    }
  }
}
