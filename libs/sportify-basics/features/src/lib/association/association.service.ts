import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IAdmin, IAssociation } from '@sportify-nx/shared/api';
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
export class AssociationService {
  endpoint = environment.dataApiUrl + `/api/associations`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public list(options?: any): Observable<IAssociation[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IAssociation[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IAssociation[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single item from the service.
   *
   */
  public read(_id: string | null, options?: any): Observable<IAssociation> {
    return this.http
      .get<ApiResponse<IAssociation[]>>(this.endpoint + '/' + _id, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IAssociation),
        catchError(this.handleError)
      );
  }
  public create(association: IAssociation, options?: any) {
    return this.http
      .post<ApiResponse<IAssociation>>(this.endpoint, association, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.info),
        catchError(this.handleError)
      );
  }
  public update(_id: string | null, association: IAssociation, options?: any) {
    return this.http
      .put<ApiResponse<IAssociation>>(this.endpoint + '/' + _id, association, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.info),
        catchError(this.handleError)
      );
  }
  public adminList(event_id: string, options?: any): Observable<IAdmin[] | null> {
    console.log(`list ${this.endpoint}/${event_id}/admins`);

    return this.http
      .get<ApiResponse<IAssociation[]>>(this.endpoint + "/" + event_id + "/admins", {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IAdmin[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }
  public delete(_id: string | undefined, options?: any): Observable<IAssociation> {
    return this.http
      .delete<ApiResponse<IAssociation[]>>(this.endpoint + '/' + _id, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IAssociation),
        catchError(this.handleError)
      );
  }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in AssociationService', error);

    return throwError(() => new Error(error.message));
  }
}
