import {FormControl} from '@angular/forms';
import {SanitaryControlResponse, SanitaryControlType} from '@models';

/**
 * Interface representing the form structure for sanitary control.
 * This form is used to manage various types of sanitary controls such as vaccinations, deworming, sterilization, etc.
 * @author dgutierrez
 */
export interface ISanitaryControlForm {
  productUsed: FormControl<string>;
  lastApplicationDate: FormControl<Date>;
  sanitaryControlResponse: FormControl<SanitaryControlResponse | null>;
  /**
   * Type of sanitary control, such as vaccination, deworming, sterilization, etc.
   * This field is added dynamically based on the selected sanitary control type.
   */
  sanitaryControlType?: FormControl<SanitaryControlType>;
}
