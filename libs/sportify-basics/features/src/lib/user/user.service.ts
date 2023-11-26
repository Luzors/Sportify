import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@sportify-nx/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@sportify/shared/util-env';

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
@Injectable()
export class UserService {
  endpoint = environment.dataApiUrl + `/api/users`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public list(options?: any): Observable<IUser[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IUser[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IUser[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single item from the service.
   *
   */
  public read(_id: string | null, options?: any): Observable<IUser> {
    return this.http
      .get<ApiResponse<IUser[]>>(this.endpoint + '/' + _id, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }
  public create(user: IUser, options?: any) {
    return this.http
      .post<ApiResponse<IUser>>(this.endpoint, user, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.info),
        catchError(this.handleError)
      );
  }
  public update(_id: string | null, user: IUser, options?: any) {
    return this.http
      .put<ApiResponse<IUser>>(this.endpoint + '/' + _id, user, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.info),
        catchError(this.handleError)
      );
  }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in UserService', error);

    return throwError(() => new Error(error.message));
  }
}
