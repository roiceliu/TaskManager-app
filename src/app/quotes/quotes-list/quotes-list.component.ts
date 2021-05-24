import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { IQuote } from '../../_shared/interfaces';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
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

  constructor(private dataService: DataService) {}

  ngOnInit() {
     //since it takes time to get data from server --> async
     this.dataService.getQuotes().subscribe((q: IQuote[]) => {
      this.filteredQuoteList = q;
    });
  }
}
