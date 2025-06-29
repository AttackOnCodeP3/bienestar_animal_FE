import { Component } from '@angular/core';
import {I18nPagesEnum} from '@common/enums/i18n';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    TranslatePipe
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  get i18nPages(){
    return I18nPagesEnum;
  }
}
