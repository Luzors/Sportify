import { Inject, Injectable, forwardRef } from '@angular/core';
import { AuthService } from "@sportify-nx/sportify-basics/features";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CheckAuthService {
  constructor(@Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) {}

  isLoggedIn(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => user !== undefined)
    );
  }
}