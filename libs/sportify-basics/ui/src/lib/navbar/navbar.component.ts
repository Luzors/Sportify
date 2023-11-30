import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheckAuthService } from '../checkAuth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'sportify-nx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userLoggedIn: boolean;
  private subscription: Subscription | undefined = undefined;

  constructor(private checkAuthService: CheckAuthService) {
    this.userLoggedIn = false;
  }

  ngOnInit(): void {
    this.subscription = this.checkAuthService.isLoggedIn().subscribe(isLoggedIn => {
      this.userLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}