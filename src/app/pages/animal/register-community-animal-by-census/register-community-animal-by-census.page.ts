import {
  Component, computed, effect, inject, signal
} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {User, Interest, Species, SanitaryControlType, District, Neighborhood, Canton} from '@models';
import {FormsService, AlertService, I18nService} from '@services/general';
import {
  CommunityAnimalHttpService,
  UserHttpService,
  InterestHttpService,
  RoleHttpService,
  NeighborhoodHttpService,
  RaceHttpService,
  SanitaryControlResponseHttpService,
  SexHttpService,
  SpeciesHttpService,
  VaccineHttpService,
  CantonHttpService, SanitaryControlTypeHttpService, DistrictHttpService,
} from '@services/http';
import {RegisterUserRequestDTO, CreateAnimalRequestDto} from '@models/dto';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslatePipe} from '@ngx-translate/core';
import {GeneralContainerComponent} from '@components/layout';
import {AlertTypeEnum} from '@common/enums';
import {PersonalDataUserRegistrationFormComponent} from '@components/forms/user/personal-data-user-registration-form/personal-data-user-registration-form.component';
import {LocationFormComponent} from '@components/forms/user/location-form/location-form.component';
import {InterestsFormComponent} from '@components/forms/user/interests-form/interests-form.component';
import {ItWorkedAsNurseryHomeFormComponent} from '@components/forms/user/it-worked-as-nursery-home-form/it-worked-as-nursery-home-form.component';
import {
  AnimalBasicInfoFormComponent,
  AnimalDewormingFormComponent,
  AnimalFleaControlFormComponent,
  AnimalNeuteringFormComponent,
  AnimalVaccinationFormComponent,
} from '@components/forms/animal';
import {CommunityAnimalRegistrationFormService, UserRegistrationFormService,} from '@services/forms';
import {IResponse} from '@common/interfaces/http';
import {MatChipsModule} from '@angular/material/chips';
import {SanitaryControlTypeEnum} from '@common/enums';
import { ViewChild, TemplateRef } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

/**
 * Page component responsible for registering community animals via census takers.
 * It handles user search, optional user registration, and animal data capture.
 * @author gjimenez
 */

@Component({
  selector: 'app-register-community-animal-by-census',
  standalone: true,
  templateUrl: './register-community-animal-by-census.page.html',
  styleUrl: './register-community-animal-by-census.page.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    GeneralContainerComponent,
    MatExpansionModule,
    PersonalDataUserRegistrationFormComponent,
    LocationFormComponent,
    InterestsFormComponent,
    ItWorkedAsNurseryHomeFormComponent,
    AnimalBasicInfoFormComponent,
    AnimalDewormingFormComponent,
    AnimalFleaControlFormComponent,
    AnimalNeuteringFormComponent,
    AnimalVaccinationFormComponent
  ],
})
export class RegisterCommunityAnimalByCensusPage {
  readonly userHttpService = inject(UserHttpService);
  readonly communityAnimalHttpService = inject(CommunityAnimalHttpService);
  readonly alertService = inject(AlertService);
  readonly formsService = inject(FormsService);
  readonly dialog = inject(MatDialog);
  readonly roleHttpService = inject(RoleHttpService);
  readonly i18nService = inject(I18nService);
  readonly interestHttpService = inject(InterestHttpService);
  readonly neighborhoodHttpService = inject(NeighborhoodHttpService);
  readonly cantonsList = signal<Canton[]>([]);
  readonly cantonHttpService = inject(CantonHttpService);
  readonly districtHttpService = inject(DistrictHttpService);
  readonly communityAnimalRegistrationFormService = inject(CommunityAnimalRegistrationFormService);
  readonly userRegistrationFormService = inject(UserRegistrationFormService);
  readonly speciesHttpService = inject(SpeciesHttpService);
  readonly raceHttpService = inject(RaceHttpService);
  readonly sexHttpService = inject(SexHttpService);
  readonly sanitaryControlTypeHttpService = inject(SanitaryControlTypeHttpService);
  readonly vaccineHttpService = inject(VaccineHttpService);
  readonly sanitaryControlResponseHttpService = inject(SanitaryControlResponseHttpService);

