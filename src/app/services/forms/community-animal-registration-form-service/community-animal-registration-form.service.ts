import {inject, Injectable} from '@angular/core';
import { SanitaryControlResponseEnum } from '@common/enums';
import {FormsService} from '@services/general';
import {FormGroup, Validators} from '@angular/forms';
import {ISanitaryControlForm} from '@common/interfaces/forms';
import {SanitaryControlResponse, SanitaryControlType} from '@models';
import {Subscription} from 'rxjs';

/**
 * Service for managing the community animal registration form.
 * @author dgutierrez
 */
@Injectable({ providedIn: 'root' })
export class CommunityAnimalRegistrationFormService {
  readonly formsService = inject(FormsService)

  get sanitaryControlResponseEnum() {
    return SanitaryControlResponseEnum;
  }

  /**
   * Builds a standard sanitary control form for usage in components
   * like deworming, neutering, and flea control.
   *
   * The form includes:
   * - productUsed: Required unless NO or UNKNOWN is selected.
   * - lastApplicationDate: Required unless NO or UNKNOWN is selected.
   * - sanitaryControlResponse: Always required.
   *
   * @returns A typed FormGroup representing a sanitary control form.
   * @author dgutierrez
   */
  buildSanitaryControlForm(): FormGroup<ISanitaryControlForm> {
    return this.formsService.formsBuilder.group({
      productUsed: this.formsService.formsBuilder.control<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      lastApplicationDate: this.formsService.formsBuilder.control<Date>(new Date(), {
        nonNullable: true,
        validators: [Validators.required],
      }),
      sanitaryControlResponse: this.formsService.formsBuilder.control<SanitaryControlResponse | null>(null, {
        validators: [Validators.required],
      }),
    });
  }

  /**
   * Subscribes to the sanitaryControlResponse field and dynamically
   * applies or removes validations on other fields based on the value selected.
   *
   * For example, if the response is NO or UNKNOWN, the fields
   * productUsed and lastApplicationDate will have their validators removed.
   *
   * @param form The form to which dynamic validation logic should be applied.
   * @returns A Subscription object that should be cleaned up on component destruction.
   * @author dgutierrez
   */
  applySanitaryControlValidations(form: FormGroup): Subscription {
    const control = form.get('sanitaryControlResponse');
    if (!control) return new Subscription();

    return control.valueChanges.subscribe((value: SanitaryControlResponse) => {
      const isDisabled = value?.id === SanitaryControlResponseEnum.NO || value?.id === SanitaryControlResponseEnum.UNKNOWN;
      const productUsed = form.get('productUsed');
      const lastApplicationDate = form.get('lastApplicationDate');

      if (productUsed) {
        productUsed.setValidators(isDisabled ? [] : [Validators.required]);
        productUsed.updateValueAndValidity();
      }

      if (lastApplicationDate) {
        lastApplicationDate.setValidators(isDisabled ? [] : [Validators.required]);
        lastApplicationDate.updateValueAndValidity();
      }
    });
  }

  /**
   * Adds or updates the `sanitaryControlType` control in the given form.
   * This ensures that the form is aware of what kind of control it represents
   * (e.g., DEWORMING, NEUTERING).
   *
   * @param form The form group to modify.
   * @param type The sanitary control type to assign to the form.
   * @author dgutierrez
   */
  assignSanitaryControlType(form: FormGroup, type: SanitaryControlType) {
    if (!form.contains('sanitaryControlType')) {
      form.addControl(
        'sanitaryControlType',
        this.formsService.formsBuilder.control(type, {
          validators: [Validators.required],
        })
      );
    } else {
      form.get('sanitaryControlType')?.setValue(type);
    }
  }
}
