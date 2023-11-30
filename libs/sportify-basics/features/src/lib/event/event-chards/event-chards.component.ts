import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from '@sportify-nx/shared/api';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';

@Component({
  selector: 'sportify-nx-event-chards',
  templateUrl: './event-chards.component.html',
  styleUrls: ['./event-chards.component.css'],
})
export class EventChardsComponent implements OnInit, OnDestroy {
  events: IEvent[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private eventService:EventService, private router:Router) {}

  ngOnInit(): void {
    this.subscription = this.eventService.list().subscribe((results) => {
        console.log(`results: ${results}`);
        this.events = results;
    });
}
ngOnDestroy(): void {
  if (this.subscription) this.subscription.unsubscribe();
}
}
