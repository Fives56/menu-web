import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, catchError, of } from "rxjs";
import { User } from "../models/user.model";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private authUrl = 'http://localhost:3000/auth';
  private userUrl = 'http://localhost:3000/user';
  private authStatus = new Subject<boolean>();

  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: User): Observable<any> {
    return this.http.post(this.authUrl + '/login', user)
		.pipe(catchError(this.handleError<User>('login')));;
  }
  
  setToken(token: string) {
    this.cookies.set("token", token);
    this.authStatus.next(true);
  }

  getToken() {
    return this.cookies.get("token");
  }

  deleteToken() {
    this.cookies.delete("token");
    this.authStatus.next(false);
  }  

  getUser(): Observable<User> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(this.userUrl + '/me', { headers });
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
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