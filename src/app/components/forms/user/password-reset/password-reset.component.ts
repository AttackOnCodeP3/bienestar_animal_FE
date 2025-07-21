import { Component, signal, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { I18nService } from '@services/general';
import { ChangePasswordHttpService } from 'app/services/http/change-pw-http-service/change-pw-http.service';
import { AuthHttpService } from '@services/http';

/**
 * @author @aBlancoC
 * 
 * Component for handling user password reset functionality.
 * 
 * This Angular standalone component provides a form for users to change their password.
 * It includes validation for required fields and minimum password length, and ensures
 * that the new password and confirmation match before submitting the change request.
 * 
 * Dependencies:
 * - I18nService: For internationalization support.
 * - ChangePasswordHttpService: Service to handle password change HTTP requests.
 * - AuthHttpService: Service to access current user authentication information.
 * 
 * Features:
 * - Reactive form with validation for old password, new password, and confirmation.
 * - Loading and submission state management.
 * - Password match validation.
 * - Handles form submission and invokes password change service.
 */
@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  readonly i18nService = inject(I18nService);
  private readonly changePasswordService = inject(ChangePasswordHttpService);
  private readonly authHttpService = inject(AuthHttpService);
  readonly loading = signal(false);
  readonly submitted = signal(false);
  submitted = signal(false);
  passwordResetForm = this.createPasswordResetForm();

  createPasswordResetForm(): FormGroup {
  return new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });
}

  get passwordsMatch(): boolean {
    return (this.newPassword?.value ?? '') === (this.confirmPassword?.value ?? '');
  }
  get oldPassword() {
    return this.passwordResetForm.get('oldPassword');
  }
  get newPassword() {
    return this.passwordResetForm.get('newPassword');
  }
  get confirmPassword() {
    return this.passwordResetForm.get('confirmPassword');
  }

  
  
  onSubmit() {
    const userId = this.authHttpService.currentUser()?.id;

    this.submitted.set(true);
    if (this.passwordResetForm.invalid || !this.passwordsMatch || userId == null) return;
    this.loading.set(true);

    this.changePasswordService.changePassword(
      userId,
      this.oldPassword?.value ?? '',
      this.newPassword?.value ?? '',
      this.confirmPassword?.value ?? ''
    );

      this.loading.set(false);

  }
}