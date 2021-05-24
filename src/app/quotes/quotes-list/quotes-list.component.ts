import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DataService } from 'src/app/_services/data.service';
import { IQuote } from '../../_shared/interfaces';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['quotes-list.component.css']
})
export class QuotesListComponent implements OnInit {
  private _quoteList: IQuote[] = [];

  //setup input property:QuoteList from parent
  @Input() get quoteList(): IQuote[] {
    return this._quoteList;
  }

  set quoteList(value: IQuote[]) {
    if (value) {
      this._quoteList = this.filteredQuoteList = value;
    }
  }

  filteredQuoteList: IQuote[] = [];
  displayedColumns: string[] = ['QuoteID', 'QuoteType', 'Contact', 'Task','TaskType','DueDate','Edit'];

  constructor(private dataService: DataService, private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
     //since it takes time to get data from server --> async
     this.dataService.getQuotes().subscribe((q: IQuote[]) => {
      this.filteredQuoteList = q;
    });
  }

  // FIXME:problem in event binding
  logout() {
    debugger;
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
