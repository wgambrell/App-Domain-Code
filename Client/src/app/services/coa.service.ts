import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoA } from '../chart-of-accounts';
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
export class CoAService {
  private coaUrl = 'https://server-sarif-financial1.herokuapp.com/api/chartOfAccounts';  // URL to web api
  private findAccountNameUrl = 'https://server-sarif-financial1.herokuapp.com/api/chartOfAccounts/account';
  private chartSortUrl = 'https://server-sarif-financial1.herokuapp.com/api/chartSort';
  private nameCheckUrl = 'https://server-sarif-financial1.herokuapp.com/api/accountNameCheck';
  private numberCheckUrl = 'https://server-sarif-financial1.herokuapp.com/api/accountNumberCheck';
  private  getByNameUrl = 'https://server-sarif-financial1.herokuapp.com/api/getAccountByName';
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<CoA[]> {
    return this.http.get<CoA[]>(this.coaUrl, httpOptions);
  }

  findAllSort(column, direction, columnSearch, criteria): Observable<CoA[]> {
    return this.http.post<CoA[]>(this.chartSortUrl, {column: column, direction: direction, columnSearch: columnSearch,
      criteria: criteria}, httpOptions);
  }

  addAccount(coa: CoA): Observable<CoA> {
    return this.http.post<CoA>(this.coaUrl, coa, httpOptions);
  }

  getAccount(account: number): Observable<any> {
    return this.http.get(`${this.coaUrl}/${account}`, httpOptions);
  }
  getByName(accountName): Observable<any>{
      return this.http.post<CoA>(this.getByNameUrl, {accountName: accountName}, httpOptions);
  }

  updateAccount(account): Observable<any> {
    const body = JSON.stringify(account);
    return this.http.put(this.coaUrl, body, httpOptions);
  }

  compareAccountName(accountName): Observable<any>{
    return this.http.post<CoA>(this.nameCheckUrl, {accountName: accountName}, httpOptions);
  }
  compareAccountNumber(accountNumber): Observable<any>{
    return this.http.post<CoA>(this.numberCheckUrl, {accountNumber: accountNumber}, httpOptions);
  }

}
