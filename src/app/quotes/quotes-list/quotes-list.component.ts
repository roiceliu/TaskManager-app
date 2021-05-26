import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DataService } from 'src/app/_services/data.service';
import { IQuote } from '../../_shared/interfaces';
import { DeleteQuoteComponent } from '../delete-quote/dialog-delete-quote.component';
import { QuoteUpdateDialogComponent } from '../quote-update/dialog-quote-update.component';


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
  displayedColumns: string[] = ['QuoteID', 'QuoteType', 'Contact', 'Task','TaskType','DueDate','Operations'];

  constructor(private dataService: DataService, private auth: AuthenticationService, private router: Router, public dialog:MatDialog) {}

  ngOnInit() {
    this.renderList();
  }

 renderList() {
    //since it takes time to get data from server --> async
    this.dataService.getQuotes().subscribe((q: IQuote[]) => {
      this.filteredQuoteList = q;
   });
  }

  //open update model and update
  updateModal(id:number) {
   const dialogRef = this.dialog.open(QuoteUpdateDialogComponent, {
      data: {QuoteID:id, isView:false}
    });

    //update our list after model changes
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data !== undefined)
          this.renderList();
      }
    );
  }

  view(id:number) {
    const dialogRef = this.dialog.open(QuoteUpdateDialogComponent, {
      data: {QuoteID:id, isView:true}
    });

    //update our list after model changes
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data !== undefined)
          this.renderList();
      }
    );
  }

  delete(id: number) {
    // direct to another modal
    const dialogRef = this.dialog.open(
      DeleteQuoteComponent, {
      data: id
    }
    );

    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data === 'delete')
          this.ConfirmDelete(id);
      }
    )
  }

  ConfirmDelete(id: number) {
        // render model confirm 
        this.dataService.deleteQuote(id).subscribe(
          () => {
            this.renderList();
            },
            (e) => {
                console.log("Delete quote has error: " + e);
            }
        )
    }

  // FIXME:problem in event binding
  logout() {
    this.auth.logout();
  }
}
