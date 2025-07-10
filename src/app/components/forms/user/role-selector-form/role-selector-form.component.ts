import {Component, input, model} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {Constants} from '@common/constants/constants';
import {FormsService, I18nService} from '@services/general';
import {Role} from '@models';

/**
 * Component for selecting roles in a form.
 * @author dgutierrez
 */
@Component({
  selector: 'app-role-selector-form',
  imports: [
    MatSelectionList,
    MatListOption,
    ReactiveFormsModule
  ],
  templateUrl: './role-selector-form.component.html',
  styleUrl: './role-selector-form.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class RoleSelectorFormComponent {
  readonly form = input.required<FormGroup>();
  readonly formsService = input.required<FormsService>();
  readonly i18nService = input.required<I18nService>();
  readonly rolesList = input.required<Role[]>();
  readonly rolesListSelected = model<Role[]>([]);
}
