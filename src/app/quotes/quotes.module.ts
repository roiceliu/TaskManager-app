import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { AddQuoteComponent } from './add-quote/addQuote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuotesRoutingModule } from './quotes-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { QuoteUpdateDialogComponent } from './quote-update/dialog-quote-update.component';
import { DeleteQuoteComponent } from './delete-quote/dialog-delete-quote.component';
import { FilterComponent } from './quotes-list/filter.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,QuotesRoutingModule, MatTableModule,MatButtonModule,MatInputModule,MatDialogModule,NgxPaginationModule],
  declarations: [QuotesListComponent, AddQuoteComponent, QuoteUpdateDialogComponent, DeleteQuoteComponent, FilterComponent]
})
export class QuotesModule {}
