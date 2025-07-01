import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator that compares two form fields to check if they match, with stricter typing.
 * @param fieldName Name of the first field (e.g., 'password').
 * @param matchingFieldName Name of the second field that should match (e.g., 'confirmPassword').
 * @returns {ValidatorFn} Function that validates if the values of the two fields are equal.
 * @author dgutierrez
 */
export function matchFieldsValidations(fieldName: string, matchingFieldName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const field: AbstractControl | null = formGroup.get(fieldName);
    const matchingField: AbstractControl | null = formGroup.get(matchingFieldName);

    if (!field || !matchingField) {
      throw new Error(`matchFields: Could not find field ${fieldName} or ${matchingFieldName}`);
    }

    if (matchingField.errors && !matchingField.errors['mustMatch']) {
      return null;
    }

    if (field.value !== matchingField.value) {
      matchingField.setErrors({ mustMatch: true });
    } else {
      matchingField.setErrors(null);
    }

    return null;
  };
}
