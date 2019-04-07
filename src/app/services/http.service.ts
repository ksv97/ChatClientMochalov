import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { MessageService } from './message.service';
import { SharedService } from './shared.service';
import { Message } from '../models/message';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = 'http://localhost:8080';


  constructor(private http: HttpClient, private messageService: MessageService, private sharedService: SharedService) { }

  
  login (user: User): Observable<User> {

    let url = this.baseUrl + '/login';

    return this.http.post<User>(url, user, httpOptions).pipe(
      tap((loggedInUser: User) => {
        //this.messageService.log(`user ${user.username} successfully logged in`, false);
        this.sharedService.currentOnlineUser = user;
      }),
      catchError(this.handleError<User>('login', null))
    );

  }

  signup (newUser: User): Observable<User> {

    let url = this.baseUrl + '/register';

    return this.http.post<User>(url, newUser, httpOptions).pipe(
      tap((createdUser: User) => {
        //this.messageService.log(`user ${user.username} successfully logged in`, false);
        console.log(createdUser);
      }),
      catchError(this.handleError<User>('signup', null))
    );

  }

  signout (currentUser: User): Observable<User> {

    let url = this.baseUrl + '/signout';

    return this.http.post<User>(url, currentUser, httpOptions).pipe(
      tap((signedOutUser: User) => {
        //this.messageService.log(`user ${user.username} successfully logged in`, false);
        console.log(signedOutUser);
        console.log('Sign out succeeded!');
      }),
      catchError(this.handleError<User>('signout', null))
    );

  }

  getChatHistory () : Observable<Message[]> {
    let url = this.baseUrl + '/chat';

    return this.http.get<Message[]>(url).pipe(
      tap(_ => console.log('chat history loaded successfully')
      ),
      catchError(this.handleError<Message[]>('getChatHistory', null))
    );
  }

  getOnlineUsers () : Observable<User[]> {
    let url = this.baseUrl + '/online';

    return this.http.get<User[]>(url).pipe(
      tap(_ => console.log('online users loaded successfully')
      ),
      catchError(this.handleError<User[]>('getOnlineUsers', null))
    );
  }

  say (message: Message):  Observable<Message> {
    let url = this.baseUrl + '/say';

    return this.http.post<Message>(url, message, httpOptions).pipe(
      tap((newMessage: Message) => {
        console.log('new message added successfully')
      }),
      catchError(this.handleError<Message>('say', null))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.messageService.log(`${operation} failed: ${error.message}`, true);    
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
