import { Component, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';
import { ForgotPwHttpService } from '@services/http';
import { AlertService, I18nService } from '@services/general';
import { LogoBienestarAnimalComponent } from "@components/icons";


/**
 * Component for handling the "Forgot Password" functionality.
 * 
 * This page allows users to request a password reset by entering their email address.
 * It uses Angular's reactive forms for validation and interacts with a backend service
 * to initiate the password reset process.
 *
 * @author @aBlancoC
 */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe,
    LogoBienestarAnimalComponent
],
  templateUrl: './forgot-password.page.html',
  styleUrl: './forgot-password.page.scss'
})
export class ForgotPasswordPage {

  private readonly ForgotPwHttpService = inject(ForgotPwHttpService);
  readonly i18nService = inject(I18nService);

  loading = signal(false);

  email = new FormControl('', [Validators.required, Validators.email]);

  forgotPasswordForm = new FormGroup({
    email: this.email
  });

  constructor(private http: HttpClient) {}

  send() {

    if (this.email.invalid) return;
    this.loading.set(true);

    this.ForgotPwHttpService.save(this.email.value ?? '')
  }
}
