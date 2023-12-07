import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser, ApiResponse, IUpdateUser } from "@sportify-nx/shared/api";
import { environment } from "@sportify/shared/util-env";
import { BehaviorSubject, Observable, map, catchError, tap, throwError, of, switchMap, defer } from "rxjs";
import { Router } from '@angular/router';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

/**
*
*
*/
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<IUser | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
      'Content-Type': 'application/json',
  });

  endpoint = `${environment.dataApiUrl}/api/auth`;

  // endpoint = environment

  constructor(private readonly http: HttpClient, private router: Router) {

    this.getUserFromLocalStorage()
    .pipe(
      // ...
      switchMap((user: IUser | null) => {
        if (user) {
          console.log('User found in local storage');
          this.currentUser$.next(user);
          const item = localStorage.getItem(this.CURRENT_USER);
          if (item !== null) {
            const parsedItem = JSON.parse(item);
            const tokenString = parsedItem?.results.access_token || null;
            return this.validateToken(tokenString).pipe(
              tap((response: IUser) => {
                console.log('Token validated');
              })
            );
          }
          console.log('No token found returning null');
          return of(null);
        } else {
          console.log(`No current user found`);
          return of(null);
        }
      })
    )
    .subscribe(() => console.log('Startup auth done'));
  
  }

  login(email: string, password: string): Observable<IUser> {
      console.log("login at ${this.endpoint}/login");
  
      return this.http
        .post<IUser>(
      
          `${this.endpoint}/login`,
          { email: email, password: password },
          { headers: this.headers }
        )
        .pipe(
          map((user) => {
            this.saveUserToLocalStorage(user);
            this.currentUser$.next(user);
            return user;
          }),
          catchError(this.handleError)
        );
  }
/**
   * Validate het token bij de backend API. Als er geen HTTP error
   * als response komt is het token nog valid. We doen dan verder niets.
   * Als het token niet valid is loggen we de user uit.
   */
validateToken(token: string): Observable<IUser> {
  const url = `${this.endpoint}/token`;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }),
  };

  console.log(`validateToken at ${url}`);
  return this.http.get<any>(url, httpOptions).pipe(
    map((response) => {
      console.log('token is valid');
      return response;
    }),
    catchError((error: any) => {
      console.log('Validate token Failed');
      this.logout();
      this.currentUser$.next(undefined);
      return of({} as IUser);
    })
  );
}
    private saveUserToLocalStorage(user: IUser): void {
      localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
    }

//register/create user
  public create(user: Partial<IUser>, options?: any): Observable<IUser> {
      console.log(user)
      return this.http
          .post<ApiResponse<IUser>>(this.endpoint, user, {
              ...options,
              ...httpOptions,
          })
          .pipe(
              map((response: any) => {
                  console.log(response.result);
                  return response.result as IUser}),
              catchError(this.handleError)
          );
  }
  // logout(): void {
  //   this.router
  //     .navigate(['/'])
  //     .then((success) => {
  //       // true when canDeactivate allows us to leave the page.
  //       if (success) {
  //         console.log('logout - removing local user info');
  //         localStorage.removeItem(this.CURRENT_USER);
  //         this.currentUser$.next(undefined);
  //         // this.alertService.success('You have been logged out.');
  //       } else {
  //         console.log('navigate result:', success);
  //       }
  //     })
  //     .catch((error) => console.log('not logged out!'));
  // }
  logout(): void {

          console.log('logout - removing local user info');
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(undefined);
          console.log('current user:' + this.currentUser$);
          // this.alertService.success('You have been logged out.');
  }

  getUserFromLocalStorage(): Observable<IUser | null> {
    return defer(() => {
      const item = localStorage.getItem(this.CURRENT_USER);
      if (item !== null) {
        const localUser = JSON.parse(item).results.user as IUser;
        return of(localUser);
      } else {
        return of(null);
      }
    });
  }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
      console.log('handleError in UserService', error);

      return throwError(() => new Error(error.message));
    }
}