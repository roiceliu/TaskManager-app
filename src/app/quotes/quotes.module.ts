import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { AddQuoteComponent } from './add-quote/addQuote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [QuotesComponent, QuotesListComponent, AddQuoteComponent],
  exports: [QuotesComponent],
})
export class QuotesModule {}
