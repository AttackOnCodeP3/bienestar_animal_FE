import {Component, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {AnimalBasicInfoFormComponent, AnimalVaccinationFormComponent} from '@components/forms/animal';
import {MatExpansionModule} from '@angular/material/expansion';
import {RaceHttpService, SpeciesHttpService, SexHttpService, VaccineHttpService} from '@services/http';
import {FormsService, I18nService} from '@services/general';
import {Race, Sex, Species} from '@models';
import {Validators} from '@angular/forms';
import {fade} from '@animations/fade';

/**
 * Page for creating an animal profile.
 * @author dgutierrez
 */
@Component({
  selector: 'app-create-animal-profile',
  imports: [
    AnimalBasicInfoFormComponent,
    MatExpansionModule,
    AnimalVaccinationFormComponent
  ],
  templateUrl: './create-animal-profile.page.html',
  styleUrl: './create-animal-profile.page.scss',
  animations: [fade],
  changeDetection: Constants.changeDetectionStrategy
})
export class CreateAnimalProfilePage implements OnInit {

  readonly sexHttpService = inject(SexHttpService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly raceHttpService = inject(RaceHttpService);
  readonly speciesHttpService = inject(SpeciesHttpService);
  readonly vaccineHttpService = inject(VaccineHttpService);

  readonly form = this.buildCreateAnimalProfileForm();

  ngOnInit() {
    this.sexHttpService.getAll();
    this.speciesHttpService.getAll();
  }

  onSpeciesSelectionChange(species: Species) {
    this.vaccineHttpService.getBySpecies(species.id!);
    this.raceHttpService.getBySpeciesId(species.id!)
  }

  private buildCreateAnimalProfileForm() {
    return this.formsService.formsBuilder.group({
      name: this.formsService.formsBuilder.control('',  {
        nonNullable: true,
        validators: [Validators.required],
      }),
      species: this.formsService.formsBuilder.control<Species | null>(null, {
        validators: [Validators.required],
      }),
      race: this.formsService.formsBuilder.control<Race | null>(null, {
        validators: [Validators.required],
      }),
      birthDate: this.formsService.formsBuilder.control<Date>(new Date(), {
        nonNullable: true,
        validators: [Validators.required],
      }),
      sex: this.formsService.formsBuilder.control<Sex | null>(null, {
        validators: [Validators.required],
      }),
      weight: this.formsService.formsBuilder.control<number>(0, {
        validators: [Validators.required],
        nonNullable: true
      })
    });
  }
}
