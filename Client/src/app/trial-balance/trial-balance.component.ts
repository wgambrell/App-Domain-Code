import { Component, OnInit } from '@angular/core';
import {CoAService} from '../services/coa.service';
import {CoA} from '../chart-of-accounts';
import {SharedDataService} from '../services/shared-data.service';
import {Router} from '@angular/router';

declare var jsPDF: any;

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.css']
})
export class TrialBalanceComponent implements OnInit {

  trialTitle = '';

  accounts = [];
  accountsArranged = [];
  debitTotal = 0;
  creditTotal = 0;
  currentDate: Date;

  assetslist = [];
  liabilitiesList = [];
  equitList = [];
  revenueList = [];
  expensesList = [];

  constructor(
    private cserv: CoAService,
    private data: SharedDataService,
    private router: Router,
  ) { }

  ngOnInit(){
    this.trialTitle = this.data.getTrialBalance();
    this.currentDate = new Date();
    this.debitTotal = 0;
    this.creditTotal = 0;
    this.viewAccounts();
    console.log('hello');
  }

  async viewAccounts() {
    //get list of chart of accounts
    let result = await this.cserv.findAllSort('caId','ASC', 'All', null).toPromise();
    this.accounts = result;
    //arranging accounts by type
    for(let acc of this.accounts){
      if(acc.accountType == 'Assets' && acc.currentBalance != 0){
        this.assetslist.push(acc);
      }
      else if(acc.accountType == 'Liability'  && acc.currentBalance != 0){
        this.liabilitiesList.push(acc);
      }
      else if(acc.accountType == 'Equity'  && acc.currentBalance != 0){
        this.equitList.push(acc);
      }
      else if(acc.accountType == 'Revenue'  && acc.currentBalance != 0){
        this.revenueList.push(acc);
      }
      else{
        if(acc.currentBalance != 0) {
          this.expensesList.push(acc);
        }
      }
    }

    this.assetslist.sort(function(a, b) {
      var textA = a.accountNumber;
      var textB = b.accountNumber;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    this.liabilitiesList.sort(function(a, b) {
      var textA = a.accountNumber;
      var textB = b.accountNumber;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    this.equitList.sort(function(a, b) {
      var textA = a.accountNumber;
      var textB = b.accountNumber;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    this.revenueList.sort(function(a, b) {
      var textA = a.accountNumber;
      var textB = b.accountNumber;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    this.expensesList.sort(function(a, b) {
      var textA = a.accountNumber;
      var textB = b.accountNumber;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    //put arranged lists into one list

    for(let asset of this.assetslist){
      this.accountsArranged.push(asset);
    }
    for(let liability of this.liabilitiesList){
      this.accountsArranged.push(liability);
    }
    for(let equity of this.equitList){
      this.accountsArranged.push(equity);
    }
    for(let revenue of this.revenueList){
      this.accountsArranged.push(revenue);
    }
    for(let expense of this.expensesList){
      this.accountsArranged.push(expense);
    }




    this.totalDebit();
    this.totalCredit();
  }

  convertNumNegative(num: number){
    if(num < 0){
      return Math.abs(num);
    }
    else {
      return num
    }
  }

  totalDebit(){
    for(let acc of this.accountsArranged){
      console.log(acc.currentBalance);
      if(acc.normalSide == 'Debit'){
        if(acc.currentBalance < 0){
          this.creditTotal = +this.creditTotal - +acc.currentBalance;
        }
        else {
          this.debitTotal = +this.debitTotal + +acc.currentBalance;
        }
      }
    }
  }
  totalCredit(){
    for(let acc of this.accountsArranged){
      console.log(acc.currentBalance);
      if(acc.normalSide == 'Credit'){
        if(acc.currentBalance < 0){
          this.debitTotal = +this.debitTotal - +acc.currentBalance;
        }
        else {
          this.creditTotal = +this.creditTotal + +acc.currentBalance;
        }
      }
    }

  }

  //route to account ledger
  viewLedger(accountName){
    this.data.setAccount(accountName);
    this.router.navigate(['UserPage/ledger', accountName]);
  }
  setUnderline(str: string): string{
    var str2 = ''
    for(let i = 0; i< str.length; i++){
      str2 = str2 + '_';
    }
    str2 = str2 + '___';
    return str2;
  }

  convertPDF(){
    let columns = ['Account', 'Number', 'Debit', 'Credit'];
    var doc = new jsPDF('p', 'pt');
    var rows = [];
    for(let acc of this.accountsArranged){


      if(acc.normalSide == 'Debit') {
       let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = [acc.accountName, acc.accountNumber ,num, ' '];
        rows.push(account);
      }
      else{
        let num = parseFloat(''+Math.round(acc.currentBalance * 100) / 100).toFixed(2);
        let account = [acc.accountName, acc.accountNumber, ' ', num];
        rows.push(account);
      }
    }
    rows.push([' ', ' ', this.debitTotal, this.creditTotal]);
    doc.setFontSize(12);
    doc.text(240, 40, 'Sarif Financial');
    doc.text(226, 60, this.data.getTrialBalance());
    doc.text(210, 80, 'For the Year Ended ' +this.currentDate.getMonth() +'/'+ this.currentDate.getDate() +'/'+ this.currentDate.getFullYear());

    doc.autoTable(columns, rows, {startY: 88, columnStyles: {
        0: {columnWidth: 350}, 2: {halign: 'right'}, 3: {halign: 'right'}, }});
    doc.save(this.data.getTrialBalance() + '.pdf');
  }

}
