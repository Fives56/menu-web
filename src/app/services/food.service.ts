import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodUrl = 'http://localhost:3000/food';

  constructor(private http: HttpClient) { }

  /**
   * GET: get the foods from the server
   * @returns Observable with a list of foods
   */
  getFoods(): Observable<any> {
    return this.http
      .get<any>(this.foodUrl)
      .pipe(catchError(this.handleError<any>('getFoods', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
