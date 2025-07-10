import {Component, computed, effect, input, model} from '@angular/core';
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
  readonly rolesListSelected = input<Role[]>([]);

  /**
   * Computes a function to compare roles by their IDs.
   * This function is used to determine if two roles are equal based on their IDs.
   * @return A function that takes two roles and returns true if their IDs match.
   * @author dgutierrez
   */
  compareRolesFn = computed(() => this.formsService().getGenericCompareFn<Role>('id'));

  constructor() {
    effect(() => {
      const selectedRoles = this.rolesListSelected();
      console.error('Selected roles:', selectedRoles);
    });
  }
}
