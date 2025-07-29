import {effect, inject, Injectable} from '@angular/core';
import {CustomErrorStateMatcher} from '@common/forms';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {InputType} from '@common/types';
import {I18nService, LogService} from '@services/general';
import {I18nFormsEnum} from '@common/enums/i18n';
import {IIdentifiable} from '@common/interfaces';
import {FilterOptionEnum} from '@common/enums';
import {FileValidator} from 'ngx-custom-material-file-input';

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

  readonly matcher = new CustomErrorStateMatcher();

  /**
   * Maximum file size for uploads, set to 1 MB.
   * This is used to restrict file uploads in file input components.
   * @author dgutierrez
   */
  readonly maxFileSize1MBInBytes = 1024 * 1024;

  /**
   * Accept types for image file inputs used in file upload components.
   * Restricts the selectable file types to commonly used image formats.
   * Used in <input type="file"> or compatible components like ngx-mat-file-input.
   *
   * Examples: .jpg, .jpeg, .png, image/jpeg, image/png
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
   * @author dgutierrez
   */
  readonly imageFileAcceptTypes = '.jpg, .jpeg, .png, image/jpeg, image/png';

  /**
   * Minimum date allowed for date inputs, set to 100 years ago.
   * This is used to restrict date pickers to not allow dates older than 100 years.
   * @author dgutierrez
   */
  readonly minDate100YearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 100));

  /**
   * Minimum date allowed for date inputs, set to 3 months ago.
   * This is used to restrict date pickers to not allow dates older than 3 months.
   * @author dgutierrez
   */
  readonly minDate3MonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 3));

  /**
   * Maximum date allowed for date inputs, set to today.
   * This is used to restrict date pickers to not allow future dates.
   * @author dgutierrez
   */
  readonly maxTodayDate = new Date();

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
      data: {currentLanguaje},
      className: this.constructor.name,
    });
  });

  constructor() {
    this.initializeErrorMessages();
  }

  get filterOptionEnum() {
    return FilterOptionEnum;
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
      min,
      max,
      acceptedMimeTypes,
      maxContentSize,
      invalidSelection
    ] = await Promise.all([
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_MUST_MATCH),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_EMAIL),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_MAXLENGTH),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_MINLENGTH),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_PATTERN),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_REQUIRED),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_MIN),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_MAX),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_FILE_ACCEPT),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_FILE_MAX_CONTENT_SIZE),
      this.i18nService.get(I18nFormsEnum.FORM_VALIDATION_INVALID_SELECTION)
    ]);

    this.errorMessages.set('mustMatch', () => mustMatch);
    this.errorMessages.set('email', () => email);
    this.errorMessages.set('maxlength', type => `${maxlength} {{requiredLength}} ${this.inputTextMap.get(type)}`);
    this.errorMessages.set('minlength', type => `${minlength} {{requiredLength}} ${this.inputTextMap.get(type)}`);
    this.errorMessages.set('pattern', () => pattern);
    this.errorMessages.set('required', () => required);
    this.errorMessages.set('min', type => `${min} {{min}}`);
    this.errorMessages.set('max', type => `${max} {{max}}`);
    this.errorMessages.set('acceptedMimeTypes', () => acceptedMimeTypes);
    this.errorMessages.set('maxContentSize', () => maxContentSize);
    this.errorMessages.set('invalidSelection', () => invalidSelection);
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
   */
  getErrorMessage(control: AbstractControl | null, type: InputType = 'text'): string {
    if (!control?.errors) return '';

    for (const errorKey in control.errors) {
      const templateFn = this.errorMessages.get(errorKey);
      if (!templateFn) continue;

      const rawMessage = templateFn(type);
      const errorValue = control.getError(errorKey);

      if (errorValue && typeof errorValue === 'object') {
        return this.formatTemplate(rawMessage, errorValue);
      }

      return rawMessage;
    }

    return '';
  }

  /**
   * Replaces placeholders in a message template with actual parameter values.
   * Supports special cases like maxSizeMB and array formatting.
   */
  private formatTemplate(template: string, params: Record<string, any>): string {
    let message = template;

    for (const key in params) {
      let value = params[key];

      if (key === 'maxSize') {
        const maxSizeMB = (value / 1024 / 1024).toFixed(2);
        message = message.replace(`{{maxSizeMB}}`, maxSizeMB);
      }

      if (Array.isArray(value)) {
        value = value.join(', ');
      }

      message = message.replace(`{{${key}}}`, value);
    }

    return message;
  }


  getFileValidators(options: {
    acceptTypes?: string[],
    maxSizeInMB?: number,
    required?: boolean,
  }): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (options.acceptTypes?.length) {
      const baseValidator = FileValidator.acceptedMimeTypes(options.acceptTypes);
      validators.push((control: AbstractControl) => {
        const result = baseValidator(control);
        if (result?.['acceptedMimeTypes']) {
          result['acceptedMimeTypes']['allowedExtensions'] = options.acceptTypes?.join(', ');
        }
        return result;
      });
    }

    if (options.maxSizeInMB !== undefined) {
      validators.push(FileValidator.maxContentSize(options.maxSizeInMB * 1024 * 1024));
    }

    if (options.required) {
      validators.push(Validators.required);
    }

    return validators;
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
   * Checks if a control is valid within a FormGroup.
   * @param name The name of the control to check.
   * @param form The FormGroup containing the control.
   * @returns True if the control is valid, false otherwise.
   * @author dgutierrez
   */
  isControlValid(name: string, form: FormGroup): boolean {
    const control = this.getControl(name, form);
    return !!control && control.valid;
  }

  /**
   * Checks if a control has a value within a FormGroup.
   * @param name The name of the control to check.
   * @param form The FormGroup containing the control.
   * @returns True if the control has a value, false otherwise.
   * @author dgutierrez
   */
  isControlHasValue(name: string, form: FormGroup): boolean {
    const control = this.getControl(name, form);
    return !!control && control.value !== null && control.value !== undefined && control.value !== '';
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

  /**
   * Returns an array of field names that are invalid in the given FormGroup.
   * @param form The FormGroup to check for invalid fields.
   * @return An array of invalid field names.
   * @author dgutierrez
   */
  getInvalidFields(form: FormGroup): string[] {
    if (!form || !form.controls) {
      return [];
    }

    return Object.keys(form.controls).filter(key => {
      const control = form.get(key);
      return this.isFieldInvalid(control);
    });
  }

  /**
   * Logs the names of invalid fields in the form.
   * @param form The FormGroup to check for invalid fields.
   * @author dgutierrez
   */
  logFormErrors(form: FormGroup): void {
    if (!form || !form.controls) {
      this.logService.error({
        message: 'FormsService: logFormErrors: Form is null or has no controls.',
      });
      return;
    }

    const invalidFields = this.getInvalidFields(form);
    if (!invalidFields.length) {
      this.logService.info({
        message: 'FormsService: logFormErrors: All fields are valid.',
      });
      return;
    }

    this.logService.error({
      message: `FormsService: logFormErrors: Invalid fields: ${invalidFields.join(', ')}`,
    });
  }

  /**
   * Generic function to compare objects by a key.
   * Useful for use in compareWith of mat-select.
   * @returns A function that compares two objects by that key.
   * @author dgutierrez
   */
  getGenericCompareFn<T>(key: keyof T): (o1: T | null, o2: T | null) => boolean {
    return (o1: T | null, o2: T | null): boolean => {
      return !!o1 && !!o2 && o1[key] === o2[key];
    };
  }

  /**
   * Generic comparison function for objects implementing IIdentifiable.
   * @param o1 Object 1 to compare, must implement IIdentifiable interface.
   * @param o2 Object 2 to compare, must implement IIdentifiable interface.
   * @return True if both objects have the same id, false otherwise.
   * @author dgutierrez
   */
  genericCompare<T extends IIdentifiable>(o1: T, o2: T): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
