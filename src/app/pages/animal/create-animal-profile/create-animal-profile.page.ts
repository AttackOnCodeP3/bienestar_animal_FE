import {Component, inject, OnInit, signal} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {MatExpansionModule} from '@angular/material/expansion';
import {AnimalBasicInfoFormComponent, AnimalVaccinationFormComponent} from '@components/forms/animal';
import {RaceHttpService, SpeciesHttpService, SexHttpService, VaccineHttpService} from '@services/http';
import {Race, Sex, Species} from '@models';
import {FormGroup, Validators} from '@angular/forms';
import {fade} from '@animations/fade';
import {IVaccineApplied} from '@common/interfaces';
import {AlertService, FormsService, I18nService} from '@services/general';
import {MatButton} from '@angular/material/button';

/**
 * Page for creating an animal profile.
 * @author dgutierrez
 */
@Component({
  selector: 'app-create-animal-profile',
  imports: [
    AnimalBasicInfoFormComponent,
    MatExpansionModule,
    AnimalVaccinationFormComponent,
    MatButton
  ],
  templateUrl: './create-animal-profile.page.html',
  styleUrl: './create-animal-profile.page.scss',
  animations: [fade],
  changeDetection: Constants.changeDetectionStrategy
})
export class CreateAnimalProfilePage implements OnInit {

  readonly alertService = inject(AlertService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly raceHttpService = inject(RaceHttpService);
  readonly sexHttpService = inject(SexHttpService);
  readonly speciesHttpService = inject(SpeciesHttpService);
  readonly vaccineHttpService = inject(VaccineHttpService);

  readonly formAnimalBasicInfo = this.buildCreateAnimalProfileForm();
  readonly formAnimalVaccination = this.buildVaccinationForm();

  readonly vaccinesAppliedDates = signal<IVaccineApplied[]>([]);

  ngOnInit() {
    this.sexHttpService.getAll();
    this.speciesHttpService.getAll();
  }

  onSubmit() {
    if (this.formAnimalBasicInfo.invalid || this.formAnimalVaccination.invalid) {
      this.formsService.markFormTouchedAndDirty(this.formAnimalBasicInfo);
      this.formsService.markFormTouchedAndDirty(this.formAnimalVaccination);
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      })
      return;
    }
  }

  /**
   * Handles the change in species selection.
   * This method updates the vaccine list and race list based on the selected species.
   * @param species The selected species.
   * @author dgutierrez
   */
  onSpeciesSelectionChange(species: Species) {
    this.vaccineHttpService.getBySpecies(species.id!);
    this.raceHttpService.getBySpeciesId(species.id!)
  }

  /**
   * Builds the form for creating an animal profile.
   * @author dgutierrez
   */
  private buildCreateAnimalProfileForm() {
    return this.formsService.formsBuilder.group({
      name: this.formsService.formsBuilder.control('', {
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

  /**
   * Builds the vaccination form for the animal profile.
   * @author dgutierrez
   */
  private buildVaccinationForm() {
    return this.formsService.formsBuilder.group({
      selectedVaccines: this.formsService.formsBuilder.control<number[]>([], {nonNullable: true}),
      vaccinesDates: this.formsService.formsBuilder.array<FormGroup>([])
    });
  }

  /**
   * Handles the change in vaccine application dates.
   * @param vaccinesApplied An array of applied vaccines with their dates.
   * @author dgutierrez
   */
  onSyncVaccinesDatesChange(vaccinesApplied: IVaccineApplied[]) {
    this.vaccinesAppliedDates.set(vaccinesApplied);
    console.warn(vaccinesApplied);
  }
}
