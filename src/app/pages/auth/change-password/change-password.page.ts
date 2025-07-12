import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PasswordResetComponent } from '@components/forms/user/password-reset/password-reset.component';
@Component({
  selector: 'app-change-password',
  imports: [PasswordResetComponent],
  templateUrl: './change-password.page.html',
  styleUrl: './change-password.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePassword {

}
