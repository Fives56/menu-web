import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private foodsUrl = 'http://localhost:3000/food';

  constructor(private http: HttpClient) {}

  /**
   * GET: get the foods from the server
   * @returns Observable with a list of foods
   */
  get(query: string): Observable<any> {
    return this.http
      .get<any>(this.foodsUrl + query)
      .pipe(catchError(this.handleError<any>('get', [])));
  }

  /**
   * POST: add a new food to the server
   * @param food food to be added
   * @returns An observable
   */
  add(food: Food): Observable<Food> {
    return this.http
      .post<Food>(this.foodsUrl, food)
      .pipe(catchError(this.handleError<Food>('add')));
  }

  /**
   * PUT: update a food to the server
   * @param food food to be updated
   * @returns An observable
   */
  update(food: Food): Observable<Food> {
    return this.http
      .put<Food>(this.foodsUrl + `/${food.id}`, food)
      .pipe(catchError(this.handleError<Food>('update')));
  }

  /**
   * DELETE: delete a food to the server
   * @param food food to be deleted
   * @returns An observable
   */
  delete(food: Food): Observable<Food> {
    return this.http
      .delete<Food>(this.foodsUrl + `/${food.id}`)
      .pipe(catchError(this.handleError<Food>('delete')));
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
