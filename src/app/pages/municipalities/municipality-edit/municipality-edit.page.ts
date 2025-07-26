import {Component, OnInit, inject, computed, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {CantonHttpService, MunicipalityHttpService, MunicipalityStatusHttpService} from '@services/http';
import {UpdateMunicipalityRequestDTO} from '@models/dto';
import {AlertService, FormsService, I18nService} from '@services/general';
import {AlertTypeEnum, PagesUrlsEnum, RouteParamsEnum} from '@common/enums';
import {GeneralContainerComponent} from '@components/layout';
import {Canton, Municipality, MunicipalityStatus} from '@models';

/**
 * Component for editing a municipality.
 * @author gjimenez
 * @modifiedby dgutierrez 12/07/2025 refactor for more clean code and adjustments in the form
 */
@Component({
  selector: 'app-municipality-edit',
  standalone: true,
  templateUrl: './municipality-edit.page.html',
  styleUrls: ['./municipality-edit.page.scss'],
  imports: [
    CommonModule,
    GeneralContainerComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslatePipe
  ]
})
export class MunicipalityEditPage implements OnInit {
  private readonly alertService = inject(AlertService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly cantonHttpService = inject(CantonHttpService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly municipalityHttpService = inject(MunicipalityHttpService);
  readonly municipalityStatusHttpService = inject(MunicipalityStatusHttpService)

  readonly form = this.formsService.formsBuilder.group({
    id: [null as number | null],
    name: ['', Validators.required],
    address: [''],
    phone: [''],
    email: ['', [Validators.required, Validators.email]],
    cantonId: [null as number | null, Validators.required],
    responsibleName: [''],
    responsibleRole: [''],
    status: new FormControl<MunicipalityStatus | null>(null, [Validators.required])
  });

  readonly municipalityToUpdate = computed(() => this.municipalityHttpService.selectedMunicipalityId())

  private readonly initializeFormWithMunicipalityToUpdateEffect = effect(() => {
    const municipality = this.municipalityToUpdate();
    this.form.patchValue({
      id: municipality?.id,
      name: municipality?.name,
      address: municipality?.address,
      phone: municipality?.phone,
      email: municipality?.email,
      cantonId: municipality?.canton?.id ?? null,
      responsibleName: municipality?.responsibleName,
      responsibleRole: municipality?.responsibleRole,
      status: municipality?.status
    });
  })

  ngOnInit(): void {
    this.municipalityStatusHttpService.getAll();
    this.cantonHttpService.getAll();
    this.initializeMunicipalityToUpdate();
    this.disableUnmodifiableFormControls();
  }

  /**
   * Handles the form submission to update the municipality.
   * @author dgutierrez
   */
  onSubmit(): void {
    if (this.form.invalid) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      });
      return;
    }
    this.updateMunicipality();
  }

  /**
   * Updates the municipality using the form data.
   * @author dgutierrez
   */
  private updateMunicipality(): void {
    const updateDto = this.createUpdateMunicipalityRequestDTO();

    if (!updateDto.id) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_ID_TO_UPDATE
      });
      this.navigateToMunicipalitiesList()
      return;
    }

    this.municipalityHttpService.update(updateDto, this.navigateToMunicipalitiesList.bind(this));
  }

  /**
   * Creates a DTO for updating the municipality based on the form values.
   * @author dgutierrez
   */
  private createUpdateMunicipalityRequestDTO(): UpdateMunicipalityRequestDTO {
    const {cantonId, status, ...rest} = this.form.getRawValue();
    const municipalityData = {
      ...this.municipalityToUpdate(),
      ...rest,
      canton: new Canton({id: cantonId}),
      status: status
    };
    return UpdateMunicipalityRequestDTO.fromMunicipality(new Municipality(municipalityData));
  }

  /**
   * Initializes the municipality to update based on the ID from the route parameters.
   * @author dgutierrez
   */
  private initializeMunicipalityToUpdate() {
    const municipalityId = Number(this.route.snapshot.paramMap.get(RouteParamsEnum.MUNICIPALITY_ID));

    if (!this.validateMunicipalityId(municipalityId)) {
      return;
    }

    this.municipalityHttpService.getById(municipalityId);
  }

  /**
   * Disables form controls that should not be modified by the user.
   * @author dgutierrez
   */
  private disableUnmodifiableFormControls() {
    this.form.get('cantonId')?.disable();
  }

  /**
   * Navigates to the municipalities list page.
   * @author dgutierrez
   */
  navigateToMunicipalitiesList(): void {
    this.router.navigate([PagesUrlsEnum.MUNICIPALITY_LIST]);
  }

  /**
   * Validates the municipality ID before updating.
   * If the ID is invalid, it displays an alert and navigates to the municipalities list.
   * @param id The municipality ID to validate.
   * @author dgutierrez
   */
  private validateMunicipalityId(id: number | null): boolean {
    if (id === null || isNaN(id) || id <= 0) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_ID_TO_UPDATE
      });
      this.navigateToMunicipalitiesList();
      return false;
    }
    return true;
  }
}
