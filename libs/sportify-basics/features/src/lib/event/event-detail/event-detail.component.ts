import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent, IAssociation } from '@sportify-nx/shared/api';
import { Subscription, Subject, of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AssociationService } from '../../association/association.service';
import { EventService } from '../../event/event.service';

@Component({
  selector: 'sportify-nx-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit, OnDestroy {
  event: IEvent | null = null;
  association: IAssociation | undefined;
  userCount = 0;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private associationService: AssociationService,
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params => {
          const _id = params.get('id');
          if (_id) {
            return this.eventService.read(_id);
          } else {
            // Return an observable emitting null if there is no 'id' parameter
            return of(null);
          }
        })
      )
      .subscribe(
        (event: IEvent | null) => {
          this.event = event;
          if (this.event?.association) {
            this.fetchAssociation(this.event.association);
          }
        },
        error => {
          console.error('Error fetching event:', error);
          // Handle error scenario
        }
      );
      if(this.event?.users){
        this.userCount = this.event?.users.length;
      }
  }

  private fetchAssociation(associationId: string): void {
    this.associationService
      .read(associationId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
