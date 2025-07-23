import {FormGroup} from '@angular/forms';

/**
 * Represents the result of a failed form validation.
 * Used to identify which form failed and what error message should be displayed.
 * Typically returned by a method that validates multiple forms in a process.
 *
 * @example
 * const error = this.validateUserRegistrationForms();
 * if (error) {
 *   this.formsService.markFormTouchedAndDirty(error.form);
 *   this.alertService.displayAlert({ messageKey: error.errorMessageKey });
 *   return;
 * }
 *
 * @author
 */
export interface IFormValidationError {
  /**
   * The Angular reactive form group that failed validation.
   * This form should be marked as touched and dirty to trigger visual feedback.
   */
  form: FormGroup;

  /**
   * The i18n key representing the error message to be displayed.
   * This key can be used with the alert service or a translation pipe.
   */
  errorMessageKey: string;
}
