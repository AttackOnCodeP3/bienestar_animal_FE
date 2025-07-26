import {FormControl} from '@angular/forms';

/**
 * Interface representing a notification rule form.
 * @author dgutierrez
 */
export interface INotificationRuleForm {
  id: FormControl<number | null>;
  value: FormControl<number | null>;
  type: FormControl<string | null>;
}
