import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAssociation, Sports } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import { AssociationService } from '../association.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sportify-nx-association-edit',
  templateUrl: './association-edit.component.html',
  styleUrls: ['./association-edit.component.css'],
})
export class AssociationEditComponent implements OnInit, OnDestroy{
  sports = Object.values(Sports);
  association: IAssociation = {
    name: "",
    sport: Sports.Other,
  };
  subscription: Subscription | undefined;
  _paramId: string | null = null;
  
  constructor(private associationService: AssociationService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      this._paramId = _id;
      this.association = {
        name: "New Association",
        sport: Sports.Other,
      };
  
      if (_id) {
        this.subscription = this.associationService.read(_id).subscribe(
          (association: IAssociation) => {
            if (association) {
              this.association = association;
            } else {
              console.error('Association not found');
            }
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
  updateOrCreateAssociation(): void{
    if(this.association._id){
      this.updateAssociation();
    } else {
      this.createAssociation();
    }
  }
  updateAssociation(): void {
    this.associationService.update(this._paramId, this.association).subscribe(
      (updatedAssociation: IAssociation) => {
        console.log('Association updated successfully:', updatedAssociation, this._paramId,this.association);
        this.router.navigate(['/associations/' + this.association._id]);
      },
      (error) => {
        console.error('Error updating association:', error);
        // Handle error scenario
      }
    );
  }
  
  createAssociation(): void {
      this.associationService.create(this.association).subscribe(
        (createdAssociation: IAssociation) => {
          console.log('Association created successfully:', createdAssociation);
          this.router.navigate(['/associations']);
        },
        (error) => {
          console.error('Error creating association:', error);
        }
      );
    
  }
}
