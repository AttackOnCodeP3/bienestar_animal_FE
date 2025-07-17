import {Component, computed, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  AnimalBasicInfoFormComponent,
  AnimalVaccinationFormComponent,
  AnimalDewormingFormComponent
} from '@components/forms/animal';
import {
  RaceHttpService,
  SpeciesHttpService,
  SexHttpService,
  VaccineHttpService,
  SanitaryControlResponseHttpService, SanitaryControlTypeHttpService
} from '@services/http';
import {Race, SanitaryControlResponse, SanitaryControlType, Sex, Species} from '@models';
import {FormGroup, Validators} from '@angular/forms';
import {fade} from '@animations/fade';
import {IVaccineApplied} from '@common/interfaces';
import {AlertService, FormsService, I18nService} from '@services/general';
import {MatButton} from '@angular/material/button';
import {SanitaryControlResponseEnum, SanitaryControlTypeEnum} from '@common/enums';
import {Subscription} from 'rxjs';
import {ISanitaryControlForm} from '@common/interfaces/forms';

/**
 * Page for creating an animal profile.
 * @author dgutierrez
 */
@Component({
  selector: 'app-create-animal-profile',
  imports: [
    AnimalBasicInfoFormComponent,
    AnimalDewormingFormComponent,
    AnimalVaccinationFormComponent,
    MatButton,
    MatExpansionModule,
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

  readonly formAnimalBasicInfo = this.buildCreateAnimalProfileForm();
  readonly formAnimalVaccination = this.buildVaccinationForm();
  readonly formDeworming: FormGroup<ISanitaryControlForm>;
  readonly formFleaAndTickControl = this.buildSanitaryControlForm();
  readonly formNeutering = this.buildSanitaryControlForm();

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
      this.updateSanitaryControlType(this.formDeworming, dewormingType);
    }
    if (fleaAndTickType) {
      this.updateSanitaryControlType(this.formFleaAndTickControl, fleaAndTickType);
    }
    if (neuteringType) {
      this.updateSanitaryControlType(this.formNeutering, neuteringType);
    }
  });

  readonly vaccinesAppliedDates = signal<IVaccineApplied[]>([]);

  private subscriptions: Subscription[] = [];

  constructor() {
    this.formDeworming = this.buildSanitaryControlForm();
  }

  ngOnInit() {
    this.sanitaryControlResponseHttpService.getAll();
    this.sanitaryControlTypeHttpService.getAll();
    this.sexHttpService.getAll();
    this.speciesHttpService.getAll();

    this.subscriptions.push(this.applySanitaryControlValidations(this.formDeworming));
    this.subscriptions.push(this.applySanitaryControlValidations(this.formFleaAndTickControl));
    this.subscriptions.push(this.applySanitaryControlValidations(this.formNeutering));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onSubmit() {
    if (this.formAnimalBasicInfo.invalid || this.formAnimalVaccination.invalid || this.formDeworming.invalid){
      this.formsService.markFormTouchedAndDirty(this.formAnimalBasicInfo);
      this.formsService.markFormTouchedAndDirty(this.formAnimalVaccination);
      this.formsService.markFormTouchedAndDirty(this.formDeworming);
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
   * @author dgutierrez
   */
  private buildSanitaryControlForm(
  ) {
    return this.formsService.formsBuilder.group({
      productUsed: this.formsService.formsBuilder.control<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      lastApplicationDate: this.formsService.formsBuilder.control<Date>(new Date(), {
        nonNullable: true,
        validators: [Validators.required]
      }),
      sanitaryControlResponse: this.formsService.formsBuilder.control<SanitaryControlResponse | null>(null, {
        validators: [Validators.required]
      }),
    });
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
    console.warn(vaccinesApplied);
  }

  /**
   * Applies validations to the sanitary control form based on the selected response.
   * @param form The form group containing the sanitary control response.
   * @author dgutierrez
   */
  private applySanitaryControlValidations(form: FormGroup): Subscription {
    const control = form.get('sanitaryControlResponse');
    if (!control) return new Subscription();

    return control.valueChanges.subscribe((value: SanitaryControlResponse) => {
      const isDisabled = value?.id === SanitaryControlResponseEnum.NO || value?.id === SanitaryControlResponseEnum.UNKNOWN;
      const productUsed = form.get('productUsed');
      const lastApplicationDate = form.get('lastApplicationDate');

      if (productUsed) {
        productUsed.setValidators(isDisabled ? [] : [Validators.required]);
        productUsed.updateValueAndValidity();
      }

      if (lastApplicationDate) {
        lastApplicationDate.setValidators(isDisabled ? [] : [Validators.required]);
        lastApplicationDate.updateValueAndValidity();
      }
    });
  }

  /**
   * Updates the sanitary control type in the form.
   * @param form The form group to update.
   * @param type The sanitary control type to set.
   * @author dgutierrez
   */
  updateSanitaryControlType(form: FormGroup, type: SanitaryControlType) {
    if (!form.contains('sanitaryControlType')) {
      form.addControl(
        'sanitaryControlType',
        this.formsService.formsBuilder.control(type, {
          validators: [Validators.required]
        })
      );
    } else {
      form.get('sanitaryControlType')?.setValue(type);
    }
  }
}
