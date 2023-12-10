import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAssociation, IAdmin } from '@sportify-nx/shared/api';
import { AdminService } from '../admin.service';
import { Subject, Subscription, of, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AssociationService } from '../../association/association.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'sportify-nx-admin-from-association-list',
  templateUrl: './admin-from-association-list.component.html',
  styleUrls: ['./admin-from-association-list.component.css'],
})
export class AdminFromAssociationListComponent implements OnInit, OnDestroy {
  admins: IAdmin[] | null = null;
  association: IAssociation | null = null;
  private destroy$: Subject<void> = new Subject<void>();
  private subscription: Subscription | undefined = undefined;
  currentAdmin: IAdmin | null = null;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private associationService: AssociationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          const _id = params.get('id');
          if (_id) {
            // Fetch association details based on the 'id' parameter
            return this.associationService.read(_id);
          } else {
            return of(null);
          }
        }),
        switchMap((association: IAssociation | null) => {
          // Store the association information
          this.association = association;

          // Check if association is not null before fetching admins
          if (association?._id) {
            return this.authService.getAdminFromLocalStorage();
          } else {
            // Return an observable emitting null if there is no association
            return of(null);
          }
        })
      )
      .subscribe(
        (admin: IAdmin | null) => {
          this.currentAdmin = admin;
          this.fetchAdmins();
        },
        (error) => {
          console.error('Error fetching data:', error);
          // Handle error scenario
        }
      );
  }

  private fetchAdmins(): void {
    if (this.association?._id) {
      this.subscription = this.associationService
        .adminList(this.association._id)
        .subscribe(
          (results: IAdmin[] | null) => {
            console.log('results for admins found:', results);
            this.admins = results;
            if (this.admins !== null && this.currentAdmin !== null) {
              for (let i = 0; i < this.admins?.length; i++) {
                console.log(this.admins[i]._id + ' ' + this.currentAdmin._id);
                if (this.admins[i]._id === this.currentAdmin._id) {
                  //if admin is in list
                }
              }
            }
          },
          (error) => {
            console.error('Error fetching data:', error);
            // Handle error scenario
          }
        );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  delete(adminId: string | undefined): void {
    this.authService
      .getTokenFromLocalStorage()
      .subscribe((token: string | null) => {
        if (!token) {
          console.error('No token found in local storage');
          return;
        }
        this.adminService.delete(adminId, token).subscribe(
          () => {
            console.log('Admin deleted successfully:');
            if (this.admins) {
              this.admins = this.admins?.filter(
                (admin) => admin._id !== adminId
              );
            }
          },
          (error) => {
            console.error('Error updating admin:', error);
            // Handle error scenario
          }
        );
      });
  }
}
