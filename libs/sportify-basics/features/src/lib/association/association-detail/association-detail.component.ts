import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAssociation } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import { AssociationService } from '../association.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sportify-nx-association-detail',
  templateUrl: './association-detail.component.html',
  styleUrls: ['./association-detail.component.css'],
})
export class AssociationDetailComponent implements OnInit, OnDestroy{
  association: IAssociation | null = null;
  subscription: Subscription | undefined;

  constructor(private associationService: AssociationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      if (_id) {
        this.subscription = this.associationService.read(_id).subscribe(
          (association: IAssociation) => {
            this.association = association;
          },
          error => {
            console.error('Error fetching association:', error);
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
}
