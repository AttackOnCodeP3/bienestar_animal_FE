import {inject, Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Canton, District, Interest, Municipality, Neighborhood} from '@models';
import {matchFieldsValidations} from '@common/forms';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationFormService {

  private readonly fb = inject(FormBuilder);

  buildForm(): FormGroup {
    return this.fb.group({
      identificationCard: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      isNurseryHome: [false, [Validators.required]],
      interests: [[] as Interest[]],
      canton: [null as Canton | null, [Validators.required]],
      district: [null as District | null, [Validators.required]],
      neighborhood: [null as Neighborhood | null, [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      volunteerMunicipality: [null as Municipality | null],
    }, {
      validators: matchFieldsValidations('password', 'confirmPassword')
    });
  }

  enableDisableVolunteerMunicipality(control: AbstractControl | null, intent: boolean): void {
    if (!control) return;
    if (intent) {
      control.enable();
    } else {
      control.disable();
      control.setValue(null);
    }
  }
}
