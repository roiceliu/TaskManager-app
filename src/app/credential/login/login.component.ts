import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //needs formModule at credential, binding to form
  form: FormGroup;
  error: string;

  constructor(private fileBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) {
    if (this.auth.currentUserValue)
      this.router.navigate(['/']);
  }

  ngOnInit(): void {
    //get fileBuilder where name binded from formControlName
    this.form = this.fileBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const val = this.form.value;
    this.auth.login(val.userName, val.password).subscribe(
      (data) => {
        this.error = null;
        this.router.navigateByUrl('/');
      },
      (e) => {
        this.error = 'The userName or Password entered is invalid'
      }
    )
  }

}


