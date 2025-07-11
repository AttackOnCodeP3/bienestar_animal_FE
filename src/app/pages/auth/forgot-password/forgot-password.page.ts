import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './forgot-password.page.html',
  styleUrl: './forgot-password.page.scss'
})
export class ForgotPasswordPage {

  // Signals for state
  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);


  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private http: HttpClient) {}

  send() {
    if (this.email.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);

   
    this.http.post('/api/auth/forgot-password', { email: this.email.value }).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
      },
      error: (err) => {
        // Optionally extract error message
        this.error.set('Something went wrong. Please try again.');
        this.loading.set(false);
      }
    });
  }
}

function inject(I18nService: any) {
  throw new Error('Function not implemented.');
}
