import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './_services/core.module';
import { QuotesModule } from './quotes/quotes.module';
// import { CredentialsComponent } from './credentials/credentials.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, QuotesModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

/**
 * Modules:
 * 1. Credentail(login & register components)
 * 2. quotes(CRUD ops)
 *
 */
