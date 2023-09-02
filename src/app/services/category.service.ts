import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = 'http://localhost:3000/category';

  constructor(private http: HttpClient) {}

  /**
   * GET: get the categories from the server
   * @returns Observable with a list of categories
   */
  get(query: string): Observable<any> {
    return this.http
      .get<any>(this.categoriesUrl + query)
      .pipe(catchError(this.handleError<any>('get', [])));
  }

  /**
   * POST: add a new category to the server
   * @param category category to be added
   * @returns An observable
   */
  add(category: Category): Observable<Category> {
    return this.http
      .post<Category>(this.categoriesUrl, category)
      .pipe(catchError(this.handleError<Category>('add')));
  }

  /**
   * PUT: update a category to the server
   * @param category category to be updated
   * @returns An observable
   */
  update(category: Category): Observable<Category> {
    return this.http
      .put<Category>(this.categoriesUrl + `/${category.id}`, category)
      .pipe(catchError(this.handleError<Category>('update')));
  }

  /**
   * DELETE: delete a category to the server
   * @param category category to be deleted
   * @returns An observable
   */
  delete(category: Category): Observable<Category> {
    return this.http
      .delete<Category>(this.categoriesUrl + `/${category.id}`)
      .pipe(catchError(this.handleError<Category>('delete')));
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
