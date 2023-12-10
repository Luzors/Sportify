// Import necessary modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAssociation, Sports } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import { AssociationService } from '../association.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sportify-nx-association-edit',
  templateUrl: './association-edit.component.html',
  styleUrls: ['./association-edit.component.css'],
})
export class AssociationEditComponent implements OnInit, OnDestroy {
  sports = Object.values(Sports);
  associationForm!: FormGroup; 
  subscription: Subscription | undefined;
  _paramId: string | null = null;
  association: IAssociation | undefined;

  constructor(
    private fb: FormBuilder,
    private associationService: AssociationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.subscription = this.route.paramMap.subscribe((params) => {
      const _id = params.get('id');
      this._paramId = _id;

      if (_id) {
        this.subscription = this.associationService.read(_id).subscribe(
          (association: IAssociation) => {
            if (association) {
              this.association = association;
              this.associationForm.patchValue(association);
            } else {
              console.error('Association not found');
            }
          },
          (error) => {
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

  initForm(): void {
    // Initialize the reactive form with form controls and validations
    this.associationForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: ['', [Validators.required, Validators.minLength(3)]],
      sport: [Sports.Other, Validators.required],
    });
  }

  updateOrCreateAssociation(): void {
    if (this.associationForm.valid) {
      if (this._paramId) {
        this.updateAssociation();
      } else {
        this.createAssociation();
      }
    } else {
      // Handle form validation errors
      console.error('Form is not valid');
    }
  }

  updateAssociation(): void {
    this.associationService.update(this._paramId, this.associationForm.value).subscribe(
      (updatedAssociation: IAssociation) => {
        console.log('Association updated successfully:', updatedAssociation, this._paramId, this.associationForm.value);
        this.router.navigate(['/associations/' + this._paramId]);
      },
      (error) => {
        console.error('Error updating association:', error);
        // Handle error scenario
      }
    );
  }

  createAssociation(): void {
    this.associationService.create(this.associationForm.value).subscribe(
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
