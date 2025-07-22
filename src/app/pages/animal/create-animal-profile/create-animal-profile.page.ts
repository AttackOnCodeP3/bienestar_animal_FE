import {Component, computed, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButton} from '@angular/material/button';
import {Subscription} from 'rxjs';
import {
  AnimalBasicInfoFormComponent,
  AnimalDewormingFormComponent,
  AnimalFleaControlFormComponent,
  AnimalNeuteringFormComponent,
  AnimalVaccinationFormComponent,
} from '@components/forms/animal';
import {
  CommunityAnimalHttpService,
  RaceHttpService,
  SanitaryControlResponseHttpService,
  SanitaryControlTypeHttpService,
  SexHttpService,
  SpeciesHttpService,
  VaccineHttpService,
} from '@services/http';
import {SanitaryControlType, Species} from '@models';
import {fade} from '@animations/fade';
import {IVaccineApplied} from '@common/interfaces';
import {AlertService, FormsService, I18nService} from '@services/general';
import {SanitaryControlTypeEnum} from '@common/enums';
import {CommunityAnimalRegistrationFormService} from '@services/forms';
import {CreateAnimalRequestDto} from '@models/dto';
import {LocationService} from '../../../services/location-service/location.service';
import {GeneralContainerComponent} from '@components/layout';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Page for creating an animal profile.
 * @author dgutierrez
 */
@Component({
  selector: 'app-create-animal-profile',
  imports: [
    AnimalBasicInfoFormComponent,
    AnimalDewormingFormComponent,
    AnimalFleaControlFormComponent,
    AnimalNeuteringFormComponent,
    AnimalVaccinationFormComponent,
    MatButton,
    MatExpansionModule,
    GeneralContainerComponent,
    TranslatePipe,
  ],
  templateUrl: './create-animal-profile.page.html',
  styleUrl: './create-animal-profile.page.scss',
  animations: [fade],
  changeDetection: Constants.changeDetectionStrategy
})
export class CreateAnimalProfilePage implements OnInit, OnDestroy {

  readonly alertService = inject(AlertService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly raceHttpService = inject(RaceHttpService);
  readonly sanitaryControlResponseHttpService = inject(SanitaryControlResponseHttpService)
  readonly sanitaryControlTypeHttpService = inject(SanitaryControlTypeHttpService)
  readonly sexHttpService = inject(SexHttpService);
  readonly speciesHttpService = inject(SpeciesHttpService);
  readonly vaccineHttpService = inject(VaccineHttpService);
  readonly communityAnimalHttpService = inject(CommunityAnimalHttpService);
  readonly communityAnimalRegistrationFormService = inject(CommunityAnimalRegistrationFormService);
  readonly locationService = inject(LocationService);

  readonly sanitaryControlTypeList = this.sanitaryControlTypeHttpService.sanitaryControlTypeList;
  private readonly dewormingControlType = computed(() =>
    this.getSanitaryControlTypeById(SanitaryControlTypeEnum.DEWORMING, this.sanitaryControlTypeList())
  );
  private readonly fleaAndTickControlType = computed(() =>
    this.getSanitaryControlTypeById(SanitaryControlTypeEnum.FLEA_AND_TICK_CONTROL, this.sanitaryControlTypeList())
  );
  private readonly neuteringControlType = computed(() =>
    this.getSanitaryControlTypeById(SanitaryControlTypeEnum.NEUTERING, this.sanitaryControlTypeList())
  );

  readonly formAnimalBasicInfo = this.communityAnimalRegistrationFormService.buildCreateAnimalProfileForm();
  readonly formAnimalVaccination = this.communityAnimalRegistrationFormService.buildVaccinationForm();
  readonly formDeworming = this.communityAnimalRegistrationFormService.buildSanitaryControlForm();
  readonly formFleaAndTickControl = this.communityAnimalRegistrationFormService.buildSanitaryControlForm();
  readonly formNeutering = this.communityAnimalRegistrationFormService.buildSanitaryControlForm();

  /**
   * Effect to assign sanitary control types to the respective forms.
   * This effect runs whenever the sanitary control types are updated.
   * @author dgutierrez
   */
  readonly assignSanitaryControlTypesToFormsEffect = effect(() => {
    const dewormingType = this.dewormingControlType();
    const fleaAndTickType = this.fleaAndTickControlType();
    const neuteringType = this.neuteringControlType();

    if (dewormingType) {
      this.communityAnimalRegistrationFormService.assignSanitaryControlType(this.formDeworming, dewormingType);
    }
    if (fleaAndTickType) {
      this.communityAnimalRegistrationFormService.assignSanitaryControlType(this.formFleaAndTickControl, fleaAndTickType);
    }
    if (neuteringType) {
      this.communityAnimalRegistrationFormService.assignSanitaryControlType(this.formNeutering, neuteringType);
    }
  });

  readonly vaccinesAppliedDates = signal<IVaccineApplied[]>([]);

  private subscriptions: Subscription[] = [];

  constructor() {
    this.formDeworming = this.communityAnimalRegistrationFormService.buildSanitaryControlForm();
  }

  async ngOnInit() {
    this.sanitaryControlResponseHttpService.getAll();
    this.sanitaryControlTypeHttpService.getAll();
    this.sexHttpService.getAll();
    this.speciesHttpService.getAll();

    this.subscriptions.push(this.communityAnimalRegistrationFormService.applySanitaryControlValidations(this.formDeworming));
    this.subscriptions.push(this.communityAnimalRegistrationFormService.applySanitaryControlValidations(this.formFleaAndTickControl));
    this.subscriptions.push(this.communityAnimalRegistrationFormService.applySanitaryControlValidations(this.formNeutering));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onSubmit() {
    if (
      this.formAnimalBasicInfo.invalid ||
      this.formAnimalVaccination.invalid ||
      this.formDeworming.invalid ||
      this.formFleaAndTickControl.invalid ||
      this.formNeutering.invalid
    ) {
      this.formsService.markFormTouchedAndDirty(this.formAnimalBasicInfo);
      this.formsService.markFormTouchedAndDirty(this.formAnimalVaccination);
      this.formsService.markFormTouchedAndDirty(this.formDeworming);
      this.formsService.markFormTouchedAndDirty(this.formFleaAndTickControl);
      this.formsService.markFormTouchedAndDirty(this.formNeutering);
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      })
      return;
    }
    this.registerAnimalProfile();
  }

