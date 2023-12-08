import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssociationService } from '../association.service';
import { IAdmin, IAssociation } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import {Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'sportify-nx-association-list',
  templateUrl: './association-list.component.html',
  styleUrls: ['./association-list.component.css'],
})
export class AssociationListComponent implements OnInit, OnDestroy {
  associations: IAssociation[] | null = null;
  myAssociation: IAssociation | null = null;
  currentUser: IAdmin | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private associationService: AssociationService, private router:Router, private authService: AuthService) {
    this.authService.getAdminFromLocalStorage().subscribe(admin => {
      this.currentUser = admin;
      if (this.currentUser?.association){
        this.associationService.read(this.currentUser?.association).subscribe(association => {
          this.myAssociation = association;
        });
      }
    });
  }

  ngOnInit(): void {
      this.subscription = this.associationService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.associations = results;
      });
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }
  delete(associationId:string | undefined):void{
      this.associationService.delete(associationId).subscribe(
        () => {
          console.log('Association deleted successfully:');
          window.location.reload();
        },
        (error) => {
          console.error('Error updating association:', error);
          // Handle error scenario
        }
      );
    }
}
