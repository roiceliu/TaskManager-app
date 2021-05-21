import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { AuthenticationService } from './authentication.service';


@NgModule({
  imports: [HttpClientModule],
  providers: [DataService, AuthenticationService],
})
export class CoreModule {}
