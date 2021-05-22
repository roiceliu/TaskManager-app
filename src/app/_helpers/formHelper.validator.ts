import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const MustMatch:ValidatorFn =
    //call back function to get a form validated
    (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        
        // if not matching
        return (password.value !== confirmPassword.value) ? { mustMatch: true } : null;
}
    
