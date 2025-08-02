import {Component, input, model} from '@angular/core';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {FormGroup, FormsModule} from '@angular/forms';
import {MatHint} from '@angular/material/input';
import {FormsService, I18nService} from '@services/general';
import {TranslatePipe} from '@ngx-translate/core';
import {Constants} from '@common/constants/constants';

/**
 * Component for the "It worked as a nursery home" checkbox in the user registration form.
 * @author dgutierrez
 * @modifiedBy gjimenez
 */
@Component({
  selector: 'app-it-worked-as-nursery-home-form',
  imports: [
    MatCheckbox,
    FormsModule,
    MatHint,
    TranslatePipe
  ],
  templateUrl: './it-worked-as-nursery-home-form.component.html',
  styleUrl: './it-worked-as-nursery-home-form.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ItWorkedAsNurseryHomeFormComponent {
  readonly i18nService = input.required<I18nService>()
  readonly formsService = input.required<FormsService>()
  readonly checked = model.required<boolean>()
  readonly form = input<FormGroup | null>(null);

  /**
   * Handles the change event of the checkbox.
   * @author dgutierrez
   */
  handleCheckedChange(event: MatCheckboxChange): void {
    this.checked.set(event.checked);
  }
}
