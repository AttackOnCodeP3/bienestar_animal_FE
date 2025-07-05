import {inject, Injectable, signal, effect, computed} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Canton, District, Interest, Municipality, Neighborhood} from '@models';
import {matchFieldsValidations} from '@common/forms';
import {FormGroup} from '@angular/forms';

@Injectable({providedIn: 'root'})
export class UserRegistrationFormService {
  private readonly fb = inject(FormBuilder);

  readonly volunteerIntent = signal(false);
  readonly isNurseryHome = computed(() => this.formUserRegistration.controls.isNurseryHome.value);
  readonly formUserRegistration = this.buildUserForm();

  /**
   * Applies a reactive effect to enable/disable the volunteer municipality field.
   * @param form The form to apply the effect on
   * @author dgutierrez
   */
  setupVolunteerMunicipalityEffect(form: FormGroup): void {
    effect(() => {
      const control = form.get('volunteerMunicipality');
      if (!control) return;

      if (this.volunteerIntent()) {
        control.enable();
      } else {
        control.disable();
        control.setValue(null);
      }
    });
  }

  /**
   * Builds the shared form group used for both registration and profile completion.
   * @returns FormGroup instance with predefined structure and validators.
   * @author gutierrez
   */
  private buildUserForm() {
    return this.fb.group({
      identificationCard: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      isNurseryHome: new FormControl(false, [Validators.required]),
      interests: new FormControl<Interest[]>([]),
      canton: new FormControl<Canton | null>(null, [Validators.required]),
      district: new FormControl<District | null>(null, [Validators.required]),
      neighborhood: new FormControl<Neighborhood | null>(null, [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      volunteerMunicipality: new FormControl<Municipality | null>(null, [Validators.required]),
    }, {
      validators: matchFieldsValidations('password', 'confirmPassword'),
    });
  }

  /**
   * Updates the "isNurseryHome" form control value.
   * @param form The form where the value should be set
   * @param checked The new value for the checkbox
   * @author dgutierrez
   */
  setNurseryHomeValue(form: FormGroup, checked: boolean): void {
    form.get('isNurseryHome')?.setValue(checked);
  }

  /**
   * Updates the "interests" form control value.
   * @param form The form where the interests should be set
   * @param interests The selected interests
   * @author dgutierrez
   */
  setInterests(form: FormGroup, interests: Interest[]): void {
    form.get('interests')?.setValue(interests);
  }
}
