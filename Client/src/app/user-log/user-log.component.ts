import { Component, OnInit } from '@angular/core';
import { UserLogService } from '../services/user-log.service';
import { CoA } from '../chart-of-accounts';
import { Logs } from '../logs';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css']
})
export class UserLogComponent implements OnInit {
  logs = [];
  newAccountData = new CoA();
  oldAccountData = new CoA();
  currPage = 1;
  perPage = 10;

  //for search and sort
  column = 'logId';
  columnSearch = 'all';
  criteria = '';

  constructor(
    private logData: UserLogService,
  ) { }

  ngOnInit() {
    this.onLog();
  }

  onLog() {
    this.logData.findAll().subscribe(
      (userLog) => {
        this.logs = userLog;
      }
    );
  }

  viewLogSort(column: string, direction: string, columnSearch: string, criteria: string) {
    this.logData.findAllSort(column, direction, columnSearch, criteria).subscribe(
      (logs) => {
        this.logs = logs;
        console.log("updated");
      }
    );
  }

  getAccount(log: any) {
    for (var i = 0; i < log.length; i++) {
      var dbString = JSON.stringify(log);
      //Get new data
      var obj = JSON.parse(dbString)[i].newData;
      if (obj != null) {
        console.log(obj)
        this.newAccountData = JSON.parse(obj);
        //console.log(this.newAccountData);
      }

      //Get old account
      var newObj = JSON.parse(dbString)[i].prevData;
      if (newObj != null) {
        //console.log("empty")
        this.oldAccountData = JSON.parse(newObj);
        //console.log(this.oldAccountData);
      }
    }
  }
}
