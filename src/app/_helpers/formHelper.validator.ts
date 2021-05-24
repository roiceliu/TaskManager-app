import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

//implement ValidatorFn
export const MustMatch: ValidatorFn =
  //call back function to get a form validated
  (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // if not matching, set confirmPassword as well
    if (password.value !== confirmPassword.value)
      confirmPassword.setErrors({ mustMatch: true });
    else
      confirmPassword.setErrors(null);

    return password.value !== confirmPassword.value
      ? { mustMatch: true }
      : null;
  };

export function PatternValidator(
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn {
    return (control: AbstractControl) => {
        if (control.value == null) return null;

        const valid = regex.test(control.value);
        return valid ? null : error;
  };
}
