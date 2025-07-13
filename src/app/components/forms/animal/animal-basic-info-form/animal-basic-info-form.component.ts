import {Component} from '@angular/core';
import {Constants} from '@common/constants/constants';

/**
 * Component for the animal basic info form.
 * This component provides the basic information form for animals, like name, species, race, age, sex, and weight.
 * @author dgutierrez
 */
@Component({
  selector: 'app-animal-basic-info-form',
  imports: [],
  templateUrl: './animal-basic-info-form.component.html',
  styleUrl: './animal-basic-info-form.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class AnimalBasicInfoFormComponent {

}
