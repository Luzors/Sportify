import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { IAssociation, IUser } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AssociationService } from '../../association/association.service';

@Component({
  selector: 'sportify-nx-user-detail',
  templateUrl: './user-detail.html',
  styleUrls: [],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: IUser | null = null;
  subscription: Subscription | undefined;
  association: IAssociation | undefined;

  constructor(private associationService: AssociationService, private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      if (_id) {
        this.subscription = this.userService.read(_id).subscribe(
          (user: IUser) => {
            this.user = user;

            if (this.user?.association) {
              this.fetchAssociation(this.user.association);
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
