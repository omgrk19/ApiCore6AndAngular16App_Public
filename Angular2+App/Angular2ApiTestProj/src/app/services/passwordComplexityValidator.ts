import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function passwordComplexityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value || '';

        const hasMinLength = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        const valid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

        return valid ? null : {
            passwordComplexity: {
                hasMinLength,
                hasUpperCase,
                hasLowerCase,
                hasNumber,
                hasSpecialChar
            }
        };
    };
}


