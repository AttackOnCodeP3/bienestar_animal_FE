import {inject, Injectable} from '@angular/core';
import {SanitaryControlResponseEnum} from '@common/enums';
import {FormsService} from '@services/general';
import {FormGroup, Validators} from '@angular/forms';
import {ISanitaryControlForm} from '@common/interfaces/forms';
import {Race, SanitaryControlResponse, SanitaryControlType, Sex, Species} from '@models';
import {Subscription} from 'rxjs';
import {IVaccineApplied} from '@common/interfaces';
import {VaccineApplicationDto, SanitaryControlDto} from '@models/dto';

/**
 * Service for managing the community animal registration form.
 * @author dgutierrez
 */
@Injectable({providedIn: 'root'})
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
      productUsed: this.formsService.formsBuilder.control<string | null>(null, {
        validators: [Validators.required],
      }),
      lastApplicationDate: this.formsService.formsBuilder.control<Date | null>(null, {
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
        if (isDisabled) {
          lastApplicationDate?.setValue(null);
        }
        productUsed.updateValueAndValidity();
      }

      if (lastApplicationDate) {
        lastApplicationDate.setValidators(isDisabled ? [] : [Validators.required]);
        if (isDisabled) {
          productUsed?.setValue(null);
        }
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

  /**
   * Builds the vaccination form for the animal profile.
   * @author dgutierrez
   */
  buildVaccinationForm() {
    return this.formsService.formsBuilder.group({
      selectedVaccines: this.formsService.formsBuilder.control<number[]>([], {nonNullable: true}),
      vaccinesDates: this.formsService.formsBuilder.array<FormGroup>([])
    });
  }

  /**
   * Builds the form for creating an animal profile.
   * @author dgutierrez
   */
  buildCreateAnimalProfileForm() {
    return this.formsService.formsBuilder.group({
      name: this.formsService.formsBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      species: this.formsService.formsBuilder.control<Species | null>(null, {
        validators: [Validators.required],
      }),
      race: this.formsService.formsBuilder.control<Race | null>(null, {
        validators: [Validators.required],
      }),
      birthDate: this.formsService.formsBuilder.control<Date | null>(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      sex: this.formsService.formsBuilder.control<Sex | null>(null, {
        validators: [Validators.required],
      }),
      weight: this.formsService.formsBuilder.control<number>(0, {
        validators: [Validators.required, Validators.min(1)],
        nonNullable: true
      })
    });
  }

  /**
   * Builds the vaccine application DTO from the applied vaccines.
   * @param appliedVaccines An array of applied vaccines.
   * @return An array of VaccineApplicationDto objects.
   * @author dgutierrez
   */
  buildVaccineAppliedDto(appliedVaccines: IVaccineApplied[]): VaccineApplicationDto[] {
    return appliedVaccines.map((vaccine) => VaccineApplicationDto.fromIVaccineApplied(vaccine));
  }

  buildSanitaryControlDto(sanitaryControlForm: FormGroup): SanitaryControlDto {
    return new SanitaryControlDto({
      lastApplicationDate: sanitaryControlForm.get('lastApplicationDate')?.value ?? null,
      productUsed: sanitaryControlForm.get('productUsed')?.value ?? null,
      sanitaryControlTypeId: sanitaryControlForm.get('sanitaryControlType')?.value?.id ?? null,
      sanitaryControlResponseId: sanitaryControlForm.get('sanitaryControlResponse')?.value?.id ?? null,
    });
  }

  /**
   * Resets the sanitary control form to its initial state. Saves the current sanitary control type
   * and restores it after resetting the form.
   * @param form The form to reset.
   * @author dgutierrez
   */
  resetSanitaryControlForm(form: FormGroup): void {
    //first save the current sanitary control type
    const sanitaryControlType = form.get('sanitaryControlType')?.value;

    //reset the form because, this cleans the validators and doesn't show the error messages
    form.reset();

    //then set the sanitary control type back
    form.get('sanitaryControlType')?.setValue(sanitaryControlType);
  }
}
