import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [QuotesComponent, QuotesListComponent],
  exports: [QuotesComponent],
})
export class QuotesModule {}
