import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAssociation, IEvent, OpenTo } from '@sportify-nx/shared/api';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AssociationService } from '../../association/association.service';

@Component({
  selector: 'sportify-nx-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit, OnDestroy{
  openTo = Object.values(OpenTo);
  event: IEvent = {
    name: "",
    openTo: OpenTo.AllUsers,
    date: new Date(),
    location: '',
    capacity: 0,
    association: null,
    users: []
  };
  subscription: Subscription | undefined;
  _paramId: string | null = null;
  //temp for getting associations
  associations: IAssociation[] | null = null;
  
  constructor(private associationService: AssociationService,private eventService: EventService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    //temp for getting associations
    this.subscription = this.associationService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.associations = results;
  });

    this.subscription = this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      this._paramId = _id;
      this.event = {
        name: "",
        openTo: OpenTo.AllUsers,
        date: new Date(),
        location: '',
        capacity: 0,
        association: null,
        users: []
      };
  
      if (_id) {
        this.subscription = this.eventService.read(_id).subscribe(
          (event: IEvent) => {
            if (event) {
              this.event = event;
            } else {
              console.error('Event not found');
            }
          },
          error => {
            console.error('Error fetching event:', error);
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
  updateOrCreateEvent(): void{
    if(this.event._id){
      this.updateEvent();
    } else {
      this.createEvent();
    }
  }
  updateEvent(): void {
    this.eventService.update(this._paramId, this.event).subscribe(
      (updatedEvent: IEvent) => {
        console.log('Event updated successfully:', updatedEvent, this._paramId,this.event);
        this.router.navigate(['/events/' + this.event._id]);
      },
      (error) => {
        console.error('Error updating event:', error);
        // Handle error scenario
      }
    );
  }
  
  createEvent(): void {
      this.eventService.create(this.event).subscribe(
        (createdEvent: IEvent) => {
          console.log('Event created successfully:', createdEvent);
          this.router.navigate(['/events']);
        },
        (error) => {
          console.error('Error creating event:', error);
        }
      );
    
  }
}
