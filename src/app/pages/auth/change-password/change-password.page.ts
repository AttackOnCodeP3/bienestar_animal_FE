import { Component, inject } from '@angular/core';
import { PasswordResetComponent } from '@components/forms/user/password-reset/password-reset.component';

import { AlertService, I18nService } from '@services/general';
import { LogoBienestarAnimalComponent } from "@components/icons";

/**
 * Component responsible for handling the change password functionality.
 * 
 * This component displays the UI for users to change their password.
 * It utilizes the `PasswordResetComponent` for the password reset form
 * and the `LogoBienestarAnimalComponent` for branding.
 * 
 * @author @aBlancoC
 */
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  imports: [PasswordResetComponent, LogoBienestarAnimalComponent]
})
export class ChangePassword {
 readonly i18nService = inject(I18nService);

  constructor(private alertService: AlertService) {}


}