import { Component, inject } from '@angular/core';
import { PasswordResetComponent } from '@components/forms/user/password-reset/password-reset.component';
import { TranslatePipe } from '@ngx-translate/core';
import { AlertService, I18nService } from '@services/general';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  imports: [TranslatePipe, PasswordResetComponent]
})
export class ChangePassword {
 readonly i18nService = inject(I18nService);

  constructor(private alertService: AlertService) {}


}