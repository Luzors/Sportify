import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IAdmin } from '@sportify-nx/shared/api';
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
export class AdminService {
  endpoint = environment.dataApiUrl + `/api/admin`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public list(options?: any): Observable<IAdmin[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IAdmin[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IAdmin[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single item from the service.
   *
   */
  public read(_id: string | null, options?: any): Observable<IAdmin> {
    return this.http
      .get<ApiResponse<IAdmin[]>>(this.endpoint + '/' + _id, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IAdmin),
        catchError(this.handleError)
      );
  }
  public create(admin: IAdmin, options?: any) {
    return this.http
      .post<ApiResponse<IAdmin>>(this.endpoint, admin, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.info),
        catchError(this.handleError)
      );
  }
  public update(_id: string | null, admin: IAdmin, options?: any) {
    return this.http
      .put<ApiResponse<IAdmin>>(this.endpoint + '/' + _id, admin, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.info),
        catchError(this.handleError)
      );
  }
  public delete(_id: string | undefined, options?: any): Observable<IAdmin> {
    return this.http
      .delete<ApiResponse<IAdmin[]>>(this.endpoint + '/' + _id, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IAdmin),
        catchError(this.handleError)
      );
  }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in AdminService', error);

    return throwError(() => new Error(error.message));
  }
}
