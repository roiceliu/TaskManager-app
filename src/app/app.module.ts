import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './_services/core.module';
import { QuotesModule } from './quotes/quotes.module';
import { CredentialModule } from './credential/credential.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptors';
// import { CredentialsComponent } from './credentials/credentials.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, QuotesModule, CoreModule,CredentialModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}

/**
 * Modules:
 * 1. Credentail(login & register components)
 * 2. quotes(CRUD ops)
 *
 */
