import {Component} from '@angular/core';
import {Constants} from '@common/constants/constants';

@Component({
  selector: 'app-modal-loading',
  imports: [],
  templateUrl: './modal-loading.component.html',
  styleUrl: './modal-loading.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ModalLoadingComponent {

}
