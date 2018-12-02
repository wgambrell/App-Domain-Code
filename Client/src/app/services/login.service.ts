import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private customersUrl = 'https://server-sarif-financial1.herokuapp.com/api/users';
  private resetURL = 'https://server-sarif-financial1.herokuapp.com/api/resetPassword';
  private emailURL = 'https://server-sarif-financial1.herokuapp.com/api/emailSend';
  private loginUrl = 'https://server-sarif-financial1.herokuapp.com/api/loginVerify';
  private sessionURL = 'https://server-sarif-financial1.herokuapp.com/api/checkSession';
  constructor(
    private http: HttpClient
  ) { }
  sendData (username, password): Observable<any> {
    return this.http.post(this.loginUrl, {userName: username, userPassword: password}, httpOptions);
  }
  resetPasswordSend (username): Observable<any> {
    return this.http.post(this.resetURL, {username: username}, httpOptions);
  }
  sendEmail (username): Observable<any> {
    return this.http.post(this.emailURL, {userName: username}, httpOptions);
  }
  getSession (): Observable<any> {
    return this.http.get(this.sessionURL, httpOptions);
  }
}

