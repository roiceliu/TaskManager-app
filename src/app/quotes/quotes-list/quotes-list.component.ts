import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DataService } from 'src/app/_services/data.service';
import { IQuote } from '../../_shared/interfaces';
import { DeleteQuoteComponent } from '../delete-quote/dialog-delete-quote.component';
import { QuoteUpdateDialogComponent } from '../quote-update/dialog-quote-update.component';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['quotes-list.component.css'],
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


  //component vars
  filteredQuoteList: IQuote[] = [];
  displayedColumns: string[] = [
    'QuoteID',
    'QuoteType',
    'Contact',
    'Task',
    'TaskType',
    'DueDate',
    'Ops',
  ];
  rows = [5, 10, 20, 50, 100];
  selectedOrder: string;
  selectedValue: number;
  dataSource: any;
  isDesc: boolean;
  searchString: string;
  //config for pagination
  PageConfig: any;
  startItem: number;
  endItem: number;
  

  constructor(
    private dataService: DataService,
    private auth: AuthenticationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.selectedOrder = "QuoteID";
    this.selectedValue = this.rows[2];
    this.renderList();
     //setup pagination
     this.PageConfig = {
      itemsPerPage: this.selectedValue,
      currentPage: 1
    }
  }

  //change # listed-items in page 
  pageConfigChanged(value: number) {
    this.selectedValue = value;
    this.PageConfig.itemsPerPage = this.selectedValue;
    this.udatePageItem();
  }

  pageChanged(e:any) {
    this.PageConfig.currentPage = e;
    this.udatePageItem();
  }

  udatePageItem() {
      //update showing items
      this.startItem =this.filteredQuoteList.length? ((this.PageConfig.currentPage - 1) * this.PageConfig.itemsPerPage) + 1 : 0;
      this.endItem = (this.PageConfig.currentPage) * this.PageConfig.itemsPerPage;
      this.endItem = this.endItem > this.filteredQuoteList.length ? this.filteredQuoteList.length : this.endItem;
  }
  
  desc(value: boolean) {
    this.isDesc = value;
    this.sort(this.selectedOrder);
  }

  sort(value:string) {
    this.selectedOrder = value;
    this.filteredQuoteList.sort((a,b):number => {
      if (this.isDesc) {
        const temp = a;
        a = b;
        b = temp;
      }       

      return a[this.selectedOrder as keyof IQuote] < b[this.selectedOrder as keyof IQuote] ? -1 :
        a[this.selectedOrder as keyof IQuote] > b[this.selectedOrder as keyof IQuote] ? 1 : 0;
    });
    
  }

  // FIXME: render list according to filtered condition
  renderList() {
    //since it takes time to get data from server --> async
    this.dataService.getQuotes().subscribe((q: IQuote[]) => {
      this.quoteList = q;
      this.filter(this.searchString);
      this.sort(this.selectedOrder);
      this.udatePageItem();
      
    });
  }

  //open update model and update
  updateModal(id: number) {
    const dialogRef = this.dialog.open(QuoteUpdateDialogComponent, {
      height: '80%',
      width: '80%',
      data: { QuoteID: id, isView: false },
      panelClass: 'custom-dialog-container'
    });

    //update our list after model changes
    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) this.renderList();
    });
  }

  view(id: number) {
    const dialogRef = this.dialog.open(QuoteUpdateDialogComponent, {
      height: '80%',
      width: '80%',
      data: { QuoteID: id, isView: true },
      panelClass: 'custom-dialog-container'
    });

    //update our list after model changes
    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) this.renderList();
    });
  }

  delete(id: number) {
    // direct to another modal
    const dialogRef = this.dialog.open(DeleteQuoteComponent, {
      height: '30%',
      width: '40%',
      data: id,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === 'delete') this.ConfirmDelete(id);
    });
  }

  ConfirmDelete(id: number) {
    // render model confirm
    this.dataService.deleteQuote(id).subscribe(
      () => {
        this.renderList();
      },
      (e) => {
        console.log('Delete quote has error: ' + e);
      }
    );
  }

  // FIXME:problem in event binding
  logout() {
    this.auth.logout();
  }

  //filtering list through search String
  filter(value: string) {
    if (value) {
      this.searchString = value;
      this.filteredQuoteList = this.quoteList.filter((quote: IQuote) => {
        if (!(quote.DueDate instanceof Date))
          quote.DueDate = new Date(quote.DueDate);
        if (quote.Task == null)
          quote.Task = '';
        return (quote.QuoteID.toString().indexOf(value) > -1 ||
          quote.QuoteType.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
          quote.Task.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
          quote.TaskType.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
          quote.DueDate.toDateString().indexOf(value) > -1 ||
          quote.Contact.toLowerCase().indexOf(value.toLowerCase()) > -1);
      });
      
    }
    else {
      this.filteredQuoteList = this.quoteList;
    }

    //update dataSource
    this.dataSource = new MatTableDataSource(this.filteredQuoteList);

  }
}

