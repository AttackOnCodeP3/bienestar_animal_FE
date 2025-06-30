import {Component, inject} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatInputModule} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {MatTooltip} from '@angular/material/tooltip';
import {LogoBienestarAnimal} from '@components/icons';
import {LoginController} from '@pages/auth/login/login.controller';
import {Forms, I18n} from '@services/general';
import {Router} from '@angular/router';
import {PagesUrlsEnum} from '@common/enums';

@Component({
  selector: 'app-login',
  imports: [
    TranslatePipe,
    LogoBienestarAnimal,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatButton,
    MatDivider,
    MatTooltip,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [LoginController]
})
export class Login {
  private readonly router = inject(Router);
  private readonly pageController = inject(LoginController);
  readonly i18n = inject(I18n);
  readonly forms = inject(Forms);

  readonly form = this.forms.formsBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  onSubmit(): void {
    if (this.form.invalid) {
      this.forms.markFormTouchedAndDirty(this.form);
    }
  }

  /**
   * Navigates to the forgot password page.
   * @author dgutierrez
   */
  onNavigateToForgotPassword() {
    this.router.navigate([PagesUrlsEnum.FORGOT_PASSWORD]);
  }

  /**
   * Navigates to the registration page.
   * @author dgutierrez
   */
  onNavigateToRegister() {
    this.router.navigate([PagesUrlsEnum.REGISTER]);
  }
}
