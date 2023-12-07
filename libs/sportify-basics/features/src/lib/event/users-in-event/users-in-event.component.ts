import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser, IEvent } from '@sportify-nx/shared/api';
import { Subscription, Subject, of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { EventService } from '../event.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'sportify-nx-users-in-event',
  templateUrl: './users-in-event.component.html',
  styleUrls: ['./users-in-event.component.css'],
})
export class UsersInEventComponent implements OnInit, OnDestroy {
  users: IUser[] | null = null;
  private destroy$: Subject<void> = new Subject<void>();
  private subscription: Subscription | undefined = undefined;
  event: IEvent | null = null;
  currentUser: IUser | null = null;

  constructor(private eventService: EventService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params => {
          const _id = params.get('id');
          if (_id) {
            // Fetch event details based on the 'id' parameter
            return this.eventService.read(_id);
          } else {
            return of(null);
          }
        }),
        switchMap((event: IEvent | null) => {
          // Store the event information
          this.event = event;
          
          // Check if event is not null before fetching users
          if (event?._id) {
            return this.authService.getUserFromLocalStorage();
          } else {
            // Return an observable emitting null if there is no event
            return of(null);
          }
        })
      )
      .subscribe(
        (user: IUser | null) => {
          this.currentUser = user;
          this.fetchUsers();
        },
        (error) => {
          console.error('Error fetching data:', error);
          // Handle error scenario
        }
      );
  }

  private fetchUsers(): void {
    if (this.event?._id) {
      this.subscription = this.eventService.usersList(this.event._id)
        .subscribe(
          (results: IUser[] | null) => {
            console.log('results for users found:', results);
            this.users = results;
          },
          (error) => {
            console.error('Error fetching data:', error);
            // Handle error scenario
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  registerUser(user_id: string | undefined) {
    if (this.event?._id && user_id) {
      this.eventService.addUserToEvent(this.event._id, user_id)
        .subscribe(
          (response) => {
            console.log('User registered successfully:', response);
          },
          (error) => {
            console.error('Error registering user:', error);
          }
        );
    }
  }

  // Add your delete method here
  // delete(userId: string | undefined): void {
  //   this.eventService.deleteFromEvent(userId).subscribe(
  //     () => {
  //       console.log('User deleted successfully:');
  //       window.location.reload();
  //     },
  //     (error) => {
  //       console.error('Error updating user:', error);
  //       // Handle error scenario
  //     }
  //   );
  // }
}
