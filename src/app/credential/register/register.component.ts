import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MustMatch,
  PatternValidator,
} from 'src/app/_helpers/formHelper.validator';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  error: string;
  submitted: boolean;

  constructor(private router: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.submitted = false;

    this.form = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          PatternValidator(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, {
            hasSpecialCase: true,
          }),
          PatternValidator(/\d/, { hasNumber: true }),
          PatternValidator(/[A-Z]/, { hasCapitalCase: true }),
          PatternValidator(/[a-z]/, { hasSmallCase: true }),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      {
        //cross-field validations
        validators: MustMatch,
      }
    );
  }

  register() {
    this.submitted = true;
    if (this.form.invalid) return;

    let val = this.form.value;
    this.auth.register(val.email, val.password, val.confirmPassword).subscribe(
      () => {
        this.error = null;
        this.router.navigate(['/login']);
      },
      (e) => {
        this.error = 'Registration failed. Try again';
      }
    );
  }

  get formValue() {
    return this.form.controls;
  }
}
