import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './credential/login/login.component';
import { RegisterComponent } from './credential/register/register.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/quotes', pathMatch:'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register',component: RegisterComponent
  },
  //default route with wildcard path --> Quotes page 
  // {
  //   path: '**', redirectTo:'/quotes'
  // }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