  readonly cedulaControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(9)],
  });

  readonly formCantidadAnimales = new FormControl(1, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(1)],
  });

  readonly formAnimalBasicInfo = this.communityAnimalRegistrationFormService.buildCreateAnimalProfileForm();
  readonly formAnimalVaccination = this.communityAnimalRegistrationFormService.buildVaccinationForm();
  readonly formDeworming = this.communityAnimalRegistrationFormService.buildSanitaryControlForm();
  readonly formFleaControl = this.communityAnimalRegistrationFormService.buildSanitaryControlForm();
  readonly formNeutering = this.communityAnimalRegistrationFormService.buildSanitaryControlForm({
    includeLastApplicationDate: false,
    includeProductUsed: false
  });

  readonly userFound = signal<User | null>(null);
  readonly userExists = computed(() => this.userFound() !== null);
  readonly wantsToRegisterNewUser = signal(false);
  readonly showAnimalForm = signal(false);

  readonly districtsList = signal<District[]>([]);
  readonly neighborhoodsList = signal<Neighborhood[]>([]);

  @ViewChild('dialogConfirmarRegistroUsuario') dialogConfirmarRegistroUsuarioRef!: TemplateRef<any>;

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.interestHttpService.getAll();
    this.roleHttpService.getAll();
    this.sexHttpService.getAll();
    this.speciesHttpService.getAll();
    this.vaccineHttpService.getAll();
    this.sanitaryControlResponseHttpService.getAll();
    this.neighborhoodHttpService.getAll();
    this.communityAnimalRegistrationFormService.assignSanitaryControlType(this.formDeworming, { id: SanitaryControlTypeEnum.DEWORMING } as SanitaryControlType);
    this.communityAnimalRegistrationFormService.assignSanitaryControlType(
      this.formFleaControl,
      { id: SanitaryControlTypeEnum.FLEA_AND_TICK_CONTROL } as SanitaryControlType
    );
    this.communityAnimalRegistrationFormService.assignSanitaryControlType(this.formNeutering, { id: SanitaryControlTypeEnum.NEUTERING } as SanitaryControlType);
    this.sanitaryControlTypeHttpService.getAll();
    this.userRegistrationFormService.resetForms();
    this.userRegistrationFormService.formUserRegistration.get('password')?.disable();
    this.userRegistrationFormService.formUserRegistration.get('confirmPassword')?.disable();
    this.userRegistrationFormService.formUserRegistration.get('volunteerMunicipality')?.disable();
    this.userRegistrationFormService.formUserRoleSelector.disable();
    this.communityAnimalRegistrationFormService.applySanitaryControlValidations(this.formDeworming);
    this.communityAnimalRegistrationFormService.applySanitaryControlValidations(this.formFleaControl);
    this.cantonHttpService.getAll(); // Esto carga los cantones automáticamente en la señal
    this.cantonsList.set(this.cantonHttpService.cantonList());  // Asigna la lista de cantones
    this.cantonHttpService.getAll();
    this.cantonsList.set(this.cantonHttpService.cantonList());
    this.districtHttpService.getAll();
    this.districtsList.set(this.districtHttpService.districtList());
    this.neighborhoodHttpService.getAll();
    this.neighborhoodsList.set(this.neighborhoodHttpService.neighborhoodList());
    console.log(this.cantonsList());
    effect(() => {
      const checked = this.userRegistrationFormService.isNurseryHome();
      const control = this.userRegistrationFormService.formUserRegistration.get('isNurseryHome');
      if (control && control.value !== checked) {
        control.setValue(checked);
      }
    });

  }

  onSelectCanton(canton: Canton) {
    this.userRegistrationFormService.formUserRegistration.get('canton')?.setValue(canton);

    const filteredDistricts = this.districtHttpService.districtList().filter(
      district => district.canton?.id === canton.id
    );
    this.districtsList.set(filteredDistricts);

    this.userRegistrationFormService.formUserRegistration.get('district')?.reset();
    this.userRegistrationFormService.formUserRegistration.get('neighborhood')?.reset();
    this.neighborhoodsList.set([]);
  }

  onSelectDistrict(district: District) {
    this.userRegistrationFormService.formUserRegistration.get('district')?.setValue(district);

    const filteredNeighborhoods = this.neighborhoodHttpService.neighborhoodList().filter(
      (neighborhood) => neighborhood.district?.id === district.id
    );
    this.neighborhoodsList.set(filteredNeighborhoods);

    this.userRegistrationFormService.formUserRegistration.get('neighborhood')?.reset();
  }

  get selectedInterests() {
    return this.userRegistrationFormService.formUserRegistration.controls.interests.value ?? [];
  }



  set selectedInterests(interests: Interest[]) {
    this.userRegistrationFormService.setInterests(
      this.userRegistrationFormService.formUserRegistration,
      interests
    );
  }

  onSearchByCedula() {
    const cedula = this.cedulaControl.value;
    if (!cedula || this.cedulaControl.invalid) {
      this.alertService.displayAlert({
        messageKey: 'Ingrese una cédula válida',
        type: AlertTypeEnum.ERROR,
      });
      return;
    }

    this.userHttpService.getByIdentificationCard(cedula).subscribe({
      next: (res: IResponse<User>) => {
        const user = res.data;
        if (user) {
          this.userFound.set(user);
          this.wantsToRegisterNewUser.set(false);
          this.alertService.displayAlert({
            type: AlertTypeEnum.SUCCESS,
            messageKey: 'Propietario encontrado. Continúe con el registro del animal.'
          });
        } else {
          this.userFound.set(null);
          this.dialog.open(this.dialogConfirmarRegistroUsuarioRef).afterClosed().subscribe(result => {
            this.wantsToRegisterNewUser.set(!!result);
          });
        }
      },
      error: () => {
        this.userFound.set(null);
        this.dialog.open(this.dialogConfirmarRegistroUsuarioRef).afterClosed().subscribe(result => {
          this.wantsToRegisterNewUser.set(!!result);
        });
      }
    });
  }

  onRegisterUser() {
    const validation = this.userRegistrationFormService.validateUserRegistrationForms();
    if (validation) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: validation.errorMessageKey
      });
      return;
    }

    const form = this.userRegistrationFormService.formUserRegistration.getRawValue();
    const user = {
      name: form.name,
      lastname: form.lastname,
      email: form.email,
      password: '',
      phoneNumber: form.phoneNumber,
      identificationCard: form.identificationCard,
      birthDate: form.birthDate,
      neighborhood: form.neighborhood ?? null,
      interests: form.interests ?? [],
      roles: [],
    };

    const payload = RegisterUserRequestDTO.fromUser(user, false);
    payload.registeredByCensusTaker = true;

    this.userHttpService.adminRegisterUser(payload).subscribe({
      next: () => {
        this.userHttpService.getByIdentificationCard(user.identificationCard!).subscribe({
          next: (res) => {
            const fullUser = res.data;

            if (fullUser) {
              this.userFound.set(fullUser);
              this.wantsToRegisterNewUser.set(false);

              this.userRegistrationFormService.populateUserRegistrationForm(fullUser);
              this.userRegistrationFormService.populateUserRolesForm(fullUser);
              this.userRegistrationFormService.setNurseryHomeValue(
                this.userRegistrationFormService.formUserRegistration,
                fullUser.nurseryHome ?? false
              );

              this.alertService.displayAlert({
                type: AlertTypeEnum.SUCCESS,
                messageKey: 'Usuario registrado exitosamente.'
              });
            }
          },
          error: () => {
            this.alertService.displayAlert({
              type: AlertTypeEnum.ERROR,
              messageKey: 'Error al recuperar el usuario desde el servidor.'
            });
          }
        });
      },
      error: () => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.ERROR,
          messageKey: 'No se pudo registrar el usuario'
        });
      }
    });
  }

  onMostrarFormularioAnimales() {
    if (!this.formCantidadAnimales.valid || this.formCantidadAnimales.value < 1) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: 'Debe registrar al menos 1 animal'
      });
      return;
    }

    this.showAnimalForm.set(true);
  }

  onSpeciesSelectionChange(species: Species) {
    this.vaccineHttpService.getBySpecies(species.id!);
    this.raceHttpService.getBySpeciesId(species.id!);
  }

  getSanitaryControlTypeById(id: number, list: SanitaryControlType[]): SanitaryControlType | undefined {
    return list.find(type => type.id === id);
  }

  onSubmitAnimalForms() {
    const ownerCedula = this.userFound()?.identificationCard;
    if (!ownerCedula) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: 'No se encontró la cédula del propietario'
      });
      return;
    }

    if (
      this.formAnimalBasicInfo.invalid ||
      this.formAnimalVaccination.invalid ||
      this.formDeworming.invalid ||
      this.formFleaControl.invalid ||
      this.formNeutering.invalid
    ) {
      this.formsService.markFormTouchedAndDirty(this.formAnimalBasicInfo);
      this.formsService.markFormTouchedAndDirty(this.formAnimalVaccination);
      this.formsService.markFormTouchedAndDirty(this.formDeworming);
      this.formsService.markFormTouchedAndDirty(this.formFleaControl);
      this.formsService.markFormTouchedAndDirty(this.formNeutering);
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: 'Por favor complete todos los campos requeridos del animal'
      });
      return;
    }

    const { name, sex, species, birthDate, weight, race } = this.formAnimalBasicInfo.getRawValue();

    const sanitaryControlDeworming = this.communityAnimalRegistrationFormService.buildSanitaryControlDto(
      this.formDeworming
    );

    const sanitaryControlFleaAndTick = this.communityAnimalRegistrationFormService.buildSanitaryControlDto(
      this.formFleaControl
    );

    const sanitaryControlNeutering = this.communityAnimalRegistrationFormService.buildSanitaryControlDto(
      this.formNeutering
    );

    const vaccineApplicationsDto = this.communityAnimalRegistrationFormService.buildVaccineAppliedDto([]);

    const animal = new CreateAnimalRequestDto({
      birthDate,
      name,
      raceId: race?.id,
      sanitaryControls: [sanitaryControlDeworming, sanitaryControlFleaAndTick, sanitaryControlNeutering],
      sexId: sex?.id,
      speciesId: species?.id,
      vaccineApplications: vaccineApplicationsDto,
      weight,
      ownerIdentificationCard: ownerCedula
    });

    this.communityAnimalHttpService.registerCommunityAnimal(animal, () => {
      this.alertService.displayAlert({
        type: AlertTypeEnum.SUCCESS,
        messageKey: 'Animal registrado exitosamente'
      });
      this.resetAll();
    });
  }

  resetAll() {
    this.userFound.set(null);
    this.wantsToRegisterNewUser.set(false);
    this.showAnimalForm.set(false);
    this.cedulaControl.reset();
    this.formCantidadAnimales.reset();
    this.userRegistrationFormService.resetForms();
    this.formAnimalBasicInfo.reset();
    this.formAnimalVaccination.reset();
    this.formDeworming.reset();
    this.formFleaControl.reset();
    this.formNeutering.reset();
  }
}

