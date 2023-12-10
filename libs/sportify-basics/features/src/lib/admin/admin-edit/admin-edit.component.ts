import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAdmin, IAssociation } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import { AssociationService } from '../../association/association.service';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../admin.service';
// Import other necessary modules

@Component({
  selector: 'sportify-nx-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})
export class AdminEditComponent implements OnInit, OnDestroy {
  adminForm: FormGroup;
  admin: IAdmin = {
    name: '',
    email: '',
    password: '',
    association: null,
  };
  subscription: Subscription | undefined;
  _paramId: string | null = null;
  associations: IAssociation[] | null = null;

  constructor(
    private authService: AuthService,
    private associationService: AssociationService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.adminForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', []],
      association: ['', []],
    });
  }

  ngOnInit(): void {
    this.subscription = this.associationService.list().subscribe((results) => {
      this.associations = results;
    });

    this.subscription = this.route.paramMap.subscribe((params) => {
      const _id = params.get('id');
      this._paramId = _id;
      this.admin = {
        name: 'New Admin',
        email: '',
        password: 'password',
        association: null,
      };

      if (_id) {
        this.subscription = this.adminService.read(_id).subscribe(
          (admin: IAdmin) => {
            if (admin) {
              this.admin = admin;
              this.adminForm.patchValue(admin);
            } else {
              console.error('Admin not found');
            }
          },
          (error) => {
            console.error('Error fetching admin:', error);
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

  updateOrCreateAdmin(): void {
    if (this.adminForm.valid) {
      if (this._paramId) {
        this.updateAdmin();
      } else {
        this.createAdmin();
      }
    } else {
      // Handle form validation errors
      console.error('Form is not valid');
    }
  }

  updateAdmin(): void {
    this.authService.getTokenFromLocalStorage().subscribe(
      (token: string | null) => {
        if (!token) {
          console.error('No token found in local storage');
          return;
        }
        this.adminService
          .update(this._paramId, this.adminForm.value, token)
          .subscribe(
            (updatedAdmin: IAdmin) => {
              console.log(
                'Admin updated successfully:',
                updatedAdmin,
                this._paramId,
                this.adminForm.value
              );
              this.router.navigate(['/admin/' + this.admin._id]);
            },
            (error) => {
              console.error('Error updating admin:', error);
              // Handle error scenario
            }
          );
      }
    );
  }

  createAdmin(): void {
    this.authService.getTokenFromLocalStorage().subscribe(
      (token: string | null) => {
        if (!token) {
          console.error('No token found in local storage');
          return;
        }
        this.adminService.create(this.adminForm.value, token).subscribe(
          (createdAdmin: IAdmin) => {
            console.log('Admin created successfully:', createdAdmin);
            this.router.navigate(['/admin']);
          },
          (error) => {
            console.error('Error creating admin:', error);
          }
        );
      }
    );
  }
}
