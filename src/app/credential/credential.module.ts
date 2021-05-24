import { CommonModule } from "@angular/common";
import { NgModule} from "@angular/core";
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { MatButtonModule } from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';


@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,MatButtonModule,  MatInputModule],
    declarations: [LoginComponent, RegisterComponent, ],
    exports:[LoginComponent, RegisterComponent]
})
export class CredentialModule{}