import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IEvent, IUser } from '@sportify-nx/shared/api';
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
export class EventService {
  endpoint = environment.dataApiUrl + `/api/events`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public list(options?: any): Observable<IEvent[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IEvent[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IEvent[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }
  listOfNonExpired(options?: any): Observable<IEvent[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IEvent[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => {
          const currentDate = new Date();
          return response.results.filter(
            (event: IEvent) => new Date(event.date) > currentDate
          );
        }),
        catchError(this.handleError)
      );
  }
  public usersList(event_id: string, options?: any): Observable<IUser[] | null> {
    console.log(`list ${this.endpoint}/${event_id}/user`);

    return this.http
      .get<ApiResponse<IEvent[]>>(this.endpoint + "/" + event_id + "/user", {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IUser[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }
  public addUserToEvent(event_id: string, user_id: string, options?: any): Observable<IEvent> {
    console.log(`list ${this.endpoint}/${event_id}/user`);
  
    const requestBody = { user_id };  // Wrap user_id in an object
  
    return this.http
      .post<ApiResponse<IEvent>>(`${this.endpoint}/${event_id}/user`, requestBody, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.info),
        catchError(this.handleError)
      );
  }
  public removeUserFromEvent(event_id: string, user_id: string, options?: any): Observable<IEvent> {
    console.log(`list ${this.endpoint}/${event_id}/user`);
  
    const requestBody = { user_id };  // Wrap user_id in an object
  
    return this.http
      .put<ApiResponse<IEvent>>(`${this.endpoint}/${event_id}/user`, requestBody, {
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
   * Get a single item from the service.
   *
   */
  public read(_id: string | null, options?: any): Observable<IEvent> {
    return this.http
      .get<ApiResponse<IEvent[]>>(this.endpoint + '/' + _id, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IEvent),
        catchError(this.handleError)
      );
  }
  public create(event: IEvent, options?: any) {
    return this.http
      .post<ApiResponse<IEvent>>(this.endpoint, event, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.info),
        catchError(this.handleError)
      );
  }
  public update(_id: string | null, event: IEvent, options?: any) {
    return this.http
      .put<ApiResponse<IEvent>>(this.endpoint + '/' + _id, event, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.info),
        catchError(this.handleError)
      );
  }
  public delete(_id: string | undefined, options?: any): Observable<IEvent> {
    return this.http
      .delete<ApiResponse<IEvent[]>>(this.endpoint + '/' + _id, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IEvent),
        catchError(this.handleError)
      );
  }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in EventService', error);

    return throwError(() => new Error(error.message));
  }
}
