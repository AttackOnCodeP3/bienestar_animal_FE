import {Component, inject} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {LoginController} from '@pages/auth/login/login.controller';
import {LogoBienestarAnimal} from '@components/icons';
import {MatInputModule} from '@angular/material/input';
import {Forms, I18n} from '@services/general';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

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
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [LoginController]
})
export class Login {

  private readonly pageController = inject(LoginController);
  readonly i18n = inject(I18n);
  readonly forms = inject(Forms);

  readonly form = this.forms.formsBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  onSubmit(): void {

  }
}
