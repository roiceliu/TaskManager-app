import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { AddQuoteComponent } from './add-quote/addQuote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuoteDetailsDialogComponent } from './quote-details/dialog-quote-details.component';
import { QuotesRoutingModule } from './quotes-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { QuoteUpdateDialogComponent } from './quote-update/dialog-quote-update.component';
import { DeleteQuoteComponent } from './delete-quote/dialog-delete-quote.component';



@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,QuotesRoutingModule, MatTableModule,MatButtonModule,MatInputModule,MatDialogModule],
  declarations: [QuotesComponent, QuotesListComponent, AddQuoteComponent, QuoteDetailsDialogComponent,QuoteUpdateDialogComponent, DeleteQuoteComponent],
  exports: [QuotesComponent]
})
export class QuotesModule {}
