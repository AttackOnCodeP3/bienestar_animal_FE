import { Component, signal, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { I18nService } from '@services/general';
import { ChangePwHttpService } from 'app/services/http/change-pw-http-service/change-pw-http.service';
import { AuthHttpService } from '@services/http';

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
  private readonly ChangePasswordService = inject(ChangePwHttpService);
  //const user = authHttpService.currentUser();
  private readonly AuthHttpService = inject(AuthHttpService);
  loading = signal(false);
  submitted = signal(false);

  oldPassword = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl('', [Validators.required]);

  passwordResetForm = new FormGroup({
    oldPassword: this.oldPassword,
    newPassword: this.newPassword,
    confirmPassword: this.confirmPassword
  });

  get passwordsMatch(): boolean {
    return this.newPassword.value === this.confirmPassword.value;
  }

  
  onSubmit() {
    const userId = this.AuthHttpService.currentUser()?.id;

    this.submitted.set(true);
    if (this.passwordResetForm.invalid || !this.passwordsMatch || userId == null) return;
    this.loading.set(true);

    this.ChangePasswordService.changePassword(
      userId,
      this.oldPassword.value ?? '',
      this.newPassword.value ?? '',
      this.confirmPassword.value ?? ''
    );

    setTimeout(() => {
      this.loading.set(false);

    }, 1200);
  }
}