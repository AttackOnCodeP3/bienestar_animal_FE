import {effect, inject, Injectable} from '@angular/core';
import {CustomErrorStateMatcher} from '@common/forms';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {InputType} from '@common/types';
import {I18nService, LogService} from '@services/general';
import {I18nFormsEnum} from '@common/enums/i18n';
import {toObservable} from '@angular/core/rxjs-interop';

/**
 * Service for managing forms, including validation and error handling.
 * Provides methods to mark forms as touched, check field validity,
 * and retrieve localized error messages.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class FormsService {
  readonly formsBuilder = inject(FormBuilder);
  private readonly logService = inject(LogService);
  private readonly i18nService = inject(I18nService)

  matcher = new CustomErrorStateMatcher();

  /**
   * Map of input types to their corresponding text representation for error messages.
   * This is used to provide localized error messages based on the type of input field.
   * @author dgutierrez
   */
  private readonly inputTextMap: Map<InputType, string> = new Map([
    ['text', 'characters'],
    ['number', 'digits'],
    ['email', 'characters'],
    ['password', 'characters'],
    ['tel', 'digits'],
  ]);

  /**
   * Map of error messages for form validation.
   * Each key corresponds to a validation error type, and the value is a function
   * that returns the localized error message, optionally formatted with input type.
   * @author dgutierrez
   */
  private readonly errorMessages: Map<string, (type: InputType) => string> = new Map();

  private readonly reloadErrorMessagesEffect = effect(() => {
    const currentLanguaje = this.i18nService.currentLanguage()
    this.initializeErrorMessages();
    this.logService.debug({
      message: `FormsService initialized with language:`,
      data: { currentLanguaje },
      className: this.constructor.name,
    });
  });

  constructor() {
    this.initializeErrorMessages();
  }

  /**
   * Asynchronously initializes localized error messages by retrieving them
   * from the i18nService and storing them in the errorMessages map.
   * @author dgutierrez
   */
  private async initializeErrorMessages(): Promise<void> {
    const [
      mustMatch,
      email,
      maxlength,
      minlength,
      pattern,
      required,
    ] = await Promise.all([
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_MUST_MATCH),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_EMAIL),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_MAXLENGTH),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_MINLENGTH),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_PATTERN),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_REQUIRED),
    ]);

    this.errorMessages.set('mustMatch', () => mustMatch);
    this.errorMessages.set('email', () => email);
    this.errorMessages.set('maxlength', type => `${maxlength} {{requiredLength}} ${this.inputTextMap.get(type)}`);
    this.errorMessages.set('minlength', type => `${minlength} {{requiredLength}} ${this.inputTextMap.get(type)}`);
    this.errorMessages.set('pattern', () => pattern);
    this.errorMessages.set('required', () => required);
  }

  /**
   * Marks all controls in a given FormGroup as touched and dirty,
   * triggering validation messages.
   * @param formGroup The form group to mark.
   * @author dgutierrez
   */
  markFormTouchedAndDirty(formGroup: FormGroup): void {
    if (!formGroup) {
      throw new Error('markFormTouchedAndDirty(): formGroup cannot be null');
    }
    formGroup.markAllAsTouched();
    Object.values(formGroup.controls).forEach(control => control.markAsDirty());
  }

  /**
   * Returns true if the control is invalid and either dirty or touched.
   * @param control The form control to evaluate.
   * @returns Whether the field is invalid and interacted with.
   * @author dgutierrez
   */
  isFieldInvalid(control: AbstractControl | null): boolean {
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  /**
   * Retrieves the error message corresponding to the first validation error
   * found in the control.
   * @param control The form control to evaluate.
   * @param type The input type associated with the field (e.g. 'text', 'email').
   * @returns A formatted error message or an empty string if no errors.
   * @author dgutierrez
   */
  getErrorMessage(control: AbstractControl | null, type: InputType = 'text'): string {
    if (!control?.errors) return '';

    for (const errorKey in control.errors) {
      const templateFn = this.errorMessages.get(errorKey);
      if (!templateFn) continue;

      let message = templateFn(type);
      const errorValue = control.getError(errorKey);

      if (errorValue && typeof errorValue === 'object') {
        for (const param in errorValue) {
          message = message.replace(`{{${param}}}`, errorValue[param]);
        }
      }

      return message;
    }

    return '';
  }

  /**
   * Returns the form control for a given name within a FormGroup.
   * @param name The name of the control to retrieve.
   * @param form The FormGroup containing the control.
   * @return The AbstractControl if found, otherwise null.
   * @author dgutierrez
   */
  getControl(name: string, form: FormGroup): AbstractControl | null {
    return form.get(name);
  }

  /**
   * Returns the formatted error message if the control is invalid,
   * otherwise returns null. Useful for direct binding in templates.
   * @param control The form control to evaluate.
   * @param type The input type (default: 'text').
   * @returns The error message or null.
   * @author dgutierrez
   */
  getError(control: AbstractControl | null, type: InputType = 'text'): string | null {
    return this.isFieldInvalid(control) ? this.getErrorMessage(control, type) : null;
  }
}
