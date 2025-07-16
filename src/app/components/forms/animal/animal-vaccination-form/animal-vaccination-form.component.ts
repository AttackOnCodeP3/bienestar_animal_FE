import {Component, input} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {Vaccine} from '@models';
import {JsonPipe} from '@angular/common';

/**
 * Component for the animal vaccination form.
 * This component provides a form for managing animal vaccinations.
 * @author dgutierrez
 */
@Component({
  selector: 'app-animal-vaccination-form',
  imports: [
    JsonPipe
  ],
  templateUrl: './animal-vaccination-form.component.html',
  styleUrl: './animal-vaccination-form.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class AnimalVaccinationFormComponent {
  readonly vaccineList = input.required<Vaccine[]>()
}
