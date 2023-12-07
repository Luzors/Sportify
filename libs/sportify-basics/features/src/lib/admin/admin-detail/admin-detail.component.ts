import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAdmin, IAssociation } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import { AssociationService } from '../../association/association.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'sportify-nx-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css'],
})
export class AdminDetailComponent implements OnInit, OnDestroy {
  admin: IAdmin | null = null;
  subscription: Subscription | undefined;
  association: IAssociation | undefined;

  constructor(private associationService: AssociationService, private adminService: AdminService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      if (_id) {
        this.subscription = this.adminService.read(_id).subscribe(
          (admin: IAdmin) => {
            this.admin = admin;

            if (this.admin?.association) {
              this.fetchAssociation(this.admin.association);
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
  private fetchAssociation(associationId: string): void {
    this.subscription = this.associationService.read(associationId).subscribe(
      (association: IAssociation) => {
        this.association = association;
      },
      error => {
        console.error('Error fetching association:', error);
        // Handle error scenario
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
