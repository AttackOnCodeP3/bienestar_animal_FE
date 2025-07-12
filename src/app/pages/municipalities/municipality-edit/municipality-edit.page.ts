import {Component, OnInit, inject, computed, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {CantonHttpService, MunicipalityHttpService, MunicipalityStatusHttpService} from '@services/http';
import {UpdateMunicipalityRequestDTO} from '@models/dto';
import {AlertService, FormsService, I18nService} from '@services/general';
import {AlertTypeEnum, PagesUrlsEnum} from '@common/enums';
import {GeneralContainerComponent} from '@components/layout';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {Canton, Municipality, MunicipalityStatus} from '@models';

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
    responsiblePosition: [''],
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
      responsiblePosition: municipality?.responsibleRole,
      status: municipality?.status
    });
  })

  ngOnInit(): void {
    this.municipalityStatusHttpService.getAll();
    this.cantonHttpService.getAll();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.municipalityHttpService.getById(id);
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
        messageKey: 'Form is invalid'
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
    this.municipalityHttpService.update(updateDto);
    this.alertService.displayAlert({
      type: AlertTypeEnum.SUCCESS,
      messageKey: this.i18nService.i18nPagesValidationsEnum.MUNICIPALITY_PAGE_MUNICIPALITY_UPDATED_SUCCESSFULLY
    });
    this.router.navigate([PagesUrlsEnum.MUNICIPALITY_LIST]);
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
   * Disables form controls that should not be modified by the user.
   * @author dgutierrez
   */
  private disableUnmodifiableFormControls() {
    this.form.get('cantonId')?.disable();
  }
}
