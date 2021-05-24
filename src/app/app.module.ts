import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceModule } from './_services/service.module';
import { QuotesModule } from './quotes/quotes.module';
import { CredentialModule } from './credential/credential.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, QuotesModule, ServiceModule,CredentialModule, BrowserAnimationsModule,MatTableModule],
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
