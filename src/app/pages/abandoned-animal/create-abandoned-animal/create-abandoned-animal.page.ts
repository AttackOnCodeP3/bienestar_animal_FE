import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {
  CantonHttpService,
  DistrictHttpService,
  NeighborhoodHttpService,
  SpeciesHttpService,
  SexHttpService,
  AbandonedAnimalHttpService,
  AuthHttpService
} from '@services/http';
import {AlertService, FormsService, I18nService, LocationService} from '@services/general';
import {GeneralContainerComponent} from '@components/layout';
import {CreateAbandonedAnimalRequestDTO} from '@models/dto';
import {LocationFormComponent} from '@components/forms/user';
import {ChangeDetectorRef} from '@angular/core';
import {EstimatedAgeEnum, PhysicalConditionEnum, BehaviorEnum} from '@common/enums';

@Component({
  selector: 'app-create-abandoned-animal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    GeneralContainerComponent,
    LocationFormComponent
  ],
  templateUrl: './create-abandoned-animal.page.html',
  styleUrls: ['./create-abandoned-animal.page.scss']
})

/**
 * Page for registering an abandoned animal.
 * Allows census users to report an animal’s location and condition, with an optional image.
 * @author gjimenez
 */

export class CreateAbandonedAnimalPage implements OnInit {

  private readonly fb = inject(FormBuilder);
  readonly i18nService = inject(I18nService);
  readonly alertService = inject(AlertService);

  readonly speciesHttp = inject(SpeciesHttpService);
  readonly sexHttp = inject(SexHttpService);
  readonly cantonHttp = inject(CantonHttpService);
  readonly districtHttp = inject(DistrictHttpService);
  readonly neighborhoodHttp = inject(NeighborhoodHttpService);
  readonly abandonedAnimalHttp = inject(AbandonedAnimalHttpService);
  readonly locationService = inject(LocationService);
  readonly cantonHttpService = inject(CantonHttpService);
  readonly districtHttpService = inject(DistrictHttpService);
  readonly formsService = inject(FormsService);
  readonly authService = inject(AuthHttpService);
  readonly cdRef = inject(ChangeDetectorRef);
  readonly estimatedAgeList = signal<string[]>(Object.values(EstimatedAgeEnum));
  readonly physicalConditionList = signal<string[]>(Object.values(PhysicalConditionEnum));
  readonly behaviorList = signal<string[]>(Object.values(BehaviorEnum));


  readonly form = this.buildForm();
  imagePreview: string | null = null;

  /**
   * Initializes the page by loading species, sexes, and user geolocation.
   * Also preselects the user's canton if available.
   * @author gjimenez
   */
  ngOnInit(): void {
    this.speciesHttp.getAll();
    this.sexHttp.getAll();
    this.cantonHttp.getAll();

    this.locationService.getUserLocation().then(result => {
      if (result.success) {
        this.form.patchValue({
          latitude: result.coordinates!.latitude,
          longitude: result.coordinates!.longitude
        });
      } else {
        console.warn('No se pudo obtener la ubicación:', result.errorMessage);
      }
    });

    const user = this.authService.currentUser();
    const userCanton = user?.municipality?.canton;

    if (userCanton) {
      const cantonControl = this.formsService.getControl('canton', this.form);

      setTimeout(() => {
        cantonControl?.setValue(userCanton);
        this.cantonHttpService.getDistrictsByCantonId(userCanton.id!);
        cantonControl?.disable();
      }, 0);
    }
  }

  /**
   * Builds the reactive form with all required and optional fields for abandoned animal registration.
   * @returns FormGroup instance with form controls and validators.
   * @author gjimenez
   */
  buildForm() {
    return this.fb.group({
      species: new FormControl<string | null>(null, [Validators.required]),
      sex: new FormControl<string | null>(null),
      estimatedAge: new FormControl<string | null>(null, [Validators.required]),
      physicalCondition: new FormControl<string | null>(null, [Validators.required]),
      behavior: new FormControl<string | null>(null, [Validators.required]),
      canton: new FormControl<any | null>(null),
      district: new FormControl<any | null>(null, [Validators.required]),
      neighborhood: new FormControl<any | null>(null, [Validators.required]),
      observations: new FormControl<string | null>(null),
      latitude: new FormControl<number | null>(null),
      longitude: new FormControl<number | null>(null),
      photoBase64: new FormControl<string | null>(null)
    });
  }

  /**
   * Handles form submission. If the form is valid, it builds the DTO and sends the request.
   * If not, it marks fields as touched to trigger validation messages.
   * @author gjimenez
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      });
      return;
    }

    const raw = this.form.getRawValue();

    const dto = new CreateAbandonedAnimalRequestDTO({
      ...raw,
      canton: raw.canton?.id ?? null,
      district: raw.district?.name ?? null,
      neighborhood: raw.neighborhood?.name ?? null
    });

    this.abandonedAnimalHttp.save(dto, () => this.form.reset());
  }

  /**
   * Handles image selection by the user. Converts it to base64 and generates a preview.
   * @param event The file input change event
   * @author gjimenez
   */
  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        this.form.patchValue({photoBase64: base64});
        this.imagePreview = result;
        this.cdRef.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }
}
