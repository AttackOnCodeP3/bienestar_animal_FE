import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {Constants} from '@common/constants/constants';

@Component({
  selector: 'app-logo-bienestar-animal',
  imports: [
    NgClass
  ],
  templateUrl: './logo-bienestar-animal.component.html',
  styleUrl: './logo-bienestar-animal.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class LogoBienestarAnimalComponent {
  /**
   * List of CSS classes applied to the component.
   * By default, the following classes are applied:
   * - margin-top-3-125rem
   * - logo
   * - w-100
   * @author dgutierrez
   */
  listCssClasses = input('img-fluid')

  /**
   * Width of the logo.
   * By default, it is set to '100%'.
   * @author dgutierrez
   */
  width = input<string>('100%');

  /**
   * Height of the logo.
   * By default, it is set to 'auto'.
   * @author dgutierrez
   */
  height = input<string>('auto');
}
