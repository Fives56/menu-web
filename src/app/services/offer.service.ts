import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Offer } from '../models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private offersUrl = 'http://localhost:3000/offer';

  constructor(private http: HttpClient) {}

  /**
   * GET: get the offers from the server
   * @returns Observable with a list of offers
   */
  get(query: string): Observable<any> {
    return this.http
      .get<any>(this.offersUrl + query)
      .pipe(catchError(this.handleError<any>('get', [])));
  }

  /**
   * POST: add a new offer to the server
   * @param offer offer to be added
   * @returns An observable
   */
  add(offer: Offer): Observable<Offer> {
    return this.http
      .post<Offer>(this.offersUrl, offer)
      .pipe(catchError(this.handleError<Offer>('add')));
  }

  /**
   * PUT: update a offer to the server
   * @param offer offer to be updated
   * @returns An observable
   */
  update(offer: Offer): Observable<Offer> {
    return this.http
      .put<Offer>(this.offersUrl + `/${offer.id}`, offer)
      .pipe(catchError(this.handleError<Offer>('update')));
  }

  /**
   * DELETE: delete a offer to the server
   * @param offer offer to be deleted
   * @returns An observable
   */
  delete(offer: Offer): Observable<Offer> {
    return this.http
      .delete<Offer>(this.offersUrl + `/${offer.id}`)
      .pipe(catchError(this.handleError<Offer>('delete')));
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
