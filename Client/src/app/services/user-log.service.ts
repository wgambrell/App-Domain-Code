import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": '*', 
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
   })
};

@Injectable({
  providedIn: 'root'
})
export class UserLogService {
  private log = 'https://server-sarif-financial1.herokuapp.com/api/log';
  private logSort = 'https://server-sarif-financial1.herokuapp.com/api/logSort';
  constructor(
    private http: HttpClient
  ) { }



  create(username, actionType): Observable<any> {
    return this.http.post(this.log, {userName: username, actionType: actionType}, httpOptions)
  }

  createAccountLog(username, actionType, newData): Observable<any> {
    return this.http.post(this.log, {userName: username, actionType: actionType, newData: newData}, httpOptions)
  }
  updateAccountLog(username, actionType, prevData, newData): Observable<any> {
    return this.http.post(this.log, {userName: username, actionType: actionType, prevData: prevData, newData: newData}, httpOptions)
  }

  findAll(): Observable<any> {
    return this.http.get(this.log, httpOptions);
  }

  findAllSort(column, direction, columnSearch, criteria): Observable<any> {
    return this.http.post<any>(this.logSort, {column: column, direction: direction, columnSearch: columnSearch,
      criteria: criteria}, httpOptions);
  }

  findByType(actionType: string): Observable<any> {
    return this.http.get(`${this.log}/${actionType}`, httpOptions);
  }
}
