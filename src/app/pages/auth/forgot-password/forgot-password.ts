import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Constants} from '@common/constants/constants';

@Component({
  selector: 'app-forgot-password',
  imports: [],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ForgotPassword {

}
