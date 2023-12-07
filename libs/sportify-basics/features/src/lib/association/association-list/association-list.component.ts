import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssociationService } from '../association.service';
import { IAssociation } from '@sportify-nx/shared/api';
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
  currentUser = this.authService.getUserFromLocalStorage();
  subscription: Subscription | undefined = undefined;

  constructor(private associationService: AssociationService, private router:Router, private authService: AuthService) {}

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
