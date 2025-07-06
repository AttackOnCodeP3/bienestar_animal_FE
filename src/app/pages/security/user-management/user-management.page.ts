import {Component} from '@angular/core';
import {Constants} from '@common/constants/constants';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.page.html',
  styleUrl: './user-management.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class UserManagementPage {
}
