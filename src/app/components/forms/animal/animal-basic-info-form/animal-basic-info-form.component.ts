import {Component, input} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {Constants} from '@common/constants/constants';
import {FormsService, I18nService} from '@services/general';
import {RaceHttpService, SpeciesHttpService} from '@services/http';

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
    TranslatePipe,
    MatOption,
    MatSelect
  ],
  templateUrl: './animal-basic-info-form.component.html',
  styleUrl: './animal-basic-info-form.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class AnimalBasicInfoFormComponent {
    readonly form = input.required<FormGroup>();
    readonly formsService = input.required<FormsService>();
    readonly i18nService = input.required<I18nService>();
    readonly speciesHttpService = input.required<SpeciesHttpService>()
    readonly raceHttpService = input.required<RaceHttpService>();
}
