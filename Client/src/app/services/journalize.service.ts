import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Journal } from '../journal';
import { JournalAccount } from '../journalAccount';
import {Observable} from 'rxjs';
import {User} from '../user';
import {CoA} from '../chart-of-accounts';

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
export class JournalizeService {
  private journalUrl = 'https://server-sarif-financial1.herokuapp.com/api/journal';
  private journalSort = 'https://server-sarif-financial1.herokuapp.com/api/journalSort';
  private journalAccountUrl = 'https://server-sarif-financial1.herokuapp.com/api/journalAccount';
  private fileRetrieve = 'https://server-sarif-financial1.herokuapp.com/api/retreiveJournalFiles';

  //'/api/journal'
  //'/api/journalAccount'
  constructor(
    private http: HttpClient
  ) { }

 //operations for Journal
  findAll(): Observable<Journal[]> {
    return this.http.get<Journal[]>(this.journalUrl, httpOptions);
  }

  findAllSort(column, direction, columnSearch, criteria, approvalType): Observable<Journal[]> {
    return this.http.post<Journal[]>(this.journalSort, {column: column, direction: direction, columnSearch: columnSearch,
      criteria: criteria, approvalType: approvalType}, httpOptions);
  }



  getJournal(id: number): Observable<any>{
    return this.http.get(`${this.journalUrl}/${id}`, httpOptions);
  }
  addJournal(journal: Journal): Observable<Journal> {
    return this.http.post<Journal>(this.journalUrl, journal, httpOptions);
  }
  updateJournal(journal): Observable<any> {
    const body = JSON.stringify(journal);
    return this.http.put(this.journalUrl, body, httpOptions);
  }


  findAllAccounts(): Observable<JournalAccount[]> {
    return this.http.get<JournalAccount[]>(this.journalAccountUrl, httpOptions);
  }
  getJournaAccountsl(id: number): Observable<any>{
    return this.http.get(`${this.journalAccountUrl}/${id}`, httpOptions);
  }
  addJournalAccounts(journalAccount: JournalAccount): Observable<JournalAccount> {
    return this.http.post<JournalAccount>(this.journalAccountUrl, journalAccount, httpOptions);
  }
  updateJournalAccounts(journalAccount): Observable<any> {
    const body = JSON.stringify(journalAccount);
    return this.http.put(this.journalAccountUrl, body, httpOptions);
  }

  public downloadReport(event: number): Observable<any> {
    // Create url

    return this.http.post(this.fileRetrieve, {jID: event}, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }

}
