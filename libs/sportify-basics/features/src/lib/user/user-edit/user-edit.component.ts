import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Param } from '@nestjs/common';

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
  _paramId: string | null = null;
  
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      this._paramId = _id;
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
  updateOrCreateUser(): void{
    if(this.user._id){
      this.updateUser();
    } else {
      this.createUser();
    }
  }
  updateUser(): void {
    this.userService.update(this._paramId, this.user).subscribe(
      (updatedUser: IUser) => {
        console.log('User updated successfully:', updatedUser, this._paramId,this.user);
        this.router.navigate(['/users/' + this.user._id]);
      },
      (error) => {
        console.error('Error updating user:', error);
        // Handle error scenario
      }
    );
  }
  
  createUser(): void {
      this.userService.create(this.user).subscribe(
        (createdUser: IUser) => {
          console.log('User created successfully:', createdUser);
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    
  }
}
