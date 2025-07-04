import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Constants} from '@common/constants/constants';

@Component({
  selector: 'app-complete-profile',
  imports: [],
  templateUrl: './complete-profile.page.html',
  styleUrl: './complete-profile.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class CompleteProfilePage {

}
