import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAdmin, IAssociation } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import { AssociationService } from '../../association/association.service';
import { AdminService } from '../admin.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'sportify-nx-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})
export class AdminEditComponent implements OnInit, OnDestroy{
  admin: IAdmin = {
    name: "",
    email: "",
    password: "",
    association: null,
  };
  subscription: Subscription | undefined;
  _paramId: string | null = null;
  associations: IAssociation[] | null = null;
  
  constructor(private authService: AuthService, private associationService: AssociationService, private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.subscription = this.associationService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.associations = results;
  });
  
    this.subscription = this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      this._paramId = _id;
      this.admin = {
        name: "New Admin",
        email: "",
        password: "password",
        association: null,
      };

  
      if (_id) {
        this.subscription = this.adminService.read(_id).subscribe(
          (admin: IAdmin) => {
            if (admin) {
              this.admin = admin;
            } else {
              console.error('Admin not found');
            }
          },
          error => {
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
  updateOrCreateAdmin(): void{
    if(this.admin._id){
      this.updateAdmin();
    } else {
      this.createAdmin();
    }
  }
  updateAdmin(): void {
    this.authService.getTokenFromLocalStorage().subscribe(
      (token: string | null) => {
        if (!token) {
          console.error('No token found in local storage');
          return;
        }
    this.adminService.update(this._paramId, this.admin, token).subscribe(
      (updatedAdmin: IAdmin) => {
        console.log('Admin updated successfully:', updatedAdmin, this._paramId,this.admin);
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
      this.adminService.create(this.admin, token).subscribe(
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
