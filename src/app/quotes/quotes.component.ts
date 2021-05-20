import { Component, OnInit } from '@angular/core';

import { DataService } from '../_services/data.service';
import { IQuote } from '../_shared/interfaces';

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

