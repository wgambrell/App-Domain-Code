import { Component, OnInit } from '@angular/core';
import {JournalizeService} from '../services/journalize.service';
import {SharedDataService} from '../services/shared-data.service';
import { Journal } from '../journal';
import {JournalAccount} from '../journalAccount';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import saveAs from 'file-saver';

const httpOptions = {
  headers: new HttpHeaders({
    //'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  })
};

@Component({
  selector: 'app-individual-journal',
  templateUrl: './individual-journal.component.html',
  styleUrls: ['./individual-journal.component.css']
})
export class IndividualJournalComponent implements OnInit {
  documentInfo = '';
  date: Date;
  fileRetrieve = 'http://localhost:8080/api/retreiveJournalFiles';
  thisJournal: Journal = {
    JId: 0,
    Date: this.date,
    Description: '',
    Reference: '',
    CreatedBy: '',
    FileID: 0,
    Type: '',
    FileName: '',
    JournalAccounts: [],
    acceptance: '',
  };
  journals = [];



  constructor(
    private journalServ: JournalizeService,
    private data: SharedDataService,
    private router: Router,
    private http: HttpClient,

  ) { }

  ngOnInit() {
    this.viewJournals();
  }

  viewJournals() {
    this.journalServ.findAll().subscribe(
      (journal) => {
        this.journals = journal;
        let temp = this.data.getReference();
        for(let journ of this.journals){
          if(temp == journ.Reference){
            this.thisJournal = journ;
            console.log(this.thisJournal);
            console.log(this.thisJournal.JournalAccounts[0]);
            break
          }
        }
        console.log(this.journals);
      }
    );
  }

  viewGenJournal(){
    this.router.navigate(['UserPage/journal']);
  }


  getNumberDebits(journalAcc: JournalAccount[]): number{
    let num = 0;
    for(let j of journalAcc){
      if(j.DebitAmount !=null){
        num++;
      }
    }
    return num;

  }

  getJournalFile(event: number, filename: string){
    //this.http.post<any>(this.fileRetrieve, {jID: event}, httpOptions).subscribe( result => {
      //var newBlob = new Blob([result.data], { type: "application/pdf"});

      this.journalServ.downloadReport(event).subscribe(data => {
        console.log(data);
        saveAs(data, filename);
      });

  }
  closeFile() {
    this.documentInfo = '';
    let modal = document.getElementById("viewSource");
    modal.style.display = "none";
  }

  viewLedger(accountName){
    this.data.setAccount(accountName);
    this.router.navigate(['UserPage/ledger', accountName]);
  }

}

