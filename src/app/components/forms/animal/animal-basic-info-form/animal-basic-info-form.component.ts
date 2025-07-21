import {Component, input, output} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {Constants} from '@common/constants/constants';
import {FormsService, I18nService} from '@services/general';
import {Race, Sex, Species} from '@models';
import {fade} from '@animations/fade';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';

/**
 * Component for the animal basic info form.
 * This component provides the basic information form for animals, like name, species, race, age, sex, and weight.
 * @author dgutierrez
 */
@Component({
  selector: 'app-animal-basic-info-form',
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepickerModule
  ],
  templateUrl: './animal-basic-info-form.component.html',
  styleUrl: './animal-basic-info-form.component.scss',
  animations: [fade],
  providers: [provideNativeDateAdapter()],
  changeDetection: Constants.changeDetectionStrategy
})
export class AnimalBasicInfoFormComponent {
  readonly form = input.required<FormGroup>();
  readonly formsService = input.required<FormsService>();
  readonly i18nService = input.required<I18nService>();

  readonly speciesList = input.required<Species[]>()
  readonly sexList = input.required<Sex[]>();
  readonly raceListBySpecies = input.required<Race[]>();

  readonly speciesSelectionChange = output<Species>();


  /**
   * Handles the change in species selection.
   * This method updates the race list based on the selected species.
   * @param matSelectionChange The selected species.
   * @author dgutierrez
   */
  onSpeciesChange(matSelectionChange: MatSelectChange<Species>): void {
    const {value} = matSelectionChange;
    this.speciesSelectionChange.emit(value);
  }
}
