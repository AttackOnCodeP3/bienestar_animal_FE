import {Component, inject} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatInputModule} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {MatTooltip} from '@angular/material/tooltip';
import {LogoBienestarAnimalComponent} from '@components/icons';
import {FormsService, I18nService} from '@services/general';
import {Router} from '@angular/router';
import {PagesUrlsEnum} from '@common/enums';
import {Constants} from '@common/constants/constants';
import {AuthHttpService} from '@services/http';

@Component({
  selector: 'app-login',
  imports: [
    TranslatePipe,
    LogoBienestarAnimalComponent,
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
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class LoginPage {
  private readonly authService = inject(AuthHttpService);
  private readonly router = inject(Router);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);

  readonly form = this.formsService.formsBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  onSubmit(): void {
    if (this.form.invalid) {
      this.formsService.markFormTouchedAndDirty(this.form);
      return;
    }
    this.login();
  }

  private login(){
    this.authService
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
