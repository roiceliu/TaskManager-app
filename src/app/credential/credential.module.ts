import { CommonModule } from "@angular/common";
import { NgModule} from "@angular/core";
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    declarations: [LoginComponent, RegisterComponent],
    exports:[LoginComponent, RegisterComponent]
})
export class CredentialModule{}