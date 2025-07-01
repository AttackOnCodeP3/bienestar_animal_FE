import {ChangeDetectionStrategy, Component, input, model, output} from '@angular/core';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatHint} from '@angular/material/input';
import {Forms, I18n} from '@services/general';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Component for the "It worked as a nursery home" checkbox in the user registration form.
 * @author dgutierrez
 */
@Component({
  selector: 'app-it-worked-as-nursery-home',
  imports: [
    MatCheckbox,
    FormsModule,
    MatHint,
    TranslatePipe
  ],
  templateUrl: './it-worked-as-nursery-home.html',
  styleUrl: './it-worked-as-nursery-home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItWorkedAsNurseryHome {
  readonly i18n = input.required<I18n>()
  readonly forms = input.required<Forms>()
  readonly checkedChange = output<boolean>()

  /**
   * Handles the change event of the checkbox.
   * @author dgutierrez
   */
  handleCheckedChange(event: MatCheckboxChange): void {
    this.checkedChange.emit(event.checked);
  }
}
