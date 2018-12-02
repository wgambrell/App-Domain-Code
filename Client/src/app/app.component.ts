import {Component, OnInit} from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import {SharedDataService} from './services/shared-data.service';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to Sarif Financial';
  access = 1;

  indicator = '';
  constructor(
              private localSt: LocalStorageService,
              private sessionSt: SessionStorageService,
              private data: SharedDataService
  ) {}


setSession(id, userName, userRole, firstName, lastName) {
    this.sessionSt.store('userName', userName);
    this.sessionSt.store('id', id);
    this.sessionSt.store('userRole', userRole);
    this.sessionSt.store('firstName', firstName);
    this.sessionSt.store('lastName', lastName);
}
getSession(){
    alert(this.sessionSt.retrieve('logged-in'));
}
getUserName(){
    return this.sessionSt.retrieve('userName');
}
  getRole(){
    return this.sessionSt.retrieve('userRole');
  }

  getFirstName(){
    return this.sessionSt.retrieve('firstName');
  }
delSession(){
    this.sessionSt.clear('userName');
    this.sessionSt.clear('id');
    this.sessionSt.clear('userRole');
}


findAccount(found) {
    this.sessionSt.store('accountName', found);
}
getAccount() {
    return this.sessionSt.retrieve('accountName');
}
delAccount() {
    this.sessionSt.clear('accountName');
}


}
