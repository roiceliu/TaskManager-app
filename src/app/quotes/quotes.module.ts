import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { AddQuoteComponent } from './add-quote/addQuote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { QuotesRoutingModule } from './quotes-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,QuotesRoutingModule, MatTableModule,MatButtonModule,MatInputModule],
  declarations: [QuotesComponent, QuotesListComponent, AddQuoteComponent, QuoteDetailsComponent],
  exports: [QuotesComponent],
})
export class QuotesModule {}
