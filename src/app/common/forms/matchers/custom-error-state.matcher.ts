import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

/**
 * Custom error state matcher for Angular Material forms.
 * This matcher checks if a form control is in an error state based on its validity,
 * whether it has been touched or dirty, and if the form has been submitted.
 * It is used to provide visual feedback for form validation errors.
 * @author dgutierrez
 */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
