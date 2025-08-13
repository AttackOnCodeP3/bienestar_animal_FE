import {AbstractControl, ValidationErrors} from '@angular/forms';
import {FilterOptionEnum} from '@common/enums';

/**
 * Validator that checks if the selected option is not the default "select option".
 * @param control The form control to validate.
 * @returns {ValidationErrors | null} Returns an error object if the selected option is the
 * @author dgutierrez
 */
export function notSelectOptionValidator(control: AbstractControl): ValidationErrors | null {
  return control.value === FilterOptionEnum.SELECT_OPTION
    ? { invalidSelection: true }
    : null;
}
