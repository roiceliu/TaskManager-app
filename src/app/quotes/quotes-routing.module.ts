import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { AddQuoteComponent } from './add-quote/addQuote.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';

const routes: Routes = [
  {
    path: 'quotes',
    component: QuotesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-quote',
    component: AddQuoteComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule {}
