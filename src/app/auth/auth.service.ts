import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {
  userSubject = new Subject<User>();

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDa9TpdtFdkqEFzhUxpI1bIY3EjF8QVRPU',
      { email, password, returnSecureToken: true}
    ).pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication( responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDa9TpdtFdkqEFzhUxpI1bIY3EjF8QVRPU',
      { email, password, returnSecureToken: true}
    )
    .pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication( responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
      })
    );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let error = 'An unknown error occured';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(error);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        error = 'The email address is already in use by another account.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        error = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        error = 'Password sign-in is disabled for this project.';
        break;
      case 'EMAIL_NOT_FOUND':
        error = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        error = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        error = 'The user account has been disabled by an administrator.';
        break;
  }

    return throwError(error);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const user = new User(
      email, 
      userId, 
      token,
      new Date(new Date().getTime() + expiresIn * 1000)
    );
    this.userSubject.next(user);
  }
}
