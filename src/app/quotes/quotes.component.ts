import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/data.service';
import { IQuote } from '../shared/interfaces';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit {
  quotes: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    //since it takes time to get data from server --> async
    this.dataService.getQuotes().subscribe((q: IQuote[]) => {
      this.quotes = q;
    });

  }
}
