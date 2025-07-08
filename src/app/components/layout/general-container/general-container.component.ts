import {Component, input} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-general-container-component',
  imports: [
    NgClass
  ],
  templateUrl: './general-container.component.html',
  styleUrl: './general-container.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class GeneralContainerComponent {
    readonly classList = input<string[]>([[]]);
}
