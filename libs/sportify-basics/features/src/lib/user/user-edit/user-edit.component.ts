import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAssociation, IUser } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssociationService } from '../../association/association.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'sportify-nx-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  subscription: Subscription | undefined;
  _paramId: string | null = null;
  associations: IAssociation[] | null = null;

  constructor(
    private authService: AuthService,
    private associationService: AssociationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscription = this.associationService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.associations = results;
    });

    this.subscription = this.route.paramMap.subscribe((params) => {
      const _id = params.get('id');
      this._paramId = _id;
      this.userForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        male: [true],
        birthdate: [new Date(2000, 4, 16)],
        association: [null],
      });

      if (_id) {
        this.subscription = this.userService.read(_id).subscribe(
          (user: IUser) => {
            if (user) {
              this.userForm.patchValue(user);
            } else {
              console.error('User not found');
            }
          },
          (error) => {
            console.error('Error fetching user:', error);
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

  updateOrCreateUser(): void {
    if (this.userForm.valid) {
      if (this.userForm.get('_id')?.value) {
        this.updateUser();
      } else {
        this.createUser();
      }
    }
  }

  updateUser(): void {
    this.authService.getTokenFromLocalStorage().subscribe(
      (token: string | null) => {
        if (!token) {
          console.error('No token found in local storage');
          return;
        }

        this.userService
          .update(this._paramId, this.userForm.value, token)
          .subscribe(
            (updatedUser: IUser) => {
              console.log(
                'User updated successfully:',
                updatedUser,
                this._paramId,
                this.userForm.value
              );
              this.router.navigate(['/users/' + this.userForm.get('_id')?.value]);
            },
            (error) => {
              console.error('Error updating user:', error);
            }
          );
      }
    );
  }

  createUser(): void {
    this.userService.create(this.userForm.value).subscribe(
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