  /**
   * Completes the animal profile registration by sending the form data to the server.
   * @author dgutierrez
   */
  private async registerAnimalProfile() {
    const vaccineApplicationsDto = this.communityAnimalRegistrationFormService.buildVaccineAppliedDto(this.vaccinesAppliedDates());

    const {name, sex, species, birthDate, weight, race} = this.formAnimalBasicInfo.getRawValue();

    const sanitaryControlDeworming = this.communityAnimalRegistrationFormService.buildSanitaryControlDto(
      this.formDeworming,
    );
    const sanitaryControlFleaAndTick = this.communityAnimalRegistrationFormService.buildSanitaryControlDto(
      this.formFleaAndTickControl,
    );
    const sanitaryControlNeutering = this.communityAnimalRegistrationFormService.buildSanitaryControlDto(
      this.formNeutering,
    );

    const {success, coordinates} = await this.locationService.getUserLocation();

    if (!success) {
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_LOCATION_NOT_AVAILABLE
      });
    }

    const createAnimalRequestDto = new CreateAnimalRequestDto({
      birthDate,
      name,
      raceId: race?.id,
      sanitaryControls: [sanitaryControlDeworming, sanitaryControlFleaAndTick, sanitaryControlNeutering],
      sexId: sex?.id,
      speciesId: species?.id,
      latitude: coordinates?.latitude,
      longitude: coordinates?.longitude,
      vaccineApplications: vaccineApplicationsDto,
      weight,
    });
    this.communityAnimalHttpService.registerCommunityAnimal(createAnimalRequestDto, this.resetForms.bind(this));
  }

  /**
   * Resets all forms to their initial state.
   * @author dgutierrez
   */
  private resetForms() {
    this.formAnimalBasicInfo.reset();
    this.formAnimalVaccination.reset();
    this.formDeworming.reset();
    this.formFleaAndTickControl.reset();
    this.formNeutering.reset();
    this.vaccinesAppliedDates.set([]);
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
   * Gets the sanitary control response by its ID in the list of the sanitary control response service.
   * @param id The ID of the sanitary control response.
   * @param sanitaryControlTypeList The list of sanitary control types.
   * @author dgutierrez
   */
  private getSanitaryControlTypeById(id: number, sanitaryControlTypeList: SanitaryControlType[]): SanitaryControlType | undefined {
    return sanitaryControlTypeList.find(type => type.id === id);
  }

  /**
   * Handles the change in vaccine application dates.
   * @param vaccinesApplied An array of applied vaccines with their dates.
   * @author dgutierrez
   */
  onSyncVaccinesDatesChange(vaccinesApplied: IVaccineApplied[]) {
    this.vaccinesAppliedDates.set(vaccinesApplied);
  }
}
