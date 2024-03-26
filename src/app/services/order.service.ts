import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersUrl = 'http://localhost:3000/order';

  constructor(private http: HttpClient) {}

  /**
   * GET: get the orders from the server
   * @returns Observable with a list of orders
   */
  get(query: string): Observable<any> {
    return this.http
      .get<any>(this.ordersUrl + query)
      .pipe(catchError(this.handleError<any>('get', [])));
  }

  /**
   * POST: add a new order to the server
   * @param order order to be added
   * @returns An observable
   */
  add(order: Order): Observable<Order> {
    return this.http
      .post<Order>(this.ordersUrl, order)
      .pipe(catchError(this.handleError<Order>('add')));
  }

  /**
   * PUT: update a order to the server
   * @param order order to be updated
   * @returns An observable
   */
  update(order: Order): Observable<Order> {
    return this.http
      .put<Order>(this.ordersUrl + `/${order.id}`, order)
      .pipe(catchError(this.handleError<Order>('update')));
  }

  /**
   * DELETE: delete a order to the server
   * @param order order to be deleted
   * @returns An observable
   */
  delete(order: Order): Observable<Order> {
    return this.http
      .delete<Order>(this.ordersUrl + `/${order.id}`)
      .pipe(catchError(this.handleError<Order>('delete')));
  }

  /**
   * Short the categories and foods in order
   * @param order Order to short categories and foods
   * @returns Array of categories with its foods
   */
  order(order: Order): any[] {
    const categories: any[] = order.categories;
    const foods: any[] = order.food;
    let categoriesWithFoods: any[] = [];
    
    for (let i = 0; i < categories.length; i++) {
      categoriesWithFoods.push(categories[i]);
      categoriesWithFoods[i].foods = [];
      for (let f of foods) {
        if (f.categoryId == categories[i].id) {
          categoriesWithFoods[i].foods.push(f);
        }
      }
    }

    return categoriesWithFoods;
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
